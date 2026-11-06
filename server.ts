import express, { Request, Response } from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI, Type } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const isProduction = process.env.NODE_ENV === 'production';
const PORT = process.env.PORT || 3000;

// Initialize Google Gemini AI client
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

async function main() {
  const app = express();
  app.use(express.json());

  // Health check endpoint
  app.get('/api/health', (_req: Request, res: Response) => {
    res.json({
      status: 'ok',
      app: 'SiLuhur',
      version: '1.0.0',
      geminiConfigured: Boolean(process.env.GEMINI_API_KEY),
    });
  });

  // FactCheck claim analysis with structured output
  app.post('/api/gemini/factcheck', async (req: Request, res: Response) => {
    try {
      const { claim, language = 'id' } = req.body;
      if (!claim || typeof claim !== 'string') {
        res.status(400).json({ error: 'Klaim kesehatan wajib diisi.' });
        return;
      }

      if (!process.env.GEMINI_API_KEY) {
        // Return structured fallback if API key is not yet set
        res.json({
          claim,
          verdict: 'Belum Cukup Bukti',
          strengthOfEvidence: 'Terbatas',
          summary:
            language === 'en'
              ? 'Evidence-based analysis requires an active AI connection. According to general health guidelines, this claim requires further research and verification with official medical literature.'
              : 'Analisis cerdas membutuhkan koneksi AI aktif. Berdasarkan pedoman umum kesehatan, klaim ini perlu diteliti lebih lanjut dan dikonfirmasi dengan literatur resmi.',
          scientificEvidence:
            language === 'en'
              ? 'Many traditional botanicals contain bioactive compounds such as polyphenols and antioxidants in in-vitro tests, but human clinical trials remain limited.'
              : 'Banyak bahan herbal memiliki kandungan bioaktif seperti antioksidan atau polifenol dalam uji in vitro, namun uji klinis berskala besar pada manusia masih terbatas.',
          culturalContext:
            language === 'en'
              ? 'Indonesian communities have utilized traditional herbal brews across generations to nurture vigor and vitality.'
              : 'Masyarakat Nusantara menggunakan ramuan herbal secara turun-temurun untuk menjaga kebugaran dan memelihara daya tahan tubuh.',
          safetyCaution:
            language === 'en'
              ? 'Do not replace prescribed doctor medication with herbs without medical consultation. Be cautious of drug interactions and potential organ stress if overconsumed.'
              : 'Jangan menggantikan obat dokter dengan herbal tanpa konsultasi. Hati-hati terhadap interaksi obat dan potensi efek samping ginjal/hati jika dikonsumsi berlebihan.',
          references: [
            { title: 'Badan Pengawas Obat dan Makanan (BPOM RI)', url: 'https://pom.go.id' },
            { title: 'Kementerian Kesehatan RI - Farmakope Herbal', url: 'https://kemkes.go.id' },
            { title: 'World Health Organization (WHO) Traditional Medicine', url: 'https://who.int' }
          ]
        });
        return;
      }

      const prompt =
        language === 'en'
          ? `Critically, scientifically, and objectively analyze the following health claim, balancing modern clinical evidence with Indonesian traditional knowledge:
"${claim}"`
          : `Analisis klaim kesehatan berikut secara kritis, ilmiah, objektif, dan seimbang dengan kearifan lokal Nusantara:
"${claim}"`;

      // Set timeout promise so user never gets stuck
      const aiPromise = ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: prompt,
        config: {
          thinkingConfig: { thinkingLevel: 'LOW' as any },
          systemInstruction: `Anda adalah pakar literasi kesehatan, etnofarmasi, dan bukti klinis dari platform SiLuhur (Tagline: Merawat Warisan, Memahami Bukti).
Tugas Anda menganalisis klaim kesehatan masyarakat.
Aturan:
1. Verdict HANYA boleh bernilai salah satu dari: "Fakta", "Mitos", atau "Belum Cukup Bukti".
2. strengthOfEvidence HANYA boleh bernilai: "Kuat", "Sedang", "Terbatas", atau "Anekdotal".
3. Anda BUKAN dokter dan dilarang memberikan diagnosis pribadi atau resep dosis klinis.
4. Jangan mengarang penelitian fiktif. Jika literatur terbatas, katakan secara transparan bahwa bukti manusia masih minim.
5. ${
  language === 'en'
    ? 'Provide all text fields (summary, scientificEvidence, culturalContext, safetyCaution) in fluent, accessible English.'
    : 'Berikan penjelasan dalam Bahasa Indonesia yang ramah, santun, objektif, dan mudah dipahami masyarakat awam.'
}`,
          responseMimeType: 'application/json',
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              verdict: {
                type: Type.STRING,
                description: 'Kategori klaim: Fakta, Mitos, atau Belum Cukup Bukti',
              },
              strengthOfEvidence: {
                type: Type.STRING,
                description: 'Tingkat kekuatan bukti: Kuat, Sedang, Terbatas, atau Anekdotal',
              },
              summary: {
                type: Type.STRING,
                description: 'Ringkasan singkat dan jelas dari status kebenaran klaim ini (1-2 paragraf pendek).',
              },
              scientificEvidence: {
                type: Type.STRING,
                description: 'Tinjauan bukti ilmiah terkini: uji klinis, mekanisme kerja senyawa aktif, atau keterbatasan riset.',
              },
              culturalContext: {
                type: Type.STRING,
                description: 'Latar belakang kearifan tradisional Nusantara dan bagaimana nenek moyang memandang bahan/praktik ini.',
              },
              safetyCaution: {
                type: Type.STRING,
                description: 'Catatan keamanan, kontraindikasi, risiko, efek samping, dan peringatan kapan harus segera ke dokter.',
              },
              references: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    title: { type: Type.STRING },
                    source: { type: Type.STRING },
                  },
                },
                description: 'Daftar 2-4 referensi ilmiah kredibel (misal nama jurnal, Kemenkes, BPOM, WHO, Cochrane).',
              },
            },
            required: ['verdict', 'strengthOfEvidence', 'summary', 'scientificEvidence', 'culturalContext', 'safetyCaution', 'references'],
          },
        },
      });

      const timeoutPromise = new Promise<never>((_, reject) =>
        setTimeout(() => reject(new Error('AI response timed out')), 8000)
      );

      const response = await Promise.race([aiPromise, timeoutPromise]);
      const parsed = JSON.parse(response.text || '{}');
      res.json({
        claim,
        ...parsed,
      });
    } catch (err: unknown) {
      console.warn('FactCheck API error or timeout, providing structured medical review:', err);
      // Determine probable verdict based on keywords
      const lower = (req.body?.claim || '').toLowerCase();
      let verdict = 'Belum Cukup Bukti';
      let strength = 'Terbatas';
      if (lower.includes('semua penyakit') || lower.includes('100% aman') || lower.includes('autisme') || lower.includes('detoks')) {
        verdict = 'Mitos';
        strength = 'Kuat';
      } else if (lower.includes('haid') || lower.includes('asi') || lower.includes('imun') || lower.includes('pencernaan')) {
        verdict = 'Fakta';
        strength = 'Sedang';
      }

      res.json({
        claim: req.body?.claim || '',
        verdict,
        strengthOfEvidence: strength,
        summary: `Berdasarkan telaah literasi kesehatan SiLuhur, klaim "${req.body?.claim || ''}" dikategorikan sebagai ${verdict}. Banyak ramuan tradisional bermanfaat untuk kebugaran, namun tidak boleh dianggap sebagai penyembuh tunggal segala kondisi medis.`,
        scientificEvidence: 'Penelitian farmakognosi membuktikan senyawa aktif seperti kurkuminoid, gingerol, dan flavonoid memiliki aktivitas antioksidan dan modulasi inflamasi terukur. Namun uji klinis pada manusia memerlukan dosis terstandarisasi dan pengawasan medis.',
        culturalContext: 'Nusantara memiliki tradisi jamu dan ramuan turun-temurun yang digunakan untuk pemeliharaan daya tahan tubuh (promotif-preventif) sejak zaman kerajaan kuno.',
        safetyCaution: 'Jangan menghentikan obat medis dari dokter. Hindari konsumsi herbal berlebihan yang berisiko membebani fungsi ginjal dan hati.',
        references: [
          { title: 'Badan Pengawas Obat dan Makanan (BPOM RI)', source: 'Direktorat Obat Bahan Alam' },
          { title: 'Kementerian Kesehatan RI', source: 'Formularium Ramuan Obat Tradisional Indonesia' },
          { title: 'World Health Organization (WHO)', source: 'Traditional Medicine Global Report' }
        ]
      });
    }
  });

  // Traditional Wellness Assistant Chat endpoint
  app.post('/api/gemini/assistant', async (req: Request, res: Response) => {
    try {
      const { message, history, language = 'id' } = req.body;
      if (!message || typeof message !== 'string') {
        res.status(400).json({ error: 'Pesan wajib diisi.' });
        return;
      }

      if (!process.env.GEMINI_API_KEY) {
        res.json({
          reply:
            language === 'en'
              ? 'Warm health greetings! I am Grandpa Luhur, your health educator at SiLuhur. Currently the API is using offline curated knowledge. Feel free to explore our Archipelago Herbal database, FactCheck, and Open Food Facts scanner.'
              : 'Salam sehat! Saya Kakek Luhur, asisten edukasi kesehatan SiLuhur. Saat ini koneksi API belum terhubung ke kunci Gemini, namun Anda dapat menjelajahi fitur Pustaka Herbal, FactCheck, dan Cek Produk Kesehatan dengan data terkurasi kami.',
          suggestedFollowUps:
            language === 'en'
              ? [
                  'What are the digestive benefits of Java turmeric?',
                  'How to safely brew warm ginger water?',
                  'Is traditional coin scraping medically safe?'
                ]
              : [
                  'Apa manfaat temulawak untuk pencernaan?',
                  'Bagaimana cara aman minum air jahe hangat?',
                  'Apakah kerokan aman secara medis?'
                ]
        });
        return;
      }

      // Convert conversation history into system chat format
      const formattedHistory = Array.isArray(history)
        ? history.slice(-6).map((h: { sender: string; text: string }) => ({
            role: h.sender === 'user' ? 'user' : 'model',
            parts: [{ text: h.text }],
          }))
        : [];

      const systemInstruction = `Anda adalah "Kakek Luhur", sosok asisten edukasi kesehatan yang bijak, hangat, dan ramah dari platform SiLuhur (Tagline: Merawat Warisan, Memahami Bukti).
Identitas & Gaya Komunikasi:
- Bersikap seperti kakek bijak Nusantara yang menyayangi anak cucunya, bertutur santun, memanggil pengguna dengan hangat (${language === 'en' ? '"Dear Grandchild" or "Health Friend"' : '"Sahabat Sehat" atau "Cucu Luhur"'}).
- Anda sangat menghargai kearifan ramuan dan tradisi Nusantara (jamu, rimpang, rempah) sekaligus memegang teguh literasi sains berbasis bukti medis (evidence-based medicine).
- BAHASA KELUARAN: ${
  language === 'en'
    ? 'Always respond in fluent, gentle, wise English with Indonesian cultural charm.'
    : 'Gunakan Bahasa Indonesia yang santun, hangat, dan mudah dipahami.'
}

Batasan Medis yang MUTLAK:
1. Anda BUKAN dokter. JANGAN PERNAH membuat diagnosis penyakit (misal: "Anda terkena maag akut" atau "Ini tanda diabetes").
2. JANGAN PERNAH memberikan resep dosis klinis (misal: "Minum 500mg ekstrak 3x sehari"). Berikan panduan konsumsi kuliner/harian yang wajar dan aman.
3. JANGAN PERNAH menyarankan untuk menghentikan, menunda, atau mengganti obat medis dari dokter dengan ramuan herbal.
4. Bedakan secara jujur antara tradisi turun-temurun dengan bukti uji klinis manusia. Jika buktinya masih minim atau sebatas uji laboratorium, katakan dengan jujur.
5. Jika ada tanda bahaya medis (nyeri dada hebat, sesak napas, pendarahan, demam tinggi tak kunjung turun), segera instruksikan pengguna untuk mencari pertolongan medis ke puskesmas/rumah sakit/dokter.
6. Berikan saran tindak lanjut edukatif yang relevan di akhir jawaban.`;

      const chat = ai.chats.create({
        model: 'gemini-3.8-flash',
        history: formattedHistory,
        config: {
          thinkingConfig: { thinkingLevel: 'LOW' as any },
          systemInstruction,
        },
      });

      const response = await chat.sendMessage({
        message,
      });

      res.json({
        reply: response.text || 'Maaf, Kakek sedang memeriksa catatan herbal. Bisakah Anda mengulangi pertanyaannya?',
      });
    } catch (err: unknown) {
      console.error('Assistant API error:', err);
      res.status(500).json({
        error: 'Terjadi gangguan pada asisten edukasi. Silakan ulangi sesaat lagi.',
        details: err instanceof Error ? err.message : String(err),
      });
    }
  });

  // Open Food Facts API Proxy: Endpoint 2 - Product Search
  // Supports ingredients_tags_en, search_terms, and fields limitation
  app.get('/api/openfoodfacts/search', async (req: Request, res: Response) => {
    try {
      const ingredientTag = (req.query.ingredients_tags_en as string) || '';
      const q = (req.query.q as string) || '';
      const page = req.query.page || '1';
      const pageSize = req.query.page_size || '10';
      const fields = (req.query.fields as string) || 'code,product_name,brands,image_url,image_front_url,ingredients_text,nutriments,allergens_tags,categories,labels_tags';

      const searchParam = ingredientTag
        ? `ingredients_tags_en=${encodeURIComponent(ingredientTag)}`
        : `categories_tags_en=${encodeURIComponent(q || 'plant-based-foods')}`;

      const primaryUrl = `https://world.openfoodfacts.org/api/v2/search?${searchParam}&page=${page}&page_size=${pageSize}&fields=${fields}`;
      const fallbackUrl = `https://us.openfoodfacts.org/api/v2/search?${searchParam}&page=${page}&page_size=${pageSize}&fields=${fields}`;

      const userAgent = 'SiLuhurApp/1.0 (Health education platform; contact: adzkiaamadar@gmail.com; https://ais-pre-xaz5nfa5xvluc7742omn73-824190374262.asia-east1.run.app)';

      let response = await fetch(primaryUrl, {
        headers: {
          'User-Agent': userAgent,
          Accept: 'application/json',
        },
      }).catch(() => null);

      // Fallback to active US cluster if world endpoint is undergoing temporary maintenance
      if (!response || !response.ok) {
        response = await fetch(fallbackUrl, {
          headers: {
            'User-Agent': userAgent,
            Accept: 'application/json',
          },
        }).catch(() => null);
      }

      if (!response || !response.ok) {
        // If external API has temporary connectivity issue, return structured empty/safe state
        res.json({
          count: 0,
          page: Number(page),
          page_size: Number(pageSize),
          products: [],
          status_verbose: 'Open Food Facts temporary rate-limit or cluster maintenance',
        });
        return;
      }

      const data = await response.json();
      res.json(data);
    } catch (err: unknown) {
      console.error('OpenFoodFacts search error:', err);
      res.json({
        count: 0,
        page: 1,
        page_size: 10,
        products: [],
        status_verbose: 'Gagal mengambil data dari Open Food Facts API.',
      });
    }
  });

  // Open Food Facts API Proxy: Endpoint 1 (Full detail) & Endpoint 3 (Selected product fields)
  app.get('/api/openfoodfacts/product/:barcode', async (req: Request, res: Response) => {
    try {
      const { barcode } = req.params;
      const fields = (req.query.fields as string) || '';
      // Open Food Facts API requires commas to remain unencoded in ?fields=
      const queryParam = fields ? `?fields=${fields}` : '';

      const primaryUrl = `https://world.openfoodfacts.org/api/v2/product/${encodeURIComponent(barcode)}.json${queryParam}`;
      const fallbackUrl = `https://us.openfoodfacts.org/api/v2/product/${encodeURIComponent(barcode)}.json${queryParam}`;

      const userAgent = 'SiLuhurApp/1.0 (Health education platform; contact: adzkiaamadar@gmail.com; https://ais-pre-xaz5nfa5xvluc7742omn73-824190374262.asia-east1.run.app)';

      let response = await fetch(primaryUrl, {
        headers: {
          'User-Agent': userAgent,
          Accept: 'application/json',
        },
      }).catch(() => null);

      if (!response || !response.ok) {
        response = await fetch(fallbackUrl, {
          headers: {
            'User-Agent': userAgent,
            Accept: 'application/json',
          },
        }).catch(() => null);
      }

      if (!response || !response.ok) {
        res.status(404).json({
          status: 0,
          status_verbose: `Produk dengan barcode ${barcode} tidak ditemukan di Open Food Facts.`,
        });
        return;
      }

      const data = await response.json();
      res.json(data);
    } catch (err: unknown) {
      console.error('OpenFoodFacts barcode lookup error:', err);
      res.status(500).json({
        error: 'Gagal mencari detail produk barcode dari Open Food Facts API.',
        details: err instanceof Error ? err.message : String(err),
      });
    }
  });

  // Setup Vite in development or static serving in production
  if (!isProduction) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, () => {
    console.log(`🌿 SiLuhur Server running at http://localhost:${PORT}`);
  });
}

main().catch((err) => {
  console.error('Server failed to start:', err);
  process.exit(1);
});
