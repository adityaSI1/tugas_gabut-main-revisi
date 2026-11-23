/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Unit tests untuk SIPANTAU SQLite Database & Backend Layer
 */

import { test } from 'node:test';
import assert from 'node:assert/strict';
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
  getVerifierAccounts
} from './db.js';

test('SQLite Database: initial data exists and is populated', () => {
  const tickets = getAllTickets();
  assert.ok(tickets.length >= 4, 'Minimal 4 tiket awal ada di SQLite');
  const t1 = tickets.find((t) => t.id === '#LAPOR-2410-092');
  assert.ok(t1, 'Tiket #LAPOR-2410-092 ditemukan');
  assert.equal(t1?.judul, 'Jalan Rusak & Berlubang Dalam');
});

test('SQLite Database: getTicketById returns correct ticket with messages', () => {
  const ticket = getTicketById('#LAPOR-2410-092');
  assert.ok(ticket);
  assert.equal(ticket?.id, '#LAPOR-2410-092');
  assert.ok(Array.isArray(ticket?.messages));
  assert.ok((ticket?.messages || []).length >= 1, 'Memiliki pesan dua arah');
});

test('SQLite Database: createNewTicket inserts and persists new record', () => {
  const newTicket = createNewTicket({
    judul: 'Lampu Penerangan Mati di Pasar Baru',
    kategori: 'Lampu Jalan PJU',
    dinas: 'Dinas Perhubungan',
    alamat: 'Jl. Otto Iskandardinata No. 50',
    lat: -6.9201,
    lng: 107.6052,
    pelapor: 'Ahmad S.',
    deskripsi: 'Lampu penerangan jalan umum mati total sejak 3 hari.'
  });

  assert.ok(newTicket.id.startsWith('#LAPOR-'));
  assert.equal(newTicket.status, 'Diajukan');

  // Ambil ulang dari database untuk verifikasi persistensi
  const reloaded = getTicketById(newTicket.id);
  assert.ok(reloaded);
  assert.equal(reloaded?.judul, 'Lampu Penerangan Mati di Pasar Baru');
});

test('SQLite Database: updateTicketTriage updates status and timeline', () => {
  const updated = updateTicketTriage(
    '#LAPOR-2410-092',
    'Penanganan',
    'Dinas Bina Marga & Tata Ruang',
    'Tim URC telah tiba di lokasi dengan material aspal.',
    'Siti Maryam (URC)'
  );

  assert.ok(updated);
  assert.equal(updated?.status, 'Penanganan');
  const lastTimeline = updated?.timeline[updated.timeline.length - 1];
  assert.ok(lastTimeline?.tahap.includes('Penanganan'));
});

test('SQLite Database: addMessageToTicket adds relational message', () => {
  const updated = addMessageToTicket('#LAPOR-2410-092', {
    senderRole: 'petugas',
    senderName: 'Siti Maryam',
    text: 'Tim sudah mulai menambal lubang jalan.'
  });

  assert.ok(updated);
  const msgs = updated?.messages || [];
  const found = msgs.find((m) => m.text === 'Tim sudah mulai menambal lubang jalan.');
  assert.ok(found);
  assert.equal(found?.senderRole, 'petugas');
});

test('SQLite Database: upvoteTicketById increments upvote counter', () => {
  const before = getTicketById('#LAPOR-2410-092')?.upvotes || 0;
  const newCount = upvoteTicketById('#LAPOR-2410-092');
  assert.equal(newCount, before + 1);
});

test('SQLite Database: relational tables audit_logs, units, and verifiers work', () => {
  const logs = getAuditLogs();
  assert.ok(logs.length > 0, 'Audit logs tercatat');

  const units = getOperationalUnits();
  assert.ok(units.length > 0, 'Operational units tersedia');

  const verifiers = getVerifierAccounts();
  assert.ok(verifiers.length > 0, 'Verifier accounts tersedia');
});
