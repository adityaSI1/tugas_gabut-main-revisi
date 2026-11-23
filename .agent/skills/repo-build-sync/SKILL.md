---
name: repo-build-sync
description: Aturan struktur folder, perlindungan file dokumentasi, serta verifikasi build Vite dan sinkronisasi GitHub Pages pada proyek SIPANTAU.
---

# Repository Architecture & Build Guard

## 1. Batasan File
- Edit HANYA pada source utama: `tugas_gabut-main/src/`, `tugas_gabut-main/public/sipantau-engine.js`, dan folder `tugas_gabut-main/public/stitch_sistem_pengaduan_masyarakat/`.
- DILARANG mengubah atau menghapus file dokumentasi/pembanding: `bapperida-manadokota/`, `docs/`, `perbandingan-bapperida-lamongan.html`, dan `DOKUMEN_PERBANDINGAN_MOCKUP_VS_BAPPERIDA_LAMONGAN.md`.
- Jangan menambah library UI berat baru; pertahankan stack yang ada agar ringan untuk GitHub Pages.

## 2. Verifikasi Wajib
- Periksa `.github/workflows/deploy.yml`, jalankan unit test (`civic-db.test.ts` jika relevan) serta `npm run build` di `tugas_gabut-main/` sampai 0 error, lalu sinkronkan hasil build sesuai konfigurasi deploy.
