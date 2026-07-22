"use client";

import Link from "next/link";
import { comicSeries, novelSeries } from "@/data/dummy";
import { useAuth } from "@/context/AuthContext";
import styles from "./library.module.css";

export default function LibraryPage() {
  const { isLoggedIn, bookmarks, history: readHistory } = useAuth();

  if (!isLoggedIn) {
    return (
      <div className="container" style={{ paddingTop: "var(--space-2xl)", paddingBottom: "var(--space-4xl)" }}>
        <div style={{ textAlign: "center", padding: "100px 20px", border: "1px dashed var(--border-primary)", borderRadius: "var(--radius-xl)", background: "rgba(255,255,255,0.01)" }}>
          <h2 style={{ fontSize: "var(--text-2xl)", fontWeight: 800, color: "var(--text-primary)", marginBottom: "var(--space-sm)" }}>Pustaka Anda Kosong</h2>
          <p style={{ color: "var(--text-secondary)", fontSize: "var(--text-sm)", marginBottom: "var(--space-xl)", maxWidth: "480px", margin: "0 auto var(--space-xl)" }}>
            Silakan masuk (login) ke akun Anda terlebih dahulu untuk melihat followed stories, riwayat baca, dan konten yang sudah Anda buka.
          </p>
          <Link href="/login?redirect=/library" className="btn btn-gold btn-lg">
            Masuk Sekarang
          </Link>
        </div>
      </div>
    );
  }

  const continueReading = readHistory.map(h => {
    const item = h.type === "comic" 
      ? (comicSeries.find(s => s.id === h.id) || comicSeries[0])
      : (novelSeries.find(s => s.id === h.id) || novelSeries[0]);
    return {
      ...item,
      lastChapter: h.lastChapter,
      progress: h.progress,
      type: h.type
    };
  });

  const favorites = [
    ...comicSeries.filter((s) => bookmarks.includes(s.id)),
    ...novelSeries.filter((s) => bookmarks.includes(s.id)),
  ];

  return (
    <div className="container" style={{ paddingTop: "var(--space-2xl)", paddingBottom: "var(--space-4xl)" }}>
      <div className={styles.library}>
        <div className={styles.libraryHeader}>
          <div>
            <h1 className={styles.pageTitle}>My Library</h1>
            <p className={styles.pageDesc}>
              Your collection of followed stories, unlocked content, and recent reads.
            </p>
          </div>
          <button className="btn btn-outline btn-sm">Filter</button>
        </div>

        {/* Continue Reading */}
        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <h2>Continue Reading</h2>
            <Link href="#" className={styles.viewAll}>View All</Link>
          </div>
          <div className={styles.continueGrid}>
            {continueReading.map((item) => (
              <Link
                key={item.id}
                href={`/${item.type === "comic" ? "comics" : "novels"}/${item.id}/${item.lastChapter}`}
                className={styles.continueCard}
              >
                <div className={styles.continueCover}>
                  <img src={item.coverUrl} alt={item.title} className={styles.coverImage} />
                  <div className={styles.chapterBadge}>
                    Ch. {item.lastChapter}
                  </div>
                  {item.isOriginal && (
                    <span className={`badge badge-vip ${styles.vipBadge}`}>VIP</span>
                  )}
                </div>
                <div className={styles.continueBody}>
                  <h3>{item.title}</h3>
                  <p className={styles.continueType}>
                    {item.type === "comic" ? "Webcomic" : "Novel"} · {item.genre[0]}
                  </p>
                  <div className={`progress-bar progress-bar-${item.type === "comic" ? "purple" : "gold"}`}>
                    <div className="progress-bar-fill" style={{ width: `${item.progress}%` }}></div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Favorites */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Favorites</h2>
          <div className={styles.favGrid}>
            {favorites.map((item) => (
              <Link
                key={item.id}
                href={`/${item.type === "comic" ? "comics" : "novels"}/${item.id}`}
                className={styles.favCard}
              >
                <div className={styles.favCover}>
                  <img src={item.coverUrl} alt={item.title} className={styles.coverImage} />
                  <button className={styles.favHeart} onClick={(e) => e.preventDefault()}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                    </svg>
                  </button>
                </div>
                <div className={styles.favBody}>
                  <h3>{item.title}</h3>
                  <p>
                    {item.genre[0]}
                    <span style={{ marginLeft: "8px" }}>⭐ {item.rating}</span>
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
