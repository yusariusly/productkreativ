"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { comicSeries, novelSeries } from "@/data/dummy";
import { useLanguage } from "@/context/LanguageContext";
import { useAuth } from "@/context/AuthContext";
import styles from "./profile.module.css";

export default function ProfilePage() {
  const { language, setLanguage, t } = useLanguage();
  const router = useRouter();
  const { isLoggedIn, coins, bookmarks, history: readHistory, logout, user } = useAuth();
  
  const [displayName, setDisplayName] = useState("Yusarius");
  const [email, setEmail] = useState("yusarius@sampulkreativ.com");
  const [password, setPassword] = useState("••••••••");

  useEffect(() => {
    if (user) {
      setDisplayName(user.name);
      setEmail(user.email);
      setNewName(user.name);
      setNewEmail(user.email);
    }
  }, [user]);

  const [isEditingName, setIsEditingName] = useState(false);
  const [newName, setNewName] = useState(displayName);

  const [isEditingEmail, setIsEditingEmail] = useState(false);
  const [newEmail, setNewEmail] = useState(email);

  const [isEditingPassword, setIsEditingPassword] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [activeTab, setActiveTab] = useState<"history" | "favorites">("history");

  if (!isLoggedIn) {
    return (
      <div className="container" style={{ paddingTop: "var(--space-2xl)", paddingBottom: "var(--space-4xl)" }}>
        <div style={{ textAlign: "center", padding: "100px 20px", border: "1px dashed var(--border-primary)", borderRadius: "var(--radius-xl)", background: "rgba(255,255,255,0.01)" }}>
          <h2 style={{ fontSize: "var(--text-2xl)", fontWeight: 800, color: "var(--text-primary)", marginBottom: "var(--space-sm)" }}>Akses Terbatas</h2>
          <p style={{ color: "var(--text-secondary)", fontSize: "var(--text-sm)", marginBottom: "var(--space-xl)", maxWidth: "480px", margin: "0 auto var(--space-xl)" }}>
            Silakan masuk (login) terlebih dahulu untuk melihat dan mengelola profil akun SampulKreativ Anda.
          </p>
          <Link href="/login?redirect=/profile" className="btn btn-gold btn-lg">
            Masuk Sekarang
          </Link>
        </div>
      </div>
    );
  }

  const balance = coins;

  const continueReading = readHistory.map(h => {
    const item = h.type === "comic" 
      ? (comicSeries.find(s => s.id === h.id) || comicSeries[0])
      : (novelSeries.find(s => s.id === h.id) || novelSeries[0]);
    return {
      ...item,
      lastChapter: h.lastChapter,
      progress: h.progress,
      type: h.type
    };
  });

  const favorites = [
    ...comicSeries.filter((s) => bookmarks.includes(s.id)),
    ...novelSeries.filter((s) => bookmarks.includes(s.id)),
  ];

  const handleSaveName = (e: React.FormEvent) => {
    e.preventDefault();
    setDisplayName(newName);
    setIsEditingName(false);
  };

  const handleSaveEmail = (e: React.FormEvent) => {
    e.preventDefault();
    setEmail(newEmail);
    setIsEditingEmail(false);
  };

  const handleSavePassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      alert("Konfirmasi kata sandi baru tidak cocok!");
      return;
    }
    setPassword("••••••••");
    setOldPassword("");
    setNewPassword("");
    setConfirmPassword("");
    setIsEditingPassword(false);
    alert("Kata sandi berhasil diubah!");
  };

  return (
    <div className="container" style={{ paddingTop: "var(--space-2xl)", paddingBottom: "var(--space-4xl)", display: "flex", flexDirection: "column", gap: "var(--space-2xl)" }}>
      
      {/* ===== HERO PROFILE HEADER CARD ===== */}
      <section className={styles.profileCard}>
        <div className={styles.avatarSection}>
          <div className={styles.avatarLarge}>
            <span>{displayName[0].toUpperCase()}</span>
          </div>
          <button className={styles.uploadBtn}>{t("changePhoto")}</button>
        </div>

        <div className={styles.infoSection}>
          <div>
            <h1 className={styles.displayName} style={{ marginBottom: "6px" }}>{displayName}</h1>
            <p className={styles.emailText} style={{ marginBottom: "0px" }}>{email}</p>
          </div>

          <div className={styles.coinSummary}>
            <div className={styles.coinInfo}>
              <span className={styles.coinLabel}>{t("walletBalance")}</span>
              <div className={styles.coinAmount}>
                <span className={styles.coinIcon}>$</span>
                <span className={styles.coinValue}>{balance.toLocaleString()} Koin</span>
              </div>
            </div>
            <Link href="/wallet" className="btn btn-gold btn-sm">
              {t("topUpCoins")}
            </Link>
          </div>

          <div style={{ alignSelf: "center" }}>
            <button
              onClick={() => { logout(); router.push("/"); }}
              className="btn btn-outline"
              style={{ borderColor: "#ef4444", color: "#ef4444", fontWeight: 700 }}
            >
              Keluar Akun
            </button>
          </div>
        </div>
      </section>

      {/* ===== ACCOUNT SETTINGS ROWS ===== */}
      <section className={styles.settingsCard}>
        <h2 style={{ fontSize: "var(--text-lg)", fontWeight: 700, color: "var(--text-primary)", borderBottom: "1px solid var(--border-primary)", paddingBottom: "var(--space-md)", margin: 0 }}>Pengaturan Akun</h2>
        
        {/* Row Name */}
        <div className={styles.settingsRow}>
          <div className={styles.settingsLabelInfo}>
            <span className={styles.settingsLabel}>Nama Tampilan</span>
            <span className={styles.settingsValue}>{displayName}</span>
          </div>
          <button className={styles.actionBtn} onClick={() => { setNewName(displayName); setIsEditingName(!isEditingName); }}>
            {isEditingName ? "Batal" : "Ubah Nama"}
          </button>
          
          {isEditingName && (
            <form onSubmit={handleSaveName} className={styles.formCollapse}>
              <div className="form-group" style={{ margin: 0 }}>
                <input
                  type="text"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  className="form-input"
                  required
                />
              </div>
              <button type="submit" className="btn btn-primary btn-sm" style={{ width: "fit-content" }}>Simpan Nama</button>
            </form>
          )}
        </div>

        {/* Row Email */}
        <div className={styles.settingsRow}>
          <div className={styles.settingsLabelInfo}>
            <span className={styles.settingsLabel}>Alamat Email</span>
            <span className={styles.settingsValue}>{email}</span>
          </div>
          <button className={styles.actionBtn} onClick={() => { setNewEmail(email); setIsEditingEmail(!isEditingEmail); }}>
            {isEditingEmail ? "Batal" : "Ubah Email"}
          </button>

          {isEditingEmail && (
            <form onSubmit={handleSaveEmail} className={styles.formCollapse}>
              <div className="form-group" style={{ margin: 0 }}>
                <input
                  type="email"
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  className="form-input"
                  required
                />
              </div>
              <button type="submit" className="btn btn-primary btn-sm" style={{ width: "fit-content" }}>Simpan Email</button>
            </form>
          )}
        </div>

        {/* Row Password */}
        <div className={styles.settingsRow}>
          <div className={styles.settingsLabelInfo}>
            <span className={styles.settingsLabel}>Kata Sandi</span>
            <span className={styles.settingsValue}>••••••••</span>
          </div>
          <button className={styles.actionBtn} onClick={() => { setIsEditingPassword(!isEditingPassword); }}>
            {isEditingPassword ? "Batal" : "Ganti Kata Sandi"}
          </button>

          {isEditingPassword && (
            <form onSubmit={handleSavePassword} className={styles.formCollapse}>
              <div className="form-group" style={{ display: "flex", flexDirection: "column", gap: "10px", margin: 0 }}>
                <input
                  type="password"
                  placeholder="Kata sandi saat ini"
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                  className="form-input"
                  required
                />
                <input
                  type="password"
                  placeholder="Kata sandi baru"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="form-input"
                  required
                />
                <input
                  type="password"
                  placeholder="Konfirmasi kata sandi baru"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="form-input"
                  required
                />
              </div>
              <button type="submit" className="btn btn-primary btn-sm" style={{ width: "fit-content" }}>Perbarui Kata Sandi</button>
            </form>
          )}
        </div>

        {/* Row Language */}
        <div className={styles.settingsRow}>
          <div className={styles.settingsLabelInfo}>
            <span className={styles.settingsLabel}>🌐 Pengaturan Bahasa</span>
            <span className={styles.settingsValue}>{language === "id" ? "Bahasa Indonesia" : "English"}</span>
          </div>
          <div className={styles.langToggleButtons} style={{ margin: 0 }}>
            <button
              className={`${styles.langBtn} ${language === "id" ? styles.langBtnActive : ""}`}
              onClick={() => setLanguage("id")}
            >
              Bahasa Indonesia (Utama)
            </button>
            <button
              className={`${styles.langBtn} ${language === "en" ? styles.langBtnActive : ""}`}
              onClick={() => setLanguage("en")}
            >
              English (Inggris)
            </button>
          </div>
        </div>
      </section>

      {/* ===== USER COLLECTION TABS (HISTORY + FAVS) ===== */}
      <section className={styles.librarySection}>
        <div className={styles.tabsContainer}>
          <button
            className={`${styles.tabBtn} ${activeTab === "history" ? styles.tabBtnActive : ""}`}
            onClick={() => setActiveTab("history")}
          >
            {t("continueReading")} ({continueReading.length})
          </button>
          <button
            className={`${styles.tabBtn} ${activeTab === "favorites" ? styles.tabBtnActive : ""}`}
            onClick={() => setActiveTab("favorites")}
          >
            {t("favorites")} ({favorites.length})
          </button>
        </div>

        {/* Tab Content: History */}
        {activeTab === "history" && (
          <div className={styles.subSection}>
            {continueReading.length === 0 ? (
              <p style={{ color: "var(--text-tertiary)", fontSize: "var(--text-sm)", textAlign: "center", padding: "40px 0" }}>Belum ada riwayat bacaan.</p>
            ) : (
              <div className={styles.continueGrid}>
                {continueReading.map((item) => (
                  <Link
                    key={item.id}
                    href={`/${item.type === "comic" ? "comics" : "novels"}/${item.id}/${item.lastChapter}`}
                    className={styles.continueCard}
                  >
                    <div className={styles.continueCover}>
                      <img src={item.coverUrl} alt={item.title} className={styles.coverImage} />
                      <div className={styles.chapterBadge}>
                        Ch. {item.lastChapter}
                      </div>
                    </div>
                    <div className={styles.continueBody}>
                      <h4>{item.title}</h4>
                      <p className={styles.continueType}>
                        {item.type === "comic" ? "Webcomic" : "Novel"} · {item.genre[0]}
                      </p>
                      <div className={`progress-bar progress-bar-${item.type === "comic" ? "purple" : "gold"}`}>
                        <div className="progress-bar-fill" style={{ width: `${item.progress}%` }}></div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Tab Content: Favorites */}
        {activeTab === "favorites" && (
          <div className={styles.subSection}>
            {favorites.length === 0 ? (
              <p style={{ color: "var(--text-tertiary)", fontSize: "var(--text-sm)", textAlign: "center", padding: "40px 0" }}>Belum ada pustaka favorit.</p>
            ) : (
              <div className={styles.favGrid}>
                {favorites.map((item) => (
                  <Link
                    key={item.id}
                    href={`/${item.type === "comic" ? "comics" : "novels"}/${item.id}`}
                    className={styles.favCard}
                  >
                    <div className={styles.favCover}>
                      <img src={item.coverUrl} alt={item.title} className={styles.coverImage} />
                      <button className={styles.favHeart} onClick={(e) => e.preventDefault()}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                        </svg>
                      </button>
                    </div>
                    <div className={styles.favBody}>
                      <h4>{item.title}</h4>
                      <p>
                        {item.genre[0]}
                        <span style={{ marginLeft: "8px" }}>⭐ {item.rating}</span>
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        )}
      </section>

    </div>
  );
}
