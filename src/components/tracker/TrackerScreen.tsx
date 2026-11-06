import React, { useState } from 'react';
import {
  ArrowLeft,
  CheckCircle,
  Plus,
  Utensils,
  Moon,
  Footprints,
  Droplets,
  Coffee,
  Heart,
  BookOpen,
  ArrowRight,
  Sparkles,
  Menu,
} from 'lucide-react';
import { HabitItem, FoodLog, SleepLog, ActivityLog } from '../../types';
import { StorageService } from '../../services/storage';
import { HEALTH_TIPS, HealthTipArticle } from '../../data/healthTips';
import confetti from 'canvas-confetti';
import { useLanguage, LanguageToggle } from '../../i18n/LanguageContext';

interface TrackerScreenProps {
  onBack?: () => void;
}

export function TrackerScreen({ onBack }: TrackerScreenProps) {
  const [activeCategory, setActiveCategory] = useState<'Semua' | 'Makan' | 'Tidur' | 'Aktivitas'>('Semua');
  const { t, language } = useLanguage();

  // Habits state
  const [habits, setHabits] = useState<HabitItem[]>(() => StorageService.getHabits());

  // Logs state
  const [foodLogs, setFoodLogs] = useState<FoodLog[]>(() => StorageService.getFoodLogs());
  const [sleepLogs, setSleepLogs] = useState<SleepLog[]>(() => StorageService.getSleepLogs());
  const [activityLogs, setActivityLogs] = useState<ActivityLog[]>(() => StorageService.getActivityLogs());

  // Modal states
  const [showFoodModal, setShowFoodModal] = useState(false);
  const [showSleepModal, setShowSleepModal] = useState(false);
  const [showActivityModal, setShowActivityModal] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState<HealthTipArticle | null>(null);

  // Form states
  const [foodForm, setFoodForm] = useState({
    mealType: 'Sarapan' as const,
    foodName: '',
    herbsIncluded: '',
    vegetablePortion: 'Sedang' as const,
    hydrationGlasses: 2,
    notes: '',
  });

  const [sleepForm, setSleepForm] = useState({
    durationHours: 7,
    quality: 'Nyenyak' as const,
    herbalTeaTaken: true,
    notes: '',
  });

  const [activityForm, setActivityForm] = useState({
    activityName: '',
    durationMinutes: 30,
    intensity: 'Ringan' as const,
    notes: '',
  });

  const toggleHabit = (id: string) => {
    const updated = habits.map((h) =>
      h.id === id ? { ...h, completed: !h.completed } : h
    );
    setHabits(updated);
    StorageService.saveHabits(updated);

    // If all completed, trigger celebratory confetti!
    if (updated.every((h) => h.completed)) {
      confetti({ particleCount: 50, spread: 60 });
    }
  };

  const handleAddFood = (e: React.FormEvent) => {
    e.preventDefault();
    if (!foodForm.foodName.trim()) return;

    const newLog = StorageService.addFoodLog({
      date: 'Hari ini, ' + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      ...foodForm,
    });
    setFoodLogs([newLog, ...foodLogs]);
    setShowFoodModal(false);
    setFoodForm({
      mealType: 'Sarapan',
      foodName: '',
      herbsIncluded: '',
      vegetablePortion: 'Sedang',
      hydrationGlasses: 2,
      notes: '',
    });
  };

  const handleAddSleep = (e: React.FormEvent) => {
    e.preventDefault();
    const newLog = StorageService.addSleepLog({
      date: 'Semalam',
      ...sleepForm,
    });
    setSleepLogs([newLog, ...sleepLogs]);
    setShowSleepModal(false);
  };

  const handleAddActivity = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activityForm.activityName.trim()) return;
    const newLog = StorageService.addActivityLog({
      date: 'Hari ini',
      ...activityForm,
    });
    setActivityLogs([newLog, ...activityLogs]);
    setShowActivityModal(false);
    setActivityForm({
      activityName: '',
      durationMinutes: 30,
      intensity: 'Ringan',
      notes: '',
    });
  };

  // Filtered health tips
  const filteredTips = HEALTH_TIPS.filter(
    (tip) => activeCategory === 'Semua' || tip.category === activeCategory
  );

  const completedCount = habits.filter((h) => h.completed).length;

  return (
    <div className="flex-1 w-full bg-[#FAF6F0] pb-24 md:pb-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 space-y-5 sm:space-y-6">
        {/* Top Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {onBack && (
              <button
                onClick={onBack}
                className="w-10 h-10 rounded-xl bg-white border border-stone-200 flex items-center justify-center text-stone-700 hover:bg-stone-50 shadow-2xs transition-colors"
                title={t('back')}
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
            )}
            <h1 className="text-base sm:text-lg font-bold text-[#1E201E] font-['Outfit']">
              {t('trackerHeading')}
            </h1>
          </div>

          <LanguageToggle />
        </div>

        {/* Category Filter Pills (matching screen 6: Semua, Makan, Tidur, Aktivitas) */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
          {[
            { id: 'Semua', label: t('trackerTabsAll') },
            { id: 'Makan', label: t('trackerTabsFood') },
            { id: 'Tidur', label: t('trackerTabsSleep') },
            { id: 'Aktivitas', label: t('trackerTabsActivity') },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id as any)}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all shadow-2xs ${
                activeCategory === cat.id
                  ? 'bg-[#253D32] text-white'
                  : 'bg-white text-stone-600 border border-stone-200 hover:bg-stone-50'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Responsive Grid: 1 Col Mobile, 12 Col Desktop */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 items-start">
          {/* Left Column (7 cols desktop): Habits & Quick Action Logs */}
          <div className="lg:col-span-7 space-y-4 sm:space-y-5">
            {/* Habit Tracker Progress Card */}
            <div className="p-4 sm:p-5 rounded-2xl bg-white border border-stone-200/90 shadow-2xs">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h2 className="text-xs sm:text-sm font-bold text-stone-900 font-['Outfit']">
                    {language === 'id' ? 'Target Kebiasaan Hari Ini' : "Today's Habit Goals"}
                  </h2>
                  <p className="text-[11px] text-stone-500 mt-0.5">
                    {language === 'id'
                      ? `${completedCount} dari ${habits.length} kebiasaan tercapai`
                      : `${completedCount} of ${habits.length} habits achieved`}
                  </p>
                </div>
                <span className="text-xs font-bold text-[#A64F36] bg-[#FBF0EB] px-2.5 py-1 rounded-full border border-[#F2D7CD]">
                  {Math.round((completedCount / habits.length) * 100)}%
                </span>
              </div>

              {/* Progress Bar */}
              <div className="w-full h-2 bg-stone-100 rounded-full overflow-hidden mb-3.5">
                <div
                  className="h-full bg-[#253D32] transition-all duration-500 rounded-full"
                  style={{ width: `${(completedCount / habits.length) * 100}%` }}
                />
              </div>

              {/* Habits Checklist */}
              <div className="space-y-2">
                {habits.map((habit) => {
                  const habitTitle =
                    language === 'en'
                      ? habit.title === 'Minum 8 Gelas Air'
                        ? 'Drink 8 Glasses of Water'
                        : habit.title === 'Konsumsi Jamu / Rempah'
                        ? 'Consume Jamu / Herbal Brew'
                        : habit.title === 'Jalan Kaki Ringan'
                        ? 'Light Walking / Activity'
                        : habit.title === 'Tidur Cukup 7-8 Jam'
                        ? 'Adequate Sleep (7-8 hrs)'
                        : habit.title
                      : habit.title;

                  const habitTarget =
                    language === 'en'
                      ? habit.target === '2.000 ml hidrasi harian'
                        ? '2,000 ml daily hydration'
                        : habit.target === 'Kunyit, jahe, atau temulawak'
                        ? 'Turmeric, ginger, or java turmeric'
                        : habit.target === 'Minimal 3.000 langkah'
                        ? 'Minimum 3,000 steps'
                        : habit.target === 'Sebelum jam 23.00'
                        ? 'Before 11:00 PM'
                        : habit.target
                      : habit.target;

                  return (
                    <div
                      key={habit.id}
                      onClick={() => toggleHabit(habit.id)}
                      className={`p-3 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                        habit.completed
                          ? 'bg-[#F2F5ED] border-[#DFE5D5] text-[#253D32]'
                          : 'bg-[#FAF6F0] border-stone-200/70 text-stone-700 hover:bg-stone-50'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <div
                          className={`w-5 h-5 rounded-full flex items-center justify-center transition-colors shrink-0 ${
                            habit.completed ? 'bg-[#253D32] text-white' : 'border-2 border-stone-300'
                          }`}
                        >
                          {habit.completed && <CheckCircle className="w-4 h-4 stroke-[2.5]" />}
                        </div>
                        <div>
                          <p className="text-xs font-semibold leading-tight">{habitTitle}</p>
                          <p className="text-[10px] text-stone-400 mt-0.5">{habitTarget}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Quick Log Action Bar */}
            <div className="grid grid-cols-3 gap-2.5">
              <button
                onClick={() => setShowFoodModal(true)}
                className="p-3 bg-white border border-stone-200/90 rounded-2xl shadow-2xs hover:border-[#6E7953] hover:shadow-xs transition-all text-center flex flex-col items-center group"
              >
                <div className="w-8 h-8 rounded-lg bg-[#FBF0EB] flex items-center justify-center text-[#A64F36] mb-1.5 group-hover:scale-105 transition-transform">
                  <Utensils className="w-4 h-4" />
                </div>
                <span className="text-[11px] font-semibold text-stone-800">
                  {language === 'id' ? '+ Catat Makan' : '+ Log Meal'}
                </span>
              </button>

              <button
                onClick={() => setShowSleepModal(true)}
                className="p-3 bg-white border border-stone-200/90 rounded-2xl shadow-2xs hover:border-[#6E7953] hover:shadow-xs transition-all text-center flex flex-col items-center group"
              >
                <div className="w-8 h-8 rounded-lg bg-[#F2F5ED] flex items-center justify-center text-[#253D32] mb-1.5 group-hover:scale-105 transition-transform">
                  <Moon className="w-4 h-4" />
                </div>
                <span className="text-[11px] font-semibold text-stone-800">
                  {language === 'id' ? '+ Catat Tidur' : '+ Log Sleep'}
                </span>
              </button>

              <button
                onClick={() => setShowActivityModal(true)}
                className="p-3 bg-white border border-stone-200/90 rounded-2xl shadow-2xs hover:border-[#6E7953] hover:shadow-xs transition-all text-center flex flex-col items-center group"
              >
                <div className="w-8 h-8 rounded-lg bg-[#FAF6F0] flex items-center justify-center text-[#6E7953] mb-1.5 group-hover:scale-105 transition-transform">
                  <Footprints className="w-4 h-4" />
                </div>
                <span className="text-[11px] font-semibold text-stone-800">
                  {language === 'id' ? '+ Aktivitas' : '+ Activity'}
                </span>
              </button>
            </div>
          </div>

          {/* Right Column (5 cols desktop): Recent Logs & Guides */}
          <div className="lg:col-span-5 space-y-4 sm:space-y-5">
            {/* Recent Activity / Log Preview */}
            <div className="p-4 sm:p-5 bg-white border border-stone-200/90 rounded-2xl shadow-2xs">
              <h3 className="text-xs sm:text-sm font-bold text-stone-900 font-['Outfit'] mb-3">
                {language === 'id' ? 'Catatan Terakhir Kamu' : 'Your Recent Logs'}
              </h3>
              <div className="space-y-2 text-xs">
                {foodLogs[0] && (
                  <div className="p-2.5 bg-[#FAF6F0] rounded-xl flex items-start gap-2.5 border border-stone-200/60">
                    <Utensils className="w-3.5 h-3.5 text-[#A64F36] shrink-0 mt-0.5" />
                    <div className="min-w-0">
                      <p className="font-semibold text-stone-800 truncate">{foodLogs[0].foodName}</p>
                      <p className="text-[10px] text-stone-500 mt-0.5 truncate">{foodLogs[0].date} · Rempah: {foodLogs[0].herbsIncluded || '-'}</p>
                    </div>
                  </div>
                )}
                {sleepLogs[0] && (
                  <div className="p-2.5 bg-[#FAF6F0] rounded-xl flex items-start gap-2.5 border border-stone-200/60">
                    <Moon className="w-3.5 h-3.5 text-[#253D32] shrink-0 mt-0.5" />
                    <div className="min-w-0">
                      <p className="font-semibold text-stone-800 truncate">Tidur {sleepLogs[0].durationHours} Jam ({sleepLogs[0].quality})</p>
                      <p className="text-[10px] text-stone-500 mt-0.5 truncate">{sleepLogs[0].notes || 'Tidur tepat waktu.'}</p>
                    </div>
                  </div>
                )}
                {activityLogs[0] && (
                  <div className="p-2.5 bg-[#FAF6F0] rounded-xl flex items-start gap-2.5 border border-stone-200/60">
                    <Footprints className="w-3.5 h-3.5 text-[#6E7953] shrink-0 mt-0.5" />
                    <div className="min-w-0">
                      <p className="font-semibold text-stone-800 truncate">{activityLogs[0].activityName} ({activityLogs[0].durationMinutes} Menit)</p>
                      <p className="text-[10px] text-stone-500 mt-0.5 truncate">Intensitas {activityLogs[0].intensity}</p>
                    </div>
                  </div>
                )}
                {!foodLogs[0] && !sleepLogs[0] && !activityLogs[0] && (
                  <p className="text-xs text-stone-400 italic py-2 text-center">
                    {language === 'id' ? 'Belum ada catatan hari ini.' : 'No logs recorded today.'}
                  </p>
                )}
              </div>
            </div>

            {/* Educational Article Cards */}
            <div className="p-4 sm:p-5 bg-white border border-stone-200/90 rounded-2xl shadow-2xs">
              <h3 className="text-xs sm:text-sm font-bold text-stone-900 font-['Outfit'] mb-3">
                {language === 'id' ? 'Panduan & Artikel Hidup Sehat' : 'Healthy Living Guides & Articles'}
              </h3>

              <div className="space-y-2.5">
                {filteredTips.map((tip) => (
                  <div
                    key={tip.id}
                    onClick={() => setSelectedArticle(tip)}
                    className="p-2.5 bg-[#FAF6F0] border border-stone-200/70 rounded-xl hover:border-stone-300 hover:bg-[#F2F5ED] transition-all cursor-pointer flex items-center gap-3 group"
                  >
                    <img
                      src={tip.imageUrl}
                      alt={tip.title}
                      onError={(e) => {
                        e.currentTarget.src = 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=400&q=80';
                      }}
                      className="w-12 h-12 rounded-lg object-cover shrink-0 bg-stone-100 border border-stone-200/60"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="text-xs font-bold text-stone-900 group-hover:text-[#253D32] transition-colors truncate">
                        {tip.title}
                      </h4>
                      <p className="text-[10px] text-stone-400 mt-0.5 flex items-center gap-1">
                        <span>⏱ {tip.readTime}</span>
                        <span>·</span>
                        <span>{language === 'id' ? 'Tradisi' : 'Wisdom'}</span>
                      </p>
                    </div>
                    <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center text-stone-400 group-hover:text-stone-700 transition-colors shrink-0 shadow-2xs">
                      <ArrowRight className="w-3.5 h-3.5" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

      {/* Modal: Catat Makan */}
      {showFoodModal && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-5 max-w-sm w-full shadow-xl border border-stone-200">
            <h3 className="text-sm font-bold text-stone-900 mb-2 font-['Outfit']">
              Catat Pola Makan & Bumbu Alami
            </h3>
            <form onSubmit={handleAddFood} className="space-y-2.5 text-xs">
              <div>
                <label className="block font-semibold text-stone-700 mb-1">Waktu Makan</label>
                <select
                  value={foodForm.mealType}
                  onChange={(e) => setFoodForm({ ...foodForm, mealType: e.target.value as any })}
                  className="w-full h-9 px-3 bg-[#FAF6F0] border border-stone-200 rounded-xl"
                >
                  <option>Sarapan</option>
                  <option>Makan Siang</option>
                  <option>Makan Malam</option>
                  <option>Camilan / Jamu</option>
                </select>
              </div>
              <div>
                <label className="block font-semibold text-stone-700 mb-1">Menu Makanan *</label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Sayur Asem, Pepes Ikan, Wedang Jahe"
                  value={foodForm.foodName}
                  onChange={(e) => setFoodForm({ ...foodForm, foodName: e.target.value })}
                  className="w-full h-9 px-3 bg-[#FAF6F0] border border-stone-200 rounded-xl"
                />
              </div>
              <div>
                <label className="block font-semibold text-stone-700 mb-1">Rempah/Herbal Alami yang Dipakai</label>
                <input
                  type="text"
                  placeholder="Contoh: Jahe, kunyit, daun kemangi"
                  value={foodForm.herbsIncluded}
                  onChange={(e) => setFoodForm({ ...foodForm, herbsIncluded: e.target.value })}
                  className="w-full h-9 px-3 bg-[#FAF6F0] border border-stone-200 rounded-xl"
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Porsi Sayur</label>
                  <select
                    value={foodForm.vegetablePortion}
                    onChange={(e) => setFoodForm({ ...foodForm, vegetablePortion: e.target.value as any })}
                    className="w-full h-9 px-3 bg-[#FAF6F0] border border-stone-200 rounded-xl"
                  >
                    <option>Sedikit</option>
                    <option>Sedang</option>
                    <option>Banyak</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Gelas Air Putih</label>
                  <input
                    type="number"
                    min="1"
                    max="10"
                    value={foodForm.hydrationGlasses}
                    onChange={(e) => setFoodForm({ ...foodForm, hydrationGlasses: parseInt(e.target.value) || 1 })}
                    className="w-full h-9 px-3 bg-[#FAF6F0] border border-stone-200 rounded-xl"
                  />
                </div>
              </div>
              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowFoodModal(false)}
                  className="flex-1 py-2 bg-stone-100 rounded-xl text-stone-700 font-semibold"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2 bg-[#253D32] text-white rounded-xl font-semibold"
                >
                  Simpan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Catat Tidur */}
      {showSleepModal && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-5 max-w-sm w-full shadow-xl border border-stone-200">
            <h3 className="text-sm font-bold text-stone-900 mb-2 font-['Outfit']">
              Catat Kualitas Tidur
            </h3>
            <form onSubmit={handleAddSleep} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-stone-700 mb-1">Durasi Tidur (Jam)</label>
                <input
                  type="number"
                  step="0.5"
                  min="2"
                  max="14"
                  value={sleepForm.durationHours}
                  onChange={(e) => setSleepForm({ ...sleepForm, durationHours: parseFloat(e.target.value) || 7 })}
                  className="w-full h-9 px-3 bg-[#FAF6F0] border border-stone-200 rounded-xl"
                />
              </div>
              <div>
                <label className="block font-semibold text-stone-700 mb-1">Kualitas Tidur</label>
                <select
                  value={sleepForm.quality}
                  onChange={(e) => setSleepForm({ ...sleepForm, quality: e.target.value as any })}
                  className="w-full h-9 px-3 bg-[#FAF6F0] border border-stone-200 rounded-xl"
                >
                  <option>Nyenyak</option>
                  <option>Cukup</option>
                  <option>Kurang Nyenyak</option>
                  <option>Sering Terbangun</option>
                </select>
              </div>
              <label className="flex items-center gap-2 cursor-pointer pt-1">
                <input
                  type="checkbox"
                  checked={sleepForm.herbalTeaTaken}
                  onChange={(e) => setSleepForm({ ...sleepForm, herbalTeaTaken: e.target.checked })}
                  className="rounded-xs text-[#253D32]"
                />
                <span className="text-stone-700 font-medium">Minum wedang / teh herbal sebelum tidur</span>
              </label>
              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowSleepModal(false)}
                  className="flex-1 py-2 bg-stone-100 rounded-xl text-stone-700 font-semibold"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2 bg-[#253D32] text-white rounded-xl font-semibold"
                >
                  Simpan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Catat Aktivitas Fisik */}
      {showActivityModal && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-5 max-w-sm w-full shadow-xl border border-stone-200">
            <h3 className="text-sm font-bold text-stone-900 mb-2 font-['Outfit']">
              Catat Gerak & Aktivitas Fisik
            </h3>
            <form onSubmit={handleAddActivity} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-stone-700 mb-1">Jenis Aktivitas *</label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Jalan santai, yoga, bersepeda, menyapu"
                  value={activityForm.activityName}
                  onChange={(e) => setActivityForm({ ...activityForm, activityName: e.target.value })}
                  className="w-full h-9 px-3 bg-[#FAF6F0] border border-stone-200 rounded-xl"
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Durasi (Menit)</label>
                  <input
                    type="number"
                    min="5"
                    max="300"
                    value={activityForm.durationMinutes}
                    onChange={(e) => setActivityForm({ ...activityForm, durationMinutes: parseInt(e.target.value) || 30 })}
                    className="w-full h-9 px-3 bg-[#FAF6F0] border border-stone-200 rounded-xl"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Intensitas</label>
                  <select
                    value={activityForm.intensity}
                    onChange={(e) => setActivityForm({ ...activityForm, intensity: e.target.value as any })}
                    className="w-full h-9 px-3 bg-[#FAF6F0] border border-stone-200 rounded-xl"
                  >
                    <option>Ringan</option>
                    <option>Sedang</option>
                    <option>Intens</option>
                  </select>
                </div>
              </div>
              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowActivityModal(false)}
                  className="flex-1 py-2 bg-stone-100 rounded-xl text-stone-700 font-semibold"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2 bg-[#253D32] text-white rounded-xl font-semibold"
                >
                  Simpan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Baca Artikel Lengkap */}
      {selectedArticle && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-5 max-w-sm w-full shadow-2xl border border-stone-200 max-h-[85vh] overflow-y-auto no-scrollbar space-y-3 text-xs">
            <div className="flex items-start justify-between pb-2 border-b border-stone-100">
              <div>
                <span className="text-[10px] text-[#A64F36] font-semibold">{selectedArticle.category}</span>
                <h3 className="text-sm font-bold text-stone-900 font-['Outfit']">{selectedArticle.title}</h3>
              </div>
              <button
                onClick={() => setSelectedArticle(null)}
                className="w-7 h-7 rounded-full bg-stone-100 flex items-center justify-center text-stone-500 hover:text-stone-800"
              >
                ✕
              </button>
            </div>
            <img
              src={selectedArticle.imageUrl}
              alt={selectedArticle.title}
              onError={(e) => {
                e.currentTarget.src = 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=600&q=80';
              }}
              className="w-full h-36 rounded-2xl object-cover bg-stone-100"
            />
            <div className="space-y-2 text-stone-700 leading-relaxed">
              {selectedArticle.content.map((p, idx) => (
                <p key={idx}>{p}</p>
              ))}
            </div>
            <div className="p-3 bg-[#F2F5ED] rounded-2xl border border-[#DFE5D5]">
              <p className="font-bold text-[#253D32] mb-1">Tips Praktis:</p>
              <ul className="space-y-1 list-disc pl-4 text-stone-600">
                {selectedArticle.tips.map((t, idx) => (
                  <li key={idx}>{t}</li>
                ))}
              </ul>
            </div>
            <div className="p-3 bg-[#FFF0D3]/50 rounded-2xl border border-[#F4E3C1] italic text-stone-700">
              "{selectedArticle.nusantaraWisdom}"
            </div>
            <button
              onClick={() => setSelectedArticle(null)}
              className="w-full py-2 bg-[#253D32] text-white rounded-xl font-semibold mt-2"
            >
              Selesai Membaca
            </button>
          </div>
        </div>
      )}
      </div>
    </div>
  );
}
