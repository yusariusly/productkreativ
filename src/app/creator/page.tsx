"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import styles from "./landing.module.css";

export default function CreatorLandingPage() {
  const { isLoggedIn, user } = useAuth();
  const [creatorProfile, setCreatorProfile] = useState<any>(null);

  useEffect(() => {
    if (isLoggedIn && user) {
      // Seed default for Yusarius if not exists
      if (user.email === "yusarius@sampulkreativ.com" && !localStorage.getItem(`sampulkreativ_creator_${user.email}`)) {
        localStorage.setItem(`sampulkreativ_creator_${user.email}`, JSON.stringify({
          penName: "Yusarius",
          contentType: "Webcomic",
          email: "yusarius@sampulkreativ.com",
          bankInfo: "Bank Mandiri - ****9082"
        }));
      }

      const saved = localStorage.getItem(`sampulkreativ_creator_${user.email}`);
      if (saved) {
        setCreatorProfile(JSON.parse(saved));
      }
    } else {
      setCreatorProfile(null);
    }
  }, [isLoggedIn, user]);

  return (
    <div className={styles.creatorLanding}>
      {/* ===== HERO SECTION ===== */}
      <section className={styles.hero} id="creator-hero">
        <div className={styles.heroBg}></div>
        <div className={styles.heroContent}>
          <div className={styles.heroText}>
            <span className={styles.heroBadge}>✦ Program Kreator Mandiri</span>
            <h1 className={styles.heroTitle}>
              Karya Anda.
              <br />
              <span className={styles.heroTitleAccent}>Penghasilan Anda.</span>
            </h1>
            <p className={styles.heroDesc}>
              SampulKreativ hadir sebagai wadah terbesar bagi komikus, penulis novel, dan kreator video di Indonesia. Kami menawarkan sistem bagi hasil <strong>50/50 yang transparan</strong> secara langsung dari pembaca tanpa potongan tersembunyi.
            </p>
            <div className={styles.heroActions}>
              <Link href="/creator/dashboard" className="btn btn-primary btn-lg" style={{ boxShadow: "var(--shadow-glow-purple)" }}>
                Gabung Sekarang / Masuk Dasbor Kreator
              </Link>
            </div>
          </div>
          <div className={styles.heroVisual}>
            <div className={styles.heroCard}>
              <div className={styles.heroCardHeader}>
                <span>Dasbor Kreator SampulKreativ</span>
              </div>
              <div className={styles.heroCardBody}>
                <div className={styles.dashboardMockup}>
                  <div className={styles.mockupHeader}>
                    <div className={styles.mockupUser}>
                      <div className={styles.mockupAvatar}>
                        {creatorProfile 
                          ? creatorProfile.penName[0]?.toUpperCase() 
                          : (isLoggedIn && user ? user.name[0]?.toUpperCase() : "Y")}
                      </div>
                      <div>
                        <div className={styles.mockupName}>
                          {creatorProfile 
                            ? creatorProfile.penName 
                            : (isLoggedIn && user ? user.name : "Yusarius")}
                        </div>
                        <div className={styles.mockupRole}>
                          {creatorProfile 
                            ? `Kreator (${creatorProfile.contentType})` 
                            : (isLoggedIn ? "Mitra Belum Terdaftar" : "Kreator Utama")}
                        </div>
                      </div>
                    </div>
                    <span className={styles.mockupStatus}>
                      {creatorProfile ? "Mitra Aktif" : (isLoggedIn ? "Menunggu Daftar" : "Mitra Aktif")}
                    </span>
                  </div>
                  
                  <div className={styles.mockupStatsGrid}>
                    <div className={styles.mockupStatItem}>
                      <span className={styles.mockupStatLabel}>Pembaca</span>
                      <span className={styles.mockupStatValue}>142.5K</span>
                    </div>
                    <div className={styles.mockupStatItem}>
                      <span className={styles.mockupStatLabel}>Koin Masuk</span>
                      <span className={styles.mockupStatValue} style={{ color: "var(--accent-gold)" }}>45,210</span>
                    </div>
                    <div className={styles.mockupStatItem}>
                      <span className={styles.mockupStatLabel}>Estimasi Gaji</span>
                      <span className={styles.mockupStatValue} style={{ color: "var(--accent-green-light)" }}>Rp 3,42M</span>
                    </div>
                  </div>

                  <div className={styles.mockupReleaseList}>
                    <div className={styles.mockupReleaseTitle}>Rilis Episode Terbaru</div>
                    <div className={styles.mockupReleaseItem}>
                      <span>Shadow Syndicate (Ch. 35)</span>
                      <span className={styles.mockupBadgeGreen}>Terbit</span>
                    </div>
                    <div className={styles.mockupReleaseItem}>
                      <span>Dunia Tanpa Akhir (Ch. 42)</span>
                      <span className={styles.mockupBadgeGold}>Review</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className={styles.revenueBadge}>
              <div className={styles.revenueBadgeIcon}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ color: "var(--accent-gold-light)", display: "block" }}>
                  <line x1="18" y1="20" x2="18" y2="10" />
                  <line x1="12" y1="20" x2="12" y2="4" />
                  <line x1="6" y1="20" x2="6" y2="14" />
                </svg>
              </div>
              <div>
                <div className={styles.revenueBadgeLabel}>Bagi Hasil Adil</div>
                <div className={styles.revenueBadgeValue}>
                  <span className={styles.revenuePercent}>50%</span>
                  <span className={styles.revenueSub}>Hak Kreator</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== FEATURES SECTION ===== */}
      <section className={styles.features} id="creator-features">
        <div className="container">
          <h2 className={styles.sectionTitle} style={{ textAlign: "center", marginBottom: "var(--space-2xl)" }}>Dukungan Penuh Untuk Kebebasan Berkarya</h2>
          <div className={styles.featuresGrid}>
            <div className={styles.featureCard}>
              <div className={`${styles.featureIcon} ${styles.featureIconGold}`}>$</div>
              <h3>Dukungan Koin Langsung</h3>
              <p>
                Dapatkan apresiasi finansial langsung dari pembaca setia. Pembaca dapat menggunakan Koin untuk membuka bab premium komik atau novel Anda secara instan.
              </p>
            </div>
            <div className={styles.featureCard}>
              <div className={`${styles.featureIcon} ${styles.featureIconCyan}`}>▶</div>
              <h3>Pendapatan Iklan Bersih</h3>
              <p>
                Dapatkan bagi hasil 50/50 dari iklan yang ditayangkan di sela-sela konten Anda. Kami menjamin transparansi data penayangan iklan tanpa potongan tambahan.
              </p>
            </div>
            <div className={styles.featureCard}>
              <div className={`${styles.featureIcon} ${styles.featureIconPink}`}>⬡</div>
              <h3>Dasbor Kreator Cerdas</h3>
              <p>
                Gunakan ruang kerja khusus kreator untuk mengunggah draf, menjadwalkan rilis otomatis, dan mencairkan pendapatan langsung ke rekening lokal/E-Wallet Anda.
              </p>
            </div>
          </div>

          {/* Analytics Preview */}
          <div className={styles.analyticsPreview} style={{ marginTop: "var(--space-3xl)" }}>
            <div className={styles.analyticsIcon}>
              <svg width="42" height="42" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ color: "var(--accent-purple-light)", margin: "0 auto var(--space-sm)" }}>
                <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
                <polyline points="17 6 23 6 23 12" />
              </svg>
            </div>
            <h3>Statistik Kinerja Real-Time</h3>
            <p>
              Pantau grafik jumlah pembaca harian, retensi bab bacaan, dan koin yang terkumpul setiap menitnya untuk membantu Anda memahami minat audiens secara mendalam.
            </p>
            <div className={styles.analyticsChart}>
              <div className={styles.chartBars}>
                {[40, 65, 45, 80, 55, 90, 70, 85, 60, 95, 75, 88].map((h, i) => (
                  <div
                    key={i}
                    className={styles.chartBar}
                    style={{ height: `${h}%` }}
                  ></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== STEP-BY-STEP PROCESS ===== */}
      <section style={{ padding: "var(--space-3xl) 0", borderTop: "1px solid var(--border-primary)", background: "rgba(255,255,255,0.01)" }}>
        <div className="container">
          <h2 className={styles.sectionTitle} style={{ textAlign: "center", marginBottom: "var(--space-3xl)" }}>3 Langkah Mudah Mulai Menghasilkan</h2>
          
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "var(--space-xl)" }}>
            <div style={{ padding: "var(--space-lg)", border: "1px solid var(--border-primary)", borderRadius: "var(--radius-lg)", background: "var(--bg-card)", position: "relative" }}>
              <div style={{ position: "absolute", top: "-15px", left: "20px", width: "35px", height: "35px", borderRadius: "50%", background: "var(--gradient-button)", display: "flex", alignItems: "center", justifyItems: "center", justifyContent: "center", fontWeight: 800, color: "#fff", fontSize: "14px" }}>1</div>
              <h3 style={{ fontSize: "var(--text-base)", fontWeight: 700, marginTop: "var(--space-md)", marginBottom: "var(--space-sm)", color: "var(--text-primary)" }}>Daftarkan Akun</h3>
              <p style={{ fontSize: "var(--text-xs)", color: "var(--text-secondary)", lineHeight: 1.6 }}>Buat profil kreator Anda dalam waktu kurang dari 2 menit dan hubungkan dengan informasi perbankan Anda untuk penarikan dana.</p>
            </div>

            <div style={{ padding: "var(--space-lg)", border: "1px solid var(--border-primary)", borderRadius: "var(--radius-lg)", background: "var(--bg-card)", position: "relative" }}>
              <div style={{ position: "absolute", top: "-15px", left: "20px", width: "35px", height: "35px", borderRadius: "50%", background: "var(--gradient-button)", display: "flex", alignItems: "center", justifyItems: "center", justifyContent: "center", fontWeight: 800, color: "#fff", fontSize: "14px" }}>2</div>
              <h3 style={{ fontSize: "var(--text-base)", fontWeight: 700, marginTop: "var(--space-md)", marginBottom: "var(--space-sm)", color: "var(--text-primary)" }}>Unggah & Atur Jadwal</h3>
              <p style={{ fontSize: "var(--text-xs)", color: "var(--text-secondary)", lineHeight: 1.6 }}>Unggah karya berupa draf komik vertical, tulisan bab novel, atau konten video. Atur jadwal rilis otomatis untuk menjaga konsistensi pembaca Anda.</p>
            </div>

            <div style={{ padding: "var(--space-lg)", border: "1px solid var(--border-primary)", borderRadius: "var(--radius-lg)", background: "var(--bg-card)", position: "relative" }}>
              <div style={{ position: "absolute", top: "-15px", left: "20px", width: "35px", height: "35px", borderRadius: "50%", background: "var(--gradient-button)", display: "flex", alignItems: "center", justifyItems: "center", justifyContent: "center", fontWeight: 800, color: "#fff", fontSize: "14px" }}>3</div>
              <h3 style={{ fontSize: "var(--text-base)", fontWeight: 700, marginTop: "var(--space-md)", marginBottom: "var(--space-sm)", color: "var(--text-primary)" }}>Terima Pembayaran</h3>
              <p style={{ fontSize: "var(--text-xs)", color: "var(--text-secondary)", lineHeight: 1.6 }}>Pendapatan koin pembaca dan ad-revenue otomatis masuk. Cairkan dana Anda kapan saja langsung ke Rekening Bank Indonesia (BCA, Mandiri, dll) atau E-Wallet.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== CREATE WHAT YOU LOVE ===== */}
      <section className={styles.createSection} id="creator-formats">
        <div className="container">
          <h2 className={styles.sectionTitle} style={{ textAlign: "center" }}>Wadahi Segala Bentuk Kreativitas</h2>
          <p className={styles.sectionSubtitle} style={{ textAlign: "center" }}>
            Satu platform untuk berbagai format cerita pilihan Anda.
          </p>
          <div className={styles.createGrid}>
            <div className={styles.createCard}>
              <div className={`${styles.createCardIcon} ${styles.createCardComic}`}>
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: "var(--accent-purple-light)" }}>
                  <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" />
                  <circle cx="7.5" cy="10.5" r="1.5" fill="currentColor" />
                  <circle cx="11.5" cy="7.5" r="1.5" fill="currentColor" />
                  <circle cx="16.5" cy="9.5" r="1.5" fill="currentColor" />
                  <circle cx="15.5" cy="14.5" r="1.5" fill="currentColor" />
                </svg>
              </div>
              <h3>Webkomik Visual</h3>
              <span className="badge badge-comic">WEBCOMIC</span>
            </div>
            <div className={styles.createCard}>
              <div className={`${styles.createCardIcon} ${styles.createCardNovel}`}>
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: "var(--accent-gold-light)" }}>
                  <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                  <path d="M4 4.5A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 -2.5 -2.5v-15z" />
                </svg>
              </div>
              <h3>Web Novel Imersif</h3>
              <span className="badge badge-novel">WEB NOVEL</span>
            </div>
            <div className={styles.createCard}>
              <div className={`${styles.createCardIcon} ${styles.createCardVideo}`}>
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: "var(--accent-cyan)" }}>
                  <path d="M23 7l-7 5 7 5V7z" />
                  <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
                </svg>
              </div>
              <h3>Media Kreatif Video</h3>
              <span className="badge badge-video">VIDEO CONTENT</span>
            </div>
          </div>
        </div>
      </section>

      {/* ===== CTA SECTION ===== */}
      <section className={styles.ctaSection} id="creator-cta">
        <div className="container text-center">
          <h2 className={styles.ctaTitle}>Siap untuk berkarya dan menghasilkan?</h2>
          <p className={styles.ctaDesc}>
            Daftarkan diri Anda di Creator Hub sekarang. Unggah bab perdana karya Anda hari ini dan bergabunglah bersama komunitas kreator mandiri yang dihargai secara adil.
          </p>
          <Link href="/creator/dashboard" className="btn btn-gold btn-lg" style={{ boxShadow: "var(--shadow-glow-gold)" }}>
            Daftar Kreator Sekarang
          </Link>
        </div>
      </section>
    </div>
  );
}
