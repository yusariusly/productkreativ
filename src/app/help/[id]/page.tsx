"use client";

import { use, useState } from "react";
import Link from "next/link";
import styles from "./help-detail.module.css";

interface TopicContent {
  title: string;
  category: string;
  body: React.ReactNode;
}

const topicsData: Record<string, TopicContent> = {
  "getting-started": {
    title: "Getting Started",
    category: "Panduan Pemula",
    body: (
      <>
        <p> Selamat datang di SampulKreativ! Panduan ini dirancang untuk membantu Anda memulai langkah awal membaca komik dan novel favorit dengan nyaman.</p>
        
        <h2>1. Membuat Akun Pertama Anda</h2>
        <p>Untuk menikmati seluruh fitur perpustakaan digital kami, Anda disarankan memiliki akun terdaftar:</p>
        <ul>
          <li>Klik ikon <strong>Profil</strong> di pojok kanan atas navbar.</li>
          <li>Pilih tombol <strong>Daftar Akun Baru</strong>.</li>
          <li>Masukkan alamat email aktif, buat kata sandi yang aman, lalu klik daftar.</li>
          <li>Periksa kotak masuk email Anda untuk melakukan verifikasi akun.</li>
        </ul>

        <h2>2. Menjelajahi Komik & Novel</h2>
        <p>Anda dapat menemukan cerita menarik menggunakan beberapa cara:</p>
        <ul>
          <li><strong>Kotak Pencarian:</strong> Ketik judul atau nama kreator pada kolom pencarian di bagian atas navbar.</li>
          <li><strong>Filter Katalog:</strong> Gunakan menu navigasi <strong>Komik</strong> atau <strong>Novel</strong> untuk memfilter bacaan berdasarkan genre seperti Action, Cyberpunk, Fantasy, dan lainnya.</li>
          <li><strong>Trending & Terpopuler:</strong> Lihat rekomendasi teratas di halaman utama yang diperbarui setiap harinya.</li>
        </ul>

        <h2>3. Membeli Koin Emas Pertama</h2>
        <p>Beberapa bab eksklusif memerlukan Koin Emas untuk dibuka. Anda dapat pergi ke menu <strong>Dompet (Wallet)</strong> dengan mengklik saldo koin Anda di navbar, lalu memilih paket koin yang diinginkan dan menyelesaikannya di halaman checkout aman.</p>
      </>
    ),
  },
  "guides": {
    title: "Guides",
    category: "Panduan Fitur",
    body: (
      <>
        <p>Optimalkan pengalaman membaca Anda dengan menguasai berbagai fitur interaktif di platform SampulKreativ.</p>

        <h2>1. Menyimpan Bacaan ke Perpustakaan (Bookmark)</h2>
        <p>Agar tidak kehilangan jejak membaca, Anda bisa mem-bookmark komik atau novel:</p>
        <ol>
          <li>Buka halaman detail komik atau novel pilihan Anda.</li>
          <li>Klik tombol <strong>+ Tambah ke Perpustakaan</strong>.</li>
          <li>Semua komik yang disimpan akan muncul di halaman <strong>Library</strong> yang dapat diakses langsung dari menu atas. Anda juga akan menerima notifikasi setiap kali ada bab baru yang rilis.</li>
        </ol>

        <h2>2. Memberikan Ulasan dan Penilaian</h2>
        <p>Bantu pembaca lain menemukan cerita bagus dan dukung kreator dengan memberikan rating bintang:</p>
        <ul>
          <li>Di halaman detail cerita, gulir ke bagian bawah untuk menemukan tab Ulasan.</li>
          <li>Berikan penilaian bintang mulai dari 1 hingga 5.</li>
          <li>Tulis opini positif Anda tentang alur cerita atau kualitas terjemahan. Ulasan yang kasar atau mengandung spoiler tanpa label akan dihapus otomatis oleh sistem moderasi.</li>
        </ul>

        <h2>3. Menggunakan Riwayat Bacaan (History)</h2>
        <p>Sistem kami mencatat bab terakhir yang Anda baca secara otomatis. Kunjungi halaman Library lalu klik tab Riwayat untuk langsung melanjutkan membaca dari bab terakhir Anda tinggalkan.</p>
      </>
    ),
  },
  "guided-tours": {
    title: "Guided Tours",
    category: "Panduan Interaksi Imersif",
    body: (
      <>
        <p>SampulKreativ memiliki fitur pembaca imersif yang dirancang agar aktivitas membaca Anda tidak terganggu oleh elemen antarmuka yang ramai.</p>

        <h2>1. Navigasi Melayang (Floating Controls)</h2>
        <p>Saat berada di halaman pembaca komik maupun novel, seluruh navigasi (navbar atas dan tombol bab bawah) akan disembunyikan secara otomatis demi kelegaan membaca:</p>
        <ul>
          <li><strong>Cara Memunculkan Menu:</strong> Cukup ketuk (klik) satu kali di area mana saja pada teks cerita novel atau gambar komik. Menu navigasi akan meluncur turun dari atas dan naik dari bawah.</li>
          <li><strong>Cara Menyembunyikan Menu:</strong> Ketuk sekali lagi di area pembaca, dan navigasi akan tersembunyi kembali secara halus.</li>
        </ul>

        <h2>2. Tombol Gulir Cepat (Scroll Stacks)</h2>
        <p>Di sebelah kanan layar pembaca, terdapat stack tombol bulat melayang:</p>
        <ul>
          <li><strong>Panah Atas (Scroll to Top):</strong> Mengembalikan Anda langsung ke bagian paling atas bab secara instan.</li>
          <li><strong>Panah Bawah (Scroll to Bottom):</strong> Melompat langsung ke bagian akhir cerita dan area kolom komentar untuk ikut berdiskusi.</li>
        </ul>

        <h2>3. Kustomisasi Tampilan Pembaca Novel</h2>
        <p>Saat membaca novel, Anda dapat mengatur kenyamanan visual:</p>
        <ol>
          <li>Ketuk layar untuk memunculkan menu.</li>
          <li>Pilih ikon roda gigi (Pengaturan) di sisi kanan atas pembaca.</li>
          <li>Pilih warna latar belakang (Gelap, Terang, atau Sepia klasik).</li>
          <li>Sesuaikan ukuran teks (A- / A+) sesuai kenyamanan mata Anda.</li>
        </ol>
      </>
    ),
  },
  "knowledge-base": {
    title: "Knowledge Base",
    category: "Pusat Pengetahuan",
    body: (
      <>
        <p>Temukan jawaban terperinci atas pertanyaan umum seputar kebijakan koin, lisensi konten, dan kendala teknis.</p>

        <h2>1. Perbedaan Koin Utama dan Koin Bonus</h2>
        <p>SampulKreativ memiliki dua jenis koin dengan aturan yang berbeda:</p>
        <ul>
          <li><strong>Koin Utama (Koin Pembelian):</strong> Koin yang Anda beli menggunakan uang melalui checkout Stripe. Koin ini tidak memiliki masa kedaluwarsa dan akan tersimpan selamanya di akun Anda sampai dibelanjakan.</li>
          <li><strong>Koin Bonus:</strong> Koin yang didapatkan secara gratis dari event platform, kode kupon, atau promosi paket top-up tertentu. Koin Bonus memiliki masa kedaluwarsa (biasanya 30 hari sejak diterima). Sistem akan memprioritaskan penggunaan Koin Bonus terlebih dahulu saat Anda membuka bab terkunci.</li>
        </ul>

        <h2>2. Kebijakan Refund Koin</h2>
        <p>Koin yang telah dibeli melalui transaksi top-up bersifat <strong>non-refundable</strong> (tidak dapat dikembalikan/diuangkan kembali). Demikian juga dengan bab berbayar yang telah Anda buka koinnya, transaksi pembukaan bab tersebut bersifat final dan tidak dapat dibatalkan atau dikembalikan koinnya ke saldo akun.</p>

        <h2>3. Melaporkan Masalah Terjemahan atau Gambar Rusak</h2>
        <p>Jika Anda menemukan halaman komik yang tidak termuat (gambar pecah/rusak) atau novel dengan terjemahan yang kacau, silakan laporkan dengan mengklik tombol bendera di area bab, atau kirim email langsung dengan menyertakan judul dan nomor bab ke support@sampulkreativ.id.</p>
      </>
    ),
  },
  "widget": {
    title: "Widget",
    category: "Integrasi Fitur Widget",
    body: (
      <>
        <p>Pelajari cara memanfaatkan fitur widget untuk akses membaca cepat dan notifikasi langsung.</p>

        <h2>1. Pintasan Halaman Utama (Web Widget)</h2>
        <p>Anda dapat membuat pintasan cepat ke platform kami di beranda ponsel atau browser Anda:</p>
        <ul>
          <li>Buka situs SampulKreativ di Google Chrome atau Safari pada perangkat mobile Anda.</li>
          <li>Ketuk menu opsi peramban (titik tiga atau tombol bagikan).</li>
          <li>Pilih <strong>Tambahkan ke Layar Utama (Add to Home Screen)</strong>.</li>
          <li>Aplikasi web SampulKreativ kini akan muncul sebagai ikon aplikasi di layar ponsel Anda untuk akses instan sekali ketuk.</li>
        </ul>

        <h2>2. Widget Bookmark Cepat di Browser</h2>
        <p>Untuk melacak bab terakhir dengan cepat, Anda dapat menyeret tombol bab aktif ke bilah bookmark peramban Anda untuk membuat penanda dinamis yang otomatis merujuk ke posisi bacaan terakhir Anda.</p>
      </>
    ),
  },
  "account-team": {
    title: "Account and team",
    category: "Keamanan Akun & Tim",
    body: (
      <>
        <p>Panduan pengelolaan profil, pemulihan kata sandi, keamanan tingkat lanjut, dan kolaborasi dalam tim pembuat konten.</p>

        <h2>1. Keamanan Akun dan Reset Kata Sandi</h2>
        <p>Jika Anda melupakan kata sandi Anda atau ingin meningkatkan keamanan akun:</p>
        <ul>
          <li>Kunjungi halaman masuk (login) lalu klik <strong>Lupa Kata Sandi?</strong>.</li>
          <li>Masukkan alamat email terdaftar untuk menerima tautan pemulihan sandi baru.</li>
          <li>Kami sangat menyarankan Anda mengaktifkan <strong>Two-Factor Authentication (2FA)</strong> di pengaturan keamanan profil agar akun Anda aman dari akses tidak sah.</li>
        </ul>

        <h2>2. Pengajuan Penghapusan Akun</h2>
        <p>Apabila Anda memutuskan untuk tidak lagi menggunakan layanan kami dan ingin menghapus seluruh data pribadi secara permanen:</p>
        <ol>
          <li>Buka menu pengaturan Profil Anda.</li>
          <li>Pilih opsi paling bawah bertuliskan <strong>Hapus Akun Permanen</strong>.</li>
          <li>Konfirmasikan dengan memasukkan kata sandi aktif Anda. Seluruh saldo koin dan riwayat bacaan Anda akan dihapus secara permanen dan tidak dapat dipulihkan kembali.</li>
        </ol>

        <h2>3. Ruang Kreator & Kolaborasi Tim</h2>
        <p>Bagi Anda yang terdaftar sebagai Penulis Novel atau Penerjemah Komik di platform kami, Anda dapat mengelola tim pengerjaan proyek melalui menu <strong>Ruang Kreator</strong>:</p>
        <ul>
          <li>Buat tim pengerjaan baru dan undang anggota tim menggunakan email akun mereka.</li>
          <li>Berikan hak akses berbeda (sebagai penerjemah, editor, tipe pengunggah, atau pemilik tim).</li>
          <li>Unggah bab baru bersama-sama dan pantau pembagian royalti koin yang masuk dari pembaca secara transparan.</li>
        </ul>
      </>
    ),
  },
};

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function HelpDetailPage({ params }: PageProps) {
  const { id } = use(params);
  const topic = topicsData[id];
  const [feedbackSent, setFeedbackSent] = useState(false);

  if (!topic) {
    return (
      <div className="container">
        <div className={styles.page}>
          <Link href="/help" className={styles.backBtn}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="19" y1="12" x2="5" y2="12" />
              <polyline points="12 19 5 12 12 5" />
            </svg>
            Kembali ke Pusat Bantuan
          </Link>
          <div className={styles.header}>
            <h1 className={styles.title}>Topik Tidak Ditemukan</h1>
          </div>
          <p className={styles.content}>Topik bantuan yang Anda cari tidak dapat ditemukan atau telah dihapus.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className={styles.page}>
        <Link href="/help" className={styles.backBtn}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <line x1="19" y1="12" x2="5" y2="12" />
            <polyline points="12 19 5 12 12 5" />
          </svg>
          Kembali ke Pusat Bantuan
        </Link>

        <div className={styles.header}>
          <span className={styles.category}>{topic.category}</span>
          <h1 className={styles.title}>{topic.title}</h1>
        </div>

        <div className={styles.content}>
          {topic.body}
        </div>

        {/* Helpful Widget */}
        <div className={styles.helpfulBox}>
          {feedbackSent ? (
            <h4 className={styles.helpfulTitle} style={{ color: "var(--accent-gold-light)" }}>Terima kasih atas tanggapan Anda!</h4>
          ) : (
            <>
              <h4 className={styles.helpfulTitle}>Apakah artikel bantuan ini menjawab pertanyaan Anda?</h4>
              <div className={styles.btnGroup}>
                <button className={styles.helpfulBtn} onClick={() => setFeedbackSent(true)}>Ya, Sangat Membantu</button>
                <button className={styles.helpfulBtn} onClick={() => setFeedbackSent(true)}>Tidak Membantu</button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
