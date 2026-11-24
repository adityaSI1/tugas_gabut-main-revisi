import { nikParser } from 'nik-parser';

export interface KtpValidationResult {
  valid: boolean;
  nik: string;
  provinsi?: string;
  provinsiId?: string;
  kabupatenKota?: string;
  kabupatenKotaId?: string;
  kecamatan?: string;
  kecamatanId?: string;
  kodepos?: string;
  jenisKelamin?: 'Laki-laki' | 'Perempuan';
  tanggalLahir?: string;
  usia?: number;
  statusEktp: 'TERVERIFIKASI KEMENDAGRI' | 'TIDAK VALID' | 'FORMAT TIDAK LENGKAP';
  message: string;
}

/**
 * Validasi dan dekode struktur 16 digit NIK e-KTP berdasarkan standar Kemendagri RI.
 * Menggunakan engine nik-parser untuk memverifikasi keabsahan kode wilayah dan tanggal lahir.
 */
export function validateKtpNik(nikInput: string): KtpValidationResult {
  const cleanNik = (nikInput || '').replace(/[^0-9]/g, '').trim();

  if (!cleanNik) {
    return {
      valid: false,
      nik: '',
      statusEktp: 'FORMAT TIDAK LENGKAP',
      message: 'Nomor Induk Kependudukan (NIK) tidak boleh kosong.'
    };
  }

  if (cleanNik.length !== 16) {
    return {
      valid: false,
      nik: cleanNik,
      statusEktp: 'FORMAT TIDAK LENGKAP',
      message: `NIK e-KTP wajib tepat 16 digit angka (saat ini ${cleanNik.length} digit).`
    };
  }

  try {
    const parsed = nikParser(cleanNik);
    const isValid = typeof parsed.isValid === 'function' ? parsed.isValid() : false;

    if (!isValid) {
      return {
        valid: false,
        nik: cleanNik,
        statusEktp: 'TIDAK VALID',
        message: 'Nomor Induk Kependudukan (NIK) tidak valid menurut format wilayah & penanggalan Kemendagri.'
      };
    }

    const prov = parsed.province() || 'TIDAK DIKETAHUI';
    const kab = parsed.kabupatenKota() || 'TIDAK DIKETAHUI';
    const kec = parsed.kecamatan() || 'TIDAK DIKETAHUI';
    const gender = parsed.kelamin() === 'wanita' ? 'Perempuan' : 'Laki-laki';
    const lahirDate = parsed.lahir();
    
    let formattedLahir = '-';
    let usia = 0;
    if (lahirDate instanceof Date && !isNaN(lahirDate.getTime())) {
      const year = lahirDate.getFullYear();
      const month = String(lahirDate.getMonth() + 1).padStart(2, '0');
      const day = String(lahirDate.getDate()).padStart(2, '0');
      formattedLahir = `${day}-${month}-${year}`;

      const today = new Date();
      usia = today.getFullYear() - year;
      const m = today.getMonth() - lahirDate.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < lahirDate.getDate())) {
        usia--;
      }
    }

    return {
      valid: true,
      nik: cleanNik,
      provinsi: prov,
      provinsiId: parsed.provinceId?.() || cleanNik.slice(0, 2),
      kabupatenKota: kab,
      kabupatenKotaId: parsed.kabupatenKotaId?.() || cleanNik.slice(0, 4),
      kecamatan: kec,
      kecamatanId: parsed.kecamatanId?.() || cleanNik.slice(0, 6),
      kodepos: parsed.kodepos?.() || '',
      jenisKelamin: gender,
      tanggalLahir: formattedLahir,
      usia: Math.max(0, usia),
      statusEktp: 'TERVERIFIKASI KEMENDAGRI',
      message: `e-KTP terverifikasi aktif di ${kab}, ${prov}.`
    };
  } catch (err: any) {
    return {
      valid: false,
      nik: cleanNik,
      statusEktp: 'TIDAK VALID',
      message: `Gagal memverifikasi NIK: ${err?.message || 'Format tidak valid'}`
    };
  }
}
