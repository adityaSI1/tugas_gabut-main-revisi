/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * SIPANTAU Backend REST API Server
 * Didukung oleh Express.js & SQLite (node:sqlite)
 * Menyediakan endpoint REST API terpusat untuk aplikasi pengaduan masyarakat.
 */

import express, { Request, Response, NextFunction } from 'express';
import {
  getAllTickets,
  getTicketById,
  createNewTicket,
  updateTicketTriage,
  addMessageToTicket,
  addRatingToTicket,
  upvoteTicketById,
  getAuditLogs,
  getOperationalUnits,
  getVerifierAccounts,
  resetAndSeedDatabase,
  db
} from './db.js';
import {
  filterTickets,
  validateTicket,
  calculateDailyStats,
  calculateOpdPerformance,
  CivicTicket
} from '../src/utils/civic-db.js';
import { validateKtpNik } from '../src/utils/ktp-validator.js';

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3001;

// Middleware 1: CORS Handlers (Aman untuk dev dan cross-origin)
app.use((req: Request, res: Response, next: NextFunction) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

// Middleware 2: JSON Body Parser dengan kapasitas lampiran gambar base64
app.use(express.json({ limit: '20mb' }));
app.use(express.urlencoded({ extended: true, limit: '20mb' }));

// Middleware 3: Logger sederhana untuk request API
app.use((req: Request, res: Response, next: NextFunction) => {
  const start = Date.now();
  res.on('finish', () => {
    const duration = Date.now() - start;
    if (req.path.startsWith('/api')) {
      console.log(`[API] ${req.method} ${req.path} -> ${res.statusCode} (${duration}ms)`);
    }
  });
  next();
});

// ==========================================
// 1. ENDPOINT KESEHATAN SISTEM & DATABASE
// ==========================================
app.get('/api/health', (req: Request, res: Response) => {
  try {
    const row = db.prepare('SELECT COUNT(*) as count FROM tickets').get() as { count: number };
    const msgCount = db.prepare('SELECT COUNT(*) as count FROM messages').get() as { count: number };
    res.json({
      status: 'ok',
      service: 'SIPANTAU Backend API Service',
      database: 'SQLite 3 (node:sqlite)',
      engine: 'DatabaseSync Embedded',
      uptimeSeconds: Math.floor(process.uptime()),
      totalTickets: row.count,
      totalMessages: msgCount.count,
      timestamp: new Date().toISOString()
    });
  } catch (err: any) {
    res.status(500).json({ status: 'error', message: err.message });
  }
});

// ==========================================
// 2. ENDPOINT TIKET PENGADUAN (CRUD)
// ==========================================

// GET /api/tickets -> Ambil daftar tiket (bisa difilter)
app.get('/api/tickets', (req: Request, res: Response) => {
  try {
    const all = getAllTickets();
    const { category, status, search, dinas } = req.query as Record<string, string>;
    const filtered = filterTickets(all, { category, status, search, dinas });
    res.json({
      success: true,
      total: filtered.length,
      data: filtered
    });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// GET /api/tickets/:id -> Detail tiket tunggal
app.get('/api/tickets/:id', (req: Request, res: Response) => {
  try {
    const ticketId = req.params.id;
    const ticket = getTicketById(ticketId);
    if (!ticket) {
      return res.status(404).json({ success: false, message: `Tiket ${ticketId} tidak ditemukan` });
    }
    res.json({ success: true, data: ticket });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// POST /api/tickets -> Buat aduan baru oleh warga
app.post('/api/tickets', (req: Request, res: Response) => {
  try {
    const body: Partial<CivicTicket> = req.body;
    const validation = validateTicket(body);
    if (!validation.valid) {
      return res.status(400).json({ success: false, errors: validation.errors });
    }

    const created = createNewTicket(body);
    res.status(201).json({
      success: true,
      message: 'Aduan warga berhasil disimpan di database SIPANTAU',
      data: created
    });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// PUT /api/tickets/:id/status -> Pembaruan status triase & disposisi OPD
app.put('/api/tickets/:id/status', (req: Request, res: Response) => {
  try {
    const ticketId = req.params.id;
    const { status, targetDinas, notes, officer } = req.body;
    if (!status) {
      return res.status(400).json({ success: false, message: 'Status baru wajib disertakan' });
    }

    const updated = updateTicketTriage(ticketId, status, targetDinas, notes, officer);
    if (!updated) {
      return res.status(404).json({ success: false, message: `Tiket ${ticketId} tidak ditemukan` });
    }

    res.json({
      success: true,
      message: `Status tiket ${ticketId} berhasil diperbarui menjadi ${status}`,
      data: updated
    });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// POST /api/tickets/:id/upvote -> Dukungan warga terhadap aduan
app.post('/api/tickets/:id/upvote', (req: Request, res: Response) => {
  try {
    const ticketId = req.params.id;
    const count = upvoteTicketById(ticketId);
    res.json({ success: true, upvotes: count });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// ==========================================
// 3. ENDPOINT KOMUNIKASI DUA ARAH & FOTO
// ==========================================

// POST /api/tickets/:id/messages -> Kirim pesan klarifikasi atau bukti foto
app.post('/api/tickets/:id/messages', (req: Request, res: Response) => {
  try {
    const ticketId = req.params.id;
    const { senderRole, senderName, text, foto, roleBadge } = req.body;
    if (!text || text.trim().length === 0) {
      return res.status(400).json({ success: false, message: 'Isi pesan tidak boleh kosong' });
    }

    const updated = addMessageToTicket(ticketId, {
      senderRole: senderRole || 'warga',
      senderName: senderName || 'Warga Pelapor',
      text,
      foto,
      roleBadge
    });

    if (!updated) {
      return res.status(404).json({ success: false, message: `Tiket ${ticketId} tidak ditemukan` });
    }

    res.status(201).json({
      success: true,
      message: 'Pesan klarifikasi berhasil dikirim dan dicatat di database',
      data: updated
    });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// POST /api/tickets/:id/rating -> Evaluasi kepuasan warga (CSAT)
app.post('/api/tickets/:id/rating', (req: Request, res: Response) => {
  try {
    const ticketId = req.params.id;
    const { stars, aspects, comment } = req.body;
    if (!stars || stars < 1 || stars > 5) {
      return res.status(400).json({ success: false, message: 'Rating harus antara 1 sampai 5 bintang' });
    }

    const updated = addRatingToTicket(ticketId, { stars, aspects, comment });
    if (!updated) {
      return res.status(404).json({ success: false, message: `Tiket ${ticketId} tidak ditemukan` });
    }

    res.json({
      success: true,
      message: 'Penilaian kepuasan masyarakat berhasil disimpan di database',
      data: updated
    });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// ==========================================
// 4. ENDPOINT STATISTIK & RAPOR KINERJA OPD
// ==========================================
app.get('/api/stats', (req: Request, res: Response) => {
  try {
    const all = getAllTickets();
    const dailyStats = calculateDailyStats(all);
    const opdMetrics = calculateOpdPerformance(all);
    res.json({
      success: true,
      data: {
        daily: dailyStats,
        opdMetrics
      }
    });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// ==========================================
// 5. ENDPOINT AUDIT LOG, URC, & VERIFIKATOR
// ==========================================

// Endpoint API Check e-KTP Standar Kemendagri (nik-parser)
app.get('/api/ktp/:nik', (req: Request, res: Response) => {
  const result = validateKtpNik(req.params.nik);
  if (!result.valid) {
    return res.status(400).json({ success: false, data: result });
  }
  res.json({ success: true, data: result });
});

app.post('/api/ktp/verify', (req: Request, res: Response) => {
  const { nik } = req.body || {};
  const result = validateKtpNik(nik);
  if (!result.valid) {
    return res.status(400).json({ success: false, data: result });
  }
  res.json({ success: true, data: result });
});

// Autentikasi Riil Warga & Petugas ASN / Admin
app.post('/api/auth/login', (req: Request, res: Response) => {
  try {
    const { type, nip, password, nik, nama, telepon } = req.body;

    if (type === 'warga') {
      const ktpCheck = validateKtpNik(nik || '');
      if (!ktpCheck.valid) {
        return res.status(400).json({
          success: false,
          message: ktpCheck.message || 'NIK e-KTP tidak valid menurut regulasi Kemendagri',
          ktpData: ktpCheck
        });
      }
      const citizenName = (nama || '').trim() || 'Warga Terverifikasi';
      return res.json({
        success: true,
        message: `Selamat datang, ${citizenName}. e-KTP terverifikasi di ${ktpCheck.kabupatenKota}, ${ktpCheck.provinsi}`,
        user: {
          role: 'warga',
          nik: ktpCheck.nik,
          name: citizenName,
          phone: (telepon || '').trim(),
          title: 'Warga Pelapor Terdaftar',
          ktpData: ktpCheck
        }
      });
    }

    // Login Petugas / Admin
    if (!nip || !nip.trim()) {
      return res.status(400).json({ success: false, message: 'Nomor Induk Pegawai (NIP) wajib diisi' });
    }
    if (!password || !password.trim()) {
      return res.status(400).json({ success: false, message: 'Kata sandi akun petugas wajib diisi' });
    }

    const cleanInputNip = nip.replace(/\s+/g, '').trim().toLowerCase();
    const verifiers = getVerifierAccounts();

    const matched = verifiers.find((v) => {
      const vClean = v.nip.replace(/\s+/g, '').trim().toLowerCase();
      return vClean === cleanInputNip || (cleanInputNip === 'admin' && v.role === 'Superadmin');
    });

    if (!matched) {
      return res.status(401).json({
        success: false,
        message: 'NIP tidak ditemukan dalam daftar aparatur verifikator OPD'
      });
    }

    const isSuperadmin = cleanInputNip === 'admin' || matched.role === 'Superadmin';
    const pwd = password.trim();
    const validSuperadmin = isSuperadmin && (pwd === 'admin123' || pwd === 'sipantau2026' || pwd === 'petugas123');
    const validOfficer = !isSuperadmin && (pwd === 'petugas123' || pwd === 'sipantau2026');

    if (!validSuperadmin && !validOfficer) {
      return res.status(401).json({
        success: false,
        message: 'Kata sandi tidak sesuai untuk akun petugas ini'
      });
    }

    return res.json({
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
    });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.get('/api/audit-logs', (req: Request, res: Response) => {
  try {
    res.json({ success: true, data: getAuditLogs() });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.get('/api/operational-units', (req: Request, res: Response) => {
  try {
    res.json({ success: true, data: getOperationalUnits() });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.get('/api/verifiers', (req: Request, res: Response) => {
  try {
    res.json({ success: true, data: getVerifierAccounts() });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Reset database ke kondisi awal
app.post('/api/database/reset', (req: Request, res: Response) => {
  try {
    resetAndSeedDatabase();
    res.json({
      success: true,
      message: 'Database SQLite berhasil di-reset dan di-reseed ke konfigurasi awal',
      data: getAllTickets()
    });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Jalankan Server
const server = app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 SIPANTAU Backend REST API Server aktif di http://localhost:${PORT}`);
  console.log(`📊 Database: SQLite persisten di tugas_gabut-main/database/sipantau.sqlite`);
  console.log(`🔗 Endpoint Health: http://localhost:${PORT}/api/health`);
  console.log(`🎫 Endpoint Tiket:  http://localhost:${PORT}/api/tickets`);
});

export default app;
