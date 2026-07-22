"use client";

import { useState, use, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { comicSeries, sampleChapters, formatNumber } from "@/data/dummy";
import { useAuth } from "@/context/AuthContext";
import styles from "./viewer.module.css";

// Realistic high-quality digital art panels for vertical webcomic reading
const comicPanels = [
  "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=800&q=80",
  "https://images.unsplash.com/photo-1578632767115-351597cf2477?w=800&q=80",
  "https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=800&q=80",
  "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=800&q=80",
  "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=800&q=80",
  "https://images.unsplash.com/photo-1618336753974-aae8e04506aa?w=800&q=80"
];

// Mock sidebar trending comics matching user's screenshot
const trendingList = [
  { id: "manajer-kim", rank: 1, title: "Manajer Kim (Agent K)", author: "Jeongjongtaek / PTJ cartoon company", genre: "Aksi", coverUrl: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=120&q=80" },
  { id: "sera", rank: 2, title: "Sera", author: "Han Gi Ppeum / SEUNG", genre: "Aksi", coverUrl: "https://images.unsplash.com/photo-1578632767115-351597cf2477?w=120&q=80" },
  { id: "miss-pendleton", rank: 3, title: "Miss Pendleton", author: "kkomak / Yu Hyemin", genre: "Kerajaan", coverUrl: "https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=120&q=80" },
  { id: "reality-quest", rank: 4, title: "Reality Quest", author: "Joowoon Lee / Taesung", genre: "Aksi", coverUrl: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=120&q=80" },
  { id: "born-from-death", rank: 5, title: "Born from Death", author: "Tan Feli", genre: "Fantasi", coverUrl: "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=120&q=80" },
];

interface Reply {
  id: number;
  user: string;
  date: string;
  text: string;
  avatar: string;
  likes: number;
  userLiked?: boolean;
  replyTo?: string; // Who this reply tags
  roleBadge?: { text: string; type: "archduke" | "lord" | "member" };
  hasCheck?: boolean;
  imageUrl?: string;
}

interface Comment {
  id: number;
  user: string;
  date: string;
  text: string;
  likes: number;
  dislikes: number;
  isBest: boolean;
  avatar: string;
  userLiked?: boolean;
  userDisliked?: boolean;
  replies: Reply[];
  roleBadge?: { text: string; type: "archduke" | "lord" | "member" };
  hasCheck?: boolean;
}

// Generate deterministic comments for each chapter so they feel unique
function getInitialComments(chapterNum: number): Comment[] {
  return [
    {
      id: chapterNum * 1000 + 1,
      user: "Aomine",
      date: `2026-04-18`,
      text: `Gila sih Chapter ${chapterNum} ini seru banget! Ditunggu lanjutannya!`,
      likes: 120,
      dislikes: 1,
      isBest: true,
      avatar: "A",
      hasCheck: true,
      roleBadge: { text: "MEMBER", type: "member" },
      replies: [
        {
          id: chapterNum * 10000 + 101,
          user: "Zinagash 2",
          date: "2026-04-18",
          text: "Sama plaga plongo",
          avatar: "Z",
          likes: 0,
          replyTo: "Aomine",
          roleBadge: { text: "Archduke", type: "archduke" },
          hasCheck: true
        },
        {
          id: chapterNum * 10000 + 102,
          user: "ILUTION",
          date: "2026-04-18",
          text: "Guuuguuugagaa guuguugaaagaaa",
          avatar: "I",
          likes: 0,
          replyTo: "Aomine",
          roleBadge: { text: "Archduke", type: "archduke" },
          hasCheck: true
        },
        {
          id: chapterNum * 10000 + 103,
          user: "Muhamad ikmal Ikmal nurjaelani",
          date: "2026-04-18",
          text: "Patrick",
          avatar: "M",
          likes: 5,
          replyTo: "Aomine",
          roleBadge: { text: "LORD", type: "lord" },
          hasCheck: true,
          imageUrl: "https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=400&q=80"
        }
      ]
    },
    {
      id: chapterNum * 1000 + 2,
      user: "NonaKelinci",
      date: "2026-04-17",
      text: "Artnya keren banget gila, alur ceritanya juga makin bikin penasaran tiap chapter!",
      likes: 342,
      dislikes: 2,
      isBest: false,
      avatar: "N",
      hasCheck: false,
      replies: []
    }
  ];
}

export default function ComicViewerPage({
  params,
}: {
  params: Promise<{ id: string; chapter: string }>;
}) {
  const { id, chapter: chapterNum } = use(params);
  const router = useRouter();
  const { isLoggedIn, addHistory } = useAuth();
  
  const [series, setSeries] = useState<any | null>(null);
  const [chapters, setChapters] = useState<any[]>([]);
  const [chapterData, setChapterData] = useState<any | null>(null);
  const [panels, setPanels] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  const currentChapter = parseInt(chapterNum) || 1;

  useEffect(() => {
    let foundSeries = null;
    let foundEpisodes: any[] = [];
    let foundChapter = null;
    let foundPanels: string[] = [];
    
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith("sampulkreativ_series_")) {
        try {
          const items = JSON.parse(localStorage.getItem(key) || "[]");
          const match = items.find((item: any) => item.id === id);
          if (match) {
            foundSeries = {
              id: match.id,
              title: match.name,
              author: "Ghani",
              type: "comic",
              genre: [match.category1 || "Action", match.category2 || "Sci-Fi"].filter(Boolean),
              rating: 4.9,
              views: match.views || 0,
              likes: 0,
              coverUrl: match.thumbnail || "https://images.unsplash.com/photo-1578632767115-351597cf2477?w=500&q=80",
              synopsis: match.summary || "No description.",
              totalChapters: match.chapters || 0,
              status: "ongoing",
              isOriginal: true,
              updatedAt: new Date().toISOString().split("T")[0]
            };
            
            const email = key.replace("sampulkreativ_series_", "");
            const epKey = `sampulkreativ_episodes_${email}`;
            const epMap = JSON.parse(localStorage.getItem(epKey) || "{}");
            const rawEps = epMap[id] || [];
            
            foundEpisodes = rawEps.map((ep: any, index: number) => ({
              id: ep.id,
              seriesId: id,
              number: ep.episodeNumber || (rawEps.length - index),
              title: ep.title,
              accessType: "free" as const,
              coinPrice: 0,
              publishedAt: ep.date,
              views: ep.views || 0,
              likes: 0,
              comments: 0,
              thumbnailUrl: ep.thumbnail || null,
              contentUrl: ep.contentUrl || null
            }));
            
            const matchedEp = foundEpisodes.find((e: any) => e.number === currentChapter);
            if (matchedEp) {
              foundChapter = matchedEp;
              if (matchedEp.contentUrl) {
                foundPanels = [matchedEp.contentUrl];
              } else {
                foundPanels = comicPanels;
              }
            } else {
              foundPanels = comicPanels;
            }
            break;
          }
        } catch (e) {
          console.error(e);
        }
      }
    }
    
    if (!foundSeries) {
      const dummy = comicSeries.find((s) => s.id === id);
      if (dummy) {
        foundSeries = dummy;
        foundEpisodes = sampleChapters;
        foundChapter = sampleChapters.find((c) => c.number === currentChapter);
        foundPanels = comicPanels;
      }
    }
    
    if (!foundSeries) {
      foundSeries = comicSeries[0];
      foundEpisodes = sampleChapters;
      foundChapter = sampleChapters[0];
      foundPanels = comicPanels;
    }
    
    setSeries(foundSeries);
    setChapters(foundEpisodes);
    setChapterData(foundChapter);
    setPanels(foundPanels);
    setLoading(false);
  }, [id, currentChapter]);

  // Sync history dynamically on chapter read
  useEffect(() => {
    if (isLoggedIn && !loading) {
      addHistory(id, currentChapter, "comic");
    }
  }, [id, currentChapter, isLoggedIn, loading]);

  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(1200);
  const [favorited, setFavorited] = useState(false);

  // Navigation controls visibility toggle
  const [showControls, setShowControls] = useState(false);
  const [activeTab, setActiveTab] = useState("TERPOPULER");
  
  // Comment states
  const [comments, setComments] = useState<Comment[]>([]);
  const [commentInput, setCommentInput] = useState("");
  const [activeReplyBox, setActiveReplyBox] = useState<number | null>(null);
  const [replyInput, setReplyInput] = useState("");

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);

  // Sync state data on chapter change
  useEffect(() => {
    if (loading) return;
    setComments(getInitialComments(currentChapter));
    setLiked(false);
    setLikeCount(chapterData?.likes || 1200);
    setFavorited(false);
    setActiveReplyBox(null);
    setReplyInput("");
    setCommentInput("");

    // Center scroll slider around current item
    if (sliderRef.current) {
      const currentElement = sliderRef.current.querySelector(
        `.${styles.sliderItemCurrent}`
      );
      if (currentElement) {
        currentElement.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
          inline: "center"
        });
      }
    }
  }, [currentChapter, id, chapterData, loading]);

  const handleLike = () => {
    setLiked(!liked);
    setLikeCount((prev) => (liked ? prev - 1 : prev + 1));
  };

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCommentInput(e.target.value);
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  };

  const handlePostComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentInput.trim()) return;
    const newComment: Comment = {
      id: Date.now(),
      user: "Yusarius",
      date: "Hari Ini",
      text: commentInput,
      likes: 0,
      dislikes: 0,
      isBest: false,
      avatar: "Y",
      replies: [],
      hasCheck: true,
      roleBadge: { text: "MEMBER", type: "member" }
    };
    setComments([newComment, ...comments]);
    setCommentInput("");
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }
  };

  const handleLikeComment = (commentId: number) => {
    setComments(prevComments =>
      prevComments.map(c => {
        if (c.id === commentId) {
          if (c.userLiked) {
            return { ...c, likes: c.likes - 1, userLiked: false };
          } else {
            return {
              ...c,
              likes: c.likes + 1,
              userLiked: true,
              dislikes: c.userDisliked ? c.dislikes - 1 : c.dislikes,
              userDisliked: false
            };
          }
        }
        return c;
      })
    );
  };

  const handleDislikeComment = (commentId: number) => {
    setComments(prevComments =>
      prevComments.map(c => {
        if (c.id === commentId) {
          if (c.userDisliked) {
            return { ...c, dislikes: c.dislikes - 1, userDisliked: false };
          } else {
            return {
              ...c,
              dislikes: c.dislikes + 1,
              userDisliked: true,
              likes: c.userLiked ? c.likes - 1 : c.likes,
              userLiked: false
            };
          }
        }
        return c;
      })
    );
  };

  const handlePostReply = (e: React.FormEvent, commentId: number, parentUser: string) => {
    e.preventDefault();
    if (!replyInput.trim()) return;

    const newReply: Reply = {
      id: Date.now(),
      user: "Yusarius",
      date: "Hari Ini",
      text: replyInput,
      avatar: "Y",
      likes: 0,
      replyTo: parentUser,
      roleBadge: { text: "MEMBER", type: "member" },
      hasCheck: true
    };

    setComments(prevComments =>
      prevComments.map(c => {
        if (c.id === commentId) {
          return { ...c, replies: [...c.replies, newReply] };
        }
        return c;
      })
    );

    setReplyInput("");
    setActiveReplyBox(null);
  };

  const handleLikeReply = (commentId: number, replyId: number) => {
    setComments(prevComments =>
      prevComments.map(c => {
        if (c.id === commentId) {
          return {
            ...c,
            replies: c.replies.map(r => {
              if (r.id === replyId) {
                if (r.userLiked) {
                  return { ...r, likes: r.likes - 1, userLiked: false };
                } else {
                  return { ...r, likes: r.likes + 1, userLiked: true };
                }
              }
              return r;
            })
          };
        }
        return c;
      })
    );
  };

  const scrollToTop = (e: React.MouseEvent) => {
    e.stopPropagation();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const scrollToBottom = (e: React.MouseEvent) => {
    e.stopPropagation();
    const footerElement = document.getElementById("viewer-footer");
    if (footerElement) {
      footerElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  const navigatePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (currentChapter > 1) {
      router.push(`/comics/${id}/${currentChapter - 1}`);
    }
  };

  const navigateNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (currentChapter < series.totalChapters) {
      router.push(`/comics/${id}/${currentChapter + 1}`);
    }
  };

  const slideLeft = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: -240, behavior: "smooth" });
    }
  };

  const slideRight = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: 240, behavior: "smooth" });
    }
  };

  if (loading || !series) {
    return (
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "100vh", background: "#0a0e1a", color: "#fff" }}>
        <p>Memuat bab komik...</p>
      </div>
    );
  }

  return (
    <div className={styles.viewer} onClick={() => setShowControls(!showControls)}>
      
      {/* ===== FLOATING NAVBAR / HEADER ===== */}
      <header className={`${styles.viewerHeader} ${showControls ? styles.headerVisible : ""}`} onClick={(e) => e.stopPropagation()}>
        <Link href={`/comics/${id}`} className={styles.backBtn}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
        </Link>
        <div className={styles.headerInfo}>
          <span className={styles.headerSeries}>{series.title}</span>
          <span className={styles.headerChapter}>Chapter {currentChapter}</span>
        </div>
        <div className={styles.headerActions}>
          <span className="coin-balance" style={{ fontSize: "12px", padding: "4px 10px" }}>
            <span className="coin-icon" style={{ width: "16px", height: "16px", fontSize: "9px" }}>$</span>
            2,450
          </span>
        </div>
      </header>

      {/* ===== FLOATING CHAPTER NAV OVERLAY (BOTTOM BAR) ===== */}
      <div className={`${styles.bottomControls} ${showControls ? styles.controlsVisible : ""}`} onClick={(e) => e.stopPropagation()}>
        <button 
          className={styles.chapterNavBtn} 
          onClick={navigatePrev} 
          disabled={currentChapter <= 1}
        >
          ◀
        </button>
        <span className={styles.chapterNumberDisplay}>#{currentChapter}</span>
        <button 
          className={styles.chapterNavBtn} 
          onClick={navigateNext} 
          disabled={currentChapter >= series.totalChapters}
        >
          ▶
        </button>
      </div>

      {/* ===== FLOATING SCROLL BUTTONS (RIGHT STACK) ===== */}
      <div className={`${styles.floatingScrollStack} ${showControls ? styles.scrollStackVisible : ""}`} onClick={(e) => e.stopPropagation()}>
        <button className={styles.circleScrollBtn} onClick={scrollToTop} title="Scroll to Top">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <polyline points="18 15 12 9 6 15" />
          </svg>
        </button>
        <button className={styles.circleScrollBtn} onClick={scrollToBottom} title="Scroll to Bottom">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </button>
      </div>

      {/* Vertical Scroll Panels */}
      <div className={styles.panelContainer}>
        {panels.map((url, idx) => (
          <div key={idx} className={styles.panel}>
            <img src={url} alt={`Panel ${idx + 1}`} className={styles.panelImage} />
            {idx === 0 && (
              <div className={styles.panelTitleOverlay}>
                <h2>{series.title}</h2>
                <p>Chapter {currentChapter}: {chapterData?.title?.includes(": ") ? chapterData.title.split(": ")[1] : chapterData?.title || "The Awakening"}</p>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* ===== FLAT NEXT CHAPTER ACTION BLOCK ===== */}
      <div className={styles.endSection} onClick={(e) => e.stopPropagation()}>
        <p className={styles.shareCallout}>
          Bagikan komik ini dan dukung kreatornya terus berkarya!
        </p>

        {/* Dynamic Action Buttons: Like, Favorit, Share Socials */}
        <div className={styles.interactiveRow}>
          {/* Like Button */}
          <button
            className={`${styles.pillActionBtn} ${liked ? styles.pillActionBtnActive : ""}`}
            onClick={handleLike}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill={liked ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
            <span>{formatNumber(likeCount)}</span>
          </button>

          {/* Favorit Button */}
          <button
            className={`${styles.pillActionBtn} ${favorited ? styles.pillActionBtnActive : ""}`}
            onClick={() => setFavorited(!favorited)}
          >
            <span>{favorited ? "✓ Terfavorit" : "+ Favorit"}</span>
          </button>

          {/* Social Share Circle Buttons */}
          <div className={styles.socialShareRow}>
            <button className={`${styles.shareCircle} ${styles.facebook}`} title="Facebook" onClick={() => alert("Bagikan ke Facebook!")}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c4.56-.93 8-4.96 8-9.75z"/>
              </svg>
            </button>
            <button className={`${styles.shareCircle} ${styles.line}`} title="LINE" onClick={() => alert("Bagikan ke LINE!")}>
              <span style={{ fontSize: "7px", fontWeight: "900" }}>LINE</span>
            </button>
            <button className={`${styles.shareCircle} ${styles.twitter}`} title="X (Twitter)" onClick={() => alert("Bagikan ke X!")}>
              <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </button>
            <button className={`${styles.shareCircle} ${styles.copy}`} title="Copy Link" onClick={() => { navigator.clipboard.writeText(window.location.href); alert("Tautan disalin!"); }}>
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
              </svg>
            </button>
          </div>
        </div>

        {/* Horizontal Episode Carousel Slider (Interactive thumbnail list of other episodes) */}
        <div className={styles.episodeCarouselBlock}>
          <button className={styles.carouselArrowBtn} onClick={slideLeft}>
            &lt;
          </button>
          
          <div className={styles.carouselViewport} ref={sliderRef}>
            <div className={styles.carouselTrack}>
              {Array.from({ length: series.totalChapters }).map((_, index) => {
                const epNum = index + 1;
                const isCurrent = epNum === currentChapter;
                const thumbUrl = comicPanels[epNum % comicPanels.length];
                return (
                  <Link
                    href={`/comics/${id}/${epNum}`}
                    key={epNum}
                    className={`${styles.carouselItem} ${isCurrent ? styles.carouselItemCurrent : ""}`}
                  >
                    <div className={styles.carouselThumbWrapper}>
                      <img src={thumbUrl} alt={`Episode ${epNum}`} className={styles.carouselThumb} />
                    </div>
                    <span className={styles.carouselItemLabel}>EPISODE {epNum}</span>
                  </Link>
                );
              })}
            </div>
          </div>

          <button className={styles.carouselArrowBtn} onClick={slideRight}>
            &gt;
          </button>
        </div>

        {/* Inline transition triggers */}
        <div className={styles.nextChapterInline}>
          {currentChapter < series.totalChapters ? (
            <button className="btn btn-primary btn-lg" onClick={navigateNext}>
              Next Chapter →
            </button>
          ) : (
            <div className={styles.seriesEnd}>
              <p>You&apos;ve reached the latest chapter!</p>
              <Link href={`/comics/${id}`} className="btn btn-outline">
                Back to Detail Page
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* ===== WEBTOON STYLE FOOTER (COMMENTS & TRENDING COLUMNS) ===== */}
      <footer className={styles.viewerFooter} id="viewer-footer" onClick={(e) => e.stopPropagation()}>
        <div className={styles.footerInner}>
          
          {/* LEFT COLUMN: Creator + Comment List */}
          <div className={styles.footerLeft}>
            <div className={styles.creatorInfo}>
              <span className={styles.creatorLabel}>Kreator</span>
              <h4 className={styles.creatorName}>{series.author}, Candlebambi</h4>
            </div>

            {/* Comment Section Box */}
            <div className={styles.commentSection}>
              <h3 className={styles.commentCountTitle}>
                Komentar <span className={styles.commentCountNumber}>{comments.length}</span>
              </h3>

              {/* Comment Input Area */}
              <form onSubmit={handlePostComment} className={styles.commentForm}>
                <textarea
                  ref={textareaRef}
                  className={styles.commentTextarea}
                  placeholder="Tulis komentar..."
                  value={commentInput}
                  onChange={handleTextareaChange}
                  rows={2}
                  required
                />
                
                {/* Formatting/Rich buttons matching mockup */}
                <div className={styles.commentFormActions}>
                  <div className={styles.emojiShortcuts}>
                    <button type="button" className={styles.shortcutBtn} title="Emoji">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="12" r="10" />
                        <path d="M8 14s1.5 2 4 2 4-2 4-2" />
                        <circle cx="9" cy="9" r="1" fill="currentColor" />
                        <circle cx="15" cy="9" r="1" fill="currentColor" />
                      </svg>
                    </button>
                    <button type="button" className={styles.shortcutBtn} title="GIF">
                      <span style={{ fontWeight: 800, fontSize: "11px", letterSpacing: "0.05em" }}>GIF</span>
                    </button>
                    <button type="button" className={styles.shortcutBtn} title="Upload Image">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                        <circle cx="8.5" cy="8.5" r="1.5" />
                        <polyline points="21 15 16 10 5 21" />
                      </svg>
                    </button>
                    
                    <div className={styles.spoilerToggle}>
                      <span className={styles.spoilerLabel}>Spoiler</span>
                      <label className={styles.switch}>
                        <input type="checkbox" id="spoiler-chk" />
                        <span className={styles.slider}></span>
                      </label>
                    </div>
                  </div>
                  <button type="submit" className={styles.submitCommentBtn}>
                    ➤
                  </button>
                </div>
              </form>

              {/* Comments Tabs */}
              <div className={styles.commentTabs}>
                <button
                  className={`${styles.tabBtn} ${activeTab === "TERPOPULER" ? styles.tabBtnActive : ""}`}
                  onClick={() => setActiveTab("TERPOPULER")}
                >
                  TERPOPULER
                </button>
                <button
                  className={`${styles.tabBtn} ${activeTab === "TERBARU" ? styles.tabBtnActive : ""}`}
                  onClick={() => setActiveTab("TERBARU")}
                >
                  TERBARU
                </button>
              </div>

              {/* Comments List */}
              <div className={styles.commentsList}>
                {comments.map((comment) => (
                  <div key={comment.id} className={styles.commentBlock}>
                    <div className={styles.commentItem}>
                      <div className={styles.avatarWrapper}>
                        <div className={styles.avatarCircleSmall}>
                          {comment.avatar}
                        </div>
                        {comment.hasCheck && (
                          <div className={styles.avatarCheck}>
                            <svg width="6" height="6" viewBox="0 0 24 24" fill="white">
                              <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                            </svg>
                          </div>
                        )}
                      </div>
                      <div className={styles.commentContent}>
                        <div className={styles.commentHeader}>
                          <span className={styles.commentUser}>{comment.user}</span>
                          
                          {/* Deterministic Role Badge */}
                          {comment.roleBadge && (
                            <span className={`${styles.roleBadge} ${styles[comment.roleBadge.type]}`}>
                              {comment.roleBadge.text === "Archduke" ? "⚔️ " : comment.roleBadge.text === "LORD" ? "🛡️ " : ""}
                              {comment.roleBadge.text}
                            </span>
                          )}

                          <span className={styles.commentDate}>{comment.date}</span>
                        </div>
                        
                        {comment.isBest && (
                          <span className={styles.bestBadge}>BEST</span>
                        )}

                        <p className={styles.commentText}>{comment.text}</p>
                        
                        <div className={styles.commentActions}>
                          <button 
                            className={styles.replyBtn}
                            onClick={() => setActiveReplyBox(activeReplyBox === comment.id ? null : comment.id)}
                          >
                            Balasan {comment.replies.length > 0 && `(${comment.replies.length})`}
                          </button>
                          
                          <div className={styles.likeDislikeSection}>
                            <button 
                              className={`${styles.likeBtn} ${comment.userLiked ? styles.likeBtnActive : ""}`}
                              onClick={() => handleLikeComment(comment.id)}
                            >
                              <svg width="14" height="14" viewBox="0 0 24 24" fill={comment.userLiked ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: "4px" }}>
                                <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3" />
                              </svg>
                              {comment.likes}
                            </button>
                            <button 
                              className={`${styles.dislikeBtn} ${comment.userDisliked ? styles.dislikeBtnActive : ""}`}
                              onClick={() => handleDislikeComment(comment.id)}
                            >
                              <svg width="14" height="14" viewBox="0 0 24 24" fill={comment.userDisliked ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: "4px" }}>
                                <path d="M10 15v4a3 3 0 0 0 3 3l4-9V2H5.72a2 2 0 0 0-2 1.7l-1.38 9a2 2 0 0 0 2 2.3zm12-13h3a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2h-3" />
                              </svg>
                              {comment.dislikes}
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Inline Reply Form */}
                    {activeReplyBox === comment.id && (
                      <form 
                        className={styles.replyForm}
                        onSubmit={(e) => handlePostReply(e, comment.id, comment.user)}
                      >
                        <input
                          type="text"
                          className={styles.replyInput}
                          placeholder={`Balas ke @${comment.user}...`}
                          value={replyInput}
                          onChange={(e) => setReplyInput(e.target.value)}
                          required
                          autoFocus
                        />
                        <button type="submit" className={styles.replySubmitBtn}>
                          Kirim
                        </button>
                      </form>
                    )}

                    {/* Nested Replies List */}
                    {comment.replies.length > 0 && (
                      <div className={styles.repliesList}>
                        {comment.replies.map((reply) => (
                          <div key={reply.id} className={styles.replyItem}>
                            <div className={styles.avatarWrapper}>
                              <div className={styles.replyAvatar}>
                                {reply.avatar}
                              </div>
                              {reply.hasCheck && (
                                <div className={styles.avatarCheckSmall}>
                                  <svg width="4" height="4" viewBox="0 0 24 24" fill="white">
                                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                                  </svg>
                                </div>
                              )}
                            </div>
                            <div className={styles.replyContent}>
                              <div className={styles.commentHeader}>
                                <span className={styles.replyUser}>{reply.user}</span>
                                
                                {/* Deterministic Role Badge */}
                                {reply.roleBadge && (
                                  <span className={`${styles.roleBadge} ${styles[reply.roleBadge.type]}`}>
                                    {reply.roleBadge.text === "Archduke" ? "⚔️ " : reply.roleBadge.text === "LORD" ? "🛡️ " : ""}
                                    {reply.roleBadge.text}
                                  </span>
                                )}

                                <span className={styles.commentDate}>{reply.date}</span>
                              </div>

                              {/* Highlighted Tag to user */}
                              {reply.replyTo && (
                                <span className={styles.replyTag}>@{reply.replyTo}:</span>
                              )}

                              <p className={styles.replyText}>{reply.text}</p>
                              
                              {/* Option Image (e.g. Patrick Star graphic) */}
                              {reply.imageUrl && (
                                <div className={styles.replyImageWrapper}>
                                  <img src={reply.imageUrl} alt="Embedded content" className={styles.replyImage} />
                                </div>
                              )}

                              <div className={styles.replyActions}>
                                <button 
                                  className={`${styles.replyLikeBtn} ${reply.userLiked ? styles.replyLikeBtnActive : ""}`}
                                  onClick={() => handleLikeReply(comment.id, reply.id)}
                                >
                                  <svg width="12" height="12" viewBox="0 0 24 24" fill={reply.userLiked ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: "3px" }}>
                                    <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3" />
                                  </svg>
                                  {reply.likes}
                                </button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Sidebar (Trending & Populer) */}
          <div className={styles.footerRight}>
            
            {/* Trending & Populer Grid */}
            <div className={styles.rightWidget}>
              <div className={styles.widgetHeader}>
                <h3>Trending &amp; Populer</h3>
                <span className={styles.widgetArrow}>&gt;</span>
              </div>
              <div className={styles.widgetList}>
                {trendingList.map((item) => (
                  <Link href={`/comics/${item.id}`} key={item.id} className={styles.widgetItem}>
                    <img src={item.coverUrl} alt={item.title} className={styles.widgetThumb} />
                    <div className={styles.widgetRank}>{item.rank}</div>
                    <div className={styles.widgetInfo}>
                      <span className={styles.widgetGenre}>{item.genre}</span>
                      <h4 className={styles.widgetTitle}>{item.title}</h4>
                      <span className={styles.widgetAuthor}>{item.author}</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Top Original Grid */}
            <div className={styles.rightWidget} style={{ marginTop: "32px" }}>
              <div className={styles.widgetHeader}>
                <h3>TOP ORIGINAL</h3>
                <span className={styles.widgetArrow}>&gt;</span>
              </div>
              <div className={styles.widgetList}>
                <Link href="/comics/neon-syndicate-rebirth" className={styles.widgetItem}>
                  <img src="https://images.unsplash.com/photo-1578632767115-351597cf2477?w=120&amp;q=80" alt="Top Original" className={styles.widgetThumb} />
                  <div className={styles.widgetRank}>1</div>
                  <div className={styles.widgetInfo}>
                    <span className={styles.widgetGenre}>Cyberpunk</span>
                    <h4 className={styles.widgetTitle}>Neon Syndicate: Rebirth</h4>
                    <span className={styles.widgetAuthor}>StudioPulse</span>
                  </div>
                </Link>
              </div>
            </div>

          </div>

        </div>
      </footer>

    </div>
  );
}
