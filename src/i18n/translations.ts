export type AppLanguage = 'id' | 'en';

export const translations = {
  id: {
    // Brand & App
    appName: 'SiLuhur',
    appTagline: 'Merawat Warisan, Memahami Bukti.',
    ebmBadge: 'EBM & Kearifan',
    badgeSub: 'Etnomedisin Nusantara · Berbasis Bukti',

    // Nav Labels
    navHome: 'Beranda',
    navExplore: 'Eksplorasi',
    navFactCheck: 'Cek Fakta',
    navTracker: 'Hidup Sehat',
    navProfile: 'Profil',
    navFoodFacts: 'Cek Produk',
    navTherapies: 'Panduan Terapi',
    navRempahPedia: 'Rempah Pedia',
    navAssistant: 'Tanya Kakek Luhur',

    // Drawer Descriptions
    homeDesc: 'Ringkasan & fitur unggulan',
    exploreDesc: 'Jejak Sehat & Tanaman Nusantara',
    factCheckDesc: 'Verifikasi klaim kesehatan & mitos',
    trackerDesc: 'Catatan hidrasi & tips gaya hidup',
    foodFactsDesc: 'Barcode & komposisi Open Food Facts',
    therapiesDesc: 'Ramuan godokan & akupresur aman',
    rempahPediaDesc: 'Koleksi resep & dokumentasi tradisi',
    assistantDesc: 'Konsultasi kearifan & bukti ilmiah',
    profileDesc: 'Kelola akun dan resep tersimpan',
    ethicsDesc: 'Prinsip ilmiah & keterbukaan',

    // Common Actions
    login: 'Masuk',
    logout: 'Logout',
    register: 'Daftar Baru',
    askAi: 'Tanya Kakek Luhur',
    askAiShort: 'Tanya AI',
    menu: 'Menu',
    close: 'Tutup',
    cancel: 'Batal',
    confirm: 'Konfirmasi',
    back: 'Kembali',
    next: 'Lanjut',
    prev: 'Sebelumnya',
    skip: 'Lewati',
    startNow: 'Mulai Sekarang',
    search: 'Cari...',
    understand: 'Saya Memahami',
    seeAll: 'Lihat Semua',
    viewDetail: 'Lihat Detail',
    share: 'Bagikan',
    bookmark: 'Simpan',
    saved: 'Tersimpan',
    language: 'Bahasa',
    send: 'Kirim',

    // Splash Screen
    splashMenyiapkan: 'Menyiapkan pengetahuan...',
    splashTapToSkip: 'Ketuk untuk Lewati',

    // Onboarding
    onboarding1Kicker: 'Warisan & Pengetahuan',
    onboarding1Title: 'Kesehatan Bukan Sekadar Obat, tapi Juga Pengetahuan.',
    onboarding1Desc:
      'SiLuhur hadir untuk membantumu mengenal lebih dalam tentang kesehatan, dari ilmu modern hingga kearifan Nusantara.',
    onboarding1Feat1: 'Koleksi etnomedisin dan kearifan lokal 38 provinsi di Indonesia',
    onboarding1Feat2: 'Didukung verifikasi bukti ilmiah (Evidence-Based Medicine) terkini',
    onboarding1Feat3: 'Tanya Kakek Luhur — asisten cerdas berbasis pengetahuan Nusantara',

    onboarding2Kicker: 'Etnomedisin Nusantara',
    onboarding2Title: 'Jelajahi Warisan Rempah & Racikan Jamu Leluhur.',
    onboarding2Desc:
      'Kenali khasiat tanaman rimpang, daun berkhasiat, dan tradisi godokan dari berbagai penjuru kepulauan Indonesia.',
    onboarding2Feat1: 'Eksplorasi Jahe, Kunyit, Temulawak, Bawang Dayak, dan puluhan rempah lain',
    onboarding2Feat2: 'Resep godokan jamu turun-temurun dengan takaran penyeduhan yang aman',
    onboarding2Feat3: 'Dokumentasikan resep tradisi keluarga secara mandiri di Rempah Pedia',

    onboarding3Kicker: 'Berbasis Bukti Ilmiah',
    onboarding3Title: 'Pahami Bukti Medis & Bangun Kebiasaan Hidup Sehat.',
    onboarding3Desc:
      'Pisahkan fakta dari mitos kesehatan dengan tinjauan sains objektif, serta pantau hidrasi dan pola hidup sehat harianmu.',
    onboarding3Feat1: 'Uji mitos vs fakta kesehatan dengan indikator kekuatan bukti objektif',
    onboarding3Feat2: 'Pemeriksaan keamanan produk makanan & minuman via Open Food Facts',
    onboarding3Feat3: 'Jurnal kebiasaan minum air dan catatan gaya hidup sehat harian',

    // Home Screen
    greeting: 'Halo, {name}',
    greetingSub: 'Yuk, jaga kesehatan mulai dari hal kecil hari ini!',
    searchPlaceholderHome: 'Cari topik kesehatan, tanaman, dll...',
    siluhurCheckBannerTitle: 'SiLuhur Check',
    siluhurCheckBannerDesc: 'Cek fakta, hoaks, dan klaim kesehatan yang beredar.',
    quickMenuJejak: 'Jejak Sehat\nNusantara',
    quickMenuHidup: 'Hidup\nSehat',
    quickMenuProduk: 'Cek Produk\nKesehatan',
    pustakaTitle: 'Pustaka Kesehatan',
    pustakaDesc: 'Referensi terpercaya untuk hidup lebih sehat.',
    popularTopics: 'Topik Populer',
    notificationsTitle: 'Notifikasi & Pengingat Sehat',
    noNotification: 'Belum ada notifikasi baru hari ini.',

    // Fact Check Screen
    factCheckHeroTitle: 'Mitos atau Fakta?',
    factCheckHeroDesc: 'Cek kebenaran klaim kesehatan yang mungkin kamu dengar.',
    factCheckInputPlaceholder: 'Ketik klaim yang ingin dicek...',
    factCheckBtn: 'Cek Klaim Sekarang',
    factCheckLoading: 'Kakek Luhur sedang menganalisis bukti ilmiah...',
    commonClaimsTitle: 'Contoh klaim yang sering dicari',
    verdictFact: 'Fakta',
    verdictMyth: 'Mitos',
    verdictInsufficient: 'Belum Cukup Bukti',
    evidenceStrength: 'Kekuatan Bukti Ilmiah',
    evidenceStrong: 'Kuat (Teruji Uji Klinis)',
    evidenceModerate: 'Sedang (Uji Hewan/Awal)',
    evidenceLimited: 'Terbatas (In-Vitro)',
    evidenceAnecdotal: 'Empiris / Anekdotal',
    scientificEvidenceSection: 'Tinjauan Ilmiah & Bukti',
    culturalContextSection: 'Asal & Konteks Budaya',
    safetyCautionSection: 'Peringatan & Keamanan Medis',
    referencesSection: 'Sumber & Referensi Medis',

    // Explore Screen
    exploreTitle: 'Jejak Sehat Nusantara',
    exploreHeroSubtitle: 'Kenali kekayaan alam dan tradisi kesehatan dari berbagai daerah.',
    searchHerbPlaceholder: 'Cari tanaman, pangan, atau tradisi...',
    filterAll: 'Semua',
    filterPlant: 'Tanaman',
    filterFood: 'Pangan',
    filterTradition: 'Tradisi',
    allRegions: 'Semua Wilayah',
    keyBenefits: 'Manfaat Utama',
    seeRelatedTradition: 'Lihat Tradisi Terkait',

    // Product Check (FoodFacts)
    foodFactsTitle: 'Cek Produk Kesehatan',
    foodFactsSubtitle: 'Pastikan produk yang kamu gunakan aman, legal, dan sesuai standar.',
    barcodeSearch: 'Cek Barcode Produk',
    barcodeInputPlaceholder: 'Ketik atau pilih barcode (misal: 3017620422003)',
    searchProductsTag: 'Cari Produk Mengandung Rempah',
    searchProductsTagPlaceholder: 'Cari bahan (contoh: ginger, turmeric, tea)',
    searchBtn: 'Cari',
    lookupBtn: 'Periksa Barcode',
    nutritionInfo: 'Informasi Nilai Gizi',
    ingredients: 'Komposisi Bahan',
    allergens: 'Alergen Terdeteksi',
    noneAllergens: 'Tidak ada peringatan alergen khusus.',

    // Tracker / Hidup Sehat
    trackerHeading: 'Hidup Sehat',
    trackerTabsAll: 'Semua',
    trackerTabsFood: 'Makan',
    trackerTabsSleep: 'Tidur',
    trackerTabsActivity: 'Aktivitas',
    waterTrackerTitle: 'Catatan Minum Air Putih',
    waterTarget: 'Target Harian: 2.000 ml (8 Gelas)',
    addGlass: '+ 1 Gelas (250 ml)',
    resetWater: 'Reset Air',
    habitsTitle: 'Kebiasaan Sehat Nusantara',

    // Assistant / Tanya Kakek Luhur
    assistantTitleHeading: 'Tanya Kakek Luhur',
    assistantOnline: 'Online · Penasehat Kearifan & EBM',
    assistantDisclaimer:
      'Jawaban asisten AI bersumber pada pengetahuan etnobotani dan telaah bukti ilmiah, bukan pengganti konsultasi dokter klinis.',
    assistantInputPlaceholder: 'Tanyakan tentang rempah, jamu, atau keluhan kesehatan...',
    suggestedQuestions: 'Pertanyaan yang sering ditanyakan',

    // Profile Screen
    profileHeading: 'Profil & Koleksi',
    favoritesTitle: 'Tanaman & Rempah Favorit',
    emptyFavorites: 'Belum ada tanaman yang disimpan ke favorit. Jelajahi menu Eksplorasi!',
    rempahDocsTitle: 'Dokumentasi Rempah Pedia',
    therapiesMenu: 'Panduan Terapi Tradisional',
    ethicsMenu: 'Etika Ilmiah & Batasan Medis SiLuhur',
    resetTrackerBtn: 'Reset Data Tracker Lokal',
    languageSwitcherTitle: 'Pilihan Bahasa / Language',
    guestUser: 'Tamu (Guest)',
    notLoggedIn: 'Belum masuk ke akun',
    literacyLevel: 'Literasi Kesehatan Level',

    // Logout Modal
    logoutConfirmTitle: 'Keluar dari Akun?',
    logoutConfirmDesc:
      'Apakah kamu yakin ingin keluar dari akun SiLuhur? Kamu dapat masuk kembali kapan saja untuk mengakses riwayat dan favoritmu.',
    logoutConfirmBtn: 'Ya, Logout',
  },

  en: {
    // Brand & App
    appName: 'SiLuhur',
    appTagline: 'Preserving Heritage, Understanding Evidence.',
    ebmBadge: 'EBM & Wisdom',
    badgeSub: 'Indonesian Ethnomedicine · Evidence-Based',

    // Nav Labels
    navHome: 'Home',
    navExplore: 'Explore',
    navFactCheck: 'Fact Check',
    navTracker: 'Healthy Habits',
    navProfile: 'Profile',
    navFoodFacts: 'Product Check',
    navTherapies: 'Therapies',
    navRempahPedia: 'Spice Pedia',
    navAssistant: 'Ask Grandpa Luhur',

    // Drawer Descriptions
    homeDesc: 'Summary & featured insights',
    exploreDesc: 'Indonesian Heritage & Medicinal Herbs',
    factCheckDesc: 'Verify health claims & myths',
    trackerDesc: 'Hydration logs & lifestyle habits',
    foodFactsDesc: 'Barcodes & Open Food Facts data',
    therapiesDesc: 'Decoctions & safe acupressure',
    rempahPediaDesc: 'Family recipes & herbal chronicles',
    assistantDesc: 'Wisdom & scientific consultation',
    profileDesc: 'Manage profile & saved recipes',
    ethicsDesc: 'Scientific principles & transparency',

    // Common Actions
    login: 'Sign In',
    logout: 'Log Out',
    register: 'Sign Up',
    askAi: 'Ask Grandpa Luhur',
    askAiShort: 'Ask AI',
    menu: 'Menu',
    close: 'Close',
    cancel: 'Cancel',
    confirm: 'Confirm',
    back: 'Back',
    next: 'Next',
    prev: 'Previous',
    skip: 'Skip',
    startNow: 'Get Started',
    search: 'Search...',
    understand: 'I Understand',
    seeAll: 'View All',
    viewDetail: 'View Detail',
    share: 'Share',
    bookmark: 'Bookmark',
    saved: 'Saved',
    language: 'Language',
    send: 'Send',

    // Splash Screen
    splashMenyiapkan: 'Preparing wellness knowledge...',
    splashTapToSkip: 'Tap screen to skip',

    // Onboarding
    onboarding1Kicker: 'Heritage & Knowledge',
    onboarding1Title: 'Health is Not Merely Medicine, but Also Knowledge.',
    onboarding1Desc:
      'SiLuhur is here to help you discover health deeper, from modern science to Indonesian ancestral wisdom.',
    onboarding1Feat1: 'Ethnomedicine database across 38 provinces in Indonesia',
    onboarding1Feat2: 'Backed by modern Evidence-Based Medicine (EBM) verification',
    onboarding1Feat3: 'Ask Grandpa Luhur — intelligent AI grounded in local wisdom',

    onboarding2Kicker: 'Indonesian Ethnomedicine',
    onboarding2Title: 'Explore the Heritage of Spices & Ancestral Jamu.',
    onboarding2Desc:
      'Discover the therapeutic benefits of rhizomes, medicinal leaves, and herbal decoction traditions.',
    onboarding2Feat1: 'Explore Ginger, Turmeric, Java Turmeric, Dayak Onion, and more',
    onboarding2Feat2: 'Generational jamu recipes with safe brewing ratios and dosage',
    onboarding2Feat3: 'Document personal and family traditional remedies in Spice Pedia',

    onboarding3Kicker: 'Evidence-Based Science',
    onboarding3Title: 'Understand Medical Evidence & Build Healthy Habits.',
    onboarding3Desc:
      'Separate medical facts from health myths with objective science reviews, while tracking your daily habits.',
    onboarding3Feat1: 'Examine myths vs facts with clear evidence strength indicators',
    onboarding3Feat2: 'Product safety & barcode verification via Open Food Facts',
    onboarding3Feat3: 'Daily hydration logging and actionable healthy living guides',

    // Home Screen
    greeting: 'Hello, {name}',
    greetingSub: 'Start nurturing your health with small positive steps today!',
    searchPlaceholderHome: 'Search health topics, herbs, spices...',
    siluhurCheckBannerTitle: 'SiLuhur Check',
    siluhurCheckBannerDesc: 'Verify health claims, hoaxes, and trending myths.',
    quickMenuJejak: 'Archipelago\nHealth Trail',
    quickMenuHidup: 'Healthy\nHabits',
    quickMenuProduk: 'Product\nSafety Check',
    pustakaTitle: 'Health Library',
    pustakaDesc: 'Trusted references for healthier living.',
    popularTopics: 'Popular Topics',
    notificationsTitle: 'Notifications & Health Reminders',
    noNotification: 'No new notifications today.',

    // Fact Check Screen
    factCheckHeroTitle: 'Myth or Fact?',
    factCheckHeroDesc: 'Verify the truth of health claims you might have heard.',
    factCheckInputPlaceholder: 'Type a health claim to verify...',
    factCheckBtn: 'Verify Claim Now',
    factCheckLoading: 'Grandpa Luhur is evaluating medical evidence...',
    commonClaimsTitle: 'Frequently searched claims',
    verdictFact: 'Fact',
    verdictMyth: 'Myth',
    verdictInsufficient: 'Insufficient Evidence',
    evidenceStrength: 'Scientific Evidence Strength',
    evidenceStrong: 'Strong (Clinical Trials / RCT)',
    evidenceModerate: 'Moderate (In-Vivo / Animal Models)',
    evidenceLimited: 'Limited (In-Vitro Tests)',
    evidenceAnecdotal: 'Empirical / Anecdotal',
    scientificEvidenceSection: 'Scientific Review & Evidence',
    culturalContextSection: 'Cultural Origin & Context',
    safetyCautionSection: 'Medical Warnings & Precautions',
    referencesSection: 'Medical Sources & References',

    // Explore Screen
    exploreTitle: 'Archipelago Health Trail',
    exploreHeroSubtitle: 'Discover natural heritage and healing traditions across Indonesian regions.',
    searchHerbPlaceholder: 'Search herbs, foods, or healing traditions...',
    filterAll: 'All',
    filterPlant: 'Herbs & Plants',
    filterFood: 'Food',
    filterTradition: 'Traditions',
    allRegions: 'All Regions',
    keyBenefits: 'Key Benefits',
    seeRelatedTradition: 'View Related Tradition',

    // Product Check (FoodFacts)
    foodFactsTitle: 'Health Product Check',
    foodFactsSubtitle: 'Ensure health products you consume are safe, legal, and authentic.',
    barcodeSearch: 'Product Barcode Lookup',
    barcodeInputPlaceholder: 'Type or choose barcode (e.g. 3017620422003)',
    searchProductsTag: 'Search Products Containing Herbal Ingredients',
    searchProductsTagPlaceholder: 'Search ingredients (e.g., ginger, turmeric, tea)',
    searchBtn: 'Search',
    lookupBtn: 'Check Barcode',
    nutritionInfo: 'Nutrition Facts',
    ingredients: 'Ingredients',
    allergens: 'Allergens Detected',
    noneAllergens: 'No specific allergen alerts found.',

    // Tracker / Hidup Sehat
    trackerHeading: 'Healthy Living',
    trackerTabsAll: 'All',
    trackerTabsFood: 'Diet',
    trackerTabsSleep: 'Sleep',
    trackerTabsActivity: 'Activity',
    waterTrackerTitle: 'Daily Water Hydration Tracker',
    waterTarget: 'Daily Goal: 2,000 ml (8 Glasses)',
    addGlass: '+ 1 Glass (250 ml)',
    resetWater: 'Reset Water',
    habitsTitle: 'Holistic Healthy Habits',

    // Assistant / Tanya Kakek Luhur
    assistantTitleHeading: 'Ask Grandpa Luhur',
    assistantOnline: 'Online · Wisdom & EBM Advisor',
    assistantDisclaimer:
      'AI responses are educational and grounded in ethnomedicine and scientific reviews, not a substitute for clinical medical diagnosis.',
    assistantInputPlaceholder: 'Ask about Indonesian herbs, jamu, or wellness inquiries...',
    suggestedQuestions: 'Frequently asked questions',

    // Profile Screen
    profileHeading: 'Profile & Collection',
    favoritesTitle: 'Bookmarked Herbs & Spices',
    emptyFavorites: 'No items saved to favorites yet. Explore the Archipelago tab!',
    rempahDocsTitle: 'Spice Pedia Documentation',
    therapiesMenu: 'Traditional Therapy Guides',
    ethicsMenu: 'Scientific Ethics & Medical Boundaries',
    resetTrackerBtn: 'Reset Local Tracker Data',
    languageSwitcherTitle: 'Language Preferences / Bahasa',
    guestUser: 'Guest',
    notLoggedIn: 'Not signed in',
    literacyLevel: 'Health Literacy Level',

    // Logout Modal
    logoutConfirmTitle: 'Sign out of your account?',
    logoutConfirmDesc:
      'Are you sure you want to log out of SiLuhur? You can sign back in anytime to access your bookmarks and history.',
    logoutConfirmBtn: 'Yes, Sign Out',
  },
};

export type TranslationKey = keyof typeof translations.id;
