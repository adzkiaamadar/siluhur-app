export type EvidenceLevel = 'Kuat' | 'Sedang' | 'Terbatas' | 'Anekdotal';

export type ClaimCategory = 'Fakta' | 'Mitos' | 'Belum Cukup Bukti';

export type NusantaraRegion =
  | 'Semua Wilayah'
  | 'Sumatra'
  | 'Jawa'
  | 'Bali & Nusa Tenggara'
  | 'Kalimantan'
  | 'Sulawesi'
  | 'Maluku & Papua';

export type ItemType = 'Tanaman' | 'Pangan' | 'Tradisi';

export interface HerbItem {
  id: string;
  name: string;
  scientificName?: string;
  localNames?: { [region: string]: string };
  region: NusantaraRegion;
  specificOrigin: string; // e.g. "Jawa Barat", "Nusa Tenggara Timur", "Kalimantan Timur"
  type: ItemType;
  category: string; // "Rempah Rimpang", "Daun Berkhasiat", "Minuman Tradisional", etc.
  openFoodFactsTag?: string; // English ingredient tag for Open Food Facts API search
  imageUrl: string;
  description: string;
  culturalContext: string;
  traditionalUse: string[];
  keyBenefits: string[];
  scientificEvidence: {
    summary: string;
    evidenceLevel: EvidenceLevel;
    activeCompounds: string[];
    clinicalFindings: string;
  };
  safetyNotes: {
    precautions: string[];
    contraindications: string[];
    maxSafeIntake?: string;
    whenToSeeDoctor: string;
  };
  references: Array<{
    title: string;
    source: string;
  }>;
}

export interface FactCheckItem {
  id: string;
  claim: string;
  verdict: ClaimCategory;
  strengthOfEvidence: EvidenceLevel;
  summary: string;
  scientificEvidence: string;
  culturalContext: string;
  safetyCaution: string;
  tags: string[];
  references: Array<{
    title: string;
    source?: string;
  }>;
  reviewedDate?: string;
}

export interface TraditionalTherapy {
  id: string;
  name: string;
  regionOrigin: string;
  culturalBackground: string;
  communityPurpose: string;
  scientificExplanation: string;
  evidenceLevel: EvidenceLevel;
  physiologicalMechanism: string;
  risksAndLimitations: string[];
  contraindications: string[];
  medicalRedFlags: string[];
  safePractices: string[];
  disclaimer: string;
}

export interface RempahDocumentation {
  id: string;
  plantName: string;
  localName: string;
  region: string;
  inheritedStory: string;
  traditionalUse: string;
  safetyCaution: string;
  categoryTag: string;
  isEvidenceBased: boolean;
  authorName?: string;
  createdAt: string;
  photoUrl?: string;
}

export interface HabitItem {
  id: string;
  title: string;
  category: 'air' | 'jamu' | 'gerak' | 'tidur' | 'pola_makan';
  target: string;
  completed: boolean;
  iconName: string;
}

export interface FoodLog {
  id: string;
  date: string;
  mealType: 'Sarapan' | 'Makan Siang' | 'Makan Malam' | 'Camilan / Jamu';
  foodName: string;
  herbsIncluded: string;
  vegetablePortion: 'Sedikit' | 'Sedang' | 'Banyak';
  hydrationGlasses: number;
  notes: string;
}

export interface SleepLog {
  id: string;
  date: string;
  durationHours: number;
  quality: 'Nyenyak' | 'Cukup' | 'Kurang Nyenyak' | 'Sering Terbangun';
  herbalTeaTaken: boolean;
  notes: string;
}

export interface ActivityLog {
  id: string;
  date: string;
  activityName: string;
  durationMinutes: number;
  intensity: 'Ringan' | 'Sedang' | 'Intens';
  notes: string;
}

export interface OpenFoodProduct {
  code: string;
  product_name?: string;
  brands?: string;
  image_front_url?: string;
  ingredients_text?: string;
  nutriments?: {
    energy_kcal_100g?: number;
    fat_100g?: number;
    sugars_100g?: number;
    proteins_100g?: number;
    salt_100g?: number;
    'energy-kcal_serving'?: number;
  };
  allergens_tags?: string[];
  labels_tags?: string[];
  categories?: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  suggestedFollowUps?: string[];
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: 'member' | 'contributor';
  joinedDate: string;
  literacyLevel: number;
}

