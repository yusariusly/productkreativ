/* ============================================================
   DUMMY DATA — SampulKreativ Station
   All placeholder data for Fase 1 (UI/UX only)
   ============================================================ */

export interface Series {
  id: string;
  title: string;
  author: string;
  authorAvatar?: string;
  type: "comic" | "novel" | "video";
  genre: string[];
  rating: number;
  views: number;
  likes: number;
  coverUrl: string;
  synopsis: string;
  totalChapters: number;
  status: "ongoing" | "completed";
  isOriginal?: boolean;
  isFeatured?: boolean;
  updatedAt: string;
}

export interface Chapter {
  id: string;
  seriesId: string;
  number: number;
  title: string;
  accessType: "free" | "ad" | "coin";
  coinPrice: number;
  adQuota?: number;
  publishedAt: string;
  freeCountdownDays?: number;
  thumbnailUrl?: string;
  views: number;
  likes: number;
  comments: number;
  readTime?: string;
}

export interface Transaction {
  id: string;
  date: string;
  item: string;
  amount: number;
  type: "purchase" | "topup" | "earning";
}

export interface CoinPackage {
  id: string;
  amount: number;
  bonus: number;
  price: string;
  label?: string;
}

export interface CreatorContent {
  id: string;
  title: string;
  type: "comic" | "novel" | "video";
  views: number;
  sales: number;
  status: "published" | "draft";
  thumbnailUrl: string;
}

/* ============================================================
   COMIC SERIES
   ============================================================ */
export const comicSeries: Series[] = [
  {
    id: "neon-syndicate-rebirth",
    title: "Neon Syndicate: Rebirth",
    author: "StudioPulse",
    type: "comic",
    genre: ["Sci-Fi", "Cyberpunk", "Action"],
    rating: 4.9,
    views: 2100000,
    likes: 124000,
    coverUrl: "https://images.unsplash.com/photo-1578632767115-351597cf2477?w=500&q=80",
    synopsis: "In the sprawling undercity of Neo-Veridia, a rogue AI discovers a hidden protocol that could unravel the corporate oligarchy. Time is running out.",
    totalChapters: 45,
    status: "ongoing",
    isOriginal: true,
    isFeatured: true,
    updatedAt: "2024-10-24",
  },
  {
    id: "shatter-point",
    title: "Shatter Point",
    author: "Kai_Illustrates",
    type: "comic",
    genre: ["Action", "Sci-Fi"],
    rating: 4.9,
    views: 1200000,
    likes: 89000,
    coverUrl: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=500&q=80",
    synopsis: "A powerful warrior with a cosmic blade is drawn into a conflict that threatens to shatter the fabric of the universe itself.",
    totalChapters: 50,
    status: "ongoing",
    isOriginal: true,
    updatedAt: "2024-10-23",
  },
  {
    id: "whispers-of-the-grove",
    title: "Whispers of the Grove",
    author: "RuneMaster",
    type: "comic",
    genre: ["Fantasy", "Adventure"],
    rating: 4.8,
    views: 850000,
    likes: 56000,
    coverUrl: "https://images.unsplash.com/photo-1448375240586-882707db888b?w=500&q=80",
    synopsis: "In a hidden forest where magic flows like water, a young guardian must protect the heart of the grove from modern corruption.",
    totalChapters: 35,
    status: "ongoing",
    updatedAt: "2024-10-22",
  },
  {
    id: "bloodline-sovereign",
    title: "Bloodline Sovereign",
    author: "DarkCanvas",
    type: "comic",
    genre: ["Romance", "Fantasy"],
    rating: 4.7,
    views: 2500000,
    likes: 180000,
    coverUrl: "https://images.unsplash.com/photo-1509248961158-e54f6934749c?w=500&q=80",
    synopsis: "An ancient vampire king awakens in the modern era, only to fall in love with a human woman who holds the key to his family's curse.",
    totalChapters: 60,
    status: "ongoing",
    isOriginal: true,
    updatedAt: "2024-10-20",
  },
  {
    id: "culinary-catastrophe",
    title: "Culinary Catastrophe",
    author: "MakanArt",
    type: "comic",
    genre: ["Comedy", "Slice of Life"],
    rating: 4.6,
    views: 420000,
    likes: 24000,
    coverUrl: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=500&q=80",
    synopsis: "A brilliant but chaotic chef joins a prestigious restaurant and turns the kitchen into a warzone of food fights and culinary experiments.",
    totalChapters: 40,
    status: "completed",
    updatedAt: "2024-09-30",
  },
  {
    id: "blade-of-eternity",
    title: "Blade of Eternity",
    author: "IronQuill",
    type: "comic",
    genre: ["Fantasy", "Action"],
    rating: 4.8,
    views: 1100000,
    likes: 72000,
    coverUrl: "https://images.unsplash.com/photo-1618336753974-aae8e04506aa?w=500&q=80",
    synopsis: "The legendary sword that has guided kingdoms for millennia is lost. A young blacksmith's apprentice must find it before the eclipse.",
    totalChapters: 45,
    status: "ongoing",
    updatedAt: "2024-10-24",
  },
  {
    id: "star-crossed-echoes",
    title: "Star-Crossed Echoes",
    author: "CosmicLove",
    type: "comic",
    genre: ["Romance", "Sci-Fi"],
    rating: 4.7,
    views: 650000,
    likes: 45000,
    coverUrl: "https://images.unsplash.com/photo-1506318137071-a8e063b4bec0?w=500&q=80",
    synopsis: "Two lovers separated by light-years communicate through quantum echoes, hoping to find a way to meet in the physical world.",
    totalChapters: 30,
    status: "ongoing",
    updatedAt: "2024-10-23",
  },
  {
    id: "neon-requiem",
    title: "Neon Requiem",
    author: "ShadowInk",
    type: "comic",
    genre: ["Sci-Fi", "Drama"],
    rating: 4.7,
    views: 890000,
    likes: 56100,
    coverUrl: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=500&q=80",
    synopsis: "A conductor in a dystopian future uses music to alter reality, navigating a dangerous path between compliance and rebellion.",
    totalChapters: 42,
    status: "ongoing",
    isOriginal: true,
    updatedAt: "2024-10-22",
  }
];

/* ============================================================
   NOVEL SERIES
   ============================================================ */
export const novelSeries: Series[] = [
  {
    id: "arcanists-debt",
    title: "The Arcanist's Debt",
    author: "RuneMaster",
    type: "novel",
    genre: ["Fantasy", "Adventure", "Magic"],
    rating: 4.7,
    views: 580000,
    likes: 38900,
    coverUrl: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=500&q=80",
    synopsis: "A disgraced arcane scholar owes a life debt to a mysterious entity. To repay it, she must recover three lost grimoires hidden in the world's most dangerous magical zones.",
    totalChapters: 120,
    status: "ongoing",
    isOriginal: true,
    updatedAt: "2024-10-22",
  },
  {
    id: "whispers-of-kyoto",
    title: "Whispers of Kyoto",
    author: "SakuraWords",
    type: "novel",
    genre: ["Romance", "Slice of Life", "Historical"],
    rating: 4.9,
    views: 920000,
    likes: 67800,
    coverUrl: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=500&q=80",
    synopsis: "Two strangers connected by an ancient red thread of fate keep crossing paths in Kyoto. As autumn turns to winter, their stories intertwine in unexpected ways.",
    totalChapters: 72,
    status: "completed",
    updatedAt: "2024-09-15",
  }
];

/* ============================================================
   VIDEO SERIES
   ============================================================ */
export const videoSeries: Series[] = [
  {
    id: "monster-dewi",
    title: "Monster? Aku Terikat dengan Dewi",
    author: "StudioPulse",
    type: "video",
    genre: ["Drama", "Fantasy"],
    rating: 4.9,
    views: 8800000,
    likes: 540000,
    coverUrl: "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=500&q=80",
    synopsis: "Seorang pemuda biasa secara tidak sengaja membangkitkan dewi kuno yang terikat padanya. Petualangan magis dan kekacauan tak terduga pun dimulai.",
    totalChapters: 30,
    status: "ongoing",
    isOriginal: true,
    isFeatured: true,
    updatedAt: "2024-10-24",
  },
  {
    id: "belai-aku-kekacauan",
    title: "Belai Aku atau Hadapi Kekacauan (Sulih Suara)",
    author: "CyberDrift Studios",
    type: "video",
    genre: ["Drama", "Romance"],
    rating: 4.7,
    views: 4500000,
    likes: 280000,
    coverUrl: "https://images.unsplash.com/photo-1518834107812-67b0b7c58434?w=500&q=80",
    synopsis: "Kisah cinta penuh liku-liku di kalangan elit kota metropolitan. Antara kasih sayang tulus dan perebutan kekuasaan yang kejam.",
    totalChapters: 30,
    status: "ongoing",
    isOriginal: true,
    updatedAt: "2024-10-22",
  },
  {
    id: "istri-ceo",
    title: "Dari Medan Perang ke Istri CEO (Sulih Suara)",
    author: "CEOProductions",
    type: "video",
    genre: ["Drama", "Romance"],
    rating: 4.8,
    views: 19000000,
    likes: 1200000,
    coverUrl: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=500&q=80",
    synopsis: "Seorang mantan tentara wanita tangguh dipaksa menikah kontrak dengan CEO dingin yang sombong. Tapi medan perang sesungguhnya ada di hati mereka.",
    totalChapters: 24,
    status: "ongoing",
    updatedAt: "2024-10-18",
  },
  {
    id: "judi-batu-giok",
    title: "Judi Batu Giok di Perbatasan (Sulih Suara)",
    author: "FrontierDrama",
    type: "video",
    genre: ["Drama", "Action"],
    rating: 4.6,
    views: 11800000,
    likes: 720000,
    coverUrl: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=500&q=80",
    synopsis: "Taruhan berskala tinggi di perbatasan luar negeri. Seni membedakan batu giok asli berujung pada konspirasi mafia yang mematikan.",
    totalChapters: 30,
    status: "completed",
    updatedAt: "2024-10-10",
  }
];

/* ============================================================
   CHAPTERS — Sample for Neon Syndicate: Rebirth
   ============================================================ */
export const sampleChapters: Chapter[] = Array.from({ length: 45 }, (_, i) => {
  const num = i + 1;
  let accessType: "free" | "ad" | "coin" = "free";
  let coinPrice = 0;
  let freeCountdownDays: number | undefined;
  let adQuota: number | undefined;

  if (num > 40) {
    accessType = "coin";
    coinPrice = 20;
    freeCountdownDays = 14 - (45 - num);
  } else if (num > 30) {
    accessType = "ad";
    adQuota = 2;
    coinPrice = 10;
  } else {
    accessType = "free";
  }

  return {
    id: `ch-${num}`,
    seriesId: "neon-syndicate-rebirth",
    number: num,
    title: `Chapter ${num}: ${getChapterTitle(num)}`,
    accessType,
    coinPrice,
    adQuota,
    publishedAt: `2024-${String(Math.ceil(num / 4)).padStart(2, "0")}-${String((num % 28) + 1).padStart(2, "0")}`,
    freeCountdownDays: freeCountdownDays && freeCountdownDays > 0 ? freeCountdownDays : undefined,
    views: 10000 + (num * 1234) % 40000,
    likes: 500 + (num * 143) % 4500,
    comments: 50 + (num * 37) % 950,
    readTime: `${5 + (num * 3) % 11}m read`,
  };
});

function getChapterTitle(num: number): string {
  const titles = [
    "The Awakening", "Digital Shadows", "Neon Pulse", "Code Red", "Phantom Signal",
    "The Circuit", "Binary Dawn", "Chrome Heart", "Data Storm", "Neural Link",
    "Ghost Protocol", "Cyber Chase", "The Breach", "Dark Sector", "Wire Frame",
    "System Crash", "The Override", "Pixel War", "Synth Blood", "The Mainframe",
    "Zero Hour", "Grid Lock", "The Render", "Bit Flip", "Cloud Break",
    "Hard Reset", "The Loop", "Echo Chamber", "Stack Overflow", "Core Dump",
    "Memory Leak", "Patch Day", "The Compile", "Runtime Error", "Null Pointer",
    "The Decrypt", "Firewall", "Root Access", "The Injection", "Buffer Zone",
    "Kernel Panic", "The Merge", "Fork Bomb", "Deep Copy", "The Chrome Awakening",
  ];
  return titles[(num - 1) % titles.length];
}

/* ============================================================
   NOVEL CHAPTERS — Sample for The Arcanist's Debt
   ============================================================ */
export const sampleNovelChapters: Chapter[] = Array.from({ length: 85 }, (_, i) => {
  const num = i + 1;
  let accessType: "free" | "ad" | "coin" = "free";
  let coinPrice = 0;
  let freeCountdownDays: number | undefined;
  let adQuota: number | undefined;

  if (num > 78) {
    accessType = "coin";
    coinPrice = 15;
    freeCountdownDays = 14 - (85 - num);
  } else if (num > 60) {
    accessType = "ad";
    adQuota = 2;
    coinPrice = 8;
  } else {
    accessType = "free";
  }

  return {
    id: `novel-ch-${num}`,
    seriesId: "arcanists-debt",
    number: num,
    title: `Chapter ${num}`,
    accessType,
    coinPrice,
    adQuota,
    publishedAt: `2024-${String(Math.ceil(num / 8)).padStart(2, "0")}-${String((num % 28) + 1).padStart(2, "0")}`,
    freeCountdownDays: freeCountdownDays && freeCountdownDays > 0 ? freeCountdownDays : undefined,
    views: 5000 + (num * 789) % 25000,
    likes: 200 + (num * 97) % 2800,
    comments: 20 + (num * 23) % 480,
    readTime: `${10 + (num * 4) % 16}m read`,
  };
});

/* ============================================================
   WALLET DATA
   ============================================================ */
export const coinPackages: CoinPackage[] = [
  { id: "pack-100", amount: 100, bonus: 0, price: "$0.99" },
  { id: "pack-500", amount: 500, bonus: 50, price: "$4.99", label: "POPULAR" },
  { id: "pack-1000", amount: 1000, bonus: 150, price: "$8.99", label: "BEST VALUE" },
];

export const recentTransactions: Transaction[] = [
  { id: "t1", date: "Oct 24, 2024", item: "Unlocked Chapter 45: Cyber Ninja", amount: -20, type: "purchase" },
  { id: "t2", date: "Oct 22, 2024", item: "Bought 500 Koins Package", amount: 500, type: "topup" },
  { id: "t3", date: "Oct 18, 2024", item: "Unlocked Chapter 12: Neon Dreams", amount: -15, type: "purchase" },
  { id: "t4", date: "Oct 15, 2024", item: "Bought 100 Koins Package", amount: 100, type: "topup" },
  { id: "t5", date: "Oct 12, 2024", item: "Unlocked Chapter 38: Blade Chronicle", amount: -10, type: "purchase" },
];

/* ============================================================
   CREATOR DASHBOARD DATA
   ============================================================ */
export const creatorContents: CreatorContent[] = [
  {
    id: "cc1",
    title: "Neon Syndicate: Rebirth",
    type: "comic",
    views: 142095,
    sales: 4200,
    status: "published",
    thumbnailUrl: "https://images.unsplash.com/photo-1578632767115-351597cf2477?w=500&q=80",
  },
  {
    id: "cc2",
    title: "The Arcanist's Debt",
    type: "novel",
    views: 89430,
    sales: 1850,
    status: "published",
    thumbnailUrl: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=500&q=80",
  },
  {
    id: "cc3",
    title: "Monster? Aku Terikat dengan Dewi Ep 5",
    type: "video",
    views: 0,
    sales: 0,
    status: "draft",
    thumbnailUrl: "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=500&q=80",
  },
];

export const readerGrowthData = [
  { day: "1", value: 120 },
  { day: "5", value: 250 },
  { day: "10", value: 380 },
  { day: "15", value: 520 },
  { day: "20", value: 450 },
  { day: "25", value: 680 },
  { day: "30", value: 720 },
];

/* ============================================================
   NOVEL CONTENT — Sample chapter text
   ============================================================ */
export const sampleNovelContent = {
  chapter: 42,
  title: "The Arcanist's Debt",
  author: "RuneMaster",
  readTime: "25m read",
  date: "Oct 24, 2024",
  paragraphs: [
    "The rain fell in sheets, slicking the obsidian streets of Neo-Jakarta. Shadows clung to the underbellies of the mag-lev tracks, hiding the desperate and the dangerous. Elara pulled her collar tight against the synthetic chill.",
    "Her neural link pulsed, a dull rhythm behind her left eye. Incoming transmission. It was encrypted, layered with archaic static protocols that no one used anymore unless they were paranoid or powerful. Or both.",
    "\"Location confirmed,\" a synthetic voice rasped in her auditory cortex. \"The package is secure, but the Hounds are tracking the scent.\"",
    "Elara didn't hesitate. She vanished into the nearest alley, the neon glow of a noodle stand painting her silhouette in violent magentas and sickly greens. She had to move.",
    "The Hounds weren't ordinary trackers. They were algorithmically enhanced pursuit units, born from the same labs that created the Neural Web — the invisible digital mesh that connected every citizen to the city's consciousness. But Elara was different. She was a ghost in the system, invisible to the very network that controlled billions.",
    "Her fingers danced across the haptic interface projected from her wrist implant. Lines of code cascaded before her eyes, each one a thread she could pull to unravel the digital fabric around her. She found what she was looking for: a blind spot in the surveillance grid, a gap no wider than three meters.",
    "\"Three meters,\" she whispered. \"That's all I need.\"",
    "She took a breath, feeling the synthetic air burn her lungs, and then she ran. The world blurred around her — neon signs advertising neural upgrades, holographic billboards selling digital immortality, crowds of augmented citizens moving like data packets through the city's arteries.",
    "Behind her, the Hounds howled. Not with voices, but with electromagnetic pulses that rippled through the Neural Web like digital earthquakes. Every connected device within a kilometer flickered. Street lights strobed. Personal screens glitched.",
    "But Elara kept running. She was the one signal they couldn't track, the one variable their algorithms couldn't predict. And she had a package to deliver — one that could change everything.",
  ],
  commentCounts: [12, 5, 34, 8, 21, 3, 15, 7, 28, 42],
};

/* ============================================================
   HELPER FUNCTIONS
   ============================================================ */
export function formatNumber(num: number): string {
  if (num >= 1000000) {
    return `${(num / 1000000).toFixed(1)}M`;
  }
  if (num >= 1000) {
    return `${(num / 1000).toFixed(num >= 10000 ? 0 : 1)}K`;
  }
  return num.toString();
}

export function getSeriesById(id: string): Series | undefined {
  return [...comicSeries, ...novelSeries, ...videoSeries].find((s) => s.id === id);
}

export function getAllSeries(): Series[] {
  return [...comicSeries, ...novelSeries, ...videoSeries];
}
