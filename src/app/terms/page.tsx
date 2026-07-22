"use client";

import styles from "./terms.module.css";

export default function TermsPage() {
  return (
    <div className="container">
      <div className={styles.page}>
        <h1 className={styles.title}>Terms of Service</h1>

        <div className={styles.contentContainer}>
          <div className={styles.section}>
            <span className={styles.sectionTitle}>1. Ketentuan Penggunaan</span>
            <p>
              Dengan mengakses dan menggunakan platform SampulKreativ, Anda menyatakan setuju untuk terikat oleh Syarat dan Ketentuan Layanan ini. Jika Anda tidak menyetujui bagian apa pun dari ketentuan ini, Anda dilarang menggunakan platform ini.
            </p>
            <p>
              Layanan kami ditujukan untuk pengguna yang telah berusia minimal 13 tahun. Pengguna di bawah umur tersebut memerlukan pengawasan orang tua atau wali hukum.
            </p>
          </div>

          <div className={styles.section}>
            <span className={styles.sectionTitle}>2. Akun dan Keamanan</span>
            <p>
              Saat membuat akun di platform kami, Anda wajib memberikan informasi yang akurat, lengkap, dan terbaru. Anda sepenuhnya bertanggung jawab atas kerahasiaan kata sandi dan seluruh aktivitas yang terjadi di bawah akun Anda.
            </p>
            <p>
              Anda dilarang keras membagikan kredensial login atau memindahkan kepemilikan akun Anda kepada pihak ketiga tanpa persetujuan tertulis dari pihak SampulKreativ.
            </p>
          </div>

          <div className={styles.section}>
            <span className={styles.sectionTitle}>3. Hak Kekayaan Intelektual</span>
            <p>
              Seluruh karya komik, novel, ilustrasi, logo, desain, dan kode program yang tersedia di SampulKreativ adalah hak kekayaan intelektual milik SampulKreativ atau pemberi lisensi kami (kreator terdaftar).
            </p>
            <p>
              Anda hanya diberikan lisensi terbatas, non-eksklusif, dan tidak dapat dipindahkan untuk membaca konten tersebut secara pribadi langsung melalui situs web atau aplikasi resmi kami. Anda dilarang menduplikasi, memodifikasi, atau menyebarluaskan karya tersebut di platform lain.
            </p>
          </div>

          <div className={styles.section}>
            <span className={styles.sectionTitle}>4. Koin dan Sistem Transaksi</span>
            <p>
              Platform kami menggunakan sistem Koin Emas sebagai alat transaksi digital untuk membuka akses bab berbayar atau konten eksklusif.
            </p>
            <p>
              Seluruh pembelian Koin Emas bersifat final dan tidak dapat diuangkan kembali (non-refundable), kecuali ditentukan lain oleh kebijakan hukum setempat atau kesalahan sistem pembayaran terverifikasi. Koin Bonus memiliki masa kedaluwarsa sesuai ketentuan promo yang berlaku.
            </p>
          </div>

          <div className={styles.section}>
            <span className={styles.sectionTitle}>5. Aturan Konten Pengguna</span>
            <p>
              Pengguna diperbolehkan memberikan ulasan, komentar, dan penilaian terhadap komik atau novel. Namun, Anda dilarang menulis konten yang mengandung:
            </p>
            <ul>
              <li>SARA, ujaran kebencian, pelecehan, atau pornografi.</li>
              <li>Spam, promosi produk lain, atau tautan ilegal.</li>
              <li>Bocoran alur cerita (spoiler) tanpa menandai label spoiler.</li>
            </ul>
          </div>

          <div className={styles.section}>
            <span className={styles.sectionTitle}>6. Pembatasan Tanggung Jawab</span>
            <p style={{ textTransform: "uppercase", fontSize: "11px", letterSpacing: "0.5px" }}>
              LAYANAN SAMPULKREATIV DISEDIAKAN "APA ADANYA" TANPA JAMINAN KETERSEDIAAN SETIAP SAAT. KAMI TIDAK BERTANGGUNG JAWAB ATAS SEGALA KERUGIAN NON-MATERIL ATAU MORAL YANG TIMBUL DARI GANGGUAN TEKNIS, KETIDAKAKURATAN TRANJEMAHAN, ATAU HILANGNYA KONTEN SEMENTARA WAKTU.
            </p>
          </div>

          <div className={styles.section}>
            <span className={styles.sectionTitle}>7. Penangguhan Akun</span>
            <p>
              SampulKreativ berhak menangguhkan atau menghapus akun Anda secara sepihak jika Anda terbukti melanggar salah satu poin dalam Ketentuan Layanan ini, termasuk indikasi manipulasi transaksi atau eksploitasi celah sistem (exploit).
            </p>
          </div>

          <div className={styles.section}>
            <span className={styles.sectionTitle}>8. Perubahan Ketentuan</span>
            <p>
              Kami dapat merevisi Syarat dan Ketentuan ini dari waktu ke waktu. Versi terbaru akan selalu dipublikasikan di halaman ini dengan tanggal pembaruan yang tertera. Penggunaan berkelanjutan atas platform setelah revisi menandakan persetujuan Anda.
            </p>
          </div>

          <div className={styles.section}>
            <span className={styles.sectionTitle}>9. Kontak dan Layanan</span>
            <p>
              Jika Anda memiliki pertanyaan mengenai Syarat dan Ketentuan Layanan ini, silakan hubungi tim kami di: <br />
              <strong>Email:</strong> support@sampulkreativ.id <br />
              <strong>Alamat:</strong> Jl. Kreatif Station No. 300, Bandung, Indonesia.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
