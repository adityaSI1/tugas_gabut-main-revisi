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
  Keyboard
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
  const [portalMode, setPortalMode] = useState<'warga' | 'petugas'>(() => {
    try {
      return localStorage.getItem('SIPANTAU_PORTAL_MODE') === 'petugas' ? 'petugas' : 'warga';
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

  const handleSearchTicket = (queryStr: string) => {
    const norm = (s: string) => s.trim().toUpperCase().replace(/^#/, '');
    const q = norm(queryStr);
    const tickets = loadTickets();
    const found = q
      ? tickets.find(
          (t: any) =>
            (t.id && norm(t.id) === q) ||
            (t.code && norm(t.code) === q) ||
            (t.judul && t.judul.toUpperCase().includes(q))
        )
      : undefined;
    setTrackerResult(found || null);
    refreshStats();
  };

  useEffect(() => {
    refreshStats();
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

  const handleResetDB = () => {
    if (!window.confirm('Kembalikan semua data ke data contoh? Aduan yang sudah dibuat akan terhapus.')) return;
    localStorage.removeItem('SIPANTAU_CIVIC_DB_V2');
    setIframeKey((k) => k + 1);
    refreshStats();
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

  const handleSendAppReply = () => {
    if (!trackerResult) return;
    if (!replyText.trim() && !replyPhoto) return;

    const tickets = loadTickets();
    const idx = tickets.findIndex((t: any) => t.id === trackerResult.id);
    if (idx !== -1) {
      const updated = addTicketMessage(tickets[idx], {
        senderRole: replyRole,
        senderName: replyName.trim() || (replyRole === 'warga' ? 'Budi Pratama' : 'Petugas OPD'),
        text: replyText.trim() || (replyPhoto ? '(Melampirkan foto pendukung)' : ''),
        foto: replyPhoto || undefined
      });
      tickets[idx] = updated;
      localStorage.setItem('SIPANTAU_CIVIC_DB_V2', JSON.stringify(tickets));
      window.dispatchEvent(new CustomEvent('sipantau:db-updated'));
      setTrackerResult(updated);
      setReplyText('');
      setReplyPhoto(null);
    }
  };

  const handleSendRating = () => {
    if (!trackerResult) return;
    const tickets = loadTickets();
    const idx = tickets.findIndex((t: any) => t.id === trackerResult.id);
    if (idx !== -1) {
      const updated = addTicketRating(tickets[idx], {
        stars: ratingStars,
        aspects: ratingAspects,
        comment: ratingComment
      });
      tickets[idx] = updated;
      localStorage.setItem('SIPANTAU_CIVIC_DB_V2', JSON.stringify(tickets));
      window.dispatchEvent(new CustomEvent('sipantau:db-updated'));
      setTrackerResult(updated);
      setRatingComment('');
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
    <div className={`flex flex-col h-screen w-screen ${darkMode ? 'dark bg-[#121214] text-[#e3e2e6]' : 'bg-[#fbf8fe] text-[#1b1b1f]'} overflow-hidden font-sans transition-colors`}>
      {/* FLOATING FOCUS MODE RESTORE BUTTON */}
      {focusMode && (
        <button
          onClick={() => setFocusMode(false)}
          className="fixed top-3 right-3 z-50 px-3.5 py-1.5 rounded-full bg-[#9e001f] text-white text-xs font-semibold shadow-xl flex items-center gap-1.5 border border-white/20 hover:bg-[#c8102e] transition animate-in fade-in"
          title="Tampilkan kembali bilah portal atas"
        >
          <Minimize2 className="w-3.5 h-3.5" />
          <span>Keluar Layar Penuh</span>
        </button>
      )}

      {/* DEDICATED HEADER: PORTAL WARGA VS BACKOFFICE PETUGAS OPD */}
      {!focusMode && !isOfficerMode && (
        <header className="h-14 md:h-16 bg-[#9e001f] text-white px-3 md:px-6 flex items-center justify-between shadow-md shrink-0 border-b border-[#ffdad8]/20 z-[1000]">
          {/* Brand & Emblem (Portal Warga) */}
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 md:w-9 md:h-9 rounded-xl bg-white/15 flex items-center justify-center text-white border border-white/20 shadow-xs shrink-0">
              <ShieldCheck className="w-4 h-4 md:w-5 md:h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-sm md:text-lg tracking-tight font-serif" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                  SIPANTAU
                </span>
                <span className="text-[9px] md:text-[10px] uppercase font-bold tracking-wider px-1.5 md:px-2 py-0.5 rounded bg-[#ffdad8] text-[#9e001f] shrink-0">
                  PORTAL WARGA
                </span>
              </div>
              <p className="text-[10px] text-[#ffdad8] leading-none hidden lg:block">
                Sistem Layanan & Pemantauan Pengaduan Masyarakat Terpadu
              </p>
            </div>
          </div>

          {/* Navigation Tabs (Desktop - Hanya Halaman Publik Warga) */}
          <nav className="hidden lg:flex items-center gap-1 bg-black/15 p-1 rounded-xl border border-white/10">
            {CITIZEN_PAGES.map((page) => {
              const Icon = page.icon;
              const isActive = activeTab === page.id;
              return (
                <button
                  key={page.id}
                  onClick={() => switchPage(page.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-white text-[#9e001f] shadow-xs'
                      : 'text-[#ffdad8] hover:text-white hover:bg-white/10'
                  }`}
                  title={page.description}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{page.shortLabel}</span>
                </button>
              );
            })}
          </nav>

          {/* Quick Action Buttons (Portal Warga) */}
          <div className="flex items-center gap-1.5 md:gap-2">
            {/* Daily Stats Quick Pill (Desktop) */}
            <div className="hidden xl:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-black/20 border border-white/10 text-xs">
              <span className="flex items-center gap-1 text-emerald-300 font-bold">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                {dailyStats.aduanHariIni} Hari Ini
              </span>
              <span className="text-white/40">•</span>
              <span className="text-amber-200 font-medium">Respon {dailyStats.rataWaktuResponFormat}</span>
            </div>

            {/* Lacak Tiket Button */}
            <button
              onClick={() => {
                setShowTracker(true);
                handleSearchTicket(trackerQuery);
              }}
              className="flex items-center gap-1.5 px-2.5 md:px-3 py-1.5 rounded-lg bg-[#c8102e] hover:bg-[#b00b25] text-white border border-white/20 text-xs font-semibold shadow-xs transition"
              title="Lacak status pengaduan & komunikasi tiket"
            >
              <Search className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Lacak Tiket</span>
            </button>

            {/* Dark Mode Switcher */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-1.5 md:p-2 rounded-lg bg-white/15 hover:bg-white/25 text-[#ffdad8] hover:text-white transition"
              title={darkMode ? 'Beralih ke Mode Terang' : 'Beralih ke Mode Gelap'}
              aria-label={darkMode ? 'Beralih ke mode terang' : 'Beralih ke mode gelap'}
            >
              {darkMode ? <Sun className="w-3.5 h-3.5 md:w-4 md:h-4 text-amber-300" /> : <Moon className="w-3.5 h-3.5 md:w-4 md:h-4" />}
            </button>

            {/* Focus Fullscreen Mode Toggle */}
            <button
              onClick={() => setFocusMode(true)}
              className="p-1.5 md:p-2 rounded-lg bg-white/15 hover:bg-white/25 text-[#ffdad8] hover:text-white transition"
              title="Layar Penuh (Sembunyikan Bilah Atas)"
              aria-label="Layar penuh"
            >
              <Maximize2 className="w-3.5 h-3.5 md:w-4 md:h-4" />
            </button>

            {/* Pintasan Keyboard Modal Trigger */}
            <button
              onClick={() => setShowShortcutsModal(true)}
              className="p-1.5 md:p-2 rounded-lg bg-white/15 hover:bg-white/25 text-[#ffdad8] hover:text-white transition hidden md:flex"
              title="Pintasan Keyboard (?)"
              aria-label="Pintasan Keyboard"
            >
              <Keyboard className="w-3.5 h-3.5 md:w-4 md:h-4" />
            </button>

            {/* Akses Khusus Petugas ASN / OPD (Terpisah rapi dari navigasi warga) */}
            <button
              onClick={() => setShowOfficerLoginModal(true)}
              className="flex items-center gap-1.5 px-2.5 md:px-3 py-1.5 rounded-lg bg-black/25 hover:bg-black/40 text-white border border-white/20 text-xs font-semibold transition shadow-xs"
              title="Akses Terbatas Khusus Personel ASN & Verifikator OPD"
            >
              <Lock className="w-3.5 h-3.5 text-amber-300" />
              <span className="hidden sm:inline">Akses Petugas OPD</span>
              <span className="sm:hidden">Petugas</span>
            </button>

            {/* Mobile Navigation Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1.5 md:p-2 rounded-lg bg-white/15 hover:bg-white/25 text-[#ffdad8] hover:text-white transition lg:hidden"
              title="Menu Navigasi Mobile"
              aria-label="Buka menu navigasi"
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>

            {/* Open Standalone Page */}
            <a
              href={activePage.path}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 md:p-2 rounded-lg bg-white/10 hover:bg-white/20 text-[#ffdad8] hover:text-white transition hidden sm:inline-flex"
              title="Buka Halaman Langsung di Tab Baru"
              aria-label="Buka halaman di tab baru"
            >
              <ExternalLink className="w-3.5 h-3.5 md:w-4 md:h-4" />
            </a>
          </div>
        </header>
      )}

      {/* DROPDOWN MENU MOBILE PORTAL WARGA */}
      {!focusMode && !isOfficerMode && mobileMenuOpen && (
        <div className="lg:hidden bg-[#85001a] border-b border-[#ffdad8]/30 px-3 py-2.5 space-y-1 shadow-lg z-20 animate-in slide-in-from-top-2 duration-150">
          <div className="text-[10px] uppercase font-bold text-[#ffdad8]/70 px-2 py-1 tracking-wider">Halaman Portal:</div>
          <div className="grid grid-cols-2 gap-1.5">
            {CITIZEN_PAGES.map((page) => {
              const Icon = page.icon;
              const isActive = activeTab === page.id;
              return (
                <button
                  key={page.id}
                  onClick={() => {
                    switchPage(page.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold text-left transition ${
                    isActive
                      ? 'bg-white text-[#9e001f] shadow-xs'
                      : 'text-white hover:bg-white/15'
                  }`}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  <span className="truncate">{page.shortLabel}</span>
                </button>
              );
            })}
          </div>
          <div className="pt-2 border-t border-white/15 flex items-center justify-between text-xs text-[#ffdad8] px-1">
            <span className="flex items-center gap-1 text-[11px]">
              <Clock className="w-3.5 h-3.5" /> SLA Tanggap: 4 Jam
            </span>
            <span className="text-[11px] text-white/80">
              Layanan Aspirasi Warga Terpadu
            </span>
          </div>
        </div>
      )}

      {/* DEDICATED HEADER: BACKOFFICE PETUGAS OPD (TERPISAH TOTAL DARI UI WARGA) */}
      {!focusMode && isOfficerMode && (
        <header className="h-14 md:h-16 bg-[#131418] text-white px-3 md:px-6 flex items-center justify-between shadow-lg shrink-0 border-b-2 border-[#9e001f] z-[1000]">
          {/* Brand & Emblem (Backoffice Petugas) */}
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 md:w-9 md:h-9 rounded-xl bg-red-600/20 border border-red-500/40 flex items-center justify-center text-red-400 shadow-xs shrink-0">
              <ShieldAlert className="w-4 h-4 md:w-5 md:h-5 text-red-500" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-sm md:text-lg tracking-tight font-serif text-white" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                  SIPANTAU BACKOFFICE
                </span>
                <span className="text-[9px] md:text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-red-600/30 text-red-300 border border-red-500/30 shrink-0">
                  PETUGAS OPD
                </span>
              </div>
              <p className="text-[10px] text-gray-400 leading-none hidden lg:block">
                Panel Verifikasi, Validasi Kelayakan Teknis & Triase Disposisi Dinas
              </p>
            </div>
          </div>

          {/* Officer Identity & Live Triage Status (Desktop) */}
          <div className="hidden lg:flex items-center gap-3 bg-white/5 border border-white/10 px-3.5 py-1.5 rounded-xl text-xs text-gray-300">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span className="font-semibold text-white">Budi Santoso, S.STP</span>
              <span className="text-gray-400 text-[11px]">(Verifikator Diskominfo)</span>
            </div>
            <span className="text-white/20">|</span>
            <div className="flex items-center gap-2 text-[11px]">
              <span className="text-amber-300 font-semibold">{dailyStats.aduanHariIni} Aduan Hari Ini</span>
              <span className="text-white/30">•</span>
              <span className="text-emerald-400 font-semibold">{dailyStats.sedangDiproses} Dalam Penanganan</span>
            </div>
          </div>

          {/* Backoffice Tools & Exit Button */}
          <div className="flex items-center gap-1.5 md:gap-2">
            {/* Ekspor CSV Rekapitulasi OPD */}
            <button
              onClick={handleExportCSV}
              className="flex items-center gap-1.5 px-2.5 md:px-3 py-1.5 rounded-lg bg-emerald-800/80 hover:bg-emerald-700 text-white border border-emerald-500/40 text-xs font-semibold shadow-xs transition"
              title="Unduh Rekapitulasi Seluruh Aduan Format CSV (Excel)"
            >
              <FileSpreadsheet className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Ekspor CSV</span>
            </button>

            {/* Backup DB (JSON) */}
            <button
              onClick={handleExportBackup}
              className="p-1.5 md:p-2 rounded-lg bg-white/10 hover:bg-white/20 text-gray-300 hover:text-white transition"
              title="Unduh Cadangan Basis Data (JSON)"
              aria-label="Unduh cadangan data"
            >
              <Download className="w-3.5 h-3.5 md:w-4 md:h-4" />
            </button>

            {/* Reset DB */}
            <button
              onClick={handleResetDB}
              className="p-1.5 md:p-2 rounded-lg bg-white/10 hover:bg-white/20 text-gray-300 hover:text-white transition"
              title="Muat Ulang Database Contoh"
              aria-label="Kembalikan data contoh"
            >
              <RotateCcw className="w-3.5 h-3.5 md:w-4 md:h-4" />
            </button>

            {/* Dark Mode Switcher */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-1.5 md:p-2 rounded-lg bg-white/10 hover:bg-white/20 text-gray-300 hover:text-white transition"
              title={darkMode ? 'Beralih ke Mode Terang' : 'Beralih ke Mode Gelap'}
              aria-label={darkMode ? 'Beralih ke mode terang' : 'Beralih ke mode gelap'}
            >
              {darkMode ? <Sun className="w-3.5 h-3.5 md:w-4 md:h-4 text-amber-300" /> : <Moon className="w-3.5 h-3.5 md:w-4 md:h-4" />}
            </button>

            {/* Focus Fullscreen Mode Toggle */}
            <button
              onClick={() => setFocusMode(true)}
              className="p-1.5 md:p-2 rounded-lg bg-white/10 hover:bg-white/20 text-gray-300 hover:text-white transition"
              title="Layar Penuh (Sembunyikan Bilah Atas)"
              aria-label="Layar penuh"
            >
              <Maximize2 className="w-3.5 h-3.5 md:w-4 md:h-4" />
            </button>

            {/* Tombol Utama: KELUAR SESI PETUGAS */}
            <button
              onClick={() => {
                setPortalMode('warga');
                setActiveTab('beranda');
                localStorage.setItem('SIPANTAU_PORTAL_MODE', 'warga');
                setIframeKey((k) => k + 1);
              }}
              className="flex items-center gap-1.5 px-3 md:px-3.5 py-1.5 rounded-lg bg-[#9e001f] hover:bg-[#c8102e] text-white border border-red-400/40 text-xs font-bold shadow-md transition ml-1"
              title="Akhiri sesi kerja dan keluar ke Portal Warga"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Keluar Sesi</span>
            </button>
          </div>
        </header>
      )}

      {/* SECONDARY STATUS STRIP */}
      {!focusMode && !isOfficerMode && (
        <div className="hidden sm:flex h-8 bg-[#f5f2f8] dark:bg-[#1e1e22] border-b border-[#e5bdbb]/40 dark:border-white/10 px-4 md:px-6 items-center justify-between text-xs text-[#5c403f] dark:text-gray-300 shrink-0">
          <div className="flex items-center gap-3">
            <span className="font-semibold text-[#1b1b1f] dark:text-white flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse"></span>
              Halaman Publik Warga: <span className="text-[#9e001f] dark:text-[#ffb4ab] font-bold">{activePage.shortLabel}</span>
            </span>
            <span className="hidden sm:inline text-[#e5bdbb]">|</span>
            <span className="hidden md:flex items-center gap-1 text-[11px]">
              <Clock className="w-3 h-3 text-[#9a5200] dark:text-amber-400" /> Standar Pelayanan Minimal (SPM): Respon Awal <strong>Maks. 4 Jam</strong>
            </span>
          </div>
          <div className="flex items-center gap-3 text-[11px] text-emerald-700 dark:text-emerald-400 font-medium">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span> Layanan Aspirasi Terpadu Aktif
          </div>
        </div>
      )}

      {!focusMode && isOfficerMode && (
        <div className="hidden sm:flex h-8 bg-[#181920] border-b border-red-500/20 px-4 md:px-6 items-center justify-between text-xs text-gray-300 shrink-0">
          <div className="flex items-center gap-3">
            <span className="font-semibold text-white flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-ping"></span>
              <span className="text-red-400 font-bold uppercase tracking-wider text-[11px]">Lingkungan Backoffice Terbatas</span>
            </span>
            <span className="text-white/20">|</span>
            <span className="text-[11px] text-gray-400">
              Disposisi aktif ke 6 Dinas Teknis (Bina Marga, DPKP3, Satpol PP, DLHK, PDAM, Dishub)
            </span>
          </div>
          <div className="flex items-center gap-3 text-[11px] text-gray-400">
            <span className="px-2 py-0.5 rounded bg-white/10 text-white text-[10px] font-mono">
              SESI: BUDI SANTOSO (NIP: 19850312...)
            </span>
            <span className="text-white/20">|</span>
            <span className="text-emerald-400 font-semibold text-[10px]">
              LOG AUDIT AKTIF
            </span>
          </div>
        </div>
      )}

      {/* MAIN VIEWPORT: IFRAME RENDERING STITCH PAGES + CORE SCRIPT */}
      <main className="flex-1 w-full h-full relative overflow-hidden bg-white dark:bg-[#1b1b1f]">
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
                className="p-1.5 rounded-lg hover:bg-white/15 text-white transition"
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
                  className="flex-1 px-4 py-2.5 rounded-xl border border-[#e5bdbb] dark:border-white/20 bg-white dark:bg-[#2b2b30] text-sm focus:outline-none focus:border-[#9e001f] focus:ring-1 focus:ring-[#9e001f]"
                />
                <button
                  onClick={() => handleSearchTicket(trackerQuery)}
                  className="px-4 md:px-5 py-2.5 rounded-xl bg-[#c8102e] hover:bg-[#9e001f] text-white font-semibold text-sm transition"
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
                    className="px-2.5 py-1 rounded-full bg-[#ffdad8]/70 dark:bg-white/10 text-[#9e001f] dark:text-[#ffdad8] font-mono font-bold hover:bg-[#ffdad8] transition text-xs"
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
                                  className={`px-2.5 py-1 rounded-full text-[11px] font-semibold transition ${
                                    active
                                      ? 'bg-emerald-700 text-white shadow-2xs'
                                      : 'bg-white dark:bg-[#1e1e22] text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800'
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
                              className="flex-1 px-3 py-1.5 rounded-lg border border-emerald-300 dark:border-emerald-800 bg-white dark:bg-[#1e1e22] text-xs focus:outline-none focus:ring-1 focus:ring-emerald-600"
                            />
                            <button
                              type="button"
                              onClick={handleSendRating}
                              className="px-4 py-1.5 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs transition shadow-2xs"
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
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-lg bg-[#9e001f] text-white flex items-center justify-center">
                          <span className="material-symbols-outlined text-base">forum</span>
                        </div>
                        <div>
                          <h5 className="text-xs font-bold uppercase tracking-wider text-[#1b1b1f] dark:text-white">
                            Komunikasi Dua Arah Warga & Petugas
                          </h5>
                          <p className="text-[11px] text-[#5c403f] dark:text-gray-400">Klarifikasi & pertukaran foto kondisi terkini</p>
                        </div>
                      </div>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-white dark:bg-[#1e1e22] border border-[#e5bdbb] dark:border-white/10 text-[#5c403f] dark:text-gray-300 font-mono font-bold">
                        {(trackerResult.messages || []).length} Pesan
                      </span>
                    </div>

                    {/* Chat Bubble List */}
                    <div className="space-y-2.5 max-h-56 overflow-y-auto pr-1">
                      {(!trackerResult.messages || trackerResult.messages.length === 0) ? (
                        <div className="p-3 text-center rounded-xl bg-white dark:bg-[#1e1e22] border border-dashed border-[#e5bdbb] dark:border-white/10 text-[#5c403f] dark:text-gray-400 text-xs">
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
                    <div className="p-3 bg-white dark:bg-[#1e1e22] rounded-xl border border-[#e5bdbb] dark:border-white/10 space-y-2.5">
                      <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-[#5c403f] dark:text-gray-300">Kirim Sebagai:</span>
                          <label className="inline-flex items-center gap-1 cursor-pointer">
                            <input
                              type="radio"
                              name="app-reply-role"
                              value="warga"
                              checked={replyRole === 'warga'}
                              onChange={() => {
                                setReplyRole('warga');
                                setReplyName('Budi Pratama (Warga)');
                              }}
                              className="text-[#c8102e]"
                            />
                            <span className="font-semibold text-emerald-800 dark:text-emerald-400">Warga Pelapor</span>
                          </label>
                          <label className="inline-flex items-center gap-1 cursor-pointer ml-1">
                            <input
                              type="radio"
                              name="app-reply-role"
                              value="petugas"
                              checked={replyRole === 'petugas'}
                              onChange={() => {
                                setReplyRole('petugas');
                                setReplyName('Siti M. (Petugas OPD)');
                              }}
                              className="text-[#c8102e]"
                            />
                            <span className="font-semibold text-[#9e001f] dark:text-[#ffb4ab]">Petugas OPD</span>
                          </label>
                        </div>
                      </div>

                      {/* Saran Cepat / Prompt Chips */}
                      <div className="flex flex-wrap items-center gap-1 pt-1 border-t border-[#e5bdbb]/40 dark:border-white/10">
                        <span className="text-[10px] text-gray-500 font-semibold flex items-center gap-0.5 mr-1">
                          <Sparkles className="w-3 h-3 text-amber-500" /> Saran:
                        </span>
                        {(replyRole === 'warga' ? QUICK_PROMPTS_WARGA : QUICK_PROMPTS_PETUGAS).map((prompt, pIdx) => (
                          <button
                            key={pIdx}
                            type="button"
                            onClick={() => setReplyText(prompt)}
                            className="px-2 py-0.5 rounded-full bg-[#fbf8fe] dark:bg-white/5 border border-[#e5bdbb] dark:border-white/10 text-[10px] text-[#5c403f] dark:text-gray-300 hover:bg-[#ffdad8]/50 hover:text-[#9e001f] transition truncate max-w-[200px]"
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
                          className="w-1/3 px-3 py-1.5 rounded-lg border border-[#e5bdbb] dark:border-white/20 bg-white dark:bg-[#2b2b30] text-xs focus:outline-none focus:border-[#9e001f]"
                        />
                        <input
                          type="text"
                          value={replyText}
                          onChange={(e) => setReplyText(e.target.value)}
                          onKeyDown={(e) => e.key === 'Enter' && handleSendAppReply()}
                          placeholder="Tulis pesan klarifikasi..."
                          className="flex-1 px-3 py-1.5 rounded-lg border border-[#e5bdbb] dark:border-white/20 bg-white dark:bg-[#2b2b30] text-xs focus:outline-none focus:border-[#9e001f]"
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

                      <div className="flex items-center justify-between pt-1 border-t border-[#e5bdbb]/60 dark:border-white/10">
                        <div className="flex items-center gap-1.5">
                          <label className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg border border-[#e5bdbb] dark:border-white/20 bg-[#fbf8fe] dark:bg-white/10 hover:bg-[#ffdad8]/40 text-[#9e001f] dark:text-[#ffdad8] font-semibold text-xs cursor-pointer transition">
                            <span className="material-symbols-outlined text-sm">add_photo_alternate</span>
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
                            className="px-2 py-1 rounded bg-gray-100 dark:bg-white/10 text-gray-700 dark:text-gray-300 text-[10px] hover:bg-gray-200"
                          >
                            📷 Bukti Warga
                          </button>
                          <button
                            type="button"
                            onClick={() => setReplyPhoto('https://images.unsplash.com/photo-1578328819058-b69f3a3b0f6b?auto=format&fit=crop&w=600&q=80')}
                            className="px-2 py-1 rounded bg-blue-50 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 text-[10px] hover:bg-blue-100"
                          >
                            🛠️ Foto URC
                          </button>
                        </div>

                        <button
                          type="button"
                          onClick={handleSendAppReply}
                          className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-[#c8102e] hover:bg-[#9e001f] text-white font-bold text-xs transition"
                        >
                          <span className="material-symbols-outlined text-sm">send</span>
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
                  <div className="text-xs text-gray-700">Target Tanggap: <strong className="text-amber-700">Maksimal 4 Jam (SLA)</strong></div>
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
                className="p-1 rounded-lg hover:bg-white/10 text-gray-400 hover:text-white transition"
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
                  className="w-full text-left p-3 rounded-xl border border-red-500/40 bg-red-50/50 dark:bg-red-950/20 hover:bg-red-100/60 dark:hover:bg-red-950/40 transition flex items-center justify-between group"
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
                  className="w-full text-left p-3 rounded-xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 hover:bg-blue-50/50 dark:hover:bg-blue-950/20 transition flex items-center justify-between group"
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
                  className="text-xs text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 font-semibold"
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
    </div>
  );
}
