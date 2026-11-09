import test from 'node:test';
import assert from 'node:assert/strict';
import {
  validateTicket,
  filterTickets,
  applyTriageStatus,
  addTicketMessage,
  calculateDailyStats,
  addTicketRating,
  generateTicketsCsv,
  calculateOpdPerformance,
  CivicTicket
} from './civic-db';

const sampleTicket: CivicTicket = {
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
  status: 'Diajukan',
  upvotes: 34,
  lat: -6.890451,
  lng: 107.612824,
  pelapor: 'Warga Terverifikasi',
  nik: '3273**********0019',
  telepon: '+62 813-****-8821',
  deskripsi: 'Aspal jalan utama berlubang sedalam 20 cm.',
  foto: 'https://example.com/pothole.jpg',
  petugas: 'Belum Ditugaskan',
  timeline: [
    { tahap: 'Laporan Diajukan Warga', waktu: 'Hari ini, 09:15 WIB', keterangan: 'Tiket masuk sistem.', done: true }
  ],
  messages: []
};

test('validateTicket checks title and coordinates', () => {
  const validResult = validateTicket(sampleTicket);
  assert.equal(validResult.valid, true);
  assert.equal(validResult.errors.length, 0);

  const invalidResult = validateTicket({
    judul: 'bad',
    alamat: '',
    lat: NaN,
    lng: 107.61
  });
  assert.equal(invalidResult.valid, false);
  assert.equal(invalidResult.errors.length, 3);
});

test('filterTickets filters by category, search keyword, and dinas OPD', () => {
  const tickets = [
    sampleTicket, // dinas: 'Dinas Bina Marga & Tata Ruang'
    {
      ...sampleTicket,
      id: '#TKT-2024-8841',
      judul: 'Pipa Bocor Menimbulkan Banjir',
      kategori: 'Drainase / Banjir',
      kategoriLabel: 'Infrastruktur Air',
      dinas: 'Perumda Tirtawening (PDAM)',
      status: 'Penanganan' as const
    },
    {
      ...sampleTicket,
      id: '#TKT-2024-8839',
      judul: 'Tumpukan Sampah Liar Trotoar',
      kategori: 'Sampah & Kebersihan',
      kategoriLabel: 'Kebersihan Kota',
      dinas: 'Dinas Lingkungan Hidup',
      status: 'Diajukan' as const
    }
  ];

  const filteredJalan = filterTickets(tickets, { category: 'Jalan' });
  assert.equal(filteredJalan.length, 1);
  assert.equal(filteredJalan[0].id, '#LAPOR-2410-092');

  const filteredSearch = filterTickets(tickets, { search: 'banjir' });
  assert.equal(filteredSearch.length, 1);
  assert.equal(filteredSearch[0].id, '#TKT-2024-8841');

  // Filter berdasarkan Dinas: Bina Marga
  const filteredBinaMarga = filterTickets(tickets, { dinas: 'Bina Marga' });
  assert.equal(filteredBinaMarga.length, 1);
  assert.equal(filteredBinaMarga[0].id, '#LAPOR-2410-092');

  // Filter berdasarkan Dinas: DLHK
  const filteredDLHK = filterTickets(tickets, { dinas: 'DLHK' });
  assert.equal(filteredDLHK.length, 1);
  assert.equal(filteredDLHK[0].id, '#TKT-2024-8839');

  // Filter berdasarkan Dinas: PDAM
  const filteredPDAM = filterTickets(tickets, { dinas: 'PDAM' });
  assert.equal(filteredPDAM.length, 1);
  assert.equal(filteredPDAM[0].id, '#TKT-2024-8841');
});

test('applyTriageStatus updates ticket status and appends timeline entry', () => {
  const updated = applyTriageStatus(
    sampleTicket,
    'Diverifikasi',
    'Dinas Bina Marga',
    'Disposisi ke regu perbaikan',
    'Budi Santoso (Admin)'
  );

  assert.equal(updated.status, 'Diverifikasi');
  assert.equal(updated.petugas, 'Budi Santoso (Admin)');
  assert.equal(updated.timeline.length, 2);
  assert.equal(updated.timeline[1].tahap, 'Status Diperbarui: Diverifikasi');
  assert.equal(updated.timeline[1].active, true);
});

test('addTicketMessage adds two-way communication message with optional photo', () => {
  const ticketWithCitizenMsg = addTicketMessage(sampleTicket, {
    senderRole: 'warga',
    senderName: 'Budi Pratama',
    text: 'Foto tambahan kondisi jalan ambles tadi pagi.',
    foto: 'data:image/png;base64,samplephoto'
  });

  assert.equal(ticketWithCitizenMsg.messages?.length, 1);
  assert.equal(ticketWithCitizenMsg.messages?.[0].senderRole, 'warga');
  assert.equal(ticketWithCitizenMsg.messages?.[0].foto, 'data:image/png;base64,samplephoto');

  const ticketWithOfficerReply = addTicketMessage(ticketWithCitizenMsg, {
    senderRole: 'petugas',
    senderName: 'Siti M. (Bina Marga)',
    text: 'Tim regu sedang menuju ke lokasi.',
    foto: 'https://example.com/repair-team.jpg'
  });

  assert.equal(ticketWithOfficerReply.messages?.length, 2);
  assert.equal(ticketWithOfficerReply.messages?.[1].senderRole, 'petugas');
  assert.equal(ticketWithOfficerReply.messages?.[1].senderName, 'Siti M. (Bina Marga)');
});

test('calculateDailyStats computes today incoming tickets and response averages', () => {
  const tickets: CivicTicket[] = [
    { ...sampleTicket, waktu: 'Hari ini, 09:15 WIB', status: 'Diverifikasi' },
    { ...sampleTicket, id: '#TKT-2', waktu: 'Hari ini, 10:00 WIB', status: 'Penanganan' },
    { ...sampleTicket, id: '#TKT-3', waktu: 'Kemarin, 14:00 WIB', status: 'Selesai' }
  ];

  const stats = calculateDailyStats(tickets);
  assert.equal(stats.totalAduan, 3);
  assert.equal(stats.aduanHariIni, 2);
  assert.equal(stats.sedangDiproses, 2);
  assert.equal(stats.tuntasHariIni, 1);
  assert.ok(stats.rataWaktuResponMenit > 0);
  assert.ok(stats.rataWaktuResponFormat.includes('Menit'));
});

test('addTicketRating saves citizen satisfaction rating and updates timeline', () => {
  const rated = addTicketRating(sampleTicket, {
    stars: 5,
    aspects: ['Respon Cepat', 'Pengerjaan Rapi'],
    comment: 'Terima kasih perbaikan jalan sudah mulus kembali!'
  });

  assert.equal(rated.rating?.stars, 5);
  assert.equal(rated.rating?.aspects?.length, 2);
  assert.equal(rated.rating?.comment, 'Terima kasih perbaikan jalan sudah mulus kembali!');
  assert.ok(rated.timeline.some((t) => t.tahap.includes('5 Bintang')));
});

test('generateTicketsCsv produces valid UTF-8 CSV with headers and rows', () => {
  const csv = generateTicketsCsv([sampleTicket]);
  assert.ok(csv.startsWith('\uFEFF'));
  assert.ok(csv.includes('Nomor Tiket'));
  assert.ok(csv.includes('#LAPOR-2410-092'));
  assert.ok(csv.includes('Dinas Bina Marga'));
});

test('calculateOpdPerformance aggregates metrics for municipal OPDs', () => {
  const perf = calculateOpdPerformance([sampleTicket]);
  assert.equal(perf.length, 6);
  const bm = perf.find((p) => p.singkatan === 'Bina Marga');
  assert.ok(bm);
  assert.equal(bm?.totalMasuk, 1);
  assert.equal(bm?.aktif, 1);
  assert.ok(bm?.slaCompliancePercent > 90);
});

