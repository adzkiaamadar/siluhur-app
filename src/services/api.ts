import { FactCheckItem, OpenFoodProduct } from '../types';

export async function checkClaimWithGemini(
  claim: string,
  language: 'id' | 'en' = 'id'
): Promise<FactCheckItem> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 9000);

  try {
    const response = await fetch('/api/gemini/factcheck', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ claim, language }),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || `Gagal menganalisis klaim (HTTP ${response.status})`);
    }

    const data = await response.json();
    return {
      id: 'ai-' + Date.now(),
      claim: data.claim || claim,
      verdict: data.verdict || 'Belum Cukup Bukti',
      strengthOfEvidence: data.strengthOfEvidence || 'Terbatas',
      summary: data.summary || (language === 'id' ? 'Analisis berhasil diselesaikan.' : 'Analysis completed.'),
      scientificEvidence: data.scientificEvidence || (language === 'id' ? 'Literatur masih memerlukan penelitian lebih lanjut.' : 'Further clinical research is required.'),
      culturalContext: data.culturalContext || (language === 'id' ? 'Praktik ini dikenal secara tradisional di berbagai wilayah Nusantara.' : 'This practice is traditionally recognized across Indonesian regions.'),
      safetyCaution: data.safetyCaution || (language === 'id' ? 'Konsultasikan selalu dengan dokter sebelum mengubah rejimen pengobatan.' : 'Always consult a physician before altering medical treatments.'),
      tags: ['AI Analysis', 'SiLuhur Check'],
      references: Array.isArray(data.references) ? data.references : [],
      reviewedDate: language === 'id' ? 'Baru saja dianalisis' : 'Just analyzed',
    };
  } catch (err: unknown) {
    clearTimeout(timeoutId);
    throw err;
  }
}

export async function askWellnessAssistant(
  message: string,
  history: Array<{ sender: 'user' | 'assistant'; text: string }> = [],
  language: 'id' | 'en' = 'id'
): Promise<string> {
  const response = await fetch('/api/gemini/assistant', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ message, history, language }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error || `Gagal menghubungi asisten (HTTP ${response.status})`);
  }

  const data = await response.json();
  return data.reply;
}

/**
 * Model Parser for Open Food Facts Product with safe defaults and null safety
 */
export function parseOpenFoodProduct(p: any): OpenFoodProduct {
  if (!p || typeof p !== 'object') {
    return {
      code: 'unknown',
      product_name: 'Produk Tidak Dikenal',
      brands: 'Merek Tidak Terdaftar',
      image_front_url: '',
      ingredients_text: 'Komposisi tidak tercantum.',
      allergens_tags: [],
      labels_tags: [],
    };
  }

  return {
    code: String(p.code || p._id || ''),
    product_name: p.product_name || p.product_name_en || p.product_name_id || 'Produk Tanpa Nama',
    brands: p.brands || 'Merek Tidak Terdaftar',
    image_front_url: p.image_url || p.image_front_url || p.image_small_url || '',
    ingredients_text:
      p.ingredients_text ||
      p.ingredients_text_en ||
      p.ingredients_text_id ||
      'Komposisi tidak tercantum pada kemasan.',
    nutriments: p.nutriments
      ? {
          energy_kcal_100g: Number(p.nutriments['energy-kcal_100g'] ?? p.nutriments['energy-kcal'] ?? 0),
          fat_100g: Number(p.nutriments['fat_100g'] ?? p.nutriments.fat ?? 0),
          sugars_100g: Number(p.nutriments['sugars_100g'] ?? p.nutriments.sugars ?? 0),
          proteins_100g: Number(p.nutriments['proteins_100g'] ?? p.nutriments.proteins ?? 0),
          salt_100g: Number(p.nutriments['salt_100g'] ?? p.nutriments.salt ?? 0),
          'energy-kcal_serving': p.nutriments['energy-kcal_serving']
            ? Number(p.nutriments['energy-kcal_serving'])
            : undefined,
        }
      : undefined,
    allergens_tags: Array.isArray(p.allergens_tags) ? p.allergens_tags : [],
    labels_tags: Array.isArray(p.labels_tags) ? p.labels_tags : [],
    categories: p.categories || '',
  };
}

/**
 * Endpoint 1: Full Product Detail
 * GET https://world.openfoodfacts.org/api/v2/product/{barcode}.json
 */
export async function getProductByBarcode(barcode: string): Promise<OpenFoodProduct | null> {
  if (!barcode || !barcode.trim()) return null;

  try {
    const response = await fetch(`/api/openfoodfacts/product/${encodeURIComponent(barcode.trim())}`);
    if (!response.ok) {
      if (response.status === 404) return null;
      throw new Error(`Gagal mencari produk barcode ${barcode}: HTTP ${response.status}`);
    }

    const data = await response.json();
    if (data.status === 0 || !data.product) {
      return null;
    }

    return parseOpenFoodProduct(data.product);
  } catch (err: unknown) {
    console.error('getProductByBarcode error:', err);
    throw err;
  }
}

/**
 * Endpoint 2: Product Search by ingredient tag or term
 * GET https://world.openfoodfacts.org/api/v2/search?ingredients_tags_en={tag}&page_size=10
 */
export async function searchOpenFoodFacts(
  ingredientTag: string,
  page = 1,
  pageSize = 10
): Promise<{ count: number; products: OpenFoodProduct[] }> {
  try {
    const cleanTag = ingredientTag.trim().toLowerCase();
    const response = await fetch(
      `/api/openfoodfacts/search?ingredients_tags_en=${encodeURIComponent(cleanTag)}&page=${page}&page_size=${pageSize}`
    );

    if (!response.ok) {
      throw new Error(`Open Food Facts search error: HTTP ${response.status}`);
    }

    const data = await response.json();
    const rawProducts = Array.isArray(data.products) ? data.products : [];

    const products: OpenFoodProduct[] = rawProducts
      .filter((p: any) => p && (p.product_name || p.product_name_en || p.brands || p.code))
      .map(parseOpenFoodProduct);

    return {
      count: Number(data.count || products.length),
      products,
    };
  } catch (err: unknown) {
    console.error('searchOpenFoodFacts error:', err);
    throw err;
  }
}

/**
 * Endpoint 3: Selected Product Information (Lightweight response)
 * GET https://world.openfoodfacts.org/api/v2/product/{barcode}.json?fields=product_name,ingredients_text,nutriments,allergens_tags
 */
export async function getProductSelectedInfo(barcode: string): Promise<OpenFoodProduct | null> {
  if (!barcode || !barcode.trim()) return null;

  try {
    const fields = 'product_name,ingredients_text,nutriments,allergens_tags,image_url,image_front_url,brands';
    const response = await fetch(
      `/api/openfoodfacts/product/${encodeURIComponent(barcode.trim())}?fields=${fields}`
    );

    if (!response.ok) {
      if (response.status === 404) return null;
      throw new Error(`Gagal mengambil data spesifik produk ${barcode}: HTTP ${response.status}`);
    }

    const data = await response.json();
    if (data.status === 0 || !data.product) {
      return null;
    }

    return parseOpenFoodProduct(data.product);
  } catch (err: unknown) {
    console.error('getProductSelectedInfo error:', err);
    throw err;
  }
}
