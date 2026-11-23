/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import {
  Home,
  FileEdit,
  MapPin,
  ShieldCheck,
  HelpCircle,
  Search,
  ExternalLink,
  RotateCcw,
  UserCheck,
  CheckCircle2,
  AlertTriangle,
  Clock,
  PhoneCall,
  Check,
  X,
  Printer,
  Star,
  Sun,
  Moon,
  Maximize2,
  Minimize2,
  Sparkles,
  Download,
  ArrowLeft,
  Lock,
  FileSpreadsheet,
  ShieldAlert,
  LogOut,
  Menu,
  Copy,
  Keyboard,
  MessageSquare,
  ImagePlus,
  Send,
  Camera,
  Wrench,
  Database,
  Server,
  HardDrive,
  RefreshCw
} from 'lucide-react';

import {
  INITIAL_TICKETS,
  calculateDailyStats,
  addTicketMessage,
  addTicketRating,
  generateTicketsCsv,
  DailyStats,
  CivicTicket
} from './utils/civic-db';
import {
  checkBackendHealth,
  fetchTickets,
  fetchTicketById,
  createTicket,
  updateTicketStatus,
  sendTicketMessage,
  sendTicketRating,
  upvoteTicket,
  resetDatabase,
  BackendHealth
} from './utils/api-client';
import { LandingLoginPage } from './components/LandingLoginPage';

interface PageItem {
  id: string;
  title: string;
  shortLabel: string;
  icon: React.ComponentType<{ className?: string }>;
  path: string;
  description: string;
  role: 'warga' | 'petugas' | 'umum';
}

const resolveSubPath = (p: string) => {
  const base = import.meta.env.BASE_URL || './';
  const cleanBase = base.endsWith('/') ? base : base + '/';
  const cleanP = p.startsWith('/') ? p.slice(1) : p;
  return `${cleanBase}${cleanP}`;
};

const CITIZEN_PAGES: PageItem[] = [
  {
    id: 'beranda',
    title: 'Beranda Portal Warga SIPANTAU',
    shortLabel: 'Beranda',
    icon: Home,
    path: resolveSubPath('stitch_sistem_pengaduan_masyarakat/beranda_sistem_pengaduan_masyarakat/code.html'),
    description: 'Portal publik warga: ringkasan aduan, transparansi penanganan, dan alur pelaporan',
    role: 'warga'
  },
  {
    id: 'formulir',
    title: 'Formulir Pengaduan Multi-Step Warga',
    shortLabel: 'Buat Aduan',
    icon: FileEdit,
    path: resolveSubPath('stitch_sistem_pengaduan_masyarakat/formulir_pengaduan_multi_step_warga/code.html'),
    description: 'Pelaporan warga dengan geotagging GPS OpenStreetMap & verifikasi bukti EXIF',
    role: 'warga'
  },
  {
    id: 'peta',
    title: 'Peta Sebaran Laporan Warga',
    shortLabel: 'Peta Aduan Warga',
    icon: MapPin,
    path: resolveSubPath('stitch_sistem_pengaduan_masyarakat/peta_pengaduan_kolektif_warga/code.html'),
    description: 'Peta interaktif Leaflet GIS sebaran aduan publik, filter kategori, satelit & dukungan warga',
    role: 'warga'
  },
  {
    id: 'bantuan',
    title: 'Pusat Bantuan & Kebijakan Warga',
    shortLabel: 'Pusat Bantuan',
    icon: HelpCircle,
    path: resolveSubPath('stitch_sistem_pengaduan_masyarakat/pusat_bantuan_kebijakan_privasi_sipantau/code.html'),
    description: 'FAQ interaktif akordion, pedoman pelaporan warga, dan kebijakan privasi',
    role: 'warga'
  }
];

const OFFICER_PAGE: PageItem = {
  id: 'dashboard',
  title: 'SIPANTAU BACKOFFICE — Verifikasi & Triase Petugas OPD',
  shortLabel: 'Panel Petugas OPD',
  icon: ShieldCheck,
  path: resolveSubPath('stitch_sistem_pengaduan_masyarakat/dashboard_petugas_verifikasi_disposisi/code.html'),
  description: 'Panel kerja khusus verifikator Pemda, triase antrean, disposisi teknis dinas, dan ekspor CSV',
  role: 'petugas'
};

const ALL_PAGES: PageItem[] = [...CITIZEN_PAGES, OFFICER_PAGE];

// Helper kompresi gambar berbasis Canvas (mencegah batas kuota localStorage ~5MB)
function compressImageCanvas(file: File, maxWidth = 1000, quality = 0.72): Promise<string> {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        let width = img.width;
        let height = img.height;
        if (width > maxWidth || height > maxWidth) {
          if (width > height) {
            height = Math.round((height * maxWidth) / width);
            width = maxWidth;
          } else {
            width = Math.round((width * maxWidth) / height);
            height = maxWidth;
          }
        }
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (!ctx) return resolve(e.target?.result as string);
        ctx.drawImage(img, 0, 0, width, height);
        resolve(canvas.toDataURL('image/jpeg', quality));
      };
      img.onerror = () => resolve(e.target?.result as string);
      img.src = e.target?.result as string;
    };
    reader.onerror = () => resolve('');
    reader.readAsDataURL(file);
  });
}

export default function App() {
  const [portalMode, setPortalMode] = useState<'landing' | 'warga' | 'petugas'>(() => {
    try {
      const saved = localStorage.getItem('SIPANTAU_PORTAL_MODE');
      if (saved === 'petugas') return 'petugas';
      return 'warga';
    } catch (e) {
      return 'warga';
    }
  });
  const [activeTab, setActiveTab] = useState<string>('beranda');
  const [showTracker, setShowTracker] = useState<boolean>(false);
  const [trackerQuery, setTrackerQuery] = useState<string>('#LAPOR-2410-092');
  const [trackerResult, setTrackerResult] = useState<any>(null);
  const [showOfficerLoginModal, setShowOfficerLoginModal] = useState<boolean>(false);
  const [showReceiptModal, setShowReceiptModal] = useState<boolean>(false);
  const [receiptTicket, setReceiptTicket] = useState<any>(null);
  const [iframeKey, setIframeKey] = useState<number>(0);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [showShortcutsModal, setShowShortcutsModal] = useState<boolean>(false);
  const [copiedTicketId, setCopiedTicketId] = useState<boolean>(false);

  // Status Koneksi Backend REST API & Database SQLite
  const [backendStatus, setBackendStatus] = useState<BackendHealth>({
    connected: false,
    database: 'LocalStorage Cache',
    mode: 'localStorage'
  });
  const [showDatabaseModal, setShowDatabaseModal] = useState<boolean>(false);
  const [isPingingBackend, setIsPingingBackend] = useState<boolean>(false);

  // Dark Mode & Focus Mode
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    try {
      return localStorage.getItem('SIPANTAU_DARK_MODE') === 'true';
    } catch (e) {
      return false;
    }
  });
  const [focusMode, setFocusMode] = useState<boolean>(false);
  const [iframeLoading, setIframeLoading] = useState<boolean>(true);

  const isOfficerMode = portalMode === 'petugas';
  const isLandingMode = portalMode === 'landing';
  const activePage = isOfficerMode ? OFFICER_PAGE : (CITIZEN_PAGES.find((p) => p.id === activeTab) || CITIZEN_PAGES[0]);

  const [replyText, setReplyText] = useState<string>('');
  const [replyPhoto, setReplyPhoto] = useState<string | null>(null);
  const [replyRole, setReplyRole] = useState<'warga' | 'petugas'>('warga');
  const [replyName, setReplyName] = useState<string>('Budi Pratama (Warga)');
  const [dailyStats, setDailyStats] = useState<DailyStats>(() => calculateDailyStats(INITIAL_TICKETS));

  // Rating CSAT State
  const [ratingStars, setRatingStars] = useState<number>(5);
  const [ratingAspects, setRatingAspects] = useState<string[]>(['Respon Cepat', 'Pengerjaan Rapi']);
  const [ratingComment, setRatingComment] = useState<string>('');

  const QUICK_PROMPTS_WARGA = [
    'Kapan estimasi tim tiba di lokasi?',
    'Foto kondisi terbaru sudah kami lampirkan.',
    'Kondisi jalan/fasilitas semakin membahayakan pengguna.'
  ];

  const QUICK_PROMPTS_PETUGAS = [
    'Tim Regu Reaksi Cepat (URC) sedang meluncur ke titik lokasi.',
    'Penanganan fisik lapangan telah selesai dikerjakan 100%.',
    'Mohon patokan gedung atau nomor rumah terdekat untuk verifikasi tim.'
  ];

  // Helper untuk membaca tiket dari LocalStorage
  const loadTickets = () => {
    try {
      const raw = localStorage.getItem('SIPANTAU_CIVIC_DB_V2');
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {}
    return INITIAL_TICKETS;
  };

  const refreshStats = () => {
    const currentTickets = loadTickets();
    setDailyStats(calculateDailyStats(currentTickets));
  };

  // Cek dan sinkronkan status backend REST API & SQLite
  const checkBackend = async () => {
    setIsPingingBackend(true);
    try {
      const status = await checkBackendHealth();
      setBackendStatus(status);
      if (status.connected) {
        const freshTickets = await fetchTickets();
        setDailyStats(calculateDailyStats(freshTickets));
      }
    } catch (e) {
      console.warn('Backend check error:', e);
    } finally {
      setIsPingingBackend(false);
    }
  };

  const handleSearchTicket = async (queryStr: string) => {
    const norm = (s: string) => s.trim().toUpperCase().replace(/^#/, '');
    const q = norm(queryStr);
    const tickets = loadTickets();
    const found = q
      ? tickets.find(
          (t: any) => {
            const tid = norm(t.id || '');
            const tcode = norm(t.code || '');
            return (
              tid === q ||
              tcode === q ||
              tid.replace('TKT-', 'LAPOR-') === q ||
              tid.replace('LAPOR-', 'TKT-') === q ||
              tcode.replace('TKT-', 'LAPOR-') === q ||
              tcode.replace('LAPOR-', 'TKT-') === q ||
              (q.length >= 4 && (tid.includes(q.slice(-4)) || tcode.includes(q.slice(-4)))) ||
              (t.judul && t.judul.toUpperCase().includes(q))
            );
          }
        )
      : undefined;
    setTrackerResult(found || null);
    refreshStats();

    // Bila ada koneksi backend, ambil data tiket paling mutakhir dari database SQLite
    if (q) {
      try {
        const fresh = await fetchTicketById(q);
        if (fresh) {
          setTrackerResult(fresh);
        }
      } catch (e) {}
    }
  };

  useEffect(() => {
    try {
      if (localStorage.getItem('SIPANTAU_PORTAL_MODE') === 'landing') {
        localStorage.setItem('SIPANTAU_PORTAL_MODE', 'warga');
        setPortalMode('warga');
      }
    } catch (e) {}
    refreshStats();
    checkBackend();
    const handleStorage = () => refreshStats();
    window.addEventListener('storage', handleStorage);
    window.addEventListener('sipantau:db-updated', handleStorage);
    return () => {
      window.removeEventListener('storage', handleStorage);
      window.removeEventListener('sipantau:db-updated', handleStorage);
    };
  }, []);

  useEffect(() => {
    const handleMsg = (e: MessageEvent) => {
      if (e.data && e.data.type === 'sipantau:navigate') {
        if (['beranda', 'formulir', 'peta', 'bantuan'].includes(e.data.page)) setActiveTab(e.data.page);
        return;
      }
      if (e.data && e.data.type === 'sipantau:open-tracker') {
        if (e.data.ticketId) {
          setTrackerQuery(e.data.ticketId);
          handleSearchTicket(e.data.ticketId);
        }
        setShowTracker(true);
        return;
      }
      if (e.data && e.data.type === 'sipantau:switch-portal') {
        const mode = e.data.mode;
        setPortalMode(mode);
        localStorage.setItem('SIPANTAU_PORTAL_MODE', mode);
        if (mode === 'warga') {
          setActiveTab('beranda');
        } else {
          setActiveTab('dashboard');
        }
        setIframeKey((k) => k + 1);
      }
    };
    window.addEventListener('message', handleMsg);
    return () => window.removeEventListener('message', handleMsg);
  }, []);

  useEffect(() => {
    if (showTracker) {
      handleSearchTicket(trackerQuery);
    }
  }, [showTracker]);

  // Dark Mode Sync
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('SIPANTAU_DARK_MODE', 'true');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('SIPANTAU_DARK_MODE', 'false');
    }
    try {
      if (iframeRef.current && iframeRef.current.contentDocument) {
        iframeRef.current.contentDocument.documentElement.classList.toggle('dark', darkMode);
      }
    } catch (e) {}
  }, [darkMode]);

  // Tampilkan indikator muat setiap halaman iframe berganti
  useEffect(() => {
    setIframeLoading(true);
  }, [activeTab, portalMode, iframeKey]);

  // Keyboard Shortcuts: Esc tutup dialog, '?' / 'h' bantuan shortcut, 't' lacak tiket
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      // Abaikan jika fokus pada elemen input/textarea/select
      const target = e.target as HTMLElement | null;
      const isInput = target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.tagName === 'SELECT' || target.isContentEditable);

      if (e.key === 'Escape') {
        if (showShortcutsModal) setShowShortcutsModal(false);
        else if (mobileMenuOpen) setMobileMenuOpen(false);
        else if (showReceiptModal) setShowReceiptModal(false);
        else if (showOfficerLoginModal) setShowOfficerLoginModal(false);
        else if (showTracker) setShowTracker(false);
        else if (focusMode) setFocusMode(false);
        return;
      }

      if (isInput) return;

      // '?' atau 'h' -> Buka info Pintasan Keyboard
      if (e.key === '?' || e.key === 'H' || e.key === 'h') {
        e.preventDefault();
        setShowShortcutsModal((prev) => !prev);
      }
      // 't' atau 'T' -> Buka Pelacak Tiket
      else if (e.key === 't' || e.key === 'T') {
        e.preventDefault();
        setShowTracker(true);
      }
      // 'd' atau 'D' -> Toggle Dark Mode
      else if (e.key === 'd' || e.key === 'D') {
        e.preventDefault();
        setDarkMode((prev) => !prev);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [showReceiptModal, showOfficerLoginModal, showTracker, focusMode, showShortcutsModal, mobileMenuOpen]);

  const handleResetDB = async () => {
    if (!window.confirm('Kembalikan semua data ke data contoh? Aduan yang sudah dibuat akan terhapus.')) return;
    await resetDatabase();
    setIframeKey((k) => k + 1);
    refreshStats();
    checkBackend();
  };

  const handleExportBackup = () => {
    const data = loadTickets();
    const jsonStr = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `sipantau_database_backup_${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleExportCSV = () => {
    const data = loadTickets();
    const csvContent = generateTicketsCsv(data);
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `sipantau_rekap_aduan_opd_${new Date().toISOString().slice(0, 10)}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const switchPage = (id: string) => {
    setActiveTab(id);
    refreshStats();
  };

  const handleSendAppReply = async () => {
    if (!trackerResult) return;
    if (!replyText.trim() && !replyPhoto) return;

    try {
      const updated = await sendTicketMessage(trackerResult.id, {
        senderRole: replyRole,
        senderName: replyName.trim() || (replyRole === 'warga' ? 'Budi Pratama' : 'Petugas OPD'),
        text: replyText.trim() || (replyPhoto ? '(Melampirkan foto pendukung)' : ''),
        foto: replyPhoto || undefined
      });
      setTrackerResult(updated);
      setReplyText('');
      setReplyPhoto(null);
      refreshStats();
      window.dispatchEvent(new CustomEvent('sipantau:db-updated'));
    } catch (err) {
      console.error('Gagal mengirim pesan klarifikasi:', err);
    }
  };

  const handleSendRating = async () => {
    if (!trackerResult) return;
    try {
      const updated = await sendTicketRating(trackerResult.id, {
        stars: ratingStars,
        aspects: ratingAspects,
        comment: ratingComment
      });
      setTrackerResult(updated);
      setRatingComment('');
      refreshStats();
      window.dispatchEvent(new CustomEvent('sipantau:db-updated'));
    } catch (err) {
      console.error('Gagal mengirim evaluasi rating:', err);
    }
  };

  const handleRequestReview = () => {
    if (!trackerResult) return;
    const tickets = loadTickets();
    const idx = tickets.findIndex((t: any) => t.id === trackerResult.id);
    if (idx === -1) return;
    let updated: any = addTicketMessage(tickets[idx], {
      senderRole: 'warga',
      senderName: 'Pelapor',
      text: 'Mengajukan tinjau ulang: hasil perbaikan di lokasi belum sesuai.'
    });
    const now = new Date().toLocaleString('id-ID', { dateStyle: 'medium', timeStyle: 'short' });
    updated = {
      ...updated,
      status: 'Penanganan',
      timeline: [
        ...(updated.timeline || []).map((s: any) => ({ ...s, active: false })),
        { tahap: 'Tinjau Ulang Diajukan', waktu: now, keterangan: 'Warga menyatakan perbaikan belum sesuai. Tiket dibuka kembali untuk diverifikasi petugas.', done: false, active: true }
      ]
    };
    tickets[idx] = updated;
    localStorage.setItem('SIPANTAU_CIVIC_DB_V2', JSON.stringify(tickets));
    window.dispatchEvent(new CustomEvent('sipantau:db-updated'));
    setTrackerResult(updated);
  };

  const handleOpenReceipt = (ticket: any) => {
    setReceiptTicket(ticket);
    setShowReceiptModal(true);
  };

  return (
    <div className={`flex flex-col h-screen h-[100dvh] w-screen ${darkMode ? 'dark bg-[#121214] text-[#e3e2e6]' : 'bg-[#fbf8fe] text-[#1b1b1f]'} overflow-hidden font-sans transition-colors`}>
      {/* Aksesibilitas: Lewati ke konten utama (WCAG 2.4.1) */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[9999] focus:px-4 focus:py-2 focus:bg-[#9e001f] focus:text-white focus:rounded-lg focus:shadow-xl focus:font-bold focus:outline-none focus:ring-2 focus:ring-white"
      >
        Lewati ke Konten Utama
      </a>

      {/* FLOATING FOCUS MODE RESTORE BUTTON */}
      {focusMode && (
        <button
          onClick={() => setFocusMode(false)}
          className="cursor-pointer fixed top-3 right-3 z-50 px-3.5 py-1.5 rounded-full bg-[#9e001f] text-white text-xs font-semibold shadow-xl flex items-center gap-1.5 border border-white/20 hover:bg-[#c8102e] transition animate-in fade-in focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
          title="Tampilkan kembali bilah portal atas"
        >
          <Minimize2 className="w-3.5 h-3.5" />
          <span>Keluar Layar Penuh</span>
        </button>
      )}

      {/* ================= SATU STICKY NAVBAR PUTIH BERSIH ================= */}
      {!focusMode && !isOfficerMode && (
        <header className="sticky top-0 z-50 h-16 md:h-[68px] bg-white dark:bg-[#181920] border-b border-[#E2E8F0] dark:border-white/10 px-4 md:px-8 flex items-center justify-between shadow-xs shrink-0 transition-colors">
          {/* KIRI: Logo + SIPANTAU */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => switchPage('beranda')}
              className="cursor-pointer flex items-center gap-2.5 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9e001f] rounded-xl p-1 group"
              title="Beranda SIPANTAU"
            >
              <div className="w-9 h-9 rounded-xl bg-[#9e001f] text-white flex items-center justify-center shadow-sm group-hover:bg-[#b00b25] transition">
                <ShieldCheck className="w-5 h-5 text-white" />
              </div>
              <div>
                <span className="font-extrabold text-lg md:text-xl tracking-tight text-[#9e001f] dark:text-[#ffb4ab] font-sans block leading-none">
                  SIPANTAU
                </span>
                <span className="text-[10px] text-slate-500 dark:text-slate-400 font-medium hidden sm:block mt-0.5">
                  Layanan Pengaduan Masyarakat
                </span>
              </div>
            </button>
          </div>

          {/* TENGAH: Tepat 5 menu teks bersih TANPA ikon di tiap menu */}
          <nav className="hidden lg:flex items-center gap-8 text-sm font-semibold" aria-label="Navigasi Utama">
            {[
              { id: 'beranda', label: 'Beranda' },
              { id: 'formulir', label: 'Buat Aduan' },
              { id: 'peta', label: 'Peta Pengaduan' },
              { id: 'lacak', label: 'Lacak Tiket' },
              { id: 'bantuan', label: 'Bantuan' }
            ].map((item) => {
              const isActive = (item.id === 'lacak' && showTracker) || (activeTab === item.id && !showTracker);
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    if (item.id === 'lacak') {
                      setShowTracker(true);
                      handleSearchTicket(trackerQuery);
                    } else {
                      setShowTracker(false);
                      switchPage(item.id);
                    }
                  }}
                  className={`cursor-pointer py-1.5 px-1 transition-colors relative rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9e001f] ${
                    isActive
                      ? 'text-[#9e001f] dark:text-[#ffb4ab] font-bold after:content-[""] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-[#9e001f] dark:after:bg-[#ffb4ab]'
                      : 'text-slate-600 dark:text-slate-300 hover:text-[#9e001f] dark:hover:text-white'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* KANAN: Link Portal OPD + Tombol Masuk & Daftar + Hamburger */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            {/* Status Backend & Database SQLite Pill */}
            <button
              onClick={() => setShowDatabaseModal(true)}
              className="cursor-pointer hidden md:inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 text-slate-700 dark:text-slate-200 hover:border-[#9e001f] transition text-[11px] font-medium"
              title="Klik untuk melihat status backend & database SQLite"
            >
              <Database className="w-3.5 h-3.5 text-[#9e001f] dark:text-[#ffb4ab]" />
              <span className={`w-1.5 h-1.5 rounded-full ${backendStatus.connected ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'}`} />
              <span className="font-mono text-[10px]">
                {backendStatus.connected ? 'SQLite DB' : 'Offline'}
              </span>
            </button>

            {/* Dark Mode switcher */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="cursor-pointer p-2 rounded-lg border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 text-slate-600 dark:text-amber-300 hover:text-[#9e001f] transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9e001f]"
              title={darkMode ? 'Beralih ke Mode Terang' : 'Beralih ke Mode Gelap'}
              aria-label="Ganti tema"
            >
              {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            {/* Link Portal OPD */}
            <button
              onClick={() => setShowOfficerLoginModal(true)}
              className="cursor-pointer text-xs font-semibold text-slate-700 dark:text-slate-200 hover:text-[#9e001f] px-2.5 py-1.5 rounded-lg hover:bg-slate-50 dark:hover:bg-white/5 transition hidden sm:inline-flex items-center gap-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9e001f]"
              title="Akses Portal Petugas OPD"
            >
              <span>Portal OPD</span>
            </button>

            {/* Tombol Masuk */}
            <button
              onClick={() => {
                setPortalMode('landing');
                localStorage.setItem('SIPANTAU_PORTAL_MODE', 'landing');
              }}
              className="cursor-pointer px-3.5 py-2 rounded-lg border border-slate-300 dark:border-white/20 text-slate-700 dark:text-slate-200 hover:border-[#9e001f] hover:text-[#9e001f] text-xs font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9e001f]"
            >
              Masuk
            </button>

            {/* Tombol Daftar */}
            <button
              onClick={() => switchPage('formulir')}
              className="cursor-pointer px-4 py-2 rounded-lg bg-[#9e001f] hover:bg-[#800019] text-white text-xs font-bold shadow-xs transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9e001f] focus-visible:ring-offset-1"
            >
              Daftar
            </button>

            {/* Mobile Hamburger Menu Button (Min 44x44px touch target) */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="cursor-pointer min-h-[44px] min-w-[44px] flex items-center justify-center p-2 rounded-lg border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-200 lg:hidden hover:bg-slate-100 dark:hover:bg-white/10 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9e001f]"
              aria-label="Buka navigasi mobile"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </header>
      )}

      {/* DROPDOWN MENU MOBILE: 5 Menu + Portal OPD + Masuk & Daftar */}
      {!focusMode && !isOfficerMode && mobileMenuOpen && (
        <div className="lg:hidden bg-white dark:bg-[#181920] border-b border-[#E2E8F0] dark:border-white/10 px-4 py-3 space-y-2 shadow-lg z-40 animate-in slide-in-from-top-2 duration-150">
          <div className="flex flex-col space-y-1">
            {[
              { id: 'beranda', label: 'Beranda' },
              { id: 'formulir', label: 'Buat Aduan' },
              { id: 'peta', label: 'Peta Pengaduan' },
              { id: 'lacak', label: 'Lacak Tiket' },
              { id: 'bantuan', label: 'Bantuan' }
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setMobileMenuOpen(false);
                  if (item.id === 'lacak') {
                    setShowTracker(true);
                    handleSearchTicket(trackerQuery);
                  } else {
                    switchPage(item.id);
                  }
                }}
                className={`cursor-pointer min-h-[44px] flex items-center text-left px-3 py-2 rounded-lg text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9e001f] ${
                  activeTab === item.id
                    ? 'bg-[#ffdad8]/50 text-[#9e001f] dark:bg-[#9e001f]/20 dark:text-[#ffdad8]'
                    : 'text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-white/5'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="pt-2 border-t border-slate-200 dark:border-white/10 flex items-center justify-between gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                setShowOfficerLoginModal(true);
              }}
              className="cursor-pointer min-h-[40px] text-xs font-semibold text-slate-700 dark:text-slate-300 py-1.5 px-2 hover:text-[#9e001f] rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9e001f]"
            >
              Portal OPD
            </button>
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setPortalMode('landing');
                  localStorage.setItem('SIPANTAU_PORTAL_MODE', 'landing');
                }}
                className="cursor-pointer min-h-[40px] px-3.5 py-1.5 rounded-lg border border-slate-300 text-xs font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9e001f]"
              >
                Masuk
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  switchPage('formulir');
                }}
                className="cursor-pointer min-h-[40px] px-3.5 py-1.5 rounded-lg bg-[#9e001f] text-white text-xs font-bold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9e001f]"
              >
                Daftar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* DEDICATED HEADER: BACKOFFICE PETUGAS OPD (SATU NAVBAR BERSIH) */}
      {!focusMode && isOfficerMode && (
        <header className="h-16 md:h-[68px] bg-[#131418] text-white px-4 md:px-8 flex items-center justify-between shadow-md shrink-0 border-b border-red-500/30 sticky top-0 z-50">
          {/* Brand & Emblem (Backoffice Petugas) */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-red-600/20 border border-red-500/40 flex items-center justify-center text-red-400 shadow-xs shrink-0">
              <ShieldAlert className="w-5 h-5 text-red-500" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-lg md:text-xl tracking-tight text-white">
                  SIPANTAU BACKOFFICE
                </span>
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-red-600/30 text-red-300 border border-red-500/30 shrink-0">
                  PETUGAS OPD
                </span>
              </div>
              <p className="text-[10px] text-gray-400 leading-none hidden sm:block mt-0.5">
                Panel Verifikasi &amp; Triase Disposisi Dinas Pemda
              </p>
            </div>
          </div>

          {/* Live Status Triase */}
          <div className="hidden lg:flex items-center gap-3 text-xs text-gray-300 bg-white/5 border border-white/10 px-3.5 py-1.5 rounded-xl">
            <span className="font-semibold text-white">Budi Santoso, S.STP</span>
            <span className="text-white/20">|</span>
            <span className="text-amber-300 font-semibold">{dailyStats.aduanHariIni} Aduan Hari Ini</span>
            <span className="text-white/20">|</span>
            <span className="text-emerald-400 font-semibold">{dailyStats.sedangDiproses} Dalam Penanganan</span>
          </div>

          {/* Backoffice Tools & Exit Button */}
          <div className="flex items-center gap-2">
            {/* Status Database SQLite Backoffice */}
            <button
              onClick={() => setShowDatabaseModal(true)}
              className="cursor-pointer hidden lg:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-950/50 border border-emerald-500/40 hover:bg-emerald-900/50 text-emerald-300 text-xs font-semibold transition"
              title="Status Database SQLite & REST API Server"
            >
              <Database className="w-3.5 h-3.5 text-emerald-400" />
              <span className={`w-1.5 h-1.5 rounded-full ${backendStatus.connected ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'}`} />
              <span>{backendStatus.connected ? 'SQLite (Port 3001)' : 'Cache Browser'}</span>
            </button>

            <button
              onClick={handleExportCSV}
              className="cursor-pointer min-h-[38px] flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-800 hover:bg-emerald-700 text-white border border-emerald-500/40 text-xs font-semibold shadow-xs transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
              title="Unduh Rekapitulasi CSV"
            >
              <FileSpreadsheet className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Ekspor CSV</span>
            </button>

            <button
              onClick={handleExportBackup}
              className="cursor-pointer min-h-[38px] min-w-[38px] flex items-center justify-center p-2 rounded-lg bg-white/10 hover:bg-white/20 text-gray-300 hover:text-white transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              title="Unduh Cadangan JSON"
              aria-label="Unduh cadangan data"
            >
              <Download className="w-4 h-4" />
            </button>

            <button
              onClick={() => setDarkMode(!darkMode)}
              className="cursor-pointer min-h-[38px] min-w-[38px] flex items-center justify-center p-2 rounded-lg bg-white/10 hover:bg-white/20 text-gray-300 hover:text-white transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              title={darkMode ? 'Beralih ke Mode Terang' : 'Beralih ke Mode Gelap'}
              aria-label="Ganti mode"
            >
              {darkMode ? <Sun className="w-4 h-4 text-amber-300" /> : <Moon className="w-4 h-4" />}
            </button>

            <button
              onClick={() => {
                setPortalMode('landing');
                localStorage.setItem('SIPANTAU_PORTAL_MODE', 'landing');
              }}
              className="cursor-pointer min-h-[38px] flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#9e001f] hover:bg-[#c8102e] text-white border border-red-400/40 text-xs font-bold shadow-md transition ml-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-400"
              title="Keluar Sesi ke Halaman Landing"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Keluar Sesi</span>
            </button>
          </div>
        </header>
      )}



      {/* MAIN VIEWPORT: IFRAME RENDERING STITCH PAGES OR DEDICATED LANDING LOGIN */}
      {isLandingMode ? (
        <LandingLoginPage
          onSelectRole={(role, profile) => {
            setPortalMode(role);
            localStorage.setItem('SIPANTAU_PORTAL_MODE', role);
            if (role === 'warga') {
              setActiveTab('beranda');
            } else {
              setActiveTab('dashboard');
            }
            setIframeKey((k) => k + 1);
          }}
          darkMode={darkMode}
          onToggleDarkMode={() => setDarkMode(!darkMode)}
          onOpenTracker={() => {
            setShowTracker(true);
            handleSearchTicket(trackerQuery);
          }}
          dailyStats={dailyStats}
        />
      ) : (
        <main id="main-content" tabIndex={-1} className="flex-1 w-full h-full relative overflow-hidden bg-white dark:bg-[#1b1b1f] focus:outline-none">
          {iframeLoading && (
            <div role="status" className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-3 bg-[#fbf8fe] dark:bg-[#121214] text-sm text-[#5c403f] dark:text-gray-300">
              <span aria-hidden="true" className="w-8 h-8 rounded-full border-4 border-[#ffdad8] dark:border-white/10 border-t-[#9e001f] animate-spin motion-reduce:animate-none" />
              <span>Memuat {activePage.shortLabel}…</span>
            </div>
          )}
          <iframe
            key={`${activePage.id}-${iframeKey}`}
            ref={iframeRef}
            src={activePage.path}
            title={activePage.title}
            className="w-full h-full border-0 select-auto"
            allow="geolocation; camera"
            onLoad={() => setIframeLoading(false)}
          />
        </main>
      )}



      {/* TRACKER MODAL */}
      {showTracker && (
        <div role="dialog" aria-modal="true" aria-label="Pelacak status pengaduan" onClick={(e) => e.target === e.currentTarget && setShowTracker(false)} className="fixed inset-0 z-50 flex items-center justify-center p-3 md:p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white dark:bg-[#1e1e22] text-[#1b1b1f] dark:text-white rounded-2xl max-w-2xl w-full border border-[#e5bdbb] dark:border-white/10 shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            <div className="bg-[#9e001f] text-white p-4 md:p-5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 md:w-10 md:h-10 rounded-xl bg-white/15 flex items-center justify-center">
                  <Search className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-base md:text-lg">Pelacak Status Pengaduan SIPANTAU</h3>
                  <p className="text-xs text-[#ffdad8]">Cek progres triase dan disposisi teknis OPD secara langsung</p>
                </div>
              </div>
              <button
                onClick={() => setShowTracker(false)}
                aria-label="Tutup pelacak"
                className="cursor-pointer p-1.5 rounded-lg hover:bg-white/15 text-white transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 md:p-6 space-y-4 max-h-[75vh] overflow-y-auto">
              {/* Search Bar */}
              <div className="flex gap-2">
                <input
                  type="text"
                  value={trackerQuery}
                  onChange={(e) => setTrackerQuery(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSearchTicket(trackerQuery)}
                  placeholder="Masukkan nomor tiket (misal: #LAPOR-2410-092 atau #TKT-2024-8841)..."
                  className="flex-1 px-4 py-2.5 rounded-xl border border-[#e5bdbb] dark:border-white/20 bg-white dark:bg-[#2b2b30] text-sm focus:outline-none focus:border-[#9e001f] focus:ring-2 focus:ring-[#9e001f]"
                />
                <button
                  onClick={() => handleSearchTicket(trackerQuery)}
                  className="cursor-pointer min-h-[44px] px-4 md:px-5 py-2.5 rounded-xl bg-[#c8102e] hover:bg-[#9e001f] text-white font-semibold text-sm transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9e001f]"
                >
                  Lacak
                </button>
              </div>

              {/* Quick IDs */}
              <div className="flex flex-wrap items-center gap-1.5 text-xs text-[#5c403f] dark:text-gray-300">
                <span>Pilihan cepat:</span>
                {['#LAPOR-2410-092', '#TKT-2024-8841', '#TKT-2024-8840', '#TKT-2024-8835'].map((id) => (
                  <button
                    key={id}
                    onClick={() => {
                      setTrackerQuery(id);
                      handleSearchTicket(id);
                    }}
                    className="cursor-pointer px-2.5 py-1.5 rounded-full bg-[#ffdad8]/70 dark:bg-white/10 text-[#9e001f] dark:text-[#ffdad8] font-mono font-bold hover:bg-[#ffdad8] transition text-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9e001f]"
                  >
                    {id}
                  </button>
                ))}
              </div>

              {/* Tracker Result Content */}
              {trackerResult ? (
                <div className="rounded-xl border border-[#e5bdbb] dark:border-white/10 bg-[#fbf8fe] dark:bg-[#25252a] p-4 md:p-5 space-y-4">
                  <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-[#e5bdbb] dark:border-white/10">
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-1 rounded bg-white dark:bg-[#1e1e22] border border-[#e5bdbb] dark:border-white/10 font-mono font-bold text-xs text-[#9e001f] dark:text-[#ffb4ab]">
                        {trackerResult.id}
                      </span>
                      <button
                        onClick={() => {
                          navigator.clipboard?.writeText(trackerResult.id);
                          setCopiedTicketId(true);
                          setTimeout(() => setCopiedTicketId(false), 2000);
                        }}
                        className="p-1 rounded-md hover:bg-gray-200 dark:hover:bg-white/10 text-gray-500 hover:text-[#9e001f] transition"
                        title="Salin Nomor Tiket"
                        aria-label="Salin nomor tiket"
                      >
                        {copiedTicketId ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                      </button>
                      <span className="text-xs text-[#5c403f] dark:text-gray-400">{trackerResult.waktu}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      {/* Tombol Cetak Bukti Tanda Terima Aduan */}
                      <button
                        onClick={() => handleOpenReceipt(trackerResult)}
                        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white dark:bg-[#1e1e22] border border-[#e5bdbb] dark:border-white/20 text-[#9e001f] dark:text-[#ffdad8] hover:bg-[#ffdad8]/40 text-xs font-bold transition shadow-2xs"
                        title="Cetak Tanda Terima Aduan Resmi untuk RT/RW atau Kelurahan"
                      >
                        <Printer className="w-3.5 h-3.5" />
                        <span>Cetak Bukti Lapor</span>
                      </button>

                      <span
                        className={`px-3 py-1 rounded-full text-xs font-bold ${
                          trackerResult.status === 'Selesai'
                            ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                            : trackerResult.status === 'Diverifikasi' || trackerResult.status === 'Penanganan'
                            ? 'bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300'
                            : trackerResult.status === 'Ditolak'
                            ? 'bg-gray-200 text-gray-800'
                            : 'bg-[#ffdad8] text-[#9e001f]'
                        }`}
                      >
                        {trackerResult.status.toUpperCase()}
                      </span>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-bold text-base text-[#1b1b1f] dark:text-white">{trackerResult.judul}</h4>
                    <p className="text-xs text-[#5c403f] dark:text-gray-400 mt-1">
                      {trackerResult.alamat} • <strong>{trackerResult.dinas}</strong>
                    </p>
                    <p className="text-xs text-[#1b1b1f] dark:text-gray-200 mt-2 p-3 rounded-lg bg-white dark:bg-[#1e1e22] border border-[#e5bdbb] dark:border-white/10 leading-relaxed">
                      "{trackerResult.deskripsi}"
                    </p>
                  </div>

                  {/* KONFIRMASI HASIL PERBAIKAN & TINJAU ULANG */}
                  {trackerResult.status === 'Selesai' && !trackerResult.rating && (
                    <div className="flex flex-wrap items-center justify-between gap-2 p-3 rounded-xl border border-[#e5bdbb] dark:border-white/10 bg-white dark:bg-[#1e1e22] text-xs">
                      <p className="text-[#5c403f] dark:text-gray-300">Perbaikan belum sesuai di lokasi? Minta petugas meninjau ulang. Jika sudah sesuai, beri evaluasi di bawah.</p>
                      <button
                        type="button"
                        onClick={handleRequestReview}
                        className="px-3 py-1.5 rounded-lg border border-[#9e001f] dark:border-[#ffb4ab] text-[#9e001f] dark:text-[#ffb4ab] font-bold hover:bg-[#ffdad8]/40 transition"
                      >
                        Ajukan tinjau ulang
                      </button>
                    </div>
                  )}

                  {/* SURVEI KEPUASAN WARGA (CSAT) UNTUK TIKET SELESAI */}
                  {trackerResult.status === 'Selesai' && (
                    <div className="p-4 rounded-xl border border-emerald-300 dark:border-emerald-800 bg-emerald-50/70 dark:bg-emerald-950/30 space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center">
                            <Star className="w-4 h-4 fill-white text-white" />
                          </div>
                          <div>
                            <h5 className="font-bold text-xs text-emerald-900 dark:text-emerald-200 uppercase tracking-wider">
                              Evaluasi & Kepuasan Pelayanan Warga (CSAT)
                            </h5>
                            <p className="text-[11px] text-emerald-800 dark:text-emerald-300">
                              Beri rating kinerja dinas teknis pemerintah daerah atas penanganan ini
                            </p>
                          </div>
                        </div>
                        {trackerResult.rating && (
                          <span className="px-2.5 py-0.5 rounded-full bg-emerald-200 text-emerald-900 font-bold text-xs flex items-center gap-1">
                            ★ {trackerResult.rating.stars} / 5
                          </span>
                        )}
                      </div>

                      {trackerResult.rating ? (
                        <div className="p-3 bg-white dark:bg-[#1e1e22] rounded-lg border border-emerald-200 dark:border-emerald-800/60 text-xs space-y-1.5">
                          <div className="flex items-center gap-1 text-amber-500 font-bold text-sm">
                            {[1, 2, 3, 4, 5].map((s) => (
                              <span key={s}>{s <= trackerResult.rating.stars ? '★' : '☆'}</span>
                            ))}
                            <span className="text-emerald-900 dark:text-emerald-300 text-xs ml-1 font-semibold">
                              ({trackerResult.rating.stars} Bintang - Ulasan Terverifikasi)
                            </span>
                          </div>
                          {trackerResult.rating.aspects && trackerResult.rating.aspects.length > 0 && (
                            <div className="flex flex-wrap gap-1 pt-1">
                              {trackerResult.rating.aspects.map((asp: string) => (
                                <span key={asp} className="px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-900/60 text-emerald-800 dark:text-emerald-200 text-[10px] font-semibold">
                                  ✓ {asp}
                                </span>
                              ))}
                            </div>
                          )}
                          <p className="text-[#1b1b1f] dark:text-gray-200 italic pt-1">
                            "{trackerResult.rating.comment || 'Penanganan telah diselesaikan dengan sangat baik.'}"
                          </p>
                        </div>
                      ) : (
                        <div className="space-y-2.5 pt-1">
                          {/* Star Selection */}
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-bold text-emerald-900 dark:text-emerald-200">Beri Bintang:</span>
                            <div className="flex gap-1 text-amber-500 text-xl cursor-pointer">
                              {[1, 2, 3, 4, 5].map((s) => (
                                <button
                                  key={s}
                                  type="button"
                                  onClick={() => setRatingStars(s)}
                                  aria-label={`${s} bintang`}
                                  className="hover:scale-125 transition transform"
                                >
                                  {s <= ratingStars ? '★' : '☆'}
                                </button>
                              ))}
                            </div>
                            <span className="text-xs font-bold text-emerald-900 dark:text-emerald-300 ml-1">
                              {ratingStars === 5 ? 'Sangat Puas' : ratingStars === 4 ? 'Puas' : ratingStars === 3 ? 'Cukup' : 'Kurang'}
                            </span>
                          </div>

                          {/* Aspects Chips */}
                          <div className="flex flex-wrap gap-1.5">
                            {['Respon Cepat', 'Pengerjaan Rapi', 'Petugas Ramah', 'Tepat Waktu', 'Informasi Jelas'].map((tag) => {
                              const active = ratingAspects.includes(tag);
                              return (
                                <button
                                  key={tag}
                                  type="button"
                                  onClick={() => {
                                    if (active) setRatingAspects(ratingAspects.filter((x) => x !== tag));
                                    else setRatingAspects([...ratingAspects, tag]);
                                  }}
                                  className={`cursor-pointer px-2.5 py-1 rounded-full text-[11px] font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 ${
                                    active
                                      ? 'bg-emerald-700 text-white shadow-2xs'
                                      : 'bg-white dark:bg-[#1e1e22] text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800 hover:bg-emerald-50 dark:hover:bg-emerald-950/20'
                                  }`}
                                >
                                  {active ? '✓ ' : '+ '} {tag}
                                </button>
                              );
                            })}
                          </div>

                          <div className="flex gap-2">
                            <input
                              type="text"
                              value={ratingComment}
                              onChange={(e) => setRatingComment(e.target.value)}
                              placeholder="Tulis ulasan/masukan warga untuk evaluasi dinas..."
                              className="flex-1 px-3 py-1.5 rounded-lg border border-emerald-300 dark:border-emerald-800 bg-white dark:bg-[#1e1e22] text-xs focus:outline-none focus:ring-2 focus:ring-emerald-600"
                            />
                            <button
                              type="button"
                              onClick={handleSendRating}
                              className="cursor-pointer min-h-[36px] px-4 py-1.5 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs transition shadow-2xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600"
                            >
                              Kirim Evaluasi
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Progressive Timeline */}
                  <div className="pt-2">
                    <h5 className="text-xs font-bold uppercase tracking-wider text-[#5c403f] dark:text-gray-300 mb-3">
                      Linimasa Penanganan & Audit Status
                    </h5>
                    <div className="space-y-3 pl-2 border-l-2 border-[#e5bdbb] dark:border-white/10">
                      {(trackerResult.timeline || []).map((step: any, idx: number) => (
                        <div key={idx} className="relative pl-3">
                          <span
                            className={`w-2.5 h-2.5 rounded-full absolute -left-[19px] top-1 ${
                              step.done
                                ? 'bg-emerald-600'
                                : step.active
                                ? 'bg-[#c8102e] ring-4 ring-[#ffdad8]'
                                : 'bg-gray-300 dark:bg-gray-600'
                            }`}
                          />
                          <div className="flex items-center justify-between text-xs font-semibold text-[#1b1b1f] dark:text-white">
                            <span>{step.tahap}</span>
                            <span className="text-[10px] font-mono text-[#5c403f] dark:text-gray-400">{step.waktu}</span>
                          </div>
                          <p className="text-xs text-[#5c403f] dark:text-gray-300 mt-0.5">{step.keterangan}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* KOMUNIKASI DUA ARAH WARGA & PETUGAS */}
                  <div className="pt-4 border-t border-[#e5bdbb] dark:border-white/10 space-y-3">
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-2.5 min-w-0">
                        <div className="w-8 h-8 rounded-lg bg-[#9e001f] text-white flex items-center justify-center shrink-0 shadow-xs">
                          <MessageSquare className="w-4 h-4 text-white" />
                        </div>
                        <div className="min-w-0">
                          <h5 className="text-xs font-bold uppercase tracking-wider text-[#1b1b1f] dark:text-white leading-tight">
                            Komunikasi Dua Arah Warga &amp; Petugas
                          </h5>
                          <p className="text-[11px] text-[#5c403f] dark:text-gray-400 leading-normal mt-0.5">
                            Klarifikasi &amp; pertukaran foto kondisi terkini
                          </p>
                        </div>
                      </div>
                      <span className="shrink-0 text-[10px] px-2.5 py-1 rounded-full bg-white dark:bg-[#1e1e22] border border-[#e5bdbb] dark:border-white/10 text-[#5c403f] dark:text-gray-300 font-mono font-bold">
                        {(trackerResult.messages || []).length} Pesan
                      </span>
                    </div>

                    {/* Chat Bubble List */}
                    <div className="space-y-2.5 max-h-56 overflow-y-auto pr-1">
                      {(!trackerResult.messages || trackerResult.messages.length === 0) ? (
                        <div className="p-3.5 text-center rounded-xl bg-white dark:bg-[#1e1e22] border border-dashed border-[#e5bdbb] dark:border-white/10 text-[#5c403f] dark:text-gray-400 text-xs">
                          Belum ada pesan pada tiket ini. Kirim pesan klarifikasi atau foto di bawah ini.
                        </div>
                      ) : (
                        trackerResult.messages.map((m: any, mIdx: number) => {
                          const isOfficer = m.senderRole === 'petugas';
                          return (
                            <div key={m.id || mIdx} className={`flex gap-2.5 ${isOfficer ? 'flex-row-reverse' : 'flex-row'}`}>
                              <div className={`w-7 h-7 rounded-full flex items-center justify-center text-white text-[11px] font-bold shrink-0 shadow-xs ${
                                isOfficer ? 'bg-[#9e001f]' : 'bg-[#006a6a]'
                              }`}>
                                {isOfficer ? 'OPD' : 'W'}
                              </div>
                              <div className={`max-w-[80%] space-y-1 ${isOfficer ? 'items-end text-right' : 'items-start text-left'}`}>
                                <div className={`flex items-center gap-1.5 text-[10px] ${isOfficer ? 'justify-end' : 'justify-start'}`}>
                                  <span className="font-bold text-[#1b1b1f] dark:text-white">{m.senderName}</span>
                                  <span className={`px-1.5 py-0.2 rounded text-[9px] font-semibold ${
                                    isOfficer ? 'bg-[#ffdad8] text-[#9e001f]' : 'bg-emerald-100 text-emerald-800'
                                  }`}>{m.roleBadge || (isOfficer ? 'Petugas OPD' : 'Warga Pelapor')}</span>
                                  <span className="text-gray-400 font-mono">{m.waktu}</span>
                                </div>
                                <div className={`p-3 rounded-2xl text-xs leading-relaxed shadow-xs ${
                                  isOfficer ? 'bg-[#9e001f] text-white rounded-tr-none' : 'bg-white dark:bg-[#1e1e22] text-[#1b1b1f] dark:text-white border border-[#e5bdbb] dark:border-white/10 rounded-tl-none'
                                }`}>
                                  <p className="whitespace-pre-line">{m.text}</p>
                                  {m.foto && (
                                    <div className="mt-2 pt-2 border-t border-white/20">
                                      <p className="text-[10px] font-semibold mb-1 opacity-90">Foto Pendukung Lapangan:</p>
                                      <img src={m.foto} alt="Bukti Foto" className="w-full max-h-36 object-cover rounded-lg border border-white/30" />
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                          );
                        })
                      )}
                    </div>

                    {/* Input Balasan Dua Arah & Prompt Chips */}
                    <div className="p-3.5 bg-white dark:bg-[#1e1e22] rounded-xl border border-[#e5bdbb] dark:border-white/10 space-y-3">
                      <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-[#5c403f] dark:text-gray-300">Kirim Sebagai:</span>
                          <label className="inline-flex items-center gap-1.5 cursor-pointer">
                            <input
                              type="radio"
                              name="app-reply-role"
                              value="warga"
                              checked={replyRole === 'warga'}
                              onChange={() => {
                                setReplyRole('warga');
                                setReplyName('Budi Pratama (Warga)');
                              }}
                              className="accent-[#9e001f]"
                            />
                            <span className="font-semibold text-emerald-800 dark:text-emerald-400">Warga Pelapor</span>
                          </label>
                          <label className="inline-flex items-center gap-1.5 cursor-pointer ml-1">
                            <input
                              type="radio"
                              name="app-reply-role"
                              value="petugas"
                              checked={replyRole === 'petugas'}
                              onChange={() => {
                                setReplyRole('petugas');
                                setReplyName('Siti M. (Petugas OPD)');
                              }}
                              className="accent-[#9e001f]"
                            />
                            <span className="font-semibold text-[#9e001f] dark:text-[#ffb4ab]">Petugas OPD</span>
                          </label>
                        </div>
                      </div>

                      {/* Saran Cepat / Prompt Chips */}
                      <div className="flex flex-wrap items-center gap-1.5 pt-1 border-t border-[#e5bdbb]/40 dark:border-white/10">
                        <span className="text-[10px] text-gray-500 font-semibold flex items-center gap-1 mr-1">
                          <Sparkles className="w-3 h-3 text-amber-500" /> Saran:
                        </span>
                        {(replyRole === 'warga' ? QUICK_PROMPTS_WARGA : QUICK_PROMPTS_PETUGAS).map((prompt, pIdx) => (
                          <button
                            key={pIdx}
                            type="button"
                            onClick={() => setReplyText(prompt)}
                            className="cursor-pointer px-2.5 py-1 rounded-full bg-[#fbf8fe] dark:bg-white/5 border border-[#e5bdbb] dark:border-white/10 text-[10px] text-[#5c403f] dark:text-gray-300 hover:bg-[#ffdad8]/50 hover:text-[#9e001f] transition truncate max-w-[200px]"
                            title={prompt}
                          >
                            {prompt}
                          </button>
                        ))}
                      </div>

                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={replyName}
                          onChange={(e) => setReplyName(e.target.value)}
                          placeholder="Nama pengirim..."
                          className="w-1/3 px-3 py-2 rounded-lg border border-[#e5bdbb] dark:border-white/20 bg-white dark:bg-[#2b2b30] text-xs focus:outline-none focus:border-[#9e001f] focus:ring-1 focus:ring-[#9e001f]"
                        />
                        <input
                          type="text"
                          value={replyText}
                          onChange={(e) => setReplyText(e.target.value)}
                          onKeyDown={(e) => e.key === 'Enter' && handleSendAppReply()}
                          placeholder="Tulis pesan klarifikasi..."
                          className="flex-1 px-3 py-2 rounded-lg border border-[#e5bdbb] dark:border-white/20 bg-white dark:bg-[#2b2b30] text-xs focus:outline-none focus:border-[#9e001f] focus:ring-1 focus:ring-[#9e001f]"
                        />
                      </div>

                      {replyPhoto && (
                        <div className="flex items-center justify-between p-2 rounded-lg bg-[#fbf8fe] dark:bg-white/5 border border-[#e5bdbb] dark:border-white/10">
                          <div className="flex items-center gap-2">
                            <img src={replyPhoto} alt="Pratinjau" className="w-10 h-10 object-cover rounded-md border border-[#e5bdbb]" />
                            <div className="text-[10px] text-[#5c403f] dark:text-gray-300">
                              <p className="font-bold text-[#1b1b1f] dark:text-white">Foto Pendukung (Terkompresi)</p>
                              <p className="text-gray-500">Siap dilampirkan ke tiket ini</p>
                            </div>
                          </div>
                          <button
                            type="button"
                            onClick={() => setReplyPhoto(null)}
                            className="text-xs text-[#c8102e] hover:underline font-bold px-2 py-1"
                          >
                            ✕ Hapus
                          </button>
                        </div>
                      )}

                      <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-[#e5bdbb]/60 dark:border-white/10">
                        <div className="flex flex-wrap items-center gap-1.5">
                          <label className="cursor-pointer inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#e5bdbb] dark:border-white/20 bg-[#fbf8fe] dark:bg-white/10 hover:bg-[#ffdad8]/40 text-[#9e001f] dark:text-[#ffdad8] font-semibold text-xs transition">
                            <ImagePlus className="w-3.5 h-3.5 shrink-0" />
                            <span>Unggah Foto</span>
                            <input
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={async (e) => {
                                const file = e.target.files && e.target.files[0];
                                if (file) {
                                  // Kompresi otomatis berbasis Canvas
                                  const compressed = await compressImageCanvas(file);
                                  setReplyPhoto(compressed);
                                }
                              }}
                            />
                          </label>
                          <button
                            type="button"
                            onClick={() => setReplyPhoto('https://lh3.googleusercontent.com/aida-public/AB6AXuDF8T8kAUNM-_2HbGnXu8uBKMJ2muGoOIIVwsW-LJXlvjeUyggI0kmrcFyCrJjw5DGqCVi2YjGD6kjq4_gY3-wkkU7CUJuk3ewvRC13mHt8lJyLnqVDv-klbEXOR1R1qkaKxAKpJP1LKp9Pib0NfqapWtlBZyChM_CTjE5aay9TegQ8LnoxrCAjItLPcfcuLGBXQVWqAm4o_HFnPV0BLEExLo7eqWfAbvwqq5KEy88')}
                            className="cursor-pointer inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-gray-100 dark:bg-white/10 text-gray-700 dark:text-gray-300 text-[11px] font-medium hover:bg-gray-200 dark:hover:bg-white/20 transition focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-400"
                          >
                            <Camera className="w-3 h-3 text-gray-500 dark:text-gray-400 shrink-0" />
                            <span>Bukti Warga</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => setReplyPhoto('https://images.unsplash.com/photo-1578328819058-b69f3a3b0f6b?auto=format&fit=crop&w=600&q=80')}
                            className="cursor-pointer inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-blue-50 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 text-[11px] font-medium hover:bg-blue-100 dark:hover:bg-blue-900/60 transition focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-blue-400"
                          >
                            <Wrench className="w-3 h-3 text-blue-500 dark:text-blue-400 shrink-0" />
                            <span>Foto URC</span>
                          </button>
                        </div>

                        <button
                          type="button"
                          onClick={handleSendAppReply}
                          className="cursor-pointer inline-flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-[#c8102e] hover:bg-[#9e001f] text-white font-bold text-xs transition shadow-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9e001f]"
                        >
                          <Send className="w-3.5 h-3.5 shrink-0" />
                          <span>Kirim</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="p-8 text-center text-[#5c403f] dark:text-gray-400">
                  <AlertTriangle className="w-8 h-8 text-[#9a5200] mx-auto mb-2" />
                  <p className="font-semibold text-sm">Tiket tidak ditemukan</p>
                  <p className="text-xs text-[#5c403f] dark:text-gray-400 mt-1">
                    Pastikan nomor tiket benar atau pilih tiket contoh di atas.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* MODAL CETAK TANDA TERIMA ADUAN RESMI BER-QR CODE */}
      {showReceiptModal && receiptTicket && (
        <div className="fixed inset-0 z-[9998] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm print:p-0 print:bg-white">
          <div className="bg-white text-black max-w-xl w-full rounded-2xl border-2 border-[#9e001f] shadow-2xl overflow-hidden print:border-0 print:shadow-none print:w-full print:max-w-none">
            {/* Header Dialog & Actions */}
            <div className="bg-[#9e001f] text-white p-4 flex items-center justify-between print:hidden">
              <div className="flex items-center gap-2">
                <Printer className="w-5 h-5" />
                <span className="font-bold text-sm">Pratinjau Bukti Tanda Terima Laporan</span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="px-3.5 py-1.5 rounded-lg bg-white text-[#9e001f] font-bold text-xs hover:bg-[#ffdad8] transition flex items-center gap-1 shadow-sm"
                >
                  <Printer className="w-3.5 h-3.5" /> Cetak / Unduh PDF
                </button>
                <button
                  type="button"
                  onClick={() => setShowReceiptModal(false)}
                  className="p-1 rounded-lg hover:bg-white/20 text-white transition"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Printable Receipt Paper Body */}
            <div className="p-6 md:p-8 space-y-5 bg-white text-black font-sans leading-normal">
              {/* Kop Surat Pemerintah Daerah */}
              <div className="text-center pb-4 border-b-2 border-black/80 space-y-1">
                <div className="flex items-center justify-center gap-2 mb-1">
                  <ShieldCheck className="w-7 h-7 text-[#9e001f]" />
                  <span className="font-extrabold text-base tracking-wider uppercase font-serif">
                    PEMERINTAH KOTA BANDUNG
                  </span>
                </div>
                <h4 className="font-bold text-xs uppercase tracking-wide">
                  DINAS KOMUNIKASI DAN INFORMATIKA — SISTEM SIPANTAU
                </h4>
                <p className="text-[10px] text-gray-600">
                  Jl. Wastukancana No. 2, Babakan Ciamis, Sumur Bandung • Layanan Hotline Call Center 112
                </p>
                <div className="mt-2 pt-2 border-t border-dashed border-gray-400">
                  <span className="inline-block px-3 py-1 bg-gray-100 rounded text-xs font-bold uppercase tracking-widest text-[#9e001f]">
                    SURAT TANDA TERIMA LAPORAN PENGADUAN WARGA
                  </span>
                </div>
              </div>

              {/* Rincian Tiket & QR Code */}
              <div className="flex items-start justify-between gap-4 p-4 rounded-xl bg-gray-50 border border-gray-200">
                <div className="space-y-1.5">
                  <div className="text-[10px] uppercase font-bold text-gray-500 tracking-wider">Nomor Registrasi Tiket:</div>
                  <div className="text-xl font-mono font-extrabold text-[#9e001f] tracking-tight">{receiptTicket.id}</div>
                  <div className="text-xs text-gray-700">Waktu Lapor: <strong>{receiptTicket.waktu}</strong></div>
                  <div className="text-xs text-gray-700">Status Awal: <strong className="text-emerald-700 font-bold">{receiptTicket.status}</strong></div>
                  <div className="text-xs text-gray-700">Target Tanggap: <strong className="text-amber-700">Maksimal 24 Jam (SLA)</strong></div>
                </div>

                {/* SVG QR Code Simulation */}
                <div className="text-center shrink-0">
                  <div className="w-24 h-24 p-1.5 bg-white rounded-lg border-2 border-black flex items-center justify-center shadow-xs">
                    <svg viewBox="0 0 100 100" className="w-full h-full">
                      <rect width="100" height="100" fill="#ffffff" />
                      {/* Outer Position Squares */}
                      <rect x="5" y="5" width="30" height="30" fill="#000000" />
                      <rect x="10" y="10" width="20" height="20" fill="#ffffff" />
                      <rect x="15" y="15" width="10" height="10" fill="#000000" />
                      <rect x="65" y="5" width="30" height="30" fill="#000000" />
                      <rect x="70" y="10" width="20" height="20" fill="#ffffff" />
                      <rect x="75" y="15" width="10" height="10" fill="#000000" />
                      <rect x="5" y="65" width="30" height="30" fill="#000000" />
                      <rect x="10" y="70" width="20" height="20" fill="#ffffff" />
                      <rect x="15" y="75" width="10" height="10" fill="#000000" />
                      {/* Random Data Pattern */}
                      <rect x="42" y="10" width="16" height="8" fill="#000000" />
                      <rect x="45" y="24" width="10" height="10" fill="#000000" />
                      <rect x="40" y="40" width="20" height="20" fill="#9e001f" />
                      <rect x="10" y="45" width="20" height="10" fill="#000000" />
                      <rect x="70" y="45" width="15" height="15" fill="#000000" />
                      <rect x="45" y="70" width="20" height="15" fill="#000000" />
                      <rect x="75" y="75" width="15" height="15" fill="#000000" />
                    </svg>
                  </div>
                  <span className="text-[9px] font-mono text-gray-500 font-bold block mt-1">VERIFIKASI RESMI</span>
                </div>
              </div>

              {/* Data Laporan Lengkap */}
              <div className="space-y-3 text-xs">
                <div className="grid grid-cols-2 gap-3 pb-3 border-b border-gray-200">
                  <div>
                    <span className="text-gray-500 block text-[10px] uppercase font-bold">Identitas Pelapor</span>
                    <strong className="text-black text-xs">{receiptTicket.pelapor}</strong>
                    <div className="text-[11px] font-mono text-gray-600">{receiptTicket.nik || '3273**********0019'}</div>
                  </div>
                  <div>
                    <span className="text-gray-500 block text-[10px] uppercase font-bold">Instansi Penanggung Jawab</span>
                    <strong className="text-black text-xs">{receiptTicket.dinas}</strong>
                    <div className="text-[11px] text-gray-600">Kategori: {receiptTicket.kategori}</div>
                  </div>
                </div>

                <div className="pb-3 border-b border-gray-200 space-y-1">
                  <span className="text-gray-500 block text-[10px] uppercase font-bold">Judul & Ringkasan Aduan</span>
                  <div className="font-bold text-sm text-black">{receiptTicket.judul}</div>
                  <div className="text-gray-700 italic text-xs leading-relaxed">"{receiptTicket.deskripsi}"</div>
                </div>

                <div className="grid grid-cols-2 gap-3 pb-3 border-b border-gray-200">
                  <div>
                    <span className="text-gray-500 block text-[10px] uppercase font-bold">Titik Lokasi Kejadian</span>
                    <strong className="text-black text-xs">{receiptTicket.alamat}</strong>
                  </div>
                  <div>
                    <span className="text-gray-500 block text-[10px] uppercase font-bold">Koordinat Geotag GPS</span>
                    <span className="font-mono text-xs text-gray-700">Lat: {receiptTicket.lat}, Lng: {receiptTicket.lng}</span>
                  </div>
                </div>
              </div>

              {/* Stempel Keabsahan Elektronik & Catatan RT/RW */}
              <div className="flex items-center justify-between pt-2">
                <div className="text-[10px] text-gray-500 max-w-xs leading-tight">
                  <p className="font-bold text-black mb-0.5">Catatan Validitas:</p>
                  <p>Surat ini merupakan bukti resmi pendaftaran pengaduan pada sistem SIPANTAU. Dapat digunakan untuk koordinasi ke RT/RW dan kelurahan setempat.</p>
                </div>

                {/* Stempel Digital Cap Bulat */}
                <div className="w-24 h-24 rounded-full border-2 border-dashed border-[#9e001f] text-[#9e001f] flex flex-col items-center justify-center p-1 text-center rotate-[-6deg] shadow-xs shrink-0">
                  <span className="text-[8px] font-extrabold uppercase tracking-tight">TERVERIFIKASI</span>
                  <ShieldCheck className="w-5 h-5 text-[#9e001f] my-0.5" />
                  <span className="text-[7px] font-bold uppercase leading-none">SIPANTAU PEMDA KOTA BDG</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL OTENTIKASI KHUSUS PETUGAS ASN & VERIFIKATOR OPD (ISOLASI TOTAL DARI WARGA) */}
      {showOfficerLoginModal && (
        <div role="dialog" aria-modal="true" aria-label="Login petugas OPD" onClick={(e) => e.target === e.currentTarget && setShowOfficerLoginModal(false)} className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white dark:bg-[#1e1e22] text-[#1b1b1f] dark:text-white rounded-2xl max-w-md w-full border border-red-500/30 shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            <div className="bg-[#131418] text-white p-5 flex items-center justify-between border-b-2 border-[#9e001f]">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-red-600/20 border border-red-500/40 flex items-center justify-center text-red-400">
                  <Lock className="w-5 h-5 text-red-500" />
                </div>
                <div>
                  <h3 className="font-bold text-base text-white">Login Petugas &amp; Backoffice OPD</h3>
                  <p className="text-xs text-gray-400">Single Sign-On (SSO) Kepegawaian Pemda</p>
                </div>
              </div>
              <button
                onClick={() => setShowOfficerLoginModal(false)}
                aria-label="Tutup login petugas"
                className="cursor-pointer p-1.5 rounded-lg hover:bg-white/10 text-gray-400 hover:text-white transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div className="p-3 bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/40 rounded-xl text-xs text-amber-900 dark:text-amber-200 leading-relaxed flex items-start gap-2">
                <ShieldAlert className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <span>Area terbatas verifikator Diskominfo &amp; dinas teknis daerah. Setiap aktivitas dan disposisi dicatat dalam log audit resmi.</span>
              </div>

              <div className="space-y-3 text-xs">
                <div>
                  <label className="block font-bold text-gray-700 dark:text-gray-300 mb-1">NIP / Nomor Induk Pegawai</label>
                  <input
                    type="text"
                    defaultValue="19850312 201001 1 008"
                    className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-white/15 bg-white dark:bg-[#2b2b30] font-mono text-xs focus:ring-1 focus:ring-red-600"
                    placeholder="19850312..."
                  />
                </div>
                <div>
                  <label className="block font-bold text-gray-700 dark:text-gray-300 mb-1">Kata Sandi ASN</label>
                  <input
                    type="password"
                    defaultValue="••••••••••••"
                    className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-white/15 bg-white dark:bg-[#2b2b30] text-xs focus:ring-1 focus:ring-red-600"
                  />
                </div>
              </div>

              <div className="pt-2 space-y-2">
                <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider block">Pilih Akun Simulasi Verifikator:</span>
                
                <button
                  onClick={() => {
                    setPortalMode('petugas');
                    setActiveTab('dashboard');
                    localStorage.setItem('SIPANTAU_PORTAL_MODE', 'petugas');
                    setShowOfficerLoginModal(false);
                    setIframeKey((k) => k + 1);
                  }}
                  className="cursor-pointer min-h-[44px] w-full text-left p-3 rounded-xl border border-red-500/40 bg-red-50/50 dark:bg-red-950/20 hover:bg-red-100/60 dark:hover:bg-red-950/40 transition flex items-center justify-between group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-600"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="w-8 h-8 rounded-lg bg-red-600 text-white flex items-center justify-center font-bold text-xs">BS</span>
                    <div>
                      <div className="font-bold text-xs text-red-900 dark:text-red-200">Budi Santoso, S.STP</div>
                      <div className="text-[10px] text-gray-600 dark:text-gray-400">Koordinator Verifikator &amp; Triase (Diskominfo)</div>
                    </div>
                  </div>
                  <Check className="w-4 h-4 text-red-600 opacity-0 group-hover:opacity-100 transition" />
                </button>

                <button
                  onClick={() => {
                    setPortalMode('petugas');
                    setActiveTab('dashboard');
                    localStorage.setItem('SIPANTAU_PORTAL_MODE', 'petugas');
                    setShowOfficerLoginModal(false);
                    setIframeKey((k) => k + 1);
                  }}
                  className="cursor-pointer min-h-[44px] w-full text-left p-3 rounded-xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 hover:bg-blue-50/50 dark:hover:bg-blue-950/20 transition flex items-center justify-between group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="w-8 h-8 rounded-lg bg-blue-700 text-white flex items-center justify-center font-bold text-xs">SM</span>
                    <div>
                      <div className="font-bold text-xs text-gray-900 dark:text-gray-200">Siti Maryam, S.T.</div>
                      <div className="text-[10px] text-gray-500">Verifikator Teknis Dinas Bina Marga &amp; Tata Ruang</div>
                    </div>
                  </div>
                  <Check className="w-4 h-4 text-blue-600 opacity-0 group-hover:opacity-100 transition" />
                </button>
              </div>

              <div className="pt-2 border-t border-gray-200 dark:border-white/10 text-center">
                <button
                  type="button"
                  onClick={() => setShowOfficerLoginModal(false)}
                  className="cursor-pointer min-h-[38px] text-xs text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-400 rounded-lg px-3 py-1"
                >
                  Batal dan Tetap di Portal Warga
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL PANDUAN PINTASAN KEYBOARD (KEYBOARD SHORTCUTS DIALOG) */}
      {showShortcutsModal && (
        <div role="dialog" aria-modal="true" aria-label="Pintasan Keyboard" onClick={(e) => e.target === e.currentTarget && setShowShortcutsModal(false)} className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white dark:bg-[#1e1e22] text-[#1b1b1f] dark:text-white rounded-2xl max-w-sm w-full border border-[#e5bdbb] dark:border-white/10 shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            <div className="bg-[#9e001f] text-white p-4 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <Keyboard className="w-5 h-5 text-[#ffdad8]" />
                <h3 className="font-bold text-sm">Pintasan Keyboard (Shortcuts)</h3>
              </div>
              <button
                onClick={() => setShowShortcutsModal(false)}
                aria-label="Tutup dialog pintasan"
                className="p-1 rounded-lg hover:bg-white/15 text-white transition"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="p-5 space-y-3 text-xs">
              <p className="text-[#5c403f] dark:text-gray-400 text-[11px]">
                Gunakan tombol berikut untuk navigasi cepat di aplikasi tanpa tetikus:
              </p>
              <div className="space-y-2">
                <div className="flex items-center justify-between p-2 rounded-lg bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10">
                  <span className="font-medium text-[#1b1b1f] dark:text-gray-200">Buka Pelacak Tiket</span>
                  <kbd className="px-2 py-1 rounded bg-white dark:bg-[#2b2b30] border border-gray-300 dark:border-white/20 font-mono font-bold text-xs shadow-2xs">T</kbd>
                </div>
                <div className="flex items-center justify-between p-2 rounded-lg bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10">
                  <span className="font-medium text-[#1b1b1f] dark:text-gray-200">Ganti Mode Gelap / Terang</span>
                  <kbd className="px-2 py-1 rounded bg-white dark:bg-[#2b2b30] border border-gray-300 dark:border-white/20 font-mono font-bold text-xs shadow-2xs">D</kbd>
                </div>
                <div className="flex items-center justify-between p-2 rounded-lg bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10">
                  <span className="font-medium text-[#1b1b1f] dark:text-gray-200">Buka Bantuan Pintasan ini</span>
                  <kbd className="px-2 py-1 rounded bg-white dark:bg-[#2b2b30] border border-gray-300 dark:border-white/20 font-mono font-bold text-xs shadow-2xs">?</kbd>
                </div>
                <div className="flex items-center justify-between p-2 rounded-lg bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10">
                  <span className="font-medium text-[#1b1b1f] dark:text-gray-200">Tutup Dialog / Keluar Fullscreen</span>
                  <kbd className="px-2 py-1 rounded bg-white dark:bg-[#2b2b30] border border-gray-300 dark:border-white/20 font-mono font-bold text-xs shadow-2xs">Esc</kbd>
                </div>
              </div>
              <div className="pt-2 text-center">
                <button
                  type="button"
                  onClick={() => setShowShortcutsModal(false)}
                  className="px-4 py-1.5 rounded-lg bg-[#9e001f] hover:bg-[#c8102e] text-white font-bold text-xs transition"
                >
                  Mengerti
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL STATUS BACKEND & DATABASE SQLITE */}
      {showDatabaseModal && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Status Backend & Database SIPANTAU"
          onClick={(e) => e.target === e.currentTarget && setShowDatabaseModal(false)}
          className="fixed inset-0 z-50 flex items-center justify-center p-3 md:p-4 bg-black/60 backdrop-blur-xs"
        >
          <div className="bg-white dark:bg-[#1e1e22] text-[#1b1b1f] dark:text-white rounded-2xl max-w-lg w-full border border-slate-200 dark:border-white/10 shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            {/* Modal Header */}
            <div className="bg-[#9e001f] text-white p-4 md:p-5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white/15 flex items-center justify-center">
                  <Database className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-base md:text-lg">Status Backend &amp; Database</h3>
                  <p className="text-xs text-[#ffdad8]">Pangkalan Data Terpusat Relasional SIPANTAU</p>
                </div>
              </div>
              <button
                onClick={() => setShowDatabaseModal(false)}
                className="cursor-pointer p-1.5 rounded-lg hover:bg-white/15 text-white transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                aria-label="Tutup status database"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-5 md:p-6 space-y-4 text-xs">
              {/* Status Banner */}
              <div className={`p-3.5 rounded-xl border flex items-center justify-between gap-3 ${
                backendStatus.connected
                  ? 'bg-emerald-50 dark:bg-emerald-950/30 border-emerald-300 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200'
                  : 'bg-amber-50 dark:bg-amber-950/30 border-amber-300 dark:border-amber-800 text-amber-900 dark:text-amber-200'
              }`}>
                <div className="flex items-center gap-2.5">
                  <span className={`w-3 h-3 rounded-full shrink-0 ${
                    backendStatus.connected ? 'bg-emerald-600 animate-pulse' : 'bg-amber-500'
                  }`} />
                  <div>
                    <p className="font-bold text-sm">
                      {backendStatus.connected ? 'Server & Database SQLite Online' : 'Mode Offline / LocalStorage'}
                    </p>
                    <p className="text-[11px] opacity-90">
                      {backendStatus.connected
                        ? 'REST API aktif di port 3001 dengan Database SQLite persisten'
                        : 'Berjalan via browser storage (kompatibel GitHub Pages)'}
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={checkBackend}
                  disabled={isPingingBackend}
                  className="cursor-pointer px-2.5 py-1.5 rounded-lg bg-white dark:bg-white/10 border border-current font-bold text-[11px] hover:opacity-80 transition shrink-0 flex items-center gap-1"
                >
                  <RefreshCw className={`w-3 h-3 ${isPingingBackend ? 'animate-spin' : ''}`} />
                  <span>Uji Ping</span>
                </button>
              </div>

              {/* Data Specifications Grid */}
              <div className="grid grid-cols-2 gap-2.5">
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 space-y-1">
                  <span className="text-[10px] text-gray-500 uppercase font-semibold">Engine Database</span>
                  <p className="font-bold text-slate-800 dark:text-white flex items-center gap-1.5">
                    <Server className="w-3.5 h-3.5 text-[#9e001f]" />
                    <span>{backendStatus.connected ? 'SQLite 3' : 'LocalStorage'}</span>
                  </p>
                  <span className="text-[10px] text-gray-400 font-mono">
                    {backendStatus.connected ? 'node:sqlite (WAL mode)' : 'Client-side Storage'}
                  </span>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 space-y-1">
                  <span className="text-[10px] text-gray-500 uppercase font-semibold">Tabel Relasional</span>
                  <p className="font-bold text-slate-800 dark:text-white flex items-center gap-1.5">
                    <HardDrive className="w-3.5 h-3.5 text-[#9e001f]" />
                    <span>5 Tabel SQL</span>
                  </p>
                  <span className="text-[10px] text-gray-400 font-mono">tickets, messages, audit, dll</span>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 space-y-1">
                  <span className="text-[10px] text-gray-500 uppercase font-semibold">Total Tiket Tersimpan</span>
                  <p className="font-bold text-slate-800 dark:text-white text-base">
                    {backendStatus.totalTickets || dailyStats.totalAduan} <span className="text-xs font-normal text-gray-500">Aduan</span>
                  </p>
                  <span className="text-[10px] text-emerald-600 font-semibold">Sinkronisasi Real-time</span>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 space-y-1">
                  <span className="text-[10px] text-gray-500 uppercase font-semibold">Pesan Dua Arah</span>
                  <p className="font-bold text-slate-800 dark:text-white text-base">
                    {backendStatus.totalMessages || 6} <span className="text-xs font-normal text-gray-500">Pesan/Foto</span>
                  </p>
                  <span className="text-[10px] text-gray-400 font-mono">Disposisi &amp; Klarifikasi</span>
                </div>
              </div>

              {/* Lokasi File & Endpoints */}
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-[11px] text-slate-700 dark:text-gray-300">File Database Persisten:</span>
                  <span className="font-mono text-[10px] text-gray-500">SQLite On-Disk</span>
                </div>
                <div className="p-2 rounded bg-white dark:bg-[#181920] border border-slate-200 dark:border-white/10 font-mono text-[11px] text-[#9e001f] dark:text-[#ffdad8] select-all break-all">
                  tugas_gabut-main/database/sipantau.sqlite
                </div>

                <div className="pt-2 border-t border-slate-200 dark:border-white/10 space-y-1">
                  <span className="font-bold text-[11px] text-slate-700 dark:text-gray-300">REST API Endpoints:</span>
                  <div className="grid grid-cols-2 gap-1 text-[10px] font-mono text-gray-600 dark:text-gray-400">
                    <span className="truncate">GET /api/health</span>
                    <span className="truncate">GET /api/tickets</span>
                    <span className="truncate">POST /api/tickets</span>
                    <span className="truncate">PUT /api/tickets/:id/status</span>
                    <span className="truncate">POST /api/tickets/:id/messages</span>
                    <span className="truncate">GET /api/stats</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-between pt-2">
                <button
                  type="button"
                  onClick={handleResetDB}
                  className="cursor-pointer text-xs font-semibold text-red-600 dark:text-red-400 hover:underline"
                >
                  Reset &amp; Reseed Database
                </button>
                <button
                  type="button"
                  onClick={() => setShowDatabaseModal(false)}
                  className="cursor-pointer px-4 py-2 rounded-lg bg-[#9e001f] hover:bg-[#800019] text-white text-xs font-bold transition shadow-xs"
                >
                  Tutup
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
