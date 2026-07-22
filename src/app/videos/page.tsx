"use client";

import { useState } from "react";
import Link from "next/link";
import { videoSeries, formatNumber } from "@/data/dummy";
import styles from "./videos.module.css";

const genres = ["All", "Drama", "Fantasy", "Romance", "Action"];

export default function VideosPage() {
  const [activeGenre, setActiveGenre] = useState("All");

  const filtered = activeGenre === "All"
    ? videoSeries
    : videoSeries.filter((s) => s.genre.includes(activeGenre));

  return (
    <div className={styles.page}>
      <div className="container">
        <div className={styles.pageHeader}>
          <h1 className={styles.pageTitle}>
            Video Series
          </h1>
          <p className={styles.pageDesc}>
            Binge-worthy vertical drama series. Swipe through episodes like never before.
          </p>
        </div>

        <div className={styles.filters}>
          <div className={styles.genreTags}>
            {genres.map((genre) => (
              <button
                key={genre}
                className={`tag ${activeGenre === genre ? "tag-active" : ""}`}
                onClick={() => setActiveGenre(genre)}
              >
                {genre}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        <div className={styles.grid}>
          {filtered.map((series, idx) => (
            <Link
              key={series.id}
              href={`/videos/${series.id}`}
              className={styles.card}
              style={{ animationDelay: `${idx * 80}ms` }}
            >
              <div className={styles.cardCover}>
                <img src={series.coverUrl} alt={series.title} className={styles.coverImage} />
                <div className={styles.cardPlayBtn}>▶</div>
                
                {/* Badges */}
                <span className={`badge badge-vip ${styles.cardBadge}`}>
                  {idx % 2 === 0 ? "Populer" : "Dubbing"}
                </span>
                
                {/* Bottom Overlay with views */}
                <div className={styles.cardOverlay}>
                  <span className={styles.viewsLabel}>{formatNumber(series.views)} views</span>
                </div>
              </div>
              <div className={styles.cardBody}>
                <h3 className={styles.cardTitle}>{series.title}</h3>
                <div className={styles.cardMeta}>
                  <span>{series.genre[0]}</span>
                  <span>⭐ {series.rating}</span>
                  <span>{series.totalChapters} eps</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
