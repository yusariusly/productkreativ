"use client";

import { useState, use, useRef, useEffect } from "react";
import Link from "next/link";
import { videoSeries, formatNumber } from "@/data/dummy";
import styles from "./player.module.css";

// High-quality vertical cyberpunk/neon sample video URLs
const sampleVideos = [
  "https://assets.mixkit.co/videos/preview/mixkit-girl-in-neon-sign-lights-in-dystopian-setting-41793-large.mp4",
  "https://assets.mixkit.co/videos/preview/mixkit-man-dancing-under-neon-lights-41794-large.mp4",
  "https://assets.mixkit.co/videos/preview/mixkit-neon-light-from-a-tunnel-in-a-futuristic-city-41792-large.mp4"
];

export default function VideoPlayerPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const series = videoSeries.find((s) => s.id === id) || videoSeries[0];
  
  const [currentEp, setCurrentEp] = useState(1);
  const [isPlaying, setIsPlaying] = useState(true);
  const [showEpisodes, setShowEpisodes] = useState(false);
  const [showLockPopup, setShowLockPopup] = useState(false);
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(12400);

  const videoRef = useRef<HTMLVideoElement>(null);
  const totalEps = series.totalChapters;
  const isLocked = (ep: number) => ep > 20;

  // Toggle Play/Pause
  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play().catch((err) => console.log("Play interrupted: ", err));
      }
      setIsPlaying(!isPlaying);
    }
  };

  // Handle changing episode
  const handleEpisodeSelect = (ep: number) => {
    if (isLocked(ep)) {
      setShowLockPopup(true);
      setShowEpisodes(false);
    } else {
      setCurrentEp(ep);
      setShowEpisodes(false);
      setIsPlaying(true);
    }
  };

  const handleLike = () => {
    setLiked(!liked);
    setLikeCount((prev) => liked ? prev - 1 : prev + 1);
  };

  // Sync play state if video src changes
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load();
      if (isPlaying) {
        videoRef.current.play().catch((err) => console.log("Auto-play error: ", err));
      }
    }
  }, [currentEp]);

  // Episode ranges tabs
  const epRanges: {start: number, end: number}[] = [];
  for (let i = 0; i < totalEps; i += 30) {
    epRanges.push({ start: i + 1, end: Math.min(i + 30, totalEps) });
  }

  const [activeRange, setActiveRange] = useState(0);

  // Pick a video URL based on episode number
  const videoSrc = sampleVideos[(currentEp - 1) % sampleVideos.length];

  return (
    <div className={styles.player}>
      {/* Video Area */}
      <div className={styles.videoArea}>
        <div className={styles.videoContainer}>
          {/* HTML5 Video Player */}
          <video
            ref={videoRef}
            src={videoSrc}
            className={styles.videoElement}
            autoPlay
            loop
            muted // Muted to allow browser autoPlay policy
            playsInline
            onClick={togglePlay}
          />
          
          <div className={styles.videoGradient}></div>

          {/* Play/Pause Overlay */}
          {!isPlaying && (
            <button className={styles.playOverlay} onClick={togglePlay}>
              <div className={styles.playIcon}>
                <svg width="48" height="48" viewBox="0 0 24 24" fill="white">
                  <polygon points="5,3 19,12 5,21" />
                </svg>
              </div>
            </button>
          )}

          {/* Top Navigation */}
          <div className={styles.topNav}>
            <Link href="/videos" className={styles.backBtn}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
            </Link>
            <div className={styles.topInfo}>
              <span className={styles.topLabel}>CURRENTLY PLAYING</span>
              <span className={styles.topTitle}>{series.title}</span>
            </div>
            <button className={styles.moreBtn}>⋮</button>
          </div>

          {/* Premium/Free Badge */}
          {isLocked(currentEp) ? (
            <div className={styles.premiumBadge}>
              <span>PREMIUM</span>
            </div>
          ) : (
            <div className={styles.freeBadge}>
              <span>FREE</span>
            </div>
          )}

          {/* Right Side Actions */}
          <div className={styles.rightActions}>
            <div className={styles.creatorAvatar}>
              <div className={styles.avatarCircle}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 12c2.7 0 5-2.3 5-5s-2.3-5-5-5-5 2.3-5 5 2.3 5 5 5zm0 2c-3.3 0-10 1.7-10 5v2h20v-2c0-3.3-6.7-5-10-5z" />
                </svg>
              </div>
              <div className={styles.followBtn}>+</div>
            </div>

            <button className={styles.sideAction} onClick={handleLike}>
              <span className={styles.sideIcon}>{liked ? "❤️" : "🤍"}</span>
              <span className={styles.sideCount}>{formatNumber(likeCount)}</span>
            </button>

            <button className={styles.sideAction}>
              <span className={styles.sideIcon}>💬</span>
              <span className={styles.sideCount}>842</span>
            </button>

            <button className={styles.sideAction}>
              <span className={styles.sideIcon}>↗️</span>
              <span className={styles.sideCount}>Share</span>
            </button>

            <button
              className={styles.sideAction}
              onClick={() => setShowEpisodes(true)}
            >
              <span className={styles.sideIcon}>⊞</span>
              <span className={styles.sideCount}>Episodes</span>
            </button>
          </div>

          {/* Bottom Info */}
          <div className={styles.bottomInfo}>
            <h2 className={styles.episodeTitle}>
              Ep {currentEp}: The Awakening Vibe
            </h2>
            <p className={styles.episodeDesc}>
              {series.synopsis}
            </p>

            {/* Progress Bar */}
            <div className={styles.progressBar}>
              <div
                className={styles.progressFill}
                style={{ width: "45%" }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      {/* Episodes Bottom Sheet */}
      {showEpisodes && (
        <>
          <div className={styles.overlay} onClick={() => setShowEpisodes(false)}></div>
          <div className={styles.episodeSheet}>
            <div className={styles.sheetHandle}></div>
            <h3 className={styles.sheetTitle}>
              Episodes ({totalEps})
            </h3>

            {/* Range Tabs */}
            <div className={styles.rangeTabs}>
              {epRanges.map((range, idx) => (
                <button
                  key={idx}
                  className={`${styles.rangeTab} ${activeRange === idx ? styles.rangeTabActive : ""}`}
                  onClick={() => setActiveRange(idx)}
                >
                  {range.start}-{range.end}
                </button>
              ))}
            </div>

            {/* Episode Grid */}
            <div className={styles.episodeGrid}>
              {Array.from(
                { length: epRanges[activeRange].end - epRanges[activeRange].start + 1 },
                (_, i) => epRanges[activeRange].start + i
              ).map((ep) => (
                <button
                  key={ep}
                  className={`${styles.episodeBtn} ${
                    ep === currentEp ? styles.episodeBtnActive : ""
                  } ${isLocked(ep) ? styles.episodeBtnLocked : ""}`}
                  onClick={() => handleEpisodeSelect(ep)}
                >
                  {ep}
                  {isLocked(ep) && <span className={styles.lockIcon}>🔒</span>}
                </button>
              ))}
            </div>
          </div>
        </>
      )}

      {/* Lock Popup */}
      {showLockPopup && (
        <div className="modal-backdrop" onClick={() => setShowLockPopup(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: "48px", marginBottom: "16px" }}>🔒</div>
              <h3 style={{ fontSize: "20px", fontWeight: 700, marginBottom: "8px" }}>
                Episode Terkunci
              </h3>
              <p style={{ color: "var(--text-secondary)", marginBottom: "24px", fontSize: "14px" }}>
                Buka episode ini untuk melanjutkan menonton.
              </p>
              <button
                className="btn btn-gold btn-lg"
                style={{ width: "100%", marginBottom: "12px" }}
                onClick={() => setShowLockPopup(false)}
              >
                Buka dengan 20 Koin
              </button>
              <button
                className="btn btn-outline"
                style={{ width: "100%" }}
                onClick={() => setShowLockPopup(false)}
              >
                Tonton Iklan
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
