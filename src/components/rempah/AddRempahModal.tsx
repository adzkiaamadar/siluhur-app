import React, { useState } from 'react';
import { X, Check, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
import { RempahDocumentation } from '../../types';
import { StorageService } from '../../services/storage';
import { useLanguage } from '../../i18n/LanguageContext';

interface AddRempahModalProps {
  onClose: () => void;
  onSave: (doc: RempahDocumentation) => void;
}

export function AddRempahModal({ onClose, onSave }: AddRempahModalProps) {
  const [plantName, setPlantName] = useState('');
  const [localName, setLocalName] = useState('');
  const [region, setRegion] = useState('Jawa Barat');
  const [inheritedStory, setInheritedStory] = useState('');
  const [traditionalUse, setTraditionalUse] = useState('');
  const [safetyCaution, setSafetyCaution] = useState('');
  const [isEvidenceBased, setIsEvidenceBased] = useState(false);
  const [authorName, setAuthorName] = useState('Amada');
  const { language } = useLanguage();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!plantName.trim() || !inheritedStory.trim()) return;

    const saved = StorageService.addRempahDoc({
      plantName: plantName.trim(),
      localName: localName.trim() || plantName.trim(),
      region,
      inheritedStory: inheritedStory.trim(),
      traditionalUse:
        traditionalUse.trim() ||
        (language === 'id'
          ? 'Digunakan sebagai ramuan seduhan tradisional.'
          : 'Prepared as a traditional herbal infusion.'),
      safetyCaution: safetyCaution.trim(),
      categoryTag: language === 'id' ? 'Warisan Keluarga' : 'Family Heritage',
      isEvidenceBased,
      authorName: authorName.trim() || (language === 'id' ? 'Pengguna SiLuhur' : 'SiLuhur Contributor'),
    });

    // Fire celebratory confetti!
    confetti({
      particleCount: 60,
      spread: 70,
      origin: { y: 0.6 },
    });

    onSave(saved);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl p-5 max-w-sm w-full shadow-2xl border border-stone-200 my-auto">
        <div className="flex items-center justify-between pb-3 border-b border-stone-100">
          <div>
            <h2 className="text-sm font-bold text-stone-900 font-['Outfit']">
              {language === 'id' ? 'Dokumentasi Rempah Baru' : 'Record New Herbal Recipe'}
            </h2>
            <p className="text-[11px] text-stone-500">
              {language === 'id'
                ? 'Bagikan kearifan resep keluarga untuk generasi masa depan.'
                : 'Preserve ancestral family wisdom for future generations.'}
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-stone-100 flex items-center justify-center text-stone-500 hover:text-stone-800"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3 mt-3 text-xs">
          <div>
            <label className="block font-semibold text-stone-700 mb-1">
              {language === 'id' ? 'Nama Tanaman / Rempah *' : 'Plant / Herb Name *'}
            </label>
            <input
              type="text"
              required
              value={plantName}
              onChange={(e) => setPlantName(e.target.value)}
              placeholder={language === 'id' ? 'Contoh: Temulawak, Sirih Bumi, Temu Kunci' : 'e.g. Java Turmeric, Wild Betel, Fingerroot'}
              className="w-full h-10 px-3 bg-[#FAF6F0] border border-stone-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-[#253D32]/20"
            />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block font-semibold text-stone-700 mb-1">
                {language === 'id' ? 'Nama Lokal Daerah' : 'Regional Local Name'}
              </label>
              <input
                type="text"
                value={localName}
                onChange={(e) => setLocalName(e.target.value)}
                placeholder={language === 'id' ? 'Contoh: Koneng Gede' : 'e.g. Koneng Gede'}
                className="w-full h-10 px-3 bg-[#FAF6F0] border border-stone-200 rounded-xl"
              />
            </div>
            <div>
              <label className="block font-semibold text-stone-700 mb-1">
                {language === 'id' ? 'Asal Wilayah' : 'Region Origin'}
              </label>
              <input
                type="text"
                value={region}
                onChange={(e) => setRegion(e.target.value)}
                placeholder={language === 'id' ? 'Contoh: Jawa Barat' : 'e.g. West Java'}
                className="w-full h-10 px-3 bg-[#FAF6F0] border border-stone-200 rounded-xl"
              />
            </div>
          </div>

          <div>
            <label className="block font-semibold text-stone-700 mb-1">
              {language === 'id' ? 'Cerita / Asal Pengetahuan *' : 'Story & Origin of Lore *'}
            </label>
            <textarea
              required
              rows={2}
              value={inheritedStory}
              onChange={(e) => setInheritedStory(e.target.value)}
              placeholder={
                language === 'id'
                  ? 'Bagaimana resep ini diwariskan oleh kakek, nenek, atau tetua di desamu?'
                  : 'How was this recipe passed down by your grandparents or village elders?'
              }
              className="w-full p-2.5 bg-[#FAF6F0] border border-stone-200 rounded-xl resize-none"
            />
          </div>

          <div>
            <label className="block font-semibold text-stone-700 mb-1">
              {language === 'id' ? 'Cara Penggunaan Tradisional' : 'Traditional Preparation & Use'}
            </label>
            <textarea
              rows={2}
              value={traditionalUse}
              onChange={(e) => setTraditionalUse(e.target.value)}
              placeholder={
                language === 'id'
                  ? 'Contoh: Direbus 1 ruas bersama gula aren, diminum hangat di pagi hari.'
                  : 'e.g. Boiled 1 rhizome with palm sugar, served warm in the morning.'
              }
              className="w-full p-2.5 bg-[#FAF6F0] border border-stone-200 rounded-xl resize-none"
            />
          </div>

          <div>
            <label className="block font-semibold text-stone-700 mb-1">
              {language === 'id' ? 'Catatan Keamanan / Pantangan' : 'Safety Notes & Cautions'}
            </label>
            <input
              type="text"
              value={safetyCaution}
              onChange={(e) => setSafetyCaution(e.target.value)}
              placeholder={
                language === 'id'
                  ? 'Contoh: Jangan diminum saat perut kosong / bagi penderita maag'
                  : 'e.g. Avoid taking on an empty stomach for gastritis sufferers'
              }
              className="w-full h-10 px-3 bg-[#FAF6F0] border border-stone-200 rounded-xl"
            />
          </div>

          {/* Evidence vs Folk Wisdom Label Toggle */}
          <div className="p-3 bg-[#FAF6F0] rounded-2xl border border-stone-200 flex items-center justify-between">
            <div>
              <p className="font-semibold text-stone-800">
                {language === 'id' ? 'Status Validasi Ilmiah' : 'Scientific Validation Status'}
              </p>
              <p className="text-[10px] text-stone-500">
                {isEvidenceBased
                  ? language === 'id'
                    ? 'Entri telah didukung oleh riset jurnal / BPOM'
                    : 'Entry is backed by clinical journals / health ministry'
                  : language === 'id'
                  ? 'Entri berbasis tradisi murni turun-temurun'
                  : 'Entry is based on pure folk / oral tradition'}
              </p>
            </div>
            <button
              type="button"
              onClick={() => setIsEvidenceBased(!isEvidenceBased)}
              className={`w-12 h-6 flex items-center rounded-full p-1 transition-colors ${
                isEvidenceBased ? 'bg-[#253D32]' : 'bg-stone-300'
              }`}
            >
              <div
                className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
                  isEvidenceBased ? 'translate-x-6' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          <div>
            <label className="block font-semibold text-stone-700 mb-1">
              {language === 'id' ? 'Nama Pencatat / Kontributor' : 'Contributor Name'}
            </label>
            <input
              type="text"
              value={authorName}
              onChange={(e) => setAuthorName(e.target.value)}
              placeholder={language === 'id' ? 'Nama kamu' : 'Your name'}
              className="w-full h-10 px-3 bg-[#FAF6F0] border border-stone-200 rounded-xl"
            />
          </div>

          <button
            type="submit"
            className="w-full h-11 bg-[#253D32] hover:bg-[#1A2D25] text-white font-semibold rounded-2xl flex items-center justify-center gap-1.5 shadow-md transition-all active:scale-98 mt-2"
          >
            <Check className="w-4 h-4" />
            <span>{language === 'id' ? 'Simpan ke Koleksi Saya' : 'Save to My Collection'}</span>
          </button>
        </form>
      </div>
    </div>
  );
}
