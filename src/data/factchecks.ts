import { FactCheckItem } from '../types';

export const CURATED_FACTCHECKS: FactCheckItem[] = [
  {
    id: 'claim-1',
    claim: 'Jahe bisa sembuhkan semua jenis penyakit, termasuk kanker dan diabetes akut.',
    verdict: 'Mitos',
    strengthOfEvidence: 'Terbatas',
    summary:
      'Jahe memiliki sifat anti-inflamasi dan antioksidan yang baik untuk menjaga kebugaran, namun BUKAN obat penyembuh segala penyakit (panasea). Mengandalkan jahe saja untuk penyakit serius dapat membahayakan keselamatan.',
    scientificEvidence:
      'Senyawa gingerol dan shogaol terbukti dalam uji laboratorium in vitro dapat menekan jalur peradangan dan menghambat pertumbuhan sel tertentu pada cawan petri. Namun, efek di laboratorium tidak otomatis berarti menyembuhkan kanker atau diabetes pada manusia. Pasien diabetes tetap memerlukan pemantauan medis dan manajemen gaya hidup menyeluruh.',
    culturalContext:
      'Masyarakat Nusantara menghargai jahe sebagai rempah penghangat tubuh dan penjaga vitalitas harian. Nenek moyang mengonsumsinya sebagai ramuan pendukung kebugaran, bukan pengganti penanganan medis yang kompleks.',
    safetyCaution:
      'Peringatan penting: Jangan pernah menghentikan obat resep dokter (seperti insulin, kemoterapi, atau obat hipertensi) demi menggantinya dengan ramuan jahe pekat. Dosis jahe berlebih (>4 gram/hari) juga dapat berinteraksi dengan obat pengencer darah.',
    tags: ['Jahe', 'Kanker', 'Diabetes', 'Mitos'],
    references: [
      {
        title: 'National Center for Complementary and Integrative Health (NCCIH) - Ginger Review',
        source: 'NIH (National Institutes of Health)',
      },
      {
        title: 'Badan Pengawas Obat dan Makanan (BPOM) - Klarifikasi Klaim Berlebihan Obat Herbal',
        source: 'BPOM RI',
      },
    ],
    reviewedDate: 'November 2026',
  },
  {
    id: 'claim-2',
    claim: 'Minum air perasan lemon setiap pagi dapat mendetoksifikasi racun dari seluruh organ tubuh.',
    verdict: 'Mitos',
    strengthOfEvidence: 'Terbatas',
    summary:
      'Tubuh manusia sudah memiliki sistem detoksifikasi alami yang sangat canggih melalui organ hati (hepar) dan ginjal. Air lemon menyegarkan dan menghidrasi, namun tidak memiliki kekuatan magis menyerap atau membilas racun.',
    scientificEvidence:
      'Air lemon menyediakan vitamin C (asam askorbat), asam sitrat, dan air untuk hidrasi. Ginjal menyaring produk sisa metabolisme dan hati memproses toksin menjadi bentuk larut air tanpa memerlukan jus pembersih khusus. Tidak ada bukti klinis air lemon mempercepat detoksifikasi organ.',
    culturalContext:
      'Konsep "detoks" modern sering dipadankan dengan tradisi puasa atau jamu pembersih darah Nusantara. Dalam tradisi asli, yang ditekankan adalah pengendalian nafsu makan dan kebersihan batin, bukan klaim kimiawi instan.',
    safetyCaution:
      'Asam sitrat pekat pada lemon dapat mengikis enamel (lapisan pelindung) gigi jika diminum langsung tanpa sedotan atau tidak berkumur air putih setelahnya. Penderita GERD dapat mengalami kekambuhan sensasi terbakar di ulu hati.',
    tags: ['Lemon', 'Detoks', 'Pola Makan', 'Mitos'],
    references: [
      {
        title: 'Detox Diets for Toxin Elimination and Weight Management: A Critical Review of the Evidence',
        source: 'Journal of Human Nutrition and Dietetics',
      },
      {
        title: 'British Dietetic Association (BDA) - Detox Diets Fact Sheet',
        source: 'BDA UK',
      },
    ],
    reviewedDate: 'November 2026',
  },
  {
    id: 'claim-3',
    claim: 'Kunyit dan jamu kunyit asam terbukti dapat membantu meredakan nyeri menstruasi (dismenore).',
    verdict: 'Fakta',
    strengthOfEvidence: 'Kuat',
    summary:
      'Klaim ini didukung oleh uji klinis modern. Kandungan kurkuminoid dalam kunyit memiliki mekanisme penghambatan prostaglandin yang serupa dengan obat anti-inflamasi ringan, sehingga efektif meredakan kram perut saat haid.',
    scientificEvidence:
      'Uji klinis acak tersamar ganda (double-blind RCT) menunjukkan bahwa kurkumin dosis 500 mg/hari selama masa menstruasi secara signifikan menurunkan skor keparahan nyeri dismenore primer dengan menghambat enzim siklooksigenase-2 (COX-2) dan menurunkan sintesis prostaglandin.',
    culturalContext:
      'Jamu Kunyit Asam adalah salah satu warisan kearifan perempuan Nusantara yang paling lestari. Sejak zaman kerajaan Mataram Kuno, ramuan ini diminum para putri keraton menjelang masa haid untuk menjaga kesegaran tubuh dan mencegah lesu.',
    safetyCaution:
      'Aman untuk konsumsi kuliner dan seduhan jamu wajar. Waspadai bagi perempuan yang memiliki riwayat batu empedu atau sedang mengonsumsi antikoagulan.',
    tags: ['Kunyit', 'Menstruasi', 'Kram Perut', 'Fakta'],
    references: [
      {
        title: 'Effect of Curcumin on Dysmenorrhea: A Systematic Review and Meta-Analysis',
        source: 'Complementary Therapies in Medicine (2020)',
      },
      {
        title: 'Kementerian Kesehatan RI - Formularium Ramuan Obat Tradisional Indonesia',
        source: 'Kemenkes RI',
      },
    ],
    reviewedDate: 'November 2026',
  },
  {
    id: 'claim-4',
    claim: 'Semua produk herbal dan ramuan alami dijamin 100% aman dan tidak memiliki efek samping.',
    verdict: 'Mitos',
    strengthOfEvidence: 'Kuat',
    summary:
      'Alami BUKAN berarti otomatis bebas risiko. Bahan alami mengandung senyawa kimia bioaktif aktif yang dapat berinteraksi dengan obat lain, membebani ginjal/hati jika berlebihan, atau tercemar bahan berbahaya jika tidak terstandarisasi.',
    scientificEvidence:
      'Toksikologi modern mencatat banyak tanaman memiliki indeks terapi sempit atau mengandung senyawa nefrotoksik/hepatotoksik pada dosis tinggi (misal asam aristolokhat atau kumarin pekat). Selain itu, bahaya laten di Indonesia adalah pemalsuan jamu kemasan ilegal dengan Bahan Kimia Obat (BKO) seperti deksametason atau parasetamol.',
    culturalContext:
      'Para tabib dan sesepuh jamu tradisional Nusantara selalu menerapkan prinsip takaran, waktu panen, dan cara pengolahan yang ketat. Nenek moyang tidak sembarangan mencampur tanaman obat tanpa memahami pantangannya.',
    safetyCaution:
      'Selalu pastikan produk herbal kemasan memiliki nomor izin edar resmi BPOM (POM TR, POM HT, atau POM FF). Hindari produk dengan klaim "cespleng" instan menyembuhkan dalam sekejap.',
    tags: ['Herbal', 'Keamanan', 'BPOM', 'Mitos'],
    references: [
      {
        title: 'World Health Organization (WHO) Guidelines on Safety Monitoring of Herbal Medicines',
        source: 'WHO Geneva',
      },
      {
        title: 'Peringatan Publik / Public Warning Obat Tradisional Mengandung Bahan Kimia Obat',
        source: 'Badan Pengawas Obat dan Makanan RI',
      },
    ],
    reviewedDate: 'November 2026',
  },
  {
    id: 'claim-5',
    claim: 'Daun kelor terbukti efektif sebagai galaktagog (membantu meningkatkan produksi ASI ibu menyusui).',
    verdict: 'Fakta',
    strengthOfEvidence: 'Kuat',
    summary:
      'Penelitian ilmiah membuktikan ekstrak daun kelor dapat merangsang hormon prolaktin dan meningkatkan volume serta kualitas gizi air susu ibu secara signifikan.',
    scientificEvidence:
      'Berbagai uji klinis acak terkontrol pada ibu pasca-melahirkan menunjukkan kelompok yang mengonsumsi kapsul ekstrak daun kelor mengalami peningkatan volume ASI terukur pada hari ke-3 hingga ke-7 dibandingkan kelompok plasebo, tanpa efek samping serius.',
    culturalContext:
      'Ibu-ibu di Nusa Tenggara Timur, Jawa, dan Madura secara turun-temurun memasak sayur bening daun kelor dengan jagung manis untuk ibu yang baru saja melahirkan demi menjaga kecukupan gizi bayi.',
    safetyCaution:
      'Konsumsi bagian daun muda yang dimasak matang sangat aman. Jangan mengonsumsi kulit akar atau kulit batang kelor selama masa menyusui atau kehamilan.',
    tags: ['Kelor', 'Ibu Menyusui', 'ASI', 'Fakta'],
    references: [
      {
        title: 'Moringa oleifera as a Galactagogue: A Systematic Review and Meta-Analysis of Randomized Controlled Trials',
        source: 'Phytotherapy Research',
      },
      {
        title: 'Panduan Gizi Ibu Menyusui Berbasis Pangan Lokal Nusantara',
        source: 'Kementerian Kesehatan RI',
      },
    ],
    reviewedDate: 'November 2026',
  },
  {
    id: 'claim-6',
    claim: 'Kerokan mengeluarkan angin jahat yang terjebak di dalam pembuluh darah melalui pori-pori kulit.',
    verdict: 'Mitos',
    strengthOfEvidence: 'Sedang',
    summary:
      'Garis-garis merah pada kerokan BUKAN angin yang keluar, melainkan pecahnya pembuluh kapiler darah mikro (petechiae). Kendati mekanismenya berbeda dari mitos, kerokan memang memicu respons relaksasi otot dan endorfin yang nyata.',
    scientificEvidence:
      'Biopsi dan studi mikrosirkulasi membuktikan warna merah adalah ekstravasasi eritrosit mikroskopis di lapisan dermis kulit. Tubuh merespons dengan melepaskan sitokin anti-inflamasi, meningkatkan aliran darah lokal hingga 4x lipat, dan melepaskan endorfin yang menimbulkan sensasi enteng dan nyaman.',
    culturalContext:
      'Istilah "masuk angin" adalah konsep budaya (culture-bound syndrome) khas Indonesia yang merangkum sekumpulan gejala kelelahan, kedinginan, kembung, dan pegal otot.',
    safetyCaution:
      'Jangan kerok bagian leher depan (arteri karotis) atau area luka. Penderita penyakit pembekuan darah atau pengguna obat pengencer darah dilarang kerokan.',
    tags: ['Kerokan', 'Masuk Angin', 'Fisiologi', 'Tradisi'],
    references: [
      {
        title: 'Gua Sha: A Traditional Technique for Modern Practice',
        source: 'Elsevier Health Sciences',
      },
      {
        title: 'Kajian Etnomedisin dan Fisiologi Terapi Kerokan Nusantara',
        source: 'Fakultas Kedokteran Universitas Sebelas Maret (UNS)',
      },
    ],
    reviewedDate: 'November 2026',
  },
];

export const CURATED_FACTCHECKS_EN: FactCheckItem[] = [
  {
    id: 'claim-1',
    claim: 'Ginger cures all types of illnesses, including acute cancer and diabetes.',
    verdict: 'Mitos',
    strengthOfEvidence: 'Terbatas',
    summary:
      'Ginger possesses valuable antioxidant and anti-inflammatory properties, but it is NOT a universal cure-all. Relying exclusively on ginger for serious diseases can endanger patient survival.',
    scientificEvidence:
      'Gingerol and shogaol compounds have been shown in laboratory test tubes to inhibit inflammation and inhibit certain cancer cell models. However, laboratory assays do not equate to clinical human cures. Diabetic and cancer patients still require certified clinical medical supervision.',
    culturalContext:
      'Indonesian communities celebrate ginger as a warming spice and stamina booster. Ancestors brewed it as supportive daily wellness nourishment, not a substitute for clinical physician care.',
    safetyCaution:
      'Critical warning: Never discontinue prescribed medications (such as insulin, chemotherapy, or antihypertensives) in favor of high-concentration ginger brews. Dosages exceeding 4 grams/day may also interact with anticoagulant blood thinners.',
    tags: ['Ginger', 'Cancer', 'Diabetes', 'Myth'],
    references: [
      {
        title: 'National Center for Complementary and Integrative Health (NCCIH) - Ginger Review',
        source: 'NIH (National Institutes of Health)',
      },
      {
        title: 'National Agency of Drug and Food Control - Clarification on Exaggerated Herbal Claims',
        source: 'BPOM Indonesia',
      },
    ],
    reviewedDate: 'November 2026',
  },
  {
    id: 'claim-2',
    claim: 'Drinking freshly squeezed lemon water every morning detoxifies all bodily organs.',
    verdict: 'Mitos',
    strengthOfEvidence: 'Terbatas',
    summary:
      'The human body already possesses an advanced detoxification system operated by the liver and kidneys. Lemon water is refreshing and hydrating, but has no special biological ability to extract toxins.',
    scientificEvidence:
      'Lemon water provides vitamin C (ascorbic acid), citric acid, and water. Kidneys filter metabolic waste and the liver neutralizes toxins into water-soluble byproducts without needing detox juices. There is no clinical trial supporting lemon water as an organ detoxifier.',
    culturalContext:
      'Modern detox trends often borrow ideas from traditional fasting or blood-purifying herbal broths. Original traditions focused on caloric moderation and mindful rest rather than magical chemical cleanses.',
    safetyCaution:
      'Concentrated citric acid can demineralize dental enamel if consumed without a straw or not followed by clean water rinsing. Patients with GERD may experience acid reflux flare-ups.',
    tags: ['Lemon', 'Detox', 'Diet', 'Myth'],
    references: [
      {
        title: 'Detox Diets for Toxin Elimination and Weight Management: A Critical Review of the Evidence',
        source: 'Journal of Human Nutrition and Dietetics',
      },
      {
        title: 'British Dietetic Association (BDA) - Detox Diets Fact Sheet',
        source: 'BDA UK',
      },
    ],
    reviewedDate: 'November 2026',
  },
  {
    id: 'claim-3',
    claim: 'Turmeric and tamarind brew is clinically proven to relieve menstrual cramps (dysmenorrhea).',
    verdict: 'Fakta',
    strengthOfEvidence: 'Kuat',
    summary:
      'This claim is backed by rigorous clinical trials. Curcumin in turmeric inhibits prostaglandin synthesis similarly to mild NSAIDs, effectively relieving menstrual cramps and uterine spasms.',
    scientificEvidence:
      'Double-blind randomized controlled trials (RCTs) show that daily curcumin (500 mg) during menstruation significantly lowers primary dysmenorrhea pain scores by inhibiting COX-2 inflammatory enzymes.',
    culturalContext:
      'Jamu Kunyit Asam is one of the most enduring women’s wellness traditions in Indonesia. Royal palace maidens have consumed it since the ancient Mataram kingdom to stay refreshed and ease menses.',
    safetyCaution:
      'Safe for regular culinary and home jamu intake. Caution is advised for women with active gallstones or those taking anticoagulant medication.',
    tags: ['Turmeric', 'Menstruation', 'Cramps', 'Fact'],
    references: [
      {
        title: 'Effect of Curcumin on Dysmenorrhea: A Systematic Review and Meta-Analysis',
        source: 'Complementary Therapies in Medicine (2020)',
      },
      {
        title: 'Indonesian Ministry of Health - Formulary of Traditional Herbal Medicines',
        source: 'MoH Republic of Indonesia',
      },
    ],
    reviewedDate: 'November 2026',
  },
  {
    id: 'claim-4',
    claim: 'All herbal products and natural remedies are guaranteed 100% safe with zero side effects.',
    verdict: 'Mitos',
    strengthOfEvidence: 'Kuat',
    summary:
      'Natural does NOT automatically mean free of danger. Botanicals contain potent bioactives that can interact with prescription drugs, strain the liver or kidneys, or cause harm if adulterated.',
    scientificEvidence:
      'Modern pharmacology notes that certain herbs have narrow therapeutic windows or carry nephrotoxic risks in excessive doses. Furthermore, illegal traditional remedies in circulation can be adulterated with synthetic pharmaceutical chemicals (BKO).',
    culturalContext:
      'Traditional jamu practitioners adhered strictly to dosage, harvesting seasons, and preparation hygiene. Ancestral medicine never casually compounded remedies without observing contraindications.',
    safetyCaution:
      'Always confirm that packaged herbal remedies possess an official regulatory license (e.g., BPOM). Reject remedies promising instant, miraculous results.',
    tags: ['Herbal', 'Safety', 'BPOM', 'Myth'],
    references: [
      {
        title: 'World Health Organization (WHO) Guidelines on Safety Monitoring of Herbal Medicines',
        source: 'WHO Geneva',
      },
      {
        title: 'Public Warning on Traditional Medicines Adulterated with Synthetic Pharmaceuticals',
        source: 'BPOM Indonesia',
      },
    ],
    reviewedDate: 'November 2026',
  },
  {
    id: 'claim-5',
    claim: 'Moringa leaves are clinically proven effective as a galactagogue (boosting breast milk volume).',
    verdict: 'Fakta',
    strengthOfEvidence: 'Kuat',
    summary:
      'Scientific studies demonstrate that Moringa leaf extract stimulates prolactin secretion, significantly improving breast milk production and nutrient density in nursing mothers.',
    scientificEvidence:
      'Multiple randomized controlled trials on postpartum mothers show measurable increases in breast milk volume between days 3 and 7 compared to placebo, without notable adverse effects.',
    culturalContext:
      'Mothers in East Nusa Tenggara and Java traditionally prepare clear moringa soup with sweet corn for new mothers to support infant nutrition and lactation.',
    safetyCaution:
      'Well-cooked young moringa leaves are very safe. Avoid consuming root or bark extracts during lactation or pregnancy.',
    tags: ['Moringa', 'Breastfeeding', 'Lactation', 'Fact'],
    references: [
      {
        title: 'Moringa oleifera as a Galactagogue: A Systematic Review and Meta-Analysis of Randomized Controlled Trials',
        source: 'Phytotherapy Research',
      },
      {
        title: 'Maternal Nutrition Guidelines Based on Indonesian Local Foods',
        source: 'Ministry of Health RI',
      },
    ],
    reviewedDate: 'November 2026',
  },
  {
    id: 'claim-6',
    claim: 'Coin scraping (kerokan) expels trapped evil wind from blood vessels through skin pores.',
    verdict: 'Mitos',
    strengthOfEvidence: 'Sedang',
    summary:
      'The red lines from coin scraping are NOT escaping wind, but superficial capillary extravasation (petechiae). However, the mechanical stimulation induces genuine muscular relaxation and endorphin release.',
    scientificEvidence:
      'Biopsy and microcirculation research confirms the red marks represent microscopic erythrocyte leakage in the dermis. The body responds by releasing anti-inflammatory cytokines, enhancing local blood flow up to 4-fold, and elevating systemic endorphin levels.',
    culturalContext:
      'The term "masuk angin" is an Indonesian culture-bound syndrome describing a combination of chills, fatigue, abdominal bloating, and muscle aches.',
    safetyCaution:
      'Never scrape over the anterior neck (carotid artery) or inflamed skin. Individuals with coagulation disorders or on anticoagulants must strictly avoid scraping.',
    tags: ['Coin Scraping', 'Masuk Angin', 'Physiology', 'Tradition'],
    references: [
      {
        title: 'Gua Sha: A Traditional Technique for Modern Practice',
        source: 'Elsevier Health Sciences',
      },
      {
        title: 'Ethnomedical and Physiological Review of Kerokan Therapy',
        source: 'Faculty of Medicine, Sebelas Maret University (UNS)',
      },
    ],
    reviewedDate: 'November 2026',
  },
];

export function getCuratedFactchecks(language: 'id' | 'en' = 'id'): FactCheckItem[] {
  return language === 'en' ? CURATED_FACTCHECKS_EN : CURATED_FACTCHECKS;
}
