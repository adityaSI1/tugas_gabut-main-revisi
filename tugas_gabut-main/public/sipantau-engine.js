/**
 * SIPANTAU - CORE INTERACTIVE & GIS API ENGINE
 * Sesuai Spesifikasi DESIGN.md Stitch (Primary Crimson #C8102E / #9E001F, Plus Jakarta Sans & Inter)
 */
(function () {
  const DB_KEY = 'SIPANTAU_CIVIC_DB_V2';

  // 1. PANGKALAN DATA TIKET TERPADU (Diselaraskan dengan semua halaman Stitch)
  const initialTickets = [
    {
      id: '#LAPOR-2410-092',
      code: 'LAPOR-2410-092',
      judul: 'Jalan Rusak & Berlubang Dalam',
      kategori: 'Jalan Rusak',
      kategoriLabel: 'Infrastruktur Jalan & Jembatan',
      dinas: 'Dinas Bina Marga & Tata Ruang',
      alamat: 'Jl. Ir. H. Juanda No. 84, Dago, Kec. Coblong',
      kecamatan: 'Kec. Coblong',
      waktu: '24 Okt 2024, 09:15 WIB',
      sla: 'SLA 4j 10m',
      urgensi: 'Tinggi',
      triaseLevel: 'Triase Level 1',
      status: 'Diverifikasi',
      upvotes: 34,
      lat: -6.890451,
      lng: 107.612824,
      pelapor: 'Warga Terverifikasi (Anonim)',
      nik: '3273**********0019',
      telepon: '+62 813-****-8821',
      deskripsi: 'Aspal jalan utama berlubang sedalam 20 cm dengan diameter hampir 1 meter di lajur kiri arah Dago Atas. Sangat membahayakan pengendara roda dua terutama saat malam hari dan ketika hujan.',
      foto: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDF8T8kAUNM-_2HbGnXu8uBKMJ2muGoOIIVwsW-LJXlvjeUyggI0kmrcFyCrJjw5DGqCVi2YjGD6kjq4_gY3-wkkU7CUJuk3ewvRC13mHt8lJyLnqVDv-klbEXOR1R1qkaKxAKpJP1LKp9Pib0NfqapWtlBZyChM_CTjE5aay9TegQ8LnoxrCAjItLPcfcuLGBXQVWqAm4o_HFnPV0BLEExLo7eqWfAbvwqq5KEy88',
      petugas: 'Siti M. (Verifikator)',
      timeline: [
        { tahap: 'Laporan Diajukan Warga', waktu: '24 Okt 2024, 09:15 WIB', keterangan: 'Tiket diterima dengan lampiran foto terverifikasi EXIF & koordinat GPS.', done: true },
        { tahap: 'Verifikasi Administrasi & Geotag', waktu: '24 Okt 2024, 10:02 WIB', keterangan: 'Diverifikasi oleh Tim Triase Diskominfo. Diteruskan ke Dinas Bina Marga & Tata Ruang.', done: true },
        { tahap: 'Penanganan Regu Teknis OPD', waktu: 'Dalam Antrean URC', keterangan: 'Unit Reaksi Cepat (URC) sedang dijadwalkan menuju titik lokasi.', active: true },
        { tahap: 'Selesai & Evaluasi Publik', waktu: '-', keterangan: 'Menunggu unggahan bukti perbaikan fisik di lapangan.', done: false }
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
      pelapor: 'Hendra Wijaya (Samaran)',
      nik: '3273**********0002',
      telepon: '+62 812-****-4912',
      deskripsi: 'Pipa distribusi utama di tepi trotoar Jl. Asia Afrika mengalami kebocoran bertekanan tinggi sejak pukul 06.30 WIB sehingga menimbulkan genangan sepanjang 40 meter dan menghambat laju kendaraan.',
      foto: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC6T-WUgAKxq9637CuiGiiGnvSw03V7nLj84xlZeAoGZx7Ln4IGTqM8uCtEaHv7MG7q5-UJLJiCjXlzQjePNqksgDR7Tr2435XoxUESCIwufa-ysKB7GJk6wmncq5uJrOcYLAfCwco80skBpE2NV-PZibqiTy8IJcmLFNzQE1TJkT6XhMcWJEjyGh82kZO6dlFX-_GeezA7qpQB5JGb7iKjo8JPtHEkdqyzDMNAXVc',
      petugas: 'Budi S. (Review)',
      timeline: [
        { tahap: 'Laporan Diajukan Warga', waktu: 'Hari ini, 08:14 WIB', keterangan: 'Laporan masuk melalui portal warga dengan tingkat urgensi tinggi.', done: true },
        { tahap: 'Verifikasi & Disposisi Petugas', waktu: 'Sedang Ditinjau', keterangan: 'Menunggu persetujuan disposisi dari Tim Verifikator Diskominfo.', active: true },
        { tahap: 'Penanganan Regu Teknis OPD', waktu: '-', keterangan: 'Menunggu disposisi ke Perumda Tirtawening (PDAM).', done: false },
        { tahap: 'Selesai & Evaluasi Publik', waktu: '-', keterangan: 'Menunggu penyelesaian perbaikan.', done: false }
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
      pelapor: 'Rina Kartika (Samaran)',
      nik: '3273**********0108',
      telepon: '+62 857-****-3310',
      deskripsi: 'Lampu merah (APILL) di persimpangan utama Simpang Lima mati total dari keempat arah sejak pagi hari, menyebabkan penumpukan kendaraan pada jam berangkat kerja.',
      foto: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDIXjEZj079G_YJOL8tGEFoKfP2jeHXvknJi6Tb_ReagnYUucEcO91ow95UQvb4v4eDZSa7FLA8rjbn0BEHC49kPGWTaMimdCdCK9MlCWkSoRktv0tQa7UjJ-6nQFNSXb_AN5uE9jXUche8zcj04iSe9kWYxScBvBYYA_pJc9nIxW4O9XOuEmTK88QXMXSYRUVzdx-YKKmN3sIPISmegkdgaL-LYOmpUxfZ5LQGrwY',
      petugas: 'Siti M. (Disposisi)',
      timeline: [
        { tahap: 'Laporan Diajukan Warga', waktu: 'Hari ini, 07:45 WIB', keterangan: 'Laporan diterima beserta titik koordinat persimpangan.', done: true },
        { tahap: 'Verifikasi & Disposisi', waktu: 'Hari ini, 08:05 WIB', keterangan: 'Disposisi prioritas diteruskan ke Dinas Perhubungan.', done: true },
        { tahap: 'Penanganan Regu Teknis Dishub', waktu: 'Hari ini, 08:40 WIB', keterangan: 'Tim teknisi ATCS Dishub sedang memperbaiki panel kontrol di lokasi.', active: true },
        { tahap: 'Selesai & Evaluasi Publik', waktu: '-', keterangan: 'Menunggu pengetesan akhir.', done: false }
      ]
    },
    {
      id: '#TKT-2024-8839',
      code: 'TKT-2024-8839',
      judul: 'Tumpukan Sampah Liar Menutupi Trotoar Pejalan Kaki',
      kategori: 'Sampah & Kebersihan',
      kategoriLabel: 'Kebersihan Kota',
      dinas: 'Dinas Lingkungan Hidup',
      alamat: 'Jl. Cihampelas No. 45, Coblong',
      kecamatan: 'Kec. Coblong',
      waktu: 'Hari ini, 06:30 WIB',
      sla: 'SLA 4j 30m',
      urgensi: 'Sedang',
      triaseLevel: 'Triase Level 3',
      status: 'Diajukan',
      upvotes: 27,
      lat: -6.8962,
      lng: 107.6042,
      pelapor: 'Ahmad Fauzi (Samaran)',
      nik: '3273**********0074',
      telepon: '+62 811-****-2094',
      deskripsi: 'Kantong sampah rumah tangga dan limbah pasar tumpah ruah hingga menutup akses jalan kaki di trotoar Cihampelas serta menimbulkan bau menyengat.',
      foto: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBYcl8qXvsQKNHmSwcA-yOd9qNEygI-ZBuuFQAoww4OiakpRjZz5tOv28LARoBAO7PeU9j1PR5aoz-C8_wQH5CS26f1IWdqqHaedVvA6tR-6wFFRome49AeXfI59_TjJyaqkWIGSe65lf6PZ6TDY0o2DyD0TJ7cjsnLAVf2hQI3dfGp8Y0HXIFLBXpVeHgc6Fzmw40lgOPae_rfoTTpDNgLThWUj5Ue36DgtUwyndk',
      petugas: 'Belum Ditugaskan',
      timeline: [
        { tahap: 'Laporan Diajukan Warga', waktu: 'Hari ini, 06:30 WIB', keterangan: 'Bukti foto terunggah dengan validasi geotagging.', done: true },
        { tahap: 'Verifikasi & Disposisi', waktu: 'Menunggu', keterangan: 'Dalam antrean verifikasi petugas.', active: true },
        { tahap: 'Penanganan Armada DLH', waktu: '-', keterangan: 'Menunggu pengiriman truk angkut DLH.', done: false },
        { tahap: 'Selesai & Evaluasi Publik', waktu: '-', keterangan: '-', done: false }
      ]
    },
    {
      id: '#TKT-2024-8837',
      code: 'TKT-2024-8837',
      judul: 'Lubang Jalan Sedalam 15cm Membahayakan Pengendara Roda Dua',
      kategori: 'Jalan Rusak',
      kategoriLabel: 'Jalan Rusak',
      dinas: 'Dinas Bina Marga',
      alamat: 'Jl. Soekarno Hatta KM 9, Rancasari',
      kecamatan: 'Kec. Rancasari',
      waktu: 'Kemarin, 21:10 WIB',
      sla: 'SLA Terpenuhi',
      urgensi: 'Sedang',
      triaseLevel: 'Triase Level 2',
      status: 'Diverifikasi',
      upvotes: 41,
      lat: -6.9435,
      lng: 107.6641,
      pelapor: 'Dedi Kurniawan (Samaran)',
      nik: '3273**********0055',
      telepon: '+62 821-****-9981',
      deskripsi: 'Terdapat tiga titik lubang berurutan di lajur cepat Jl. Soekarno Hatta KM 9 yang kerap memicu ban pecah pada malam hari.',
      foto: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDXFtctiQnd0l14H2wCi6K9MmziM4DTy1eGwBr2eOOO8Kf_8WSnqilI8xcQxzFEKrSCxDqPMn0QurjtCvA6E80nodixlstwvq_5Dn0Gml8r9-qyYbMfXc5bxYaRAcLl3XEjIjlwW7FRai1AJ1aZjmBHNGuLoo6-8n7iI-BS2fqeEfqFzSSFm94WwK9R-etaGrIDvbvPBuoYFggoVt0M3BOrr_Mc04p88EETPEmphj8',
      petugas: 'Agus P. (Inspeksi)',
      timeline: [
        { tahap: 'Laporan Diajukan Warga', waktu: 'Kemarin, 21:10 WIB', keterangan: 'Laporan diterima sistem.', done: true },
        { tahap: 'Verifikasi & Disposisi', waktu: 'Kemarin, 22:00 WIB', keterangan: 'Diverifikasi dan diteruskan ke Dinas Bina Marga.', done: true },
        { tahap: 'Survei Lapangan & Penambalan', waktu: 'Hari ini, 09:00 WIB', keterangan: 'Tim inspeksi sedang melakukan pengukuran titik tambal hotmix.', active: true },
        { tahap: 'Selesai & Evaluasi Publik', waktu: '-', keterangan: '-', done: false }
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
      deskripsi: 'Cabang pohon angsana besar patah pasca angin kencang dan menggantung di atas kabel jaringan listrik serta menutup separuh badan jalan.',
      foto: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCil4z9SpRUrlwHnCA5NfQg7RN5p3J1xxMHFjTRc8YTq6CqHQogFFMGY2GZc5HxeldEvUD86jrhqUjTxBTtViBWur2SpVFMQuoYWfz5LcHjIuFx4tv39S9IILxZ7QPYiRtABW1it3_0Qi1yiNccxLgmLo_wWx2i6Gj_OEI6e5VgLo7ZbG2ev5wljBwyzqi2esjHS0vT4-gNhD8ITvj6kQztHvTaMk6_gtOAMA9cwXA',
      petugas: 'Reza T. (Evakuasi)',
      timeline: [
        { tahap: 'Laporan Diajukan Warga', waktu: 'Kemarin, 19:40 WIB', keterangan: 'Laporan darurat diterima.', done: true },
        { tahap: 'Verifikasi Cepat', waktu: 'Kemarin, 19:48 WIB', keterangan: 'Disposisi darurat ke DPKP3 & Damkar.', done: true },
        { tahap: 'Pemangkasan & Evakuasi', waktu: 'Kemarin, 20:30 WIB', keterangan: 'Pohon berhasil dievakuasi bersama petugas PLN.', done: true },
        { tahap: 'Selesai Ditangani', waktu: 'Kemarin, 22:15 WIB', keterangan: 'Jalan kembali normal dan aman dilalui.', done: true }
      ]
    }
  ];

  function getTickets() {
    try {
      const raw = localStorage.getItem(DB_KEY);
      let list = initialTickets;
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed) && parsed.length > 0) list = parsed;
      }
      let changed = false;
      list.forEach((t) => {
        if (!Array.isArray(t.messages)) {
          const matchInit = initialTickets.find((initT) => initT.id === t.id);
          t.messages = matchInit && matchInit.messages ? [...matchInit.messages] : [];
          changed = true;
        }
      });
      if (changed || !raw) {
        localStorage.setItem(DB_KEY, JSON.stringify(list));
      }
      return list;
    } catch (e) {
      return initialTickets;
    }
  }

  function saveTickets(list) {
    try {
      localStorage.setItem(DB_KEY, JSON.stringify(list));
      window.dispatchEvent(new CustomEvent('sipantau:db-updated'));
    } catch (e) {}
  }

  // SiPantauDB API - Menghubungkan semua halaman dan aksi verifikasi petugas
  const SiPantauDB = {
    getTickets,
    saveTickets,
    resetDB() {
      localStorage.setItem(DB_KEY, JSON.stringify(initialTickets));
      window.dispatchEvent(new CustomEvent('sipantau:db-updated'));
      return initialTickets;
    },
    updateStatus(ticketId, newStatus, dinas, note, officer) {
      const list = getTickets();
      const cleanId = (ticketId || '').trim().toUpperCase();
      const ticket = list.find(
        (t) => t.id.toUpperCase() === cleanId || t.code.toUpperCase() === cleanId.replace('#', '')
      );
      if (ticket) {
        ticket.status = newStatus;
        if (dinas) ticket.dinas = dinas;
        if (officer) ticket.petugas = officer;
        if (!ticket.timeline) ticket.timeline = [];
        ticket.timeline.push({
          tahap: `Status Diperbarui: ${newStatus}`,
          waktu: 'Baru saja',
          keterangan: note || `Disposisi tindak lanjut ke ${dinas || ticket.dinas}`,
          done: newStatus === 'Selesai',
          active: newStatus !== 'Selesai'
        });
        saveTickets(list);
        return ticket;
      }
      return null;
    },
    addMessage(ticketId, msg) {
      const list = getTickets();
      const cleanId = (ticketId || '').trim().toUpperCase();
      const ticket = list.find(
        (t) => t.id.toUpperCase() === cleanId || t.code.toUpperCase() === cleanId.replace('#', '')
      );
      if (ticket) {
        if (!ticket.messages) ticket.messages = [];
        const newMsg = {
          id: 'msg-' + Date.now() + '-' + Math.random().toString(36).substr(2, 4),
          senderRole: msg.senderRole || 'warga',
          senderName: msg.senderName || (msg.senderRole === 'warga' ? 'Budi Pratama (Warga)' : 'Siti M. (Petugas OPD)'),
          roleBadge: msg.roleBadge || (msg.senderRole === 'warga' ? 'Pelapor Terverifikasi' : 'Petugas Verifikator OPD'),
          text: (msg.text || '').trim(),
          foto: msg.foto || null,
          waktu: 'Baru saja'
        };
        ticket.messages.push(newMsg);
        saveTickets(list);
        return newMsg;
      }
      return null;
    },
    saveRating(ticketId, rating) {
      const list = getTickets();
      const cleanId = (ticketId || '').trim().toUpperCase();
      const ticket = list.find(
        (t) => t.id.toUpperCase() === cleanId || t.code.toUpperCase() === cleanId.replace('#', '')
      );
      if (ticket) {
        ticket.rating = {
          stars: Math.max(1, Math.min(5, rating.stars || 5)),
          aspects: rating.aspects || [],
          comment: (rating.comment || '').trim(),
          waktu: 'Baru saja'
        };
        if (!ticket.timeline) ticket.timeline = [];
        ticket.timeline.push({
          tahap: `Ulasan Warga Diberikan (${ticket.rating.stars} Bintang)`,
          waktu: 'Baru saja',
          keterangan: ticket.rating.comment || 'Warga telah memberikan penilaian kepuasan terhadap penanganan tiket.',
          done: true
        });
        saveTickets(list);
        return ticket;
      }
      return null;
    },
    getDailyStats() {
      const tickets = getTickets();
      const total = tickets.length;
      const todayTickets = tickets.filter(
        (t) =>
          (t.waktu || '').toLowerCase().includes('hari ini') ||
          (t.waktu || '').toLowerCase().includes('baru saja') ||
          (t.waktu || '').toLowerCase().includes('menit lalu')
      );
      const aduanHariIni = todayTickets.length > 0 ? todayTickets.length : Math.max(1, total - 1);
      const sedangDiproses = tickets.filter((t) => t.status === 'Diverifikasi' || t.status === 'Penanganan').length;
      const tuntas = tickets.filter((t) => t.status === 'Selesai').length;
      const persentaseSelesai = total > 0 ? Math.round((tuntas / total) * 100) : 0;
      const rataWaktuResponMenit = Math.max(18, 24 + sedangDiproses * 2);
      const rataWaktuResponFormat = `${rataWaktuResponMenit} Menit`;

      const catMap = {};
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
  };
  window.SiPantauDB = SiPantauDB;

  // 2. TOAST NOTIFICATION SESUAI TEMA STITCH (#9E001F / #C8102E)
  function showToast(message, type = 'primary') {
    let wrap = document.getElementById('sipantau-toast-wrap');
    if (!wrap) {
      wrap = document.createElement('div');
      wrap.id = 'sipantau-toast-wrap';
      wrap.className = 'fixed bottom-16 right-5 z-[9999] flex flex-col gap-2.5 max-w-md pointer-events-none';
      document.body.appendChild(wrap);
    }
    const styles = {
      primary: 'bg-[#9e001f] text-white border-[#ffdad8]/30',
      success: 'bg-[#16A34A] text-white border-emerald-300/30',
      warning: 'bg-[#9a5200] text-white border-amber-300/30',
      info: 'bg-[#1b1b1f] text-white border-white/20'
    };
    const icons = { primary: 'campaign', success: 'check_circle', warning: 'warning', info: 'info' };

    const el = document.createElement('div');
    el.className = `pointer-events-auto flex items-center gap-3 px-4 py-3 rounded-xl shadow-2xl border ${styles[type] || styles.primary} transition-all duration-300 opacity-0 translate-y-2`;
    el.innerHTML = `
      <span class="material-symbols-outlined text-[20px]">${icons[type] || 'info'}</span>
      <div class="text-xs font-medium leading-relaxed flex-1" style="font-family:'Inter',sans-serif;">${message}</div>
    `;
    wrap.appendChild(el);
    requestAnimationFrame(() => el.classList.remove('opacity-0', 'translate-y-2'));
    setTimeout(() => {
      el.classList.add('opacity-0', 'translate-y-2');
      setTimeout(() => el.remove(), 300);
    }, 3600);
  }
  window.showCivicToast = showToast;

  // 3. PEMUAT LEAFLET MAPS API & NOMINATIM GEOCODING API
  function ensureLeaflet(cb) {
    if (window.L) return cb();
    const css = document.createElement('link');
    css.rel = 'stylesheet';
    css.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
    document.head.appendChild(css);

    const js = document.createElement('script');
    js.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
    js.onload = cb;
    document.head.appendChild(js);
  }

  async function reverseGeocode(lat, lng) {
    try {
      const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=18&addressdetails=1`, {
        headers: { 'Accept-Language': 'id' }
      });
      const data = await res.json();
      return data.display_name || `Koordinat (${lat.toFixed(6)}, ${lng.toFixed(6)})`;
    } catch (e) {
      return `Jl. Lokasi Terpilih (${lat.toFixed(6)}, ${lng.toFixed(6)})`;
    }
  }

  // Kamus Cepat Landmark & Wilayah Kota Bandung (Pencarian Instan + Offline Fallback)
  const BANDUNG_LANDMARKS = [
    { name: 'Gedung Sate, Jl. Diponegoro No. 22, Citarum, Kec. Bandung Wetan, Kota Bandung', lat: -6.902476, lng: 107.618649, keywords: ['gedung sate', 'diponegoro', 'citarum', 'bandung wetan'] },
    { name: 'Alun-Alun Bandung, Jl. Asia Afrika, Balonggede, Kec. Regol, Kota Bandung', lat: -6.921852, lng: 107.606889, keywords: ['alun alun', 'alun-alun', 'asia afrika', 'regol', 'masjid agung'] },
    { name: 'Jl. Braga, Kec. Sumur Bandung, Kota Bandung', lat: -6.917464, lng: 107.609596, keywords: ['braga', 'sumur bandung'] },
    { name: 'Dago (Jl. Ir. H. Djuanda), Kec. Coblong, Kota Bandung', lat: -6.885021, lng: 107.613612, keywords: ['dago', 'ir h djuanda', 'juanda', 'coblong'] },
    { name: 'Jl. Sukajadi No. 174, Kel. Pasteur, Kec. Sukajadi, Kota Bandung', lat: -6.890451, lng: 107.597824, keywords: ['sukajadi', 'pasteur', 'puskesmas sukajadi'] },
    { name: 'Jl. Dr. Djunjunan (Pasteur), Kec. Sukajadi, Kota Bandung', lat: -6.896701, lng: 107.592110, keywords: ['djunjunan', 'tol pasteur', 'gerbang tol pasteur'] },
    { name: 'Jl. Cihampelas, Kec. Coblong, Kota Bandung (Ciwalk)', lat: -6.893812, lng: 107.604123, keywords: ['cihampelas', 'ciwalk'] },
    { name: 'Lapangan Gasibu, Jl. Diponegoro, Kec. Bandung Wetan, Kota Bandung', lat: -6.900215, lng: 107.618911, keywords: ['gasibu', 'monumen perjuangan'] },
    { name: 'Jl. Buah Batu, Kec. Lengkong, Kota Bandung', lat: -6.945012, lng: 107.633012, keywords: ['buah batu', 'buahbatu', 'lengkong'] },
    { name: 'Kecamatan Antapani, Kota Bandung', lat: -6.915032, lng: 107.662045, keywords: ['antapani'] },
    { name: 'Stasiun Kiaracondong, Kec. Kiaracondong, Kota Bandung', lat: -6.924012, lng: 107.647012, keywords: ['kiaracondong', 'kircon'] },
    { name: 'Jl. Cibaduyut Raya, Kec. Bojongloa Kidul, Kota Bandung', lat: -6.953045, lng: 107.593012, keywords: ['cibaduyut', 'bojongloa'] },
    { name: 'Kecamatan Gedebage (Stadion GBLA / Al Jabbar), Kota Bandung', lat: -6.942012, lng: 107.689012, keywords: ['gedebage', 'gbla', 'al jabbar'] },
    { name: 'Stasiun Hall Bandung, Kebon Jeruk, Kec. Andir, Kota Bandung', lat: -6.914210, lng: 107.602510, keywords: ['stasiun bandung', 'stasiun hall', 'kebon jeruk', 'andir'] },
    { name: 'Jl. Merdeka (Balai Kota Bandung / BIP), Kec. Sumur Bandung', lat: -6.911245, lng: 107.609871, keywords: ['merdeka', 'balai kota', 'bip'] },
    { name: 'Institut Teknologi Bandung (ITB), Jl. Ganesha No. 10, Coblong', lat: -6.891480, lng: 107.610659, keywords: ['itb', 'ganesha'] },
    { name: 'Universitas Padjadjaran (Unpad) Dipatiukur, Coblong', lat: -6.893012, lng: 107.617812, keywords: ['unpad', 'dipatiukur', 'du'] },
    { name: 'Jl. Soekarno Hatta KM 9, Kec. Rancasari, Kota Bandung', lat: -6.938712, lng: 107.658912, keywords: ['soekarno hatta', 'rancasari', 'bypass'] },
    { name: 'Jl. Riau (Jl. L.L.R.E. Martadinata), Citarum, Kec. Bandung Wetan', lat: -6.908234, lng: 107.617123, keywords: ['riau', 'martadinata'] }
  ];

  async function forwardGeocode(query) {
    if (!query || !query.trim()) return null;
    const q = query.trim();
    const qLower = q.toLowerCase();

    // 1. Cek kamus lokal landmark Bandung secara instan
    const matched = BANDUNG_LANDMARKS.find((lm) =>
      lm.keywords.some((k) => qLower.includes(k)) || lm.name.toLowerCase().includes(qLower)
    );
    if (matched) {
      return { lat: matched.lat, lng: matched.lng, name: matched.name };
    }

    // 2. Query Nominatim OpenStreetMap (Prioritas Bandung)
    try {
      const searchQuery = qLower.includes('bandung') ? q : `${q}, Kota Bandung, Jawa Barat`;
      const res = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(searchQuery)}&limit=1`, {
        headers: { 'Accept-Language': 'id' }
      });
      const data = await res.json();
      if (data && data.length > 0) {
        return { lat: parseFloat(data[0].lat), lng: parseFloat(data[0].lon), name: data[0].display_name };
      }
      // Fallback tanpa penambahan Kota Bandung jika tidak ada hasil
      const fallbackRes = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(q + ', Indonesia')}&limit=1`, {
        headers: { 'Accept-Language': 'id' }
      });
      const fallbackData = await fallbackRes.json();
      if (fallbackData && fallbackData.length > 0) {
        return { lat: parseFloat(fallbackData[0].lat), lng: parseFloat(fallbackData[0].lon), name: fallbackData[0].display_name };
      }
    } catch (e) {
      console.warn('Geocoding network error:', e);
    }
    return null;
  }

  function createCivicPin(status, isSelected = false) {
    const colorMap = {
      Diajukan: '#BA1A1A',
      Diverifikasi: '#9A5200',
      Penanganan: '#316BF3',
      Selesai: '#16A34A',
      Ditolak: '#4B5563'
    };
    const iconMap = {
      Diajukan: 'water_damage',
      Diverifikasi: 'remove_road',
      Penanganan: 'engineering',
      Selesai: 'check',
      Ditolak: 'cancel'
    };
    const bg = colorMap[status] || '#C8102E';
    const ic = iconMap[status] || 'location_on';
    const size = isSelected ? 40 : 34;

    return window.L.divIcon({
      className: 'sipantau-leaflet-pin',
      html: `
        <div style="position:relative;display:flex;flex-direction:column;align-items:center;">
          ${isSelected ? `<span style="position:absolute;top:-4px;left:-4px;width:${size + 8}px;height:${size + 8}px;border-radius:9999px;background:${bg}44;animation:ping 1.5s cubic-bezier(0,0,0.2,1) infinite;"></span>` : ''}
          <div style="width:${size}px;height:${size}px;border-radius:9999px;background:${bg};border:2.5px solid #fff;box-shadow:0 6px 16px rgba(0,0,0,0.28);display:flex;align-items:center;justify-content:center;color:#fff;z-index:2;">
            <span class="material-symbols-outlined" style="font-size:${isSelected ? 20 : 16}px;">${ic}</span>
          </div>
          <div style="width:10px;height:10px;background:${bg};transform:rotate(45deg);margin-top:-6px;z-index:1;"></div>
        </div>
      `,
      iconSize: [size, size + 8],
      iconAnchor: [size / 2, size + 6]
    });
  }

  // 3B. KOMPRESI GAMBAR OTOMATIS BERBASIS HTML5 CANVAS (Mencegah QuotaExceededError di LocalStorage)
  function compressImage(file, maxWidth = 1000, quality = 0.72) {
    return new Promise((resolve) => {
      if (!file || !(file instanceof Blob)) return resolve(null);
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
          if (!ctx) return resolve(e.target.result);
          ctx.drawImage(img, 0, 0, width, height);
          resolve(canvas.toDataURL('image/jpeg', quality));
        };
        img.onerror = () => resolve(e.target.result);
        img.src = e.target.result;
      };
      reader.onerror = () => resolve(null);
      reader.readAsDataURL(file);
    });
  }
  window.compressCivicImage = compressImage;

  // 3C. CETAK BUKTI TANDA TERIMA LAPORAN RESMI BER-QR CODE
  function openPrintableReceipt(ticket) {
    if (!ticket) return;
    let modal = document.getElementById('sipantau-printable-receipt-modal');
    if (!modal) {
      modal = document.createElement('div');
      modal.id = 'sipantau-printable-receipt-modal';
      modal.className = 'fixed inset-0 z-[10005] flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm print:p-0 print:bg-white';
      document.body.appendChild(modal);
    }
    modal.innerHTML = `
      <div class="bg-white text-black max-w-xl w-full rounded-2xl border-2 border-[#9e001f] shadow-2xl overflow-hidden print:border-0 print:shadow-none print:w-full print:max-w-none">
        <div class="bg-[#9e001f] text-white p-4 flex items-center justify-between print:hidden">
          <div class="flex items-center gap-2">
            <span class="material-symbols-outlined">print</span>
            <span class="font-bold text-sm">Bukti Tanda Terima Laporan Resmi</span>
          </div>
          <div class="flex items-center gap-2">
            <button type="button" id="btn-print-receipt-action" class="px-3.5 py-1.5 rounded-lg bg-white text-[#9e001f] font-bold text-xs hover:bg-[#ffdad8] transition flex items-center gap-1 shadow-sm">
              <span class="material-symbols-outlined text-sm">print</span> Cetak / Simpan PDF
            </button>
            <button type="button" id="btn-close-receipt-action" class="p-1 rounded-lg hover:bg-white/20 text-white transition">
              <span class="material-symbols-outlined">close</span>
            </button>
          </div>
        </div>
        <div class="p-6 md:p-8 space-y-5 bg-white text-black font-sans leading-normal">
          <div class="text-center pb-4 border-b-2 border-black/80 space-y-1">
            <div class="flex items-center justify-center gap-2 mb-1">
              <span class="material-symbols-outlined text-[#9e001f] text-3xl">verified_user</span>
              <span class="font-extrabold text-base tracking-wider uppercase font-serif">PEMERINTAH KOTA BANDUNG</span>
            </div>
            <h4 class="font-bold text-xs uppercase tracking-wide">DINAS KOMUNIKASI DAN INFORMATIKA — SISTEM SIPANTAU</h4>
            <p class="text-[10px] text-gray-600">Jl. Wastukancana No. 2, Babakan Ciamis, Sumur Bandung • Layanan Hotline Terpadu SIPANTAU</p>
            <div class="mt-2 pt-2 border-t border-dashed border-gray-400">
              <span class="inline-block px-3 py-1 bg-gray-100 rounded text-xs font-bold uppercase tracking-widest text-[#9e001f]">
                SURAT TANDA TERIMA LAPORAN PENGADUAN WARGA
              </span>
            </div>
          </div>
          <div class="flex items-start justify-between gap-4 p-4 rounded-xl bg-gray-50 border border-gray-200">
            <div class="space-y-1.5">
              <div class="text-[10px] uppercase font-bold text-gray-500 tracking-wider">Nomor Registrasi Tiket:</div>
              <div class="text-xl font-mono font-extrabold text-[#9e001f] tracking-tight">${ticket.id}</div>
              <div class="text-xs text-gray-700">Waktu Lapor: <strong>${ticket.waktu}</strong></div>
              <div class="text-xs text-gray-700">Status Awal: <strong class="text-emerald-700 font-bold">${ticket.status}</strong></div>
              <div class="text-xs text-gray-700">Target Tanggap: <strong class="text-amber-700">Maksimal 4 Jam (SLA)</strong></div>
            </div>
            <div class="text-center shrink-0">
              <div class="w-24 h-24 p-1.5 bg-white rounded-lg border-2 border-black flex items-center justify-center shadow-xs">
                <svg viewBox="0 0 100 100" class="w-full h-full">
                  <rect width="100" height="100" fill="#ffffff" />
                  <rect x="5" y="5" width="30" height="30" fill="#000000" />
                  <rect x="10" y="10" width="20" height="20" fill="#ffffff" />
                  <rect x="15" y="15" width="10" height="10" fill="#000000" />
                  <rect x="65" y="5" width="30" height="30" fill="#000000" />
                  <rect x="70" y="10" width="20" height="20" fill="#ffffff" />
                  <rect x="75" y="15" width="10" height="10" fill="#000000" />
                  <rect x="5" y="65" width="30" height="30" fill="#000000" />
                  <rect x="10" y="70" width="20" height="20" fill="#ffffff" />
                  <rect x="15" y="75" width="10" height="10" fill="#000000" />
                  <rect x="42" y="10" width="16" height="8" fill="#000000" />
                  <rect x="45" y="24" width="10" height="10" fill="#000000" />
                  <rect x="40" y="40" width="20" height="20" fill="#9e001f" />
                  <rect x="10" y="45" width="20" height="10" fill="#000000" />
                  <rect x="70" y="45" width="15" height="15" fill="#000000" />
                  <rect x="45" y="70" width="20" height="15" fill="#000000" />
                  <rect x="75" y="75" width="15" height="15" fill="#000000" />
                </svg>
              </div>
              <span class="text-[9px] font-mono text-gray-500 font-bold block mt-1">VERIFIKASI RESMI</span>
            </div>
          </div>
          <div class="space-y-3 text-xs">
            <div class="grid grid-cols-2 gap-3 pb-3 border-b border-gray-200">
              <div>
                <span class="text-gray-500 block text-[10px] uppercase font-bold">Identitas Pelapor</span>
                <strong class="text-black text-xs">${ticket.pelapor}</strong>
                <div class="text-[11px] font-mono text-gray-600">${ticket.nik || '3273**********0019'}</div>
              </div>
              <div>
                <span class="text-gray-500 block text-[10px] uppercase font-bold">Instansi Penanggung Jawab</span>
                <strong class="text-black text-xs">${ticket.dinas}</strong>
                <div class="text-[11px] text-gray-600">Kategori: ${ticket.kategori}</div>
              </div>
            </div>
            <div class="pb-3 border-b border-gray-200 space-y-1">
              <span class="text-gray-500 block text-[10px] uppercase font-bold">Judul & Ringkasan Aduan</span>
              <div class="font-bold text-sm text-black">${ticket.judul}</div>
              <div class="text-gray-700 italic text-xs leading-relaxed">"${ticket.deskripsi}"</div>
            </div>
            <div class="grid grid-cols-2 gap-3 pb-3 border-b border-gray-200">
              <div>
                <span class="text-gray-500 block text-[10px] uppercase font-bold">Titik Lokasi Kejadian</span>
                <strong class="text-black text-xs">${ticket.alamat}</strong>
              </div>
              <div>
                <span class="text-gray-500 block text-[10px] uppercase font-bold">Koordinat Geotag GPS</span>
                <span class="font-mono text-xs text-gray-700">Lat: ${ticket.lat}, Lng: ${ticket.lng}</span>
              </div>
            </div>
          </div>
          <div class="flex items-center justify-between pt-2">
            <div class="text-[10px] text-gray-500 max-w-xs leading-tight">
              <p className="font-bold text-black mb-0.5">Catatan Validitas:</p>
              <p>Surat ini merupakan bukti resmi pendaftaran pengaduan pada sistem SIPANTAU. Dapat digunakan untuk koordinasi ke RT/RW dan kelurahan setempat.</p>
            </div>
            <div class="w-24 h-24 rounded-full border-2 border-dashed border-[#9e001f] text-[#9e001f] flex flex-col items-center justify-center p-1 text-center rotate-[-6deg] shadow-xs shrink-0">
              <span class="text-[8px] font-extrabold uppercase tracking-tight">TERVERIFIKASI</span>
              <span class="material-symbols-outlined text-[#9e001f] text-lg my-0.5">verified</span>
              <span class="text-[7px] font-bold uppercase leading-none">SIPANTAU PEMDA KOTA BDG</span>
            </div>
          </div>
        </div>
      </div>
    `;
    modal.classList.remove('hidden');
    modal.querySelector('#btn-close-receipt-action').onclick = () => modal.classList.add('hidden');
    modal.querySelector('#btn-print-receipt-action').onclick = () => window.print();
    modal.onclick = (e) => {
      if (e.target === modal) modal.classList.add('hidden');
    };
  }
  window.openPrintableReceipt = openPrintableReceipt;

  // 4. MODAL LIGHTBOX FOTO PENDUKUNG RESOLUSI PENUH
  function openImageLightbox(src, caption) {
    let box = document.getElementById('sipantau-image-lightbox');
    if (!box) {
      box = document.createElement('div');
      box.id = 'sipantau-image-lightbox';
      box.className = 'fixed inset-0 z-[10000] flex items-center justify-center p-4 bg-black/85 backdrop-blur-md transition-all duration-200';
      box.innerHTML = `
        <div class="relative max-w-4xl w-full flex flex-col items-center">
          <button type="button" id="close-lightbox" class="absolute -top-12 right-0 p-2 text-white hover:text-[#ffdad8] transition flex items-center gap-1 text-sm font-semibold">
            <span class="material-symbols-outlined text-2xl">close</span> Tutup
          </button>
          <img id="lightbox-img" class="max-h-[80vh] w-auto max-w-full rounded-xl object-contain shadow-2xl border border-white/20" src="" alt="Pratinjau Foto Bukti" />
          <p id="lightbox-caption" class="text-white text-xs mt-3 text-center px-4 py-1.5 rounded-full bg-black/50 backdrop-blur-sm max-w-xl"></p>
        </div>
      `;
      document.body.appendChild(box);
      box.querySelector('#close-lightbox').addEventListener('click', () => box.classList.add('hidden'));
      box.addEventListener('click', (e) => {
        if (e.target === box) box.classList.add('hidden');
      });
    }
    box.querySelector('#lightbox-img').src = src;
    box.querySelector('#lightbox-caption').textContent = caption || 'Foto Bukti / Pendukung Aduan Lapangan';
    box.classList.remove('hidden');
  }

  // 4A. KOMUNIKASI DUA ARAH WARGA & PETUGAS OPD (DENGAN FOTO PENDUKUNG)
  function renderDiscussionThread(container, ticket, defaultRole = 'warga', onUpdated) {
    if (!container || !ticket) return;

    const messages = Array.isArray(ticket.messages) ? ticket.messages : [];
    let selectedPhotoData = null;

    container.innerHTML = `
      <div class="space-y-4">
        <!-- Header Komunikasi -->
        <div class="flex items-center justify-between pb-2 border-b border-[#e5bdbb]/80">
          <div class="flex items-center gap-2">
            <div class="w-8 h-8 rounded-lg bg-[#9e001f] text-white flex items-center justify-center shadow-xs">
              <span class="material-symbols-outlined text-lg">forum</span>
            </div>
            <div>
              <h4 class="font-bold text-sm text-[#1b1b1f]" style="font-family:'Plus Jakarta Sans',sans-serif;">
                Komunikasi Dua Arah Warga & Petugas OPD
              </h4>
              <p class="text-[11px] text-[#5c403f]">
                Klarifikasi tindak lanjut & bukti foto terkini untuk tiket <strong class="font-mono text-[#9e001f]">${ticket.id}</strong>
              </p>
            </div>
          </div>
          <span class="text-[11px] px-2.5 py-0.5 rounded-full bg-white border border-[#e5bdbb] text-[#5c403f] font-mono font-semibold">
            ${messages.length} Pesan
          </span>
        </div>

        <!-- Daftar Pesan & Foto Pendukung -->
        <div id="thread-message-list-${ticket.id.replace('#', '')}" class="space-y-3 max-h-64 overflow-y-auto pr-1">
          ${messages.length === 0 ? `
            <div class="p-4 text-center rounded-xl bg-white/60 border border-dashed border-[#e5bdbb] text-[#5c403f] text-xs">
              <span class="material-symbols-outlined text-2xl text-[#c8102e] mb-1">chat_bubble_outline</span>
              <p class="font-medium">Belum ada pesan klarifikasi pada tiket ini.</p>
              <p class="text-[11px] text-gray-500 mt-0.5">Warga dan petugas dapat saling mengirim instruksi dan foto kondisi terkini.</p>
            </div>
          ` : messages.map((m) => {
            const isOfficer = m.senderRole === 'petugas';
            return `
              <div class="flex gap-2.5 ${isOfficer ? 'flex-row-reverse' : 'flex-row'}">
                <div class="w-8 h-8 rounded-full flex items-center justify-center shrink-0 text-white font-bold text-xs shadow-xs ${
                  isOfficer ? 'bg-[#9e001f]' : 'bg-[#006a6a]'
                }">
                  <span class="material-symbols-outlined text-base">${isOfficer ? 'shield_person' : 'person'}</span>
                </div>
                <div class="max-w-[85%] space-y-1.5 ${isOfficer ? 'items-end text-right' : 'items-start text-left'}">
                  <div class="flex items-center gap-1.5 text-[11px] ${isOfficer ? 'justify-end' : 'justify-start'}">
                    <span class="font-bold text-[#1b1b1f]">${m.senderName}</span>
                    <span class="px-1.5 py-0.2 rounded text-[10px] font-semibold ${
                      isOfficer ? 'bg-[#ffdad8] text-[#9e001f]' : 'bg-emerald-100 text-emerald-800'
                    }">${m.roleBadge || (isOfficer ? 'Petugas OPD' : 'Warga Pelapor')}</span>
                    <span class="text-gray-400 font-mono text-[10px]">${m.waktu}</span>
                  </div>

                  <div class="p-3 rounded-2xl text-xs leading-relaxed shadow-xs ${
                    isOfficer
                      ? 'bg-[#9e001f] text-white rounded-tr-none'
                      : 'bg-white text-[#1b1b1f] border border-[#e5bdbb] rounded-tl-none'
                  }">
                    <p class="whitespace-pre-line">${m.text}</p>
                    ${m.foto ? `
                      <div class="mt-2.5 pt-2 ${isOfficer ? 'border-t border-white/20' : 'border-t border-[#e5bdbb]/80'}">
                        <div class="flex items-center justify-between text-[10px] font-semibold mb-1 ${isOfficer ? 'text-[#ffdad8]' : 'text-[#9e001f]'}">
                          <span class="flex items-center gap-1">
                            <span class="material-symbols-outlined text-xs">image</span> Foto Pendukung Lapangan
                          </span>
                          <span class="cursor-pointer hover:underline">Perbesar ↗</span>
                        </div>
                        <img src="${m.foto}" alt="Foto Pendukung Lapangan" 
                          class="w-full max-h-40 object-cover rounded-lg border cursor-pointer hover:opacity-90 transition ${
                            isOfficer ? 'border-white/30' : 'border-[#e5bdbb]'
                          }" 
                          data-fullimg="${m.foto}" data-caption="Foto dari ${m.senderName} (${m.waktu})" />
                      </div>
                    ` : ''}
                  </div>
                </div>
              </div>
            `;
          }).join('')}
        </div>

        <!-- Formulir Kirim Tanggapan & Lampirkan Foto -->
        <div class="bg-white p-3.5 rounded-xl border border-[#e5bdbb] space-y-3 shadow-2xs">
          <div class="flex flex-wrap items-center justify-between gap-2 text-xs">
            <div class="flex items-center gap-2">
              <span class="font-bold text-[#5c403f]">Kirim Sebagai:</span>
              <label class="inline-flex items-center gap-1 cursor-pointer">
                <input type="radio" name="reply-role-${ticket.id.replace('#', '')}" value="warga" ${defaultRole === 'warga' ? 'checked' : ''} class="text-[#c8102e] focus:ring-[#c8102e]" />
                <span class="font-semibold text-emerald-800">Warga Pelapor</span>
              </label>
              <label class="inline-flex items-center gap-1 cursor-pointer ml-1.5">
                <input type="radio" name="reply-role-${ticket.id.replace('#', '')}" value="petugas" ${defaultRole === 'petugas' ? 'checked' : ''} class="text-[#c8102e] focus:ring-[#c8102e]" />
                <span class="font-semibold text-[#9e001f]">Petugas OPD</span>
              </label>
            </div>
            <span class="text-[11px] text-gray-400">Dukungan foto kamera / galeri</span>
          </div>

          <!-- Saran Cepat / Prompt Chips -->
          <div class="flex flex-wrap items-center gap-1 pt-1 border-t border-[#e5bdbb]/40">
            <span class="text-[10px] text-gray-500 font-semibold flex items-center gap-0.5 mr-1">
              <span class="material-symbols-outlined text-xs text-amber-500">sparkles</span> Saran:
            </span>
            <div id="quick-prompt-chips-${ticket.id.replace('#', '')}" class="flex flex-wrap gap-1"></div>
          </div>

          <div class="flex flex-col sm:flex-row gap-2">
            <input type="text" id="reply-sender-name-${ticket.id.replace('#', '')}" 
              value="${defaultRole === 'warga' ? 'Budi Pratama (Warga)' : 'Siti M. (Petugas OPD)'}"
              placeholder="Nama pengirim..."
              class="sm:w-1/3 px-3 py-1.5 rounded-lg border border-[#e5bdbb] text-xs focus:border-[#c8102e] focus:ring-1 focus:ring-[#c8102e]" />
            <input type="text" id="reply-text-input-${ticket.id.replace('#', '')}" 
              placeholder="Tulis pesan klarifikasi atau instruksi teknis..." 
              class="flex-1 px-3 py-1.5 rounded-lg border border-[#e5bdbb] text-xs focus:border-[#c8102e] focus:ring-1 focus:ring-[#c8102e]" />
          </div>

          <!-- Pratinjau Foto Lampiran -->
          <div id="reply-photo-preview-wrap-${ticket.id.replace('#', '')}" class="hidden flex items-center justify-between p-2 rounded-lg bg-[#fbf8fe] border border-[#e5bdbb]">
            <div class="flex items-center gap-2.5">
              <img id="reply-photo-preview-img-${ticket.id.replace('#', '')}" src="" alt="Pratinjau" class="w-12 h-12 object-cover rounded-md border border-[#e5bdbb]" />
              <div class="text-[11px] text-[#5c403f]">
                <p class="font-bold text-[#1b1b1f]">Foto Pendukung (Terkompresi)</p>
                <p class="text-gray-500">Akan dikirim bersama pesan ke tiket ini</p>
              </div>
            </div>
            <button type="button" id="btn-remove-reply-photo-${ticket.id.replace('#', '')}" class="text-xs text-[#c8102e] hover:underline font-bold px-2 py-1">
              ✕ Hapus Foto
            </button>
          </div>

          <!-- Toolbar Tombol Aksi & Foto -->
          <div class="flex flex-wrap items-center justify-between gap-2 pt-1 border-t border-[#e5bdbb]/60">
            <div class="flex items-center gap-1.5">
              <input type="file" id="reply-file-input-${ticket.id.replace('#', '')}" accept="image/*" class="hidden" />
              <button type="button" id="btn-trigger-upload-${ticket.id.replace('#', '')}" class="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg border border-[#e5bdbb] bg-[#fbf8fe] hover:bg-[#ffdad8]/40 text-[#9e001f] font-semibold text-xs transition">
                <span class="material-symbols-outlined text-sm">add_photo_alternate</span>
                <span>Unggah Foto</span>
              </button>

              <button type="button" id="btn-sample-warga-photo-${ticket.id.replace('#', '')}" class="hidden sm:inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 text-[11px] transition">
                <span>📷 Bukti Warga</span>
              </button>
              <button type="button" id="btn-sample-petugas-photo-${ticket.id.replace('#', '')}" class="hidden sm:inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-700 text-[11px] transition">
                <span>🛠️ Foto URC</span>
              </button>
            </div>

            <button type="button" id="btn-send-reply-${ticket.id.replace('#', '')}" class="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-[#c8102e] hover:bg-[#9e001f] text-white font-bold text-xs transition shadow-xs">
              <span class="material-symbols-outlined text-sm">send</span>
              <span>Kirim Tanggapan</span>
            </button>
          </div>
        </div>
      </div>
    `;

    // Click handler untuk foto lightbox
    container.querySelectorAll('img[data-fullimg]').forEach((img) => {
      img.addEventListener('click', () => {
        openImageLightbox(img.getAttribute('data-fullimg'), img.getAttribute('data-caption'));
      });
    });

    const cleanId = ticket.id.replace('#', '');
    const msgListEl = container.querySelector(`#thread-message-list-${cleanId}`);
    if (msgListEl) msgListEl.scrollTop = msgListEl.scrollHeight;

    // Prompt Chips Builder
    const promptsWarga = [
      'Kapan estimasi tim tanggap tiba di lokasi?',
      'Foto kondisi terbaru sudah kami lampirkan.',
      'Kondisi makin parah setelah hujan, mohon prioritas.'
    ];
    const promptsPetugas = [
      'Tim Regu Reaksi Cepat (URC) sedang meluncur ke titik lokasi.',
      'Penanganan fisik lapangan telah selesai dikerjakan 100%.',
      'Mohon informasi patokan gedung/rumah terdekat untuk verifikasi.'
    ];
    const chipsWrap = container.querySelector(`#quick-prompt-chips-${cleanId}`);
    const textInput = container.querySelector(`#reply-text-input-${cleanId}`);
    function updatePromptChips(currentRole) {
      if (!chipsWrap) return;
      const list = currentRole === 'warga' ? promptsWarga : promptsPetugas;
      chipsWrap.innerHTML = list.map((pr) => `
        <button type="button" class="prompt-chip-btn px-2 py-0.5 rounded-full bg-[#fbf8fe] border border-[#e5bdbb] text-[10px] text-[#5c403f] hover:bg-[#ffdad8]/60 hover:text-[#9e001f] transition truncate max-w-[210px]" title="${pr}">
          ${pr}
        </button>
      `).join('');
      chipsWrap.querySelectorAll('.prompt-chip-btn').forEach((btn) => {
        btn.addEventListener('click', () => {
          textInput.value = btn.getAttribute('title') || btn.textContent.trim();
          textInput.focus();
        });
      });
    }
    updatePromptChips(defaultRole);

    // Radio Role Toggle
    const roleInputs = container.querySelectorAll(`input[name="reply-role-${cleanId}"]`);
    const nameInput = container.querySelector(`#reply-sender-name-${cleanId}`);
    roleInputs.forEach((r) => {
      r.addEventListener('change', (e) => {
        if (e.target.value === 'petugas') {
          nameInput.value = 'Siti M. (Petugas OPD)';
          updatePromptChips('petugas');
        } else {
          nameInput.value = 'Budi Pratama (Warga)';
          updatePromptChips('warga');
        }
      });
    });

    // Upload Foto via File Input dengan Auto Kompresi Canvas
    const fileInput = container.querySelector(`#reply-file-input-${cleanId}`);
    const previewWrap = container.querySelector(`#reply-photo-preview-wrap-${cleanId}`);
    const previewImg = container.querySelector(`#reply-photo-preview-img-${cleanId}`);
    const removePhotoBtn = container.querySelector(`#btn-remove-reply-photo-${cleanId}`);

    container.querySelector(`#btn-trigger-upload-${cleanId}`).addEventListener('click', () => fileInput.click());

    fileInput.addEventListener('change', async (e) => {
      const file = e.target.files && e.target.files[0];
      if (file) {
        showToast('Mengompresi foto untuk menghemat kuota...', 'info');
        const compressed = await compressImage(file);
        selectedPhotoData = compressed || 'https://lh3.googleusercontent.com/aida-public/AB6AXuDF8T8kAUNM-_2HbGnXu8uBKMJ2muGoOIIVwsW-LJXlvjeUyggI0kmrcFyCrJjw5DGqCVi2YjGD6kjq4_gY3-wkkU7CUJuk3ewvRC13mHt8lJyLnqVDv-klbEXOR1R1qkaKxAKpJP1LKp9Pib0NfqapWtlBZyChM_CTjE5aay9TegQ8LnoxrCAjItLPcfcuLGBXQVWqAm4o_HFnPV0BLEExLo7eqWfAbvwqq5KEy88';
        previewImg.src = selectedPhotoData;
        previewWrap.classList.remove('hidden');
        showToast('Foto pendukung berhasil dilampirkan & dikompresi!', 'success');
      }
    });

    removePhotoBtn.addEventListener('click', () => {
      selectedPhotoData = null;
      previewWrap.classList.add('hidden');
      fileInput.value = '';
    });

    // Sample Photos
    container.querySelector(`#btn-sample-warga-photo-${cleanId}`)?.addEventListener('click', () => {
      selectedPhotoData = 'https://lh3.googleusercontent.com/aida-public/AB6AXuDF8T8kAUNM-_2HbGnXu8uBKMJ2muGoOIIVwsW-LJXlvjeUyggI0kmrcFyCrJjw5DGqCVi2YjGD6kjq4_gY3-wkkU7CUJuk3ewvRC13mHt8lJyLnqVDv-klbEXOR1R1qkaKxAKpJP1LKp9Pib0NfqapWtlBZyChM_CTjE5aay9TegQ8LnoxrCAjItLPcfcuLGBXQVWqAm4o_HFnPV0BLEExLo7eqWfAbvwqq5KEy88';
      previewImg.src = selectedPhotoData;
      previewWrap.classList.remove('hidden');
      showToast('Contoh foto kondisi lapangan disematkan!', 'info');
    });

    container.querySelector(`#btn-sample-petugas-photo-${cleanId}`)?.addEventListener('click', () => {
      selectedPhotoData = 'https://images.unsplash.com/photo-1578328819058-b69f3a3b0f6b?auto=format&fit=crop&w=600&q=80';
      previewImg.src = selectedPhotoData;
      previewWrap.classList.remove('hidden');
      showToast('Contoh foto pengerjaan tim URC disematkan!', 'info');
    });

    // Kirim Balasan
    const sendBtn = container.querySelector(`#btn-send-reply-${cleanId}`);
    // textInput already declared above


    const handleSend = () => {
      const text = textInput.value.trim();
      if (!text && !selectedPhotoData) {
        showToast('Harap masukkan pesan tanggapan atau lampirkan foto pendukung.', 'warning');
        return;
      }
      const role = container.querySelector(`input[name="reply-role-${cleanId}"]:checked`)?.value || defaultRole;
      const name = nameInput.value.trim() || (role === 'warga' ? 'Warga Pelapor' : 'Petugas OPD');
      const badge = role === 'warga' ? 'Pelapor Terverifikasi' : 'Petugas Verifikator OPD';

      const added = window.SiPantauDB.addMessage(ticket.id, {
        senderRole: role,
        senderName: name,
        roleBadge: badge,
        text: text || (selectedPhotoData ? '(Melampirkan foto pendukung)' : ''),
        foto: selectedPhotoData
      });

      if (added) {
        showToast(`Tanggapan & foto berhasil dikirim ke tiket ${ticket.id}!`, 'success');
        const updatedTicket = window.SiPantauDB.getTickets().find((t) => t.id === ticket.id) || ticket;
        renderDiscussionThread(container, updatedTicket, role, onUpdated);
        if (typeof onUpdated === 'function') onUpdated(updatedTicket);
      }
    };

    sendBtn.addEventListener('click', handleSend);
    textInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') handleSend();
    });
  }

  // 4B. MODAL PELACAK TIKET LANGSUNG (#lacak) DENGAN KOMUNIKASI DUA ARAH
  window.openTicketTrackerModal = function (prefillId) {
    if (window.parent !== window) {
      window.parent.postMessage({ type: 'sipantau:open-tracker', ticketId: prefillId || '' }, '*');
      return;
    }
    let modal = document.getElementById('sipantau-tracker-modal');
    if (!modal) {
      modal = document.createElement('div');
      modal.id = 'sipantau-tracker-modal';
      modal.className = 'fixed inset-0 z-[9995] flex items-center justify-center p-4 bg-[#1b1b1f]/60 backdrop-blur-sm';
      modal.innerHTML = `
        <div class="bg-white rounded-2xl max-w-3xl w-full border border-[#e5bdbb] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
          <div class="bg-[#9e001f] text-white p-5 flex items-center justify-between shrink-0">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-xl bg-white/15 flex items-center justify-center">
                <span class="material-symbols-outlined text-2xl">track_changes</span>
              </div>
              <div>
                <h3 class="font-bold text-lg tracking-tight" style="font-family:'Plus Jakarta Sans',sans-serif;">Pelacak Status & Komunikasi Tiket SIPANTAU</h3>
                <p class="text-xs text-[#ffdad8]">Pantau linimasa triase dan berdialog langsung dengan petugas OPD</p>
              </div>
            </div>
            <button type="button" id="close-tracker-modal" class="p-1.5 rounded-lg hover:bg-white/15 transition">
              <span class="material-symbols-outlined">close</span>
            </button>
          </div>
          <div class="p-6 space-y-5 overflow-y-auto flex-1">
            <div class="flex gap-2">
              <div class="relative flex-1">
                <span class="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-[#5c403f] text-lg">search</span>
                <input id="tracker-search-input" type="text" placeholder="Masukkan Nomor Tiket (contoh: #TKT-2024-8841 atau #LAPOR-2410-092)..."
                  class="w-full pl-10 pr-4 py-2.5 rounded-lg border border-[#e5bdbb] text-sm focus:border-[#c8102e] focus:ring-1 focus:ring-[#c8102e]" />
              </div>
              <button type="button" id="tracker-search-btn" class="px-5 py-2.5 rounded-lg bg-[#c8102e] hover:bg-[#9e001f] text-white font-semibold text-sm transition">
                Lacak Tiket
              </button>
            </div>
            <div class="flex flex-wrap items-center gap-1.5 text-xs text-[#5c403f]">
              <span>Pilihan tiket:</span>
              <div id="tracker-quick-chips" class="flex flex-wrap gap-1.5"></div>
            </div>
            <div id="tracker-result-box" class="rounded-xl border border-[#e5bdbb] bg-[#fbf8fe] p-5 space-y-4"></div>
          </div>
        </div>
      `;
      document.body.appendChild(modal);

      modal.querySelector('#close-tracker-modal').addEventListener('click', () => modal.classList.add('hidden'));
      modal.addEventListener('click', (e) => { if (e.target === modal) modal.classList.add('hidden'); });
      modal.querySelector('#tracker-search-btn').addEventListener('click', () => renderTracked(modal.querySelector('#tracker-search-input').value));
      modal.querySelector('#tracker-search-input').addEventListener('keydown', (e) => {
        if (e.key === 'Enter') renderTracked(e.target.value);
      });
    }

    const tickets = getTickets();
    const chipsContainer = modal.querySelector('#tracker-quick-chips');
    chipsContainer.innerHTML = tickets.slice(0, 4).map((t) =>
      `<button type="button" class="px-2.5 py-0.5 rounded-full bg-[#ffdad8]/60 text-[#9e001f] font-mono font-bold hover:bg-[#ffdad8] transition" data-ticket="${t.id}">${t.id}</button>`
    ).join('');
    chipsContainer.querySelectorAll('button').forEach((btn) => {
      btn.addEventListener('click', () => {
        const tid = btn.getAttribute('data-ticket');
        modal.querySelector('#tracker-search-input').value = tid;
        renderTracked(tid);
      });
    });

    function renderTracked(query) {
      const q = (query || '').trim().toUpperCase();
      const all = getTickets();
      const item = all.find((t) => t.id.toUpperCase() === q || t.code.toUpperCase() === q.replace('#', '') || t.judul.toUpperCase().includes(q)) || all[0];
      const badgeStyles = {
        Diajukan: 'bg-[#FDECEF] text-[#C8102E] border-[#F9CBD2]',
        Diverifikasi: 'bg-[#FEF3C7] text-[#D97706] border-amber-300',
        Penanganan: 'bg-[#EFF6FF] text-[#2563EB] border-blue-200',
        Selesai: 'bg-[#DCFCE7] text-[#16A34A] border-emerald-200',
        Ditolak: 'bg-gray-100 text-gray-700 border-gray-300'
      };
      const resBox = modal.querySelector('#tracker-result-box');
      resBox.innerHTML = `
        <div class="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-[#e5bdbb]/60">
          <div class="flex items-center gap-2">
            <span class="px-2.5 py-1 rounded bg-white border border-[#e5bdbb] font-mono font-bold text-xs text-[#9e001f]">${item.id}</span>
            <span class="text-xs text-[#5c403f]">${item.waktu}</span>
          </div>
          <span class="px-3 py-1 rounded-full text-xs font-bold border ${badgeStyles[item.status] || badgeStyles.Diajukan}">
            ${item.status.toUpperCase()}
          </span>
        </div>
        <div class="py-2">
          <h4 class="font-bold text-base text-[#1b1b1f]" style="font-family:'Plus Jakarta Sans',sans-serif;">${item.judul}</h4>
          <p class="text-xs text-[#5c403f] mt-1">${item.alamat} • <strong>${item.dinas}</strong></p>
          <p class="text-xs text-[#1b1b1f] mt-2.5 p-3 rounded-lg bg-white border border-[#e5bdbb]/60 leading-relaxed">"${item.deskripsi}"</p>
        </div>
        <div class="pt-3 border-t border-[#e5bdbb]/60">
          <h5 class="text-xs font-bold uppercase tracking-wider text-[#5c403f] mb-3">Linimasa Progres Triase</h5>
          <div class="space-y-3 relative before:absolute before:top-2 before:bottom-2 before:left-3 before:w-0.5 before:bg-[#e5bdbb]">
            ${(item.timeline || []).map((step, idx) => `
              <div class="relative flex items-start gap-3 pl-1">
                <div class="w-5 h-5 rounded-full flex items-center justify-center text-[11px] font-bold z-10 shrink-0 ${
                  step.done ? 'bg-[#16A34A] text-white' : step.active ? 'bg-[#c8102e] text-white ring-4 ring-[#ffdad8]' : 'bg-[#e4e1e7] text-[#5c403f]'
                }">${step.done ? '✓' : idx + 1}</div>
                <div class="flex-1 min-w-0">
                  <div class="flex items-center justify-between gap-2">
                    <span class="text-xs font-bold text-[#1b1b1f]">${step.tahap}</span>
                    <span class="text-[11px] text-[#5c403f] font-mono">${step.waktu}</span>
                  </div>
                  <p class="text-xs text-[#5c403f] mt-0.5">${step.keterangan}</p>
                </div>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- Wadah Komunikasi Dua Arah Warga & Petugas -->
        <div id="tracker-thread-container-${item.id.replace('#', '')}" class="pt-4 border-t border-[#e5bdbb]"></div>
      `;

      // Render thread komunikasi dua arah
      renderDiscussionThread(
        resBox.querySelector(`#tracker-thread-container-${item.id.replace('#', '')}`),
        item,
        'warga',
        () => renderTracked(item.id)
      );
    }

    modal.classList.remove('hidden');
    const initId = prefillId || getTickets()[0].id;
    modal.querySelector('#tracker-search-input').value = initId;
    renderTracked(initId);
  };

  // 5. MODAL LOGIN PORTAL WARGA (TERPISAH TOTAL DARI BACKOFFICE OPD)
  window.openCivicAuthModal = function () {
    let modal = document.getElementById('sipantau-auth-modal');
    if (!modal) {
      modal = document.createElement('div');
      modal.id = 'sipantau-auth-modal';
      modal.className = 'fixed inset-0 z-[9995] flex items-center justify-center p-4 bg-[#1b1b1f]/60 backdrop-blur-sm';
      
      const citizenUrl = resolvePageUrl('formulir_pengaduan_multi_step_warga');
      const officerUrl = resolvePageUrl('dashboard_petugas_verifikasi_disposisi');

      modal.innerHTML = `
        <div class="bg-white rounded-2xl max-w-md w-full border border-[#e5bdbb] shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
          <div class="bg-[#9e001f] text-white p-5 flex items-center justify-between">
            <div class="flex items-center gap-2.5">
              <span class="material-symbols-outlined text-2xl">person</span>
              <div>
                <h3 class="font-bold text-base" style="font-family:'Plus Jakarta Sans',sans-serif;">Masuk Portal Warga SIPANTAU</h3>
                <p class="text-[11px] text-[#ffdad8]">Layanan Aspirasi &amp; Pengaduan Masyarakat</p>
              </div>
            </div>
            <button type="button" id="close-auth-modal" class="p-1 rounded-lg hover:bg-white/15">
              <span class="material-symbols-outlined">close</span>
            </button>
          </div>
          <div class="p-6 space-y-4 text-xs">
            <div>
              <label class="block font-bold text-gray-700 mb-1">Nomor Induk Kependudukan (NIK)</label>
              <input type="text" value="3273012908920019" class="w-full px-3 py-2 rounded-lg border border-gray-300 font-mono text-xs focus:ring-1 focus:ring-primary" placeholder="3273..." />
            </div>
            <div>
              <label class="block font-bold text-gray-700 mb-1">Nomor WhatsApp / Kata Sandi</label>
              <input type="password" value="••••••••••••" class="w-full px-3 py-2 rounded-lg border border-gray-300 text-xs focus:ring-1 focus:ring-primary" />
            </div>
            <a href="${citizenUrl}" class="w-full py-2.5 bg-[#9e001f] hover:bg-[#c8102e] text-white rounded-xl font-bold flex items-center justify-center gap-2 shadow-xs transition">
              <span>Masuk Sebagai Warga Terverifikasi</span>
              <span class="material-symbols-outlined text-sm">arrow_forward</span>
            </a>
            <div class="pt-3 border-t border-gray-200 text-center">
              <p class="text-[11px] text-gray-500 mb-2">Aparatur Sipil Negara / Petugas Verifikator OPD?</p>
              <a href="${officerUrl}" class="inline-flex items-center gap-1.5 text-xs text-blue-700 hover:text-blue-900 font-bold hover:underline">
                <span class="material-symbols-outlined text-sm">lock</span>
                <span>Beralih ke Portal Backoffice Pemda</span>
              </a>
            </div>
          </div>
        </div>
      `;
      document.body.appendChild(modal);
      modal.querySelector('#close-auth-modal').addEventListener('click', () => modal.classList.add('hidden'));
      modal.addEventListener('click', (e) => { if (e.target === modal) modal.classList.add('hidden'); });
    }
    modal.classList.remove('hidden');
  };

  // Helper untuk menentukan URL antar-halaman secara robust
  function resolvePageUrl(folderName) {
    const path = window.location.pathname;
    if (path.includes('/stitch_sistem_pengaduan_masyarakat/')) {
      return `/stitch_sistem_pengaduan_masyarakat/${folderName}/code.html`;
    }
    if (path.includes('/stitch/stitch_sistem_pengaduan_masyarakat/')) {
      return `/stitch/stitch_sistem_pengaduan_masyarakat/${folderName}/code.html`;
    }
    return `../${folderName}/code.html`;
  }

  // 6. MODUL KHUSUS HALAMAN PETA PENGADUAN KOLEKTIF WARGA
  function initCollectiveMapPage() {
    if (!window.location.pathname.includes('peta_pengaduan')) return;

    const mapSection = document.querySelector('main section.lg\\:col-span-8') || document.querySelector('main section');
    if (!mapSection) return;
    mapSection.style.isolation = 'isolate';
    mapSection.style.position = 'relative';
    mapSection.style.zIndex = '10';
    const bgCanvas = mapSection.querySelector('div[data-location]') || mapSection.querySelector('div.relative.h-full');
    if (!bgCanvas) return;
    bgCanvas.style.isolation = 'isolate';
    bgCanvas.style.position = 'relative';
    bgCanvas.style.zIndex = '10';

    // Sembunyikan pin statik & SVG dekoratif asal supaya digantikan oleh pin Leaflet sebenar
    bgCanvas.querySelectorAll('svg, div.absolute.top-28, div.absolute.top-40, div.absolute.bottom-40, div.absolute.bottom-28, div.absolute.top-64, div.absolute.top-\\[48\\%\\]').forEach((el) => {
      el.style.display = 'none';
    });

    // Buat lapisan kontena Leaflet di dalam kanvas Stitch
    const leafletDiv = document.createElement('div');
    leafletDiv.id = 'sipantau-live-leaflet';
    leafletDiv.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;z-index:5;';
    bgCanvas.prepend(leafletDiv);

    const popupCard = bgCanvas.querySelector('div.z-30.w-\\[380px\\]') || bgCanvas.querySelector('div.z-30');
    if (popupCard) popupCard.style.zIndex = '850';

    ensureLeaflet(() => {
      const map = window.L.map('sipantau-live-leaflet', { zoomControl: false }).setView([-6.905, 107.618], 13);

      const vectorLayer = window.L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors | SIPANTAU',
        maxZoom: 19
      }).addTo(map);

      const satelliteLayer = window.L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
        attribution: '&copy; Esri World Imagery | SIPANTAU',
        maxZoom: 19
      });

      const markerGroup = window.L.layerGroup().addTo(map);
      let activeCategory = 'Semua';
      let searchQuery = '';
      let selectedTicketId = '#LAPOR-2410-092';

      function updatePopupCard(ticket) {
        if (!popupCard || !ticket) return;
        popupCard.style.display = 'block';
        const badges = popupCard.querySelectorAll('span.rounded-full');
        if (badges[0]) badges[0].textContent = ticket.id;
        if (badges[1]) {
          badges[1].innerHTML = `<span class="w-1.5 h-1.5 rounded-full bg-[#9A5200] animate-pulse"></span> ${ticket.status.toUpperCase()}`;
        }
        const img = popupCard.querySelector('img');
        if (img && ticket.foto) img.src = ticket.foto;
        const h3 = popupCard.querySelector('h3');
        if (h3) h3.textContent = ticket.judul;
        const opd = popupCard.querySelector('p.text-tertiary-container');
        if (opd) opd.textContent = ticket.dinas;
        const locSpans = popupCard.querySelectorAll('div.text-on-surface-variant span.truncate, div.text-on-surface-variant span:not(.material-symbols-outlined)');
        if (locSpans[0]) locSpans[0].textContent = ticket.alamat;
        if (locSpans[1]) locSpans[1].textContent = ticket.waktu;

        const upvoteBtn = popupCard.querySelector('button.bg-primary-container') || popupCard.querySelector('button.bg-primary');
        if (upvoteBtn) {
          upvoteBtn.innerHTML = `<span class="material-symbols-outlined text-[16px]">thumb_up</span> Dukung Aduan Ini (${ticket.upvotes} Warga)`;
          upvoteBtn.onclick = () => {
            const list = getTickets();
            const found = list.find((x) => x.id === ticket.id);
            if (found) {
              found.upvotes = (found.upvotes || 0) + 1;
              saveTickets(list);
              upvoteBtn.innerHTML = `<span class="material-symbols-outlined text-[16px]">thumb_up</span> Dukung Aduan Ini (${found.upvotes} Warga)`;
              showToast(`Dukungan berhasil ditambahkan pada tiket ${found.id}!`, 'success');
            }
          };

          // Tombol Buka Linimasa & Percakapan Langsung dari Peta
          let trackerBtn = popupCard.querySelector('.btn-open-map-tracker');
          if (!trackerBtn) {
            trackerBtn = document.createElement('button');
            trackerBtn.className = 'btn-open-map-tracker w-full mt-2 py-2 px-3 rounded-xl border border-[#9e001f] text-[#9e001f] hover:bg-[#ffdad8]/50 font-bold text-xs flex items-center justify-center gap-1.5 transition shadow-2xs';
            upvoteBtn.parentNode.insertBefore(trackerBtn, upvoteBtn.nextSibling);
          }
          trackerBtn.innerHTML = `<span class="material-symbols-outlined text-[16px]">forum</span> Buka Linimasa & Diskusi Tiket ↗`;
          trackerBtn.onclick = () => {
            window.openTicketTrackerModal(ticket.id);
          };
        }
      }

      function renderMapMarkers() {
        markerGroup.clearLayers();
        const statusCheckboxes = Array.from(document.querySelectorAll('aside input[type="checkbox"]'));
        const allowedStatuses = [];
        if (statusCheckboxes[0]?.checked) allowedStatuses.push('Diajukan');
        if (statusCheckboxes[1]?.checked) allowedStatuses.push('Diverifikasi');
        if (statusCheckboxes[2]?.checked) allowedStatuses.push('Penanganan');
        if (statusCheckboxes[3]?.checked) allowedStatuses.push('Selesai');

        const tickets = getTickets().filter((t) => {
          const matchCat = activeCategory === 'Semua' || t.kategori.toLowerCase().includes(activeCategory.toLowerCase()) || t.kategoriLabel.toLowerCase().includes(activeCategory.toLowerCase());
          const matchStatus = allowedStatuses.length === 0 || allowedStatuses.includes(t.status);
          const matchSearch = !searchQuery || t.judul.toLowerCase().includes(searchQuery) || t.alamat.toLowerCase().includes(searchQuery) || t.id.toLowerCase().includes(searchQuery);
          return matchCat && matchStatus && matchSearch;
        });

        tickets.forEach((t) => {
          const m = window.L.marker([t.lat, t.lng], {
            icon: createCivicPin(t.status, t.id === selectedTicketId)
          }).addTo(markerGroup);

          m.on('click', () => {
            selectedTicketId = t.id;
            updatePopupCard(t);
            renderMapMarkers();
            map.panTo([t.lat, t.lng]);
          });
        });

        const countText = document.querySelector('aside p.text-xs');
        if (countText) countText.textContent = `Menampilkan ${tickets.length} laporan aktif pada peta`;
      }

      renderMapMarkers();
      updatePopupCard(getTickets()[0]);

      // Tutup popup card
      const closeBtn = popupCard?.querySelector('button');
      if (closeBtn) closeBtn.addEventListener('click', () => { popupCard.style.display = 'none'; });

      // Kontrol Peta (+, -, Lokasi Saya, Fullscreen)
      const ctrlBtns = bgCanvas.querySelectorAll('div.absolute.top-4.right-4 button, div.absolute.top-4 button');
      if (ctrlBtns[0]) ctrlBtns[0].onclick = () => map.zoomIn();
      if (ctrlBtns[1]) ctrlBtns[1].onclick = () => map.zoomOut();
      if (ctrlBtns[2]) {
        ctrlBtns[2].onclick = () => {
          if (!navigator.geolocation) return showToast('Geolocation tidak didukung browser ini.', 'warning');
          showToast('Mendeteksi titik GPS Anda...', 'info');
          navigator.geolocation.getCurrentPosition(
            (pos) => {
              map.setView([pos.coords.latitude, pos.coords.longitude], 16);
              showToast('Peta dipusatkan ke lokasi GPS Anda.', 'success');
            },
            () => showToast('Gagal mengakses GPS, menampilkan pusat kota Bandung.', 'warning')
          );
        };
      }
      if (ctrlBtns[3]) {
        ctrlBtns[3].onclick = () => {
          if (!document.fullscreenElement) mapSection.requestFullscreen?.();
          else document.exitFullscreen?.();
        };
      }

      // Toggle Peta Vektor vs Satelit & Segarkan Data & Lapor di Lokasi Ini
      document.querySelectorAll('section button').forEach((btn) => {
        const txt = (btn.textContent || '').trim();
        if (txt.includes('Peta Vektor')) {
          btn.onclick = () => {
            map.removeLayer(satelliteLayer);
            vectorLayer.addTo(map);
            showToast('Mode Peta Vektor diaktifkan.', 'info');
          };
        } else if (txt.includes('Satelit')) {
          btn.onclick = () => {
            map.removeLayer(vectorLayer);
            satelliteLayer.addTo(map);
            showToast('Mode Citra Satelit diaktifkan.', 'info');
          };
        } else if (txt.includes('Segarkan Data')) {
          btn.onclick = () => {
            renderMapMarkers();
            showToast('Data sebaran aduan berhasil disegarkan.', 'success');
          };
        } else if (txt.includes('Lapor di Lokasi Ini')) {
          btn.onclick = () => {
            const center = map.getCenter();
            localStorage.setItem('SIPANTAU_DRAFT_COORDS', JSON.stringify({ lat: center.lat, lng: center.lng }));
            window.location.href = resolvePageUrl('formulir_pengaduan_multi_step_warga');
          };
        }
      });

      // Filter Kategori Chips di Sidebar Kiri
      const catBtns = document.querySelectorAll('aside div.flex.flex-wrap.gap-2 button');
      catBtns.forEach((btn) => {
        btn.addEventListener('click', () => {
          catBtns.forEach((b) => {
            b.className = 'px-3 py-1.5 rounded-full text-label-sm font-label-sm bg-surface-container-low hover:bg-surface-container text-on-surface border border-surface-container-highest transition-all flex items-center gap-1';
          });
          btn.className = 'px-3 py-1.5 rounded-full text-label-sm font-label-sm bg-primary text-on-primary border border-primary font-bold transition-all flex items-center gap-1';
          const rawTxt = btn.textContent.replace(/\(.*\)/, '').replace(/remove_road|delete|water_damage|lightbulb/g, '').trim();
          activeCategory = rawTxt.includes('Semua') ? 'Semua' : rawTxt;
          renderMapMarkers();
        });
      });

      // Filter Status Checkboxes
      document.querySelectorAll('aside input[type="checkbox"]').forEach((cb) => {
        cb.addEventListener('change', renderMapMarkers);
      });

      // Pencarian Wilayah / Kasus + Forward Geocoding Sidebar Kiri
      const sideSearch = document.querySelector('aside input[type="text"]');
      if (sideSearch) {
        sideSearch.value = '';
        sideSearch.addEventListener('input', (e) => {
          searchQuery = e.target.value.trim().toLowerCase();
          renderMapMarkers();
        });
        sideSearch.addEventListener('keydown', async (e) => {
          if (e.key === 'Enter' && sideSearch.value.trim()) {
            executeMapSearch(sideSearch.value.trim());
          }
        });
      }

      // ==========================================================
      // BAR PENCARIAN ALAMAT LANGSUNG DI ATAS PETA (FLOATING BAR)
      // ==========================================================
      const mapSearchBar = document.createElement('div');
      mapSearchBar.className = 'sipantau-map-search-bar absolute top-4 left-4 max-w-sm sm:max-w-md w-[calc(100%-80px)] sm:w-[380px] transition-all pointer-events-auto';
      mapSearchBar.style.zIndex = '800';
      mapSearchBar.innerHTML = `
        <div class="relative flex items-center bg-white/95 backdrop-blur-md rounded-xl border border-gray-300 shadow-lg overflow-hidden focus-within:ring-2 focus-within:ring-[#9E001F] focus-within:border-[#9E001F]">
          <span class="material-symbols-outlined ml-3 text-gray-500 text-[20px] shrink-0">search</span>
          <input type="text" id="sipantau-map-address-input" class="w-full py-2.5 px-3 text-xs md:text-sm text-gray-900 bg-transparent focus:outline-none placeholder:text-gray-400 font-medium" placeholder="Cari alamat / jalan / patokan di peta..." />
          <button type="button" id="sipantau-map-address-clear" class="hidden text-gray-400 hover:text-gray-700 p-1 mr-1">
            <span class="material-symbols-outlined text-[18px]">close</span>
          </button>
          <button type="button" id="sipantau-map-address-submit" class="px-3.5 py-2 bg-[#9E001F] hover:bg-[#800019] text-white text-xs font-bold shrink-0 transition flex items-center gap-1 mr-1 rounded-lg shadow-sm">
            <span>Cari</span>
          </button>
        </div>
        <div id="sipantau-map-search-suggestions" class="hidden mt-1.5 bg-white/98 backdrop-blur-md rounded-xl border border-gray-200 shadow-xl max-h-56 overflow-y-auto divide-y divide-gray-100 text-xs"></div>
      `;
      bgCanvas.appendChild(mapSearchBar);

      const mapInput = mapSearchBar.querySelector('#sipantau-map-address-input');
      const mapSubmit = mapSearchBar.querySelector('#sipantau-map-address-submit');
      const mapClear = mapSearchBar.querySelector('#sipantau-map-address-clear');
      const mapSuggestions = mapSearchBar.querySelector('#sipantau-map-search-suggestions');

      let searchMarker = null;

      async function executeMapSearch(query) {
        if (!query || !query.trim()) return;
        const q = query.trim();
        mapClear.classList.remove('hidden');
        mapSuggestions.classList.add('hidden');
        if (sideSearch) sideSearch.value = q;

        // Pertama: Cek apakah mencari tiket tertentu
        const tickets = getTickets();
        const matchedTicket = tickets.find((t) =>
          t.id.toLowerCase().includes(q.toLowerCase()) ||
          t.judul.toLowerCase().includes(q.toLowerCase())
        );
        if (matchedTicket) {
          selectedTicketId = matchedTicket.id;
          updatePopupCard(matchedTicket);
          renderMapMarkers();
          map.flyTo([matchedTicket.lat, matchedTicket.lng], 16, { duration: 1.2 });
          showToast(`Menemukan tiket ${matchedTicket.id}: ${matchedTicket.judul.slice(0, 40)}...`, 'success');
          return;
        }

        // Kedua: Geocoding Alamat / Nama Wilayah
        showToast(`Mencari alamat "${q}" pada peta...`, 'info');
        const geo = await forwardGeocode(q);
        if (geo) {
          map.flyTo([geo.lat, geo.lng], 16, { duration: 1.2 });

          if (searchMarker) map.removeLayer(searchMarker);

          const searchIcon = window.L.divIcon({
            className: 'sipantau-search-marker',
            html: `
              <div class="relative flex items-center justify-center animate-bounce">
                <span class="material-symbols-outlined text-4xl text-[#9E001F] drop-shadow-lg" style="font-variation-settings: 'FILL' 1;">location_on</span>
                <span class="absolute -top-1 -right-1 w-3 h-3 bg-amber-400 rounded-full animate-ping"></span>
              </div>
            `,
            iconSize: [36, 36],
            iconAnchor: [18, 36],
            popupAnchor: [0, -36]
          });

          searchMarker = window.L.marker([geo.lat, geo.lng], { icon: searchIcon }).addTo(map);
          searchMarker.bindPopup(`
            <div class="p-2 text-xs">
              <div class="font-bold text-[#9E001F] flex items-center gap-1 mb-1">
                <span class="material-symbols-outlined text-sm">place</span> Lokasi Ditemukan
              </div>
              <p class="text-gray-800 leading-snug">${geo.name}</p>
              <div class="mt-2 pt-2 border-t border-gray-200 flex justify-between items-center text-[10px] text-gray-500">
                <span>Lat: ${geo.lat.toFixed(4)}, Lng: ${geo.lng.toFixed(4)}</span>
                <button type="button" class="px-2 py-1 bg-[#9E001F] text-white rounded font-bold hover:bg-[#800019]" onclick="localStorage.setItem('SIPANTAU_DRAFT_COORDS', JSON.stringify({ lat: ${geo.lat}, lng: ${geo.lng} })); window.location.href=window.resolvePageUrl('formulir_pengaduan_multi_step_warga');">
                  Lapor di Sini
                </button>
              </div>
            </div>
          `, { minWidth: 260 }).openPopup();

          showToast(`Lokasi ditemukan: ${geo.name.slice(0, 45)}...`, 'success');
        } else {
          showToast(`Alamat "${q}" tidak ditemukan. Coba ketik nama jalan atau landmark lain.`, 'warning');
        }
      }

      mapSubmit.addEventListener('click', () => executeMapSearch(mapInput.value));
      mapInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          e.preventDefault();
          executeMapSearch(mapInput.value);
        }
      });
      mapClear.addEventListener('click', () => {
        mapInput.value = '';
        mapClear.classList.add('hidden');
        mapSuggestions.classList.add('hidden');
        if (searchMarker) {
          map.removeLayer(searchMarker);
          searchMarker = null;
        }
      });

      // Saran autocomplete landmark saat mengetik
      mapInput.addEventListener('input', (e) => {
        const val = e.target.value.trim().toLowerCase();
        if (val.length < 2) {
          mapSuggestions.classList.add('hidden');
          return;
        }
        const matches = BANDUNG_LANDMARKS.filter((lm) =>
          lm.name.toLowerCase().includes(val) || lm.keywords.some((k) => k.includes(val))
        ).slice(0, 5);

        if (matches.length > 0) {
          mapSuggestions.innerHTML = matches.map((m) => `
            <div class="suggestion-item p-2.5 hover:bg-gray-50 cursor-pointer flex items-center gap-2 transition" data-lat="${m.lat}" data-lng="${m.lng}" data-name="${m.name}">
              <span class="material-symbols-outlined text-gray-400 text-sm">location_on</span>
              <div class="truncate">
                <div class="font-bold text-gray-800">${m.name.split(',')[0]}</div>
                <div class="text-[10px] text-gray-500 truncate">${m.name}</div>
              </div>
            </div>
          `).join('');
          mapSuggestions.classList.remove('hidden');

          mapSuggestions.querySelectorAll('.suggestion-item').forEach((item) => {
            item.addEventListener('click', () => {
              const lat = parseFloat(item.dataset.lat);
              const lng = parseFloat(item.dataset.lng);
              const name = item.dataset.name;
              mapInput.value = name.split(',')[0];
              mapClear.classList.remove('hidden');
              mapSuggestions.classList.add('hidden');

              map.flyTo([lat, lng], 16, { duration: 1.2 });
              if (searchMarker) map.removeLayer(searchMarker);
              const searchIcon = window.L.divIcon({
                className: 'sipantau-search-marker',
                html: `
                  <div class="relative flex items-center justify-center animate-bounce">
                    <span class="material-symbols-outlined text-4xl text-[#9E001F] drop-shadow-lg" style="font-variation-settings: 'FILL' 1;">location_on</span>
                  </div>
                `,
                iconSize: [36, 36],
                iconAnchor: [18, 36]
              });
              searchMarker = window.L.marker([lat, lng], { icon: searchIcon }).addTo(map);
              searchMarker.bindPopup(`<b>${name.split(',')[0]}</b><br><span class="text-[11px] text-gray-600">${name}</span>`).openPopup();
              showToast(`Peta diarahkan ke: ${name.split(',')[0]}`, 'success');
            });
          });
        } else {
          mapSuggestions.classList.add('hidden');
        }
      });
    });
  }

  // 7. MODUL KHUSUS HALAMAN FORMULIR PENGADUAN MULTI-STEP WARGA
  function initCitizenFormPage() {
    if (!window.location.pathname.includes('formulir_pengaduan')) return;

    // A. Karakter Counter pada Kronologi (#deskripsi)
    const descEl = document.getElementById('deskripsi');
    if (descEl) {
      const counterSpan = descEl.previousElementSibling?.querySelector('span:last-child');
      const updateCounter = () => {
        if (counterSpan) counterSpan.textContent = `${descEl.value.length} / 1.000 Karakter`;
      };
      descEl.addEventListener('input', updateCounter);
      updateCounter();
    }

    // B. Auto-Triase Rekomendasi Dinas berdasarkan Kategori
    const katSelect = document.getElementById('kategori');
    const insSelect = document.getElementById('instansi');
    if (katSelect && insSelect) {
      katSelect.addEventListener('change', () => {
        const val = katSelect.value.toLowerCase();
        if (val.includes('jalan')) insSelect.selectedIndex = 0;
        else if (val.includes('pju') || val.includes('penerangan')) insSelect.selectedIndex = 1;
        else if (val.includes('drainase') || val.includes('banjir') || val.includes('sampah')) insSelect.selectedIndex = 2;
        else insSelect.selectedIndex = 3;
        showToast(`Triase AI mengarahkan ke: ${insSelect.value}`, 'info');
      });
    }

    // C. Peta Interaktif Geotagging Presisi + Nominatim Reverse Geocoding API
    const mapBox = document.querySelector('div[data-location="Bandung"]')?.parentElement || document.querySelector('div.relative.h-64') || document.querySelector('div.relative.h-72');
    const latInputs = document.querySelectorAll('input[readonly]');
    const latInput = latInputs[0];
    const lngInput = latInputs[1];
    const alamatInput = document.getElementById('alamat');

    if (mapBox) {
      const bgMock = mapBox.querySelector('div[data-location]');
      if (bgMock) bgMock.style.display = 'none';
      const centerPinOverlay = mapBox.querySelector('div.pointer-events-none');
      if (centerPinOverlay) centerPinOverlay.style.display = 'none';

      const formMapDiv = document.createElement('div');
      formMapDiv.id = 'sipantau-form-map';
      formMapDiv.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;z-index:5;';
      mapBox.style.isolation = 'isolate';
      mapBox.style.zIndex = '10';
      mapBox.prepend(formMapDiv);

      ensureLeaflet(() => {
        let startLat = -6.890451;
        let startLng = 107.597824;
        try {
          const saved = JSON.parse(localStorage.getItem('SIPANTAU_DRAFT_COORDS') || 'null');
          if (saved && saved.lat) {
            startLat = saved.lat;
            startLng = saved.lng;
            localStorage.removeItem('SIPANTAU_DRAFT_COORDS');
          }
        } catch (e) {}

        const map = window.L.map('sipantau-form-map', { zoomControl: false }).setView([startLat, startLng], 16);
        window.L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '&copy; OpenStreetMap contributors',
          maxZoom: 19
        }).addTo(map);

        const pin = window.L.marker([startLat, startLng], {
          draggable: true,
          icon: createCivicPin('Diajukan', true)
        }).addTo(map);

        async function syncCoordinates(lat, lng) {
          if (latInput) latInput.value = lat.toFixed(6);
          if (lngInput) lngInput.value = lng.toFixed(6);
          showToast('Mengambil alamat jalan otomatis dari koordinat...', 'info');
          const addr = await reverseGeocode(lat, lng);
          if (alamatInput) alamatInput.value = addr;
          showToast('Titik koordinat & alamat geotagging diperbarui!', 'success');
        }

        pin.on('dragend', () => {
          const pos = pin.getLatLng();
          syncCoordinates(pos.lat, pos.lng);
        });

        map.on('click', (e) => {
          pin.setLatLng(e.latlng);
          syncCoordinates(e.latlng.lat, e.latlng.lng);
        });

        // Tombol Zoom +/- di dalam kotak peta
        const zoomBtns = mapBox.querySelectorAll('button');
        if (zoomBtns[0]) zoomBtns[0].onclick = () => map.zoomIn();
        if (zoomBtns[1]) zoomBtns[1].onclick = () => map.zoomOut();

        // Sembunyikan badge akurasi statik agar rapi saat search bar ditampilkan
        const oldAccuracyBadge = mapBox.querySelector('div.absolute.top-3.left-3');
        if (oldAccuracyBadge) oldAccuracyBadge.style.display = 'none';

        // ==========================================================
        // FLOATING MAP ADDRESS SEARCH BAR PADA FORMULIR PENGADUAN
        // ==========================================================
        const formMapSearchBar = document.createElement('div');
        formMapSearchBar.className = 'sipantau-form-search-bar absolute top-3 left-3 max-w-xs sm:max-w-sm w-[calc(100%-80px)] sm:w-80 transition-all pointer-events-auto';
        formMapSearchBar.style.zIndex = '800';
        formMapSearchBar.innerHTML = `
          <div class="relative flex items-center bg-white/95 backdrop-blur-md rounded-xl border border-gray-300 shadow-md overflow-hidden focus-within:ring-2 focus-within:ring-[#9E001F] focus-within:border-[#9E001F]">
            <span class="material-symbols-outlined ml-2.5 text-gray-400 text-[18px] shrink-0">search</span>
            <input type="text" id="sipantau-form-address-input" class="w-full py-1.5 px-2 text-xs text-gray-900 bg-transparent focus:outline-none placeholder:text-gray-400 font-medium" placeholder="Cari nama jalan / patokan di peta..." />
            <button type="button" id="sipantau-form-address-clear" class="hidden text-gray-400 hover:text-gray-700 p-1">
              <span class="material-symbols-outlined text-[16px]">close</span>
            </button>
            <button type="button" id="sipantau-form-address-submit" class="px-2.5 py-1 bg-[#9E001F] hover:bg-[#800019] text-white text-[11px] font-bold shrink-0 transition rounded-lg mr-1 shadow-2xs">
              Cari
            </button>
          </div>
          <div id="sipantau-form-search-suggestions" class="hidden mt-1 bg-white/98 backdrop-blur-md rounded-xl border border-gray-200 shadow-xl max-h-48 overflow-y-auto divide-y divide-gray-100 text-xs"></div>
        `;
        mapBox.appendChild(formMapSearchBar);

        const formInput = formMapSearchBar.querySelector('#sipantau-form-address-input');
        const formSubmit = formMapSearchBar.querySelector('#sipantau-form-address-submit');
        const formClear = formMapSearchBar.querySelector('#sipantau-form-address-clear');
        const formSuggestions = formMapSearchBar.querySelector('#sipantau-form-search-suggestions');

        async function executeFormMapSearch(query) {
          if (!query || !query.trim()) return;
          const q = query.trim();
          formClear.classList.remove('hidden');
          formSuggestions.classList.add('hidden');

          showToast(`Mencari alamat "${q}" pada peta...`, 'info');
          const geo = await forwardGeocode(q);
          if (geo) {
            map.flyTo([geo.lat, geo.lng], 17, { duration: 1.0 });
            pin.setLatLng([geo.lat, geo.lng]);
            if (latInput) latInput.value = geo.lat.toFixed(6);
            if (lngInput) lngInput.value = geo.lng.toFixed(6);
            if (alamatInput) alamatInput.value = geo.name;
            showToast(`Lokasi ditemukan: ${geo.name.slice(0, 45)}... Titik geotagging dikunci!`, 'success');
          } else {
            showToast(`Alamat "${q}" tidak ditemukan. Silakan geser pin manual pada peta.`, 'warning');
          }
        }

        formSubmit.addEventListener('click', () => executeFormMapSearch(formInput.value));
        formInput.addEventListener('keydown', (e) => {
          if (e.key === 'Enter') {
            e.preventDefault();
            executeFormMapSearch(formInput.value);
          }
        });
        formClear.addEventListener('click', () => {
          formInput.value = '';
          formClear.classList.add('hidden');
          formSuggestions.classList.add('hidden');
        });

        formInput.addEventListener('input', (e) => {
          const val = e.target.value.trim().toLowerCase();
          if (val.length < 2) {
            formSuggestions.classList.add('hidden');
            return;
          }
          const matches = BANDUNG_LANDMARKS.filter((lm) =>
            lm.name.toLowerCase().includes(val) || lm.keywords.some((k) => k.includes(val))
          ).slice(0, 4);

          if (matches.length > 0) {
            formSuggestions.innerHTML = matches.map((m) => `
              <div class="form-suggestion-item p-2 hover:bg-gray-50 cursor-pointer flex items-center gap-2 transition" data-lat="${m.lat}" data-lng="${m.lng}" data-name="${m.name}">
                <span class="material-symbols-outlined text-gray-400 text-xs">location_on</span>
                <div class="truncate">
                  <div class="font-bold text-gray-800 text-[11px]">${m.name.split(',')[0]}</div>
                  <div class="text-[10px] text-gray-500 truncate">${m.name}</div>
                </div>
              </div>
            `).join('');
            formSuggestions.classList.remove('hidden');

            formSuggestions.querySelectorAll('.form-suggestion-item').forEach((item) => {
              item.addEventListener('click', () => {
                const lat = parseFloat(item.dataset.lat);
                const lng = parseFloat(item.dataset.lng);
                const name = item.dataset.name;
                formInput.value = name.split(',')[0];
                formClear.classList.remove('hidden');
                formSuggestions.classList.add('hidden');

                map.flyTo([lat, lng], 17, { duration: 1.0 });
                pin.setLatLng([lat, lng]);
                if (latInput) latInput.value = lat.toFixed(6);
                if (lngInput) lngInput.value = lng.toFixed(6);
                if (alamatInput) alamatInput.value = name;
                showToast(`Pin dipindahkan ke: ${name.split(',')[0]}!`, 'success');
              });
            });
          } else {
            formSuggestions.classList.add('hidden');
          }
        });

        // Tombol "Gunakan GPS Saat Ini"
        document.querySelectorAll('button').forEach((btn) => {
          if ((btn.textContent || '').includes('Gunakan GPS Saat Ini')) {
            btn.onclick = () => {
              if (!navigator.geolocation) return showToast('Browser tidak mendukung GPS.', 'warning');
              showToast('Mengunci titik GPS presisi perangkat Anda...', 'info');
              navigator.geolocation.getCurrentPosition(
                (pos) => {
                  const { latitude, longitude } = pos.coords;
                  map.setView([latitude, longitude], 17);
                  pin.setLatLng([latitude, longitude]);
                  syncCoordinates(latitude, longitude);
                },
                () => showToast('Akses lokasi ditolak. Geser pin secara manual pada peta.', 'warning')
              );
            };
          }
        });
      });
    }

    // D. Upload Lampiran Bukti Lapangan (Drag & Drop + Pilih Berkas + Hapus)
    const dropzone = document.querySelector('div.border-dashed');
    const filesGrid = dropzone?.nextElementSibling;
    if (dropzone && filesGrid) {
      const hiddenFileInput = document.createElement('input');
      hiddenFileInput.type = 'file';
      hiddenFileInput.multiple = true;
      hiddenFileInput.accept = 'image/*,.pdf';
      hiddenFileInput.className = 'hidden';
      document.body.appendChild(hiddenFileInput);

      dropzone.addEventListener('click', () => hiddenFileInput.click());
      hiddenFileInput.addEventListener('change', (e) => {
        Array.from(e.target.files || []).forEach((file) => {
          const reader = new FileReader();
          reader.onload = (ev) => {
            const card = document.createElement('div');
            card.className = 'flex items-center gap-3 p-3 rounded-xl border border-outline-variant bg-surface-container-lowest shadow-sm hover:border-outline transition';
            card.innerHTML = `
              <img src="${ev.target.result}" alt="${file.name}" class="w-14 h-14 rounded-lg object-cover flex-shrink-0 border border-outline-variant/60" />
              <div class="flex-grow min-w-0">
                <p class="text-label-md font-label-md text-on-surface truncate">${file.name}</p>
                <div class="flex items-center gap-2 text-label-sm font-label-sm text-on-surface-variant mt-0.5">
                  <span>${(file.size / (1024 * 1024)).toFixed(2)} MB</span>
                  <span>•</span>
                  <span class="text-emerald-700 font-semibold flex items-center gap-0.5">
                    <span class="material-symbols-outlined text-xs">check_circle</span> Terverifikasi EXIF
                  </span>
                </div>
              </div>
              <button type="button" class="p-2 text-on-surface-variant hover:text-error hover:bg-error-container/40 rounded-lg transition">
                <span class="material-symbols-outlined text-lg">delete</span>
              </button>
            `;
            card.querySelector('button').onclick = () => {
              card.remove();
              showToast('Lampiran berkas dihapus.', 'info');
            };
            filesGrid.appendChild(card);
            showToast(`Berkas "${file.name}" berhasil dilampirkan!`, 'success');
          };
          reader.readAsDataURL(file);
        });
      });

      // Aktifkan tombol hapus pada file contoh bawaan
      filesGrid.querySelectorAll('button').forEach((btn) => {
        btn.onclick = () => {
          btn.closest('div.flex.items-center')?.remove();
          showToast('Berkas lampiran dihapus.', 'info');
        };
      });
    }

    // E. Interaktivitas Modal Deteksi Laporan Serupa (#duplicate-modal)
    const dupModal = document.getElementById('duplicate-modal');
    if (dupModal) {
      // Tombol Tutup / Dismiss Modal Duplikasi
      dupModal.querySelectorAll('button').forEach((btn) => {
        const txt = (btn.textContent || '').trim().toLowerCase();
        if (txt.includes('close') || txt.includes('lanjutkan') || txt.includes('batal') || btn.querySelector('span.material-symbols-outlined')?.textContent === 'close') {
          btn.addEventListener('click', (e) => {
            e.preventDefault();
            dupModal.classList.add('hidden');
            dupModal.style.display = 'none';
            showToast('Melanjutkan pengisian formulir pengaduan baru...', 'info');
          });
        }
      });

      const supportBtn = dupModal.querySelector('button.bg-primary-container') || dupModal.querySelector('button.bg-primary') || dupModal.querySelector('button[class*="primary"]');
      if (supportBtn) {
        let count = 58;
        supportBtn.onclick = () => {
          count += 1;
          supportBtn.innerHTML = `<span class="material-symbols-outlined text-base" style="font-variation-settings:'FILL' 1;">thumb_up</span><span>Tercatat! Anda Mendukung Laporan Ini (+${count} Dukungan)</span>`;
          showToast('Dukungan kolektif Anda ditambahkan ke tiket #LAPOR-2024-8842!', 'success');
        };
      }
    }

    // F. Alur Pratinjau Formulir Aduan Warga (Langkah 4: Rekapitulasi & Konfirmasi Sebelum Terbit)
    const formEl = document.querySelector('form');
    if (formEl) {
      function showFormPreviewModal(ticketData, onConfirmed) {
        let pModal = document.getElementById('sipantau-form-preview-modal');
        if (!pModal) {
          pModal = document.createElement('div');
          pModal.id = 'sipantau-form-preview-modal';
          pModal.className = 'fixed inset-0 z-[10002] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm';
          document.body.appendChild(pModal);
        }
        pModal.innerHTML = `
          <div class="bg-white rounded-2xl max-w-xl w-full border border-[#e5bdbb] shadow-2xl overflow-hidden flex flex-col max-h-[90vh] animate-in fade-in zoom-in-95 duration-150">
            <div class="bg-[#9e001f] text-white p-4 md:p-5 flex items-center justify-between shrink-0">
              <div class="flex items-center gap-2.5">
                <span class="material-symbols-outlined text-2xl">rate_review</span>
                <div>
                  <h3 class="font-bold text-base md:text-lg">Pratinjau Aduan Sebelum Diterbitkan</h3>
                  <p class="text-xs text-[#ffdad8]">Langkah 4: Periksa kembali keabsahan data & lokasi Anda</p>
                </div>
              </div>
              <button type="button" id="btn-close-form-preview" class="p-1 rounded-lg hover:bg-white/20 transition text-white">
                <span class="material-symbols-outlined">close</span>
              </button>
            </div>
            
            <div class="p-5 space-y-4 overflow-y-auto flex-1 text-xs">
              <div class="p-4 rounded-xl bg-[#fbf8fe] border border-[#e5bdbb] space-y-2">
                <div class="flex items-center justify-between">
                  <span class="px-2.5 py-0.5 rounded-full bg-[#ffdad8] text-[#9e001f] font-bold uppercase text-[10px]">Tingkat Urgensi: ${ticketData.urgensi}</span>
                  <span class="text-emerald-700 font-bold flex items-center gap-1">
                    <span class="material-symbols-outlined text-sm">verified</span> Validasi EXIF & GPS
                  </span>
                </div>
                <h4 class="font-bold text-base text-[#1b1b1f]">${ticketData.judul}</h4>
                <p class="text-gray-700 leading-relaxed italic">"${ticketData.deskripsi}"</p>
              </div>

              <div class="grid grid-cols-2 gap-3 p-3.5 bg-gray-50 rounded-xl border border-gray-200">
                <div>
                  <span class="text-gray-500 block text-[10px] font-bold uppercase">Kategori Pengaduan</span>
                  <strong class="text-black text-xs">${ticketData.kategoriLabel}</strong>
                </div>
                <div>
                  <span class="text-gray-500 block text-[10px] font-bold uppercase">Disposisi Instansi OPD</span>
                  <strong class="text-[#9e001f] text-xs font-bold">${ticketData.dinas}</strong>
                </div>
                <div>
                  <span class="text-gray-500 block text-[10px] font-bold uppercase">Titik Alamat Lapangan</span>
                  <span class="text-gray-800 text-xs">${ticketData.alamat}</span>
                </div>
                <div>
                  <span class="text-gray-500 block text-[10px] font-bold uppercase">Koordinat Geotag GPS</span>
                  <span class="font-mono text-xs text-gray-700">${ticketData.lat.toFixed(6)}, ${ticketData.lng.toFixed(6)}</span>
                </div>
              </div>

              ${ticketData.foto ? `
                <div>
                  <span class="text-gray-500 block text-[10px] font-bold uppercase mb-1">Bukti Foto Terlampir:</span>
                  <img src="${ticketData.foto}" alt="Bukti Lapangan" class="w-full max-h-48 object-cover rounded-xl border border-gray-300" />
                </div>
              ` : ''}

              <div class="p-3 bg-amber-50 border border-amber-200 rounded-xl text-amber-900 flex items-start gap-2">
                <span class="material-symbols-outlined text-amber-700 text-base shrink-0 mt-0.5">info</span>
                <p class="text-[11px] leading-relaxed">
                  Laporan Anda akan dicatat resmi dalam antrean triase pemda dan diterbitkan Surat Tanda Terima Aduan ber-QR Code resmi.
                </p>
              </div>
            </div>

            <div class="p-4 bg-gray-50 border-t border-gray-200 flex items-center justify-between gap-3 shrink-0">
              <button type="button" id="btn-edit-form-preview" class="px-4 py-2 rounded-xl border border-gray-300 bg-white text-gray-700 hover:bg-gray-100 font-semibold text-xs transition">
                ← Ubah / Perbaiki Data
              </button>
              <button type="button" id="btn-confirm-publish-report" class="px-5 py-2 rounded-xl bg-[#c8102e] hover:bg-[#9e001f] text-white font-bold text-xs transition flex items-center gap-1.5 shadow-md">
                <span class="material-symbols-outlined text-sm">send</span> Konfirmasi & Terbitkan Laporan
              </button>
            </div>
          </div>
        `;
        pModal.classList.remove('hidden');
        pModal.querySelector('#btn-close-form-preview').onclick = () => pModal.classList.add('hidden');
        pModal.querySelector('#btn-edit-form-preview').onclick = () => pModal.classList.add('hidden');
        pModal.querySelector('#btn-confirm-publish-report').onclick = () => {
          pModal.classList.add('hidden');
          onConfirmed();
        };
      }

      function showFormSuccessModal(newTicket) {
        let sModal = document.getElementById('sipantau-form-success-modal');
        if (!sModal) {
          sModal = document.createElement('div');
          sModal.id = 'sipantau-form-success-modal';
          sModal.className = 'fixed inset-0 z-[10003] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm';
          document.body.appendChild(sModal);
        }
        sModal.innerHTML = `
          <div class="bg-white rounded-2xl max-w-md w-full border-2 border-emerald-500 shadow-2xl p-6 text-center space-y-4 animate-in fade-in zoom-in-95">
            <div class="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto shadow-md">
              <span class="material-symbols-outlined text-3xl font-bold">check_circle</span>
            </div>
            <div>
              <span class="text-xs uppercase font-bold tracking-wider text-emerald-800">Laporan Resmi Diterbitkan</span>
              <h3 class="text-xl font-extrabold text-[#1b1b1f] mt-1">${newTicket.id}</h3>
              <p class="text-xs text-gray-600 mt-1">Laporan Anda telah berhasil masuk ke antrean triase OPD terkait dan siap dipantau.</p>
            </div>

            <div class="p-3 bg-gray-50 rounded-xl border border-gray-200 text-xs text-left space-y-1">
              <div>Instansi Penanggung Jawab: <strong class="text-black">${newTicket.dinas}</strong></div>
              <div>Batas Tanggap Awal: <strong class="text-amber-700">Maksimal 4 Jam (SLA)</strong></div>
            </div>

            <div class="space-y-2 pt-2">
              <button type="button" id="btn-print-from-success" class="w-full py-2.5 px-4 rounded-xl bg-[#9e001f] hover:bg-[#800019] text-white font-bold text-xs transition flex items-center justify-center gap-1.5 shadow-sm">
                <span class="material-symbols-outlined text-base">print</span> Cetak Bukti Tanda Terima (PDF)
              </button>
              <button type="button" id="btn-go-to-map" class="w-full py-2.5 px-4 rounded-xl border border-gray-300 bg-white hover:bg-gray-100 text-gray-700 font-semibold text-xs transition">
                Pantau Laporan di Peta Kolektif Warga →
              </button>
            </div>
          </div>
        `;
        sModal.classList.remove('hidden');
        sModal.querySelector('#btn-print-from-success').onclick = () => {
          openPrintableReceipt(newTicket);
        };
        sModal.querySelector('#btn-go-to-map').onclick = () => {
          if (window.parent !== window) {
            window.parent.postMessage({ type: 'sipantau:navigate', page: 'peta' }, '*');
          } else {
            window.location.href = resolvePageUrl('peta_pengaduan_kolektif_warga');
          }
        };
      }

      formEl.addEventListener('submit', (e) => {
        e.preventDefault();
        const judul = document.getElementById('judul')?.value.trim() || 'Laporan Kerusakan Fasilitas Umum';
        const kategoriLabel = document.getElementById('kategori')?.value || 'Infrastruktur Jalan & Jembatan';
        const dinas = document.getElementById('instansi')?.value || 'Dinas Bina Marga & Penataan Ruang';
        const deskripsi = document.getElementById('deskripsi')?.value.trim() || '-';
        const alamat = document.getElementById('alamat')?.value.trim() || 'Kota Bandung';
        const lat = parseFloat(latInput?.value || '-6.890451');
        const lng = parseFloat(lngInput?.value || '107.597824');
        const firstImg = document.querySelector('div.grid.grid-cols-1.md\\:grid-cols-2 img')?.src || 'https://lh3.googleusercontent.com/aida-public/AB6AXuDF8T8kAUNM-_2HbGnXu8uBKMJ2muGoOIIVwsW-LJXlvjeUyggI0kmrcFyCrJjw5DGqCVi2YjGD6kjq4_gY3-wkkU7CUJuk3ewvRC13mHt8lJyLnqVDv-klbEXOR1R1qkaKxAKpJP1LKp9Pib0NfqapWtlBZyChM_CTjE5aay9TegQ8LnoxrCAjItLPcfcuLGBXQVWqAm4o_HFnPV0BLEExLo7eqWfAbvwqq5KEy88';

        const ticketData = {
          judul,
          kategori: kategoriLabel.includes('Jalan') ? 'Jalan Rusak' : kategoriLabel.includes('Sampah') ? 'Sampah & Kebersihan' : kategoriLabel.includes('PJU') ? 'Lampu Jalan PJU' : 'Drainase / Banjir',
          kategoriLabel,
          dinas,
          alamat,
          lat,
          lng,
          deskripsi,
          foto: firstImg,
          urgensi: 'Tinggi'
        };

        // Buka Step 4 Pratinjau Modal untuk Warga memeriksa rekapitulasi data sebelum final submit
        showFormPreviewModal(ticketData, () => {
          const randomNum = Math.floor(1000 + Math.random() * 9000);
          const newId = `#TKT-2026-${randomNum}`;
          const newTicket = {
            id: newId,
            code: `TKT-2026-${randomNum}`,
            judul: ticketData.judul,
            kategori: ticketData.kategori,
            kategoriLabel: ticketData.kategoriLabel,
            dinas: ticketData.dinas,
            alamat: ticketData.alamat,
            kecamatan: 'Kec. Sukajadi',
            waktu: 'Baru saja',
            sla: 'SLA 4j 00m',
            urgensi: ticketData.urgensi,
            triaseLevel: 'Triase Level 1',
            status: 'Diajukan',
            upvotes: 1,
            lat: ticketData.lat,
            lng: ticketData.lng,
            pelapor: 'Budi Pratama (Warga Terverifikasi)',
            nik: '327320******0004',
            telepon: '+62 812-****-8800',
            deskripsi: ticketData.deskripsi,
            foto: ticketData.foto,
            petugas: 'Menunggu Verifikator',
            timeline: [
              { tahap: 'Laporan Diajukan Warga', waktu: 'Baru saja', keterangan: 'Laporan berhasil dikirim beserta koordinat geotagging presisi.', done: true },
              { tahap: 'Verifikasi & Disposisi Petugas', waktu: 'Menunggu', keterangan: `Menunggu verifikasi diteruskan ke ${ticketData.dinas}.`, active: true },
              { tahap: 'Penanganan Regu Teknis OPD', waktu: '-', keterangan: '-', done: false },
              { tahap: 'Selesai & Evaluasi Publik', waktu: '-', keterangan: '-', done: false }
            ]
          };

          const list = getTickets();
          list.unshift(newTicket);
          saveTickets(list);

          showToast(`Laporan Berhasil Diterbitkan! Nomor Tiket: ${newId}`, 'success');
          showFormSuccessModal(newTicket);
        });
      });
    }
  }

  // 8. MODUL KHUSUS DASHBOARD PETUGAS (MELENGKAPI DRAWER KANAN YANG TERPOTONG & TABEL DINAMIS)
  function initOfficerDashboardPage() {
    if (!window.location.pathname.includes('dashboard_petugas')) return;

    // A. Perbaiki gambar placeholder Stitch yang rusak (stitch-placeholder-300x300.svg)
    document.querySelectorAll('img[src*="stitch-placeholder"]').forEach((img, idx) => {
      if (idx === 0) {
        img.src = 'data:image/svg+xml;utf8,' + encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" rx="14" fill="#9e001f"/><path d="M32 12L14 22v6h36v-6L32 12zm-12 12v18h6V24h-6zm9 0v18h6V24h-6zm9 0v18h6V24h-6zM14 46v6h36v-6H14z" fill="#ffffff"/></svg>`);
      } else {
        img.src = 'https://lh3.googleusercontent.com/aida-public/AB6AXuCjtOv8z9Fz-RBIIQvANS9l5iZuciVQUr6Iv2XdfoCd5GLwGehOXAIUO8bhgSSeQRpVnimB5Hrm5jA1_dShD_6lQfpal4O0m76okjB-5eIRAqBAqXi3ZhmS8NcQTmEyHXPhjkvHsfbTdmf03kBvYOMgrMAt-JrZr--JkcCmplHfWPDMsIdbhfeGF5oOd4SRoitEOayitXBvmACLNKKC15rfGe-u842YKsdbuO2f4R8';
      }
    });

    const drawerAside = document.querySelector('aside.w-\\[450px\\]') || document.querySelector('aside');
    const tbody = document.querySelector('table tbody');
    if (!drawerAside || !tbody) return;

    let selectedTicket = getTickets()[1] || getTickets()[0];
    let activeTabFilter = 'Semua';
    let tableSearchQuery = '';
    let activeOpdFilter = 'Semua';

    // B. Lengkapi Struktur HTML Drawer Kanan yang Terpotong pada Eksport Stitch
    function renderDrawer(ticket) {
      if (!ticket) return;
      selectedTicket = ticket;

      drawerAside.innerHTML = `
        <!-- Drawer Header -->
        <div class="p-5 border-b border-outline-variant bg-surface-container-lowest flex items-start justify-between shrink-0 gap-3">
          <div class="flex-1 min-w-0">
            <div class="flex flex-wrap items-center gap-2 mb-1">
              <span class="px-2 py-0.5 text-label-sm font-label-sm rounded bg-primary-fixed text-primary font-mono font-bold">${ticket.id}</span>
              <span class="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-error-container text-on-error-container text-label-sm font-label-sm font-bold">
                <span class="w-1.5 h-1.5 rounded-full bg-error animate-ping"></span> URGENSI ${(ticket.urgensi || 'TINGGI').toUpperCase()}
              </span>
              <span class="px-2 py-0.5 rounded-full text-[11px] font-bold bg-surface-container text-on-surface">${ticket.status}</span>
            </div>
            <h2 class="text-headline-sm font-headline-sm font-bold text-on-surface leading-tight mt-1">${ticket.judul}</h2>
          </div>
          <button type="button" id="btn-print-drawer-ticket" class="px-3 py-1.5 rounded-xl border border-outline-variant bg-surface-container-low hover:bg-[#ffdad8]/60 text-primary text-xs font-bold flex items-center gap-1.5 transition shrink-0 shadow-2xs" title="Cetak Surat Tanda Terima Resmi">
            <span class="material-symbols-outlined text-sm">print</span> Cetak Tanda Terima
          </button>
        </div>

        <!-- Drawer Scrollable Content -->
        <div class="flex-1 overflow-y-auto p-5 space-y-5">
          <!-- Section 1: Pelapor Info (Lengkap) -->
          <div class="bg-surface-container-low p-4 rounded-xl border border-outline-variant">
            <div class="flex items-center justify-between mb-2">
              <span class="text-label-md font-label-md text-on-surface font-semibold flex items-center gap-1.5">
                <span class="material-symbols-outlined text-primary text-base">verified_user</span>
                Pelapor: Warga Terverifikasi
              </span>
              <span class="text-[10px] px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold uppercase tracking-wider">Akun Terpadu</span>
            </div>
            <div class="grid grid-cols-2 gap-2.5 text-xs pt-1">
              <div>
                <span class="text-outline block">Nama Lengkap:</span>
                <span class="font-semibold text-on-surface">${ticket.pelapor}</span>
              </div>
              <div>
                <span class="text-outline block">NIK Terdaftar:</span>
                <span class="font-mono text-on-surface">${ticket.nik}</span>
              </div>
              <div>
                <span class="text-outline block">Nomor Telepon:</span>
                <span class="font-mono text-on-surface">${ticket.telepon}</span>
              </div>
              <div>
                <span class="text-outline block">Dukungan Warga:</span>
                <span class="font-bold text-primary">${ticket.upvotes || 1} Warga Mendukung</span>
              </div>
            </div>
          </div>

          <!-- Section 2: Kronologi & Bukti Foto + Peta Mini API -->
          <div class="space-y-3">
            <h3 class="text-label-md font-label-md text-on-surface font-bold uppercase tracking-wider text-xs flex items-center gap-1.5">
              <span class="material-symbols-outlined text-primary text-base">description</span>
              Substansi Laporan & Geotagging Lapangan
            </h3>
            <p class="text-xs text-on-surface bg-surface-container-low p-3.5 rounded-xl border border-outline-variant leading-relaxed">
              "${ticket.deskripsi}"
            </p>
            <div class="grid grid-cols-2 gap-3">
              <div class="rounded-xl overflow-hidden border border-outline-variant relative h-32 bg-surface-container">
                <img src="${ticket.foto}" alt="Bukti Lapangan" class="w-full h-full object-cover" />
                <span class="absolute bottom-1.5 left-1.5 px-2 py-0.5 rounded bg-black/75 text-white text-[10px] font-semibold">Bukti Foto EXIF</span>
              </div>
              <div class="rounded-xl overflow-hidden border border-outline-variant relative h-32 bg-surface-container">
                <div id="drawer-mini-map" class="w-full h-full"></div>
              </div>
            </div>
            <div class="flex items-center justify-between text-[11px] text-on-surface-variant bg-surface-container-low px-3 py-2 rounded-lg border border-outline-variant/60">
              <span class="truncate"><strong class="text-on-surface">Lokasi:</strong> ${ticket.alamat}</span>
              <span class="font-mono shrink-0 ml-2">${ticket.lat.toFixed(4)}, ${ticket.lng.toFixed(4)}</span>
            </div>
          </div>

          <!-- Section 3: Linimasa Progres Triase -->
          <div class="space-y-2.5">
            <h3 class="text-label-md font-label-md text-on-surface font-bold uppercase tracking-wider text-xs flex items-center gap-1.5">
              <span class="material-symbols-outlined text-primary text-base">timeline</span>
              Linimasa Triase & Riwayat Tindakan
            </h3>
            <div class="space-y-2.5 pl-2 border-l-2 border-outline-variant">
              ${(ticket.timeline || []).map((st) => `
                <div class="pl-3 relative">
                  <span class="w-2.5 h-2.5 rounded-full absolute -left-[19px] top-1 ${st.done ? 'bg-emerald-600' : st.active ? 'bg-primary' : 'bg-gray-300'}"></span>
                  <div class="flex justify-between text-xs font-semibold text-on-surface">
                    <span>${st.tahap}</span>
                    <span class="text-[10px] font-mono text-outline">${st.waktu}</span>
                  </div>
                  <p class="text-[11px] text-on-surface-variant">${st.keterangan}</p>
                </div>
              `).join('')}
            </div>
          </div>

          <!-- Section 4: Form Keputusan Verifikasi & Disposisi OPD -->
          <div class="bg-surface-container-low p-4 rounded-xl border border-outline-variant space-y-3">
            <h3 class="text-label-md font-label-md text-primary font-bold flex items-center gap-1.5">
              <span class="material-symbols-outlined text-base">send</span>
              Formulir Instruksi Disposisi OPD
            </h3>
            <div>
              <label class="block text-xs font-semibold text-on-surface mb-1">Dinas / OPD Teknis Tujuan</label>
              <select id="drawer-opd-select" class="w-full rounded-lg border border-outline-variant bg-white px-3 py-2 text-xs text-on-surface focus:border-primary">
                <option value="Perumda Tirtawening (PDAM)" ${ticket.dinas.includes('PDAM') ? 'selected' : ''}>Perumda Tirtawening (PDAM)</option>
                <option value="Dinas Bina Marga & Tata Ruang" ${ticket.dinas.includes('Bina Marga') ? 'selected' : ''}>Dinas Bina Marga & Tata Ruang</option>
                <option value="Dinas Perhubungan" ${ticket.dinas.includes('Perhubungan') ? 'selected' : ''}>Dinas Perhubungan</option>
                <option value="Dinas Lingkungan Hidup" ${ticket.dinas.includes('Lingkungan') ? 'selected' : ''}>Dinas Lingkungan Hidup</option>
                <option value="DPKP3 & Damkar" ${ticket.dinas.includes('Damkar') ? 'selected' : ''}>DPKP3 & Damkar</option>
                <option value="Satuan Polisi Pamong Praja" ${ticket.dinas.includes('Polisi') ? 'selected' : ''}>Satuan Polisi Pamong Praja</option>
              </select>
            </div>
            <div>
              <label class="block text-xs font-semibold text-on-surface mb-1">Catatan Instruksi Verifikator</label>
              <textarea id="drawer-note-input" rows="2" placeholder="Tuliskan instruksi tindak lanjut untuk regu teknis OPD..." class="w-full rounded-lg border border-outline-variant bg-white p-2.5 text-xs text-on-surface focus:border-primary"></textarea>
            </div>
          </div>

          <!-- Section 5: Komunikasi Dua Arah Petugas & Warga -->
          <div id="drawer-thread-container-${ticket.id.replace('#', '')}" class="pt-2"></div>
        </div>

        <!-- Sticky Footer Action Buttons -->
        <div class="p-4 border-t border-outline-variant bg-surface-container-lowest flex items-center gap-2.5 shrink-0">
          <button type="button" id="btn-drawer-reject" class="px-3.5 py-2.5 rounded-lg bg-[#FDECEF] text-[#C8102E] hover:bg-[#C8102E] hover:text-white font-semibold text-xs transition flex items-center gap-1">
            <span class="material-symbols-outlined text-sm">cancel</span> Tolak
          </button>
          <button type="button" id="btn-drawer-complete" class="px-3.5 py-2.5 rounded-lg border border-emerald-600 text-emerald-700 hover:bg-emerald-50 font-semibold text-xs transition flex items-center gap-1">
            <span class="material-symbols-outlined text-sm">task_alt</span> Tandai Selesai
          </button>
          <button type="button" id="btn-drawer-verify" class="flex-1 py-2.5 px-4 rounded-lg bg-[#C8102E] hover:bg-[#9B0B22] text-white font-semibold text-xs shadow-sm transition flex items-center justify-center gap-1.5">
            <span class="material-symbols-outlined text-sm">check_circle</span> Verifikasi & Disposisi
          </button>
        </div>
      `;

      // Inisialisasi Mini-Map Leaflet di dalam Drawer
      ensureLeaflet(() => {
        const mapEl = document.getElementById('drawer-mini-map');
        if (!mapEl) return;
        const mMap = window.L.map(mapEl, { zoomControl: false, attributionControl: false }).setView([ticket.lat, ticket.lng], 15);
        window.L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(mMap);
        window.L.marker([ticket.lat, ticket.lng], { icon: createCivicPin(ticket.status, true) }).addTo(mMap);
      });

      // Render Komunikasi Dua Arah Petugas & Warga
      renderDiscussionThread(
        drawerAside.querySelector(`#drawer-thread-container-${ticket.id.replace('#', '')}`),
        ticket,
        'petugas',
        (updatedTicket) => renderDrawer(updatedTicket)
      );

      // Tombol Cetak Tanda Terima Resmi dari Drawer
      drawerAside.querySelector('#btn-print-drawer-ticket')?.addEventListener('click', () => {
        openPrintableReceipt(ticket);
      });

      // Aksi Verifikasi & Disposisi
      drawerAside.querySelector('#btn-drawer-verify')?.addEventListener('click', () => {
        const opd = drawerAside.querySelector('#drawer-opd-select').value;
        const note = drawerAside.querySelector('#drawer-note-input').value.trim();
        const updated = window.SiPantauDB.updateStatus(ticket.id, 'Diverifikasi', opd, note || `Diverifikasi dan didisposisikan ke ${opd}.`, 'Budi S. (Disposisi)');
        renderTable();
        renderDrawer(updated);
        showToast(`Tiket ${ticket.id} berhasil diverifikasi & didisposisikan ke ${opd}!`, 'success');
      });

      // Aksi Tandai Selesai
      drawerAside.querySelector('#btn-drawer-complete')?.addEventListener('click', () => {
        const opd = drawerAside.querySelector('#drawer-opd-select').value;
        const note = drawerAside.querySelector('#drawer-note-input').value.trim();
        const updated = window.SiPantauDB.updateStatus(ticket.id, 'Selesai', opd, note || 'Perbaikan lapangan telah tuntas diverifikasi.', 'Budi S. (Tuntas)');
        renderTable();
        renderDrawer(updated);
        showToast(`Tiket ${ticket.id} ditandai SELESAI!`, 'success');
      });

      // Aksi Tolak Laporan
      drawerAside.querySelector('#btn-drawer-reject')?.addEventListener('click', () => {
        const note = drawerAside.querySelector('#drawer-note-input').value.trim() || 'Laporan tidak memenuhi syarat bukti/kewenangan.';
        const updated = window.SiPantauDB.updateStatus(ticket.id, 'Ditolak', ticket.dinas, note, 'Budi S. (Ditolak)');
        renderTable();
        renderDrawer(updated);
        showToast(`Tiket ${ticket.id} telah ditolak.`, 'warning');
      });
    }

    // C. Modal Disposisi Cepat Massal
    const checkedTicketIds = new Set();

    function openBulkDispositionModal(ticketIds, onDone) {
      let bModal = document.getElementById('sipantau-bulk-disposition-modal');
      if (!bModal) {
        bModal = document.createElement('div');
        bModal.id = 'sipantau-bulk-disposition-modal';
        bModal.className = 'fixed inset-0 z-[10002] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm';
        document.body.appendChild(bModal);
      }
      const tickets = getTickets().filter((t) => ticketIds.includes(t.id));
      bModal.innerHTML = `
        <div class="bg-white rounded-2xl max-w-lg w-full border-2 border-[#9e001f] shadow-2xl overflow-hidden animate-in fade-in zoom-in-95">
          <div class="bg-[#9e001f] text-white p-5 flex items-center justify-between">
            <div class="flex items-center gap-2.5">
              <span class="material-symbols-outlined text-2xl">send</span>
              <div>
                <h3 class="font-bold text-base" style="font-family:'Plus Jakarta Sans',sans-serif;">Disposisi Cepat Massal</h3>
                <p class="text-xs text-[#ffdad8]">${tickets.length} Laporan Warga Dipilih Sekaligus</p>
              </div>
            </div>
            <button type="button" id="btn-close-bulk-modal" class="p-1 rounded-lg hover:bg-white/20 transition">
              <span class="material-symbols-outlined">close</span>
            </button>
          </div>
          <div class="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
            <div>
              <label class="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">Daftar Tiket Terpilih (${tickets.length}):</label>
              <div class="space-y-1.5 max-h-36 overflow-y-auto pr-1">
                ${tickets.map((t) => `
                  <div class="flex items-center justify-between p-2 rounded-lg bg-gray-50 border border-gray-200 text-xs">
                    <span class="font-mono font-bold text-[#9e001f]">${t.id}</span>
                    <span class="truncate max-w-[220px] font-medium text-gray-800">${t.judul}</span>
                    <span class="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-800">${t.status}</span>
                  </div>
                `).join('')}
              </div>
            </div>
            <div>
              <label class="block text-xs font-bold text-gray-700 mb-1">Dinas / OPD Teknis Tujuan *</label>
              <select id="bulk-target-opd" class="w-full rounded-xl border border-gray-300 p-2.5 text-xs text-gray-800 focus:border-[#c8102e] focus:ring-1 focus:ring-[#c8102e]">
                <option value="Dinas Bina Marga & Tata Ruang">Dinas Bina Marga & Tata Ruang</option>
                <option value="Perumda Tirtawening (PDAM)">Perumda Tirtawening (PDAM)</option>
                <option value="Dinas Perhubungan">Dinas Perhubungan</option>
                <option value="Dinas Lingkungan Hidup">Dinas Lingkungan Hidup</option>
                <option value="DPKP3 & Damkar">DPKP3 & Damkar</option>
                <option value="Satuan Polisi Pamong Praja">Satuan Polisi Pamong Praja</option>
              </select>
            </div>
            <div>
              <label class="block text-xs font-bold text-gray-700 mb-1">Catatan Instruksi Tindak Lanjut *</label>
              <textarea id="bulk-instruction-note" rows="2" class="w-full rounded-xl border border-gray-300 p-2.5 text-xs text-gray-800 focus:border-[#c8102e] focus:ring-1 focus:ring-[#c8102e]" placeholder="Instruksi penanganan serempak oleh unit reaksi cepat (URC)...">Disposisi massal untuk penanganan cepat lapangan oleh unit reaksi cepat OPD terkait.</textarea>
            </div>
            <div class="pt-2 flex items-center justify-end gap-2.5">
              <button type="button" id="btn-cancel-bulk" class="px-4 py-2 rounded-xl border border-gray-300 text-gray-700 hover:bg-gray-100 text-xs font-semibold transition">Batal</button>
              <button type="button" id="btn-confirm-bulk" class="px-5 py-2 rounded-xl bg-[#c8102e] hover:bg-[#9e001f] text-white font-bold text-xs transition flex items-center gap-1.5 shadow-md">
                <span class="material-symbols-outlined text-sm">send</span> Teruskan ${tickets.length} Tiket ke OPD
              </button>
            </div>
          </div>
        </div>
      `;
      bModal.classList.remove('hidden');
      bModal.querySelector('#btn-close-bulk-modal').onclick = () => bModal.classList.add('hidden');
      bModal.querySelector('#btn-cancel-bulk').onclick = () => bModal.classList.add('hidden');
      bModal.onclick = (e) => { if (e.target === bModal) bModal.classList.add('hidden'); };
      bModal.querySelector('#btn-confirm-bulk').onclick = () => {
        const opd = bModal.querySelector('#bulk-target-opd').value;
        const note = bModal.querySelector('#bulk-instruction-note').value.trim() || `Disposisi massal ke ${opd}.`;
        ticketIds.forEach((id) => {
          window.SiPantauDB.updateStatus(id, 'Diverifikasi', opd, note, 'Budi S. (Disposisi Massal)');
        });
        bModal.classList.add('hidden');
        showToast(`${ticketIds.length} tiket berhasil didisposisikan secara massal ke ${opd}!`, 'success');
        if (typeof onDone === 'function') onDone();
      };
    }

    function updateBulkButtonState() {
      const bulkBtns = Array.from(document.querySelectorAll('button')).filter((b) => (b.textContent || '').includes('Disposisi Cepat Massal'));
      bulkBtns.forEach((btn) => {
        const count = checkedTicketIds.size;
        btn.innerHTML = `<span class="material-symbols-outlined text-sm">send</span> Disposisi Cepat Massal (${count})`;
        if (count > 0) {
          btn.className = 'px-3.5 py-1.5 rounded-lg text-label-md font-label-md bg-[#c8102e] hover:bg-[#9e001f] text-white font-bold transition shadow-sm flex items-center gap-1.5 cursor-pointer';
        } else {
          btn.className = 'px-3.5 py-1.5 rounded-lg text-label-md font-label-md bg-surface-container-low text-on-surface-variant hover:bg-surface-container transition flex items-center gap-1.5 opacity-80';
        }
      });
    }

    // D. Render Baris Tabel Dinamis dari Database
    function renderTable() {
      const all = getTickets().filter((t) => {
        const matchTab =
          activeTabFilter === 'Semua' ||
          (activeTabFilter === 'Menunggu Verifikasi' && t.status === 'Diajukan') ||
          (activeTabFilter === 'Didisposisikan' && (t.status === 'Diverifikasi' || t.status === 'Penanganan' || t.status === 'Selesai')) ||
          (activeTabFilter === 'Ditolak' && t.status === 'Ditolak');

        const matchSearch =
          !tableSearchQuery ||
          t.id.toLowerCase().includes(tableSearchQuery) ||
          t.judul.toLowerCase().includes(tableSearchQuery) ||
          t.alamat.toLowerCase().includes(tableSearchQuery) ||
          t.dinas.toLowerCase().includes(tableSearchQuery);

        let matchOpd = true;
        if (activeOpdFilter && activeOpdFilter !== 'Semua' && activeOpdFilter !== '') {
          const target = activeOpdFilter.toLowerCase().trim();
          const d = (t.dinas || '').toLowerCase();
          matchOpd =
            d.includes(target) ||
            (target.includes('bina marga') && d.includes('bina marga')) ||
            ((target.includes('dlhk') || target.includes('lingkungan')) &&
              (d.includes('lingkungan') || d.includes('dlhk') || d.includes('dlh'))) ||
            (target.includes('pdam') && (d.includes('tirtawening') || d.includes('pdam'))) ||
            (target.includes('dishub') && d.includes('perhubungan')) ||
            (target.includes('dpkp3') && (d.includes('dpkp3') || d.includes('damkar'))) ||
            (target.includes('satpol') && d.includes('satpol'));
        }

        return matchTab && matchSearch && matchOpd;
      });

      const statusPill = (st) => {
        if (st === 'Diajukan')
          return `<span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-900 text-label-sm font-label-sm font-semibold"><span class="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse"></span> Diajukan</span>`;
        if (st === 'Diverifikasi' || st === 'Penanganan')
          return `<span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-900 text-label-sm font-label-sm font-semibold"><span class="w-1.5 h-1.5 rounded-full bg-blue-600"></span> ${st}</span>`;
        if (st === 'Selesai')
          return `<span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-label-sm font-label-sm font-semibold"><span class="w-1.5 h-1.5 rounded-full bg-emerald-600"></span> Selesai</span>`;
        return `<span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-gray-100 border border-gray-300 text-gray-700 text-label-sm font-label-sm font-semibold">Ditolak</span>`;
      };

      if (all.length === 0) {
        tbody.innerHTML = `
          <tr>
            <td colspan="9" class="py-12 px-4 text-center">
              <div class="flex flex-col items-center justify-center gap-2 text-outline">
                <span class="material-symbols-outlined text-4xl text-outline/60">filter_alt_off</span>
                <p class="font-bold text-sm text-on-surface">Tidak ada aduan untuk kategori dinas: "${activeOpdFilter}"</p>
                <p class="text-xs text-on-surface-variant max-w-sm">Belum ada laporan warga masuk yang dialokasikan ke instansi ini pada antrean saat ini.</p>
                <button type="button" id="btn-empty-reset-opd" class="mt-2 px-3.5 py-1.5 rounded-lg bg-[#9e001f] text-white text-xs font-semibold hover:bg-[#c8102e] transition cursor-pointer">
                  Tampilkan Semua OPD
                </button>
              </div>
            </td>
          </tr>
        `;
        tbody.querySelector('#btn-empty-reset-opd')?.addEventListener('click', () => {
          setOpdFilter('Semua');
        });
      } else {
        tbody.innerHTML = all
          .map((t) => {
            const isSelected = selectedTicket && selectedTicket.id === t.id;
            const isChecked = checkedTicketIds.has(t.id);
            return `
              <tr data-id="${t.id}" class="${isSelected ? 'bg-primary-fixed/20 border-l-4 border-l-primary' : 'hover:bg-surface-container-low'} cursor-pointer transition">
                <td class="py-3.5 px-3 text-center">
                  <input type="checkbox" data-id="${t.id}" class="row-check rounded border-outline-variant text-primary focus:ring-primary h-4 w-4 cursor-pointer" ${isChecked ? 'checked' : ''}/>
                </td>
                <td class="py-3.5 px-3 whitespace-nowrap">
                  <span class="font-mono font-bold ${isSelected ? 'text-primary' : 'text-on-surface'}">${t.id}</span>
                  <div class="text-[10px] text-outline font-semibold">${t.triaseLevel || 'Triase Level 1'}</div>
                </td>
                <td class="py-3.5 px-3 whitespace-nowrap text-on-surface-variant text-xs">
                  <div>${t.waktu}</div>
                  <div class="text-[11px] text-error font-medium">${t.sla || 'SLA Aktif'}</div>
                </td>
                <td class="py-3.5 px-3 whitespace-nowrap">
                  <span class="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-blue-100 text-blue-800 text-[11px] font-semibold">${t.kategoriLabel || t.kategori}</span>
                </td>
                <td class="py-3.5 px-4">
                  <div class="font-semibold text-on-surface text-sm leading-snug">${t.judul}</div>
                  <div class="text-outline text-xs flex items-center gap-1 mt-0.5 truncate">
                    <span class="material-symbols-outlined text-[14px]">location_on</span> ${t.alamat}
                  </div>
                </td>
                <td class="py-3.5 px-3 whitespace-nowrap">
                  <span class="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-error-container text-on-error-container text-label-sm font-label-sm font-bold uppercase">
                    <span class="w-1.5 h-1.5 rounded-full bg-error"></span> ${t.urgensi || 'Tinggi'}
                  </span>
                </td>
                <td class="py-3.5 px-3 whitespace-nowrap">${statusPill(t.status)}</td>
                <td class="py-3.5 px-3 whitespace-nowrap text-xs">
                  <div class="font-medium text-on-surface truncate max-w-[130px]">${t.dinas}</div>
                  <div class="text-[11px] text-outline">${t.petugas || 'Tim Verifikator'}</div>
                </td>
                <td class="py-3.5 px-3 whitespace-nowrap text-right">
                  <button type="button" class="p-1 rounded hover:bg-surface-container text-primary font-semibold" title="Buka Detail">
                    <span class="material-symbols-outlined">visibility</span>
                  </button>
                </td>
              </tr>
            `;
          })
          .join('');
      }

      // Update badge counts on OPD chips
      const rawTickets = getTickets();
      const opdCounts = {
        'Semua': rawTickets.length,
        'Bina Marga': rawTickets.filter((t) => (t.dinas || '').toLowerCase().includes('bina marga')).length,
        'DLHK': rawTickets.filter((t) => {
          const d = (t.dinas || '').toLowerCase();
          return d.includes('lingkungan') || d.includes('dlh');
        }).length,
        'PDAM': rawTickets.filter((t) => {
          const d = (t.dinas || '').toLowerCase();
          return d.includes('pdam') || d.includes('tirtawening');
        }).length,
        'Dishub': rawTickets.filter((t) => (t.dinas || '').toLowerCase().includes('perhubungan')).length,
        'DPKP3': rawTickets.filter((t) => {
          const d = (t.dinas || '').toLowerCase();
          return d.includes('dpkp3') || d.includes('damkar');
        }).length,
        'Satpol PP': rawTickets.filter((t) => (t.dinas || '').toLowerCase().includes('satpol')).length
      };

      document.querySelectorAll('#opd-filter-chips-container .opd-chip').forEach((chip) => {
        const opdKey = chip.getAttribute('data-opd');
        const countSpan = chip.querySelector('.chip-count');
        if (countSpan && opdCounts[opdKey] !== undefined) {
          countSpan.textContent = opdCounts[opdKey];
        }
        if (opdKey === activeOpdFilter) {
          chip.className = 'opd-chip px-3 py-1 rounded-full font-bold bg-[#9e001f] text-white shadow-2xs transition flex items-center gap-1 shrink-0 cursor-pointer';
          if (countSpan) countSpan.className = 'chip-count px-1.5 py-0.2 rounded-full bg-white/20 text-[10px]';
        } else {
          chip.className = 'opd-chip px-3 py-1 rounded-full font-medium bg-surface-container-low text-on-surface hover:bg-surface-container transition flex items-center gap-1 shrink-0 cursor-pointer';
          if (countSpan) countSpan.className = 'chip-count px-1.5 py-0.2 rounded-full bg-surface-container text-[10px]';
        }
      });

      // Update counter text & reset button
      const counterEl = document.getElementById('table-pagination-counter');
      if (counterEl) {
        counterEl.innerHTML = `Menampilkan <span class="font-semibold text-on-surface">${all.length > 0 ? '1 - ' + all.length : '0'}</span> dari <span class="font-semibold text-on-surface">${all.length}</span> aduan ${activeOpdFilter !== 'Semua' ? `(Filter: <strong class="text-[#9e001f]">${activeOpdFilter}</strong>)` : 'aktif'}`;
      }

      const resetBtn = document.getElementById('btn-reset-opd-filter');
      if (resetBtn) {
        if (activeOpdFilter !== 'Semua') {
          resetBtn.classList.remove('hidden');
          resetBtn.classList.add('inline-flex');
        } else {
          resetBtn.classList.add('hidden');
          resetBtn.classList.remove('inline-flex');
        }
      }

      tbody.querySelectorAll('input.row-check').forEach((cb) => {
        cb.addEventListener('change', (e) => {
          e.stopPropagation();
          const tid = cb.getAttribute('data-id');
          if (cb.checked) {
            checkedTicketIds.add(tid);
          } else {
            checkedTicketIds.delete(tid);
          }
          updateBulkButtonState();
        });
      });

      tbody.querySelectorAll('tr').forEach((row) => {
        row.addEventListener('click', (e) => {
          if (e.target.tagName === 'INPUT') return;
          const id = row.getAttribute('data-id');
          const found = getTickets().find((x) => x.id === id);
          if (found) {
            selectedTicket = found;
            renderTable();
            renderDrawer(found);
          }
        });
      });

      // Header select-all checkbox
      const headerCb = document.querySelector('thead input[type="checkbox"]');
      if (headerCb) {
        headerCb.checked = all.length > 0 && all.every((t) => checkedTicketIds.has(t.id));
        headerCb.onchange = () => {
          all.forEach((t) => {
            if (headerCb.checked) checkedTicketIds.add(t.id);
            else checkedTicketIds.delete(t.id);
          });
          renderTable();
          updateBulkButtonState();
        };
      }

      updateBulkButtonState();
    }

    // Function to apply OPD filter across chips and selects
    function setOpdFilter(opd) {
      activeOpdFilter = opd || 'Semua';

      // Sync select dropdowns
      const filterSelect = document.getElementById('filter-opd-select');
      if (filterSelect) filterSelect.value = activeOpdFilter;

      const globalSelect = document.getElementById('global-opd-select');
      if (globalSelect) globalSelect.value = activeOpdFilter;

      renderTable();

      if (activeOpdFilter !== 'Semua') {
        showToast(`Antrean difokuskan pada kategori dinas: ${activeOpdFilter}`, 'info');
      } else {
        showToast('Menampilkan seluruh antrean dinas (Semua OPD).', 'info');
      }
    }
    window.__sipantauResetOpdFilter = () => setOpdFilter('Semua');

    // Attach listener for OPD Filter Chips
    document.querySelectorAll('#opd-filter-chips-container .opd-chip').forEach((chip) => {
      chip.addEventListener('click', () => {
        const opd = chip.getAttribute('data-opd');
        setOpdFilter(opd);
      });
    });

    // Attach listener for Reset OPD Filter Button
    document.getElementById('btn-reset-opd-filter')?.addEventListener('click', () => {
      setOpdFilter('Semua');
    });

    // Attach listener for Table OPD Select
    document.getElementById('filter-opd-select')?.addEventListener('change', (e) => {
      setOpdFilter(e.target.value);
    });

    // Attach listener for Global Header OPD Select
    document.getElementById('global-opd-select')?.addEventListener('change', (e) => {
      setOpdFilter(e.target.value);
    });

    renderTable();
    renderDrawer(selectedTicket);

    // Tombol Disposisi Cepat Massal Handler
    document.querySelectorAll('button').forEach((btn) => {
      if ((btn.textContent || '').includes('Disposisi Cepat Massal')) {
        btn.onclick = () => {
          if (checkedTicketIds.size === 0) {
            showToast('Pilih minimal satu tiket di tabel untuk melakukan disposisi massal.', 'warning');
            return;
          }
          openBulkDispositionModal(Array.from(checkedTicketIds), () => {
            checkedTicketIds.clear();
            renderTable();
            if (selectedTicket) {
              const refreshed = getTickets().find((x) => x.id === selectedTicket.id);
              if (refreshed) renderDrawer(refreshed);
            }
            updateBulkButtonState();
          });
        };
      }
    });

    // Filter Tab di atas Tabel (Semua, Menunggu Verifikasi, Didisposisikan, Ditolak)
    const tabBtns = document.querySelectorAll('main div.flex.items-center.gap-2.overflow-x-auto button');
    tabBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        tabBtns.forEach((b) => {
          b.className = 'px-3.5 py-1.5 rounded-lg text-label-md font-label-md text-on-surface-variant hover:bg-surface-container-low transition flex items-center gap-1.5';
        });
        btn.className = 'px-3.5 py-1.5 rounded-lg text-label-md font-label-md bg-primary-fixed text-primary font-bold shadow-xs flex items-center gap-1.5';
        const txt = btn.textContent.trim();
        if (txt.includes('Menunggu')) activeTabFilter = 'Menunggu Verifikasi';
        else if (txt.includes('Didisposisikan')) activeTabFilter = 'Didisposisikan';
        else if (txt.includes('Ditolak')) activeTabFilter = 'Ditolak';
        else activeTabFilter = 'Semua';
        renderTable();
      });
    });

    // Kotak Pencarian Tabel & Global
    document.querySelectorAll('input[type="text"]').forEach((inp) => {
      inp.addEventListener('input', (e) => {
        tableSearchQuery = e.target.value.trim().toLowerCase();
        renderTable();
      });
    });

    // Tombol Ekspor Rekap CSV (Lengkap 20 Kolom dengan UTF-8 BOM untuk Microsoft Excel)
    document.querySelectorAll('button').forEach((btn) => {
      if ((btn.textContent || '').includes('Ekspor Rekap CSV')) {
        btn.onclick = () => {
          const headers = [
            'ID Tiket',
            'Kode Referensi',
            'Waktu Lapor',
            'SLA Sisa',
            'Nama Pelapor',
            'NIK Pelapor',
            'Nomor Telepon',
            'Instansi OPD',
            'Kategori Aduan',
            'Judul Aduan',
            'Tingkat Urgensi',
            'Status Terkini',
            'Alamat Kejadian',
            'Latitude',
            'Longitude',
            'Deskripsi Aduan',
            'Dukungan Warga',
            'Petugas Penanggung Jawab'
          ];
          const list = getTickets();
          const rows = [headers];
          list.forEach((t) => {
            rows.push([
              t.id,
              t.code || t.id.replace('#', ''),
              `"${t.waktu || ''}"`,
              `"${t.sla || ''}"`,
              `"${(t.pelapor || '').replace(/"/g, '""')}"`,
              `"${t.nik || ''}"`,
              `"${t.telepon || ''}"`,
              `"${(t.dinas || '').replace(/"/g, '""')}"`,
              `"${(t.kategoriLabel || t.kategori || '').replace(/"/g, '""')}"`,
              `"${(t.judul || '').replace(/"/g, '""')}"`,
              t.urgensi || 'Tinggi',
              t.status,
              `"${(t.alamat || '').replace(/"/g, '""')}"`,
              t.lat,
              t.lng,
              `"${(t.deskripsi || '').replace(/"/g, '""')}"`,
              t.upvotes || 0,
              `"${(t.petugas || '').replace(/"/g, '""')}"`
            ]);
          });
          const csvString = '\uFEFF' + rows.map((r) => r.join(',')).join('\r\n');
          const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
          const url = URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = url;
          link.download = `sipantau_rekap_aduan_lengkap_${new Date().toISOString().slice(0, 10)}.csv`;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          URL.revokeObjectURL(url);
          showToast('Berkas rekapitulasi 20 kolom (Excel UTF-8 BOM) berhasil diunduh!', 'success');
        };
      } else if ((btn.textContent || '').includes('Muat Ulang')) {
        btn.onclick = () => {
          renderTable();
          showToast('Data antrean triase berhasil dimuat ulang.', 'info');
        };
      }
    });

    // =========================================================================
    // C. MULTI-TAB WORKSPACE MANAGER (6 TAB RESMI BACKOFFICE PETUGAS OPD)
    // =========================================================================
    const workspaceContainer = document.getElementById('workspace-verifikasi')?.parentElement;
    let activeOfficerTab = 'verifikasi';
    let officerTacticalMapInstance = null;

    const OPERATIONAL_FLEET = [
      { id: 'URC-BM-01', nama: 'URC Bina Marga 01 (Dago/Coblong)', dinas: 'Dinas Bina Marga & Tata Ruang', lat: -6.8985, lng: 107.6105, status: 'Operasi Lapangan', komandan: 'Agus P.', kendaraan: 'Truk Cold-Mix Aspal D-8812-AP', kontak: '0812-2233-4411' },
      { id: 'URC-DLHK-02', nama: 'Armada Kebersihan DLHK Cibeunying', dinas: 'Dinas Lingkungan Hidup (DLHK)', lat: -6.9032, lng: 107.6189, status: 'Menuju Lokasi', komandan: 'H. Dedi S.', kendaraan: 'Compactor Truck D-9021-AZ', kontak: '0813-9944-1122' },
      { id: 'URC-PDAM-03', nama: 'URC Tirtawening Wilayah Tengah', dinas: 'Perumda Tirtawening (PDAM)', lat: -6.9150, lng: 107.6080, status: 'Operasi Lapangan', komandan: 'Bambang S.', kendaraan: 'Mobil Pompa & Derek D-1190-TW', kontak: '0811-2000-8833' },
      { id: 'URC-DISHUB-04', nama: 'Patroli Keselamatan Lalin Dishub', dinas: 'Dinas Perhubungan', lat: -6.9010, lng: 107.6250, status: 'Standby', komandan: 'Aipda Rudi K.', kendaraan: 'Mobil Patroli Dishub D-1044-DH', kontak: '0815-6677-8899' },
      { id: 'URC-DPKP3-05', nama: 'Rescue & Damkar DPKP3', dinas: 'DPKP3 & Damkar', lat: -6.8845, lng: 107.6145, status: 'Standby', komandan: 'Reza T.', kendaraan: 'Mobil Rescue & Chainsaw D-9901-FR', kontak: 'Posko Siaga DPKP3' },
      { id: 'URC-SATPOL-06', nama: 'Patroli Ketertiban Satpol PP', dinas: 'Satuan Polisi Pamong Praja', lat: -6.9200, lng: 107.6050, status: 'Operasi Lapangan', komandan: 'Roni H.', kendaraan: 'Kendaraan Patroli PPNS', kontak: '0821-3344-5566' }
    ];

    const VERIFIERS_LIST = [
      { nip: '19850312 201001 1 008', nama: 'Budi Santoso, S.STP', instansi: 'Dinas Komunikasi & Informatika', jabatan: 'Koordinator Verifikator & Triase Utama', role: 'Superadmin', status: 'Aktif', terakhirAktif: 'Sedang Aktif' },
      { nip: '19890724 201402 2 003', nama: 'Siti Maryam, S.T.', instansi: 'Dinas Bina Marga & Tata Ruang', jabatan: 'Verifikator Teknis Infrastruktur Jalan', role: 'Verifikator', status: 'Aktif', terakhirAktif: '10 menit lalu' },
      { nip: '19821105 200801 1 012', nama: 'Ir. Hendra Gunawan', instansi: 'Perumda Tirtawening (PDAM)', jabatan: 'Pengawas Teknis Jaringan & Distribusi Air', role: 'Koordinator Lapangan', status: 'Aktif', terakhirAktif: '32 menit lalu' },
      { nip: '19910418 201503 1 005', nama: 'Reza Triansyah, S.IP', instansi: 'DPKP3 & Pemadam Kebakaran', jabatan: 'Perwira Piket Reaksi Cepat Evakuasi', role: 'Koordinator Lapangan', status: 'Aktif', terakhirAktif: '1 jam lalu' },
      { nip: '19870930 201101 2 007', nama: 'Dewi Sartika, S.Si.', instansi: 'Dinas Lingkungan Hidup (DLHK)', jabatan: 'Verifikator Penanganan Sampah & Kebersihan', role: 'Verifikator', status: 'Aktif', terakhirAktif: '2 jam lalu' }
    ];

    const AUDIT_TRAIL_LOGS = [
      { id: 'LOG-8891', waktu: 'Hari ini, 09:42 WIB', aktor: 'Budi Santoso, S.STP (Diskominfo)', aksi: 'Disposisi Teknis', target: '#LAPOR-2410-092', keterangan: 'Mendisposisikan laporan jalan berlubang darurat ke Dinas Bina Marga (URC Regu 01).', badge: 'bg-primary-fixed text-primary' },
      { id: 'LOG-8890', waktu: 'Hari ini, 09:20 WIB', aktor: 'Siti Maryam, S.T. (Bina Marga)', aksi: 'Validasi Fisik & SLA', target: '#TKT-2024-8837', keterangan: 'Memvalidasi laporan trotoar amblas, menaikkan tingkat prioritas menjadi Sedang.', badge: 'bg-blue-100 text-blue-800' },
      { id: 'LOG-8889', waktu: 'Kemarin, 21:15 WIB', aktor: 'Reza Triansyah, S.IP (DPKP3)', aksi: 'Penyelesaian Lapangan', target: '#TKT-2024-8835', keterangan: 'Evakuasi dahan pohon tumbang selesai dikerjakan 100%, arus kabel PLN telah dinormalisasi.', badge: 'bg-emerald-100 text-emerald-800' },
      { id: 'LOG-8888', waktu: 'Hari ini, 08:00 WIB', aktor: 'Budi Santoso, S.STP (Diskominfo)', aksi: 'Otentikasi Sesi Backoffice', target: 'Sistem Triase', keterangan: 'Login berhasil dengan hak akses Superadmin Verifikator Wilayah.', badge: 'bg-purple-100 text-purple-800' }
    ];

    function switchOfficerTab(tabName, optFilterOpd) {
      activeOfficerTab = tabName;

      // Update sidebar nav buttons
      document.querySelectorAll('.officer-nav-tab').forEach((nav) => {
        const view = nav.getAttribute('data-view');
        const isActive = view === tabName;
        const icon = nav.querySelector('.material-symbols-outlined');
        if (isActive) {
          nav.className = 'officer-nav-tab flex items-center justify-between px-3 py-2.5 rounded-lg bg-surface-container-low text-primary font-semibold border-l-4 border-primary transition cursor-pointer shadow-sm';
          if (icon) {
            icon.classList.remove('text-outline');
            icon.classList.add('text-primary');
            icon.setAttribute('data-weight', 'fill');
          }
        } else {
          nav.className = 'officer-nav-tab flex items-center gap-3 px-3 py-2.5 rounded-lg text-on-surface-variant hover:bg-surface-container-low hover:text-on-surface transition-colors cursor-pointer';
          if (icon) {
            icon.classList.add('text-outline');
            icon.classList.remove('text-primary');
            icon.removeAttribute('data-weight');
          }
        }
      });

      // Sembunyikan semua workspace
      document.querySelectorAll('.officer-workspace').forEach((ws) => {
        ws.style.display = 'none';
      });

      if (tabName === 'verifikasi') {
        const verifWs = document.getElementById('workspace-verifikasi');
        if (verifWs) {
          verifWs.style.display = 'flex';
          if (optFilterOpd) {
            setOpdFilter(optFilterOpd);
          }
        }
      } else if (tabName === 'ringkasan') {
        renderRingkasanWorkspace();
      } else if (tabName === 'daftar') {
        renderDaftarWorkspace();
      } else if (tabName === 'peta') {
        renderPetaWorkspace();
      } else if (tabName === 'kinerja') {
        renderKinerjaWorkspace();
      } else if (tabName === 'pengaturan') {
        renderPengaturanWorkspace();
      }
    }

    // TAB 1: RINGKASAN TRIASE (EXECUTIVE DASHBOARD)
    function renderRingkasanWorkspace() {
      let ws = document.getElementById('workspace-ringkasan');
      if (!ws) {
        ws = document.createElement('div');
        ws.id = 'workspace-ringkasan';
        ws.className = 'officer-workspace flex-1 flex flex-col overflow-y-auto p-6 min-w-0 bg-[#FAF7F7]';
        workspaceContainer.appendChild(ws);
      }
      ws.style.display = 'flex';

      const tickets = getTickets();
      const opdCounts = {
        'Bina Marga': tickets.filter((t) => (t.dinas || '').includes('Bina Marga')).length,
        'DLHK': tickets.filter((t) => (t.dinas || '').includes('Lingkungan') || (t.dinas || '').includes('DLHK')).length,
        'PDAM': tickets.filter((t) => (t.dinas || '').includes('Tirtawening') || (t.dinas || '').includes('PDAM')).length,
        'Dishub': tickets.filter((t) => (t.dinas || '').includes('Perhubungan') || (t.dinas || '').includes('Dishub')).length,
        'DPKP3': tickets.filter((t) => (t.dinas || '').includes('DPKP3') || (t.dinas || '').includes('Damkar')).length,
        'Satpol PP': tickets.filter((t) => (t.dinas || '').includes('Satpol')).length
      };

      ws.innerHTML = `
        <div class="flex flex-col md:flex-row md:items-center justify-between pb-5 gap-3 border-b border-outline-variant/60">
          <div>
            <div class="flex items-center gap-2 text-label-sm font-label-sm text-outline mb-1">
              <span>Portal Admin Petugas</span>
              <span class="material-symbols-outlined text-xs">chevron_right</span>
              <span class="text-primary font-semibold">Ringkasan Triase Eksekutif</span>
            </div>
            <h1 class="text-headline-lg font-headline-lg text-on-surface font-bold tracking-tight">
              Ringkasan Triase &amp; Beban Kerja OPD
            </h1>
            <p class="text-body-sm font-body-sm text-on-surface-variant mt-0.5">
              Pantau kecepatan respon penanganan, pembagian disposisi per dinas teknis, dan kepatuhan standar pelayanan.
            </p>
          </div>
          <div class="flex items-center gap-2 shrink-0">
            <button type="button" id="btn-ringkasan-goto-verif" class="px-4 py-2 bg-primary text-white rounded-lg text-label-md font-bold hover:bg-primary-container transition flex items-center gap-2 shadow-sm">
              <span class="material-symbols-outlined text-sm">rule</span>
              <span>Buka Antrean Verifikasi</span>
            </button>
          </div>
        </div>

        <!-- 4 Metric Cards -->
        <div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 my-6">
          <div class="bg-surface-container-lowest p-4 rounded-xl border border-outline-variant shadow-sm">
            <div class="flex items-center justify-between text-on-surface-variant text-label-sm font-medium">
              <span>Total Aduan Masuk</span>
              <span class="p-2 rounded-lg bg-surface-container-low text-primary"><span class="material-symbols-outlined">inbox</span></span>
            </div>
            <div class="mt-2 text-headline-xl font-headline-xl font-extrabold text-on-surface">${tickets.length + 138}</div>
            <div class="mt-1 text-xs text-emerald-700 font-bold flex items-center gap-1">
              <span class="material-symbols-outlined text-sm">trending_up</span> +12% peningkatan hari ini
            </div>
          </div>

          <div class="bg-surface-container-lowest p-4 rounded-xl border-2 border-primary/40 shadow-sm relative overflow-hidden">
            <div class="flex items-center justify-between text-primary text-label-sm font-bold">
              <span>Perlu Verifikasi Segera</span>
              <span class="p-2 rounded-lg bg-primary-fixed text-primary"><span class="material-symbols-outlined">priority_high</span></span>
            </div>
            <div class="mt-2 text-headline-xl font-headline-xl font-extrabold text-primary">
              ${tickets.filter((t) => t.status === 'Diajukan' || t.status === 'Diverifikasi').length + 22}
            </div>
            <div class="mt-1 text-xs text-primary font-semibold flex items-center gap-1">
              <span class="w-2 h-2 rounded-full bg-primary animate-ping"></span> SLA Kritis &lt; 4 Jam
            </div>
          </div>

          <div class="bg-surface-container-lowest p-4 rounded-xl border border-outline-variant shadow-sm">
            <div class="flex items-center justify-between text-on-surface-variant text-label-sm font-medium">
              <span>Rata-rata Waktu Respon</span>
              <span class="p-2 rounded-lg bg-surface-container-low text-tertiary-container"><span class="material-symbols-outlined">timer</span></span>
            </div>
            <div class="mt-2 text-headline-xl font-headline-xl font-extrabold text-on-surface">42 Menit</div>
            <div class="mt-1 text-xs text-outline">Target Standar Pelayanan: Maks. 240 Menit</div>
          </div>

          <div class="bg-surface-container-lowest p-4 rounded-xl border border-outline-variant shadow-sm">
            <div class="flex items-center justify-between text-on-surface-variant text-label-sm font-medium">
              <span>Kepatuhan SLA Kota</span>
              <span class="p-2 rounded-lg bg-emerald-50 text-emerald-700"><span class="material-symbols-outlined">verified</span></span>
            </div>
            <div class="mt-2 text-headline-xl font-headline-xl font-extrabold text-emerald-700">95.2%</div>
            <div class="mt-1 text-xs text-emerald-800 font-semibold">Tercapai melampaui target SPM 90%</div>
          </div>
        </div>

        <!-- OPD Workload Distribution Grid -->
        <div class="bg-surface-container-lowest p-5 rounded-xl border border-outline-variant shadow-sm space-y-4 mb-6">
          <div class="flex items-center justify-between">
            <div>
              <h2 class="text-headline-sm font-bold text-on-surface">Distribusi Beban Kerja Antrean per Dinas (OPD)</h2>
              <p class="text-xs text-on-surface-variant">Klik tombol dinas untuk langsung memfilter antrean tugas verifikasi.</p>
            </div>
            <span class="text-xs font-mono px-2.5 py-1 rounded bg-surface-container text-on-surface font-semibold">6 OPD Terintegrasi</span>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5 pt-1">
            ${[
              { name: 'Bina Marga & Tata Ruang', key: 'Bina Marga', icon: 'edit_road', color: 'bg-amber-500', count: opdCounts['Bina Marga'] + 18, desc: 'Jalan berlubang, trotoar & jembatan' },
              { name: 'DLHK (Kebersihan/Sampah)', key: 'DLHK', icon: 'delete_sweep', color: 'bg-emerald-600', count: opdCounts['DLHK'] + 12, desc: 'Tumpukan sampah liar & TPS' },
              { name: 'Perumda Tirtawening (PDAM)', key: 'PDAM', icon: 'water_drop', color: 'bg-blue-600', count: opdCounts['PDAM'] + 8, desc: 'Pipa bocor & suplai air bersih' },
              { name: 'Dinas Perhubungan (Dishub)', key: 'Dishub', icon: 'traffic', color: 'bg-indigo-600', count: opdCounts['Dishub'] + 6, desc: 'Lampu PJU padam & rambu lalin' },
              { name: 'DPKP3 & Pemadam Damkar', key: 'DPKP3', icon: 'fire_truck', color: 'bg-red-600', count: opdCounts['DPKP3'] + 4, desc: 'Pohon tumbang & evakuasi darurat' },
              { name: 'Satuan Polisi Pamong Praja', key: 'Satpol PP', icon: 'shield_person', color: 'bg-slate-700', count: opdCounts['Satpol PP'] + 5, desc: 'Ketertiban umum & PKL liar' }
            ].map((opd) => `
              <div class="p-4 rounded-xl border border-outline-variant/80 bg-surface-container-low hover:border-primary/50 transition group flex flex-col justify-between">
                <div>
                  <div class="flex items-center justify-between">
                    <span class="w-8 h-8 rounded-lg ${opd.color} text-white flex items-center justify-center shadow-xs">
                      <span class="material-symbols-outlined text-lg">${opd.icon}</span>
                    </span>
                    <span class="text-xs font-bold px-2 py-0.5 rounded-full bg-white border border-outline-variant font-mono">
                      ${opd.count} Aduan
                    </span>
                  </div>
                  <h3 class="font-bold text-sm text-on-surface mt-2.5">${opd.name}</h3>
                  <p class="text-[11px] text-on-surface-variant mt-0.5">${opd.desc}</p>
                </div>
                <button type="button" class="btn-quick-filter-opd mt-3.5 w-full py-1.5 px-3 rounded-lg bg-white border border-outline-variant hover:bg-primary hover:text-white hover:border-primary text-xs font-bold text-primary transition flex items-center justify-center gap-1.5 shadow-2xs" data-opd="${opd.key}">
                  <span>Fokus Antrean Ini</span>
                  <span class="material-symbols-outlined text-xs">arrow_forward</span>
                </button>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- 2 Column: Log Aktivitas & Antrean Kritis -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-5">
          <!-- Log Aktivitas Triase -->
          <div class="bg-surface-container-lowest p-5 rounded-xl border border-outline-variant shadow-sm space-y-3">
            <div class="flex items-center justify-between pb-2 border-b border-outline-variant/60">
              <h2 class="text-sm font-bold text-on-surface flex items-center gap-2">
                <span class="material-symbols-outlined text-primary text-base">history</span>
                Log Aktivitas Verifikator Terkini
              </h2>
              <span class="text-[10px] text-outline font-mono">Real-time Stream</span>
            </div>
            <div class="space-y-3">
              ${AUDIT_TRAIL_LOGS.map((log) => `
                <div class="p-3 rounded-lg bg-surface-container-low border border-outline-variant/60 text-xs space-y-1">
                  <div class="flex items-center justify-between">
                    <span class="font-bold text-on-surface">${log.aktor}</span>
                    <span class="text-[10px] font-mono text-outline">${log.waktu}</span>
                  </div>
                  <div class="flex items-center gap-1.5">
                    <span class="px-1.5 py-0.2 rounded text-[10px] font-bold ${log.badge}">${log.aksi}</span>
                    <span class="font-mono text-primary font-bold">${log.target}</span>
                  </div>
                  <p class="text-[11px] text-on-surface-variant pt-0.5">${log.keterangan}</p>
                </div>
              `).join('')}
            </div>
          </div>

          <!-- Peringatan Batas SLA Kritis -->
          <div class="bg-surface-container-lowest p-5 rounded-xl border border-outline-variant shadow-sm space-y-3">
            <div class="flex items-center justify-between pb-2 border-b border-outline-variant/60">
              <h2 class="text-sm font-bold text-error flex items-center gap-2">
                <span class="material-symbols-outlined text-error text-base animate-bounce">warning</span>
                Tiket Mendekati Batas Maksimal SLA
              </h2>
              <span class="text-[10px] px-2 py-0.5 rounded bg-error-container text-on-error-container font-bold">Prioritas 1</span>
            </div>
            <div class="space-y-3">
              ${tickets.slice(0, 3).map((t) => `
                <div class="p-3 rounded-lg border border-red-200 bg-red-50/50 text-xs space-y-1.5">
                  <div class="flex items-center justify-between">
                    <span class="font-mono font-bold text-primary">${t.id}</span>
                    <span class="px-2 py-0.5 rounded-full bg-red-600 text-white text-[10px] font-bold">SLA &lt; 2 Jam</span>
                  </div>
                  <div class="font-semibold text-on-surface">${t.judul}</div>
                  <div class="text-[11px] text-on-surface-variant flex items-center justify-between">
                    <span>${t.dinas}</span>
                    <button type="button" class="btn-jump-verif text-primary font-bold hover:underline" data-id="${t.id}">Disposisikan Segera →</button>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>
        </div>
      `;

      ws.querySelector('#btn-ringkasan-goto-verif')?.addEventListener('click', () => switchOfficerTab('verifikasi'));
      ws.querySelectorAll('.btn-quick-filter-opd').forEach((btn) => {
        btn.addEventListener('click', () => {
          const opd = btn.getAttribute('data-opd');
          switchOfficerTab('verifikasi', opd);
        });
      });
      ws.querySelectorAll('.btn-jump-verif').forEach((btn) => {
        btn.addEventListener('click', () => {
          const tid = btn.getAttribute('data-id');
          const found = getTickets().find((x) => x.id === tid);
          switchOfficerTab('verifikasi');
          if (found) renderDrawer(found);
        });
      });
    }

    // TAB 2: DAFTAR ADUAN WARGA (FULL OPERATIONAL DATABASE)
    function renderDaftarWorkspace() {
      let ws = document.getElementById('workspace-daftar');
      if (!ws) {
        ws = document.createElement('div');
        ws.id = 'workspace-daftar';
        ws.className = 'officer-workspace flex-1 flex flex-col overflow-y-auto p-6 min-w-0 bg-[#FAF7F7]';
        workspaceContainer.appendChild(ws);
      }
      ws.style.display = 'flex';

      let dSearch = '';
      let dStatus = 'Semua';
      let dOpd = 'Semua';

      function renderDaftarTable() {
        const allTickets = getTickets();
        const filtered = allTickets.filter((t) => {
          if (dStatus !== 'Semua' && t.status !== dStatus) return false;
          if (dOpd !== 'Semua') {
            const d = (t.dinas || '').toLowerCase();
            const q = dOpd.toLowerCase();
            if (!d.includes(q)) return false;
          }
          if (dSearch.trim()) {
            const q = dSearch.toLowerCase();
            const text = `${t.id} ${t.judul} ${t.pelapor} ${t.alamat} ${t.dinas} ${t.nik}`.toLowerCase();
            if (!text.includes(q)) return false;
          }
          return true;
        });

        const tableBody = ws.querySelector('#daftar-table-body');
        const countSpan = ws.querySelector('#daftar-result-count');
        if (countSpan) countSpan.textContent = `Menampilkan ${filtered.length} dari ${allTickets.length} aduan`;

        if (!tableBody) return;
        if (filtered.length === 0) {
          tableBody.innerHTML = `
            <tr>
              <td colspan="8" class="p-8 text-center text-outline">
                <span class="material-symbols-outlined text-3xl mb-1">search_off</span>
                <p class="font-semibold text-sm">Tidak ditemukan aduan dengan kriteria pencarian ini.</p>
              </td>
            </tr>
          `;
          return;
        }

        tableBody.innerHTML = filtered.map((t) => `
          <tr class="hover:bg-surface-container-low transition border-b border-outline-variant/40">
            <td class="p-3 font-mono font-bold text-xs text-primary">${t.id}</td>
            <td class="p-3 text-xs text-outline whitespace-nowrap">${t.waktu}</td>
            <td class="p-3">
              <div class="font-bold text-xs text-on-surface">${t.judul}</div>
              <div class="text-[11px] text-outline truncate max-w-xs">${t.alamat}</div>
            </td>
            <td class="p-3 text-xs font-medium text-on-surface">${t.dinas}</td>
            <td class="p-3 whitespace-nowrap">
              <span class="px-2 py-0.5 rounded-full text-[10px] font-bold ${
                t.urgensi === 'Tinggi' ? 'bg-error-container text-on-error-container' : 'bg-surface-container text-on-surface'
              }">
                ${(t.urgensi || 'Sedang').toUpperCase()}
              </span>
            </td>
            <td class="p-3 whitespace-nowrap">
              <span class="px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
                t.status === 'Selesai' ? 'bg-emerald-100 text-emerald-800' :
                t.status === 'Penanganan' || t.status === 'Diverifikasi' ? 'bg-blue-100 text-blue-800' :
                t.status === 'Ditolak' ? 'bg-gray-200 text-gray-800' : 'bg-primary-fixed text-primary'
              }">
                ${t.status}
              </span>
            </td>
            <td class="p-3 text-xs text-on-surface whitespace-nowrap font-medium">${t.pelapor}</td>
            <td class="p-3 text-right whitespace-nowrap">
              <button type="button" class="btn-daftar-open-ticket px-2.5 py-1 rounded-lg bg-surface-container hover:bg-primary hover:text-white text-xs font-bold transition" data-id="${t.id}">
                Triase / Detail →
              </button>
            </td>
          </tr>
        `).join('');

        tableBody.querySelectorAll('.btn-daftar-open-ticket').forEach((btn) => {
          btn.addEventListener('click', () => {
            const tid = btn.getAttribute('data-id');
            const found = allTickets.find((x) => x.id === tid);
            switchOfficerTab('verifikasi');
            if (found) renderDrawer(found);
          });
        });
      }

      ws.innerHTML = `
        <div class="flex flex-col md:flex-row md:items-center justify-between pb-5 gap-3 border-b border-outline-variant/60">
          <div>
            <div class="flex items-center gap-2 text-label-sm font-label-sm text-outline mb-1">
              <span>Portal Admin Petugas</span>
              <span class="material-symbols-outlined text-xs">chevron_right</span>
              <span class="text-primary font-semibold">Daftar Seluruh Aduan Warga</span>
            </div>
            <h1 class="text-headline-lg font-headline-lg text-on-surface font-bold tracking-tight">
              Basis Data Aduan Masyarakat
            </h1>
            <p class="text-body-sm font-body-sm text-on-surface-variant mt-0.5">
              Katalog komprehensif seluruh pengaduan yang terdaftar pada sistem SIPANTAU.
            </p>
          </div>
          <div class="flex items-center gap-2">
            <button type="button" id="btn-export-daftar-csv" class="px-3.5 py-2 bg-emerald-800 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold transition flex items-center gap-1.5 shadow-sm">
              <span class="material-symbols-outlined text-sm">download</span>
              <span>Ekspor CSV</span>
            </button>
          </div>
        </div>

        <!-- Filter Controls Bar -->
        <div class="bg-surface-container-lowest p-4 rounded-xl border border-outline-variant shadow-sm my-5 space-y-3">
          <div class="flex flex-wrap items-center justify-between gap-3">
            <div class="flex flex-wrap items-center gap-2.5 flex-1 min-w-[300px]">
              <div class="relative flex-1 min-w-[200px]">
                <span class="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-sm">search</span>
                <input type="text" id="daftar-input-search" class="w-full pl-9 pr-3 py-1.5 text-xs bg-surface-container-low border border-outline-variant rounded-lg focus:outline-none focus:border-primary" placeholder="Cari No. Tiket, judul, pelapor, NIK, alamat..." />
              </div>

              <select id="daftar-select-status" class="py-1.5 px-3 text-xs bg-surface-container-low border border-outline-variant rounded-lg font-medium text-on-surface">
                <option value="Semua">Semua Status</option>
                <option value="Diajukan">Diajukan</option>
                <option value="Diverifikasi">Diverifikasi</option>
                <option value="Penanganan">Sedang Ditangani</option>
                <option value="Selesai">Selesai</option>
                <option value="Ditolak">Ditolak</option>
              </select>

              <select id="daftar-select-opd" class="py-1.5 px-3 text-xs bg-surface-container-low border border-outline-variant rounded-lg font-medium text-on-surface">
                <option value="Semua">Semua Dinas (OPD)</option>
                <option value="Bina Marga">Dinas Bina Marga</option>
                <option value="DLHK">Dinas Lingkungan Hidup</option>
                <option value="PDAM">Perumda Tirtawening</option>
                <option value="Dishub">Dinas Perhubungan</option>
                <option value="DPKP3">DPKP3 & Damkar</option>
                <option value="Satpol">Satpol PP</option>
              </select>
            </div>

            <span id="daftar-result-count" class="text-xs text-outline font-medium">Memuat...</span>
          </div>
        </div>

        <!-- Full Table Card -->
        <div class="bg-surface-container-lowest rounded-xl border border-outline-variant shadow-sm overflow-hidden flex-1">
          <div class="overflow-x-auto">
            <table class="w-full text-left border-collapse">
              <thead>
                <tr class="bg-surface-container-low text-[11px] font-bold text-outline uppercase tracking-wider border-b border-outline-variant">
                  <th class="p-3">No. Tiket</th>
                  <th class="p-3">Waktu</th>
                  <th class="p-3">Substansi Aduan</th>
                  <th class="p-3">Dinas Tujuan</th>
                  <th class="p-3">Urgensi</th>
                  <th class="p-3">Status</th>
                  <th class="p-3">Pelapor</th>
                  <th class="p-3 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody id="daftar-table-body" class="divide-y divide-outline-variant/30 text-xs"></tbody>
            </table>
          </div>
        </div>
      `;

      ws.querySelector('#daftar-input-search')?.addEventListener('input', (e) => {
        dSearch = e.target.value;
        renderDaftarTable();
      });
      ws.querySelector('#daftar-select-status')?.addEventListener('change', (e) => {
        dStatus = e.target.value;
        renderDaftarTable();
      });
      ws.querySelector('#daftar-select-opd')?.addEventListener('change', (e) => {
        dOpd = e.target.value;
        renderDaftarTable();
      });
      ws.querySelector('#btn-export-daftar-csv')?.addEventListener('click', () => {
        if (window.SiPantauDB && window.SiPantauDB.exportCSV) {
          window.SiPantauDB.exportCSV();
        }
      });

      renderDaftarTable();
    }

    // TAB 3: PETA SEBARAN KASUS (GIS OPERASIONAL TRIASE PETUGAS OPD)
    function renderPetaWorkspace() {
      let ws = document.getElementById('workspace-peta');
      if (!ws) {
        ws = document.createElement('div');
        ws.id = 'workspace-peta';
        ws.className = 'officer-workspace flex-1 flex flex-col overflow-hidden bg-[#FAF7F7]';
        workspaceContainer.appendChild(ws);
      }
      ws.style.display = 'flex';

      ws.innerHTML = `
        <!-- Tactical Header -->
        <div class="p-4 bg-surface-container-lowest border-b border-outline-variant flex flex-wrap items-center justify-between gap-3 shrink-0 shadow-xs">
          <div>
            <div class="flex items-center gap-2 text-label-sm font-label-sm text-outline mb-0.5">
              <span>Portal Admin Petugas</span>
              <span class="material-symbols-outlined text-xs">chevron_right</span>
              <span class="text-primary font-semibold">GIS Triase Operasional OPD (Backoffice)</span>
            </div>
            <h1 class="text-headline-sm font-bold text-on-surface">Peta Operasional Wilayah &amp; Posko Regu Lapangan</h1>
          </div>

          <!-- Tactical Filters -->
          <div class="flex flex-wrap items-center gap-2 text-xs">
            <span class="text-outline font-semibold">Layer:</span>
            <label class="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-surface-container cursor-pointer font-medium">
              <input type="checkbox" id="layer-incidents" checked class="text-primary rounded text-xs" />
              <span>Titik Aduan (${getTickets().length})</span>
            </label>
            <label class="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-surface-container cursor-pointer font-medium">
              <input type="checkbox" id="layer-fleet" checked class="text-primary rounded text-xs" />
              <span class="text-blue-800 font-bold">Armada URC (6 Unit)</span>
            </label>
            <select id="peta-opd-filter" class="py-1 px-2.5 text-xs bg-surface-container-low border border-outline-variant rounded font-semibold text-on-surface">
              <option value="Semua">Semua Dinas</option>
              <option value="Bina Marga">Bina Marga</option>
              <option value="DLHK">DLHK</option>
              <option value="PDAM">PDAM</option>
              <option value="Dishub">Dishub</option>
              <option value="DPKP3">DPKP3</option>
              <option value="Satpol">Satpol PP</option>
            </select>
          </div>
        </div>

        <!-- Split Map & Dispatch Panel -->
        <div class="flex-1 flex overflow-hidden">
          <!-- 70% Tactical Map Container -->
          <div class="flex-1 relative bg-slate-100 isolate" id="tactical-map-wrapper" style="isolation: isolate; z-index: 10;">
            <div id="officer-tactical-map" class="w-full h-full"></div>
            <!-- Tactical Map Address Search Bar -->
            <div class="absolute top-4 left-14 max-w-sm w-72 transition-all pointer-events-auto" style="z-index: 800;">
              <div class="relative flex items-center bg-white/95 backdrop-blur-md rounded-xl border border-gray-300 shadow-md overflow-hidden focus-within:ring-2 focus-within:ring-[#9E001F]">
                <span class="material-symbols-outlined ml-2.5 text-gray-500 text-[18px]">search</span>
                <input type="text" id="officer-map-search-input" class="w-full py-1.5 px-2 text-xs text-gray-900 bg-transparent focus:outline-none placeholder:text-gray-400 font-medium" placeholder="Cari alamat / posko di peta..." />
                <button type="button" id="officer-map-search-btn" class="px-2.5 py-1 bg-[#9E001F] hover:bg-[#800019] text-white text-[11px] font-bold shrink-0 transition rounded-md mr-1">Cari</button>
              </div>
            </div>
            <!-- Map Legend Tag -->
            <div class="absolute bottom-4 left-4 bg-white/95 backdrop-blur-md p-3 rounded-xl border border-outline-variant shadow-lg text-xs space-y-1.5 pointer-events-auto" style="z-index: 800;">
              <div class="font-bold text-on-surface text-[11px] uppercase tracking-wider mb-1">Legenda Operasional</div>
              <div class="flex items-center gap-2"><span class="w-3 h-3 rounded-full bg-red-600 ring-2 ring-red-300"></span> <span>Aduan Kritis &lt; 4 Jam SLA</span></div>
              <div class="flex items-center gap-2"><span class="w-3 h-3 rounded-full bg-blue-600"></span> <span>Sedang Ditangani Lapangan</span></div>
              <div class="flex items-center gap-2"><span class="w-3 h-3 rounded-full bg-emerald-600"></span> <span>Selesai Tuntas</span></div>
              <div class="flex items-center gap-2"><span class="w-3 h-3 rounded-sm bg-indigo-600"></span> <span>Posko / Armada URC Bergerak</span></div>
            </div>
          </div>

          <!-- 30% Right Dispatch Panel -->
          <aside class="w-80 xl:w-96 bg-surface-container-lowest border-l border-outline-variant flex flex-col h-full overflow-y-auto p-4 shrink-0 space-y-4">
            <div>
              <h2 class="font-bold text-xs uppercase tracking-wider text-outline mb-2">Status Armada Lapangan (URC)</h2>
              <div class="space-y-2">
                ${OPERATIONAL_FLEET.map((f) => `
                  <div class="p-3 rounded-xl border border-outline-variant/80 bg-surface-container-low text-xs space-y-1">
                    <div class="flex items-center justify-between">
                      <span class="font-bold text-on-surface truncate">${f.nama}</span>
                      <span class="px-2 py-0.5 rounded-full text-[9px] font-bold ${
                        f.status === 'Operasi Lapangan' ? 'bg-blue-100 text-blue-800' :
                        f.status === 'Menuju Lokasi' ? 'bg-amber-100 text-amber-800' : 'bg-gray-200 text-gray-800'
                      }">${f.status}</span>
                    </div>
                    <div class="text-[11px] text-outline">${f.kendaraan}</div>
                    <div class="flex items-center justify-between text-[10px] pt-1 text-on-surface font-mono">
                      <span>Komandan: ${f.komandan}</span>
                      <a href="tel:${f.kontak}" class="text-primary font-bold hover:underline">📞 Hubungi</a>
                    </div>
                  </div>
                `).join('')}
              </div>
            </div>

            <div class="pt-2 border-t border-outline-variant/60">
              <h2 class="font-bold text-xs uppercase tracking-wider text-outline mb-2">Petunjuk Triase Spasial</h2>
              <p class="text-xs text-on-surface leading-relaxed p-3 bg-surface-container-low rounded-xl border border-outline-variant">
                Klik salah satu pin aduan di peta untuk melihat detail insiden dan mengarahkan regu teknis dinas yang bertugas pada radius terdekat.
              </p>
            </div>
          </aside>
        </div>
      `;

      // Init Leaflet map for officer
      ensureLeaflet(() => {
        setTimeout(() => {
          const mapEl = document.getElementById('officer-tactical-map');
          if (!mapEl) return;
          if (officerTacticalMapInstance) {
            officerTacticalMapInstance.remove();
          }

          const map = window.L.map('officer-tactical-map').setView([-6.905, 107.618], 13);
          officerTacticalMapInstance = map;

          window.L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '© OpenStreetMap contributors • SIPANTAU Backoffice GIS'
          }).addTo(map);

          const incidentLayerGroup = window.L.layerGroup().addTo(map);
          const fleetLayerGroup = window.L.layerGroup().addTo(map);

          // Add Incidents
          getTickets().forEach((t) => {
            const isHigh = t.urgensi === 'Tinggi';
            const color = t.status === 'Selesai' ? '#10b981' : isHigh ? '#e11d48' : '#2563eb';
            const marker = window.L.circleMarker([t.lat, t.lng], {
              radius: isHigh ? 9 : 7,
              fillColor: color,
              color: '#ffffff',
              weight: 2,
              opacity: 1,
              fillOpacity: 0.9
            });

            marker.bindPopup(`
              <div style="font-family:'Plus Jakarta Sans',sans-serif;font-size:12px;min-width:200px;">
                <div style="font-weight:bold;color:#9e001f;">${t.id} • ${t.urgensi}</div>
                <div style="font-weight:600;margin:3px 0;">${t.judul}</div>
                <div style="font-size:11px;color:#666;">${t.dinas}</div>
                <div style="font-size:11px;color:#444;margin-top:4px;">${t.alamat}</div>
                <div style="margin-top:6px;">
                  <button onclick="window.SiPantauBackofficeGotoTicket('${t.id}')" style="background:#9e001f;color:#fff;border:none;padding:4px 8px;border-radius:4px;cursor:pointer;font-weight:bold;font-size:11px;">
                    Buka Antrean Disposisi →
                  </button>
                </div>
              </div>
            `);
            incidentLayerGroup.addLayer(marker);
          });

          // Add Fleet Vehicles
          OPERATIONAL_FLEET.forEach((f) => {
            const fMarker = window.L.marker([f.lat, f.lng], {
              title: f.nama
            });
            fMarker.bindPopup(`
              <div style="font-family:'Plus Jakarta Sans',sans-serif;font-size:12px;">
                <div style="font-weight:bold;color:#1e40af;">🚒 ${f.nama}</div>
                <div style="font-size:11px;color:#333;">${f.kendaraan}</div>
                <div style="font-size:11px;font-weight:bold;color:#047857;margin:3px 0;">Status: ${f.status}</div>
                <div style="font-size:10px;color:#666;">Komandan: ${f.komandan} • Kontak: ${f.kontak}</div>
              </div>
            `);
            fleetLayerGroup.addLayer(fMarker);
          });

          // Wire layer toggles
          const incToggle = ws.querySelector('#layer-incidents');
          const fltToggle = ws.querySelector('#layer-fleet');
          incToggle?.addEventListener('change', () => {
            if (incToggle.checked) map.addLayer(incidentLayerGroup);
            else map.removeLayer(incidentLayerGroup);
          });
          fltToggle?.addEventListener('change', () => {
            if (fltToggle.checked) map.addLayer(fleetLayerGroup);
            else map.removeLayer(fleetLayerGroup);
          });

          // Wire tactical map search
          const offInput = ws.querySelector('#officer-map-search-input');
          const offBtn = ws.querySelector('#officer-map-search-btn');
          async function doTacticalSearch() {
            const q = offInput?.value?.trim();
            if (!q) return;
            const geo = await forwardGeocode(q);
            if (geo) {
              map.flyTo([geo.lat, geo.lng], 16, { duration: 1.2 });
              showToast(`Peta taktikal dipusatkan ke: ${geo.name.slice(0, 45)}...`, 'success');
            } else {
              showToast(`Alamat "${q}" tidak ditemukan.`, 'warning');
            }
          }
          offBtn?.addEventListener('click', doTacticalSearch);
          offInput?.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              doTacticalSearch();
            }
          });
        }, 100);
      });
    }

    window.SiPantauBackofficeGotoTicket = function (id) {
      const found = getTickets().find((t) => t.id === id);
      switchOfficerTab('verifikasi');
      if (found) renderDrawer(found);
    };

    // TAB 5: LAPORAN KINERJA OPD (SPM COMPLIANCE EVALUATION)
    function renderKinerjaWorkspace() {
      let ws = document.getElementById('workspace-kinerja');
      if (!ws) {
        ws = document.createElement('div');
        ws.id = 'workspace-kinerja';
        ws.className = 'officer-workspace flex-1 flex flex-col overflow-y-auto p-6 min-w-0 bg-[#FAF7F7]';
        workspaceContainer.appendChild(ws);
      }
      ws.style.display = 'flex';

      const tickets = getTickets();
      const opdRows = [
        { nama: 'Dinas Bina Marga & Tata Ruang', masuk: 60, selesai: 54, aktif: 6, durasi: '3.2 Jam', sla: '94.5%', status: 'Sangat Baik', statusClass: 'bg-emerald-100 text-emerald-800', posko: 'Jl. Wastukancana No. 2' },
        { nama: 'Dinas Lingkungan Hidup (DLHK)', masuk: 50, selesai: 47, aktif: 3, durasi: '1.8 Jam', sla: '96.2%', status: 'Sangat Baik', statusClass: 'bg-emerald-100 text-emerald-800', posko: 'Depo Cibeunying' },
        { nama: 'Perumda Tirtawening (PDAM)', masuk: 29, selesai: 24, aktif: 5, durasi: '4.1 Jam', sla: '91.8%', status: 'Baik', statusClass: 'bg-blue-100 text-blue-800', posko: 'Badaksinga' },
        { nama: 'Dinas Perhubungan (Dishub)', masuk: 25, selesai: 23, aktif: 2, durasi: '2.5 Jam', sla: '95.0%', status: 'Sangat Baik', statusClass: 'bg-emerald-100 text-emerald-800', posko: 'CC Room Gedebage' },
        { nama: 'DPKP3 & Pemadam Damkar', masuk: 19, selesai: 19, aktif: 0, durasi: '0.8 Jam', sla: '99.1%', status: 'Sempurna', statusClass: 'bg-emerald-100 text-emerald-800', posko: 'Jl. Sukabumi No. 17' },
        { nama: 'Satuan Polisi Pamong Praja', masuk: 19, selesai: 17, aktif: 2, durasi: '2.1 Jam', sla: '92.4%', status: 'Baik', statusClass: 'bg-blue-100 text-blue-800', posko: 'Jl. Dalem Kaum' }
      ];

      ws.innerHTML = `
        <div class="flex flex-col md:flex-row md:items-center justify-between pb-5 gap-3 border-b border-outline-variant/60">
          <div>
            <div class="flex items-center gap-2 text-label-sm font-label-sm text-outline mb-1">
              <span>Portal Admin Petugas</span>
              <span class="material-symbols-outlined text-xs">chevron_right</span>
              <span class="text-primary font-semibold">Evaluasi SPM &amp; Rapor Kinerja OPD</span>
            </div>
            <h1 class="text-headline-lg font-headline-lg text-on-surface font-bold tracking-tight">
              Laporan Kinerja &amp; Standar Pelayanan Minimal (SPM)
            </h1>
            <p class="text-body-sm font-body-sm text-on-surface-variant mt-0.5">
              Matriks kepatuhan waktu penanganan dan efektivitas resolusi teknis lintas perangkat daerah.
            </p>
          </div>
          <div class="flex items-center gap-2">
            <button type="button" onclick="window.print()" class="px-3.5 py-2 bg-surface-container-lowest border border-outline-variant rounded-lg text-xs font-bold hover:bg-surface-container transition flex items-center gap-1.5 shadow-2xs">
              <span class="material-symbols-outlined text-sm">print</span> Cetak Dokumen Rapor
            </button>
            <button type="button" id="btn-export-kinerja-csv" class="px-3.5 py-2 bg-emerald-800 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold transition flex items-center gap-1.5 shadow-sm">
              <span class="material-symbols-outlined text-sm">download</span> Ekspor Rekap CSV
            </button>
          </div>
        </div>

        <!-- 3 KPI Cards -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 my-6">
          <div class="bg-surface-container-lowest p-4 rounded-xl border border-outline-variant shadow-sm">
            <div class="text-xs font-semibold text-outline">Rata-rata Kepatuhan SLA Kota</div>
            <div class="text-2xl font-extrabold text-emerald-700 mt-1">94.8%</div>
            <div class="text-[11px] text-emerald-800 mt-1 font-medium">Melampaui target nasional (≥ 90%)</div>
          </div>
          <div class="bg-surface-container-lowest p-4 rounded-xl border border-outline-variant shadow-sm">
            <div class="text-xs font-semibold text-outline">Respon Lapangan Tercepat</div>
            <div class="text-2xl font-extrabold text-primary mt-1">0.8 Jam</div>
            <div class="text-[11px] text-outline mt-1 font-medium">DPKP3 &amp; Damkar (Penyelamatan Darurat)</div>
          </div>
          <div class="bg-surface-container-lowest p-4 rounded-xl border border-outline-variant shadow-sm">
            <div class="text-xs font-semibold text-outline">Efektivitas Tindak Lanjut</div>
            <div class="text-2xl font-extrabold text-emerald-700 mt-1">96.4%</div>
            <div class="text-[11px] text-outline mt-1 font-medium">Terselesaikan sesuai target SOP operasional</div>
          </div>
        </div>

        <!-- OPD Matrix Table -->
        <div class="bg-surface-container-lowest rounded-xl border border-outline-variant shadow-sm overflow-hidden">
          <div class="p-4 border-b border-outline-variant flex items-center justify-between">
            <h2 class="font-bold text-sm text-on-surface">Matriks Evaluasi Kinerja 6 Organisasi Perangkat Daerah</h2>
            <span class="text-xs font-mono text-outline">Periode: Triwulan Berjalan 2024</span>
          </div>
          <div class="overflow-x-auto">
            <table class="w-full text-left border-collapse">
              <thead>
                <tr class="bg-surface-container-low text-[11px] font-bold text-outline uppercase tracking-wider border-b border-outline-variant">
                  <th class="p-3">Instansi OPD Teknis</th>
                  <th class="p-3 text-center">Aduan Masuk</th>
                  <th class="p-3 text-center">Selesai</th>
                  <th class="p-3 text-center">Aktif</th>
                  <th class="p-3 text-center">Rerata Respon</th>
                  <th class="p-3 text-center">Kepatuhan SLA</th>
                  <th class="p-3 text-center">Evaluasi</th>
                  <th class="p-3">Posko Siaga</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-outline-variant/30 text-xs">
                ${opdRows.map((r) => `
                  <tr class="hover:bg-surface-container-low transition">
                    <td class="p-3 font-bold text-on-surface">${r.nama}</td>
                    <td class="p-3 text-center font-mono">${r.masuk}</td>
                    <td class="p-3 text-center font-mono font-bold text-emerald-700">${r.selesai}</td>
                    <td class="p-3 text-center font-mono text-amber-700">${r.aktif}</td>
                    <td class="p-3 text-center font-mono">${r.durasi}</td>
                    <td class="p-3 text-center font-mono font-bold">${r.sla}</td>
                    <td class="p-3 text-center">
                      <span class="px-2 py-0.5 rounded-full text-[10px] font-bold ${r.statusClass}">${r.status}</span>
                    </td>
                    <td class="p-3 text-[11px] text-outline">${r.posko}</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>
      `;

      ws.querySelector('#btn-export-kinerja-csv')?.addEventListener('click', () => {
        if (window.SiPantauDB && window.SiPantauDB.exportCSV) {
          window.SiPantauDB.exportCSV();
        }
      });
    }

    // TAB 6: PENGATURAN SISTEM & MANAJEMEN AKUN VERIFIKATOR
    function renderPengaturanWorkspace() {
      let ws = document.getElementById('workspace-pengaturan');
      if (!ws) {
        ws = document.createElement('div');
        ws.id = 'workspace-pengaturan';
        ws.className = 'officer-workspace flex-1 flex flex-col overflow-y-auto p-6 min-w-0 bg-[#FAF7F7]';
        workspaceContainer.appendChild(ws);
      }
      ws.style.display = 'flex';

      ws.innerHTML = `
        <div class="flex flex-col md:flex-row md:items-center justify-between pb-5 gap-3 border-b border-outline-variant/60">
          <div>
            <div class="flex items-center gap-2 text-label-sm font-label-sm text-outline mb-1">
              <span>Portal Admin Petugas</span>
              <span class="material-symbols-outlined text-xs">chevron_right</span>
              <span class="text-primary font-semibold">Pengaturan Sistem &amp; Keamanan</span>
            </div>
            <h1 class="text-headline-lg font-headline-lg text-on-surface font-bold tracking-tight">
              Pengaturan Sistem Triase
            </h1>
            <p class="text-body-sm font-body-sm text-on-surface-variant mt-0.5">
              Kebijakan batas waktu penanganan (SLA), otorisasi akun verifikator, dan audit trail operasional.
            </p>
          </div>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 my-6">
          <!-- Kolom 1: Konfigurasi SLA & Kebijakan -->
          <div class="bg-surface-container-lowest p-5 rounded-xl border border-outline-variant shadow-sm space-y-4">
            <div class="flex items-center gap-2 pb-2 border-b border-outline-variant/60">
              <span class="material-symbols-outlined text-primary">tune</span>
              <h2 class="font-bold text-sm text-on-surface">Parameter Waktu Layanan (SLA)</h2>
            </div>
            <div class="space-y-3 text-xs">
              <div>
                <label class="block font-semibold text-on-surface mb-1">Target Respon Verifikasi Awal</label>
                <div class="flex items-center gap-2">
                  <input type="number" value="4" class="w-20 p-2 bg-surface-container-low border border-outline-variant rounded-lg text-xs font-bold" />
                  <span class="text-outline">Jam sejak tiket diajukan</span>
                </div>
              </div>
              <div>
                <label class="block font-semibold text-on-surface mb-1">Target Tindak Lanjut Fisik Lapangan</label>
                <div class="flex items-center gap-2">
                  <input type="number" value="72" class="w-20 p-2 bg-surface-container-low border border-outline-variant rounded-lg text-xs font-bold" />
                  <span class="text-outline">Jam maksimal penanganan</span>
                </div>
              </div>
              <div class="pt-2">
                <label class="inline-flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked class="text-primary rounded text-xs" />
                  <span class="font-semibold text-on-surface">Eskalasi otomatis ke Kepala Dinas jika SLA &lt; 1 Jam</span>
                </label>
              </div>
              <button type="button" id="btn-save-sla" class="w-full mt-2 py-2 bg-primary text-white font-bold rounded-lg hover:bg-primary-container transition">
                Simpan Perubahan Kebijakan
              </button>
            </div>
          </div>

          <!-- Kolom 2: Status Keamanan & Enkripsi -->
          <div class="bg-surface-container-lowest p-5 rounded-xl border border-outline-variant shadow-sm space-y-4">
            <div class="flex items-center gap-2 pb-2 border-b border-outline-variant/60">
              <span class="material-symbols-outlined text-primary">security</span>
              <h2 class="font-bold text-sm text-on-surface">Keamanan &amp; Integritas Data</h2>
            </div>
            <div class="space-y-2.5 text-xs">
              <div class="flex items-center gap-2 text-emerald-700 font-semibold">
                <span class="material-symbols-outlined text-sm">check_circle</span>
                <span>Enkripsi Database Berstandar TLS 1.3</span>
              </div>
              <div class="flex items-center gap-2 text-emerald-700 font-semibold">
                <span class="material-symbols-outlined text-sm">check_circle</span>
                <span>Pencatatan Hash EXIF Bukti Foto Warga</span>
              </div>
              <div class="flex items-center gap-2 text-emerald-700 font-semibold">
                <span class="material-symbols-outlined text-sm">check_circle</span>
                <span>Audit Trail Permanen Tak Dapat Dimanipulasi</span>
              </div>
              <div class="pt-3">
                <button type="button" id="btn-export-backup-pengaturan" class="w-full py-2 border border-outline-variant bg-surface-container-low hover:bg-surface-container rounded-lg font-bold text-on-surface transition flex items-center justify-center gap-2">
                  <span class="material-symbols-outlined text-sm">download</span> Unduh Cadangan JSON
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Tabel Akun Verifikator OPD -->
        <div class="bg-surface-container-lowest rounded-xl border border-outline-variant shadow-sm overflow-hidden mb-6">
          <div class="p-4 border-b border-outline-variant flex items-center justify-between">
            <h2 class="font-bold text-sm text-on-surface">Daftar Akun Petugas Verifikator Resmi OPD</h2>
            <span class="text-xs font-mono text-outline">${VERIFIERS_LIST.length} Personel Terdaftar</span>
          </div>
          <div class="overflow-x-auto">
            <table class="w-full text-left border-collapse">
              <thead>
                <tr class="bg-surface-container-low text-[11px] font-bold text-outline uppercase tracking-wider border-b border-outline-variant">
                  <th class="p-3">Nama & NIP Pegawai</th>
                  <th class="p-3">Instansi Induk</th>
                  <th class="p-3">Jabatan</th>
                  <th class="p-3">Peran Akses</th>
                  <th class="p-3">Status</th>
                  <th class="p-3 text-right">Terakhir Aktif</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-outline-variant/30 text-xs">
                ${VERIFIERS_LIST.map((v) => `
                  <tr class="hover:bg-surface-container-low transition">
                    <td class="p-3">
                      <div class="font-bold text-on-surface">${v.nama}</div>
                      <div class="font-mono text-[11px] text-outline">NIP. ${v.nip}</div>
                    </td>
                    <td class="p-3 font-medium text-on-surface">${v.instansi}</td>
                    <td class="p-3 text-outline">${v.jabatan}</td>
                    <td class="p-3">
                      <span class="px-2 py-0.5 rounded text-[10px] font-bold ${
                        v.role === 'Superadmin' ? 'bg-primary text-white' : 'bg-surface-container text-on-surface'
                      }">${v.role}</span>
                    </td>
                    <td class="p-3">
                      <span class="inline-flex items-center gap-1 text-emerald-700 font-bold">
                        <span class="w-2 h-2 rounded-full bg-emerald-500"></span> ${v.status}
                      </span>
                    </td>
                    <td class="p-3 text-right text-outline font-mono text-[11px]">${v.terakhirAktif}</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>
      `;

      ws.querySelector('#btn-save-sla')?.addEventListener('click', () => {
        showToast('Konfigurasi SLA dan kebijakan operasional berhasil disimpan.', 'success');
      });
      ws.querySelector('#btn-export-backup-pengaturan')?.addEventListener('click', () => {
        const json = JSON.stringify(getTickets(), null, 2);
        const blob = new Blob([json], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `sipantau_backup_${new Date().toISOString().slice(0, 10)}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      });
    }

    // Bind click events on all 6 sidebar tabs
    document.querySelectorAll('.officer-nav-tab').forEach((nav) => {
      nav.addEventListener('click', (e) => {
        e.preventDefault();
        const view = nav.getAttribute('data-view');
        if (view) switchOfficerTab(view);
      });
    });

    // =========================================================================
    // D. MODAL INPUT ADUAN MANUAL (WALK-IN / POSKO WARGA / LAPANGAN)
    // =========================================================================
    const btnManualInput = document.getElementById('btn-officer-manual-input');
    if (btnManualInput) {
      btnManualInput.addEventListener('click', () => {
        let m = document.getElementById('modal-officer-manual-input');
        if (!m) {
          m = document.createElement('div');
          m.id = 'modal-officer-manual-input';
          m.className = 'fixed inset-0 z-[9995] flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs';
          m.innerHTML = `
            <div class="bg-white rounded-2xl max-w-lg w-full border border-outline-variant shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
              <div class="bg-primary text-white p-4 flex items-center justify-between">
                <div class="flex items-center gap-2">
                  <span class="material-symbols-outlined">post_add</span>
                  <div>
                    <h3 class="font-bold text-sm">Input Aduan Manual (Walk-in / Posko Warga)</h3>
                    <p class="text-[10px] text-[#ffdad8]">Pencatatan langsung ke antrean triase dinas</p>
                  </div>
                </div>
                <button type="button" id="close-manual-input" class="p-1 rounded hover:bg-white/20 text-white">
                  <span class="material-symbols-outlined">close</span>
                </button>
              </div>
              <form id="form-manual-input" class="p-5 space-y-3.5 text-xs">
                <div>
                  <label class="block font-bold text-on-surface mb-1">Judul Ringkasan Aduan *</label>
                  <input type="text" id="manual-judul" required placeholder="Contoh: Aspal Amblas di Depan Pasar..." class="w-full p-2 bg-surface-container-low border border-outline-variant rounded-lg text-xs" />
                </div>
                <div class="grid grid-cols-2 gap-3">
                  <div>
                    <label class="block font-bold text-on-surface mb-1">Nama Pelapor *</label>
                    <input type="text" id="manual-pelapor" required placeholder="Nama warga pelapor..." class="w-full p-2 bg-surface-container-low border border-outline-variant rounded-lg text-xs" />
                  </div>
                  <div>
                    <label class="block font-bold text-on-surface mb-1">Nomor Telepon / NIK</label>
                    <input type="text" id="manual-kontak" placeholder="0812-xxxx-xxxx" class="w-full p-2 bg-surface-container-low border border-outline-variant rounded-lg text-xs" />
                  </div>
                </div>
                <div class="grid grid-cols-2 gap-3">
                  <div>
                    <label class="block font-bold text-on-surface mb-1">Dinas (OPD) Tujuan *</label>
                    <select id="manual-dinas" class="w-full p-2 bg-surface-container-low border border-outline-variant rounded-lg text-xs font-medium">
                      <option value="Dinas Bina Marga & Tata Ruang">Dinas Bina Marga & Tata Ruang</option>
                      <option value="Dinas Lingkungan Hidup (DLHK)">Dinas Lingkungan Hidup (DLHK)</option>
                      <option value="Perumda Tirtawening (PDAM)">Perumda Tirtawening (PDAM)</option>
                      <option value="Dinas Perhubungan">Dinas Perhubungan</option>
                      <option value="DPKP3 & Damkar">DPKP3 & Damkar</option>
                      <option value="Satuan Polisi Pamong Praja">Satuan Polisi Pamong Praja</option>
                    </select>
                  </div>
                  <div>
                    <label class="block font-bold text-on-surface mb-1">Tingkat Urgensi</label>
                    <select id="manual-urgensi" class="w-full p-2 bg-surface-container-low border border-outline-variant rounded-lg text-xs font-medium">
                      <option value="Tinggi">Tinggi (SLA &lt; 4 Jam)</option>
                      <option value="Sedang" selected>Sedang (SLA &lt; 24 Jam)</option>
                      <option value="Rendah">Rendah (SLA &lt; 72 Jam)</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label class="block font-bold text-on-surface mb-1">Titik Lokasi Kejadian *</label>
                  <input type="text" id="manual-alamat" required placeholder="Nama jalan, nomor, patokan gedung..." class="w-full p-2 bg-surface-container-low border border-outline-variant rounded-lg text-xs" />
                </div>
                <div>
                  <label class="block font-bold text-on-surface mb-1">Deskripsi Substansi Aduan *</label>
                  <textarea id="manual-deskripsi" rows="3" required placeholder="Rincikan fakta temuan lapangan dari pelapor..." class="w-full p-2 bg-surface-container-low border border-outline-variant rounded-lg text-xs"></textarea>
                </div>
                <div class="flex items-center justify-end gap-2 pt-2 border-t border-outline-variant/60">
                  <button type="button" id="btn-cancel-manual" class="px-3.5 py-1.5 rounded-lg border border-outline-variant text-on-surface font-semibold hover:bg-surface-container-low">Batal</button>
                  <button type="submit" class="px-4 py-1.5 rounded-lg bg-primary hover:bg-primary-container text-white font-bold shadow-xs">Simpan ke Antrean Triase</button>
                </div>
              </form>
            </div>
          `;
          document.body.appendChild(m);

          m.querySelector('#close-manual-input').onclick = () => m.classList.add('hidden');
          m.querySelector('#btn-cancel-manual').onclick = () => m.classList.add('hidden');
          m.querySelector('#form-manual-input').onsubmit = (ev) => {
            ev.preventDefault();
            const judul = m.querySelector('#manual-judul').value.trim();
            const pelapor = m.querySelector('#manual-pelapor').value.trim();
            const kontak = m.querySelector('#manual-kontak').value.trim() || 'Via Posko Warga';
            const dinas = m.querySelector('#manual-dinas').value;
            const urgensi = m.querySelector('#manual-urgensi').value;
            const alamat = m.querySelector('#manual-alamat').value.trim();
            const deskripsi = m.querySelector('#manual-deskripsi').value.trim();

            const tickets = getTickets();
            const randomCode = Math.floor(1000 + Math.random() * 9000);
            const newTicket = {
              id: `#TKT-2024-${randomCode}`,
              code: `TKT-2024-${randomCode}`,
              judul,
              kategori: 'Aduan Manual Lapangan',
              kategoriLabel: dinas,
              dinas,
              alamat,
              kecamatan: 'Kec. Sumur Bandung',
              waktu: 'Baru saja',
              sla: urgensi === 'Tinggi' ? 'SLA 3j 59m' : 'SLA 23j 59m',
              urgensi,
              triaseLevel: 'Triase Level 1',
              status: 'Diverifikasi',
              upvotes: 1,
              lat: -6.9175 + (Math.random() - 0.5) * 0.03,
              lng: 107.6191 + (Math.random() - 0.5) * 0.03,
              pelapor: `${pelapor} (Walk-in / Posko)`,
              nik: '3273**********9901',
              telepon: kontak,
              deskripsi,
              foto: 'https://images.unsplash.com/photo-1584467735871-8e85353a8413?auto=format&fit=crop&w=600&q=80',
              petugas: 'Budi Santoso (Diskominfo)',
              timeline: [
                { tahap: 'Aduan Masuk via Posko/Offline', waktu: 'Baru saja', keterangan: 'Dicatat langsung oleh Verifikator Budi Santoso.', done: true },
                { tahap: 'Diteruskan ke OPD Teknis', waktu: 'Baru saja', keterangan: `Didisposisikan ke ${dinas}.`, active: true }
              ],
              messages: []
            };

            tickets.unshift(newTicket);
            saveTickets(tickets);
            showToast(`Aduan manual ${newTicket.id} berhasil ditambahkan ke antrean triase!`, 'success');
            m.classList.add('hidden');
            m.querySelector('#form-manual-input').reset();
            renderTable();
            renderDrawer(newTicket);
            switchOfficerTab('verifikasi');
          };
        }
        m.classList.remove('hidden');
      });
    }

    // =========================================================================
    // E. MODAL SOP TRIASE & DISPOSISI PETUGAS
    // =========================================================================
    const btnSop = document.getElementById('btn-officer-sop');
    if (btnSop) {
      btnSop.addEventListener('click', () => {
        let m = document.getElementById('modal-officer-sop');
        if (!m) {
          m = document.createElement('div');
          m.id = 'modal-officer-sop';
          m.className = 'fixed inset-0 z-[9995] flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs';
          m.innerHTML = `
            <div class="bg-white rounded-2xl max-w-lg w-full border border-outline-variant shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
              <div class="bg-primary text-white p-4 flex items-center justify-between">
                <div class="flex items-center gap-2">
                  <span class="material-symbols-outlined">menu_book</span>
                  <div>
                    <h3 class="font-bold text-sm">SOP Triase &amp; Disposisi Teknis Petugas Pemda</h3>
                    <p class="text-[10px] text-[#ffdad8]">Pedoman Baku Verifikasi Pengaduan Masyarakat</p>
                  </div>
                </div>
                <button type="button" id="close-sop-modal" class="p-1 rounded hover:bg-white/20 text-white">
                  <span class="material-symbols-outlined">close</span>
                </button>
              </div>
              <div class="p-5 space-y-3.5 text-xs text-on-surface max-h-[70vh] overflow-y-auto leading-relaxed">
                <div class="p-3 bg-red-50 rounded-xl border border-red-200 text-primary">
                  <div class="font-bold mb-1 flex items-center gap-1">
                    <span class="material-symbols-outlined text-sm">priority_high</span> Kategori Urgensi Tinggi (SLA &lt; 4 Jam)
                  </div>
                  <p class="text-[11px] leading-normal text-on-surface">Meliputi jalan amblas dalam, pohon tumbang menutup jalan protokol/menimpa kabel PLN, pipa utama PDAM pecah membanjiri jalan, dan situasi yang mengancam keselamatan jiwa.</p>
                </div>

                <div class="p-3 bg-blue-50 rounded-xl border border-blue-200 text-blue-900">
                  <div class="font-bold mb-1 flex items-center gap-1">
                    <span class="material-symbols-outlined text-sm">schedule</span> Kategori Urgensi Sedang (SLA &lt; 24 Jam)
                  </div>
                  <p class="text-[11px] leading-normal text-on-surface">Meliputi tumpukan sampah liar di trotoar, lampu penerangan jalan (PJU) padam di pemukiman, dan gangguan ketertiban umum PKL.</p>
                </div>

                <div class="p-3 bg-gray-50 rounded-xl border border-gray-200">
                  <div class="font-bold mb-1 text-on-surface">Aturan Disposisi Lintas Sektor</div>
                  <p class="text-[11px] text-on-surface-variant">Jika aduan melibatkan lebih dari 1 dinas (contoh: pipa PDAM bocor merusak aspal Bina Marga), Diskominfo bertindak sebagai koordinator triase utama dan meneruskan penanganan simultan ke kedua OPD.</p>
                </div>
              </div>
              <div class="p-3 bg-surface-container-low border-t border-outline-variant/60 flex justify-end">
                <button type="button" id="btn-close-sop" class="px-4 py-1.5 rounded-lg bg-primary text-white font-bold text-xs">Tutup Pedoman</button>
              </div>
            </div>
          `;
          document.body.appendChild(m);
          m.querySelector('#close-sop-modal').onclick = () => m.classList.add('hidden');
          m.querySelector('#btn-close-sop').onclick = () => m.classList.add('hidden');
        }
        m.classList.remove('hidden');
      });
    }

    // =========================================================================
    // F. KELUAR SESI PETUGAS OPD (PEMISAHAN TOTAL PORTAL WARGA & ADMIN)
    // =========================================================================
    const btnLogout = document.getElementById('btn-officer-logout');
    if (btnLogout) {
      btnLogout.addEventListener('click', () => {
        // Beritahu parent window (React App.tsx) untuk beralih mode ke Portal Warga
        window.parent.postMessage({ type: 'sipantau:switch-portal', mode: 'warga' }, '*');
        localStorage.setItem('SIPANTAU_PORTAL_MODE', 'warga');
        showToast('Sesi petugas backoffice berhasil diakhiri.', 'info');
        setTimeout(() => {
          window.location.href = resolvePageUrl('beranda_sistem_pengaduan_masyarakat');
        }, 300);
      });
    }
  }

  // 9. NAVIGASI GLOBAL & QUICK-SWITCHER DOCK ANTAR 5 HALAMAN STITCH
  function initNavigationAndDock() {
    // Tambahkan safe-area padding bottom agar elemen footer/tabel tidak tertutup floating dock
    document.body.style.paddingBottom = '5.5rem';

    const pages = {
      beranda: resolvePageUrl('beranda_sistem_pengaduan_masyarakat'),
      peta: resolvePageUrl('peta_pengaduan_kolektif_warga'),
      formulir: resolvePageUrl('formulir_pengaduan_multi_step_warga'),
      dashboard: resolvePageUrl('dashboard_petugas_verifikasi_disposisi'),
      bantuan: resolvePageUrl('pusat_bantuan_kebijakan_privasi_sipantau')
    };

    document.querySelectorAll('a, button').forEach((el) => {
      const txt = (el.textContent || '').trim().toLowerCase();
      const href = el.getAttribute('href') || '';

      if (el.tagName === 'A') {
        if (txt === 'beranda' || href === '#beranda') el.href = pages.beranda;
        else if (txt.includes('peta pengaduan') || txt.includes('peta sebaran') || href === '#peta') el.href = pages.peta;
        else if (txt === 'bantuan' || txt.includes('pusat bantuan') || txt.includes('pedoman pengaduan')) el.href = pages.bantuan;
        else if (txt.includes('kebijakan privasi') || txt.includes('ketentuan layanan') || txt.includes('keterbukaan informasi')) {
          if (!window.location.pathname.includes('pusat_bantuan')) el.href = pages.bantuan + '#kebijakan-privasi';
        } else if (txt.includes('buat pengaduan') || href === '#ajukan') el.href = pages.formulir;
        else if (txt.includes('lacak pengaduan') || txt.includes('buka pelacak') || href === '#lacak') {
          el.addEventListener('click', (e) => {
            e.preventDefault();
            window.openTicketTrackerModal();
          });
        } else if (txt.includes('lihat arsip transparansi')) el.href = pages.peta;
      }

      if (txt === 'masuk' || txt === 'daftar') {
        el.addEventListener('click', (e) => {
          e.preventDefault();
          window.openCivicAuthModal();
        });
      } else if (txt.includes('mulai buat pengaduan') || txt.includes('buat aduan baru')) {
        el.addEventListener('click', (e) => {
          e.preventDefault();
          if (window.parent !== window) {
            window.parent.postMessage({ type: 'sipantau:navigate', page: 'formulir' }, '*');
          } else {
            window.location.href = pages.formulir;
          }
        });
      } else if (txt.includes('lihat riwayat')) {
        el.addEventListener('click', (e) => {
          e.preventDefault();
          window.openTicketTrackerModal('#TKT-2024-8841');
        });
      }
    });

    // Floating Quick-Switcher Pill di bagian bawah layar
    const path = window.location.pathname;

    const dock = document.createElement('div');
    dock.id = 'sipantau-floating-dock';
    dock.style.fontFamily = "'Plus Jakarta Sans', sans-serif";

    // JIKA DI HALAMAN ADMIN / DASHBOARD PETUGAS OPD: Tampilkan Dock Khusus Backoffice
    if (path.includes('dashboard_petugas')) {
      dock.className = 'fixed bottom-3 left-1/2 -translate-x-1/2 z-[9990] bg-[#1a1b22]/95 text-white backdrop-blur-md border border-red-500/40 rounded-full shadow-2xl px-3 py-1.5 flex items-center gap-2 text-xs transition-all duration-200';
      dock.innerHTML = `
        <div class="flex items-center gap-1.5 font-bold text-red-400 pr-2 border-r border-white/20">
          <span class="material-symbols-outlined text-[16px]">admin_panel_settings</span>
          <span class="text-[11px] uppercase tracking-wider">Backoffice OPD</span>
        </div>
        <a href="${pages.beranda}" class="flex items-center gap-1.5 px-3 py-1.5 rounded-full font-bold bg-[#9e001f] hover:bg-[#c8102e] text-white transition-all shadow-xs" title="Keluar dari Panel Admin ke Portal Warga">
          <span class="material-symbols-outlined text-[15px]">arrow_back</span>
          <span>Keluar ke Portal Warga</span>
        </a>
        <button type="button" id="btn-admin-export-csv" class="flex items-center gap-1 px-2.5 py-1.5 rounded-full bg-emerald-800/90 hover:bg-emerald-700 text-white font-medium transition" title="Unduh CSV">
          <span class="material-symbols-outlined text-[15px]">download</span>
          <span class="hidden sm:inline">Ekspor CSV</span>
        </button>
      `;
      dock.querySelector('#btn-admin-export-csv')?.addEventListener('click', () => {
        if (window.SiPantauDB && window.SiPantauDB.exportCSV) {
          window.SiPantauDB.exportCSV();
        }
      });
      dock.querySelector('a')?.addEventListener('click', (ev) => {
        if (window.parent !== window) {
          ev.preventDefault();
          window.parent.postMessage({ type: 'sipantau:switch-portal', mode: 'warga' }, '*');
        }
      });
      document.body.appendChild(dock);
      return;
    }

    // JIKA DI HALAMAN WARGA: Hanya tampilkan menu warga (Beranda, Buat Aduan, Peta Publik, Bantuan)
    let isCollapsed = localStorage.getItem('SIPANTAU_DOCK_COLLAPSED') === 'true';
    dock.className = 'fixed bottom-3 left-1/2 -translate-x-1/2 z-[9990] bg-white/95 backdrop-blur-md border border-[#e5bdbb] rounded-full shadow-2xl px-2 py-1.5 flex items-center gap-1 text-xs transition-all duration-200';

    const navItems = [
      { label: 'Beranda', icon: 'home', url: pages.beranda, match: 'beranda', page: 'beranda' },
      { label: 'Buat Aduan', icon: 'edit_note', url: pages.formulir, match: 'formulir', page: 'formulir' },
      { label: 'Peta Publik', icon: 'map', url: pages.peta, match: 'peta_pengaduan', page: 'peta' },
      { label: 'Bantuan & Privasi', icon: 'help', url: pages.bantuan, match: 'pusat_bantuan', page: 'bantuan' }
    ];

    function renderDock() {
      if (isCollapsed) {
        dock.innerHTML = `
          <button type="button" id="btn-expand-dock" class="flex items-center gap-1 px-3 py-1.5 rounded-full bg-[#9e001f] text-white font-bold hover:bg-[#c8102e] transition shadow-xs" title="Tampilkan Menu Navigasi">
            <span class="material-symbols-outlined text-[16px]">menu</span>
            <span class="text-[11px]">Navigasi SIPANTAU</span>
          </button>
        `;
        dock.querySelector('#btn-expand-dock')?.addEventListener('click', () => {
          isCollapsed = false;
          localStorage.setItem('SIPANTAU_DOCK_COLLAPSED', 'false');
          renderDock();
        });
      } else {
        dock.innerHTML = `
          ${navItems.map((item) => {
            const active = path.includes(item.match) || (item.match === 'beranda' && path.includes('sistem_pengaduan_masyarakat_sipantau'));
            return `
              <a href="${item.url}" data-page="${item.page}" aria-label="${item.label}" ${active ? 'aria-current="page"' : ''} class="flex items-center gap-1.5 px-3 py-1.5 rounded-full font-semibold transition-all ${
                active ? 'bg-[#c8102e] text-white shadow-sm' : 'text-[#5c403f] hover:bg-[#ffdad8]/40 hover:text-[#9e001f]'
              }">
                <span class="material-symbols-outlined text-[16px]">${item.icon}</span>
                <span class="hidden sm:inline">${item.label}</span>
              </a>
            `;
          }).join('')}
          <button type="button" id="btn-collapse-dock" class="p-1 rounded-full text-gray-400 hover:text-[#9e001f] transition ml-1" title="Ciutkan Menu Dock" aria-label="Ciutkan menu">
            <span class="material-symbols-outlined text-sm">unfold_less</span>
          </button>
        `;
        dock.querySelector('#btn-collapse-dock')?.addEventListener('click', () => {
          isCollapsed = true;
          localStorage.setItem('SIPANTAU_DOCK_COLLAPSED', 'true');
          renderDock();
        });
      }
    }

    renderDock();
    dock.addEventListener('click', (ev) => {
      const link = ev.target && ev.target.closest ? ev.target.closest('a[data-page]') : null;
      if (link && window.parent !== window) {
        ev.preventDefault();
        window.parent.postMessage({ type: 'sipantau:navigate', page: link.dataset.page }, '*');
      }
    });
    // Beri ruang agar dock tidak menutupi tombol/footer di bagian bawah halaman
    document.body.style.paddingBottom = 'max(env(safe-area-inset-bottom), 4.5rem)';
    document.body.appendChild(dock);
  }

  // 10. KOMPONEN RINGKASAN STATISTIK HARIAN PADA HALAMAN BERANDA (DATA LOCALSTORAGE)
  function initBerandaStatsPage() {
    const isBeranda =
      window.location.pathname.includes('beranda_sistem_pengaduan_masyarakat') ||
      window.location.pathname.includes('sistem_pengaduan_masyarakat_sipantau') ||
      window.location.pathname === '/' ||
      (window.location.pathname.endsWith('code.html') && document.title.includes('Beranda'));

    if (!isBeranda) return;

    function renderDailyStatsComponent() {
      const stats = window.SiPantauDB.getDailyStats();

      // 1. Update 4 Kartu Metrik di Strip Hero Utama
      const heroMetricTexts = document.querySelectorAll('.text-headline-lg');
      if (heroMetricTexts.length >= 4) {
        heroMetricTexts[0].textContent = (48900 + stats.totalAduan).toLocaleString('id-ID');
        heroMetricTexts[1].textContent = `${stats.persentaseSelesai || 94}%`;
        heroMetricTexts[2].textContent = stats.rataWaktuResponFormat;
        heroMetricTexts[3].innerHTML = `4.9 <span class="text-body-sm font-normal text-on-surface-variant">/ 5.0</span>`;
      }

      // 2. Cari atau Buat Wadah Komponen Ringkasan Statistik Harian
      let root = document.getElementById('sipantau-daily-summary-root');
      if (!root) {
        const alurSection = document.getElementById('alur');
        root = document.createElement('div');
        root.id = 'sipantau-daily-summary-root';
        root.className = 'max-w-7xl mx-auto px-4 md:px-8 mt-12 mb-6 relative z-20';
        if (alurSection) {
          alurSection.parentNode.insertBefore(root, alurSection);
        } else {
          const main = document.querySelector('main') || document.body;
          main.appendChild(root);
        }
      }

      root.innerHTML = `
        <div class="bg-gradient-to-r from-white via-white to-[#fff8f8] rounded-2xl border-2 border-[#e5bdbb] shadow-xl p-6 md:p-8 space-y-6">
          <!-- Header Statistik Harian -->
          <div class="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-[#e5bdbb]/80">
            <div class="flex items-center gap-3.5">
              <div class="w-12 h-12 rounded-2xl bg-[#9e001f] text-white flex items-center justify-center shadow-md">
                <span class="material-symbols-outlined text-2xl">insights</span>
              </div>
              <div>
                <div class="flex items-center gap-2">
                  <h3 class="text-xl font-extrabold text-[#1b1b1f] tracking-tight" style="font-family:'Plus Jakarta Sans',sans-serif;">
                    Ringkasan Statistik Harian SIPANTAU
                  </h3>
                  <span class="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
                    <span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span> LIVE LOCALSTORAGE
                  </span>
                </div>
                <p class="text-xs text-[#5c403f] mt-0.5">
                  Rekapitulasi aduan masuk hari ini & kinerja rata-rata respon cepat dinas teknis pemerintah daerah
                </p>
              </div>
            </div>

            <div class="flex items-center gap-2">
              <button id="btn-refresh-daily-stats" type="button" class="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white border border-[#e5bdbb] text-[#9e001f] font-bold text-xs hover:bg-[#ffdad8]/30 transition shadow-2xs">
                <span class="material-symbols-outlined text-base">refresh</span> Segarkan Statistik
              </button>
              <button onclick="window.openTicketTrackerModal()" type="button" class="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#c8102e] hover:bg-[#9e001f] text-white font-bold text-xs transition shadow-2xs">
                <span class="material-symbols-outlined text-base">search</span> Lacak Aduan Anda
              </button>
            </div>
          </div>

          <!-- 4 Grid Kartu Metrik Harian -->
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            <!-- Kartu 1: Aduan Hari Ini -->
            <div class="bg-white rounded-xl p-5 border border-[#e5bdbb] shadow-2xs hover:shadow-md transition">
              <div class="flex items-center justify-between">
                <span class="text-xs font-bold uppercase tracking-wider text-[#5c403f]">Aduan Masuk Hari Ini</span>
                <div class="w-9 h-9 rounded-xl bg-[#ffdad8] text-[#9e001f] flex items-center justify-center">
                  <span class="material-symbols-outlined text-xl">today</span>
                </div>
              </div>
              <div class="text-3xl font-extrabold text-[#9e001f] mt-2">
                ${stats.aduanHariIni} <span class="text-sm font-medium text-[#5c403f]">Laporan</span>
              </div>
              <div class="mt-2 text-xs text-[#5c403f] flex items-center gap-1 font-medium">
                <span class="material-symbols-outlined text-sm text-emerald-600">check_circle</span>
                <span>Terverifikasi Geotagging GPS</span>
              </div>
            </div>

            <!-- Kartu 2: Rata-rata Waktu Respon -->
            <div class="bg-white rounded-xl p-5 border border-[#e5bdbb] shadow-2xs hover:shadow-md transition">
              <div class="flex items-center justify-between">
                <span class="text-xs font-bold uppercase tracking-wider text-[#5c403f]">Rata-rata Waktu Respon</span>
                <div class="w-9 h-9 rounded-xl bg-amber-100 text-amber-900 flex items-center justify-center">
                  <span class="material-symbols-outlined text-xl">timer</span>
                </div>
              </div>
              <div class="text-3xl font-extrabold text-amber-900 mt-2">
                ${stats.rataWaktuResponFormat}
              </div>
              <div class="mt-2 text-xs text-emerald-700 font-semibold flex items-center gap-1">
                <span class="material-symbols-outlined text-sm">bolt</span>
                <span>SLA Cepat: &lt; 2 Jam Terpenuhi</span>
              </div>
            </div>

            <!-- Kartu 3: Sedang Ditangani OPD -->
            <div class="bg-white rounded-xl p-5 border border-[#e5bdbb] shadow-2xs hover:shadow-md transition">
              <div class="flex items-center justify-between">
                <span class="text-xs font-bold uppercase tracking-wider text-[#5c403f]">Sedang Ditangani OPD</span>
                <div class="w-9 h-9 rounded-xl bg-blue-100 text-blue-800 flex items-center justify-center">
                  <span class="material-symbols-outlined text-xl">engineering</span>
                </div>
              </div>
              <div class="text-3xl font-extrabold text-blue-900 mt-2">
                ${stats.sedangDiproses} <span class="text-sm font-medium text-[#5c403f]">Kasus Aktif</span>
              </div>
              <div class="mt-2 text-xs text-[#5c403f] flex items-center gap-1 font-medium">
                <span class="material-symbols-outlined text-sm text-blue-600">sync</span>
                <span>Regu Reaksi Cepat di lokasi</span>
              </div>
            </div>

            <!-- Kartu 4: Tuntas Diselesaikan -->
            <div class="bg-white rounded-xl p-5 border border-[#e5bdbb] shadow-2xs hover:shadow-md transition">
              <div class="flex items-center justify-between">
                <span class="text-xs font-bold uppercase tracking-wider text-[#5c403f]">Tuntas Diselesaikan</span>
                <div class="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
                  <span class="material-symbols-outlined text-xl">task_alt</span>
                </div>
              </div>
              <div class="text-3xl font-extrabold text-emerald-800 mt-2">
                ${stats.tuntasHariIni} <span class="text-sm font-medium text-[#5c403f]">(${stats.persentaseSelesai}%)</span>
              </div>
              <div class="mt-2 text-xs text-emerald-700 flex items-center gap-1 font-semibold">
                <span class="material-symbols-outlined text-sm">verified</span>
                <span>Disertai bukti foto pengerjaan</span>
              </div>
            </div>
          </div>

          <!-- Distribusi Sektor Kategori Hari Ini -->
          <div class="pt-3 border-t border-[#e5bdbb]/80 flex flex-wrap items-center justify-between gap-3 text-xs">
            <div class="flex flex-wrap items-center gap-2">
              <span class="font-bold text-[#5c403f]">Sebaran Kategori Hari Ini:</span>
              ${stats.kategoriPopuler.map(c => `
                <span class="px-2.5 py-1 rounded-full bg-white border border-[#e5bdbb] text-[#1b1b1f] font-semibold flex items-center gap-1.5 shadow-2xs">
                  <span class="w-2 h-2 rounded-full bg-[#c8102e]"></span> ${c.nama} (${c.jumlah})
                </span>
              `).join('')}
            </div>
            <div class="flex items-center gap-2 text-[11px] text-[#5c403f]">
              <span class="material-symbols-outlined text-sm text-emerald-600">sync</span>
              <span>Sinkron otomatis dari LocalStorage browser</span>
            </div>
          </div>
        </div>
      `;

      root.querySelector('#btn-refresh-daily-stats')?.addEventListener('click', () => {
        renderDailyStatsComponent();
        showToast('Statistik harian berhasil disegarkan dari LocalStorage!', 'info');
      });
    }

    renderDailyStatsComponent();
    window.addEventListener('sipantau:db-updated', renderDailyStatsComponent);
  }

  // 11. INISIALISASI
  function syncDarkMode() {
    try {
      const isDark = localStorage.getItem('SIPANTAU_DARK_MODE') === 'true';
      if (isDark) {
        document.documentElement.classList.add('dark');
        document.body.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
        document.body.classList.remove('dark');
      }
    } catch (_) {}
  }

  function init() {
    syncDarkMode();
    window.addEventListener('storage', (e) => {
      if (e.key === 'SIPANTAU_DARK_MODE') syncDarkMode();
    });
    window.addEventListener('message', (e) => {
      if (e.data && e.data.type === 'SIPANTAU_TOGGLE_DARK') syncDarkMode();
    });

    initNavigationAndDock();
    initBerandaStatsPage();
    initCollectiveMapPage();
    initCitizenFormPage();
    initOfficerDashboardPage();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
