"use client";

import { useState } from "react";
import Link from "next/link";
import { comicSeries } from "@/data/dummy";
import styles from "./comics.module.css";

const genres = ["All", "Cyberpunk", "Action", "Fantasy", "Sci-Fi", "Mystery", "Comedy", "Drama", "Romance"];

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

export default function ComicsPage() {
  const [activeGenre, setActiveGenre] = useState("All");
  const [sortBy, setSortBy] = useState("popular");

  const filtered = activeGenre === "All"
    ? comicSeries
    : comicSeries.filter((s) => s.genre.includes(activeGenre));

  const sorted = [...filtered].sort((a, b) => {
    if (sortBy === "popular") return b.views - a.views;
    if (sortBy === "rating") return b.rating - a.rating;
    return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
  });

  return (
    <div className={styles.page}>
      <div className="container">
        {/* Header */}
        <div className={styles.pageHeader}>
          <h1 className={styles.pageTitle}>
            Comics
          </h1>
          <p className={styles.pageDesc}>
            Discover the best webcomics from talented creators. New episodes every week.
          </p>
        </div>

        {/* Filters */}
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
          <select
            className={styles.sortSelect}
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            id="comics-sort"
          >
            <option value="popular">Most Popular</option>
            <option value="rating">Top Rated</option>
            <option value="latest">Latest Update</option>
          </select>
        </div>

        {/* Grid (Compact Scanlation Style) */}
        <div className={styles.compactGrid}>
          {sorted.map((series, idx) => (
            <Link
              key={series.id}
              href={`/comics/${series.id}`}
              className={styles.compactCard}
              style={{ animationDelay: `${idx * 40}ms` }}
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
      </div>
    </div>
  );
}
