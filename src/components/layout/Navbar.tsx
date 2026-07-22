"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useLanguage } from "@/context/LanguageContext";
import { useAuth } from "@/context/AuthContext";
import ThemeToggle from "./ThemeToggle";
import styles from "./Navbar.module.css";

export default function Navbar() {
  const { t } = useLanguage();
  const router = useRouter();
  const { isLoggedIn, coins, logout, user } = useAuth();
  const pathname = usePathname() || "";
  const isReaderMode = /^\/comics\/[^\/]+\/[^\/]+\/?$/.test(pathname)
    || /^\/novels\/[^\/]+\/[^\/]+\/?$/.test(pathname)
    || /^\/videos\/[^\/]+\/?$/.test(pathname);

  if (isReaderMode) return null;
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // Close dropdown on click outside
  useEffect(() => {
    if (!dropdownOpen) return;
    const handleClose = () => setDropdownOpen(false);
    window.addEventListener("click", handleClose);
    return () => window.removeEventListener("click", handleClose);
  }, [dropdownOpen]);

  const coinBalance = coins;

  return (
    <nav className={styles.navbar} id="main-navbar">
      <div className={styles.navInner}>
        {/* Logo */}
        <Link href="/" className={styles.logo}>
          <div className={styles.logoIcon}>
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
              <defs>
                <linearGradient id="logoGrad" x1="0" y1="0" x2="28" y2="28">
                  <stop offset="0%" stopColor="#7c3aed" />
                  <stop offset="100%" stopColor="#ec4899" />
                </linearGradient>
              </defs>
              <rect width="28" height="28" rx="8" fill="url(#logoGrad)" />
              <path d="M8 9h12v2H8zm0 4h8v2H8zm0 4h10v2H8z" fill="white" opacity="0.9" />
            </svg>
          </div>
          <span className={styles.logoText}>SampulKreativ</span>
        </Link>

        {/* Navigation Links (Desktop) */}
        <div className={`${styles.navLinks} ${mobileMenuOpen ? styles.navLinksOpen : ""}`}>
          <Link href="/" className={styles.navLink}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
              <polyline points="9 22 9 12 15 12 15 22" />
            </svg>
            <span>{t("home")}</span>
          </Link>
          <Link href="/comics" className={styles.navLink}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="3" width="7" height="18" rx="1" />
              <rect x="14" y="3" width="7" height="18" rx="1" />
            </svg>
            <span>{t("comics")}</span>
          </Link>
          <Link href="/novels" className={styles.navLink}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 19.5A2.5 2.5 0 016.5 17H20" />
              <path d="M4 4.5A2.5 2.5 0 016.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15z" />
            </svg>
            <span>{t("novels")}</span>
          </Link>
          <Link href="/videos" className={styles.navLink}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polygon points="5,3 19,12 5,21" />
            </svg>
            <span>{t("videos")}</span>
          </Link>
        </div>

        {/* Search Bar (Desktop) */}
        <div className={`${styles.searchWrapper} ${searchOpen ? styles.searchOpen : ""}`}>
          <div className={styles.searchBar}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8" />
              <path d="M21 21l-4.35-4.35" />
            </svg>
            <input
              type="text"
              placeholder={t("home") === "Beranda" ? "Cari komik, novel, video..." : "Search comics, novels, videos..."}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              id="nav-search-input"
            />
          </div>
        </div>

        {/* Right Actions */}
        <div className={styles.navActions}>
          {/* Search Toggle (Mobile) */}
          <button
            className={styles.iconBtn}
            onClick={() => setSearchOpen(!searchOpen)}
            aria-label="Toggle search"
            id="nav-search-toggle"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8" />
              <path d="M21 21l-4.35-4.35" />
            </svg>
          </button>

          {/* Theme Toggle */}
          <ThemeToggle className={styles.iconBtn} />

          {/* Coin Balance */}
          <Link href="/wallet" className={styles.coinBalance} id="nav-coin-balance">
            <span className={styles.coinIcon}>$</span>
            <span>{coinBalance.toLocaleString()}</span>
          </Link>

          {isLoggedIn ? (
            <>

              {/* Avatar Wrapper with Dropdown */}
              <div className={styles.avatarContainer} onClick={(e) => e.stopPropagation()}>
                <button
                  className={`${styles.avatar} ${styles.avatarBtn}`}
                  id="nav-avatar"
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  aria-label="Toggle profile menu"
                >
                  <div className={styles.avatarPlaceholder}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 12c2.7 0 5-2.3 5-5s-2.3-5-5-5-5 2.3-5 5 2.3 5 5 5zm0 2c-3.3 0-10 1.7-10 5v2h20v-2c0-3.3-6.7-5-10-5z" />
                    </svg>
                  </div>
                </button>

                {dropdownOpen && (
                  <div className={styles.dropdownMenu}>
                    <div className={styles.dropdownHeader}>
                      <span className={styles.dropdownName}>{user?.name || "Yusarius"}</span>
                      <span className={styles.dropdownEmail}>{user?.email || "yusarius@sampulkreativ.com"}</span>
                    </div>
                    <div className={styles.dropdownDivider} />
                    <Link href="/profile" className={styles.dropdownItem} onClick={() => setDropdownOpen(false)}>
                      {t("home") === "Beranda" ? "Lihat Profil" : "View Profile"}
                    </Link>
                    <Link href="/creator" className={styles.dropdownItem} onClick={() => setDropdownOpen(false)}>
                      {t("home") === "Beranda" ? "Ruang Editor" : "Editor Space"}
                    </Link>
                    <div className={styles.dropdownDivider} />
                    <button 
                      className={`${styles.dropdownItem} ${styles.logoutBtn}`}
                      onClick={() => {
                        setDropdownOpen(false);
                        logout();
                        router.push("/");
                      }}
                    >
                      {t("home") === "Beranda" ? "Keluar Akun" : "Logout"}
                    </button>
                  </div>
                )}
              </div>
            </>
          ) : (
            <Link href="/login" className={styles.loginBtn}>
              Masuk
            </Link>
          )}

          {/* Mobile Menu Toggle */}
          <button
            className={styles.menuBtn}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
            id="nav-menu-toggle"
          >
            <span className={`${styles.menuLine} ${mobileMenuOpen ? styles.menuLineOpen1 : ""}`}></span>
            <span className={`${styles.menuLine} ${mobileMenuOpen ? styles.menuLineOpen2 : ""}`}></span>
            <span className={`${styles.menuLine} ${mobileMenuOpen ? styles.menuLineOpen3 : ""}`}></span>
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className={styles.mobileOverlay} onClick={() => setMobileMenuOpen(false)}></div>
      )}
    </nav>
  );
}
