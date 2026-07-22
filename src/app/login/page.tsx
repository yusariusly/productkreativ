"use client";

import React, { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import styles from "./login.module.css";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { login, register } = useAuth();
  
  const [isLogin, setIsLogin] = useState(true);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const redirectUrl = searchParams.get("redirect") || "/";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    
    if (isLogin) {
      // Validate credentials against localStorage
      const savedUsers = localStorage.getItem("sampulkreativ_users");
      const usersList = savedUsers ? JSON.parse(savedUsers) : [];
      
      const foundUser = usersList.find((u: any) => u.email === email && u.pass === password);
      if (foundUser) {
        login(email, foundUser.name);
        router.push(redirectUrl);
      } else {
        setErrorMsg("Email atau kata sandi salah!");
      }
    } else {
      // Register validation
      if (password !== confirmPassword) {
        setErrorMsg("Konfirmasi kata sandi tidak cocok!");
        return;
      }
      
      const success = register(fullName, email, password);
      if (success) {
        login(email, fullName);
        router.push(redirectUrl);
      } else {
        setErrorMsg("Email ini sudah terdaftar!");
      }
    }
  };

  return (
    <div className={styles.loginCard}>
      <div className={styles.logoArea}>
        <svg width="40" height="40" viewBox="0 0 28 28" fill="none" style={{ margin: "0 auto" }}>
          <rect width="28" height="28" rx="8" fill="url(#loginGrad)" />
          <path d="M8 9h12v2H8zm0 4h8v2H8zm0 4h10v2H8z" fill="white" opacity="0.9" />
          <defs>
            <linearGradient id="loginGrad" x1="0" y1="0" x2="28" y2="28">
              <stop offset="0%" stopColor="#7c3aed" />
              <stop offset="100%" stopColor="#ec4899" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      <div className={styles.tabHeader}>
        <button
          type="button"
          className={`${styles.tabBtn} ${isLogin ? styles.tabActive : ""}`}
          onClick={() => {
            setIsLogin(true);
            setErrorMsg("");
          }}
        >
          Masuk
        </button>
        <button
          type="button"
          className={`${styles.tabBtn} ${!isLogin ? styles.tabActive : ""}`}
          onClick={() => {
            setIsLogin(false);
            setErrorMsg("");
          }}
        >
          Daftar
        </button>
      </div>

      <h1 className={styles.title}>
        {isLogin ? "SampulKreativ" : "Daftar Akun"}
      </h1>
      <p className={styles.subtitle}>
        {isLogin
          ? "Masuk untuk menikmati akses pustaka dan pembelian bab."
          : "Daftar untuk menikmati akses pustaka dan mendukung kreator favorit."}
      </p>

      {errorMsg && (
        <div className={styles.errorBanner}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ marginRight: "8px", flexShrink: 0 }}>
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
          <span>{errorMsg}</span>
        </div>
      )}

      <form className={styles.form} onSubmit={handleSubmit}>
        {!isLogin && (
          <div className={styles.inputGroup}>
            <label className={styles.label}>Nama Lengkap</label>
            <input
              type="text"
              className={styles.input}
              placeholder="Yusarius"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
            />
          </div>
        )}

        <div className={styles.inputGroup}>
          <label className={styles.label}>Email</label>
          <input
            type="email"
            className={styles.input}
            placeholder="nama@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className={styles.inputGroup}>
          <label className={styles.label}>Kata Sandi</label>
          <input
            type="password"
            className={styles.input}
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        {!isLogin && (
          <div className={styles.inputGroup}>
            <label className={styles.label}>Konfirmasi Kata Sandi</label>
            <input
              type="password"
              className={styles.input}
              placeholder="••••••••"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
        )}

        <button type="submit" className={styles.submitBtn}>
          {isLogin ? "Masuk Sekarang" : "Daftar Akun Baru"}
        </button>
      </form>

      <p className={styles.demoText}>
        *Ini adalah simulasi otentikasi. Anda dapat memasukkan email/sandi apa saja untuk masuk.
      </p>
    </div>
  );
}

export default function LoginPage() {
  return (
    <div className="container">
      <div className={styles.page}>
        <Suspense fallback={<div>Memuat...</div>}>
          <LoginForm />
        </Suspense>
      </div>
    </div>
  );
}
