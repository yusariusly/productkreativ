"use client";

import Link from "next/link";
import { comicSeries, novelSeries, videoSeries, formatNumber } from "@/data/dummy";
import { useLanguage } from "@/context/LanguageContext";
import styles from "./page.module.css";

// Helper functions for Indonesian style comic grids matching user's screenshot
function getFlagEmoji(id: string): string {
  if (id === "neon-syndicate-rebirth") return "🇰🇷";
  if (id === "shatter-point") return "🇰🇷";
  if (id === "blade-of-eternity") return "🇯🇵";
  if (id === "star-crossed-echoes") return "🇨🇳";
  if (id === "bloodline-sovereign") return "🇰🇷";
  return "🇰🇷";
}

function getMockUpdate(id: string): string {
  if (id === "neon-syndicate-rebirth") return "14 jam lalu";
  if (id === "shatter-point") return "1 hari lalu";
  if (id === "blade-of-eternity") return "2 hari lalu";
  if (id === "star-crossed-echoes") return "3 hari lalu";
  if (id === "bloodline-sovereign") return "14 jam lalu";
  return "1 hari lalu";
}

export default function HomePage() {
  const { t } = useLanguage();
  const featuredComic = comicSeries.find((s) => s.isFeatured) || comicSeries[0];
  
  const continueReading = [
    { 
      ...comicSeries.find((s) => s.id === "blade-of-eternity") || comicSeries[0], 
      lastChapter: 45, 
      progress: 78, 
      episodeTitle: "The Awakening",
      type: "comic" as const 
    },
    { 
      ...comicSeries.find((s) => s.id === "star-crossed-echoes") || comicSeries[0], 
      lastChapter: 12, 
      progress: 45, 
      episodeTitle: "Silent Night",
      type: "comic" as const 
    },
  ];

  return (
    <div className="container" style={{ paddingTop: "var(--space-xl)", paddingBottom: "var(--space-4xl)" }}>
      <div className={styles.home}>
        
        {/* ===== HERO FEATURED BANNER ===== */}
        <section className={styles.heroSection}>
          <div className={styles.featuredBanner} style={{ backgroundImage: `linear-gradient(180deg, rgba(10, 14, 26, 0.1) 0%, rgba(10, 14, 26, 0.85) 100%), url(${featuredComic.coverUrl})` }}>
            {/* Top Badges */}
            <div className={styles.bannerBadges}>
              <span className="badge badge-vip">ORIGINAL</span>
              <span className={styles.ratingBadge}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" style={{ marginRight: "4px" }}>
                  <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                </svg>
                {featuredComic.rating}
              </span>
            </div>
            
            {/* Bottom Content Overlay */}
            <div className={styles.bannerContent}>
              <h1 className={styles.bannerTitle}>{featuredComic.title}</h1>
              <p className={styles.bannerDesc}>{featuredComic.synopsis}</p>
              <div className={styles.bannerActions}>
                <Link href={`/comics/${featuredComic.id}/1`} className="btn btn-primary">
                  {t("readNow")}
                </Link>
                <button className="btn btn-outline" style={{ background: "rgba(255,255,255,0.15)", borderColor: "transparent", color: "#fff" }}>
                  {t("addToLibrary")}
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* ===== CONTINUE READING (HORIZONTAL CARDS) ===== */}
        <section className={styles.continueReadingSection}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>{t("continueReading")}</h2>
            <Link href="/library" className={styles.viewLibraryLink}>{t("viewLibrary")}</Link>
          </div>
          <div className={styles.continueGrid}>
            {continueReading.map((item) => (
              <Link
                key={item.id}
                href={`/comics/${item.id}/${item.lastChapter}`}
                className={styles.continueCard}
              >
                <img src={item.coverUrl} alt={item.title} className={styles.continueCoverImage} />
                <div className={styles.continueBody}>
                  <h3 className={styles.continueTitle}>{item.title}</h3>
                  <p className={styles.continueEpisode}>
                    Ep. {item.lastChapter} - {item.episodeTitle}
                  </p>
                  <div className={styles.progressBarWrapper}>
                    <div className="progress-bar progress-bar-purple" style={{ height: "4px" }}>
                      <div className="progress-bar-fill" style={{ width: `${item.progress}%` }}></div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* ===== TRENDING COMICS (GRID CARDS — COMPACT INDONESIAN WEBTOON SCAN STYLE) ===== */}
        <section className={styles.contentSection}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>{t("trendingComics")}</h2>
            <Link href="/comics" className={styles.viewAll}>
              {t("viewAll")}
            </Link>
          </div>
          <div className={styles.compactGrid}>
            {comicSeries.slice(1, 6).map((series) => (
              <Link
                key={series.id}
                href={`/comics/${series.id}`}
                className={styles.compactCard}
              >
                <div className={styles.compactCover}>
                  <img src={series.coverUrl} alt={series.title} className={styles.coverImage} />
                  
                  {/* Flag Icon top right */}
                  <span className={styles.flagIcon}>{getFlagEmoji(series.id)}</span>
                  
                  {/* "WARNA" palette badge bottom left */}
                  <div className={styles.warnaBadge}>
                    <svg width="8" height="8" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 3a9 9 0 0 0-9 9 9 9 0 0 0 9 9 1.5 1.5 0 0 0 1.5-1.5c0-.39-.15-.74-.39-1.01a.39.39 0 0 1-.09-.26c0-.22.18-.4.4-.4H15a7 7 0 0 0 7-7 9 9 0 0 0-10-9zm-4 7.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm3-3a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm4.5 3a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm2 3.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z"/>
                    </svg>
                    <span>WARNA</span>
                  </div>
                </div>
                
                <div className={styles.compactBody}>
                  <h3 className={styles.compactTitle}>{series.title}</h3>
                  <div className={styles.compactMetaRow}>
                    <span className={styles.compactChapter}>Ch. {series.totalChapters}</span>
                    <span className={styles.compactTime}>{getMockUpdate(series.id)}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* ===== POPULAR NOVELS ===== */}
        <section className={styles.contentSection}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>{t("popularNovels")}</h2>
            <Link href="/novels" className={styles.viewAll}>
              {t("viewAll")}
            </Link>
          </div>
          <div className={styles.contentGrid}>
            {novelSeries.slice(0, 4).map((series) => (
              <Link
                key={series.id}
                href={`/novels/${series.id}`}
                className={styles.contentCard}
              >
                <div className={styles.cardCover}>
                  <img src={series.coverUrl} alt={series.title} className={styles.coverImage} />
                  <div className={styles.cardBadgesOverlay}>
                    <span className="status-chip status-chip-coin" style={{ fontSize: "9px", padding: "2px 6px" }}>🔒 15</span>
                  </div>
                </div>
                <div className={styles.cardBody}>
                  <h3 className={styles.cardTitle}>{series.title}</h3>
                  <div className={styles.cardMeta}>
                    <span>{series.genre[0]}</span>
                    <span>·</span>
                    <span>{formatNumber(series.views)} {t("views")}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* ===== VIDEO SERIES ===== */}
        <section className={styles.contentSection}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>{t("newVideoSeries")}</h2>
            <Link href="/videos" className={styles.viewAll}>
              {t("viewAll")}
            </Link>
          </div>
          <div className={styles.contentGrid}>
            {videoSeries.slice(0, 4).map((series) => (
              <Link
                key={series.id}
                href={`/videos/${series.id}`}
                className={styles.contentCard}
              >
                <div className={styles.cardCover}>
                  <img src={series.coverUrl} alt={series.title} className={styles.coverImage} />
                  <div className={styles.cardBadgesOverlay}>
                    <span className="badge badge-vip" style={{ fontSize: "8px", padding: "2px 6px" }}>Populer</span>
                  </div>
                  <span className={styles.playIcon}>▶</span>
                </div>
                <div className={styles.cardBody}>
                  <h3 className={styles.cardTitle}>{series.title}</h3>
                  <div className={styles.cardMeta}>
                    <span>{series.genre[0]}</span>
                    <span>·</span>
                    <span>{series.totalChapters} Eps</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* ===== CTA SECTION ===== */}
        <section className={styles.ctaSection} id="cta-section">
          <div className="container text-center">
            <h2 className={styles.ctaTitle}>{t("readyToEarn")}</h2>
            <p className={styles.ctaDesc}>
              {t("joinCreatorDesc")}
            </p>
            <Link href="/creator" className="btn btn-gold btn-lg">
              {t("joinCreatorBtn")}
            </Link>
          </div>
        </section>

      </div>
    </div>
  );
}
