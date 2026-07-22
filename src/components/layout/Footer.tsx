"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./Footer.module.css";

export default function Footer() {
  const pathname = usePathname() || "";
  const isReaderMode = /^\/comics\/[^\/]+\/[^\/]+\/?$/.test(pathname)
    || /^\/novels\/[^\/]+\/[^\/]+\/?$/.test(pathname)
    || /^\/videos\/[^\/]+\/?$/.test(pathname);

  if (isReaderMode) return null;

  return (
    <footer className={styles.footer} id="main-footer">
      <div className={styles.footerInner}>
        <div className={styles.footerLeft}>
          <div className={styles.footerLogo}>
            <svg width="24" height="24" viewBox="0 0 28 28" fill="none">
              <defs>
                <linearGradient id="footerLogoGrad" x1="0" y1="0" x2="28" y2="28">
                  <stop offset="0%" stopColor="#7c3aed" />
                  <stop offset="100%" stopColor="#ec4899" />
                </linearGradient>
              </defs>
              <rect width="28" height="28" rx="8" fill="url(#footerLogoGrad)" />
              <path d="M8 9h12v2H8zm0 4h8v2H8zm0 4h10v2H8z" fill="white" opacity="0.9" />
            </svg>
            <span>SampulKreativ</span>
          </div>
          <p className={styles.footerDesc}>
            Platform konten kreatif untuk komik, novel, dan video series terbaik Indonesia.
          </p>
        </div>

        <div className={styles.footerLinks}>
          <div className={styles.footerCol}>
            <h4>Platform</h4>
            <Link href="/comics">Comics</Link>
            <Link href="/novels">Novels</Link>
            <Link href="/videos">Videos</Link>
            <Link href="/creator">Become a Creator</Link>
          </div>
          <div className={styles.footerCol}>
            <h4>Support</h4>
            <Link href="/help">Help Center</Link>
            <Link href="/terms">Terms of Service</Link>
            <Link href="/privacy">Privacy Policy</Link>
            <Link href="/creator">Creator Program</Link>
          </div>
        </div>
      </div>

      <div className={styles.footerBottom}>
        <p>© 2024 SampulKreativ. All rights reserved.</p>
      </div>
    </footer>
  );
}
