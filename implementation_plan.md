# 🚀 Implementation Plan: SampulKreativ Station

Platform konten kreatif komersil yang menggabungkan konsep **Webtoon** (komik), **Dracin/ShortMax** (video series), dan **Wattpad** (novel) dalam satu ekosistem dengan sistem monetisasi koin, iklan, dan program kreator bagi hasil 50/50.

---

## Tech Stack

| Layer | Teknologi | Alasan |
|---|---|---|
| **Framework** | Next.js 16 + TypeScript | SSR/SSG untuk SEO, routing bawaan, performa tinggi |
| **Styling** | Vanilla CSS + CSS Variables | Kontrol penuh, performa maksimal, dark/light mode via variabel |
| **Database** | Supabase (PostgreSQL) | Lo sudah punya akun, gratis, real-time, auth bawaan |
| **Storage** | Supabase Storage | Untuk gambar komik, video, cover art |
| **Auth** | Supabase Auth | Login/register, role-based (reader vs creator) |
| **Font** | Google Fonts (Inter, Outfit) | Tipografi modern dan premium |

---

## Strategi Pengerjaan: Fase Bertahap

Karena proyek ini sangat besar, kita akan kerjakan secara **bertahap**. Setiap fase menghasilkan sesuatu yang bisa langsung dilihat dan diuji.

---

## 📦 FASE 1: Fondasi & Halaman Utama (Prioritas Pertama)

Fokus: Setup project, design system (dark/light mode), dan semua halaman utama dengan **data dummy** terlebih dahulu agar lo bisa langsung lihat dan review tampilannya.

### Design System & Layout

#### [NEW] `src/styles/globals.css`
- CSS Variables lengkap untuk **Dark Mode** (default) dan **Light Mode**
- Palet warna: Deep navy (#0a0e1a), accent purple (#7c3aed), accent gold (#f59e0b), neon cyan, gradient-gradient mewah sesuai screenshot
- Typography system (heading, body, caption)
- Utility classes (container, grid, spacing)
- Smooth transition untuk pergantian tema

#### [NEW] `src/styles/components.css`
- Reusable component styles: cards, buttons, badges, modals, sidebar, navbar
- Status badges (Free, VIP, AD, Locked)
- Progress bars, coin indicators, floating menus

#### [NEW] `src/components/layout/`
- **Navbar.tsx**: Logo SampulKreativ, navigasi (Home, Comics, Novels, Videos, Wallet), search bar, saldo koin, notifikasi, avatar user
- **Sidebar.tsx**: Navigasi sidebar untuk halaman Library & Creator Hub
- **Footer.tsx**: Links (Terms, Privacy, Help, Creator Program), copyright
- **ThemeToggle.tsx**: Tombol switch Dark/Light mode (ikon matahari/bulan)

---

### Halaman-Halaman Utama

#### [NEW] `src/app/page.tsx` — Landing / Home
- **Hero Section**: Banner besar dengan featured content (gambar cyberpunk full-width), judul series, sinopsis, tombol "Read Now" & "Add to Library"
- **Continue Reading**: Horizontal scroll card untuk melanjutkan bacaan terakhir
- **Trending Comics**: Grid card horizontal dengan cover art, judul, genre, views
- **Popular Novels**: Grid card serupa
- **New Video Series**: Grid card serupa
- **Creator Program CTA**: Banner ajakan "Ready to start earning?" dengan tombol "Register Now"

#### [NEW] `src/app/comics/page.tsx` — Daftar Komik
- Filter & sort (genre, popularity, latest)
- Grid card komik dengan cover, judul, genre, rating, views
- Label status di setiap card (Original, Free, VIP)

#### [NEW] `src/app/comics/[id]/page.tsx` — Detail Series Komik
- Cover besar, judul, sinopsis, rating, total views
- Daftar episode/chapter ke bawah dengan thumbnail
- Setiap episode menampilkan label: "Baca" (gratis), "Iklan atau X Koin", "X Koin" (premium), ikon gembok
- Countdown timer "Gratis dalam 14 Hari" untuk episode premium

#### [NEW] `src/app/comics/[id]/[chapter]/page.tsx` — Comic Viewer (Webtoon-style)
- **Infinite vertical scroll** untuk panel-panel komik
- Lazy loading gambar
- Di akhir episode: "End of Episode" section dengan:
  - Tombol floating: Like, Comment count, "Watch Ads" / "Next Chapter"
- Header minimal (judul chapter, tombol back)

#### [NEW] `src/app/novels/page.tsx` — Daftar Novel
- Grid card novel dengan cover, judul, genre, rating

#### [NEW] `src/app/novels/[id]/page.tsx` — Detail Series Novel
- Cover, judul, sinopsis, author, daftar chapter
- Label harga per chapter

#### [NEW] `src/app/novels/[id]/[chapter]/page.tsx` — Novel Reader (Wattpad-style)
- Tampilan bersih fokus teks (seperti screenshot novel)
- **Floating settings button** (pojok kanan bawah): font size, line spacing, tema (Light/Dark/Sepia)
- Inline comment indicator di ujung paragraf
- Di akhir bab: Tombol "Vote for Chapter" & "Next Chapter →"
- **Proteksi konten**: Disable right-click, disable text selection CSS

#### [NEW] `src/app/videos/page.tsx` — Daftar Video Series
- Grid card video series dengan cover, judul, episode count

#### [NEW] `src/app/videos/[id]/page.tsx` — Video Player (Dracin-style)
- **Fullscreen portrait video player**
- Swipe atas/bawah untuk ganti episode
- **Overlay kanan**: Avatar creator, Like (heart), Comment, Share, Episodes (grid icon)
- **Overlay bawah**: Judul episode, sinopsis singkat, progress bar durasi
- Label "PREMIUM" / "FREE" di pojok
- **Bottom sheet Episodes**: Grid angka navigasi (1-30, 31-60)
- **Lock popup**: Jika swipe ke episode terkunci → modal "Buka dengan X Koin"

#### [NEW] `src/app/wallet/page.tsx` — My Wallet
- Saldo koin saat ini (card besar)
- Tombol "Redeem Code"
- **Recent Transactions**: Tabel histori (tanggal, item, jumlah koin +/-)
- **Top-up Koins**: Panel kanan dengan paket koin (100, 500, 1000) + label "Popular" / "Best Value"
- Pilihan metode pembayaran

#### [NEW] `src/app/library/page.tsx` — My Library
- **Continue Reading**: Card horizontal dengan progress bar
- **Favorites**: Grid card konten yang sudah di-bookmark
- Sidebar navigasi (Home, Comics, Novels, Videos, Wallet)

#### [NEW] `src/app/creator/page.tsx` — Creator Program Landing
- Hero section "Your World. Your Revenue."
- Badge "Revenue Split 50%"
- Feature cards: "Monetize with Coins", "Ad Revenue Sharing", "Creator Hub"
- "Real-Time Analytics" showcase
- "Create what you love" section (tipe konten)
- CTA "Register Now"

#### [NEW] `src/app/creator/dashboard/page.tsx` — Creator Hub Dashboard
- **Revenue Summary**: Total earned, withdrawable balance, tombol "Withdraw Funds"
- **Bank Info**: Linked account
- **Reader Growth chart** (30 days)
- **Content Management table**: Series title, type (Comic/Novel/Video), views, sales (coins), status (Published/Draft), action edit
- Tombol floating "+ Upload New"
- Sidebar: Dashboard, Analytics, Revenue, Uploads

---

## 📦 FASE 2: Database & Backend (Setelah Fase 1 Disetujui)

- Setup Supabase schema (users, series, chapters, transactions, wallet, etc.)
- Auth flow (register, login, role management)
- API routes untuk CRUD konten
- Sistem koin (top-up, deduct, transfer kreator)

## 📦 FASE 3: Integrasi & Fitur Lanjutan

- Koneksi frontend ke Supabase
- Upload konten (gambar, video, teks)
- Sistem komentar & voting
- Sistem iklan (placeholder/integration)
- Notifikasi

## 📦 FASE 4: Polish & Production

- SEO optimization
- Performance tuning (lazy load, image optimization)
- Responsive mobile
- Testing end-to-end

---

## Verification Plan

### Fase 1 (Yang Akan Dikerjakan Sekarang)
1. `npm run build` harus sukses tanpa error
2. `npm run dev` bisa diakses di browser
3. Semua halaman bisa di-navigate tanpa error
4. Dark/Light mode toggle berfungsi di semua halaman
5. Tampilan sesuai dengan screenshot referensi yang lo kirim

---

> [!IMPORTANT]
> **Fase 1 fokus pada UI/UX saja dengan data dummy.** Semua data (judul komik, jumlah koin, histori transaksi, dll) menggunakan data contoh yang di-hardcode agar lo bisa langsung melihat dan me-review tampilan sebelum kita hubungkan ke database di Fase 2.

> [!NOTE]
> Proyek akan di-inisialisasi di folder `\\wsl.localhost\Ubuntu\home\yusarius\sampulkreativ_station` menggunakan Next.js + TypeScript.

Kalau lo setuju dengan rencana ini, klik **Proceed** dan gw langsung gas inisialisasi project + bikin semua halaman di Fase 1! 🔥
