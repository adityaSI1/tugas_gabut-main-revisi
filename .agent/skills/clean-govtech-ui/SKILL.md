---
name: clean-govtech-ui
description: Standar desain antarmuka web bersih, profesional, dan anti-AI-slop dengan mempertahankan warna tema merah bawaan SIPANTAU secara rapi dan konsisten.
---

# Clean GovTech UI Guidelines

Aturan di skill ini memiliki prioritas tertinggi setiap kali mengubah HTML, CSS, TSX, atau komponen visual di SIPANTAU.

## 1. Larangan Keras (Anti-AI Slop)
- DILARANG membuat navigasi lebih dari satu lapis (hapus top utility bar, status ticker hitam, dan floating bottom pill bar jika sudah ada navbar utama).
- DILARANG menempatkan kartu/widget melayang dengan `position: absolute` yang menutupi teks atau elemen utama (seperti kartu geotag yang menumpuk di atas kartu laporan).
- DILARANG memakai emoji dekoratif pada judul/tombol, animasi `pulse`/`bounce` yang tidak perlu, titik status hijau menyala, gradien mencolok berlebihan, atau glassmorphism di semua kartu.
- DILARANG menumpuk lebih dari 1 badge/pill pada satu kartu atau header.

## 2. Disiplin Warna (Pertahankan Warna Tema Merah Asli)
- PERTAHANKAN warna merah/crimson bawaan SIPANTAU sebagai identitas utama (hero, tombol CTA primer, indikator menu aktif, dan aksen utama).
- JANGAN mengganti warna tema ke biru atau palet lain, tetapi seimbangkan dengan latar belakang netral bersih (`#FFFFFF` untuk kartu/navbar, `#F8FAFC` untuk latar section), teks kontras tinggi (`#0F172A` judul, `#475569` isi), dan border tipis (`1px solid #E2E8F0`).

## 3. Tata Letak & Tipografi
- Gunakan tepat SATU sticky navbar putih yang bersih (tinggi 64px–72px, maksimal 5 menu teks utama tanpa ikon di tiap tautan, dan 1 hamburger menu rapi untuk mobile).
- Beri whitespace lega antar section (`py-12` hingga `py-20`), pastikan tidak ada teks terpotong rusak, tidak ada horizontal scroll (360px–1440px), dan semua klaim SLA layanan konsisten di seluruh halaman.
