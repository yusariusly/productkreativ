"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { novelSeries, formatNumber } from "@/data/dummy";
import styles from "./novels.module.css";

const genres = ["All", "Cyberpunk", "Fantasy", "Thriller", "Romance", "Action", "Sci-Fi", "Drama", "Historical"];

export default function NovelsPage() {
  const [activeGenre, setActiveGenre] = useState("All");
  const [sortBy, setSortBy] = useState("popular");
  const [localNovels, setLocalNovels] = useState<any[]>([]);

  useEffect(() => {
    const list: any[] = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith("sampulkreativ_series_")) {
        try {
          const items = JSON.parse(localStorage.getItem(key) || "[]");
          if (Array.isArray(items)) {
            items.forEach((item: any) => {
              if (item.type === "Novel") {
                list.push({
                  id: item.id,
                  title: item.name,
                  author: "Ghani",
                  type: "novel",
                  genre: [item.category1 || "Fantasy", item.category2 || "Thriller"].filter(Boolean),
                  rating: 4.8,
                  views: item.views || 0,
                  likes: 0,
                  coverUrl: item.thumbnail || "https://images.unsplash.com/photo-1578632767115-351597cf2477?w=500&q=80",
                  synopsis: item.summary || "No description.",
                  totalChapters: item.chapters || 0,
                  status: "ongoing",
                  isOriginal: true,
                  updatedAt: new Date().toISOString().split("T")[0]
                });
              }
            });
          }
        } catch (e) {
          console.error(e);
        }
      }
    }
    setLocalNovels(list);
  }, []);

  const allNovels = [...localNovels, ...novelSeries];

  const filtered = activeGenre === "All"
    ? allNovels
    : allNovels.filter((s) => s.genre.some((g: string) => g.toLowerCase() === activeGenre.toLowerCase()));

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
