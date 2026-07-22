"use client";

import styles from "./privacy.module.css";
import Link from "next/link";

export default function PrivacyPage() {
  return (
    <div className="container">
      <div className={styles.page}>
        
        <div className={styles.header}>
          <h1 className={styles.title}>Privacy Policy</h1>
          <p className={styles.subtitle}>Pembaruan Terakhir: 21 Juli 2026</p>
        </div>

        <div className={styles.grid}>
          {/* Left Column */}
          <div className={styles.column}>
            <div className={styles.section}>
              <span className={styles.sectionTitle}>1. Informasi Yang Kami Kumpulkan</span>
              <p>
                Kami mengumpulkan data Anda untuk memberikan layanan membaca yang optimal dan memproses transaksi koin dengan aman. Data tersebut mencakup:
              </p>
              <ul>
                <li><strong>Informasi Akun:</strong> Alamat email, nama pengguna (username), dan kata sandi yang dienkripsi saat mendaftar akun.</li>
                <li><strong>Data Aktivitas:</strong> Riwayat pembacaan komik atau novel Anda, daftar bookmark di perpustakaan, ulasan, komentar, dan transaksi koin.</li>
                <li><strong>Data Perangkat:</strong> Alamat IP, jenis browser, dan sistem operasi yang digunakan untuk mendeteksi keamanan akun.</li>
              </ul>
            </div>

            <div className={styles.section}>
              <span className={styles.sectionTitle}>2. Penggunaan Informasi</span>
              <p>
                Seluruh data yang terkumpul hanya digunakan untuk tujuan operasional dan pengembangan platform SampulKreativ:
              </p>
              <ul>
                <li>Memverifikasi akun dan menyediakan akses masuk sistem.</li>
                <li>Mengelola saldo koin Anda dan memvalidasi transaksi top-up.</li>
                <li>Menampilkan rekomendasi bacaan komik atau novel yang disesuaikan dengan minat membaca Anda.</li>
                <li>Meningkatkan kestabilan aplikasi dan memantau penyalahgunaan sistem.</li>
              </ul>
            </div>

            <div className={styles.section}>
              <span className={styles.sectionTitle}>3. Berbagi Data dengan Pihak Ketiga</span>
              <p>
                SampulKreativ tidak pernah menjual atau menyewakan informasi pribadi Anda kepada perusahaan iklan atau pihak ketiga mana pun. Kami hanya membagikan data spesifik kepada mitra tepercaya untuk mendukung proses pembayaran digital:
              </p>
              <p>
                Contohnya, transaksi kartu kredit atau debit Anda diproses secara langsung dan aman melalui API <strong>Stripe</strong>. Kami tidak menyimpan detail informasi kartu pembayaran Anda di server kami.
              </p>
            </div>
          </div>

          {/* Right Column */}
          <div className={styles.column}>
            <div className={styles.section}>
              <span className={styles.sectionTitle}>4. Cookies dan Teknologi Pelacakan</span>
              <p>
                Kami menggunakan cookies berukuran kecil yang disimpan di peramban Anda untuk mengidentifikasi status masuk (login session) Anda dan menyimpan preferensi tema (Mode Gelap/Terang).
              </p>
              <p>
                Anda memiliki kendali penuh untuk menonaktifkan cookies melalui pengaturan browser Anda, namun beberapa bagian fungsional dari platform kami mungkin tidak bekerja dengan semestinya.
              </p>
            </div>

            <div className={styles.section}>
              <span className={styles.sectionTitle}>5. Hak Pengguna atas Data Pribadi</span>
              <p>
                Kami sangat menghormati hak privasi Anda. Kapan saja, Anda berhak untuk melakukan hal berikut melalui menu pengaturan profil Anda:
              </p>
              <ul>
                <li>Mengakses dan memperbarui informasi nama pengguna atau email Anda.</li>
                <li>Meminta laporan riwayat transaksi pengisian koin yang pernah Anda lakukan.</li>
                <li>Mengajukan penghapusan akun beserta seluruh data riwayat membaca Anda secara permanen dari server kami dengan menghubungi dukungan pelanggan.</li>
              </ul>
            </div>

            <div className={styles.section}>
              <span className={styles.sectionTitle}>6. Keamanan Data Anda</span>
              <p>
                Kami menerapkan standar keamanan industri (SSL/TLS) untuk mengamankan komunikasi data antara perangkat Anda dan server kami. Seluruh kata sandi dilindungi menggunakan fungsi hashing satu arah yang aman.
              </p>
              <p>
                Meskipun demikian, harap dipahami bahwa tidak ada metode transmisi internet yang 100% aman. Kami menyarankan Anda untuk menggunakan kata sandi unik dan tidak membagikan detail akun Anda kepada siapa pun.
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
