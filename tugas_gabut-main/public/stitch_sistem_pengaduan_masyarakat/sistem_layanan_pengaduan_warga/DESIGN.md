---
name: Sistem Layanan Pengaduan Warga
colors:
  surface: '#fbf8fe'
  surface-dim: '#dcd9de'
  surface-bright: '#fbf8fe'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f5f2f8'
  surface-container: '#f0edf2'
  surface-container-high: '#eae7ed'
  surface-container-highest: '#e4e1e7'
  on-surface: '#1b1b1f'
  on-surface-variant: '#5c403f'
  inverse-surface: '#303034'
  inverse-on-surface: '#f3f0f5'
  outline: '#906f6e'
  outline-variant: '#e5bdbb'
  surface-tint: '#bf0229'
  primary: '#9e001f'
  on-primary: '#ffffff'
  primary-container: '#c8102e'
  on-primary-container: '#ffdad8'
  inverse-primary: '#ffb3b1'
  secondary: '#0051d5'
  on-secondary: '#ffffff'
  secondary-container: '#316bf3'
  on-secondary-container: '#fefcff'
  tertiary: '#773e00'
  on-tertiary: '#ffffff'
  tertiary-container: '#9a5200'
  on-tertiary-container: '#ffdcc3'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#ffdad8'
  primary-fixed-dim: '#ffb3b1'
  on-primary-fixed: '#410007'
  on-primary-fixed-variant: '#92001c'
  secondary-fixed: '#dbe1ff'
  secondary-fixed-dim: '#b4c5ff'
  on-secondary-fixed: '#00174b'
  on-secondary-fixed-variant: '#003ea8'
  tertiary-fixed: '#ffdcc3'
  tertiary-fixed-dim: '#ffb77d'
  on-tertiary-fixed: '#2f1500'
  on-tertiary-fixed-variant: '#6e3900'
  background: '#fbf8fe'
  on-background: '#1b1b1f'
  surface-variant: '#e4e1e7'
typography:
  display-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 48px
    fontWeight: '800'
    lineHeight: 56px
  display-lg-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 32px
    fontWeight: '800'
    lineHeight: 40px
  headline-xl:
    fontFamily: Plus Jakarta Sans
    fontSize: 36px
    fontWeight: '700'
    lineHeight: 44px
  headline-xl-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 26px
    fontWeight: '700'
    lineHeight: 34px
  headline-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 28px
    fontWeight: '700'
    lineHeight: 36px
  headline-lg-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 22px
    fontWeight: '700'
    lineHeight: 30px
  headline-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
  headline-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 16px
    fontWeight: '600'
    lineHeight: 24px
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Inter
    fontSize: 15px
    fontWeight: '400'
    lineHeight: 24px
  body-sm:
    fontFamily: Inter
    fontSize: 13px
    fontWeight: '400'
    lineHeight: 20px
  label-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 15px
    fontWeight: '600'
    lineHeight: 20px
  label-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 13px
    fontWeight: '600'
    lineHeight: 18px
  label-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 11px
    fontWeight: '700'
    lineHeight: 16px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  gutter: 1.5rem
  gutter-mobile: 1rem
  margin: 2rem
  margin-mobile: 1rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2.5rem
---

## Brand & Style

Sistem desain ini dirancang untuk platform pelayanan dan triase pengaduan publik pemerintah daerah. Pendekatan visual mengusung gaya **Modern Civic-Tech SaaS**: bersih, transparan, berwibawa, namun tetap ramah dan mudah dipahami oleh seluruh lapisan masyarakat (inklusif). 

Prinsip utama:
- **Akuntabel & Berwibawa:** Membangun kepercayaan warga melalui keteraturan visual, kejelasan status penanganan, dan penyampaian informasi yang terstruktur rapi.
- **Transparan & Cepat Tanggap:** Setiap proses laporan disajikan secara terbuka tanpa birokrasi visual yang membingungkan.
- **Aksesibel & Manusiawi:** Kontras tinggi, alur pelaporan terarah, bahasa visual yang suportif, serta empati terhadap keluhan publik.

## Colors

Palet warna diformulasikan untuk memenuhi standar aksesibilitas WCAG 2.1 AA/AAA dengan hierarki pelaporan publik yang jelas:

- **Merah Utama (Primary / #C8102E):** Warna identitas pelayanan sipil nasional. Digunakan untuk tindakan utama (CTA), header aktif, dan identitas instansi.
  - Hover/Active: `#9B0B22`
  - Subdued / Tint: `#FDECEF`
  - Border Subdued: `#F9CBD2`
- **Warna Latar & Netral:**
  - Kanvas Utama: `#FAF7F7` (warm off-white)
  - Kartu & Kontainer: `#FFFFFF` (pure white)
  - Border & Pembatas: `#E8E3E3`
  - Teks Utama (Headings & Body): `#1F1F23` (charcoal)
  - Teks Sekunder & Keterangan: `#6B6B76` (muted gray)

### Status Alur Pengaduan (Civic Complaint Lifecycle)
Setiap status memiliki pasangan kontras teks dan kontainer latar:
1. **Diajukan:** `#C8102E` (Teks/Ikon) | `#FDECEF` (Background)
2. **Diverifikasi:** `#D97706` (Teks/Ikon) | `#FEF3C7` (Background)
3. **Penanganan:** `#2563EB` (Teks/Ikon) | `#EFF6FF` (Background)
4. **Selesai:** `#16A34A` (Teks/Ikon) | `#DCFCE7` (Background)
5. **Ditolak:** `#4B5563` (Teks/Ikon) | `#F3F4F6` (Background)

## Typography

Tipografi memadukan ekspresi modern dan kejelasan utilitarian:
- **Plus Jakarta Sans** digunakan untuk display, tajuk (headline), label, badge status, dan navigasi guna memberikan kesan ramah, modern, dan optimis.
- **Inter** dialokasikan khusus untuk isi bacaan (body), form isian, log riwayat pengaduan, dan data analitik triase untuk memaksimalkan keterbacaan data padat dan narasi keluhan warga.
- Angka pada nomor tiket pengaduan (misal: `#LAPOR-2024-0891`) dan koordinat geografis diwajibkan menggunakan fitur OpenType `tabular figures` (`tnum`) guna keselarasan visual vertikal.

## Layout & Spacing

Sistem tata letak mengadopsi struktur grid 12-kolom responsif yang mengutamakan ruang bernapas (whitespace) agar informasi permohonan publik tidak terasa membebani:

- **Desktop (≥ 1024px):** Grid 12 kolom dengan margin tepi `2rem` (32px), gutter antarkolom `1.5rem` (24px), dan lebar maksimal kanvas aplikasi `1280px` (terpusat).
- **Tablet (768px - 1023px):** Grid 8 kolom dengan margin `1.5rem` (24px) dan gutter `1.25rem` (20px).
- **Mobile (< 768px):** Grid 4 kolom dengan margin `1rem` (16px) dan gutter `1rem` (16px).

Ritme vertikal dikontrol secara ketat menggunakan kelipatan 4px/8px:
- Padding kartu aduan: `space-lg` (24px) pada desktop, diturunkan ke `space-md` (16px) pada mobile.
- Gap antar-field formulir: `space-md` (16px).
- Jarak antar seksi pelaporan: `space-xl` (40px).

## Elevation & Depth

Kedalaman antarmuka dicapai melalui kombinasi **border berdefinisi tinggi** dan **bayangan difus hangat (warm ambient shadows)** untuk menghindari kesan mengambang yang berlebihan, mencerminkan ketegasan sistem pemerintahan:

- **Surface Level 0 (Kanvas):** `#FAF7F7` murni tanpa bayangan.
- **Surface Level 1 (Kartu & Panel Standar):** Latar `#FFFFFF`, border `1px solid #E8E3E3`, bayangan `0 1px 3px rgba(31, 31, 35, 0.04), 0 1px 2px rgba(31, 31, 35, 0.02)`.
- **Surface Level 2 (Kartu Interaktif / Hover):** Bayangan `0 6px 16px -2px rgba(31, 31, 35, 0.08), 0 2px 6px -1px rgba(31, 31, 35, 0.04)`.
- **Surface Level 3 (Dropdown, Popover, Timeline Tooltip):** Bayangan `0 10px 24px -4px rgba(31, 31, 35, 0.10)`.
- **Surface Level 4 (Modal Triase & Dialog Konfirmasi):** Bayangan `0 20px 32px -8px rgba(31, 31, 35, 0.14)` dipadukan dengan backdrop overlay `rgba(31, 31, 35, 0.48)`.

## Shapes

Bahasa bentuk menggunakan roundedness tingkat `2` (8px dasar) dengan penerapan kontekstual:
- **Kontainer Utama, Kartu Aduan & Modal:** Menggunakan `rounded-lg` (16px) untuk memberikan siluet kontemporer, ramah, dan tidak kaku.
- **Tombol, Input Fields, & Dropdowns:** Menggunakan `rounded` (8px - 12px) untuk menjaga kestabilan ergonomi klik dan input.
- **Badge Status & Chips Kategori:** Menggunakan bentuk kapsul/pill penuh (`9999px`) untuk membedakan elemen penanda status dengan elemen interaksi berkotak.

## Components

### Tombol (Buttons)
- **Primary:** Latar `#C8102E`, teks `#FFFFFF`, tinggi 44px (touch-friendly), font `label-md`. Status hover berpindah ke `#9B0B22`. State fokus wajib menampilkan outline cincin `#FDECEF` setebal 3px dengan border `#C8102E`.
- **Secondary:** Latar `#FFFFFF`, border `1.5px solid #E8E3E3`, teks `#1F1F23`. Hover: Latar `#FAF7F7` dengan border `#6B6B76`.
- **Destructive:** Latar `#FDECEF`, teks `#C8102E`. Hover: Latar `#C8102E`, teks `#FFFFFF`.

### Badge Status Pengaduan (Civic Status Badges)
Elemen visual krusial penanda tahapan laporan masyarakat:
- Menggunakan radius `rounded-full`, padding horizontal `10px`, vertikal `4px`, font `label-sm` (uppercase / letter-spacing `0.5px`).
- Dilengkapi titik indikator bulat 6px (*pulsing dot* khusus untuk status **Penanganan**).
- Varian: *Diajukan* (Krem Kemerahan), *Diverifikasi* (Amber Terang), *Penanganan* (Biru Lembut), *Selesai* (Hijau Pastel), *Ditolak* (Abu-abu Slate).

### Kolom Isian Formulir (Input Fields & Area Laporan)
- Latar `#FFFFFF`, border `1.5px solid #E8E3E3`, radius `10px`, padding `12px 14px`, teks `#1F1F23`.
- State fokus bertransisi tegas ke border `#C8102E` tanpa offset buram yang berlebihan.
- Label berada di luar input (top-aligned) menggunakan `label-md`, teks pembantu (helper text) menggunakan `body-sm` warna `#6B6B76`.

### Kartu Tiket Aduan (Complaint Ticket Card)
- Latar `#FFFFFF`, border `1px solid #E8E3E3`, radius `16px`, padding `20px`.
- Struktur hierarki internal: Header kartu menampilkan ID Tiket (#LAPOR-XXXX) dan Badge Status. Badan kartu menampilkan Judul Masalah (`headline-sm`), pratinjau deskripsi 2 baris (`body-md`), thumbnail foto bukti (rasio 1:1, radius 8px), dan metadata footer (Kecamatan/Lokasi, Dinas Terkait, & Waktu Pelaporan).

### Linimasa Progres (Triage Timeline Stepper)
- Garis penghubung vertikal/horizontal selebar 2px berwarna `#E8E3E3` (berubah menjadi hijau `#16A34A` untuk langkah yang telah dilalui).
- Titik simpul (node) berdiameter 24px berisi centang untuk status terselesaikan, atau angka langkah untuk tahapan aktif. Setiap simpul mencantumkan tanggal, jam, petugas penanggung jawab, serta nota tindak lanjut.