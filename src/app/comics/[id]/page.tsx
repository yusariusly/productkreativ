"use client";

import { use, useEffect } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { comicSeries, sampleChapters, formatNumber } from "@/data/dummy";
import { useLanguage } from "@/context/LanguageContext";
import { useAuth } from "@/context/AuthContext";
import styles from "./detail.module.css";

// Realistic chapter preview thumbnails
const chapterPreviews = [
  "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=200&q=80",
  "https://images.unsplash.com/photo-1578632767115-351597cf2477?w=200&q=80",
  "https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=200&q=80",
  "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=200&q=80",
  "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=200&q=80"
];

export default function ComicDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { t } = useLanguage();
  const router = useRouter();
  const searchParams = useSearchParams();
  const { isLoggedIn, bookmarks, toggleBookmark } = useAuth();
  
  const series = comicSeries.find((s) => s.id === id) || comicSeries[0];
  const chapters = sampleChapters;
  const isBookmarked = bookmarks.includes(id);

  // Automatically bookmark if redirected from login page with bookmark=true query
  useEffect(() => {
    if (isLoggedIn && searchParams.get("bookmark") === "true") {
      if (!bookmarks.includes(id)) {
        toggleBookmark(id);
      }
    }
  }, [isLoggedIn, id, bookmarks, toggleBookmark, searchParams]);

  return (
    <div className={styles.page}>
      {/* Hero Banner */}
      <div 
        className={styles.heroBanner}
        style={{ backgroundImage: `linear-gradient(180deg, rgba(10, 14, 26, 0.4) 0%, rgba(10, 14, 26, 0.95) 100%), url(${series.coverUrl})` }}
      >
        <div className={styles.heroContent}>
          <div className={styles.coverArt}>
            <img src={series.coverUrl} alt={series.title} className={styles.coverImage} />
          </div>
          <div className={styles.heroInfo}>
            <div className={styles.badges}>
              {series.isOriginal && <span className="badge badge-vip">Original</span>}
              <span className="badge badge-comic">{t("comics")}</span>
              <span className={`badge ${series.status === "ongoing" ? "badge-free" : "badge-ad"}`}>
                {series.status === "ongoing" ? "Berjalan" : "Tamat"}
              </span>
            </div>
            <h1 className={styles.title}>{series.title}</h1>
            <p className={styles.author}>by {series.author}</p>
            <p className={styles.synopsis}>{series.synopsis}</p>
            
            <div className={styles.stats}>
              <div className={styles.stat}>
                <span className={styles.statValue}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" style={{ marginRight: "3px", color: "#fbbf24" }}>
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                  </svg>
                  {series.rating}
                </span>
                <span className={styles.statLabel}>Rating</span>
              </div>
              <div className={styles.stat}>
                <span className={styles.statValue}>{formatNumber(series.views)}</span>
                <span className={styles.statLabel}>{t("views")}</span>
              </div>
              <div className={styles.stat}>
                <span className={styles.statValue}>{formatNumber(series.likes)}</span>
                <span className={styles.statLabel}>Likes</span>
              </div>
              <div className={styles.stat}>
                <span className={styles.statValue}>{series.totalChapters}</span>
                <span className={styles.statLabel}>Chapter</span>
              </div>
            </div>
            
            <div className={styles.genres}>
              {series.genre.map((g) => (
                <span key={g} className="tag">{g}</span>
              ))}
            </div>
            <div className={styles.actions}>
              <Link href={`/comics/${id}/1`} className="btn btn-primary btn-lg">
                {t("home") === "Beranda" ? "Mulai Membaca" : "Start Reading"}
              </Link>
              <button 
                className="btn btn-outline"
                onClick={() => {
                  if (!isLoggedIn) {
                    router.push(`/login?redirect=${encodeURIComponent(`/comics/${id}?bookmark=true`)}`);
                  } else {
                    toggleBookmark(id);
                  }
                }}
                style={{
                  borderColor: isBookmarked ? "var(--accent-purple)" : "var(--border-primary)",
                  color: isBookmarked ? "var(--accent-purple-light)" : "var(--text-secondary)"
                }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill={isBookmarked ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" style={{ marginRight: "6px" }}>
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                </svg>
                {isBookmarked
                  ? (t("home") === "Beranda" ? "Di Pustaka" : "In Library")
                  : (t("home") === "Beranda" ? "Tambah Pustaka" : "Add to Library")}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Chapter List */}
      <div className="container">
        <div className={styles.chapterSection}>
          <div className={styles.chapterHeader}>
            <h2 className={styles.sectionHeaderTitle}>
              {t("home") === "Beranda" ? "Semua Episode" : "All Episodes"}
            </h2>
            <span className={styles.chapterCount}>
              {chapters.length} {t("home") === "Beranda" ? "chapter" : "chapters"}
            </span>
          </div>

          <div className={styles.chapterList}>
            {chapters.map((chapter) => {
              const previewThumb = chapterPreviews[chapter.number % chapterPreviews.length];
              return (
                <Link
                  key={chapter.id}
                  href={`/comics/${id}/${chapter.number}`}
                  className={styles.chapterItem}
                  onClick={(e) => {
                    if (chapter.accessType !== "free" && !isLoggedIn) {
                      e.preventDefault();
                      router.push(`/login?redirect=/comics/${id}/${chapter.number}`);
                    }
                  }}
                >
                  {/* Chapter Thumbnail Image */}
                  <div className={styles.chapterThumb}>
                    <img src={previewThumb} alt={`Thumbnail ${chapter.title}`} className={styles.chapterThumbImage} />
                    <span className={styles.chapterThumbNum}>#{chapter.number}</span>
                  </div>
                  
                  <div className={styles.chapterInfo}>
                    <h3 className={styles.chapterTitle}>{chapter.title}</h3>
                    <div className={styles.chapterMeta}>
                      <span>{chapter.publishedAt}</span>
                      <span>·</span>
                      <span>{formatNumber(chapter.views)} {t("views")}</span>
                    </div>
                  </div>
                  
                  <div className={styles.chapterAccess}>
                    {chapter.accessType === "free" && (
                      <span className="status-chip status-chip-free">
                        {t("home") === "Beranda" ? "Mulai" : "Read"}
                      </span>
                    )}
                    {chapter.accessType === "ad" && (
                      <div className={styles.accessOptions}>
                        <span className="status-chip status-chip-ad">
                          🎬 Iklan {chapter.adQuota}/{chapter.adQuota}
                        </span>
                        <span className={styles.accessOr}>atau</span>
                        <span className="status-chip status-chip-coin">
                          $ {chapter.coinPrice} Koin
                        </span>
                      </div>
                    )}
                    {chapter.accessType === "coin" && (
                      <div className={styles.accessPremium}>
                        <span className="status-chip status-chip-coin">
                          🔒 {chapter.coinPrice} Koin
                        </span>
                        {chapter.freeCountdownDays && chapter.freeCountdownDays > 0 && (
                          <span className="countdown">
                            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ marginRight: "3px" }}>
                              <circle cx="12" cy="12" r="10" />
                              <polyline points="12 6 12 12 16 14" />
                            </svg>
                            {t("home") === "Beranda" ? `Gratis dalam ${chapter.freeCountdownDays} hari` : `Free in ${chapter.freeCountdownDays} days`}
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
