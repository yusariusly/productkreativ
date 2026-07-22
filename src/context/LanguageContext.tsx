"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

type Language = "id" | "en";

interface LanguageContextProps {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  id: {
    home: "Beranda",
    comics: "Komik",
    novels: "Novel",
    videos: "Video",
    wallet: "Dompet",
    creatorSpace: "Ruang Kreator",
    continueReading: "Lanjutkan Membaca",
    trendingComics: "Komik Populer",
    popularNovels: "Novel Terlaris",
    newVideoSeries: "Serial Video Pendek",
    viewAll: "Lihat Semua →",
    viewLibrary: "Buka Pustaka",
    readyToEarn: "Siap untuk mulai menghasilkan?",
    joinCreatorDesc: "Bergabunglah dengan Program Kreator SampulKreativ. Bagikan komik, novel, atau serial video Anda, dan dapatkan bagi hasil 50/50 sejak Hari Pertama.",
    joinCreatorBtn: "Gabung Program Kreator",
    walletBalance: "Saldo Koin",
    topUpCoins: "Top Up Koin",
    myCollection: "Koleksi Saya",
    inProgress: "dalam progres",
    saved: "disimpan",
    favorites: "Favorit & Penanda Pustaka",
    changePhoto: "Ubah Foto",
    editName: "Ubah Nama",
    save: "Simpan",
    cancel: "Batal",
    premiumReader: "Pembaca Premium",
    languageSetting: "Pengaturan Bahasa",
    currentLanguage: "Bahasa Utama",
    indonesian: "Bahasa Indonesia (Utama)",
    english: "English (Inggris)",
    readNow: "Baca Sekarang",
    addToLibrary: "+ Tambah ke Pustaka",
    views: "Dilihat",
    buyCoins: "Beli Koin",
    voteChapter: "Vote Bab Ini",
    nextChapter: "Bab Selanjutnya",
    readerSettings: "Pengaturan Membaca",
    fontSize: "Ukuran Huruf",
    lineSpacing: "Jarak Baris",
    theme: "Tema",
    dark: "Gelap",
    light: "Terang",
    sepia: "Sepia",
    paragraphComments: "Komentar Paragraf",
  },
  en: {
    home: "Home",
    comics: "Comics",
    novels: "Novels",
    videos: "Videos",
    wallet: "Wallet",
    creatorSpace: "Creator Space",
    continueReading: "Continue Reading",
    trendingComics: "Trending Comics",
    popularNovels: "Popular Novels",
    newVideoSeries: "New Video Series",
    viewAll: "View All →",
    viewLibrary: "View Library",
    readyToEarn: "Ready to start earning?",
    joinCreatorDesc: "Join the SampulKreativ Creator Program. Share your comics, novels, or video series, and keep a 50% revenue split from Day 1.",
    joinCreatorBtn: "Join Creator Program",
    walletBalance: "Wallet Balance",
    topUpCoins: "Top Up Coins",
    myCollection: "My Collection",
    inProgress: "in progress",
    saved: "saved",
    favorites: "Favorites & Bookmarks",
    changePhoto: "Change Photo",
    editName: "Edit Name",
    save: "Save",
    cancel: "Cancel",
    premiumReader: "Premium Reader",
    languageSetting: "Language Settings",
    currentLanguage: "Current Language",
    indonesian: "Bahasa Indonesia (Main)",
    english: "English",
    readNow: "Read Now",
    addToLibrary: "+ Add to Library",
    views: "Views",
    buyCoins: "Buy Coins",
    voteChapter: "Vote for Chapter",
    nextChapter: "Next Chapter",
    readerSettings: "Reader Settings",
    fontSize: "Font Size",
    lineSpacing: "Line Spacing",
    theme: "Theme",
    dark: "Dark",
    light: "Light",
    sepia: "Sepia",
    paragraphComments: "Paragraph Comments",
  }
};

const LanguageContext = createContext<LanguageContextProps | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>("id"); // Indonesian as main language default

  useEffect(() => {
    const savedLang = localStorage.getItem("app-lang") as Language;
    if (savedLang === "id" || savedLang === "en") {
      setLanguageState(savedLang);
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem("app-lang", lang);
  };

  const t = (key: string): string => {
    return translations[language]?.[key] || translations["en"]?.[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
