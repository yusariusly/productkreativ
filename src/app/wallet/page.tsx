"use client";

import { useState } from "react";
import Link from "next/link";
import { coinPackages, recentTransactions } from "@/data/dummy";
import { useAuth } from "@/context/AuthContext";
import styles from "./wallet.module.css";

export default function WalletPage() {
  const { isLoggedIn, coins } = useAuth();
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null);

  if (!isLoggedIn) {
    return (
      <div className="container" style={{ paddingTop: "var(--space-2xl)", paddingBottom: "var(--space-4xl)" }}>
        <div style={{ textAlign: "center", padding: "100px 20px", border: "1px dashed var(--border-primary)", borderRadius: "var(--radius-xl)", background: "rgba(255,255,255,0.01)" }}>
          <h2 style={{ fontSize: "var(--text-2xl)", fontWeight: 800, color: "var(--text-primary)", marginBottom: "var(--space-sm)" }}>Akses Terbatas</h2>
          <p style={{ color: "var(--text-secondary)", fontSize: "var(--text-sm)", marginBottom: "var(--space-xl)", maxWidth: "480px", margin: "0 auto var(--space-xl)" }}>
            Silakan masuk (login) terlebih dahulu untuk membuka dan menggunakan dompet transaksi SampulKreativ Anda.
          </p>
          <Link href="/login?redirect=/wallet" className="btn btn-gold btn-lg">
            Masuk Sekarang
          </Link>
        </div>
      </div>
    );
  }

  const balance = coins;

  return (
    <div className="container" style={{ paddingTop: "var(--space-2xl)", paddingBottom: "var(--space-4xl)" }}>
      <div className={styles.walletPage}>
        <h1 className={styles.pageTitle}>My Wallet</h1>
        <p className={styles.pageDesc}>Manage your Koins and transaction history.</p>

        {/* Balance Card - Full Width */}
        <div className={styles.balanceCard}>
          <div className={styles.balanceHeader}>
            <span className={styles.balanceLabel}>CURRENT BALANCE</span>
            <button className={styles.redeemBtn}>Redeem Code</button>
          </div>
          <div className={styles.balanceAmount}>
            <span className={styles.coinIconLg}>$</span>
            <span className={styles.balanceValue}>{balance.toLocaleString()}</span>
            <span className={styles.balanceUnit}>Koins</span>
          </div>
        </div>

        <div className={styles.walletGrid}>
          {/* Left: Transactions */}
          <div className={styles.transactionsCard}>
            <h2 className={styles.sectionTitle}>Recent Transactions</h2>
            <div className="table-wrapper">
              <table className="table">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Item / Package</th>
                    <th style={{ textAlign: "right" }}>Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {recentTransactions.map((tx) => (
                    <tr key={tx.id}>
                      <td style={{ whiteSpace: "nowrap", color: "var(--text-tertiary)" }}>{tx.date}</td>
                      <td>{tx.item}</td>
                      <td style={{
                        textAlign: "right",
                        fontWeight: 600,
                        color: tx.amount > 0 ? "var(--accent-green-light)" : "var(--accent-gold-light)",
                      }}>
                        {tx.amount > 0 ? "+" : ""}{tx.amount.toLocaleString()} Koins
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Right: Top-up Packages */}
          <div className={styles.topupSection}>
            <h2 className={styles.topupTitle}>Top-up Koins</h2>
            <div className={styles.packages}>
              {coinPackages.map((pkg) => (
                <button
                  key={pkg.id}
                  className={`${styles.packageCard} ${selectedPackage === pkg.id ? styles.packageCardActive : ""}`}
                  onClick={() => setSelectedPackage(pkg.id)}
                >
                  {pkg.label && (
                    <span className={`${styles.packageLabel} ${
                      pkg.label === "POPULAR" ? styles.packageLabelPopular : styles.packageLabelBest
                    }`}>
                      {pkg.label}
                    </span>
                  )}
                  <div className={styles.packageInfo}>
                    <span className={styles.packageCoin}>$</span>
                    <div>
                      <span className={styles.packageAmount}>{pkg.amount} Koins</span>
                      {pkg.bonus > 0 && (
                        <span className={styles.packageBonus}>+{pkg.bonus} Bonus</span>
                      )}
                    </div>
                  </div>
                  <span className={styles.packagePrice}>{pkg.price}</span>
                </button>
              ))}
            </div>

            {/* Checkout */}
            <div className={styles.checkout}>
              <Link 
                href="/checkout" 
                className={`btn btn-gold btn-lg ${!selectedPackage ? "btn-disabled" : ""}`}
                style={{ width: "100%", pointerEvents: selectedPackage ? "auto" : "none", opacity: selectedPackage ? 1 : 0.5 }}
              >
                Proceed to Checkout
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
