"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { videoSeries, formatNumber } from "@/data/dummy";
import styles from "./videos.module.css";

const genres = ["All", "Drama", "Fantasy", "Romance", "Action", "HOROR", "THRILLER"];

export default function VideosPage() {
  const [activeGenre, setActiveGenre] = useState("All");
  const [localVideos, setLocalVideos] = useState<any[]>([]);

  useEffect(() => {
    const list: any[] = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith("sampulkreativ_series_")) {
        try {
          const items = JSON.parse(localStorage.getItem(key) || "[]");
          if (Array.isArray(items)) {
            items.forEach((item: any) => {
              if (item.type === "Video") {
                list.push({
                  id: item.id,
                  title: item.name,
                  author: "Ghani",
                  type: "video",
                  genre: [item.category1 || "Drama", item.category2 || "Action"].filter(Boolean),
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
    setLocalVideos(list);
  }, []);

  const allVideos = [...localVideos, ...videoSeries];

  const filtered = activeGenre === "All"
    ? allVideos
    : allVideos.filter((s) => s.genre.some((g: string) => g.toLowerCase() === activeGenre.toLowerCase()));

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
