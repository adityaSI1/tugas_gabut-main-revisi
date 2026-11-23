/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * SIPANTAU Backend Database Layer
 * Menggunakan engine bawaan Node.js: node:sqlite (DatabaseSync)
 * Database persisten SQLite dengan skema relasional lengkap untuk:
 * - tickets (data aduan publik)
 * - messages (komunikasi dua arah warga & petugas)
 * - audit_logs (audit trail disposisi dan verifikasi)
 * - operational_units (posko siaga & armada URC)
 * - verifier_accounts (akun verifikator backoffice OPD)
 */

import { DatabaseSync } from 'node:sqlite';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  INITIAL_TICKETS,
  INITIAL_AUDIT_LOGS,
  INITIAL_OPERATIONAL_UNITS,
  INITIAL_VERIFIER_ACCOUNTS,
  CivicTicket,
  TicketMessage,
  AuditLogEntry,
  OpdOperationalUnit,
  VerifierAccount
} from '../src/utils/civic-db.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Lokasi file database SQLite persisten
const DB_DIR = path.resolve(__dirname, '../database');
const DB_PATH = path.join(DB_DIR, 'sipantau.sqlite');

// Pastikan folder database tersedia
if (!fs.existsSync(DB_DIR)) {
  fs.mkdirSync(DB_DIR, { recursive: true });
}

// Inisialisasi koneksi SQLite
export const db = new DatabaseSync(DB_PATH);

// Aktifkan foreign key dan WAL mode untuk reliabilitas transaksi tinggi
db.exec('PRAGMA foreign_keys = ON;');

/**
 * Membuat tabel-tabel relational jika belum ada
 */
export function initDatabaseSchema(): void {
  // 1. Tabel Tiket Pengaduan (tickets)
  db.exec(`
    CREATE TABLE IF NOT EXISTS tickets (
      id TEXT PRIMARY KEY,
      code TEXT,
      judul TEXT NOT NULL,
      kategori TEXT NOT NULL,
      kategori_label TEXT,
      dinas TEXT NOT NULL,
      alamat TEXT NOT NULL,
      kecamatan TEXT,
      waktu TEXT NOT NULL,
      sla TEXT,
      urgensi TEXT,
      triase_level TEXT,
      status TEXT NOT NULL CHECK(status IN ('Diajukan', 'Diverifikasi', 'Penanganan', 'Selesai', 'Ditolak')),
      upvotes INTEGER DEFAULT 0,
      lat REAL NOT NULL,
      lng REAL NOT NULL,
      pelapor TEXT,
      nik TEXT,
      telepon TEXT,
      deskripsi TEXT,
      foto TEXT,
      petugas TEXT,
      timeline_json TEXT NOT NULL DEFAULT '[]',
      rating_json TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE INDEX IF NOT EXISTS idx_tickets_status ON tickets(status);
    CREATE INDEX IF NOT EXISTS idx_tickets_dinas ON tickets(dinas);
    CREATE INDEX IF NOT EXISTS idx_tickets_kategori ON tickets(kategori);
  `);

  // 2. Tabel Pesan Klarifikasi & Foto Pendukung Dua Arah (messages)
  db.exec(`
    CREATE TABLE IF NOT EXISTS messages (
      id TEXT PRIMARY KEY,
      ticket_id TEXT NOT NULL,
      sender_role TEXT NOT NULL CHECK(sender_role IN ('warga', 'petugas')),
      sender_name TEXT NOT NULL,
      role_badge TEXT,
      text TEXT NOT NULL,
      foto TEXT,
      waktu TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY(ticket_id) REFERENCES tickets(id) ON DELETE CASCADE
    );

    CREATE INDEX IF NOT EXISTS idx_messages_ticket_id ON messages(ticket_id);
  `);

  // 3. Tabel Riwayat Audit Trail Triase & Disposisi (audit_logs)
  db.exec(`
    CREATE TABLE IF NOT EXISTS audit_logs (
      id TEXT PRIMARY KEY,
      waktu TEXT NOT NULL,
      aktor TEXT NOT NULL,
      aksi TEXT NOT NULL,
      target TEXT NOT NULL,
      keterangan TEXT,
      tipe TEXT NOT NULL CHECK(tipe IN ('DISPOSISI', 'VERIFIKASI', 'STATUS', 'AUTH')),
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `);

  // 4. Tabel Regu Teknis & Armada Operasional URC (operational_units)
  db.exec(`
    CREATE TABLE IF NOT EXISTS operational_units (
      id TEXT PRIMARY KEY,
      nama TEXT NOT NULL,
      dinas TEXT NOT NULL,
      jenis TEXT NOT NULL,
      lat REAL NOT NULL,
      lng REAL NOT NULL,
      status TEXT NOT NULL,
      kontak TEXT,
      komandan TEXT,
      kendaraan TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `);

  // 5. Tabel Akun Verifikator Backoffice OPD (verifier_accounts)
  db.exec(`
    CREATE TABLE IF NOT EXISTS verifier_accounts (
      nip TEXT PRIMARY KEY,
      nama TEXT NOT NULL,
      instansi TEXT NOT NULL,
      jabatan TEXT NOT NULL,
      role TEXT NOT NULL,
      status TEXT NOT NULL,
      terakhir_aktif TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `);
}

/**
 * Mengisi data awal (Seed) jika database masih kosong
 */
export function seedDatabaseIfEmpty(): void {
  const rowCount = db.prepare('SELECT COUNT(*) as count FROM tickets').get() as { count: number };
  if (rowCount.count > 0) {
    return; // Sudah ada data
  }

  console.log('📦 Memulai inisialisasi data benih (seed) SIPANTAU ke database SQLite...');

  // 1. Seed Tickets & Messages
  const insertTicketStmt = db.prepare(`
    INSERT INTO tickets (
      id, code, judul, kategori, kategori_label, dinas, alamat, kecamatan,
      waktu, sla, urgensi, triase_level, status, upvotes, lat, lng,
      pelapor, nik, telepon, deskripsi, foto, petugas, timeline_json, rating_json
    ) VALUES (
      ?, ?, ?, ?, ?, ?, ?, ?,
      ?, ?, ?, ?, ?, ?, ?, ?,
      ?, ?, ?, ?, ?, ?, ?, ?
    )
  `);

  const insertMsgStmt = db.prepare(`
    INSERT INTO messages (
      id, ticket_id, sender_role, sender_name, role_badge, text, foto, waktu
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `);

  for (const t of INITIAL_TICKETS) {
    insertTicketStmt.run(
      t.id,
      t.code || t.id.replace('#', ''),
      t.judul,
      t.kategori,
      t.kategoriLabel || t.kategori,
      t.dinas,
      t.alamat,
      t.kecamatan || '',
      t.waktu,
      t.sla || 'Respon Awal Maks. 24 Jam',
      t.urgensi || 'Sedang',
      t.triaseLevel || 'Triase Level 2',
      t.status,
      t.upvotes || 0,
      t.lat,
      t.lng,
      t.pelapor || 'Warga Pelapor',
      t.nik || '',
      t.telepon || '',
      t.deskripsi || '',
      t.foto || '',
      t.petugas || 'Tim Triase Diskominfo',
      JSON.stringify(t.timeline || []),
      t.rating ? JSON.stringify(t.rating) : null
    );

    if (t.messages && t.messages.length > 0) {
      for (const m of t.messages) {
        insertMsgStmt.run(
          m.id || `msg-${Math.random().toString(36).substring(2, 9)}`,
          t.id,
          m.senderRole,
          m.senderName,
          m.roleBadge || (m.senderRole === 'warga' ? 'Warga Pelapor' : 'Petugas OPD'),
          m.text,
          m.foto || null,
          m.waktu
        );
      }
    }
  }

  // 2. Seed Audit Logs
  const insertAuditStmt = db.prepare(`
    INSERT INTO audit_logs (id, waktu, aktor, aksi, target, keterangan, tipe)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `);

  for (const log of INITIAL_AUDIT_LOGS) {
    insertAuditStmt.run(
      log.id,
      log.waktu,
      log.aktor,
      log.aksi,
      log.target,
      log.keterangan || '',
      log.tipe
    );
  }

  // 3. Seed Operational Units
  const insertUnitStmt = db.prepare(`
    INSERT INTO operational_units (id, nama, dinas, jenis, lat, lng, status, kontak, komandan, kendaraan)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  for (const u of INITIAL_OPERATIONAL_UNITS) {
    insertUnitStmt.run(
      u.id,
      u.nama,
      u.dinas,
      u.jenis,
      u.lat,
      u.lng,
      u.status,
      u.kontak || '',
      u.komandan || '',
      u.kendaraan || ''
    );
  }

  // 4. Seed Verifier Accounts
  const insertVerifierStmt = db.prepare(`
    INSERT INTO verifier_accounts (nip, nama, instansi, jabatan, role, status, terakhir_aktif)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `);

  for (const v of INITIAL_VERIFIER_ACCOUNTS) {
    insertVerifierStmt.run(
      v.nip,
      v.nama,
      v.instansi,
      v.jabatan,
      v.role,
      v.status,
      v.terakhirAktif
    );
  }

  console.log(`✅ Sukses menabur ${INITIAL_TICKETS.length} tiket awal ke database SQLite.`);
}

/**
 * Helper: Ambil semua tiket lengkap dengan pesan relasional
 */
export function getAllTickets(): CivicTicket[] {
  const rows = db.prepare('SELECT * FROM tickets ORDER BY created_at DESC').all() as any[];
  const messagesStmt = db.prepare('SELECT * FROM messages WHERE ticket_id = ? ORDER BY created_at ASC');

  return rows.map((r) => {
    const rawMessages = messagesStmt.all(r.id) as any[];
    const messages: TicketMessage[] = rawMessages.map((m) => ({
      id: m.id,
      senderRole: m.sender_role,
      senderName: m.sender_name,
      roleBadge: m.role_badge,
      text: m.text,
      foto: m.foto || undefined,
      waktu: m.waktu
    }));

    return {
      id: r.id,
      code: r.code,
      judul: r.judul,
      kategori: r.kategori,
      kategoriLabel: r.kategori_label,
      dinas: r.dinas,
      alamat: r.alamat,
      kecamatan: r.kecamatan,
      waktu: r.waktu,
      sla: r.sla,
      urgensi: r.urgensi,
      triaseLevel: r.triase_level,
      status: r.status,
      upvotes: r.upvotes,
      lat: r.lat,
      lng: r.lng,
      pelapor: r.pelapor,
      nik: r.nik,
      telepon: r.telepon,
      deskripsi: r.deskripsi,
      foto: r.foto,
      petugas: r.petugas,
      timeline: r.timeline_json ? JSON.parse(r.timeline_json) : [],
      messages,
      rating: r.rating_json ? JSON.parse(r.rating_json) : undefined
    };
  });
}

/**
 * Helper: Ambil tiket tunggal berdasarkan ID (#LAPOR-XXXX atau LAPOR-XXXX)
 */
export function getTicketById(ticketId: string): CivicTicket | null {
  const normalizedId = ticketId.startsWith('#') ? ticketId : `#${ticketId}`;
  const r = db.prepare('SELECT * FROM tickets WHERE id = ? OR code = ?').get(normalizedId, ticketId.replace('#', '')) as any;
  if (!r) return null;

  const rawMessages = db.prepare('SELECT * FROM messages WHERE ticket_id = ? ORDER BY created_at ASC').all(r.id) as any[];
  const messages: TicketMessage[] = rawMessages.map((m) => ({
    id: m.id,
    senderRole: m.sender_role,
    senderName: m.sender_name,
    roleBadge: m.role_badge,
    text: m.text,
    foto: m.foto || undefined,
    waktu: m.waktu
  }));

  return {
    id: r.id,
    code: r.code,
    judul: r.judul,
    kategori: r.kategori,
    kategoriLabel: r.kategori_label,
    dinas: r.dinas,
    alamat: r.alamat,
    kecamatan: r.kecamatan,
    waktu: r.waktu,
    sla: r.sla,
    urgensi: r.urgensi,
    triaseLevel: r.triase_level,
    status: r.status,
    upvotes: r.upvotes,
    lat: r.lat,
    lng: r.lng,
    pelapor: r.pelapor,
    nik: r.nik,
    telepon: r.telepon,
    deskripsi: r.deskripsi,
    foto: r.foto,
    petugas: r.petugas,
    timeline: r.timeline_json ? JSON.parse(r.timeline_json) : [],
    messages,
    rating: r.rating_json ? JSON.parse(r.rating_json) : undefined
  };
}

/**
 * Helper: Masukkan tiket baru ke SQLite
 */
export function createNewTicket(data: Partial<CivicTicket>): CivicTicket {
  const currentYear = new Date().getFullYear();
  const randomNum = Math.floor(1000 + Math.random() * 9000);
  const ticketId = data.id || `#LAPOR-${currentYear}-${randomNum}`;
  const code = ticketId.replace('#', '');
  const nowStr = 'Baru saja';

  const defaultTimeline = [
    {
      tahap: 'Laporan Diajukan Warga',
      waktu: nowStr,
      keterangan: 'Laporan resmi terkirim dan tersimpan aman di database SIPANTAU.',
      done: true
    },
    {
      tahap: 'Verifikasi Administrasi & Geotag',
      waktu: 'Dalam Antrean Triase',
      keterangan: 'Menunggu validasi dokumen dan koordinat oleh Tim Diskominfo.',
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
  ];

  const stmt = db.prepare(`
    INSERT INTO tickets (
      id, code, judul, kategori, kategori_label, dinas, alamat, kecamatan,
      waktu, sla, urgensi, triase_level, status, upvotes, lat, lng,
      pelapor, nik, telepon, deskripsi, foto, petugas, timeline_json, rating_json
    ) VALUES (
      ?, ?, ?, ?, ?, ?, ?, ?,
      ?, ?, ?, ?, ?, ?, ?, ?,
      ?, ?, ?, ?, ?, ?, ?, ?
    )
  `);

  stmt.run(
    ticketId,
    code,
    data.judul || 'Aduan Warga',
    data.kategori || 'Infrastruktur',
    data.kategoriLabel || data.kategori || 'Infrastruktur',
    data.dinas || 'Dinas Bina Marga & Tata Ruang',
    data.alamat || 'Kota Bandung',
    data.kecamatan || 'Kecamatan Terpadu',
    nowStr,
    data.sla || 'Respon Awal Maks. 24 Jam',
    data.urgensi || 'Sedang',
    data.triaseLevel || 'Triase Level 2',
    'Diajukan',
    0,
    data.lat || -6.9175,
    data.lng || 107.6191,
    data.pelapor || 'Warga Pelapor',
    data.nik || '',
    data.telepon || '',
    data.deskripsi || '',
    data.foto || '',
    'Tim Triase Diskominfo',
    JSON.stringify(defaultTimeline),
    null
  );

  // Catat ke audit log
  db.prepare(`
    INSERT INTO audit_logs (id, waktu, aktor, aksi, target, keterangan, tipe)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `).run(
    `LOG-${Date.now().toString().slice(-4)}`,
    nowStr,
    data.pelapor || 'Warga Pelapor',
    'Pengajuan Tiket Baru',
    ticketId,
    `Aduan baru "${data.judul}" berhasil didaftarkan ke sistem.`,
    'STATUS'
  );

  return getTicketById(ticketId)!;
}

/**
 * Helper: Update status dan disposisi tiket
 */
export function updateTicketTriage(
  ticketId: string,
  newStatus: CivicTicket['status'],
  targetDinas: string,
  notes: string,
  officer: string
): CivicTicket | null {
  const current = getTicketById(ticketId);
  if (!current) return null;

  const updatedTimeline = [...(current.timeline || [])];
  updatedTimeline.push({
    tahap: `Status Diperbarui: ${newStatus}`,
    waktu: 'Baru saja',
    keterangan: notes || `Disposisi tindak lanjut ke ${targetDinas}`,
    done: newStatus === 'Selesai',
    active: newStatus !== 'Selesai'
  });

  db.prepare(`
    UPDATE tickets
    SET status = ?, dinas = ?, petugas = ?, timeline_json = ?, updated_at = CURRENT_TIMESTAMP
    WHERE id = ?
  `).run(
    newStatus,
    targetDinas || current.dinas,
    officer || current.petugas,
    JSON.stringify(updatedTimeline),
    current.id
  );

  // Catat ke audit log
  db.prepare(`
    INSERT INTO audit_logs (id, waktu, aktor, aksi, target, keterangan, tipe)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `).run(
    `LOG-${Date.now().toString().slice(-4)}`,
    'Baru saja',
    officer || 'Petugas Verifikator',
    'Pembaruan Status & Disposisi',
    current.id,
    notes || `Status diubah menjadi ${newStatus} dan diteruskan ke ${targetDinas}`,
    newStatus === 'Diverifikasi' ? 'VERIFIKASI' : 'DISPOSISI'
  );

  return getTicketById(current.id);
}

/**
 * Helper: Tambah pesan dua arah ke tiket
 */
export function addMessageToTicket(
  ticketId: string,
  msg: {
    senderRole: 'warga' | 'petugas';
    senderName: string;
    text: string;
    foto?: string;
    roleBadge?: string;
  }
): CivicTicket | null {
  const current = getTicketById(ticketId);
  if (!current) return null;

  const msgId = `msg-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`;
  db.prepare(`
    INSERT INTO messages (
      id, ticket_id, sender_role, sender_name, role_badge, text, foto, waktu
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `).run(
    msgId,
    current.id,
    msg.senderRole,
    msg.senderName || (msg.senderRole === 'warga' ? 'Warga Pelapor' : 'Petugas OPD'),
    msg.roleBadge || (msg.senderRole === 'warga' ? 'Pelapor Terverifikasi' : 'Petugas OPD'),
    msg.text.trim(),
    msg.foto || null,
    'Baru saja'
  );

  return getTicketById(current.id);
}

/**
 * Helper: Tambah ulasan kepuasan masyarakat (CSAT)
 */
export function addRatingToTicket(
  ticketId: string,
  rating: {
    stars: number;
    aspects?: string[];
    comment?: string;
  }
): CivicTicket | null {
  const current = getTicketById(ticketId);
  if (!current) return null;

  const ratingObj = {
    stars: Math.max(1, Math.min(5, rating.stars)),
    aspects: rating.aspects || [],
    comment: (rating.comment || '').trim(),
    waktu: 'Baru saja'
  };

  const updatedTimeline = [...(current.timeline || [])];
  updatedTimeline.push({
    tahap: `Ulasan Warga Diberikan (${ratingObj.stars} Bintang)`,
    waktu: 'Baru saja',
    keterangan: ratingObj.comment || 'Warga telah memberikan penilaian kepuasan terhadap penanganan tiket.',
    done: true,
    actor: 'Warga Pelapor'
  });

  db.prepare(`
    UPDATE tickets
    SET rating_json = ?, timeline_json = ?, updated_at = CURRENT_TIMESTAMP
    WHERE id = ?
  `).run(
    JSON.stringify(ratingObj),
    JSON.stringify(updatedTimeline),
    current.id
  );

  return getTicketById(current.id);
}

/**
 * Helper: Dukung aduan (Upvote)
 */
export function upvoteTicketById(ticketId: string): number {
  const current = getTicketById(ticketId);
  if (!current) return 0;

  const newUpvotes = (current.upvotes || 0) + 1;
  db.prepare('UPDATE tickets SET upvotes = ? WHERE id = ?').run(newUpvotes, current.id);
  return newUpvotes;
}

/**
 * Helper: Ambil seluruh Audit Log
 */
export function getAuditLogs(): AuditLogEntry[] {
  const rows = db.prepare('SELECT * FROM audit_logs ORDER BY created_at DESC LIMIT 50').all() as any[];
  return rows.map((r) => ({
    id: r.id,
    waktu: r.waktu,
    aktor: r.aktor,
    aksi: r.aksi,
    target: r.target,
    keterangan: r.keterangan,
    tipe: r.tipe
  }));
}

/**
 * Helper: Ambil seluruh Unit Operasional URC
 */
export function getOperationalUnits(): OpdOperationalUnit[] {
  const rows = db.prepare('SELECT * FROM operational_units ORDER BY nama ASC').all() as any[];
  return rows.map((r) => ({
    id: r.id,
    nama: r.nama,
    dinas: r.dinas,
    jenis: r.jenis,
    lat: r.lat,
    lng: r.lng,
    status: r.status,
    kontak: r.kontak,
    komandan: r.komandan,
    kendaraan: r.kendaraan
  }));
}

/**
 * Helper: Ambil Akun Verifikator
 */
export function getVerifierAccounts(): VerifierAccount[] {
  const rows = db.prepare('SELECT * FROM verifier_accounts ORDER BY role DESC').all() as any[];
  return rows.map((r) => ({
    nip: r.nip,
    nama: r.nama,
    instansi: r.instansi,
    jabatan: r.jabatan,
    role: r.role,
    status: r.status,
    terakhirAktif: r.terakhir_aktif
  }));
}

/**
 * Helper: Reset total database dan tabur kembali data awal
 */
export function resetAndSeedDatabase(): void {
  db.exec(`
    DELETE FROM messages;
    DELETE FROM audit_logs;
    DELETE FROM operational_units;
    DELETE FROM verifier_accounts;
    DELETE FROM tickets;
  `);
  seedDatabaseIfEmpty();
}

// Inisialisasi skema dan tabur data saat modul di-load
initDatabaseSchema();
seedDatabaseIfEmpty();
