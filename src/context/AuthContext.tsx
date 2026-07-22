"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

interface User {
  name: string;
  email: string;
}

interface AuthContextType {
  isLoggedIn: boolean;
  isLoading: boolean;
  user: User | null;
  coins: number;
  bookmarks: string[];
  history: Array<{ id: string; lastChapter: number; progress: number; type: "comic" | "novel" }>;
  login: (email: string, name?: string) => void;
  logout: () => void;
  register: (name: string, email: string, pass: string) => boolean;
  toggleBookmark: (id: string) => boolean; // returns true if added, false if removed
  addHistory: (id: string, chapter: number, type: "comic" | "novel") => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const [bookmarks, setBookmarks] = useState<string[]>([]);
  const [history, setHistory] = useState<Array<{ id: string; lastChapter: number; progress: number; type: "comic" | "novel" }>>([]);

  // Load auth state from localStorage on mount
  useEffect(() => {
    // Seed default user if not exists
    const savedUsers = localStorage.getItem("sampulkreativ_users");
    if (!savedUsers) {
      const initialUsers = [
        { name: "Yusarius", email: "yusarius@sampulkreativ.com", pass: "123456" }
      ];
      localStorage.setItem("sampulkreativ_users", JSON.stringify(initialUsers));
    }

    const logged = localStorage.getItem("sampulkreativ_logged") === "true";
    setIsLoggedIn(logged);
    if (logged) {
      const savedUser = localStorage.getItem("sampulkreativ_user");
      if (savedUser) {
        setUser(JSON.parse(savedUser));
      } else {
        setUser({ name: "Yusarius", email: "yusarius@sampulkreativ.com" });
      }

      // Load user bookmarks and history or initialize with dummies
      const savedBms = localStorage.getItem("sampulkreativ_bookmarks");
      if (savedBms) {
        setBookmarks(JSON.parse(savedBms));
      } else {
        const dummies = ["shatter-point", "whispers-of-kyoto"];
        setBookmarks(dummies);
        localStorage.setItem("sampulkreativ_bookmarks", JSON.stringify(dummies));
      }

      const savedHist = localStorage.getItem("sampulkreativ_history");
      if (savedHist) {
        setHistory(JSON.parse(savedHist));
      } else {
        const dummies = [
          { id: "neon-requiem", lastChapter: 42, progress: 78, type: "comic" as const },
          { id: "arcanists-debt", lastChapter: 35, progress: 45, type: "novel" as const },
        ];
        setHistory(dummies);
        localStorage.setItem("sampulkreativ_history", JSON.stringify(dummies));
      }
    } else {
      setUser(null);
      setBookmarks([]);
      setHistory([]);
    }
    setIsLoading(false);
  }, []);

  const login = (email: string, name?: string) => {
    localStorage.setItem("sampulkreativ_logged", "true");
    const resolvedName = name || "Yusarius";
    const userData = { name: resolvedName, email };
    localStorage.setItem("sampulkreativ_user", JSON.stringify(userData));
    setUser(userData);
    setIsLoggedIn(true);
  };

  const logout = () => {
    localStorage.setItem("sampulkreativ_logged", "false");
    localStorage.removeItem("sampulkreativ_user");
    localStorage.removeItem("sampulkreativ_bookmarks");
    localStorage.removeItem("sampulkreativ_history");
    setIsLoggedIn(false);
    setUser(null);
    setBookmarks([]);
    setHistory([]);
  };

  const register = (name: string, email: string, pass: string): boolean => {
    const savedUsers = localStorage.getItem("sampulkreativ_users");
    let usersList = savedUsers ? JSON.parse(savedUsers) : [];
    
    // Check if user already exists
    const exists = usersList.some((u: any) => u.email === email);
    if (exists) {
      return false;
    }

    usersList.push({ name, email, pass });
    localStorage.setItem("sampulkreativ_users", JSON.stringify(usersList));
    return true;
  };

  const toggleBookmark = (id: string) => {
    if (!isLoggedIn) return false;
    let updated: string[];
    let added = false;
    if (bookmarks.includes(id)) {
      updated = bookmarks.filter((b) => b !== id);
    } else {
      updated = [...bookmarks, id];
      added = true;
    }
    setBookmarks(updated);
    localStorage.setItem("sampulkreativ_bookmarks", JSON.stringify(updated));
    return added;
  };

  const addHistory = (id: string, chapter: number, type: "comic" | "novel") => {
    if (!isLoggedIn) return;
    const existing = history.find((h) => h.id === id);
    let updated: typeof history;
    if (existing) {
      updated = history.map((h) =>
        h.id === id ? { ...h, lastChapter: chapter, progress: Math.min(100, Math.floor(chapter * 5)) } : h
      );
    } else {
      updated = [{ id, lastChapter: chapter, progress: Math.min(100, Math.floor(chapter * 5)), type }, ...history];
    }
    setHistory(updated);
    localStorage.setItem("sampulkreativ_history", JSON.stringify(updated));
  };

  const coins = isLoggedIn ? 2450 : 0;

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        isLoading,
        user,
        coins,
        bookmarks,
        history,
        login,
        logout,
        register,
        toggleBookmark,
        addHistory,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
