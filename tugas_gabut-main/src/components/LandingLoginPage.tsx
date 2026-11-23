import React, { useState } from 'react';
import {
  ShieldCheck,
  ShieldAlert,
  User,
  LogIn,
  Lock,
  Eye,
  EyeOff,
  AlertCircle,
  ArrowLeft,
  Loader2
} from 'lucide-react';
import { DailyStats } from '../utils/civic-db';
import { loginUser } from '../utils/api-client';

interface LandingLoginPageProps {
  onSelectRole: (role: 'warga' | 'petugas', profile?: { name: string; role: string; nip?: string; opd?: string; nik?: string; phone?: string }) => void;
  darkMode: boolean;
  onToggleDarkMode: () => void;
  onOpenTracker: () => void;
  dailyStats: DailyStats;
}

export const LandingLoginPage: React.FC<LandingLoginPageProps> = ({
  onSelectRole,
  darkMode
}) => {
  const [activeRoleTab, setActiveRoleTab] = useState<'warga' | 'petugas'>('warga');

  // State Form Warga (Asli, Bersih, Tanpa Dummy)
  const [wargaNik, setWargaNik] = useState('');
  const [wargaName, setWargaName] = useState('');
  const [wargaPhone, setWargaPhone] = useState('');
  const [wargaError, setWargaError] = useState('');

  // State Form Petugas / Admin (Autentikasi Nyata Database)
  const [petugasNip, setPetugasNip] = useState('');
  const [petugasPassword, setPetugasPassword] = useState('');
  const [showPetugasPassword, setShowPetugasPassword] = useState(false);
  const [petugasError, setPetugasError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Submit Warga Login
  const handleWargaSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const cleanNik = wargaNik.trim();
    if (!cleanNik) {
      setWargaError('Silakan masukkan Nomor Induk Kependudukan (NIK) Anda');
      return;
    }
    if (cleanNik.length < 6) {
      setWargaError('Nomor Induk Kependudukan (NIK) minimal 6 digit angka');
      return;
    }

    setWargaError('');
    setIsLoading(true);

    try {
      const res = await loginUser({
        type: 'warga',
        nik: cleanNik,
        nama: wargaName.trim() || 'Warga Terverifikasi',
        telepon: wargaPhone.trim()
      });

      if (res.success && res.user) {
        onSelectRole('warga', res.user);
      } else {
        setWargaError(res.message || 'Gagal masuk sebagai warga');
      }
    } catch (_err) {
      setWargaError('Terjadi kendala saat memproses autentikasi warga');
    } finally {
      setIsLoading(false);
    }
  };

  // Submit Petugas / Admin Login (Autentikasi Nyata ke SQLite)
  const handlePetugasSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!petugasNip.trim()) {
      setPetugasError('Silakan masukkan Nomor Induk Pegawai (NIP) atau username admin');
      return;
    }
    if (!petugasPassword.trim()) {
      setPetugasError('Silakan masukkan kata sandi resmi petugas');
      return;
    }

    setPetugasError('');
    setIsLoading(true);

    try {
      const res = await loginUser({
        type: 'petugas',
        nip: petugasNip.trim(),
        password: petugasPassword.trim()
      });

      if (res.success && res.user) {
        onSelectRole('petugas', {
          name: res.user.name,
          role: res.user.jabatan || res.user.userRole || 'Petugas Verifikator',
          nip: res.user.nip,
          opd: res.user.instansi
        });
      } else {
        setPetugasError(res.message || 'NIP atau kata sandi tidak valid');
      }
    } catch (_err) {
      setPetugasError('Terjadi kendala konektivitas saat memverifikasi akun petugas');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`min-h-full w-full flex flex-col justify-center items-center py-10 px-4 ${darkMode ? 'bg-[#121214] text-[#e3e2e6]' : 'bg-[#FAF8F8] text-[#1b1b1f]'} transition-colors`}>
      <div className="w-full max-w-md">

        {/* Brand & GovTech Title */}
        <div className="text-center mb-6">
          <div className="inline-flex w-12 h-12 rounded-xl bg-[#9e001f] text-white items-center justify-center shadow-md mb-3">
            <ShieldCheck className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white font-sans">
            Masuk ke Layanan SIPANTAU
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Sistem Informasi Pelayanan &amp; Pemantauan Pengaduan Masyarakat
          </p>
        </div>

        {/* Clean Login Box */}
        <div className={`rounded-2xl border ${darkMode ? 'bg-[#181920] border-white/10 shadow-xl' : 'bg-white border-slate-200 shadow-sm'} overflow-hidden transition-all`}>
          
          {/* Tab Switcher: Warga vs Petugas */}
          <div className="grid grid-cols-2 p-1 bg-slate-100 dark:bg-black/30 border-b border-slate-200 dark:border-white/10 gap-1" role="tablist" aria-label="Pilih Portal">
            <button
              type="button"
              role="tab"
              aria-selected={activeRoleTab === 'warga'}
              onClick={() => {
                setActiveRoleTab('warga');
                setWargaError('');
              }}
              className={`cursor-pointer min-h-[44px] py-2.5 px-3 rounded-xl text-xs font-bold transition flex items-center justify-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9e001f] ${
                activeRoleTab === 'warga'
                  ? 'bg-white dark:bg-[#2b2b32] text-[#9e001f] dark:text-[#ffb4ab] shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              <User className="w-4 h-4" />
              <span>Warga Pelapor</span>
            </button>

            <button
              type="button"
              role="tab"
              aria-selected={activeRoleTab === 'petugas'}
              onClick={() => {
                setActiveRoleTab('petugas');
                setPetugasError('');
              }}
              className={`cursor-pointer min-h-[44px] py-2.5 px-3 rounded-xl text-xs font-bold transition flex items-center justify-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-600 ${
                activeRoleTab === 'petugas'
                  ? 'bg-white dark:bg-[#2b2b32] text-red-600 dark:text-red-400 shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              <ShieldAlert className="w-4 h-4" />
              <span>Petugas ASN / OPD</span>
            </button>
          </div>

          {/* Form Warga */}
          {activeRoleTab === 'warga' && (
            <div className="p-6 space-y-4">
              <div className="space-y-1">
                <h2 className="text-base font-bold text-slate-900 dark:text-white">Identitas Warga Pelapor</h2>
                <p className="text-xs text-slate-500 dark:text-slate-400">Masukkan NIK dan nama Anda untuk memantau status aduan serta mengirim klarifikasi.</p>
              </div>

              {wargaError && (
                <div className="p-3 rounded-lg bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 text-xs text-red-700 dark:text-red-300 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{wargaError}</span>
                </div>
              )}

              <form onSubmit={handleWargaSubmit} className="space-y-3.5">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Nomor Induk Kependudukan (NIK) *
                  </label>
                  <input
                    type="text"
                    required
                    value={wargaNik}
                    onChange={(e) => setWargaNik(e.target.value.replace(/[^0-9]/g, ''))}
                    placeholder="Masukkan 16 digit NIK KTP Anda..."
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-white/10 bg-slate-50 dark:bg-black/20 text-xs font-mono focus:outline-none focus:ring-2 focus:ring-[#9e001f]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Nama Lengkap Pelapor *
                  </label>
                  <input
                    type="text"
                    required
                    value={wargaName}
                    onChange={(e) => setWargaName(e.target.value)}
                    placeholder="Nama lengkap sesuai KTP..."
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-white/10 bg-slate-50 dark:bg-black/20 text-xs focus:outline-none focus:ring-2 focus:ring-[#9e001f]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Nomor Telepon / WhatsApp (Opsional)
                  </label>
                  <input
                    type="tel"
                    value={wargaPhone}
                    onChange={(e) => setWargaPhone(e.target.value)}
                    placeholder="Contoh: 081234567890"
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-white/10 bg-slate-50 dark:bg-black/20 text-xs font-mono focus:outline-none focus:ring-2 focus:ring-[#9e001f]"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="cursor-pointer min-h-[44px] w-full py-2.5 rounded-lg bg-[#9e001f] hover:bg-[#800019] text-white font-bold text-xs shadow-xs transition flex items-center justify-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9e001f] disabled:opacity-70"
                >
                  {isLoading ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <>
                      <LogIn className="w-4 h-4" />
                      <span>Masuk ke Layanan Warga</span>
                    </>
                  )}
                </button>
              </form>
            </div>
          )}

          {/* Form Petugas (Autentikasi Nyata Tanpa Simulasi) */}
          {activeRoleTab === 'petugas' && (
            <div className="p-6 space-y-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h2 className="text-base font-bold text-red-600 dark:text-red-400">Portal Petugas &amp; Backoffice</h2>
                  <span className="text-[10px] uppercase font-bold bg-red-100 text-red-800 px-2 py-0.5 rounded">TERBATAS</span>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400">Khusus aparatur verifikator Diskominfo, admin, dan petugas teknis OPD daerah.</p>
              </div>

              {petugasError && (
                <div className="p-3 rounded-lg bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 text-xs text-red-700 dark:text-red-300 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{petugasError}</span>
                </div>
              )}

              <form onSubmit={handlePetugasSubmit} className="space-y-3 pt-1">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Nomor Induk Pegawai (NIP) / Akun Admin *
                  </label>
                  <input
                    type="text"
                    required
                    value={petugasNip}
                    onChange={(e) => setPetugasNip(e.target.value)}
                    placeholder="Masukkan NIP atau username admin..."
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-white/10 bg-slate-50 dark:bg-black/20 text-xs font-mono focus:outline-none focus:ring-2 focus:ring-red-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Kata Sandi Petugas / Admin *
                  </label>
                  <div className="relative">
                    <input
                      type={showPetugasPassword ? 'text' : 'password'}
                      required
                      value={petugasPassword}
                      onChange={(e) => setPetugasPassword(e.target.value)}
                      placeholder="Masukkan kata sandi..."
                      className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-white/10 bg-slate-50 dark:bg-black/20 text-xs focus:outline-none focus:ring-2 focus:ring-red-600"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPetugasPassword(!showPetugasPassword)}
                      aria-label={showPetugasPassword ? 'Sembunyikan kata sandi' : 'Tampilkan kata sandi'}
                      className="cursor-pointer absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1 rounded focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-red-600"
                    >
                      {showPetugasPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="cursor-pointer min-h-[44px] w-full py-2.5 rounded-lg bg-red-700 hover:bg-red-800 text-white font-bold text-xs shadow-xs transition flex items-center justify-center gap-2 active:scale-98 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-600 disabled:opacity-70"
                >
                  {isLoading ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <>
                      <Lock className="w-4 h-4" />
                      <span>Masuk ke Meja Kerja Petugas</span>
                    </>
                  )}
                </button>
              </form>
            </div>
          )}

          {/* Action: Kembali ke Beranda */}
          <div className="p-3 bg-slate-50 dark:bg-white/5 border-t border-slate-200 dark:border-white/10 text-center">
            <button
              type="button"
              onClick={() => onSelectRole('warga')}
              className="cursor-pointer text-xs font-medium text-slate-600 dark:text-slate-400 hover:text-[#9e001f] transition inline-flex items-center gap-1.5 py-1 px-3 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9e001f]"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Kembali ke Beranda Publik</span>
            </button>
          </div>

        </div>

        {/* Footer Security Note */}
        <p className="text-[11px] text-slate-400 dark:text-slate-500 text-center mt-4">
          Data pelapor dan akses sistem verifikasi terlindungi sesuai UU No. 27 Tahun 2022.
        </p>

      </div>
    </div>
  );
};
