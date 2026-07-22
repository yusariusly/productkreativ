"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./Sidebar.module.css";

interface SidebarItem {
  icon: React.ReactNode;
  label: string;
  href: string;
}

interface SidebarProps {
  items: SidebarItem[];
  branding?: {
    title: string;
    subtitle?: string;
  };
  footer?: React.ReactNode;
}

export default function Sidebar({ items, branding, footer }: SidebarProps) {
  const pathname = usePathname();

  return (
    <aside className={styles.sidebar} id="sidebar">
      {/* Branding */}
      {branding && (
        <div className={styles.sidebarBranding}>
          <div className={styles.brandLogo}>
            <svg width="24" height="24" viewBox="0 0 28 28" fill="none">
              <defs>
                <linearGradient id="sidebarLogoGrad" x1="0" y1="0" x2="28" y2="28">
                  <stop offset="0%" stopColor="#7c3aed" />
                  <stop offset="100%" stopColor="#ec4899" />
                </linearGradient>
              </defs>
              <rect width="28" height="28" rx="8" fill="url(#sidebarLogoGrad)" />
              <path d="M8 9h12v2H8zm0 4h8v2H8zm0 4h10v2H8z" fill="white" opacity="0.9" />
            </svg>
            <div>
              <div className={styles.brandTitle}>{branding.title}</div>
              {branding.subtitle && (
                <div className={styles.brandSubtitle}>{branding.subtitle}</div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Navigation */}
      <nav className={styles.sidebarNav}>
        {items.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`${styles.sidebarLink} ${isActive ? styles.sidebarLinkActive : ""}`}
            >
              <span className={styles.sidebarIcon}>{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      {footer && <div className={styles.sidebarFooter}>{footer}</div>}
    </aside>
  );
}
