"use client";

import { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import styles from "./dashboard.module.css";
import { formatNumber } from "@/data/dummy";

function CreatorDashboardContent() {
  const { isLoggedIn, isLoading, logout, user } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();

  const [showUploadForm, setShowUploadForm] = useState(false);
  const [sourceLang, setSourceLang] = useState("Bahasa Indonesia");
  const [seriesTitle, setSeriesTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [category, setCategory] = useState("SUPERHERO");
  const [seriesType, setSeriesType] = useState("Comic");
  const [squareThumbName, setSquareThumbName] = useState("No file chosen");
  const [verticalThumbName, setVerticalThumbName] = useState("No file chosen");
  const [agreed, setAgreed] = useState(false);
  const [activeMenu, setActiveMenu] = useState("series");
  const [activeReplyId, setActiveReplyId] = useState<string | null>(null);
  const [replyTextVal, setReplyTextVal] = useState("");
  const [commentsList, setCommentsList] = useState([
    {
      id: "c1",
      user: "Andi Pratama",
      series: "Cyberpunk: Neon Dreams",
      comment: "Chapter ini seru banget! Plot twist di akhir gak ketebak sama sekali. Kapan chapter selanjutnya rilis?",
      time: "2 jam yang lalu",
      reply: null as string | null
    },
    {
      id: "c2",
      user: "Siti Rahma",
      series: "Under the Purple Neon Sky",
      comment: "Gaya penulisan novel ini sangat puitis dan mengalir. Karakter utamanya sangat relatable.",
      time: "Kemarin",
      reply: null as string | null
    },
    {
      id: "c3",
      user: "Budi Santoso",
      series: "Chrome Hearts",
      comment: "Kualitas animasinya sangat halus. Sound design juga pas. Keren banget untuk karya indie!",
      time: "3 hari yang lalu",
      reply: null as string | null
    },
  ]);

  const handleReplySubmit = (id: string) => {
    if (!replyTextVal.trim()) return;
    setCommentsList(commentsList.map(c => c.id === id ? { ...c, reply: replyTextVal } : c));
    setActiveReplyId(null);
    setReplyTextVal("");
  };

  const [selectedSeries, setSelectedSeries] = useState<any | null>(null);
  const [manageView, setManageView] = useState<"hub" | "edit" | "episode">("hub");
  const [episodesMap, setEpisodesMap] = useState<Record<string, any[]>>({});
  const [showAddEpisodeForm, setShowAddEpisodeForm] = useState(false);
  const [newEpisodeTitle, setNewEpisodeTitle] = useState("");
  const [newEpisodeFileName, setNewEpisodeFileName] = useState("No file chosen");

  // Detailed Edit Form States
  const [editPublishStatus, setEditPublishStatus] = useState("Sedang Berlangsung");
  const [editSourceLang, setEditSourceLang] = useState("Bahasa Indonesia");
  const [editSummary, setEditSummary] = useState("");
  const [editCategory1, setEditCategory1] = useState("HOROR");
  const [editCategory2, setEditCategory2] = useState("THRILLER");
  const [editKekerasan, setEditKekerasan] = useState("1: Darah ringan atau fantasi di beberapa episode");
  const [editSeksual, setEditSeksual] = useState("0: Tidak ada konten atau tema seksual");
  const [editKetelanjangan, setEditKetelanjangan] = useState("0: Tidak ada ketelanjangan (sebagian maupun penuh)");
  const [editKataKasar, setEditKataKasar] = useState("0: Tidak ada kata-kata kasar");
  const [editAlkohol, setEditAlkohol] = useState("0: Tidak ada alkohol, tembakau, atau narkoba");
  const [editSensitivitas, setEditSensitivitas] = useState<Record<string, boolean>>({});

  // Thumbnail selection states
  const [editSquareThumbName, setEditSquareThumbName] = useState("No file chosen");
  const [editVerticalThumbName, setEditVerticalThumbName] = useState("No file chosen");
  const [editSquareThumbUrl, setEditSquareThumbUrl] = useState<string | null>(null);
  const [editVerticalThumbUrl, setEditVerticalThumbUrl] = useState<string | null>(null);

  // Series List State
  const [seriesList, setSeriesList] = useState<any[]>([]);

  useEffect(() => {
    if (!isLoading && !isLoggedIn) {
      router.push("/login?redirect=/creator/dashboard");
    }
  }, [isLoading, isLoggedIn, router]);

  useEffect(() => {
    if (searchParams && searchParams.get("upload") === "true") {
      setShowUploadForm(true);
    }
  }, [searchParams]);

  useEffect(() => {
    if (isLoggedIn && user) {
      const key = `sampulkreativ_series_${user.email}`;
      const saved = localStorage.getItem(key);
      if (saved) {
        setSeriesList(JSON.parse(saved));
      } else {
        const initial = [
          { id: "1", name: "Cyberpunk: Neon Dreams", type: "Comic", chapters: 42, views: 1250000, coins: 1240, status: "Published" },
          { id: "2", name: "Under the Purple Neon Sky", type: "Novel", chapters: 15, views: 340000, coins: 450, status: "Published" },
          { id: "3", name: "Chrome Hearts (Short Series)", type: "Video", chapters: 30, views: 890000, coins: 890, status: "Draft" },
        ];
        localStorage.setItem(key, JSON.stringify(initial));
        setSeriesList(initial);
      }

      // Load episodes
      const epKey = `sampulkreativ_episodes_${user.email}`;
      const savedEps = localStorage.getItem(epKey);
      if (savedEps) {
        setEpisodesMap(JSON.parse(savedEps));
      } else {
        const initialEps = {
          "1": [
            { id: "e1", title: "Dawn of Darkness", date: "07/10/2026", views: 450000, status: "Published" },
            { id: "e2", title: "Cybernetic Dreams", date: "07/15/2026", views: 800000, status: "Published" }
          ],
          "2": [
            { id: "e3", title: "Under the Purple Sky", date: "07/12/2026", views: 340000, status: "Published" }
          ],
          "3": [
            { id: "e4", title: "Chrome Hearts Pilot", date: "07/17/2026", views: 890000, status: "Draft" }
          ]
        };
        localStorage.setItem(epKey, JSON.stringify(initialEps));
        setEpisodesMap(initialEps);
      }
    }
  }, [isLoggedIn, user]);

  if (isLoading) {
    return (
      <div style={{ padding: "120px 0", textAlign: "center", color: "var(--text-secondary)" }}>
        <p>Memuat dasbor...</p>
      </div>
    );
  }

  if (!isLoggedIn) {
    return (
      <div style={{ padding: "120px 0", textAlign: "center", color: "var(--text-secondary)" }}>
        <p>Mengalihkan ke halaman masuk...</p>
      </div>
    );
  }

  const penName = user?.name || "Yusarius";
  const bankInfo = user?.email 
    ? `Bank Transfer - ${user.name}`
    : "Bank Mandiri - ****9082";

  const handleUploadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreed) {
      alert("Anda harus menyetujui Ketentuan Penggunaan dan Kebijakan Privasi CANVAS!");
      return;
    }
    
    const newId = Date.now().toString();
    const newSeries = {
      id: newId,
      name: seriesTitle,
      type: seriesType,
      chapters: 0,
      views: 0,
      coins: 0,
      status: "Draft",
    };
    
    const updatedList = [newSeries, ...seriesList];
    setSeriesList(updatedList);
    if (user) {
      localStorage.setItem(`sampulkreativ_series_${user.email}`, JSON.stringify(updatedList));
    }
    
    // Reset form states
    setSeriesTitle("");
    setSummary("");
    setCategory("SUPERHERO");
    setSeriesType("Comic");
    setSquareThumbName("No file chosen");
    setVerticalThumbName("No file chosen");
    setAgreed(false);
    setShowUploadForm(false);
  };

  const handleAddEpisodeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEpisodeTitle.trim() || !selectedSeries || !user) return;
    
    const epKey = `sampulkreativ_episodes_${user.email}`;
    const newEp = {
      id: Date.now().toString(),
      title: newEpisodeTitle,
      date: new Date().toLocaleDateString("en-US"),
      views: 0,
      status: "Published"
    };

    const currentEps = episodesMap[selectedSeries.id] || [];
    const updatedEps = [...currentEps, newEp];
    const updatedMap = {
      ...episodesMap,
      [selectedSeries.id]: updatedEps
    };

    setEpisodesMap(updatedMap);
    localStorage.setItem(epKey, JSON.stringify(updatedMap));

    // Also update chapter counts in seriesList!
    const updatedSeriesList = seriesList.map(s => {
      if (s.id === selectedSeries.id) {
        return {
          ...s,
          chapters: updatedEps.length
        };
      }
      return s;
    });
    setSeriesList(updatedSeriesList);
    localStorage.setItem(`sampulkreativ_series_${user.email}`, JSON.stringify(updatedSeriesList));

    // Reset forms
    setNewEpisodeTitle("");
    setNewEpisodeFileName("No file chosen");
    setShowAddEpisodeForm(false);
  };

  return (
    <div className="container" style={{ paddingTop: "var(--space-2xl)", paddingBottom: "var(--space-4xl)" }}>
      <div className={styles.dashboard}>
        {/* Header */}
        <div className={styles.header}>
          <div>
            <h1 className={styles.title}>
              {showUploadForm ? "Buat Serial Baru" : "Creator Dashboard"}
            </h1>
            <p className={styles.subtitle}>
              {showUploadForm 
                ? "Isi detail di bawah untuk mendaftarkan serial baru Anda."
                : `Welcome back, ${penName}! Manage your content and payouts here.`}
            </p>
          </div>
          <div className={styles.headerButtons}>
            {!showUploadForm && activeMenu === "series" && (
              <button className="btn btn-primary" style={{ marginRight: "8px" }} onClick={() => setShowUploadForm(true)}>
                Upload New Series
              </button>
            )}
            <button
              className="btn btn-outline"
              onClick={() => {
                logout();
                router.push("/");
              }}
            >
              Log Out
            </button>
          </div>
        </div>

        {/* Creator Navigation Tabs */}
        {!showUploadForm && !selectedSeries && (
          <div className={styles.creatorNav}>
            <button 
              type="button"
              className={`${styles.navBtn} ${activeMenu === "series" ? styles.navBtnActive : ""}`} 
              onClick={() => setActiveMenu("series")}
            >
              Series
            </button>
            <button 
              type="button"
              className={`${styles.navBtn} ${activeMenu === "analisis" ? styles.navBtnActive : ""}`} 
              onClick={() => setActiveMenu("analisis")}
            >
              Analisis
            </button>
            <button 
              type="button"
              className={`${styles.navBtn} ${activeMenu === "komentar" ? styles.navBtnActive : ""}`} 
              onClick={() => setActiveMenu("komentar")}
            >
              Komentar
            </button>
          </div>
        )}

        {selectedSeries ? (
          <div>
            <div className={styles.hubHeader} style={{ fontSize: "12px", color: "var(--text-tertiary)", display: "flex", alignItems: "center", gap: "4px" }}>
              <button 
                type="button" 
                className={styles.backBtn}
                onClick={() => {
                  setSelectedSeries(null);
                  setManageView("hub");
                }}
                style={{ fontSize: "12px" }}
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" style={{ marginRight: "4px" }}>
                  <polyline points="15 18 9 12 15 6" />
                </svg>
                Serial
              </button>
              <span>/ Kelola Serial</span>
            </div>
            <h2 style={{ fontSize: "20px", fontWeight: "800", color: "var(--text-primary)", margin: "16px 0", textAlign: "left" }}>
              {manageView === "edit" ? "Edit Serial" : "Kelola Episode"}
            </h2>

            <div className={styles.seriesHubCard}>
              <div className={styles.hubVisual}>
                <div className={styles.hubThumb}>
                  <span className={styles.hubThumbTag}>Ongoing</span>
                  {selectedSeries.name[0]?.toUpperCase()}
                </div>
                <div className={styles.hubDetails}>
                  <div className={styles.hubTitle}>{selectedSeries.name}</div>
                  <div className={styles.hubMeta}>
                    {(episodesMap[selectedSeries.id] || []).filter((e: any) => e.status === "Published").length} Published Episodes · Updated 07/17/2026
                  </div>
                  <div className={styles.hubLang}>Indonesian</div>
                  <div className={styles.hubTags}>
                    <span className={styles.hubTag}>#{selectedSeries.type.toUpperCase()}</span>
                    <span className={styles.hubTag}>#Original</span>
                  </div>
                </div>
              </div>
              <div className={styles.hubActions}>
                <button 
                  type="button" 
                  className={`${styles.hubActionBtn} ${manageView === "edit" ? "btn-primary" : styles.btnGrey}`}
                  onClick={() => setManageView("edit")}
                >
                  Manage Series
                </button>
                <button 
                  type="button" 
                  className={`${styles.hubActionBtn} ${manageView === "episode" ? "btn-primary" : styles.btnGrey}`}
                  onClick={() => setManageView("episode")}
                >
                  Manage Episode
                </button>
              </div>
            </div>

            {/* Sub views */}
            {manageView === "hub" && (
              <div style={{ textAlign: "center", padding: "48px 0", color: "var(--text-secondary)", background: "var(--bg-card)", border: "1px solid var(--border-primary)", borderRadius: "var(--radius-xl)" }}>
                <p style={{ fontSize: "14px", fontWeight: "600" }}>Series Hub - {selectedSeries.name}</p>
                <p style={{ fontSize: "12px", color: "var(--text-tertiary)", marginTop: "8px" }}>Pilih opsi "Manage Series" atau "Manage Episode" di atas untuk mengelola serial ini.</p>
              </div>
            )}

            {manageView === "edit" && (
              <form 
                onSubmit={(e) => {
                  e.preventDefault();
                  // Save updated series name
                  const updated = seriesList.map(s => s.id === selectedSeries.id ? { ...s, name: selectedSeries.name } : s);
                  setSeriesList(updated);
                  if (user) {
                    localStorage.setItem(`sampulkreativ_series_${user.email}`, JSON.stringify(updated));
                  }
                  alert("Perubahan serial berhasil disimpan!");
                  setManageView("hub");
                }} 
                style={{ display: "flex", flexDirection: "column", gap: "var(--space-md)" }}
              >
                {/* Card 1: General Info */}
                <div className={styles.formCard}>
                  <div className={styles.formGrid}>
                    <div className={styles.formGroup}>
                      <label className={styles.formLabel}>Status Penerbitan</label>
                      <select 
                        className={styles.categorySelect} 
                        value={editPublishStatus} 
                        onChange={(e) => setEditPublishStatus(e.target.value)}
                      >
                        <option value="Sedang Berlangsung">Sedang Berlangsung</option>
                        <option value="Tamat">Tamat</option>
                        <option value="Hiatus">Hiatus</option>
                      </select>
                    </div>

                    <div className={styles.formGroup}>
                      <label className={styles.formLabel}>Bahasa Sumber</label>
                      <select 
                        className={styles.categorySelect} 
                        value={editSourceLang} 
                        onChange={(e) => setEditSourceLang(e.target.value)}
                      >
                        <option value="Bahasa Indonesia">Bahasa Indonesia</option>
                        <option value="English">English</option>
                      </select>
                    </div>

                    <div className={styles.formGroup}>
                      <label className={styles.formLabel}>Judul Serial</label>
                      <input
                        type="text"
                        className="form-input"
                        value={selectedSeries.name}
                        onChange={(e) => setSelectedSeries({ ...selectedSeries, name: e.target.value.slice(0, 50) })}
                        required
                      />
                      <div className={styles.counterLabel}>
                        {selectedSeries.name.length} / 50 karakter dimasukkan
                      </div>
                    </div>

                    <div className={styles.formGroup}>
                      <label className={styles.formLabel}>Ringkasan</label>
                      <textarea
                        className="form-textarea"
                        rows={6}
                        value={editSummary}
                        onChange={(e) => setEditSummary(e.target.value.slice(0, 500))}
                        required
                        placeholder="Masukkan Ringkasan Serial..."
                      />
                      <div className={styles.counterLabel}>
                        {editSummary.length} / 500 karakter dimasukkan
                      </div>
                    </div>

                    <div className={styles.formGroup}>
                      <label className={styles.formLabel}>Kategori</label>
                      <div className={styles.categoryGrid}>
                        <select 
                          className={styles.categorySelect} 
                          value={editCategory1} 
                          onChange={(e) => setEditCategory1(e.target.value)}
                        >
                          <option value="HOROR">HOROR</option>
                          <option value="THRILLER">THRILLER</option>
                          <option value="SUPERHERO">SUPERHERO</option>
                          <option value="AKSI">AKSI</option>
                          <option value="ROMANTIS">ROMANTIS</option>
                          <option value="KOMEDI">KOMEDI</option>
                          <option value="FANTASI">FANTASI</option>
                          <option value="DRAMA">DRAMA</option>
                        </select>
                        <select 
                          className={styles.categorySelect} 
                          value={editCategory2} 
                          onChange={(e) => setEditCategory2(e.target.value)}
                        >
                          <option value="THRILLER">THRILLER</option>
                          <option value="HOROR">HOROR</option>
                          <option value="SUPERHERO">SUPERHERO</option>
                          <option value="AKSI">AKSI</option>
                          <option value="ROMANTIS">ROMANTIS</option>
                          <option value="KOMEDI">KOMEDI</option>
                          <option value="FANTASI">FANTASI</option>
                          <option value="DRAMA">DRAMA</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Card 2: Thumbnail */}
                <div className={styles.formCard}>
                  <div className={styles.formCardTitle}>Thumbnail Information</div>
                  <div className={styles.thumbnailContainer}>
                    {/* Square */}
                    <div className={styles.thumbnailBox}>
                      <span className={styles.thumbnailLabel}>Persegi</span>
                      <span className={styles.thumbnailDimension}>1080 x 1080</span>
                      {/* Image preview matching user's screenshot */}
                      <div style={{ width: "100px", height: "100px", background: "var(--bg-secondary)", borderRadius: "var(--radius-md)", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden", margin: "8px 0" }}>
                        {editSquareThumbUrl ? (
                          <img src={editSquareThumbUrl} alt="Square Preview" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                        ) : (
                          <span style={{ fontSize: "24px", fontWeight: "bold" }}>{selectedSeries.name[0]?.toUpperCase()}</span>
                        )}
                      </div>
                      <label className={styles.customFileBtn}>
                        Pilih File
                        <input 
                          type="file" 
                          accept=".jpg,.jpeg,.png" 
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              setEditSquareThumbName(file.name);
                              setEditSquareThumbUrl(URL.createObjectURL(file));
                            }
                          }}
                        />
                      </label>
                      <span className={styles.fileName}>{editSquareThumbName}</span>
                    </div>

                    {/* Vertical */}
                    <div className={styles.thumbnailBox}>
                      <span className={styles.thumbnailLabel}>Vertikal</span>
                      <span className={styles.thumbnailDimension}>1080 x 1920</span>
                      {/* Vertical thumbnail preview with edit trigger overlay */}
                      <div style={{ width: "80px", height: "120px", background: "var(--bg-secondary)", borderRadius: "var(--radius-md)", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden", margin: "8px 0", position: "relative" }}>
                        {editVerticalThumbUrl ? (
                          <img src={editVerticalThumbUrl} alt="Vertical Preview" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                        ) : (
                          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                            <span style={{ fontSize: "9px", color: "var(--text-tertiary)", marginBottom: "4px" }}>1080 x 1920</span>
                            <span style={{ fontSize: "9px", color: "var(--accent-purple-light)", border: "1px solid var(--accent-purple)", padding: "2px 6px", borderRadius: "3px" }}>Pilih File</span>
                          </div>
                        )}
                        {/* Hidden input overlay for direct click-to-upload */}
                        <input 
                          type="file" 
                          accept=".jpg,.jpeg,.png" 
                          style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", opacity: 0, cursor: "pointer" }}
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              setEditVerticalThumbName(file.name);
                              setEditVerticalThumbUrl(URL.createObjectURL(file));
                            }
                          }}
                        />
                      </div>
                      <span className={styles.fileName}>{editVerticalThumbName}</span>
                    </div>
                  </div>
                  <div className={styles.imageRequirements}>
                    Ukuran gambar harus 1080x1080, 1080x1920. Besar file gambar harus kurang dari 500KB.<br />
                    Hanya format JPG, JPEG, dan PNG yang diperbolehkan.
                  </div>
                </div>

                {/* Card 4: Persetujuan */}
                <div className={styles.formCard}>
                  <div className={styles.formCardTitle}>Persetujuan</div>
                  <div className={styles.ratingResultCard}>
                    <div className={styles.ratingCheckIcon}>✓</div>
                    <span>Rating Konten serialmu adalah Remaja (13+).</span>
                  </div>
                </div>

                <div className={styles.actionRow}>
                  <button type="button" className="btn btn-outline" onClick={() => setManageView("hub")}>Batal</button>
                  <button type="submit" className="btn btn-primary" style={{ boxShadow: "var(--shadow-glow-purple)" }}>Simpan Perubahan</button>
                </div>
              </form>
            )}

            {manageView === "episode" && (
              <div className={styles.episodeCard}>
                <div className={styles.episodeHeader}>
                  <h3 style={{ fontSize: "16px", fontWeight: "800", color: "var(--text-primary)" }}>Daftar Episode</h3>
                  {!showAddEpisodeForm && (
                    <button type="button" className="btn btn-primary btn-sm" onClick={() => setShowAddEpisodeForm(true)}>
                      + Upload New Episode
                    </button>
                  )}
                </div>

                {showAddEpisodeForm ? (
                  <form onSubmit={handleAddEpisodeSubmit} className={styles.formGrid} style={{ border: "1px solid var(--border-primary)", padding: "var(--space-md)", borderRadius: "var(--radius-lg)", marginBottom: "var(--space-md)" }}>
                    <div className={styles.formGroup}>
                      <label className={styles.formLabel}>Judul Episode</label>
                      <input 
                        type="text" 
                        className="form-input" 
                        placeholder="Masukkan Judul Episode" 
                        value={newEpisodeTitle}
                        onChange={(e) => setNewEpisodeTitle(e.target.value)}
                        required
                      />
                    </div>
                    <div className={styles.formGroup}>
                      <label className={styles.formLabel}>File Episode (PDF/ZIP/MP4)</label>
                      <label className={styles.customFileBtn} style={{ alignSelf: "flex-start" }}>
                        Pilih File
                        <input 
                          type="file" 
                          onChange={(e) => setNewEpisodeFileName(e.target.files?.[0]?.name || "No file chosen")}
                        />
                      </label>
                      <span className={styles.fileName}>{newEpisodeFileName}</span>
                    </div>
                    <div className={styles.actionRow}>
                      <button type="button" className="btn btn-outline btn-sm" onClick={() => setShowAddEpisodeForm(false)}>Batal</button>
                      <button type="submit" className="btn btn-primary btn-sm">Simpan Episode</button>
                    </div>
                  </form>
                ) : (
                  <div className={styles.episodeList}>
                    {(episodesMap[selectedSeries.id] || []).length > 0 ? (
                      (episodesMap[selectedSeries.id] || []).map((ep: any) => (
                        <div key={ep.id} className={styles.episodeItem}>
                          <div className={styles.episodeInfo}>
                            <span className={styles.episodeTitle}>{ep.title}</span>
                            <span className={styles.episodeMeta}>Rilis: {ep.date} · {ep.views.toLocaleString()} Views</span>
                          </div>
                          <div>
                            <span className={`status-chip ${ep.status === "Published" ? "status-chip-free" : "status-chip-ad"}`} style={ep.status === "Draft" ? { background: "rgba(245,158,11,0.15)", color: "var(--accent-gold)" } : {}}>
                              {ep.status}
                            </span>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p style={{ color: "var(--text-tertiary)", textAlign: "center", padding: "24px 0", fontSize: "12px" }}>Belum ada episode diunggah.</p>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        ) : showUploadForm ? (
          <div className={styles.uploadFormCard}>
            <form onSubmit={handleUploadSubmit} className={styles.formGrid}>
              
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Bahasa Sumber</label>
                <select className={styles.categorySelect} value={sourceLang} onChange={(e) => setSourceLang(e.target.value)}>
                  <option value="Bahasa Indonesia">Bahasa Indonesia</option>
                  <option value="English">English</option>
                </select>
              </div>

              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Jenis Serial</label>
                <select className={styles.categorySelect} value={seriesType} onChange={(e) => setSeriesType(e.target.value)}>
                  <option value="Comic">Komik (Webcomic)</option>
                  <option value="Novel">Novel (Web Novel)</option>
                  <option value="Video">Video (Dynamic Media)</option>
                </select>
              </div>

              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Judul Serial</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="Masukkan Judul Serial"
                  value={seriesTitle}
                  onChange={(e) => setSeriesTitle(e.target.value.slice(0, 50))}
                  required
                />
                <div className={styles.counterLabel}>
                  {seriesTitle.length} / 50 karakter dimasukkan
                </div>
              </div>

              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Ringkasan</label>
                <textarea
                  className="form-input"
                  style={{ minHeight: "100px", resize: "vertical" }}
                  placeholder="Masukkan Ringkasan Serial"
                  value={summary}
                  onChange={(e) => setSummary(e.target.value.slice(0, 500))}
                  required
                />
                <div className={styles.counterLabel}>
                  {summary.length} / 500 karakter dimasukkan
                </div>
              </div>

              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Kategori</label>
                <select className={styles.categorySelect} value={category} onChange={(e) => setCategory(e.target.value)}>
                  <option value="SUPERHERO">SUPERHERO</option>
                  <option value="AKSI">AKSI</option>
                  <option value="ROMANTIS">ROMANTIS</option>
                  <option value="KOMEDI">KOMEDI</option>
                  <option value="FANTASI">FANTASI</option>
                  <option value="DRAMA">DRAMA</option>
                  <option value="HOROR">HOROR</option>
                  <option value="PILIH_OPSI">Pilih (Opsi)</option>
                </select>
              </div>

              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Thumbnail Information</label>
                <div className={styles.thumbnailContainer}>
                  {/* Square */}
                  <div className={styles.thumbnailBox}>
                    <span className={styles.thumbnailLabel}>Persegi</span>
                    <span className={styles.thumbnailDimension}>1080 x 1080</span>
                    <label className={styles.customFileBtn}>
                      Pilih File
                      <input
                        type="file"
                        accept=".jpg,.jpeg,.png"
                        onChange={(e) => setSquareThumbName(e.target.files?.[0]?.name || "No file chosen")}
                      />
                    </label>
                    <span className={styles.fileName}>{squareThumbName}</span>
                  </div>

                  {/* Vertical */}
                  <div className={styles.thumbnailBox}>
                    <span className={styles.thumbnailLabel}>Vertikal</span>
                    <span className={styles.thumbnailDimension}>1080 x 1920</span>
                    <label className={styles.customFileBtn}>
                      Pilih File
                      <input
                        type="file"
                        accept=".jpg,.jpeg,.png"
                        onChange={(e) => setVerticalThumbName(e.target.files?.[0]?.name || "No file chosen")}
                      />
                    </label>
                    <span className={styles.fileName}>{verticalThumbName}</span>
                  </div>
                </div>
                <div className={styles.imageRequirements}>
                  Ukuran gambar harus 1080x1080, 1080x1920. Besar file gambar harus kurang dari 500KB.<br />
                  Hanya format JPG, JPEG, dan PNG yang diperbolehkan.
                </div>
              </div>

              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Persetujuan</label>
                <div className={styles.termsCard}>
                  <div className={styles.termsHeader}>Silakan lakukan penilaian mandiri untuk serialmu.</div>
                  <div className={styles.checkboxGroup}>
                    <input
                      type="checkbox"
                      id="terms-agree-upload"
                      checked={agreed}
                      onChange={(e) => setAgreed(e.target.checked)}
                      required
                    />
                    <label htmlFor="terms-agree-upload" className={styles.termsText}>
                      Saya menyatakan bahwa saya berusia minimal 13 tahun dan setuju dengan Ketentuan Penggunaan, Ketentuan Penggunaan CANVAS dan Kebijakan Privasi kami.
                    </label>
                  </div>
                </div>
              </div>

              <div className={styles.actionRow}>
                <button type="button" className="btn btn-outline" onClick={() => setShowUploadForm(false)}>
                  Batal
                </button>
                <button type="submit" className="btn btn-primary" style={{ boxShadow: "var(--shadow-glow-purple)" }}>
                  Buat Serial Baru
                </button>
              </div>

            </form>
          </div>
        ) : activeMenu === "series" ? (
          /* List of Series Cards matching screenshot */
          <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-md)", marginTop: 0 }}>
            {seriesList.length > 0 ? (
              seriesList.map((s) => (
                <div key={s.id} className={styles.seriesHubCard} style={{ margin: 0 }}>
                  <div className={styles.hubVisual}>
                    <div className={styles.hubThumb}>
                      <span className={styles.hubThumbTag}>
                        {s.status === "Draft" ? "Draft" : "Ongoing"}
                      </span>
                      {s.name[0]?.toUpperCase()}
                    </div>
                    <div className={styles.hubDetails}>
                      <div className={styles.hubTitle}>{s.name}</div>
                      <div className={styles.hubMeta}>
                        {(episodesMap[s.id] || []).filter((e: any) => e.status === "Published").length} Published Episodes · Updated 07/17/2026
                      </div>
                      <div className={styles.hubLang}>Indonesian</div>
                      <div className={styles.hubTags}>
                        <span className={styles.hubTag}>#{s.type.toUpperCase()}</span>
                        <span className={styles.hubTag}>#Original</span>
                      </div>
                    </div>
                  </div>
                  <div className={styles.hubActions}>
                    <button 
                      type="button" 
                      className={`${styles.hubActionBtn} ${styles.btnGrey}`}
                      onClick={() => {
                        setSelectedSeries(s);
                        setManageView("edit");
                        setEditPublishStatus("Sedang Berlangsung");
                        setEditSourceLang("Bahasa Indonesia");
                        setEditSummary(s.summary || "Ketika murid SMA di sebuah sekolah terpencil bernama Anita mendadak meninggal misterius, Askara dan teman-temannya mendapati serangkaian kejadian aneh mulai meghantui mereka. Mulai dari penampakan, mimpi-mimpi ganjil, hingga munculnya bunga mawar putih di jendela Askara. Saat sahabat mereka, Ifal, juga jatuh sakit dengan gejala serupa, mereka mencium kedahiran sosok misterius yang menghubungkan semua kejadian itu. Dihantui rasa takut, mereka menyelidiki kebenaran di balik kematian Anita.");
                        setEditCategory1(s.type === "Comic" ? "HOROR" : "SUPERHERO");
                        setEditCategory2(s.type === "Comic" ? "THRILLER" : "AKSI");
                        setEditSquareThumbName("No file chosen");
                        setEditVerticalThumbName("No file chosen");
                        setEditSquareThumbUrl(null);
                        setEditVerticalThumbUrl(null);
                      }}
                    >
                      Manage Series
                    </button>
                    <button 
                      type="button" 
                      className={`${styles.hubActionBtn} ${styles.btnGrey}`}
                      onClick={() => {
                        setSelectedSeries(s);
                        setManageView("episode");
                      }}
                    >
                      Manage Episode
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div style={{ textAlign: "center", padding: "48px 0", color: "var(--text-secondary)", background: "var(--bg-card)", border: "1px solid var(--border-primary)", borderRadius: "var(--radius-xl)" }}>
                <p>Anda belum membuat serial apapun.</p>
              </div>
            )}
          </div>
        ) : activeMenu === "analisis" ? (
          <>
            {/* Revenue Summary Card */}
            <div className={styles.revenueCard}>
              <div className={styles.revenueMain}>
                <div className={styles.revenueHeader}>
                  <span className={styles.revenueLabel}>ESTIMATED EARNINGS (50% SPLIT)</span>
                  <span className={styles.splitIndicator}>50/50 Revenue Active</span>
                </div>
                <div className={styles.revenueValue}>
                  <span className={styles.currencySymbol}>Rp</span>
                  <span className={styles.amount}>4.850.000</span>
                </div>
                <div className={styles.revenueMeta}>
                  <span>Withdrawable: <strong>Rp 3.120.000</strong></span>
                  <span>·</span>
                  <span>Next payout: 1st of next month</span>
                </div>
              </div>
              <div className={styles.revenueActions}>
                <button className="btn btn-gold btn-lg">Withdraw Funds</button>
                <div className={styles.bankInfo}>
                  <span className={styles.bankLabel}>Payout Account</span>
                  <span className={styles.bankName}>{bankInfo}</span>
                </div>
              </div>
            </div>

            {/* Grid Layout */}
            <div className={styles.mainGrid}>
              {/* Left: Reader Growth Chart */}
              <div className={styles.chartSection}>
                <div className={styles.sectionHeader}>
                  <h2>Reader Growth (Last 30 Days)</h2>
                  <div className={styles.chartHeaderActions}>
                    <span className={styles.chartTotal}>+12,450 Views</span>
                    <select className="form-input" style={{ width: "auto", padding: "4px 8px" }}>
                      <option>Weekly</option>
                      <option>Monthly</option>
                    </select>
                  </div>
                </div>
                <div className={styles.chartContainer}>
                  <div className={styles.chartBars}>
                    {[12, 18, 15, 22, 35, 42, 38, 55, 62, 50, 75, 90, 80, 95, 110, 105, 120, 140, 130, 150].map((h, i) => (
                      <div
                        key={i}
                        className={styles.chartBar}
                        style={{ height: `${(h / 150) * 100}%` }}
                        title={`Day ${i + 1}: ${h} views`}
                      ></div>
                    ))}
                  </div>
                  <div className={styles.chartLabels}>
                    <span>Day 1</span>
                    <span>Day 15</span>
                    <span>Day 30</span>
                  </div>
                </div>
              </div>

              {/* Right: Creator Stats List */}
              <div className={styles.statsCard}>
                <h2 className={styles.sectionTitle}>Performance Metrics</h2>
                <div className={styles.metricList}>
                  <div className={styles.metricItem}>
                    <span className={styles.metricVal}>125K</span>
                    <span className={styles.metricLab}>Monthly Views</span>
                  </div>
                  <div className={styles.metricItem}>
                    <span className={styles.metricVal}>4.2K</span>
                    <span className={styles.metricLab}>Unlocked Chapters</span>
                  </div>
                  <div className={styles.metricItem}>
                    <span className={styles.metricVal}>Rp 1.8M</span>
                    <span className={styles.metricLab}>Ad Payouts</span>
                  </div>
                  <div className={styles.metricItem}>
                    <span className={styles.metricVal}>Rp 3.0M</span>
                    <span className={styles.metricLab}>Coin Payouts</span>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          /* activeMenu === "komentar" */
          <div className={styles.commentsSection}>
            <h2 className={styles.sectionTitle} style={{ marginBottom: "var(--space-md)", fontSize: "var(--text-lg)" }}>Komentar Pembaca</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-md)" }}>
              {commentsList.map((c) => (
                <div key={c.id} className={styles.commentItem}>
                  <div className={styles.commentHeader}>
                    <div className={styles.commentUser}>
                      <div className={styles.commentAvatar}>
                        {c.user[0].toUpperCase()}
                      </div>
                      <div>
                        <span className={styles.commentName}>{c.user}</span>
                        <span className={styles.commentMeta} style={{ marginLeft: "8px" }}>{c.time}</span>
                      </div>
                    </div>
                    <span className={styles.commentSeriesName}>{c.series}</span>
                  </div>
                  <div className={styles.commentContent}>
                    {c.comment}
                  </div>
                  <div className={styles.commentActions}>
                    {c.reply ? (
                      <span style={{ fontSize: "11px", color: "var(--text-tertiary)", fontWeight: "600" }}>Sudah Dibalas</span>
                    ) : (
                      <button 
                        type="button" 
                        className={styles.commentActionBtn}
                        onClick={() => setActiveReplyId(activeReplyId === c.id ? null : c.id)}
                      >
                        Balas
                      </button>
                    )}
                    <button type="button" className={styles.commentActionBtn}>Hapus</button>
                    <button type="button" className={styles.commentActionBtn}>Laporkan</button>
                  </div>

                  {activeReplyId === c.id && (
                    <div className={styles.replyBox}>
                      <input 
                        type="text" 
                        className={styles.replyInput}
                        placeholder="Tulis balasan sebagai kreator..."
                        value={replyTextVal}
                        onChange={(e) => setReplyTextVal(e.target.value)}
                        autoFocus
                      />
                      <div className={styles.replyActions}>
                        <button type="button" className="btn btn-outline btn-sm" onClick={() => setActiveReplyId(null)}>Batal</button>
                        <button type="button" className="btn btn-primary btn-sm" onClick={() => handleReplySubmit(c.id)}>Kirim Balasan</button>
                      </div>
                    </div>
                  )}

                  {c.reply && (
                    <div className={styles.creatorReply}>
                      <div className={styles.replyHeader}>
                        <span>Balasan Anda (Kreator)</span>
                        <span style={{ color: "var(--text-tertiary)" }}>Baru saja</span>
                      </div>
                      <div className={styles.replyText}>
                        {c.reply}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      
      {/* Floating Upload button at bottom-right */}
      <button className={styles.floatingUploadBtn} title="Upload New Series" onClick={() => setShowUploadForm(true)}>
        +
      </button>
    </div>
  );
}

export default function CreatorDashboardPage() {
  return (
    <Suspense fallback={
      <div style={{ padding: "120px 0", textAlign: "center", color: "var(--text-secondary)" }}>
        <p>Memuat dasbor...</p>
      </div>
    }>
      <CreatorDashboardContent />
    </Suspense>
  );
}
