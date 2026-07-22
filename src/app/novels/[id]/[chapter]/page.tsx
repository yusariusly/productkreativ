"use client";

import { useState, use, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { novelSeries } from "@/data/dummy";
import { useLanguage } from "@/context/LanguageContext";
import { useAuth } from "@/context/AuthContext";
import styles from "./reader.module.css";

type ReaderTheme = "dark" | "light" | "sepia";

// Dynamic chapter content generator for immersive and varied reading experience
function getChapterContent(chapterNum: number, author: string) {
  const titles = [
    "Terbangun di Dunia Baru",
    "Pemberian Status dan Kekuatan F-Rank",
    "Pertemuan Pertama di Hutan Kabut",
    "Ujian Masuk Akademi Sihir",
    "Rahasia di Balik Labirin Kuno",
    "Pertarungan Melawan Goblin Lord",
    "Garis Batas Kehidupan dan Kematian",
    "Warisan Arkanis Terakhir",
    "Aliansi Tak Terduga",
    "Gerbang Dimensi yang Terbuka"
  ];
  
  const title = titles[(chapterNum - 1) % titles.length] || `Kekuatan yang Tersembunyi - Bagian ${chapterNum}`;
  
  const paragraphTemplates = [
    [
      "Udara dingin menusuk tulang saat kesadaranku perlahan kembali. Ketika membuka mata, yang tampak hanyalah kegelapan pekat yang dikelilingi oleh dinding batu lembap. Aku mencoba menggerakkan tanganku, namun seluruh tubuhku terasa kaku dan lelah luar biasa.",
      "Tiba-tiba, sebuah suara berdenting nyaring di dalam kepalaku. [Sistem diinisialisasi. Selamat datang, Yusarius. Anda telah berhasil berpindah ke dunia Bloodline Sovereign.] Sebuah layar semi-transparan berwarna biru neon muncul melayang tepat di depan wajahku.",
      "Aku tertegun sejenak membaca baris status yang tertera. Semua atributku berada di level terendah, F-Rank. Di dunia yang kejam ini, menjadi F-Rank sama saja dengan hukuman mati. Namun, di bawah daftar skill, ada satu entri berwarna emas redup: [Kebangkitan Tak Terbatas].",
      "Perlahan, aku bangkit berdiri dengan bertumpu pada dinding gua. Suara tetesan air yang bergema di kejauhan membuat atmosfer terasa semakin sunyi. Aku harus segera mencari jalan keluar sebelum makhluk buas gua ini mendeteksi keberadaanku.",
      "Langkah kakiku bergema pelan di atas lantai batu yang licin. Setiap hembusan napas terasa berat di tengah udara yang minim oksigen ini. Namun tekadku sudah bulat, aku akan bertahan hidup dan mengungkap misteri di balik perpindahan dimensi ini."
    ],
    [
      "Setelah berhasil keluar dari gua misterius itu, pemandangan hutan belantara yang luas membentang di hadapanku. Pohon-pohon raksasa dengan dedaunan berwarna ungu keperakan menjulang tinggi menutupi langit, menyaring cahaya matahari menjadi berkas-berkas tipis yang mistis.",
      "Aku memanggil layar statusku kembali. Dengan status F-Rank saat ini, bertarung secara langsung adalah tindakan bunuh diri. Aku perlu memahami cara kerja skill [Kebangkitan Tak Terbatas] ini sebelum berhadapan dengan bahaya apa pun di hutan ini.",
      "Suara gemerisik semak-semak di sebelah kananku membuatku langsung waspada. Dari balik bayang-bayang pohon, muncul seekor serigala berbulu hitam legam dengan mata merah menyala. Serigala itu menggeram rendah, memperlihatkan taring-taringnya yang tajam.",
      "Jantungku berdegup kencang. Insting bertarungku bergejolak. Aku memegang erat sebilah cabang pohon tajam yang kutemukan di tanah, bersiap menghadapi serangan pertama makhluk buas tersebut.",
      "Serigala itu melompat dengan kecepatan luar biasa. Aku menghindar ke kiri di detik-detik terakhir, merasakan embusan angin dingin saat tubuhnya melewatiku. Inilah pertarungan hidup dan mati pertamaku di dunia baru ini."
    ],
    [
      "Kabut tebal mulai turun menyelimuti hutan, membatasi jarak pandangku hanya sejauh beberapa meter. Di tengah kesunyian yang mencekam, sayup-sayup terdengar suara dentingan senjata beradu di kejauhan. Seseorang sedang bertarung.",
      "Aku mendekat dengan sangat hati-hati, bersembunyi di balik batang pohon besar. Di sana, seorang petarung wanita dengan zirah perak ringan sedang dikepung oleh sekelompok goblin bertubuh kekar. Gerakannya mulai melambat karena kelelahan.",
      "Meskipun statusku masih lemah, aku tahu aku tidak bisa tinggal diam. Menggunakan skill pasifku, aku menganalisis titik lemah dari goblin terdekat yang memegang tombak kasar.",
      "Dengan teriakan nyaring, aku menerjang dari arah belakang dan menusuk punggung goblin tersebut. Serangan kejutan itu berhasil menjatuhkannya seketika, mengalihkan perhatian goblin lainnya dari petarung wanita tersebut.",
      "Dia menoleh ke arahku dengan terkejut, namun segera memulihkan fokusnya. 'Terima kasih atas bantuannya! Mari kita habisi sisanya bersama-sama!' teriaknya sambil mengayunkan pedangnya dengan sapuan melingkar yang mematikan."
    ]
  ];
  
  // Select paragraph set or dynamically synthesize one for high chapter numbers
  let paragraphs = paragraphTemplates[(chapterNum - 1) % paragraphTemplates.length];
  if (!paragraphs) {
    paragraphs = [
      `Memasuki Bab ${chapterNum}, petualangan Yusarius di dunia Bloodline Sovereign semakin menantang. Kekuatan F-Rank yang dimilikinya kini perlahan mulai berevolusi melalui rentetan pertarungan sengit yang menguji batas kemampuannya.`,
      `Setiap langkah yang diambil membawanya lebih dekat ke konspirasi besar yang melibatkan para penguasa kerajaan kuno. Musuh-musuh baru yang lebih tangguh mulai bermunculan dari balik bayang-bayang, memaksa Yusarius memeras otak untuk bertahan hidup.`,
      `Dalam bab ini, fokus cerita bergeser ke arah persiapan strategi dan taktik baru untuk menembus labirin tingkat menengah yang menyimpan artefak legendaris peninggalan sang Arkanis Agung.`,
      `'Kita tidak bisa maju tanpa rencana yang matang,' bisik Yusarius kepada rekan-rekannya di sekitar api unggun. Cahaya api menari-nari di wajah mereka, mencerminkan ketegangan yang menyelimuti malam sebelum penyerangan.`,
      `Dengan tekad membara dan skill yang terus diasah, langkah menuju takdir baru pun dimulai. Babak baru pertarungan epik siap digelar demi mempertahankan eksistensi mereka di dunia yang kejam ini.`
    ];
  }
  
  return {
    chapter: chapterNum,
    title: title,
    author: author,
    readTime: `${10 + (chapterNum * 2) % 15}m baca`,
    date: `2026-07-${10 + (chapterNum % 20)}`,
    paragraphs: paragraphs,
    commentCounts: Array.from({ length: paragraphs.length }, (_, idx) => (chapterNum * 7 + idx * 3) % 45 + 2)
  };
}

export default function NovelReaderPage({
  params,
}: {
  params: Promise<{ id: string; chapter: string }>;
}) {
  const { id, chapter: chapterNum } = use(params);
  const router = useRouter();
  const { t } = useLanguage();
  const { isLoggedIn, addHistory } = useAuth();
  
  const series = novelSeries.find((s) => s.id === id) || novelSeries[0];
  const currentChapter = parseInt(chapterNum) || 1;
  const content = getChapterContent(currentChapter, series.author);

  // Record history dynamically when user reads a chapter
  useEffect(() => {
    if (isLoggedIn) {
      addHistory(id, currentChapter, "novel");
    }
  }, [id, currentChapter, isLoggedIn]);

  const [showControls, setShowControls] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [fontSize, setFontSize] = useState(18);
  const [lineHeight, setLineHeight] = useState(1.9);
  const [readerTheme, setReaderTheme] = useState<ReaderTheme>("dark");
  const [voted, setVoted] = useState(false);
  const [showComments, setShowComments] = useState<number | null>(null);

  if (currentChapter > 30 && !isLoggedIn) {
    return (
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "100vh", padding: "20px", background: "#0a0e1a", color: "#fff", textAlign: "center" }}>
        <div style={{ maxWidth: "480px", padding: "40px 30px", border: "1px solid var(--accent-gold)", borderRadius: "var(--radius-xl)", background: "rgba(255,255,255,0.02)", boxShadow: "var(--shadow-glow-gold)" }}>
          <span style={{ fontSize: "40px", marginBottom: "20px", display: "block" }}>🔒</span>
          <h2 style={{ fontSize: "var(--text-2xl)", fontWeight: 800, color: "var(--accent-gold)", marginBottom: "var(--space-md)" }}>Bab Ini Terkunci</h2>
          <p style={{ color: "var(--text-secondary)", fontSize: "var(--text-sm)", lineHeight: 1.6, marginBottom: "var(--space-xl)" }}>
            Anda mencoba mengakses bab premium (Bab {currentChapter}). Silakan masuk (login) terlebih dahulu untuk membuka bab ini menggunakan koin atau menonton iklan.
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            <Link href={`/login?redirect=/novels/${id}/${currentChapter}`} className="btn btn-gold btn-lg" style={{ width: "100%" }}>
              Masuk Sekarang
            </Link>
            <Link href={`/novels/${id}`} className="btn btn-outline" style={{ width: "100%" }}>
              Kembali ke Detail Novel
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Prevent right-click (content protection)
  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
  };

  const navigatePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (currentChapter > 1) {
      router.push(`/novels/${id}/${currentChapter - 1}`);
    }
  };

  const navigateNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (currentChapter < series.totalChapters) {
      router.push(`/novels/${id}/${currentChapter + 1}`);
    }
  };

  const scrollToTop = (e: React.MouseEvent) => {
    e.stopPropagation();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const scrollToBottom = (e: React.MouseEvent) => {
    e.stopPropagation();
    window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
  };

  return (
    <div
      className={styles.reader}
      data-reader-theme={readerTheme}
      onContextMenu={handleContextMenu}
      onClick={() => setShowControls(!showControls)}
      style={{
        ["--reader-font-size" as string]: `${fontSize}px`,
        ["--reader-line-height" as string]: lineHeight,
      }}
    >
      {/* ===== FLOATING HEADER / NAVBAR ===== */}
      <header 
        className={`${styles.readerHeader} ${showControls ? styles.headerVisible : ""}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={styles.headerLeft}>
          <Link href={`/novels/${id}`} className={styles.backBtn}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
          </Link>
          <div className={styles.headerInfo}>
            <span className={styles.headerSeries}>{series.title}</span>
            <span className={styles.headerChapter}>Chapter {currentChapter}</span>
          </div>
        </div>
        <div className={styles.headerRight}>
          <span className="coin-balance" style={{ fontSize: "12px", padding: "4px 10px" }}>
            <span className="coin-icon" style={{ width: "16px", height: "16px", fontSize: "9px" }}>$</span>
            2,450
          </span>
        </div>
      </header>

      {/* ===== FLOATING BOTTOM CHAPTER NAV OVERLAY (BOTTOM BAR) ===== */}
      <div 
        className={`${styles.bottomControls} ${showControls ? styles.controlsVisible : ""}`} 
        onClick={(e) => e.stopPropagation()}
      >
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
      <div 
        className={`${styles.floatingScrollStack} ${showControls ? styles.scrollStackVisible : ""}`} 
        onClick={(e) => e.stopPropagation()}
      >
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

      {/* Reader Content */}
      <article
        className={styles.readerContent}
        style={{ userSelect: "none", WebkitUserSelect: "none" }}
      >
        <div className={styles.chapterHeader}>
          <span className={styles.chapterLabel}>CHAPTER {content.chapter}</span>
          <h1 className={styles.chapterTitle}>{content.title}</h1>
          <div className={styles.chapterMeta}>
            <span>By {content.author}</span>
            <span>·</span>
            <span>{content.readTime}</span>
            <span>·</span>
            <span>{content.date}</span>
          </div>
        </div>

        <div className={styles.textContent}>
          {content.paragraphs.map((paragraph, i) => (
            <div key={i} className={styles.paragraph}>
              <p>{paragraph}</p>
              <button
                className={styles.inlineCommentBtn}
                onClick={(e) => {
                  e.stopPropagation();
                  setShowComments(showComments === i ? null : i);
                }}
                title={`${content.commentCounts[i]} komentar`}
              >
                {content.commentCounts[i]}
              </button>
            </div>
          ))}
        </div>

        {/* End of Chapter */}
        <div className={styles.chapterEnd} onClick={(e) => e.stopPropagation()}>
          <div className={styles.endActions}>
            <button
              className={`${styles.voteBtn} ${voted ? styles.voteBtnActive : ""}`}
              onClick={() => setVoted(!voted)}
            >
              {voted ? "⭐" : "☆"} {t("voteChapter")}
            </button>
            {currentChapter < series.totalChapters ? (
              <Link
                href={`/novels/${id}/${currentChapter + 1}`}
                className={styles.nextChapterBtn}
              >
                {t("nextChapter")} →
              </Link>
            ) : (
              <span className={styles.nextChapterBtn} style={{ opacity: 0.5, cursor: "not-allowed" }}>
                Bab Terakhir
              </span>
            )}
          </div>
        </div>
      </article>

      {/* Floating Settings Button */}
      <button
        className={styles.settingsFab}
        onClick={(e) => {
          e.stopPropagation();
          setShowSettings(!showSettings);
        }}
        aria-label="Reader settings"
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M4 6h16M4 12h16M4 18h16" />
          <circle cx="8" cy="6" r="2" fill="currentColor" />
          <circle cx="16" cy="12" r="2" fill="currentColor" />
          <circle cx="10" cy="18" r="2" fill="currentColor" />
        </svg>
      </button>

      {/* Settings Panel */}
      {showSettings && (
        <>
          <div className={styles.settingsOverlay} onClick={() => setShowSettings(false)}></div>
          <div className={styles.settingsPanel} onClick={(e) => e.stopPropagation()}>
            <h3 className={styles.settingsTitle}>{t("readerSettings")}</h3>

            {/* Font Size */}
            <div className={styles.settingGroup}>
              <label>{t("fontSize")}</label>
              <div className={styles.settingControl}>
                <button
                  className={styles.settingBtn}
                  onClick={() => setFontSize(Math.max(12, fontSize - 2))}
                >
                  A-
                </button>
                <span className={styles.settingValue}>{fontSize}px</span>
                <button
                  className={styles.settingBtn}
                  onClick={() => setFontSize(Math.min(28, fontSize + 2))}
                >
                  A+
                </button>
              </div>
            </div>

            {/* Line Spacing */}
            <div className={styles.settingGroup}>
              <label>{t("lineSpacing")}</label>
              <div className={styles.settingControl}>
                <button
                  className={styles.settingBtn}
                  onClick={() => setLineHeight(Math.max(1.2, lineHeight - 0.1))}
                >
                  −
                </button>
                <span className={styles.settingValue}>{lineHeight.toFixed(1)}</span>
                <button
                  className={styles.settingBtn}
                  onClick={() => setLineHeight(Math.min(2.5, lineHeight + 0.1))}
                >
                  +
                </button>
              </div>
            </div>

            {/* Theme */}
            <div className={styles.settingGroup}>
              <label>{t("theme")}</label>
              <div className={styles.themeOptions}>
                <button
                  className={`${styles.themeBtn} ${styles.themeDark} ${readerTheme === "dark" ? styles.themeBtnActive : ""}`}
                  onClick={() => setReaderTheme("dark")}
                >
                  {t("dark")}
                </button>
                <button
                  className={`${styles.themeBtn} ${styles.themeLight} ${readerTheme === "light" ? styles.themeBtnActive : ""}`}
                  onClick={() => setReaderTheme("light")}
                >
                  {t("light")}
                </button>
                <button
                  className={`${styles.themeBtn} ${styles.themeSepia} ${readerTheme === "sepia" ? styles.themeBtnActive : ""}`}
                  onClick={() => setReaderTheme("sepia")}
                >
                  {t("sepia")}
                </button>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Inline Comments Sidebar */}
      {showComments !== null && (
        <>
          <div className={styles.commentOverlay} onClick={() => setShowComments(null)}></div>
          <div className="bottom-sheet" onClick={(e) => e.stopPropagation()}>
            <div className="bottom-sheet-handle"></div>
            <h3 style={{ marginBottom: "16px", fontWeight: 700 }}>
              💬 {t("paragraphComments")} ({content.commentCounts[showComments]})
            </h3>
            <p className={styles.quotedText}>
              &ldquo;{content.paragraphs[showComments].substring(0, 80)}...&rdquo;
            </p>
            {[
              { 
                user: "BookWorm42", 
                text: t("home") === "Beranda" ? "Paragraf ini selalu membuatku merinding setiap saat!" : "This paragraph gives me chills every time!", 
                time: t("home") === "Beranda" ? "3 jam lalu" : "3h ago" 
              },
              { 
                user: "NeoReader", 
                text: t("home") === "Beranda" ? "Gaya penulisannya sangat luar biasa indah" : "The imagery here is absolutely stunning", 
                time: t("home") === "Beranda" ? "8 jam lalu" : "8h ago" 
              },
            ].map((comment, i) => (
              <div key={i} className={styles.comment}>
                <div className={styles.commentAvatar}>{comment.user[0]}</div>
                <div>
                  <div className={styles.commentMeta}>
                    <span className={styles.commentUser}>{comment.user}</span>
                    <span className={styles.commentTime}>{comment.time}</span>
                  </div>
                  <p className={styles.commentText}>{comment.text}</p>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
