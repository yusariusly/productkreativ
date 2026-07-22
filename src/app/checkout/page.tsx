"use client";

import { useState } from "react";
import styles from "./checkout.module.css";

export default function CheckoutPage() {
  const [method, setMethod] = useState("card");

  return (
    <div className="container">
      <div className={styles.page}>
        
        {/* Header */}
        <div className={styles.header}>
          <h1 className={styles.title}>Top-up Checkout</h1>
          <p className={styles.subtitle}>Review your order and complete payment.</p>
        </div>

        {/* Order Summary */}
        <div className={styles.checkoutCard}>
          <h2 className={styles.cardTitle}>Order Summary</h2>
          
          <div className={styles.summaryRow}>
            <div>
              <span className={styles.mainProduct}>500 Koins</span>
              <span className={styles.bonusText}>+50 Bonus</span>
            </div>
            <span className={styles.price}>$4.99</span>
          </div>
          
          <div className={styles.subRow}>
            <span>Subtotal</span>
            <span>$4.99</span>
          </div>
          
          <div className={styles.subRow}>
            <span>Service Fee</span>
            <span>$0.50</span>
          </div>
          
          <div className={styles.divider}></div>
          
          <div className={styles.totalRow}>
            <span>Total Due</span>
            <span>$5.49</span>
          </div>
        </div>

        {/* Payment Methods */}
        <div className={styles.methodsContainer}>
          <h2 className={styles.methodsTitle}>Payment Method</h2>
          <div className={styles.methodsGrid}>
            {/* Card Payment */}
            <div 
              className={`${styles.methodCard} ${method === "card" ? styles.methodSelected : ""}`}
              onClick={() => setMethod("card")}
            >
              <div className={`${styles.methodIcon} ${styles.cardIcon}`}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="2" y="5" width="20" height="14" rx="2" />
                  <line x1="2" y1="10" x2="22" y2="10" />
                </svg>
              </div>
              <div className={styles.methodInfo}>
                <span className={styles.methodName}>Card Payment</span>
                <span className={styles.methodDesc}>Credit or Debit Card</span>
              </div>
            </div>

            {/* Bank Transfer */}
            <div 
              className={`${styles.methodCard} ${method === "bank" ? styles.methodSelected : ""}`}
              onClick={() => setMethod("bank")}
            >
              <div className={`${styles.methodIcon} ${styles.bankIcon}`}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M3 21h18M3 10h18M5 6l7-3 7 3M4 10v11M20 10v11M8 14v3M12 14v3M16 14v3" />
                </svg>
              </div>
              <div className={styles.methodInfo}>
                <span className={styles.methodName}>Bank Transfer</span>
                <span className={styles.methodDesc}>Select your bank (e.g. BCA, Mandiri)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Action Area */}
        <div className={styles.actionArea}>
          <button className={styles.confirmBtn}>
            Confirm Payment $5.49
          </button>
          
          <div className={styles.secureText}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <rect x="5" y="11" width="14" height="10" rx="2" />
              <path d="M12 11V7a3 3 0 00-6 0v4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
            Secure checkout powered by Stripe
          </div>
        </div>

      </div>
    </div>
  );
}
