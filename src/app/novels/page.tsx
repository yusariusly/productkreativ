"use client";

import { useState } from "react";
import Link from "next/link";
import { novelSeries, formatNumber } from "@/data/dummy";
import styles from "./novels.module.css";

const genres = ["All", "Cyberpunk", "Fantasy", "Thriller", "Romance", "Action", "Sci-Fi", "Drama", "Historical"];

export default function NovelsPage() {
  const [activeGenre, setActiveGenre] = useState("All");
  const [sortBy, setSortBy] = useState("popular");

  const filtered = activeGenre === "All"
    ? novelSeries
    : novelSeries.filter((s) => s.genre.includes(activeGenre));

  const sorted = [...filtered].sort((a, b) => {
    if (sortBy === "popular") return b.views - a.views;
    if (sortBy === "rating") return b.rating - a.rating;
    return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
  });

  return (
    <div className={styles.page}>
      <div className="container">
        <div className={styles.pageHeader}>
          <h1 className={styles.pageTitle}>
            Novels
          </h1>
          <p className={styles.pageDesc}>
            Dive into immersive stories crafted by talented writers. Updated weekly.
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
          <select
            className={styles.sortSelect}
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="popular">Most Popular</option>
            <option value="rating">Top Rated</option>
            <option value="latest">Latest Update</option>
          </select>
        </div>

        <div className={styles.grid}>
          {sorted.map((series, idx) => (
            <Link
              key={series.id}
              href={`/novels/${series.id}`}
              className={styles.card}
              style={{ animationDelay: `${idx * 60}ms` }}
            >
              <div className={styles.cardCover}>
                <img src={series.coverUrl} alt={series.title} className={styles.coverImage} />
                {series.isOriginal && (
                  <span className={`badge badge-vip ${styles.cardBadge}`}>Original</span>
                )}
              </div>
              <div className={styles.cardBody}>
                <h3 className={styles.cardTitle}>{series.title}</h3>
                <p className={styles.cardGenre}>{series.genre.slice(0, 2).join(" · ")}</p>
                <div className={styles.cardStats}>
                  <span>Rating: {series.rating}</span>
                  <span>Views: {formatNumber(series.views)}</span>
                  <span>Ch. {series.totalChapters}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
