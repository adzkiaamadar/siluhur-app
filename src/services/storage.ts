import {
  HabitItem,
  FoodLog,
  SleepLog,
  ActivityLog,
  RempahDocumentation,
  UserProfile,
} from '../types';

const HABITS_KEY = 'siluhur_habits_v1';
const FOOD_LOGS_KEY = 'siluhur_food_logs_v1';
const SLEEP_LOGS_KEY = 'siluhur_sleep_logs_v1';
const ACTIVITY_LOGS_KEY = 'siluhur_activity_logs_v1';
const REMPAH_DOCS_KEY = 'siluhur_rempah_docs_v1';
const BOOKMARKS_KEY = 'siluhur_bookmarks_v1';

export const DEFAULT_HABITS: HabitItem[] = [
  {
    id: 'habit-1',
    title: 'Minum Air Putih 2 Liter',
    category: 'air',
    target: '8 Gelas / Hari',
    completed: true,
    iconName: 'Droplets',
  },
  {
    id: 'habit-2',
    title: 'Konsumsi Seduhan Jamu / Herbal Sehat',
    category: 'jamu',
    target: '1 Cangkir Hangat',
    completed: true,
    iconName: 'Coffee',
  },
  {
    id: 'habit-3',
    title: 'Jalan Santai / Bergerak Aktif 30 Menit',
    category: 'gerak',
    target: '30 Menit',
    completed: false,
    iconName: 'Footprints',
  },
  {
    id: 'habit-4',
    title: 'Tidur Cukup & Istirahat Berkualitas',
    category: 'tidur',
    target: '7-8 Jam Malam',
    completed: false,
    iconName: 'Moon',
  },
  {
    id: 'habit-5',
    title: 'Isi Piringku: Sayur, Buah & Rempah Alami',
    category: 'pola_makan',
    target: '3 Porsi Nutrisi',
    completed: true,
    iconName: 'Utensils',
  },
];

const INITIAL_REMPAH_DOCS: RempahDocumentation[] = [
  {
    id: 'rempah-initial-1',
    plantName: 'Kencur (Cikur)',
    localName: 'Kaempferia galanga',
    region: 'Jawa Barat (Sunda)',
    inheritedStory:
      'Resep turun-temurun dari Nenek di Sumedang: saat batuk berdahak atau suara serak sehabis bernyanyi/mengajar, kencur segar diparut, diperas, dicampur sejumput garam dapur, lalu diminum perlahan.',
    traditionalUse: 'Meredakan batuk berdahak, menghangatkan pita suara, dan menyegarkan tenggorokan.',
    safetyCaution: 'Gunakan garam sedikit saja. Hindari jika memiliki radang tenggorokan luka akut bernanah.',
    categoryTag: 'Rimpang Dapur',
    isEvidenceBased: true,
    authorName: 'Amada (Dokumentasi Keluarga)',
    createdAt: '2026-10-24',
    photoUrl: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 'rempah-initial-2',
    plantName: 'Daun Sirih Hijau',
    localName: 'Piper betle',
    region: 'Jawa Tengah & Sumatra',
    inheritedStory:
      'Tradisi "Nginang" para sesepuh dengan daun sirih, gambir, dan kapur sirih dipercaya menjaga gigi tetap kuat sampai usia lanjut. Untuk air rebusan, digunakan ibu untuk membasuh area kewanitaan.',
    traditionalUse: 'Antiseptik alami, pembersih luka ringan luar, dan penjaga kesehatan gigi.',
    safetyCaution: 'Rebusan sirih untuk organ intim sebaiknya tidak digunakan setiap hari terus-menerus agar pH alami dan bakteri baik (Lactobacillus) tidak terganggu.',
    categoryTag: 'Daun Obat',
    isEvidenceBased: true,
    authorName: 'Ibu Ratna',
    createdAt: '2026-10-18',
    photoUrl: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=400&q=80',
  },
];

export const StorageService = {
  getHabits(): HabitItem[] {
    try {
      const data = localStorage.getItem(HABITS_KEY);
      return data ? JSON.parse(data) : DEFAULT_HABITS;
    } catch {
      return DEFAULT_HABITS;
    }
  },

  saveHabits(habits: HabitItem[]): void {
    try {
      localStorage.setItem(HABITS_KEY, JSON.stringify(habits));
    } catch (e) {
      console.warn('Failed to save habits:', e);
    }
  },

  getFoodLogs(): FoodLog[] {
    try {
      const data = localStorage.getItem(FOOD_LOGS_KEY);
      if (data) return JSON.parse(data);
      // default mock initial logs
      return [
        {
          id: 'food-init-1',
          date: 'Hari ini, 07:30',
          mealType: 'Sarapan',
          foodName: 'Oatmeal Pisang & Seduhan Wedang Jahe',
          herbsIncluded: 'Jahe merah geprek & kayu manis bubuk',
          vegetablePortion: 'Sedang',
          hydrationGlasses: 2,
          notes: 'Badan terasa hangat dan lambung nyaman.',
        },
        {
          id: 'food-init-2',
          date: 'Hari ini, 12:45',
          mealType: 'Makan Siang',
          foodName: 'Nasi Merah, Sayur Bening Kelor & Tempe Bacem',
          herbsIncluded: 'Bawang putih, kunci, daun kelor segar',
          vegetablePortion: 'Banyak',
          hydrationGlasses: 3,
          notes: 'Kenyang lebih awet dan tidak mengantuk.',
        },
      ];
    } catch {
      return [];
    }
  },

  addFoodLog(log: Omit<FoodLog, 'id'>): FoodLog {
    const newLog: FoodLog = { ...log, id: 'food-' + Date.now() };
    const logs = [newLog, ...this.getFoodLogs()];
    try {
      localStorage.setItem(FOOD_LOGS_KEY, JSON.stringify(logs));
    } catch (e) {
      console.warn('Failed to save food log:', e);
    }
    return newLog;
  },

  getSleepLogs(): SleepLog[] {
    try {
      const data = localStorage.getItem(SLEEP_LOGS_KEY);
      if (data) return JSON.parse(data);
      return [
        {
          id: 'sleep-init-1',
          date: 'Semalam',
          durationHours: 7.5,
          quality: 'Nyenyak',
          herbalTeaTaken: true,
          notes: 'Minum teh sereh hangat jam 9 malam, tidur jam 10 malam bangun jam 5.30 segar.',
        },
      ];
    } catch {
      return [];
    }
  },

  addSleepLog(log: Omit<SleepLog, 'id'>): SleepLog {
    const newLog: SleepLog = { ...log, id: 'sleep-' + Date.now() };
    const logs = [newLog, ...this.getSleepLogs()];
    try {
      localStorage.setItem(SLEEP_LOGS_KEY, JSON.stringify(logs));
    } catch (e) {
      console.warn('Failed to save sleep log:', e);
    }
    return newLog;
  },

  getActivityLogs(): ActivityLog[] {
    try {
      const data = localStorage.getItem(ACTIVITY_LOGS_KEY);
      if (data) return JSON.parse(data);
      return [
        {
          id: 'act-init-1',
          date: 'Pagi ini',
          activityName: 'Jalan Santai Keliling Kompleks',
          durationMinutes: 30,
          intensity: 'Ringan',
          notes: 'Menikmati sinar matahari pagi dan udara sejuk.',
        },
      ];
    } catch {
      return [];
    }
  },

  addActivityLog(log: Omit<ActivityLog, 'id'>): ActivityLog {
    const newLog: ActivityLog = { ...log, id: 'act-' + Date.now() };
    const logs = [newLog, ...this.getActivityLogs()];
    try {
      localStorage.setItem(ACTIVITY_LOGS_KEY, JSON.stringify(logs));
    } catch (e) {
      console.warn('Failed to save activity log:', e);
    }
    return newLog;
  },

  getRempahDocs(): RempahDocumentation[] {
    try {
      const data = localStorage.getItem(REMPAH_DOCS_KEY);
      return data ? JSON.parse(data) : INITIAL_REMPAH_DOCS;
    } catch {
      return INITIAL_REMPAH_DOCS;
    }
  },

  addRempahDoc(doc: Omit<RempahDocumentation, 'id' | 'createdAt'>): RempahDocumentation {
    const newDoc: RempahDocumentation = {
      ...doc,
      id: 'doc-' + Date.now(),
      createdAt: new Date().toISOString().split('T')[0],
    };
    const docs = [newDoc, ...this.getRempahDocs()];
    try {
      localStorage.setItem(REMPAH_DOCS_KEY, JSON.stringify(docs));
    } catch (e) {
      console.warn('Failed to save rempah doc:', e);
    }
    return newDoc;
  },

  getBookmarks(): string[] {
    try {
      const data = localStorage.getItem(BOOKMARKS_KEY);
      return data ? JSON.parse(data) : ['jahe', 'kunyit', 'kerokan'];
    } catch {
      return ['jahe', 'kunyit', 'kerokan'];
    }
  },

  toggleBookmark(id: string): boolean {
    const list = this.getBookmarks();
    const index = list.indexOf(id);
    let isBookmarked = false;
    if (index >= 0) {
      list.splice(index, 1);
      isBookmarked = false;
    } else {
      list.push(id);
      isBookmarked = true;
    }
    try {
      localStorage.setItem(BOOKMARKS_KEY, JSON.stringify(list));
    } catch (e) {
      console.warn('Failed to save bookmarks:', e);
    }
    return isBookmarked;
  },

  getRegisteredUsers(): Array<UserProfile & { password: string }> {
    const REGISTERED_KEY = 'siluhur_registered_accounts_v1';
    try {
      const data = localStorage.getItem(REGISTERED_KEY);
      if (data) return JSON.parse(data);
    } catch (e) {
      console.warn('Failed to get registered users:', e);
    }
    // Seed initial demo account (neutral, no personal data)
    const initialAccounts: Array<UserProfile & { password: string }> = [
      {
        id: 'usr-demo-1',
        name: 'Sahabat Luhur',
        email: 'sahabat@siluhur.id',
        password: 'password123',
        role: 'member',
        joinedDate: 'November 2026',
        literacyLevel: 3,
      },
    ];
    try {
      localStorage.setItem(REGISTERED_KEY, JSON.stringify(initialAccounts));
    } catch {}
    return initialAccounts;
  },

  registerUser(name: string, email: string, password: string): { success: boolean; user?: UserProfile; error?: string } {
    const trimmedName = name.trim();
    const trimmedEmail = email.trim().toLowerCase();
    const trimmedPassword = password.trim();

    if (!trimmedName || !trimmedEmail || !trimmedPassword) {
      return { success: false, error: 'Semua kolom wajib diisi.' };
    }

    if (trimmedPassword.length < 6) {
      return { success: false, error: 'Kata sandi minimal harus 6 karakter.' };
    }

    const accounts = this.getRegisteredUsers();
    const existing = accounts.find((acc) => acc.email.toLowerCase() === trimmedEmail);
    if (existing) {
      return { success: false, error: 'Email ini sudah terdaftar. Silakan pilih tab Masuk.' };
    }

    const now = new Date();
    const monthNames = [
      'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
      'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
    ];
    const joinedDate = `${monthNames[now.getMonth()]} ${now.getFullYear()}`;

    const newUser: UserProfile = {
      id: 'usr-' + Date.now(),
      name: trimmedName,
      email: trimmedEmail,
      role: 'member',
      joinedDate,
      literacyLevel: 1,
    };

    const newAccount = { ...newUser, password: trimmedPassword };
    accounts.push(newAccount);

    try {
      localStorage.setItem('siluhur_registered_accounts_v1', JSON.stringify(accounts));
      this.saveUser(newUser);
      return { success: true, user: newUser };
    } catch (e) {
      console.error('Registration failed:', e);
      return { success: false, error: 'Gagal menyimpan akun ke penyimpanan lokal.' };
    }
  },

  loginUser(email: string, password: string): { success: boolean; user?: UserProfile; error?: string } {
    const trimmedEmail = email.trim().toLowerCase();
    const trimmedPassword = password.trim();

    if (!trimmedEmail || !trimmedPassword) {
      return { success: false, error: 'Silakan isi email dan kata sandi.' };
    }

    const accounts = this.getRegisteredUsers();
    const match = accounts.find((acc) => acc.email.toLowerCase() === trimmedEmail);

    if (!match) {
      return {
        success: false,
        error: 'Akun dengan email ini belum terdaftar. Silakan klik "Daftar Baru".',
      };
    }

    if (match.password !== trimmedPassword) {
      return {
        success: false,
        error: 'Kata sandi salah. Silakan periksa kembali kata sandi Anda.',
      };
    }

    const { password: _, ...userProfile } = match;
    this.saveUser(userProfile);
    return { success: true, user: userProfile };
  },

  getUser(): UserProfile | null {
    const USER_KEY = 'siluhur_user_profile_v1';
    try {
      const data = localStorage.getItem(USER_KEY);
      if (data) return JSON.parse(data);
    } catch (e) {
      console.warn('Failed to get user:', e);
    }
    return null;
  },

  saveUser(user: UserProfile): void {
    const USER_KEY = 'siluhur_user_profile_v1';
    try {
      localStorage.setItem(USER_KEY, JSON.stringify(user));
    } catch (e) {
      console.warn('Failed to save user:', e);
    }
  },

  logoutUser(): void {
    const USER_KEY = 'siluhur_user_profile_v1';
    try {
      localStorage.removeItem(USER_KEY);
    } catch (e) {
      console.warn('Failed to remove user:', e);
    }
  },
};
