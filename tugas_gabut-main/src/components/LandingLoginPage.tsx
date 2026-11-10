/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  ShieldCheck,
  ShieldAlert,
  User,
  Users,
  Lock,
  LogIn,
  ArrowRight,
  CheckCircle2,
  Search,
  MapPin,
  FileEdit,
  Clock,
  Sparkles,
  Sun,
  Moon,
  Building2,
  ChevronRight,
  PhoneCall,
  Check,
  Eye,
  EyeOff,
  AlertCircle,
  Key
} from 'lucide-react';
import { DailyStats } from '../utils/civic-db';

interface LandingLoginPageProps {
  onSelectRole: (role: 'warga' | 'petugas', profile?: { name: string; role: string; nip?: string; opd?: string }) => void;
  darkMode: boolean;
  onToggleDarkMode: () => void;
  onOpenTracker: () => void;
  dailyStats: DailyStats;
}

export const LandingLoginPage: React.FC<LandingLoginPageProps> = ({
  onSelectRole,
  darkMode,
  onToggleDarkMode,
  onOpenTracker,
  dailyStats
}) => {
  const [activeRoleTab, setActiveRoleTab] = useState<'warga' | 'petugas'>('warga');

  // State Form Warga
  const [wargaNik, setWargaNik] = useState('3273241508920003');
  const [wargaPhone, setWargaPhone] = useState('081223456789');
  const [wargaName, setWargaName] = useState('Budi Pratama');
  const [wargaError, setWargaError] = useState('');

  // State Form Petugas
  const [petugasNip, setPetugasNip] = useState('198503122010011008');
  const [petugasPassword, setPetugasPassword] = useState('petugas123');
  const [petugasOpd, setPetugasOpd] = useState('Dinas Bina Marga & Tata Ruang');
  const [showPetugasPassword, setShowPetugasPassword] = useState(false);
  const [petugasError, setPetugasError] = useState('');

  // Submit Warga Login
  const handleWargaSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!wargaNik.trim()) {
      setWargaError('Silakan masukkan NIK Anda');
      return;
    }
    setWargaError('');
    onSelectRole('warga', {
      name: wargaName.trim() || 'Warga Pelapor',
      role: 'Warga Terdaftar'
    });
  };

  // Submit Petugas Login
  const handlePetugasSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!petugasNip.trim() || !petugasPassword.trim()) {
      setPetugasError('Silakan masukkan NIP dan Kata Sandi');
      return;
    }
    setPetugasError('');
    onSelectRole('petugas', {
      name: 'Budi Santoso, S.STP',
      role: 'Verifikator Diskominfo',
      nip: petugasNip,
      opd: petugasOpd
    });
  };

  return (
    <div className={`min-h-full w-full flex flex-col justify-between ${darkMode ? 'bg-[#121214] text-[#e3e2e6]' : 'bg-[#fbf8fe] text-[#1b1b1f]'} transition-colors overflow-y-auto`}>
      
      {/* ================= TOP HEADER ================= */}
      <header className={`w-full px-4 sm:px-8 py-3.5 flex items-center justify-between border-b ${darkMode ? 'bg-[#181920]/90 border-white/10' : 'bg-white/90 border-slate-200'} backdrop-blur-md sticky top-0 z-40 transition-colors shadow-xs`}>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#9e001f] text-white flex items-center justify-center shadow-md shadow-[#9e001f]/20">
            <ShieldCheck className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-lg sm:text-xl tracking-tight text-[#9e001f] dark:text-[#ffb4ab]">SIPANTAU</span>
              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#ffdad8] text-[#9e001f] hidden sm:inline-block">KOTA BANDUNG</span>
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium hidden sm:block">Sistem Layanan Pelayanan & Pemantauan Pengaduan Masyarakat Terpadu</p>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          {/* Lacak Tiket Cepat Button */}
          <button
            onClick={onOpenTracker}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-[#9e001f]/30 text-[#9e001f] dark:text-[#ffb4ab] bg-[#ffdad8]/30 hover:bg-[#ffdad8]/60 text-xs font-bold transition shadow-xs"
            title="Lacak status pengaduan langsung tanpa login"
          >
            <Search className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Lacak Tiket Aduan</span>
            <span className="sm:hidden">Lacak</span>
          </button>

          {/* Dark Mode Toggle */}
          <button
            onClick={onToggleDarkMode}
            className={`p-2 rounded-xl border ${darkMode ? 'border-white/10 bg-white/5 text-amber-300' : 'border-slate-200 bg-slate-100 text-slate-700'} hover:opacity-80 transition`}
            title={darkMode ? 'Beralih ke Mode Terang' : 'Beralih ke Mode Gelap'}
            aria-label="Ganti mode gelap/terang"
          >
            {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
        </div>
      </header>

      {/* ================= HERO & LOGIN PORTAL ================= */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 flex flex-col justify-center">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* LEFT INTRO COLUMN */}
          <div className="lg:col-span-6 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#ffdad8] dark:bg-[#9e001f]/30 border border-[#9e001f]/30 text-[#9e001f] dark:text-[#ffdad8] text-xs font-bold tracking-wide">
              <Sparkles className="w-3.5 h-3.5" />
              PORTAL TUNGGAL PELAPORAN DAERAH
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight">
              Satu Pintu Layanan Aspirasi, <br className="hidden sm:block" />
              <span className="text-[#9e001f] dark:text-[#ffb4ab]">Transparansi & Respons Cepat</span>
            </h1>

            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed font-body max-w-xl mx-auto lg:mx-0">
              Laporkan masalah jalan rusak, lampu jalan padam, penumpukan sampah, genangan banjir, hingga ketertiban umum secara langsung dengan geotagging GPS dan verifikasi dinas terintegrasi.
            </p>

            {/* Live Indicators */}
            <div className="grid grid-cols-3 gap-3 pt-2 max-w-lg mx-auto lg:mx-0">
              <div className={`p-3.5 rounded-2xl border ${darkMode ? 'bg-white/5 border-white/10' : 'bg-white border-slate-200'} text-center shadow-xs`}>
                <div className="text-xl sm:text-2xl font-extrabold text-[#9e001f] dark:text-[#ffb4ab]">{dailyStats.totalAduan}</div>
                <div className="text-[11px] text-slate-500 dark:text-slate-400 font-semibold mt-0.5">Total Aduan</div>
              </div>
              <div className={`p-3.5 rounded-2xl border ${darkMode ? 'bg-white/5 border-white/10' : 'bg-white border-slate-200'} text-center shadow-xs`}>
                <div className="text-xl sm:text-2xl font-extrabold text-emerald-600 dark:text-emerald-400">{dailyStats.selesaiPersen}%</div>
                <div className="text-[11px] text-slate-500 dark:text-slate-400 font-semibold mt-0.5">Tuntas Selesai</div>
              </div>
              <div className={`p-3.5 rounded-2xl border ${darkMode ? 'bg-white/5 border-white/10' : 'bg-white border-slate-200'} text-center shadow-xs`}>
                <div className="text-xl sm:text-2xl font-extrabold text-amber-600 dark:text-amber-400">{dailyStats.rataWaktuResponFormat}</div>
                <div className="text-[11px] text-slate-500 dark:text-slate-400 font-semibold mt-0.5">SLA Tanggap</div>
              </div>
            </div>

            {/* Alur 4 Langkah Singkat */}
            <div className={`p-4 rounded-2xl border ${darkMode ? 'bg-white/5 border-white/10' : 'bg-slate-50 border-slate-200/80'} text-left space-y-2.5 hidden sm:block`}>
              <div className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-200 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                Alur Kerja Penanganan Terpadu:
              </div>
              <div className="grid grid-cols-4 gap-2 text-[11px] text-slate-600 dark:text-slate-300">
                <div className="p-2 rounded-lg bg-white dark:bg-white/5 border border-slate-200 dark:border-white/5">
                  <span className="font-bold text-[#9e001f] dark:text-[#ffb4ab]">1. Lapor</span>
                  <p className="text-[10px] text-slate-500 mt-0.5">Foto & Geotagging</p>
                </div>
                <div className="p-2 rounded-lg bg-white dark:bg-white/5 border border-slate-200 dark:border-white/5">
                  <span className="font-bold text-[#9e001f] dark:text-[#ffb4ab]">2. Triase</span>
                  <p className="text-[10px] text-slate-500 mt-0.5">Verifikasi Diskominfo</p>
                </div>
                <div className="p-2 rounded-lg bg-white dark:bg-white/5 border border-slate-200 dark:border-white/5">
                  <span className="font-bold text-[#9e001f] dark:text-[#ffb4ab]">3. Aksi</span>
                  <p className="text-[10px] text-slate-500 mt-0.5">Regu Lapangan OPD</p>
                </div>
                <div className="p-2 rounded-lg bg-white dark:bg-white/5 border border-slate-200 dark:border-white/5">
                  <span className="font-bold text-emerald-600">4. Tuntas</span>
                  <p className="text-[10px] text-slate-500 mt-0.5">Verifikasi Warga</p>
                </div>
              </div>
            </div>

          </div>

          {/* RIGHT DUAL-PORTAL LOGIN CARD */}
          <div className="lg:col-span-6 flex justify-center">
            <div className={`w-full max-w-md rounded-3xl border ${darkMode ? 'bg-[#1e1e24] border-white/10 shadow-2xl shadow-black/40' : 'bg-white border-slate-200 shadow-2xl shadow-[#9e001f]/8'} overflow-hidden transition-all`}>
              
              {/* Tab Switcher (Warga vs Petugas) */}
              <div className="grid grid-cols-2 p-1.5 bg-slate-100 dark:bg-black/30 border-b border-slate-200 dark:border-white/10 gap-1.5">
                <button
                  type="button"
                  onClick={() => {
                    setActiveRoleTab('warga');
                    setWargaError('');
                  }}
                  className={`py-3 px-4 rounded-2xl text-xs font-bold transition flex items-center justify-center gap-2 ${
                    activeRoleTab === 'warga'
                      ? 'bg-white dark:bg-[#2b2b32] text-[#9e001f] dark:text-[#ffb4ab] shadow-md'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                  }`}
                >
                  <User className="w-4 h-4" />
                  <span>Portal Warga</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setActiveRoleTab('petugas');
                    setPetugasError('');
                  }}
                  className={`py-3 px-4 rounded-2xl text-xs font-bold transition flex items-center justify-center gap-2 ${
                    activeRoleTab === 'petugas'
                      ? 'bg-white dark:bg-[#2b2b32] text-red-600 dark:text-red-400 shadow-md'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                  }`}
                >
                  <ShieldAlert className="w-4 h-4" />
                  <span>Petugas ASN / OPD</span>
                </button>
              </div>

              {/* BODY 1: PORTAL WARGA */}
              {activeRoleTab === 'warga' && (
                <div className="p-6 sm:p-8 space-y-6 animate-in fade-in duration-150">
                  <div className="space-y-1">
                    <h2 className="text-xl font-extrabold text-[#9e001f] dark:text-[#ffb4ab]">Masuk ke Portal Warga</h2>
                    <p className="text-xs text-slate-500 dark:text-slate-400">Ajukan pengaduan fasilitas, pantau status tiket, atau beri dukungan.</p>
                  </div>

                  {wargaError && (
                    <div className="p-3 rounded-xl bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 text-xs text-red-700 dark:text-red-300 flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>{wargaError}</span>
                    </div>
                  )}

                  <form onSubmit={handleWargaSubmit} className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                        Nomor Induk Kependudukan (NIK)
                      </label>
                      <input
                        type="text"
                        value={wargaNik}
                        onChange={(e) => setWargaNik(e.target.value)}
                        placeholder="16 digit NIK sesuai KTP..."
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-white/10 bg-slate-50 dark:bg-black/20 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#9e001f] focus:border-[#9e001f]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                        Nama Lengkap Pelapor
                      </label>
                      <input
                        type="text"
                        value={wargaName}
                        onChange={(e) => setWargaName(e.target.value)}
                        placeholder="Nama pelapor..."
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-white/10 bg-slate-50 dark:bg-black/20 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#9e001f] focus:border-[#9e001f]"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3 rounded-xl bg-[#9e001f] hover:bg-[#800019] text-white font-bold text-xs sm:text-sm shadow-md transition flex items-center justify-center gap-2 active:scale-98"
                    >
                      <LogIn className="w-4 h-4" />
                      <span>Masuk ke Portal Warga</span>
                    </button>
                  </form>

                  {/* Direct Guest Entry (No Account Needed) */}
                  <div className="pt-2 border-t border-slate-200 dark:border-white/10 space-y-2.5">
                    <div className="text-[11px] text-slate-500 text-center font-medium">Atau akses langsung tanpa akun:</div>
                    <button
                      type="button"
                      onClick={() => onSelectRole('warga', { name: 'Masyarakat Umum (Tamu)', role: 'Warga Tamu' })}
                      className="w-full py-2.5 px-3 rounded-xl border border-slate-300 dark:border-white/20 bg-slate-100/70 dark:bg-white/5 hover:bg-slate-200/70 text-slate-800 dark:text-slate-200 text-xs font-bold transition flex items-center justify-center gap-2"
                    >
                      <span>Jelajahi Portal Langsung (Mode Tamu)</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              )}

              {/* BODY 2: PORTAL PETUGAS ASN / VERIFIKATOR OPD */}
              {activeRoleTab === 'petugas' && (
                <div className="p-6 sm:p-8 space-y-6 animate-in fade-in duration-150">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h2 className="text-xl font-extrabold text-red-600 dark:text-red-400">Backoffice Petugas OPD</h2>
                      <span className="text-[9px] uppercase font-bold bg-red-100 text-red-700 px-2 py-0.5 rounded-full">TERBATAS</span>
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400">Akses khusus verifikator Pemda, triase aduan, dan disposisi teknis dinas.</p>
                  </div>

                  {petugasError && (
                    <div className="p-3 rounded-xl bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 text-xs text-red-700 dark:text-red-300 flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>{petugasError}</span>
                    </div>
                  )}

                  {/* 1-Click Demo Quick Login for Evaluator/Dosen */}
                  <div className="space-y-2 p-3.5 rounded-2xl bg-red-50/60 dark:bg-red-950/20 border border-red-200/60 dark:border-red-900/40">
                    <div className="text-[11px] font-bold text-red-800 dark:text-red-300 uppercase tracking-wider flex items-center gap-1.5">
                      <Key className="w-3.5 h-3.5" />
                      Pilih Akun Petugas Simulasi (1-Klik):
                    </div>
                    
                    <button
                      type="button"
                      onClick={() => onSelectRole('petugas', {
                        name: 'Budi Santoso, S.STP',
                        role: 'Koordinator Verifikator & Triase',
                        nip: '198503122010011008',
                        opd: 'Diskominfo Kota Bandung'
                      })}
                      className="w-full text-left p-2.5 rounded-xl bg-white dark:bg-[#181920] border border-red-300 dark:border-red-700/50 hover:border-red-500 transition flex items-center justify-between group shadow-2xs"
                    >
                      <div className="flex items-center gap-2.5">
                        <span className="w-7 h-7 rounded-lg bg-red-600 text-white flex items-center justify-center font-bold text-xs">BS</span>
                        <div>
                          <div className="font-bold text-xs text-slate-900 dark:text-white">Budi Santoso, S.STP</div>
                          <div className="text-[10px] text-slate-500">Koordinator Verifikasi (Diskominfo)</div>
                        </div>
                      </div>
                      <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-red-600 transition" />
                    </button>

                    <button
                      type="button"
                      onClick={() => onSelectRole('petugas', {
                        name: 'Siti Maryam, S.T.',
                        role: 'Verifikator Teknis Dinas',
                        nip: '199008242014022003',
                        opd: 'Dinas Bina Marga & Tata Ruang'
                      })}
                      className="w-full text-left p-2.5 rounded-xl bg-white dark:bg-[#181920] border border-slate-200 dark:border-white/10 hover:border-blue-500 transition flex items-center justify-between group shadow-2xs"
                    >
                      <div className="flex items-center gap-2.5">
                        <span className="w-7 h-7 rounded-lg bg-blue-700 text-white flex items-center justify-center font-bold text-xs">SM</span>
                        <div>
                          <div className="font-bold text-xs text-slate-900 dark:text-white">Siti Maryam, S.T.</div>
                          <div className="text-[10px] text-slate-500">Verifikator Teknis (Dinas Bina Marga)</div>
                        </div>
                      </div>
                      <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600 transition" />
                    </button>
                  </div>

                  <form onSubmit={handlePetugasSubmit} className="space-y-3 pt-1">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                        Nomor Induk Pegawai (NIP)
                      </label>
                      <input
                        type="text"
                        value={petugasNip}
                        onChange={(e) => setPetugasNip(e.target.value)}
                        placeholder="18 digit NIP..."
                        className="w-full px-3.5 py-2 rounded-xl border border-slate-300 dark:border-white/10 bg-slate-50 dark:bg-black/20 text-xs sm:text-sm font-mono focus:outline-none focus:ring-2 focus:ring-red-600"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                        Kata Sandi Petugas
                      </label>
                      <div className="relative">
                        <input
                          type={showPetugasPassword ? 'text' : 'password'}
                          value={petugasPassword}
                          onChange={(e) => setPetugasPassword(e.target.value)}
                          placeholder="Kata sandi..."
                          className="w-full px-3.5 py-2 rounded-xl border border-slate-300 dark:border-white/10 bg-slate-50 dark:bg-black/20 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-red-600"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPetugasPassword(!showPetugasPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                        >
                          {showPetugasPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="w-full py-2.5 rounded-xl bg-red-700 hover:bg-red-800 text-white font-bold text-xs sm:text-sm shadow-md transition flex items-center justify-center gap-2 active:scale-98 mt-2"
                    >
                      <Lock className="w-4 h-4" />
                      <span>Masuk Sebagai Petugas ASN</span>
                    </button>
                  </form>

                </div>
              )}

            </div>
          </div>

        </div>

      </main>

      {/* ================= FOOTER RESMI ================= */}
      <footer className={`w-full py-4 px-4 sm:px-8 border-t ${darkMode ? 'bg-[#181920] border-white/10 text-slate-400' : 'bg-white border-slate-200 text-slate-500'} text-xs font-body`}>
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          <div>
            &copy; 2026 SIPANTAU - Sistem Pengaduan Masyarakat Terpadu. Pemerintah Daerah.
          </div>
          <div className="flex items-center gap-4 text-[11px]">
            <span>Perlindungan Data Pribadi (UU PDP No. 27/2022)</span>
            <span>•</span>
            <span>Standar Pelayanan Publik SP4N-LAPOR!</span>
          </div>
        </div>
      </footer>

    </div>
  );
};
