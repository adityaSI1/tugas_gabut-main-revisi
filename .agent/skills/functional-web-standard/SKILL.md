---
name: functional-web-standard
description: Standar implementasi interaksi, manajemen state client-side, validasi form, dan zero dead-buttons agar mockup berfungsi penuh seperti aplikasi web nyata.
---

# Functional Web Application Standard

## 1. Zero Dead Elements
- DILARANG menyisakan `href="#"`, tombol tanpa event handler, tab mati, atau filter/pencarian pajangan.
- Setiap modal, drawer, dan dropdown wajib bisa ditutup lewat tombol close, klik backdrop, dan tombol `Escape`.

## 2. Alur Data & Persistensi
- Simpan seluruh perubahan data (aduan baru, verifikasi, disposisi OPD, sesi login demo) ke state terpusat dan `localStorage` (`civic-db.ts` / `sipantau-engine.js`) agar data bertahan saat halaman di-refresh.
- Sediakan seed data yang realistis saat storage kosong, dan pastikan perubahan data di satu halaman langsung sinkron ke Beranda, Lacak Tiket, Peta Pengaduan, dan Dashboard OPD.

## 3. UX Feedback & Error Handling
- Wajib ada validasi input form yang jelas, pesan error spesifik, tampilan `empty state` saat data/pencarian kosong, notifikasi toast minimalis sesuai tema SIPANTAU, dan 0 error di browser console.
