/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * SIPANTAU Universal API & Data Access Client
 * Mendukung arsitektur Hybrid Offline-First:
 * 1. Mode Online / Full-Stack: Terhubung langsung ke Backend REST API Express & Database SQLite persisten.
 * 2. Mode Static Fallback: Berpindah otomatis dan transparan ke LocalStorage & seed data saat berjalan di GitHub Pages statis.
 */

import {
  CivicTicket,
  TicketMessage,
  CitizenRating,
  DailyStats,
  AuditLogEntry,
  OpdOperationalUnit,
  VerifierAccount,
  INITIAL_TICKETS,
  INITIAL_AUDIT_LOGS,
  INITIAL_OPERATIONAL_UNITS,
  INITIAL_VERIFIER_ACCOUNTS,
  calculateDailyStats,
  calculateOpdPerformance,
  filterTickets,
  validateTicket,
  applyTriageStatus,
  addTicketMessage,
  addTicketRating
} from './civic-db';

const STORAGE_KEY = 'SIPANTAU_CIVIC_DB_V2';
const API_BASE_URL = '/api';

export interface BackendHealth {
  connected: boolean;
  service?: string;
  database: string;
  engine?: string;
  totalTickets?: number;
  totalMessages?: number;
  uptimeSeconds?: number;
  timestamp?: string;
  mode: 'sqlite' | 'localStorage';
}

let cachedBackendStatus: BackendHealth = {
  connected: false,
  database: 'LocalStorage Cache',
  mode: 'localStorage'
};

/**
 * Cek status konektivitas ke Backend REST API & Database SQLite
 */
export async function checkBackendHealth(): Promise<BackendHealth> {
  try {
    const res = await fetch(`${API_BASE_URL}/health`, {
      method: 'GET',
      headers: { 'Accept': 'application/json' },
      signal: AbortSignal.timeout(2500)
    });

    if (res.ok) {
      const data = await res.json();
      cachedBackendStatus = {
        connected: true,
        service: data.service,
        database: data.database || 'SQLite 3 (node:sqlite)',
        engine: data.engine || 'Embedded SQLite',
        totalTickets: data.totalTickets,
        totalMessages: data.totalMessages,
        uptimeSeconds: data.uptimeSeconds,
        timestamp: data.timestamp,
        mode: 'sqlite'
      };
      return cachedBackendStatus;
    }
  } catch (_e) {
    // Backend offline / GitHub Pages static mode
  }

  cachedBackendStatus = {
    connected: false,
    database: 'LocalStorage Browser Cache',
    mode: 'localStorage'
  };
  return cachedBackendStatus;
}

export function getCachedBackendStatus(): BackendHealth {
  return cachedBackendStatus;
}

/**
 * Helper: Ambil tiket dari LocalStorage
 */
function getLocalTickets(): CivicTicket[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch (e) {
    console.warn('Gagal membaca LocalStorage:', e);
  }
  // Simpan seed awal ke localStorage
  localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_TICKETS));
  return INITIAL_TICKETS;
}

/**
 * Helper: Simpan tiket ke LocalStorage
 */
function saveLocalTickets(tickets: CivicTicket[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tickets));
  } catch (e) {
    console.warn('Gagal menyimpan ke LocalStorage:', e);
  }
}

/**
 * Ambil semua tiket (dengan dukungan filter pencarian & dinas)
 */
export async function fetchTickets(filters?: {
  category?: string;
  status?: string;
  search?: string;
  dinas?: string;
}): Promise<CivicTicket[]> {
  try {
    const query = new URLSearchParams();
    if (filters?.category) query.append('category', filters.category);
    if (filters?.status) query.append('status', filters.status);
    if (filters?.search) query.append('search', filters.search);
    if (filters?.dinas) query.append('dinas', filters.dinas);

    const res = await fetch(`${API_BASE_URL}/tickets?${query.toString()}`, {
      signal: AbortSignal.timeout(3000)
    });

    if (res.ok) {
      const json = await res.json();
      if (json.success && Array.isArray(json.data)) {
        cachedBackendStatus.connected = true;
        cachedBackendStatus.database = 'SQLite 3 (node:sqlite)';
        cachedBackendStatus.mode = 'sqlite';
        // Sinkronkan ke LocalStorage untuk backup offline
        saveLocalTickets(json.data);
        return json.data;
      }
    }
  } catch (_e) {
    // Fallback to local storage
  }

  cachedBackendStatus.connected = false;
  cachedBackendStatus.mode = 'localStorage';
  const localList = getLocalTickets();
  return filterTickets(localList, filters || {});
}

/**
 * Ambil tiket berdasarkan ID
 */
export async function fetchTicketById(id: string): Promise<CivicTicket | null> {
  const normalizedId = id.startsWith('#') ? id : `#${id}`;

  try {
    const encoded = encodeURIComponent(normalizedId);
    const res = await fetch(`${API_BASE_URL}/tickets/${encoded}`, {
      signal: AbortSignal.timeout(3000)
    });

    if (res.ok) {
      const json = await res.json();
      if (json.success && json.data) {
        return json.data;
      }
    }
  } catch (_e) {
    // Fallback ke local
  }

  const local = getLocalTickets();
  return local.find((t) => t.id === normalizedId || t.code === id.replace('#', '')) || null;
}

/**
 * Buat aduan baru
 */
export async function createTicket(ticketData: Partial<CivicTicket>): Promise<CivicTicket> {
  try {
    const res = await fetch(`${API_BASE_URL}/tickets`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(ticketData),
      signal: AbortSignal.timeout(4000)
    });

    if (res.ok) {
      const json = await res.json();
      if (json.success && json.data) {
        // Perbarui cache local
        const local = getLocalTickets();
        saveLocalTickets([json.data, ...local.filter((t) => t.id !== json.data.id)]);
        return json.data;
      }
    }
  } catch (_e) {
    // Fallback ke pembuatan lokal jika server mati
  }

  const currentYear = new Date().getFullYear();
  const randomNum = Math.floor(1000 + Math.random() * 9000);
  const ticketId = ticketData.id || `#LAPOR-${currentYear}-${randomNum}`;
  const nowStr = 'Baru saja';

  const newTicket: CivicTicket = {
    id: ticketId,
    code: ticketId.replace('#', ''),
    judul: ticketData.judul || 'Aduan Warga',
    kategori: ticketData.kategori || 'Infrastruktur',
    kategoriLabel: ticketData.kategoriLabel || ticketData.kategori || 'Infrastruktur',
    dinas: ticketData.dinas || 'Dinas Bina Marga & Tata Ruang',
    alamat: ticketData.alamat || 'Kota Bandung',
    kecamatan: ticketData.kecamatan || 'Kecamatan Terpadu',
    waktu: nowStr,
    sla: ticketData.sla || 'Respon Awal Maks. 24 Jam',
    urgensi: ticketData.urgensi || 'Sedang',
    triaseLevel: ticketData.triaseLevel || 'Triase Level 2',
    status: 'Diajukan',
    upvotes: 0,
    lat: ticketData.lat || -6.9175,
    lng: ticketData.lng || 107.6191,
    pelapor: ticketData.pelapor || 'Warga Pelapor',
    nik: ticketData.nik || '',
    telepon: ticketData.telepon || '',
    deskripsi: ticketData.deskripsi || '',
    foto: ticketData.foto || '',
    petugas: 'Tim Triase Diskominfo',
    timeline: [
      {
        tahap: 'Laporan Diajukan Warga',
        waktu: nowStr,
        keterangan: 'Laporan resmi terkirim ke sistem SIPANTAU.',
        done: true
      },
      {
        tahap: 'Verifikasi Administrasi & Geotag',
        waktu: 'Dalam Antrean Triase',
        keterangan: 'Menunggu validasi dokumen dan koordinat.',
        active: true
      },
      {
        tahap: 'Penanganan Regu Teknis OPD',
        waktu: '-',
        keterangan: 'Disposisi teknis menuju tim lapangan OPD terkait.',
        done: false
      },
      {
        tahap: 'Selesai & Evaluasi Publik',
        waktu: '-',
        keterangan: 'Menunggu konfirmasi penyelesaian fisik di lokasi.',
        done: false
      }
    ],
    messages: []
  };

  const local = getLocalTickets();
  const updated = [newTicket, ...local];
  saveLocalTickets(updated);
  return newTicket;
}

/**
 * Pembaruan status triase / disposisi oleh petugas OPD
 */
export async function updateTicketStatus(
  ticketId: string,
  newStatus: CivicTicket['status'],
  targetDinas: string,
  notes: string,
  officer: string
): Promise<CivicTicket> {
  try {
    const encoded = encodeURIComponent(ticketId);
    const res = await fetch(`${API_BASE_URL}/tickets/${encoded}/status`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: newStatus, targetDinas, notes, officer }),
      signal: AbortSignal.timeout(3500)
    });

    if (res.ok) {
      const json = await res.json();
      if (json.success && json.data) {
        const local = getLocalTickets();
        const updated = local.map((t) => (t.id === ticketId ? json.data : t));
        saveLocalTickets(updated);
        return json.data;
      }
    }
  } catch (_e) {
    // Fallback
  }

  const local = getLocalTickets();
  const found = local.find((t) => t.id === ticketId);
  if (!found) throw new Error(`Tiket ${ticketId} tidak ditemukan`);

  const updatedTicket = applyTriageStatus(found, newStatus, targetDinas, notes, officer);
  const updatedList = local.map((t) => (t.id === ticketId ? updatedTicket : t));
  saveLocalTickets(updatedList);
  return updatedTicket;
}

/**
 * Dukung aduan (Upvote)
 */
export async function upvoteTicket(ticketId: string): Promise<number> {
  try {
    const encoded = encodeURIComponent(ticketId);
    const res = await fetch(`${API_BASE_URL}/tickets/${encoded}/upvote`, {
      method: 'POST',
      signal: AbortSignal.timeout(2500)
    });

    if (res.ok) {
      const json = await res.json();
      if (json.success && typeof json.upvotes === 'number') {
        const local = getLocalTickets();
        const updated = local.map((t) => (t.id === ticketId ? { ...t, upvotes: json.upvotes } : t));
        saveLocalTickets(updated);
        return json.upvotes;
      }
    }
  } catch (_e) {
    // Fallback
  }

  const local = getLocalTickets();
  let count = 0;
  const updated = local.map((t) => {
    if (t.id === ticketId) {
      count = (t.upvotes || 0) + 1;
      return { ...t, upvotes: count };
    }
    return t;
  });
  saveLocalTickets(updated);
  return count;
}

/**
 * Kirim pesan klarifikasi & foto pada komunikasi dua arah
 */
export async function sendTicketMessage(
  ticketId: string,
  message: {
    senderRole: 'warga' | 'petugas';
    senderName: string;
    text: string;
    foto?: string;
    roleBadge?: string;
  }
): Promise<CivicTicket> {
  try {
    const encoded = encodeURIComponent(ticketId);
    const res = await fetch(`${API_BASE_URL}/tickets/${encoded}/messages`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(message),
      signal: AbortSignal.timeout(3500)
    });

    if (res.ok) {
      const json = await res.json();
      if (json.success && json.data) {
        const local = getLocalTickets();
        const updated = local.map((t) => (t.id === ticketId ? json.data : t));
        saveLocalTickets(updated);
        return json.data;
      }
    }
  } catch (_e) {
    // Fallback
  }

  const local = getLocalTickets();
  const found = local.find((t) => t.id === ticketId);
  if (!found) throw new Error(`Tiket ${ticketId} tidak ditemukan`);

  const updatedTicket = addTicketMessage(found, message);
  const updatedList = local.map((t) => (t.id === ticketId ? updatedTicket : t));
  saveLocalTickets(updatedList);
  return updatedTicket;
}

/**
 * Kirim evaluasi kepuasan masyarakat (CSAT)
 */
export async function sendTicketRating(
  ticketId: string,
  rating: {
    stars: number;
    aspects?: string[];
    comment?: string;
  }
): Promise<CivicTicket> {
  try {
    const encoded = encodeURIComponent(ticketId);
    const res = await fetch(`${API_BASE_URL}/tickets/${encoded}/rating`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(rating),
      signal: AbortSignal.timeout(3500)
    });

    if (res.ok) {
      const json = await res.json();
      if (json.success && json.data) {
        const local = getLocalTickets();
        const updated = local.map((t) => (t.id === ticketId ? json.data : t));
        saveLocalTickets(updated);
        return json.data;
      }
    }
  } catch (_e) {
    // Fallback
  }

  const local = getLocalTickets();
  const found = local.find((t) => t.id === ticketId);
  if (!found) throw new Error(`Tiket ${ticketId} tidak ditemukan`);

  const updatedTicket = addTicketRating(found, rating);
  const updatedList = local.map((t) => (t.id === ticketId ? updatedTicket : t));
  saveLocalTickets(updatedList);
  return updatedTicket;
}

/**
 * Ambil metrik statistik harian dan rapor OPD
 */
export async function fetchStats(): Promise<{ daily: DailyStats; opdMetrics: any[] }> {
  try {
    const res = await fetch(`${API_BASE_URL}/stats`, {
      signal: AbortSignal.timeout(3000)
    });

    if (res.ok) {
      const json = await res.json();
      if (json.success && json.data) {
        return json.data;
      }
    }
  } catch (_e) {
    // Fallback
  }

  const local = getLocalTickets();
  return {
    daily: calculateDailyStats(local),
    opdMetrics: calculateOpdPerformance(local)
  };
}

/**
 * Ambil audit logs
 */
export async function fetchAuditLogs(): Promise<AuditLogEntry[]> {
  try {
    const res = await fetch(`${API_BASE_URL}/audit-logs`, {
      signal: AbortSignal.timeout(3000)
    });

    if (res.ok) {
      const json = await res.json();
      if (json.success && Array.isArray(json.data)) {
        return json.data;
      }
    }
  } catch (_e) {
    // Fallback
  }

  return INITIAL_AUDIT_LOGS;
}

/**
 * Ambil daftar posko / unit operasional URC
 */
export async function fetchOperationalUnits(): Promise<OpdOperationalUnit[]> {
  try {
    const res = await fetch(`${API_BASE_URL}/operational-units`, {
      signal: AbortSignal.timeout(3000)
    });

    if (res.ok) {
      const json = await res.json();
      if (json.success && Array.isArray(json.data)) {
        return json.data;
      }
    }
  } catch (_e) {
    // Fallback
  }

  return INITIAL_OPERATIONAL_UNITS;
}

/**
 * Ambil daftar akun verifikator OPD
 */
export async function fetchVerifiers(): Promise<VerifierAccount[]> {
  try {
    const res = await fetch(`${API_BASE_URL}/verifiers`, {
      signal: AbortSignal.timeout(3000)
    });

    if (res.ok) {
      const json = await res.json();
      if (json.success && Array.isArray(json.data)) {
        return json.data;
      }
    }
  } catch (_e) {
    // Fallback
  }

  return INITIAL_VERIFIER_ACCOUNTS;
}

/**
 * Reset total database
 */
export async function resetDatabase(): Promise<CivicTicket[]> {
  try {
    const res = await fetch(`${API_BASE_URL}/database/reset`, {
      method: 'POST',
      signal: AbortSignal.timeout(3500)
    });

    if (res.ok) {
      const json = await res.json();
      if (json.success && Array.isArray(json.data)) {
        saveLocalTickets(json.data);
        return json.data;
      }
    }
  } catch (_e) {
    // Fallback
  }

  saveLocalTickets(INITIAL_TICKETS);
  return INITIAL_TICKETS;
}

/**
 * Autentikasi Riil Warga atau Petugas / Admin ke Backend SQLite
 */
export async function loginUser(credentials: {
  type: 'warga' | 'petugas';
  nik?: string;
  nama?: string;
  telepon?: string;
  nip?: string;
  password?: string;
}): Promise<{ success: boolean; user?: any; message?: string }> {
  try {
    const res = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials),
      signal: AbortSignal.timeout(3500)
    });

    const json = await res.json().catch(() => ({}));
    if (res.ok && json.success) {
      return json;
    }
    return { success: false, message: json.message || 'Autentikasi gagal' };
  } catch (_e) {
    // Mode Offline / GitHub Pages
    if (credentials.type === 'warga') {
      const cleanNik = (credentials.nik || '').trim();
      if (!cleanNik || cleanNik.length < 6) {
        return { success: false, message: 'Nomor Induk Kependudukan (NIK) minimal 6 digit' };
      }
      return {
        success: true,
        user: {
          role: 'warga',
          nik: cleanNik,
          name: credentials.nama?.trim() || 'Warga Terverifikasi',
          phone: credentials.telepon?.trim() || '',
          title: 'Warga Pelapor Terdaftar'
        }
      };
    } else {
      const cleanNip = (credentials.nip || '').replace(/\s+/g, '').trim().toLowerCase();
      const pwd = credentials.password?.trim() || '';
      if (!cleanNip || !pwd) {
        return { success: false, message: 'NIP dan Kata Sandi wajib diisi' };
      }
      const matched = INITIAL_VERIFIER_ACCOUNTS.find((v) => {
        const vClean = v.nip.replace(/\s+/g, '').trim().toLowerCase();
        return vClean === cleanNip || (cleanNip === 'admin' && v.role === 'Superadmin');
      });
      if (!matched) {
        return { success: false, message: 'NIP tidak ditemukan dalam daftar aparatur verifikator OPD' };
      }
      const isSuperadmin = cleanNip === 'admin' || matched.role === 'Superadmin';
      const validSuperadmin = isSuperadmin && (pwd === 'admin123' || pwd === 'sipantau2026' || pwd === 'petugas123');
      const validOfficer = !isSuperadmin && (pwd === 'petugas123' || pwd === 'sipantau2026');
      if (!validSuperadmin && !validOfficer) {
        return { success: false, message: 'Kata sandi tidak sesuai untuk akun petugas ini' };
      }
      return {
        success: true,
        message: `Autentikasi berhasil. Selamat datang, ${matched.nama}`,
        user: {
          role: 'petugas',
          nip: matched.nip,
          name: matched.nama,
          instansi: matched.instansi,
          jabatan: matched.jabatan,
          userRole: matched.role
        }
      };
    }
  }
}
