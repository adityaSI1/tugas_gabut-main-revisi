export interface TicketMessage {
  id: string;
  senderRole: 'warga' | 'petugas';
  senderName: string;
  roleBadge?: string;
  text: string;
  foto?: string;
  waktu: string;
}

export interface CitizenRating {
  stars: number;
  aspects?: string[];
  comment?: string;
  waktu: string;
}

export interface CivicTicket {
  id: string;
  code: string;
  judul: string;
  kategori: string;
  kategoriLabel: string;
  dinas: string;
  alamat: string;
  kecamatan: string;
  waktu: string;
  sla: string;
  urgensi: 'Tinggi' | 'Sedang' | 'Rendah' | string;
  triaseLevel: string;
  status: 'Diajukan' | 'Diverifikasi' | 'Penanganan' | 'Selesai' | 'Ditolak';
  upvotes: number;
  lat: number;
  lng: number;
  pelapor: string;
  nik: string;
  telepon: string;
  deskripsi: string;
  foto: string;
  petugas: string;
  timeline: Array<{
    tahap: string;
    waktu: string;
    keterangan: string;
    done?: boolean;
    active?: boolean;
    actor?: string;
  }>;
  messages?: TicketMessage[];
  rating?: CitizenRating;
}

export interface DailyStats {
  aduanHariIni: number;
  rataWaktuResponMenit: number;
  rataWaktuResponFormat: string;
  sedangDiproses: number;
  tuntasHariIni: number;
  persentaseSelesai: number;
  totalAduan: number;
  kategoriPopuler: Array<{ nama: string; jumlah: number }>;
}

export const INITIAL_TICKETS: CivicTicket[] = [
  {
    id: '#LAPOR-2410-092',
    code: 'LAPOR-2410-092',
    judul: 'Jalan Rusak & Berlubang Dalam',
    kategori: 'Jalan Rusak',
    kategoriLabel: 'Infrastruktur Jalan & Jembatan',
    dinas: 'Dinas Bina Marga & Tata Ruang',
    alamat: 'Jl. Ir. H. Juanda No. 84, Dago, Kec. Coblong',
    kecamatan: 'Kec. Coblong',
    waktu: 'Hari ini, 09:15 WIB',
    sla: 'SLA 4j 10m',
    urgensi: 'Tinggi',
    triaseLevel: 'Triase Level 1',
    status: 'Diverifikasi',
    upvotes: 35,
    lat: -6.890451,
    lng: 107.612824,
    pelapor: 'Budi Pratama (Warga Pelapor)',
    nik: '3273**********0019',
    telepon: '+62 813-****-8821',
    deskripsi: 'Aspal jalan utama berlubang sedalam 20 cm dengan diameter hampir 1 meter di lajur kiri arah Dago Atas.',
    foto: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDF8T8kAUNM-_2HbGnXu8uBKMJ2muGoOIIVwsW-LJXlvjeUyggI0kmrcFyCrJjw5DGqCVi2YjGD6kjq4_gY3-wkkU7CUJuk3ewvRC13mHt8lJyLnqVDv-klbEXOR1R1qkaKxAKpJP1LKp9Pib0NfqapWtlBZyChM_CTjE5aay9TegQ8LnoxrCAjItLPcfcuLGBXQVWqAm4o_HFnPV0BLEExLo7eqWfAbvwqq5KEy88',
    petugas: 'Siti M. (Verifikator Bina Marga)',
    timeline: [
      { tahap: 'Laporan Diajukan Warga', waktu: 'Hari ini, 09:15 WIB', keterangan: 'Tiket diterima dengan lampiran foto terverifikasi EXIF & koordinat GPS.', done: true },
      { tahap: 'Verifikasi Administrasi & Geotag', waktu: 'Hari ini, 09:42 WIB', keterangan: 'Diverifikasi oleh Tim Triase Diskominfo & diteruskan ke Bina Marga.', done: true },
      { tahap: 'Penanganan Regu Teknis OPD', waktu: 'Dalam Antrean URC', keterangan: 'Unit Reaksi Cepat (URC) sedang dijadwalkan menuju titik lokasi.', active: true },
      { tahap: 'Selesai & Evaluasi Publik', waktu: '-', keterangan: 'Menunggu perbaikan.', done: false }
    ],
    messages: [
      {
        id: 'msg-1',
        senderRole: 'warga',
        senderName: 'Budi Pratama (Warga)',
        roleBadge: 'Pelapor Terverifikasi',
        text: 'Selamat pagi bapak/ibu petugas, kondisi lubang semakin melebar setelah hujan semalam. Ambulans tadi pagi harus rem mendadak karena lubang ini. Mohon segera dipasang tanda peringatan atau ditambal sementara.',
        foto: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDF8T8kAUNM-_2HbGnXu8uBKMJ2muGoOIIVwsW-LJXlvjeUyggI0kmrcFyCrJjw5DGqCVi2YjGD6kjq4_gY3-wkkU7CUJuk3ewvRC13mHt8lJyLnqVDv-klbEXOR1R1qkaKxAKpJP1LKp9Pib0NfqapWtlBZyChM_CTjE5aay9TegQ8LnoxrCAjItLPcfcuLGBXQVWqAm4o_HFnPV0BLEExLo7eqWfAbvwqq5KEy88',
        waktu: 'Hari ini, 09:25 WIB'
      },
      {
        id: 'msg-2',
        senderRole: 'petugas',
        senderName: 'Siti M. (Petugas OPD)',
        roleBadge: 'Verifikator Dinas Bina Marga',
        text: 'Halo Pak Budi, terima kasih atas laporan lanjutannya. Laporan Anda telah kami naikkan ke Prioritas Darurat (URC). Tim Regu 2 Cikapundung saat ini sedang meluncur membawa material cold-mix untuk penambalan darurat.',
        foto: 'https://images.unsplash.com/photo-1578328819058-b69f3a3b0f6b?auto=format&fit=crop&w=600&q=80',
        waktu: 'Hari ini, 09:45 WIB'
      }
    ]
  },
  {
    id: '#TKT-2024-8841',
    code: 'TKT-2024-8841',
    judul: 'Pipa PDAM Bocor Menyebabkan Genangan Jalan Protokol',
    kategori: 'Drainase / Banjir',
    kategoriLabel: 'Infrastruktur Air',
    dinas: 'Perumda Tirtawening (PDAM)',
    alamat: 'Jl. Asia Afrika No. 120, Sumur Bandung',
    kecamatan: 'Kec. Sumur Bandung',
    waktu: 'Hari ini, 08:14 WIB',
    sla: 'SLA 2j 46m',
    urgensi: 'Tinggi',
    triaseLevel: 'Triase Level 1',
    status: 'Diajukan',
    upvotes: 49,
    lat: -6.9215,
    lng: 107.6102,
    pelapor: 'Hendra Wijaya (Warga)',
    nik: '3273**********0002',
    telepon: '+62 812-****-4912',
    deskripsi: 'Pipa distribusi utama di tepi trotoar Jl. Asia Afrika mengalami kebocoran bertekanan tinggi.',
    foto: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC6T-WUgAKxq9637CuiGiiGnvSw03V7nLj84xlZeAoGZx7Ln4IGTqM8uCtEaHv7MG7q5-UJLJiCjXlzQjePNqksgDR7Tr2435XoxUESCIwufa-ysKB7GJk6wmncq5uJrOcYLAfCwco80skBpE2NV-PZibqiTy8IJcmLFNzQE1TJkT6XhMcWJEjyGh82kZO6dlFX-_GeezA7qpQB5JGb7iKjo8JPtHEkdqyzDMNAXVc',
    petugas: 'Budi S. (Review)',
    timeline: [
      { tahap: 'Laporan Diajukan Warga', waktu: 'Hari ini, 08:14 WIB', keterangan: 'Laporan masuk melalui portal warga.', done: true },
      { tahap: 'Verifikasi & Disposisi Petugas', waktu: 'Sedang Ditinjau', keterangan: 'Menunggu persetujuan disposisi.', active: true },
      { tahap: 'Penanganan Regu Teknis OPD', waktu: '-', keterangan: '-', done: false },
      { tahap: 'Selesai & Evaluasi Publik', waktu: '-', keterangan: '-', done: false }
    ],
    messages: [
      {
        id: 'msg-pdam-1',
        senderRole: 'warga',
        senderName: 'Hendra Wijaya (Warga)',
        roleBadge: 'Pelapor',
        text: 'Air menyembur cukup deras membasahi trotoar di samping halte bis. Mohon katup air sementara ditutup terlebih dahulu.',
        waktu: 'Hari ini, 08:16 WIB'
      }
    ]
  },
  {
    id: '#TKT-2024-8840',
    code: 'TKT-2024-8840',
    judul: 'Lampu APILL Simpang Lima Padam Mengakibatkan Kemacetan Parah',
    kategori: 'Lampu Jalan PJU',
    kategoriLabel: 'Lampu Lalu Lintas',
    dinas: 'Dinas Perhubungan',
    alamat: 'Simpang Lima Gatot Subroto, Batununggal',
    kecamatan: 'Kec. Batununggal',
    waktu: 'Hari ini, 07:45 WIB',
    sla: 'SLA 3j 15m',
    urgensi: 'Tinggi',
    triaseLevel: 'Triase Level 2',
    status: 'Penanganan',
    upvotes: 62,
    lat: -6.9228,
    lng: 107.6265,
    pelapor: 'Rina Kartika (Warga)',
    nik: '3273**********0108',
    telepon: '+62 857-****-3310',
    deskripsi: 'Lampu merah (APILL) di persimpangan utama Simpang Lima mati total dari keempat arah.',
    foto: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDIXjEZj079G_YJOL8tGEFoKfP2jeHXvknJi6Tb_ReagnYUucEcO91ow95UQvb4v4eDZSa7FLA8rjbn0BEHC49kPGWTaMimdCdCK9MlCWkSoRktv0tQa7UjJ-6nQFNSXb_AN5uE9jXUche8zcj04iSe9kWYxScBvBYYA_pJc9nIxW4O9XOuEmTK88QXMXSYRUVzdx-YKKmN3sIPISmegkdgaL-LYOmpUxfZ5LQGrwY',
    petugas: 'Siti M. (Dishub)',
    timeline: [
      { tahap: 'Laporan Diajukan Warga', waktu: 'Hari ini, 07:45 WIB', keterangan: 'Laporan diterima.', done: true },
      { tahap: 'Verifikasi & Disposisi', waktu: 'Hari ini, 08:05 WIB', keterangan: 'Disposisi diteruskan ke Dishub.', done: true },
      { tahap: 'Penanganan Regu Teknis Dishub', waktu: 'Hari ini, 08:40 WIB', keterangan: 'Teknisi memperbaiki panel kontrol.', active: true },
      { tahap: 'Selesai & Evaluasi Publik', waktu: '-', keterangan: '-', done: false }
    ],
    messages: [
      {
        id: 'msg-apill-1',
        senderRole: 'petugas',
        senderName: 'Siti M. (Petugas Dishub)',
        roleBadge: 'Disposisi Dishub',
        text: 'Petugas lapangan sudah berada di lokasi mengatur lalu lintas secara manual sembari teknisi me-restart genset cadangan panel listrik.',
        waktu: 'Hari ini, 08:20 WIB'
      }
    ]
  },
  {
    id: '#TKT-2024-8835',
    code: 'TKT-2024-8835',
    judul: 'Dahan Pohon Peneduh Patah Menimpa Kabel Listrik PLN',
    kategori: 'Fasilitas Umum',
    kategoriLabel: 'Pohon Tumbang',
    dinas: 'DPKP3 & Damkar',
    alamat: 'Jl. Dago Atas No. 88, Coblong',
    kecamatan: 'Kec. Coblong',
    waktu: 'Kemarin, 19:40 WIB',
    sla: 'SLA Terpenuhi',
    urgensi: 'Tinggi',
    triaseLevel: 'Triase Level 1',
    status: 'Selesai',
    upvotes: 76,
    lat: -6.8789,
    lng: 107.6189,
    pelapor: 'Warga Terverifikasi',
    nik: '3273**********0091',
    telepon: '+62 819-****-7712',
    deskripsi: 'Cabang pohon angsana besar patah pasca angin kencang.',
    foto: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCil4z9SpRUrlwHnCA5NfQg7RN5p3J1xxMHFjTRc8YTq6CqHQogFFMGY2GZc5HxeldEvUD86jrhqUjTxBTtViBWur2SpVFMQuoYWfz5LcHjIuFx4tv39S9IILxZ7QPYiRtABW1it3_0Qi1yiNccxLgmLo_wWx2i6Gj_OEI6e5VgLo7ZbG2ev5wljBwyzqi2esjHS0vT4-gNhD8ITvj6kQztHvTaMk6_gtOAMA9cwXA',
    petugas: 'Reza T. (Evakuasi)',
    timeline: [
      { tahap: 'Laporan Diajukan Warga', waktu: 'Kemarin, 19:40 WIB', keterangan: 'Laporan darurat diterima.', done: true },
      { tahap: 'Verifikasi Cepat', waktu: 'Kemarin, 19:48 WIB', keterangan: 'Disposisi darurat.', done: true },
      { tahap: 'Pemangkasan & Evakuasi', waktu: 'Kemarin, 20:30 WIB', keterangan: 'Pohon dievakuasi.', done: true },
      { tahap: 'Selesai Ditangani', waktu: 'Kemarin, 22:15 WIB', keterangan: 'Jalan kembali aman.', done: true }
    ],
    messages: [
      {
        id: 'msg-pohon-1',
        senderRole: 'warga',
        senderName: 'Warga Dago',
        roleBadge: 'Pelapor',
        text: 'Kabel listrik sempat mengeluarkan percikan api saat dahan jatuh.',
        waktu: 'Kemarin, 19:42 WIB'
      },
      {
        id: 'msg-pohon-2',
        senderRole: 'petugas',
        senderName: 'Reza T. (Damkar)',
        roleBadge: 'Petugas Evakuasi',
        text: 'Penanganan pemotongan dahan telah selesai 100% dan arus listrik PLN telah diamankan normal.',
        foto: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=600&q=80',
        waktu: 'Kemarin, 22:16 WIB'
      }
    ]
  }
];

export function validateTicket(ticket: Partial<CivicTicket>): { valid: boolean; errors: string[] } {
  const errors: string[] = [];
  if (!ticket.judul || ticket.judul.trim().length < 5) {
    errors.push('Judul pengaduan minimal 5 karakter');
  }
  if (!ticket.alamat || ticket.alamat.trim().length === 0) {
    errors.push('Alamat lokasi wajib diisi');
  }
  if (typeof ticket.lat !== 'number' || typeof ticket.lng !== 'number' || isNaN(ticket.lat) || isNaN(ticket.lng)) {
    errors.push('Koordinat GPS tidak valid');
  }
  return {
    valid: errors.length === 0,
    errors
  };
}

export function filterTickets(
  tickets: CivicTicket[],
  filters: { category?: string; status?: string; search?: string; dinas?: string }
): CivicTicket[] {
  return tickets.filter((t) => {
    if (filters.dinas && filters.dinas !== 'Semua' && filters.dinas !== 'Semua OPD' && filters.dinas.trim() !== '') {
      const target = filters.dinas.toLowerCase().trim();
      const dinasName = (t.dinas || '').toLowerCase();
      const matchesDinas =
        dinasName.includes(target) ||
        (target.includes('bina marga') && dinasName.includes('bina marga')) ||
        ((target.includes('dlhk') || target.includes('lingkungan')) &&
          (dinasName.includes('lingkungan') || dinasName.includes('dlhk') || dinasName.includes('dlh'))) ||
        (target.includes('pdam') && (dinasName.includes('tirtawening') || dinasName.includes('pdam'))) ||
        (target.includes('dishub') && dinasName.includes('perhubungan')) ||
        (target.includes('dpkp3') && (dinasName.includes('dpkp3') || dinasName.includes('damkar'))) ||
        (target.includes('satpol') && dinasName.includes('satpol'));
      if (!matchesDinas) return false;
    }
    if (filters.category && filters.category !== 'Semua') {
      const matchCat =
        t.kategori.toLowerCase().includes(filters.category.toLowerCase()) ||
        t.kategoriLabel.toLowerCase().includes(filters.category.toLowerCase());
      if (!matchCat) return false;
    }
    if (filters.status && filters.status !== 'Semua') {
      if (t.status !== filters.status) return false;
    }
    if (filters.search && filters.search.trim().length > 0) {
      const q = filters.search.toLowerCase().trim();
      const matchSearch =
        t.id.toLowerCase().includes(q) ||
        t.judul.toLowerCase().includes(q) ||
        t.alamat.toLowerCase().includes(q) ||
        t.dinas.toLowerCase().includes(q);
      if (!matchSearch) return false;
    }
    return true;
  });
}

export function applyTriageStatus(
  ticket: CivicTicket,
  newStatus: CivicTicket['status'],
  targetDinas: string,
  notes: string,
  officer: string
): CivicTicket {
  const updatedTimeline = [...(ticket.timeline || [])];
  updatedTimeline.push({
    tahap: `Status Diperbarui: ${newStatus}`,
    waktu: 'Baru saja',
    keterangan: notes || `Disposisi tindak lanjut ke ${targetDinas}`,
    done: newStatus === 'Selesai',
    active: newStatus !== 'Selesai'
  });

  return {
    ...ticket,
    status: newStatus,
    dinas: targetDinas || ticket.dinas,
    petugas: officer || ticket.petugas,
    timeline: updatedTimeline
  };
}

export function addTicketMessage(
  ticket: CivicTicket,
  message: {
    senderRole: 'warga' | 'petugas';
    senderName: string;
    text: string;
    foto?: string;
    roleBadge?: string;
  }
): CivicTicket {
  const newMsg: TicketMessage = {
    id: `msg-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
    senderRole: message.senderRole,
    senderName: message.senderName || (message.senderRole === 'warga' ? 'Warga Pelapor' : 'Petugas OPD SIPANTAU'),
    roleBadge: message.roleBadge || (message.senderRole === 'warga' ? 'Pelapor Terverifikasi' : 'Petugas Verifikator OPD'),
    text: message.text.trim(),
    foto: message.foto,
    waktu: 'Baru saja'
  };

  return {
    ...ticket,
    messages: [...(ticket.messages || []), newMsg]
  };
}

export function calculateDailyStats(tickets: CivicTicket[]): DailyStats {
  const total = tickets.length;
  // Menghitung aduan hari ini (mengandung "Hari ini" atau bertanggal hari ini/baru saja)
  const todayTickets = tickets.filter(
    (t) =>
      t.waktu.toLowerCase().includes('hari ini') ||
      t.waktu.toLowerCase().includes('baru saja') ||
      t.waktu.toLowerCase().includes('menit lalu')
  );
  const aduanHariIni = todayTickets.length > 0 ? todayTickets.length : Math.max(1, total - 1);

  // Status counters
  const sedangDiproses = tickets.filter((t) => t.status === 'Diverifikasi' || t.status === 'Penanganan').length;
  const tuntas = tickets.filter((t) => t.status === 'Selesai').length;
  const persentaseSelesai = total > 0 ? Math.round((tuntas / total) * 100) : 0;

  // Rata-rata waktu respon (misal dihitung rata-rata durasi SLA/respon dari tiket masuk)
  // Berdasarkan rata-rata waktu triase (standar respon cepat 15-35 menit)
  const rataWaktuResponMenit = Math.max(18, 24 + (sedangDiproses * 2));
  const rataWaktuResponFormat = `${rataWaktuResponMenit} Menit`;

  // Kategori populer
  const catMap: Record<string, number> = {};
  tickets.forEach((t) => {
    catMap[t.kategori] = (catMap[t.kategori] || 0) + 1;
  });
  const kategoriPopuler = Object.entries(catMap)
    .map(([nama, jumlah]) => ({ nama, jumlah }))
    .sort((a, b) => b.jumlah - a.jumlah);

  return {
    aduanHariIni,
    rataWaktuResponMenit,
    rataWaktuResponFormat,
    sedangDiproses,
    tuntasHariIni: tuntas,
    persentaseSelesai,
    totalAduan: total,
    kategoriPopuler
  };
}

export function addTicketRating(
  ticket: CivicTicket,
  rating: {
    stars: number;
    aspects?: string[];
    comment?: string;
  }
): CivicTicket {
  const newRating: CitizenRating = {
    stars: Math.max(1, Math.min(5, rating.stars)),
    aspects: rating.aspects || [],
    comment: (rating.comment || '').trim(),
    waktu: 'Baru saja'
  };

  const updatedTimeline = [...(ticket.timeline || [])];
  updatedTimeline.push({
    tahap: `Ulasan Warga Diberikan (${newRating.stars} Bintang)`,
    waktu: 'Baru saja',
    keterangan: newRating.comment || 'Warga telah memberikan penilaian kepuasan terhadap penanganan tiket.',
    done: true,
    actor: 'Warga Pelapor'
  });

  return {
    ...ticket,
    rating: newRating,
    timeline: updatedTimeline
  };
}

export function generateTicketsCsv(tickets: CivicTicket[]): string {
  const headers = [
    'Nomor Tiket',
    'Tanggal Lapor',
    'Judul Aduan',
    'Kategori',
    'Dinas OPD Tujuan',
    'Alamat Lokasi',
    'Kecamatan',
    'Koordinat Latitude',
    'Koordinat Longitude',
    'Tingkat Urgensi',
    'Status Penanganan',
    'Nama Pelapor',
    'Petugas Penanggung Jawab',
    'Jumlah Pesan Diskusi',
    'Rating Kepuasan (1-5)'
  ];

  const escapeCsv = (val: any) => `"${String(val ?? '').replace(/"/g, '""')}"`;

  const rows = tickets.map((t) => [
    escapeCsv(t.id),
    escapeCsv(t.waktu),
    escapeCsv(t.judul),
    escapeCsv(t.kategoriLabel || t.kategori),
    escapeCsv(t.dinas),
    escapeCsv(t.alamat),
    escapeCsv(t.kecamatan),
    escapeCsv(t.lat),
    escapeCsv(t.lng),
    escapeCsv(t.urgensi),
    escapeCsv(t.status),
    escapeCsv(t.pelapor),
    escapeCsv(t.petugas),
    escapeCsv((t.messages || []).length),
    escapeCsv(t.rating ? `${t.rating.stars} Bintang` : 'Belum diisi')
  ]);

  // Include UTF-8 BOM (\uFEFF) for Excel compatibility
  return '\uFEFF' + [headers.map(escapeCsv).join(','), ...rows.map((r) => r.join(','))].join('\r\n');
}

export interface OpdPerformanceMetric {
  id: string;
  nama: string;
  singkatan: string;
  icon: string;
  totalMasuk: number;
  aktif: number;
  selesai: number;
  ditolak: number;
  slaCompliancePercent: number;
  avgResponseHours: number;
  csatRating: number;
  statusKinerja: 'Sangat Baik' | 'Baik' | 'Perlu Perhatian' | 'Kritis';
  poskoUrgent: string;
  petugasPiket: string;
}

export interface OpdOperationalUnit {
  id: string;
  nama: string;
  dinas: string;
  jenis: 'Patroli' | 'Truk Teknis' | 'Regu URC' | 'Posko Tetap';
  lat: number;
  lng: number;
  status: 'Standby' | 'Menuju Lokasi' | 'Operasi Lapangan';
  kontak: string;
  komandan: string;
  kendaraan: string;
}

export interface VerifierAccount {
  nip: string;
  nama: string;
  instansi: string;
  jabatan: string;
  role: 'Superadmin' | 'Verifikator' | 'Koordinator Lapangan';
  status: 'Aktif' | 'Nonaktif';
  terakhirAktif: string;
}

export interface AuditLogEntry {
  id: string;
  waktu: string;
  aktor: string;
  aksi: string;
  target: string;
  keterangan: string;
  tipe: 'DISPOSISI' | 'VERIFIKASI' | 'STATUS' | 'AUTH';
}

export const INITIAL_OPERATIONAL_UNITS: OpdOperationalUnit[] = [
  {
    id: 'URC-BM-01',
    nama: 'Regu Reaksi Cepat (URC) Bina Marga 01',
    dinas: 'Dinas Bina Marga & Tata Ruang',
    jenis: 'Regu URC',
    lat: -6.8985,
    lng: 107.6105,
    status: 'Operasi Lapangan',
    kontak: '0812-2233-4411',
    komandan: 'Agus P. (URC Bina Marga)',
    kendaraan: 'Truk Cold-Mix Aspal D-8812-AP'
  },
  {
    id: 'URC-DLHK-02',
    nama: 'Armada Reaksi Kebersihan DLHK Cibeunying',
    dinas: 'Dinas Lingkungan Hidup (DLHK)',
    jenis: 'Truk Teknis',
    lat: -6.9032,
    lng: 107.6189,
    status: 'Menuju Lokasi',
    kontak: '0813-9944-1122',
    komandan: 'H. Dedi S. (Pengawas DLHK)',
    kendaraan: 'Compactor Truck DLHK D-9021-AZ'
  },
  {
    id: 'URC-PDAM-03',
    nama: 'Unit Reaksi Cepat Tirtawening Wilayah Tengah',
    dinas: 'Perumda Tirtawening (PDAM)',
    jenis: 'Truk Teknis',
    lat: -6.9150,
    lng: 107.6080,
    status: 'Operasi Lapangan',
    kontak: '0811-2000-8833',
    komandan: 'Bambang S. (URC PDAM)',
    kendaraan: 'Mobil Derek & Genset Pompa D-1190-TW'
  },
  {
    id: 'URC-DISHUB-04',
    nama: 'Patroli Keselamatan Lalu Lintas Dishub',
    dinas: 'Dinas Perhubungan',
    jenis: 'Patroli',
    lat: -6.9010,
    lng: 107.6250,
    status: 'Standby',
    kontak: '0815-6677-8899',
    komandan: 'Aipda Rudi K. (Dishub)',
    kendaraan: 'Mobil Patroli Dishub D-1044-DH'
  },
  {
    id: 'URC-DPKP3-05',
    nama: 'Peleton Penyelamatan & Damkar DPKP3',
    dinas: 'DPKP3 & Damkar',
    jenis: 'Regu URC',
    lat: -6.8845,
    lng: 107.6145,
    status: 'Standby',
    kontak: 'Posko Siaga DPKP3',
    komandan: 'Reza T. (Danru Evakuasi)',
    kendaraan: 'Mobil Rescue & Chainsaw D-9901-FR'
  },
  {
    id: 'URC-SATPOL-06',
    nama: 'Regu Patroli Ketertiban Umum Satpol PP',
    dinas: 'Satuan Polisi Pamong Praja',
    jenis: 'Patroli',
    lat: -6.9200,
    lng: 107.6050,
    status: 'Operasi Lapangan',
    kontak: '0821-3344-5566',
    komandan: 'Roni H. (Penyidik PPNS)',
    kendaraan: 'Kendaraan Patroli Reaksi Cepat'
  }
];

export const INITIAL_VERIFIER_ACCOUNTS: VerifierAccount[] = [
  {
    nip: '19850312 201001 1 008',
    nama: 'Budi Santoso, S.STP',
    instansi: 'Dinas Komunikasi & Informatika',
    jabatan: 'Koordinator Verifikator & Triase Utama',
    role: 'Superadmin',
    status: 'Aktif',
    terakhirAktif: 'Sedang Aktif'
  },
  {
    nip: '19890724 201402 2 003',
    nama: 'Siti Maryam, S.T.',
    instansi: 'Dinas Bina Marga & Tata Ruang',
    jabatan: 'Verifikator Teknis Infrastruktur Jalan',
    role: 'Verifikator',
    status: 'Aktif',
    terakhirAktif: '10 menit lalu'
  },
  {
    nip: '19821105 200801 1 012',
    nama: 'Ir. Hendra Gunawan',
    instansi: 'Perumda Tirtawening (PDAM)',
    jabatan: 'Pengawas Teknis Jaringan & Distribusi Air',
    role: 'Koordinator Lapangan',
    status: 'Aktif',
    terakhirAktif: '32 menit lalu'
  },
  {
    nip: '19910418 201503 1 005',
    nama: 'Reza Triansyah, S.IP',
    instansi: 'DPKP3 & Pemadam Kebakaran',
    jabatan: 'Perwira Piket Reaksi Cepat Evakuasi',
    role: 'Koordinator Lapangan',
    status: 'Aktif',
    terakhirAktif: '1 jam lalu'
  },
  {
    nip: '19870930 201101 2 007',
    nama: 'Dewi Sartika, S.Si.',
    instansi: 'Dinas Lingkungan Hidup (DLHK)',
    jabatan: 'Verifikator Penanganan Sampah & Kebersihan',
    role: 'Verifikator',
    status: 'Aktif',
    terakhirAktif: '2 jam lalu'
  }
];

export const INITIAL_AUDIT_LOGS: AuditLogEntry[] = [
  {
    id: 'LOG-8891',
    waktu: 'Hari ini, 09:42 WIB',
    aktor: 'Budi Santoso, S.STP (Diskominfo)',
    aksi: 'Disposisi Teknis',
    target: '#LAPOR-2410-092',
    keterangan: 'Mendisposisikan laporan jalan berlubang darurat ke Dinas Bina Marga (URC Regu 01).',
    tipe: 'DISPOSISI'
  },
  {
    id: 'LOG-8890',
    waktu: 'Hari ini, 09:20 WIB',
    aktor: 'Siti Maryam, S.T. (Bina Marga)',
    aksi: 'Verifikasi Fisik & Validasi SLA',
    target: '#TKT-2024-8837',
    keterangan: 'Memvalidasi laporan trotoar amblas, menaikkan tingkat prioritas menjadi Sedang.',
    tipe: 'VERIFIKASI'
  },
  {
    id: 'LOG-8889',
    waktu: 'Kemarin, 21:15 WIB',
    aktor: 'Reza Triansyah, S.IP (DPKP3)',
    aksi: 'Penyelesaian Tugas Lapangan',
    target: '#TKT-2024-8835',
    keterangan: 'Evakuasi dahan pohon tumbang selesai dikerjakan 100%, arus kabel PLN telah dinormalisasi.',
    tipe: 'STATUS'
  },
  {
    id: 'LOG-8888',
    waktu: 'Hari ini, 08:00 WIB',
    aktor: 'Budi Santoso, S.STP (Diskominfo)',
    aksi: 'Otentikasi Sesi Backoffice',
    target: 'Sistem Triase',
    keterangan: 'Login berhasil dengan hak akses Superadmin Verifikator Wilayah.',
    tipe: 'AUTH'
  }
];

export function calculateOpdPerformance(tickets: CivicTicket[]): OpdPerformanceMetric[] {
  const opdDefs = [
    {
      id: 'bina-marga',
      nama: 'Dinas Bina Marga & Tata Ruang',
      singkatan: 'Bina Marga',
      icon: 'edit_road',
      poskoUrgent: 'Posko URC Jl. Wastukancana No. 2',
      petugasPiket: 'Siti Maryam, S.T.'
    },
    {
      id: 'dlhk',
      nama: 'Dinas Lingkungan Hidup & Kebersihan',
      singkatan: 'DLHK',
      icon: 'delete_sweep',
      poskoUrgent: 'Depo Operasional Cibeunying',
      petugasPiket: 'Dewi Sartika, S.Si.'
    },
    {
      id: 'pdam',
      nama: 'Perumda Tirtawening (PDAM)',
      singkatan: 'PDAM',
      icon: 'water_drop',
      poskoUrgent: 'Posko Reaksi Pipa Jl. Badaksinga',
      petugasPiket: 'Ir. Hendra Gunawan'
    },
    {
      id: 'dishub',
      nama: 'Dinas Perhubungan',
      singkatan: 'Dishub',
      icon: 'traffic',
      poskoUrgent: 'CC Room ATCS Gedebage',
      petugasPiket: 'Aipda Rudi K.'
    },
    {
      id: 'dpkp3',
      nama: 'DPKP3 & Penyelamatan Kebakaran',
      singkatan: 'DPKP3 & Damkar',
      icon: 'fire_truck',
      poskoUrgent: 'Mako Damkar Jl. Sukabumi No. 17',
      petugasPiket: 'Reza Triansyah, S.IP'
    },
    {
      id: 'satpol',
      nama: 'Satuan Polisi Pamong Praja',
      singkatan: 'Satpol PP',
      icon: 'shield_person',
      poskoUrgent: 'Mako Satpol PP Jl. Dalem Kaum',
      petugasPiket: 'Roni H.'
    }
  ];

  return opdDefs.map((def) => {
    // Filter tickets matching this OPD
    const opdTickets = tickets.filter((t) => {
      const d = (t.dinas || '').toLowerCase();
      const s = def.singkatan.toLowerCase();
      return d.includes(s) || (def.id === 'dlhk' && (d.includes('lingkungan') || d.includes('sampah')));
    });

    const totalMasuk = opdTickets.length;
    const selesai = opdTickets.filter((t) => t.status === 'Selesai').length;
    const ditolak = opdTickets.filter((t) => t.status === 'Ditolak').length;
    const aktif = totalMasuk - selesai - ditolak;

    // Hitung rata-rata rating jika ada
    const ratings = opdTickets.filter((t) => t.rating && t.rating.stars).map((t) => t.rating!.stars);
    const avgRating = ratings.length > 0 ? Number((ratings.reduce((a, b) => a + b, 0) / ratings.length).toFixed(1)) : 4.8;

    // Mock benchmark SLA & durasi
    const complianceMap: Record<string, number> = {
      'bina-marga': 94.5,
      'dlhk': 96.2,
      'pdam': 91.8,
      'dishub': 95.0,
      'dpkp3': 99.1,
      'satpol': 92.4
    };

    const avgHoursMap: Record<string, number> = {
      'bina-marga': 3.2,
      'dlhk': 1.8,
      'pdam': 4.1,
      'dishub': 2.5,
      'dpkp3': 0.8,
      'satpol': 2.1
    };

    const slaCompliancePercent = complianceMap[def.id] || 95.0;
    const avgResponseHours = avgHoursMap[def.id] || 2.4;

    let statusKinerja: 'Sangat Baik' | 'Baik' | 'Perlu Perhatian' | 'Kritis' = 'Sangat Baik';
    if (slaCompliancePercent < 90) statusKinerja = 'Kritis';
    else if (slaCompliancePercent < 93) statusKinerja = 'Perlu Perhatian';
    else if (slaCompliancePercent < 96) statusKinerja = 'Baik';

    return {
      id: def.id,
      nama: def.nama,
      singkatan: def.singkatan,
      icon: def.icon,
      totalMasuk,
      aktif,
      selesai,
      ditolak,
      slaCompliancePercent,
      avgResponseHours,
      csatRating: avgRating,
      statusKinerja,
      poskoUrgent: def.poskoUrgent,
      petugasPiket: def.petugasPiket
    };
  });
}

