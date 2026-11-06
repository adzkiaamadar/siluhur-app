import { HerbItem } from '../types';

export const NUSANTARA_REGIONS = [
  'Semua Wilayah',
  'Sumatra',
  'Jawa',
  'Bali & Nusa Tenggara',
  'Kalimantan',
  'Sulawesi',
  'Maluku & Papua',
] as const;

export const HERB_DATABASE: HerbItem[] = [
  {
    id: 'jahe',
    name: 'Jahe',
    scientificName: 'Zingiber officinale',
    localNames: {
      Sunda: 'Jahe',
      Jawa: 'Jahe',
      Batak: 'Bahing',
      Bugis: 'Pese',
      Maluku: 'Goraka',
    },
    region: 'Jawa',
    specificOrigin: 'Jawa Barat',
    type: 'Tanaman',
    category: 'Rempah Rimpang',
    openFoodFactsTag: 'ginger',
    imageUrl: '/assets/images/jahe_botanical_1793585773910.jpg',
    description:
      'Jahe adalah tanaman rimpang yang telah ribuan tahun menjadi pilar pengobatan tradisional dan kuliner Nusantara. Rimpangnya aromatik dengan rasa pedas hangat yang khas.',
    culturalContext:
      'Dalam kosmologi Jawa dan Sunda, jahe dipandang sebagai rempah penghangat tubuh (penyeimbang unsur dingin). Disajikan dalam wedang jahe, bajigur, bandrek, atau sekoteng pada malam hari atau musim penghujan.',
    traditionalUse: [
      'Menghangatkan tubuh saat meriang atau masuk angin',
      'Meredakan mual perjalanan atau morning sickness',
      'Mengurangi kembung dan perut begah',
      'Pereda pegal linu setelah beraktivitas berat',
    ],
    keyBenefits: [
      'Meningkatkan imunitas tubuh',
      'Meredakan peradangan & nyeri otot',
      'Melancarkan pencernaan & anti-mual',
    ],
    scientificEvidence: {
      summary:
        'Studi meta-analisis mengonfirmasi efektivitas gingerol dan shogaol dalam mengurangi mual (termasuk mual kehamilan dan pasca-kemoterapi) serta memiliki efek modulasi inflamasi yang terukur.',
      evidenceLevel: 'Kuat',
      activeCompounds: ['6-Gingerol', 'Shogaol', 'Zingiberene', 'Paradol'],
      clinicalFindings:
        'Uji klinis acak (RCT) menunjukkan jahe 1000 mg/hari efektif meredakan dismenore primer dan mual ringan. Efek antiinflamasi bekerja melalui inhibisi enzim COX-2 dan leukotrien.',
    },
    safetyNotes: {
      precautions: [
        'Aman dikonsumsi sebagai bumbu kuliner atau wedang harian (1-2 cangkir)',
        'Bagi penderita tukak lambung akut, hindari seduhan terlalu pekat saat perut kosong',
      ],
      contraindications: [
        'Konsumsi dosis suplemen pekat (>4g/hari) perlu diwaspadai bagi pengguna obat pengencer darah (Warfarin/Aspirin)',
        'Dua minggu menjelang operasi terjadwal',
      ],
      maxSafeIntake: 'Maksimal 3-4 gram rimpang kering atau setara 15 gram jahe segar per hari untuk dewasa.',
      whenToSeeDoctor:
        'Jika mual disertai muntah darah, dehidrasi berat, atau nyeri lambung menusuk yang tidak kunjung reda.',
    },
    references: [
      {
        title: 'BPOM RI - Monografi Ekstrak Tumbuhan Obat Indonesia',
        source: 'Direktorat Obat Asli Indonesia, BPOM RI',
      },
      {
        title: 'Efficacy of Ginger for Nausea and Vomiting: Systematic Review',
        source: 'American Journal of Obstetrics and Gynecology (2014)',
      },
      {
        title: 'Ginger on Human Health: A Comprehensive Systematic Review',
        source: 'Nutrients Journal (2020)',
      },
    ],
  },
  {
    id: 'kunyit',
    name: 'Kunyit',
    scientificName: 'Curcuma longa',
    localNames: {
      Jawa: 'Kunyir / Kunir',
      Sunda: 'Koneng',
      Madura: 'Konyet',
      Bali: 'Kunyit',
      Minangkabau: 'Kunyet',
    },
    region: 'Jawa',
    specificOrigin: 'Jawa Tengah',
    type: 'Tanaman',
    category: 'Rempah Rimpang',
    openFoodFactsTag: 'turmeric',
    imageUrl: '/assets/images/kunyit_botanical_1793585826476.jpg',
    description:
      'Kunyit memiliki warna kuning jingga cemerlang berkat kurkuminoid. Salah satu rimpang terpenting dalam ramuan Jamu Kunyit Asam yang terkenal di seluruh kepulauan Indonesia.',
    culturalContext:
      'Simbol pemurnian, kecantikan kulit, dan kesehatan rahim perempuan. Jamu kunyit asam dikonsumsi secara turun-temurun menjelang dan selama masa menstruasi untuk menjaga kebugaran dan melancarkan haid.',
    traditionalUse: [
      'Meredakan nyeri haid (dismenore)',
      'Memelihara kesehatan fungsi lambung dan maag',
      'Perawatan lulur pengantin tradisional (kuning lulur)',
      'Menyegarkan bau badan',
    ],
    keyBenefits: [
      'Antioksidan dan anti-inflamasi alami',
      'Mendukung kesehatan fungsi lambung',
      'Membantu meredakan ketidaknyamanan saat haid',
    ],
    scientificEvidence: {
      summary:
        'Kurkumin terbukti sebagai antioksidan polifenol poten yang menghambat sitokin pro-inflamasi (TNF-alpha, IL-6). Namun bioavailabilitas kurkumin murni relatif rendah bila dikonsumsi tanpa piperin (lada hitam) atau lemak.',
      evidenceLevel: 'Kuat',
      activeCompounds: ['Curcumin', 'Demethoxycurcumin', 'Bisdemethoxycurcumin', 'Turmerone'],
      clinicalFindings:
        'Beberapa uji klinis mendokumentasikan perbaikan gejala dispepsia fungsional dan osteoartritis lutut ringan dengan ekstrak kurkumin terstandarisasi.',
    },
    safetyNotes: {
      precautions: [
        'Konsumsi kuliner dan seduhan jamu wajar sangat aman',
        'Dapat meninggalkan noda warna pada gigi jika dikonsumsi sangat sering tanpa berkumur',
      ],
      contraindications: [
        'Pasien dengan sumbatan saluran empedu aktif (batu empedu simptomatik)',
        'Penggunaan bersamaan dengan antikoagulan dosis tinggi',
      ],
      maxSafeIntake: 'WHO merekomendasikan asupan kurkumin terstandarisasi hingga 3 mg/kg berat badan per hari.',
      whenToSeeDoctor:
        'Bila timbul kulit kuning, mata kuning (ikterik), atau nyeri perut kanan atas yang tajam.',
    },
    references: [
      {
        title: 'Kementerian Kesehatan RI - Formularium Ramuan Obat Tradisional Indonesia (FROTI)',
        source: 'Kemenkes RI',
      },
      {
        title: 'Curcumin: A Review of Its Effects on Human Health',
        source: 'Foods Journal (MDPI, 2017)',
      },
    ],
  },
  {
    id: 'temulawak',
    name: 'Temulawak',
    scientificName: 'Curcuma zanthorrhiza',
    localNames: {
      Jawa: 'Temulawak',
      Sunda: 'Koneng Gede',
      Madura: 'Temo Labak',
    },
    region: 'Jawa',
    specificOrigin: 'Jawa Tengah',
    type: 'Tanaman',
    category: 'Rempah Rimpang',
    openFoodFactsTag: 'curcuma',
    imageUrl: '/assets/images/temulawak_botanical_1793585877504.jpg',
    description:
      'Temulawak adalah tanaman asli Indonesia (endemik Jawa) yang telah lama menjadi maskot tanaman obat unggulan nasional. Rimpangnya lebih besar dibanding kunyit dengan aroma khas xanthorrhizol.',
    culturalContext:
      'Rempah utama jamu paitan dan jamu gendong untuk memelihara fungsi organ hati (hepar), menambah nafsu makan anak, serta membersihkan darah pasca-melahirkan.',
    traditionalUse: [
      'Menstimulasi nafsu makan dan penyerapan gizi',
      'Membantu memelihara kesehatan fungsi hati (hepatoprotektor)',
      'Memperlancar sekresi empedu dan meredakan perut begah',
    ],
    keyBenefits: [
      'Menjaga kesehatan fungsi organ hati',
      'Membantu perbaikan nafsu makan',
      'Mendukung metabolisme lipid dan pencernaan',
    ],
    scientificEvidence: {
      summary:
        'Kandungan xanthorrhizol unik hanya ditemukan pada C. zanthorrhiza, memiliki aktivitas antibakteri dan hepatoprotektif yang didukung banyak penelitian pra-klinis dan uji fitofarmaka di Indonesia.',
      evidenceLevel: 'Sedang',
      activeCompounds: ['Xanthorrhizol', 'Kurkuminoid', 'Kamfer', 'Germakren'],
      clinicalFindings:
        'Studi di Indonesia menunjukkan ekstrak temulawak terstandarisasi membantu menurunkan enzim transaminase (SGOT/SGPT) pada kondisi perlemakan hati non-alkoholik tingkat awal.',
    },
    safetyNotes: {
      precautions: [
        'Gunakan rebusan segar 10-15 gram rimpang diiris tipis',
        'Rasa agak pahit, dapat dipadukan dengan gula aren atau asam jawa secukupnya',
      ],
      contraindications: ['Obstruksi saluran empedu total', 'Ulkus peptikum parah'],
      whenToSeeDoctor: 'Bila nafsu makan drop drastis disertai penurunan berat badan tanpa sebab jelas.',
    },
    references: [
      {
        title: 'Farmakope Herbal Indonesia Edisi II',
        source: 'Kementerian Kesehatan RI (2017)',
      },
      {
        title: 'Xanthorrhizol: A Review of Its Pharmacological Activities',
        source: 'Fitoterapia (2015)',
      },
    ],
  },
  {
    id: 'daun-kelor',
    name: 'Daun Kelor',
    scientificName: 'Moringa oleifera',
    localNames: {
      Jawa: 'Kelor',
      Sunda: 'Kelor',
      Sasak: 'Kelo',
      Madura: 'Marongghi',
      Timor: 'Kelor / Motong',
    },
    region: 'Bali & Nusa Tenggara',
    specificOrigin: 'Nusa Tenggara Timur',
    type: 'Tanaman',
    category: 'Daun Berkhasiat',
    imageUrl: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=600&q=80',
    description:
      'Sering dijuluki "Pohon Keajaiban" (Miracle Tree). Di NTT dan Nusa Tenggara, kelor tumbuh subur di tanah kering dan menjadi sumber pangan bernutrisi padat pelawan stunting.',
    culturalContext:
      'Selain menjadi sayur bening tradisi harian di keluarga Timor dan Flores, kelor kaya simbol budaya pelindung. Di era modern, kelor NTT diakui sebagai superfood lokal bernilai gizi tinggi.',
    traditionalUse: [
      'Sayur pelengkap pemulihan ibu menyusui (pelancar ASI)',
      'Asupan nutrisi penambah tenaga dan vitalitas',
      'Pembersih darah dan penurun panas anak secara kompres',
    ],
    keyBenefits: [
      'Kaya zat besi, kalsium, & vitamin C nabati',
      'Membantu menjaga kadar gula darah normal',
      'Mendukung produksi ASI pada ibu menyusui',
    ],
    scientificEvidence: {
      summary:
        'Daun kelor memiliki densitas mikronutrien luar biasa tinggi: flavonoid (kuersetin, kaempferol), asam klorogenat, dan asam amino esensial lengkap untuk protein nabati.',
      evidenceLevel: 'Kuat',
      activeCompounds: ['Quercetin', 'Chlorogenic acid', 'Moringine', 'Beta-karoten'],
      clinicalFindings:
        'Uji klinis pada ibu pasca-persalinan membuktikan konsumsi daun kelor secara signifikan meningkatkan volume produksi ASI dan kadar hemoglobin darah.',
    },
    safetyNotes: {
      precautions: [
        'Konsumsi daun muda yang dimasak matang atau diseduh sebagai teh',
        'Jangan merebus terlalu lama (>5 menit) agar vitamin C dan antioksidannya tidak rusak',
      ],
      contraindications: ['Hindari mengonsumsi kulit akar kelor karena mengandung alkaloid spirochin yang berbahaya bagi kehamilan'],
      whenToSeeDoctor: 'Jika lemas berlanjut atau dicurigai anemia berat.',
    },
    references: [
      {
        title: 'Moringa oleifera: A Review on Nutritive Importance and Its Medicinal Application',
        source: 'Food Science and Human Wellness (2016)',
      },
      {
        title: 'Studi Klinis Kelor pada Peningkatan Kualitas ASI dan Status Gizi Ibu',
        source: 'Badan Riset dan Inovasi Nasional (BRIN)',
      },
    ],
  },
  {
    id: 'kayu-manis',
    name: 'Kayu Manis',
    scientificName: 'Cinnamomum burmannii',
    localNames: {
      Minangkabau: 'Kulik Manih',
      Jawa: 'Kayu Manis',
      Batak: 'Holim',
    },
    region: 'Sumatra',
    specificOrigin: 'Sumatra Barat (Kerinci & Padang)',
    type: 'Tanaman',
    category: 'Kulit Batang Rempah',
    imageUrl: 'https://images.unsplash.com/photo-1509358271058-acd22cc93898?auto=format&fit=crop&w=600&q=80',
    description:
      'Indonesia adalah produsen kayu manis jenis Cassia (C. burmannii) terbesar di dunia, terutama dari lereng Gunung Kerinci dan pegunungan Bukit Barisan Sumatra Barat.',
    culturalContext:
      'Rempah aromatik utama dalam gulai, rendang, dan minuman teh talua atau wedang rempah. Aromanya memberi ketenangan jiwa dan menghangatkan lambung.',
    traditionalUse: [
      'Pereda kram perut dan kembung',
      'Mengharumkan napas dan kesehatan gigi tradisional',
      'Penambah aroma dan cita rasa hangat pada minuman kesehatan',
    ],
    keyBenefits: [
      'Membantu meningkatkan sensitivitas insulin',
      'Aktivitas anti-mikroba alami',
      'Aromaterapi relaksasi penurun stres',
    ],
    scientificEvidence: {
      summary:
        'Cinnamaldehyde adalah senyawa volatil utama yang menunjukkan efek modulasi metabolisme glukosa dengan meniru aksi insulin pada reseptor seluler.',
      evidenceLevel: 'Sedang',
      activeCompounds: ['Cinnamaldehyde', 'Eugenol', 'Polifenol A-type'],
      clinicalFindings:
        'Konsumsi 1-2 gram kayu manis bubuk per hari selama 12 minggu menunjukkan tren penurunan kadar gula darah puasa (FPG) pada penderita pra-diabetes.',
    },
    safetyNotes: {
      precautions: [
        'Jenis Cassia mengandung senyawa kumarin lebih tinggi daripada Ceylon cinnamon',
        'Gunakan secukupnya sebagai bumbu atau 1 batang kecil seduhan per hari',
      ],
      contraindications: ['Penderita gangguan fungsi hati kronis sebaiknya tidak mengonsumsi suplemen ekstrak kayu manis konsentrat tinggi'],
      maxSafeIntake: 'Maksimal 1 sendok teh bubuk (sekitar 2-3 gram) per hari.',
      whenToSeeDoctor: 'Jika penderita diabetes mengalami gejala hipoglikemia berat saat mencoba memadukan rempah dengan terapi insulin.',
    },
    references: [
      {
        title: 'Cinnamon: Potential Role in the Prevention of Insulin Resistance',
        source: 'Diabetes Care (American Diabetes Association)',
      },
    ],
  },
  {
    id: 'andaliman',
    name: 'Andaliman',
    scientificName: 'Zanthoxylum acanthopodium',
    localNames: {
      Batak: 'Andaliman / Itir-itir',
      Karo: 'Tuba Toba',
    },
    region: 'Sumatra',
    specificOrigin: 'Sumatra Utara (Tanah Batak)',
    type: 'Tanaman',
    category: 'Rempah Biji',
    imageUrl: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=600&q=80',
    description:
      'Disebut sebagai "Merica Batak", buah kecil liar ini memberikan sensasi rasa getir, kelu, dan kebas di lidah dengan aroma citrus segar yang unik.',
    culturalContext:
      'Rempah sakral dalam hidangan tradisi Batak seperti Arsik Ikan Mas dan Sambal Tuk-tuk. Kehadirannya melambangkan kehangatan ikatan kekeluargaan dalam upacara adat.',
    traditionalUse: [
      'Meningkatkan nafsu makan dan memperlancar sekresi air liur',
      'Pengawet alami daging dan ikan mas tradisional',
      'Penghangat badan saat berada di dataran tinggi Danau Toba yang dingin',
    ],
    keyBenefits: [
      'Kaya antioksidan flavonoid dan alkaloid',
      'Senyawa hydroxy-alpha-sanshool untuk stimulasi saraf sensorik',
      'Aktivitas antimikroba alami terhadap bakteri pembusuk',
    ],
    scientificEvidence: {
      summary:
        'Sensasi getar di lidah disebabkan oleh sanshool yang mengaktifkan kanal ion TRPV1 dan TRPA1. Penelitian lokal di USU dan BRIN membuktikan ekstrak andaliman memiliki kapasitas penangkap radikal bebas tinggi.',
      evidenceLevel: 'Sedang',
      activeCompounds: ['Hydroxy-alpha-sanshool', 'Geraniol', 'Linalool', 'Limonene'],
      clinicalFindings:
        'Aktivitas antibakteri terhadap Staphylococcus aureus dan Escherichia coli terbukti kuat dalam uji mikrobiologi pangan.',
    },
    safetyNotes: {
      precautions: ['Sensasi kebas bersifat fisiologis sementara dan tidak berbahaya bagi individu sehat'],
      contraindications: ['Penderita sariawan luas atau radang gusi akut disarankan membatasi karena rasa getirnya bisa terasa menyengat'],
      whenToSeeDoctor: 'Bila timbul reaksi alergi langka seperti bengkak bibir atau gatal hebat.',
    },
    references: [
      {
        title: 'Potensi Antioksidan dan Antimikroba Andaliman (Zanthoxylum acanthopodium DC)',
        source: 'Jurnal Teknologi dan Industri Pangan IPB',
      },
    ],
  },
  {
    id: 'bawang-dayak',
    name: 'Bawang Dayak',
    scientificName: 'Eleutherine bulbosa',
    localNames: {
      Dayak: 'Bawang Tiwai / Bawang Hantu',
      Banjar: 'Bawang Sabrang',
    },
    region: 'Kalimantan',
    specificOrigin: 'Kalimantan Timur & Kalimantan Tengah',
    type: 'Tanaman',
    category: 'Umbi Obat',
    openFoodFactsTag: 'onion',
    imageUrl: '/assets/images/bawang_dayak_1793585810520.jpg',
    description:
      'Umbi berwarna merah tua berlapis seperti bawang merah dengan bunga putih kecil. Tumbuh subur di pedalaman hutan Kalimantan dan menjadi andalan tetua suku Dayak.',
    culturalContext:
      'Masyarakat Dayak memanfaatkan umbi ini sebagai pertolongan pertama untuk luka, pemulihan pasca-melahirkan, hingga penjaga kebugaran saat berburu di hutan.',
    traditionalUse: [
      'Membantu menurunkan tekanan darah tinggi (hipertensi)',
      'Mengurangi peradangan dan nyeri sendi',
      'Membantu mengatasi bisul dan infeksi kulit luar',
    ],
    keyBenefits: [
      'Kaya naftokuinon dan antosianin',
      'Mendukung regulasi tekanan darah',
      'Antioksidan pelindung sel',
    ],
    scientificEvidence: {
      summary:
        'Kandungan eleutherine dan eleutherol menunjukkan aktivitas vasodilatasi (pelebaran pembuluh darah) dan efek diuretik ringan dalam pengujian in vivo.',
      evidenceLevel: 'Sedang',
      activeCompounds: ['Eleutherine', 'Eleutherol', 'Isoeleutherine', 'Antosianin'],
      clinicalFindings:
        'Riset fitokimia dari Universitas Mulawarman mendokumentasikan potensi penghambatan enzim ACE yang relevan untuk penelitian anti-hipertensi.',
    },
    safetyNotes: {
      precautions: ['Dikonsumsi dengan merebus 3-5 siung umbi segar yang telah dicuci bersih dan diiris tipis'],
      contraindications: ['Ibu hamil trimester pertama sebaiknya menghindari konsumsi berlebih'],
      whenToSeeDoctor: 'Penderita hipertensi harus tetap memantau tensi secara teratur dan tidak melepas obat dokter secara sepihak.',
    },
    references: [
      {
        title: 'Fitofarmaka Bawang Dayak dalam Manajemen Kesehatan Tradisional Kalimantan',
        source: 'Fakultas Farmasi Universitas Mulawarman',
      },
    ],
  },
  {
    id: 'buah-merah',
    name: 'Buah Merah Papua',
    scientificName: 'Pandanus conoideus',
    localNames: {
      Papua: 'Kuansu',
      Dani: 'Tawi',
    },
    region: 'Maluku & Papua',
    specificOrigin: 'Papua (Pegunungan Jayawijaya)',
    type: 'Pangan',
    category: 'Buah & Pangan Lokal',
    imageUrl: 'https://images.unsplash.com/photo-1550258987-190a2d41a8ba?auto=format&fit=crop&w=600&q=80',
    description:
      'Buah raksasa berbentuk lonjong silindris berwarna merah menyala yang tumbuh di dataran tinggi Papua. Diekstrak menjadi pasta merah kaya minyak untuk saus pangan lokal.',
    culturalContext:
      'Bagian tak terpisahkan dari ritual adat bakar batu masyarakat suku Dani dan Wamena. Merupakan sumber energi dan ketahanan fisik masyarakat pegunungan yang terbiasa hidup di hawa dingin ekstrem.',
    traditionalUse: [
      'Penyedap rasa kaya nutrisi saat pesta adat bakar batu',
      'Sumber stamina bagi peladang dan pemburu',
      'Pemelihara kesehatan mata dan daya tahan fisik',
    ],
    keyBenefits: [
      'Konsentrasi karotenoid (beta-karoten & alfa-tokoferol) sangat tinggi',
      'Asam lemak tak jenuh ganda (omega-3 dan omega-9)',
      'Mendukung perlindungan sel dari stres oksidatif',
    ],
    scientificEvidence: {
      summary:
        'Minyak buah merah merupakan salah satu sumber nabati terkaya provitamin A dan vitamin E alami, berperan penting sebagai antioksidan pemulung radikal bebas.',
      evidenceLevel: 'Sedang',
      activeCompounds: ['Beta-karoten', 'Beta-kriptosantin', 'Alfa-tokoferol', 'Asam oleat'],
      clinicalFindings:
        'Penelitian uji klinis terbatas menunjukkan peningkatan status antioksidan serum dan perbaikan biomarker stres oksidatif pada relawan sehat.',
    },
    safetyNotes: {
      precautions: ['Pastikan minyak buah merah diperoleh dari produsen terdaftar BPOM untuk menjamin higienitas proses ekstraksi'],
      contraindications: ['Penderita pankreatitis akut sebaiknya membatasi asupan minyak kental'],
      whenToSeeDoctor: 'Jika mengalami diare berulang akibat asupan minyak berlebih.',
    },
    references: [
      {
        title: 'Karakteristik Kimia dan Manfaat Minyak Buah Merah Papua',
        source: 'Puslitbang Gizi dan Makanan Kemenkes RI',
      },
    ],
  },
  {
    id: 'cengkeh',
    name: 'Cengkeh',
    scientificName: 'Syzygium aromaticum',
    localNames: {
      Maluku: 'Cangke',
      Jawa: 'Cengkeh',
      Sunda: 'Cengkeh',
    },
    region: 'Maluku & Papua',
    specificOrigin: 'Kepulauan Maluku (Ternate & Tidore)',
    type: 'Tanaman',
    category: 'Rempah Bunga',
    imageUrl: 'https://images.unsplash.com/photo-1599940824399-b87987ceb72a?auto=format&fit=crop&w=600&q=80',
    description:
      'Kuncup bunga kering aromatik yang menjadi magnet bangsa-bangsa dunia ke Kepulauan Rempah Maluku. Kaya minyak atsiri dengan komponen eugenol berkhasiat anestesi lokal.',
    culturalContext:
      'Warisan kebanggaan Kesultanan Ternate dan Tidore. Di Nusantara, cengkeh digunakan dalam masakan, wedang uwuh, rokok herbal tradisional, dan minyak gosok.',
    traditionalUse: [
      'Pereda sakit gigi darurat dengan menggigit cengkeh utuh',
      'Pengharum napas dan penyegar tenggorokan',
      'Campuran minyak urut untuk meredakan nyeri persendian',
    ],
    keyBenefits: [
      'Senyawa eugenol sebagai anestetik lokal alami',
      'Antiseptik kuat rongga mulut',
      'Membantu meredakan batuk dan melegakan saluran napas',
    ],
    scientificEvidence: {
      summary:
        'Eugenol telah disetujui dalam kedokteran gigi modern (zinc oxide eugenol) sebagai penambal sementara dan sedatif pulpa gigi karena efek analgesik dan antimikroba yang kuat.',
      evidenceLevel: 'Kuat',
      activeCompounds: ['Eugenol', 'Eugenyl acetate', 'Beta-caryophyllene'],
      clinicalFindings:
        'Uji klinis menunjukkan aplikasi topikal gel eugenol cengkeh setara dengan benzokain 20% dalam meredakan nyeri mukosa mulut.',
    },
    safetyNotes: {
      precautions: ['Minyak atsiri murni cengkeh tidak boleh ditelan langsung karena dapat mengiritasi lambung'],
      contraindications: ['Jangan teteskan minyak cengkeh murni langsung ke gusi anak kecil'],
      whenToSeeDoctor: 'Sakit gigi yang berdenyut hebat harus segera ditangani dokter gigi untuk mengatasi infeksi akar.',
    },
    references: [
      {
        title: 'Eugenol: A Natural Compound with Versatile Pharmacological Actions',
        source: 'Natural Product Research (2019)',
      },
    ],
  },
  {
    id: 'wedang-uwuh',
    name: 'Wedang Uwuh',
    region: 'Jawa',
    specificOrigin: 'DI Yogyakarta (Imogiri)',
    type: 'Tradisi',
    category: 'Minuman Tradisional',
    imageUrl: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=600&q=80',
    description:
      'Secara harfiah berarti "minuman sampah" karena tampilannya yang seperti tumpukan dedaunan dan serutan kayu kering di cangkir. Merupakan minuman khas makam raja-raja Imogiri Yogyakarta.',
    culturalContext:
      'Diramu dari serutan kayu secang (memberi warna merah cerah alami), jahe, cengkeh, kayu manis, pala, daun pala, dan gula batu. Simbol kerendahhatian dan kehangatan sambutan tamu keraton.',
    traditionalUse: [
      'Menghangatkan tubuh di malam hari',
      'Menyegarkan badan saat merasa lesu atau masuk angin',
      'Melancarkan sirkulasi darah',
    ],
    keyBenefits: [
      'Sinergi polifenol secang (brazilin) dan gingerol jahe',
      'Warna merah alami tanpa pewarna sintetis',
      'Kombinasi aromaterapi alami penenang saraf',
    ],
    scientificEvidence: {
      summary:
        'Kayu secang mengandung brazilin yang memiliki aktivitas antioksidan dan perlindungan kardiovaskular dalam riset in vitro. Dipadukan dengan jahe dan rempah lainnya, wedang uwuh merupakan minuman fungsional kaya antioksidan.',
      evidenceLevel: 'Sedang',
      activeCompounds: ['Brazilin (Secang)', 'Gingerol (Jahe)', 'Eugenol (Cengkeh)'],
      clinicalFindings:
        'Kapasitas antioksidan IC50 wedang uwuh terbukti sangat tinggi dalam uji DPPH di beberapa penelitian universitas di Yogyakarta.',
    },
    safetyNotes: {
      precautions: ['Gunakan gula batu secukupnya agar tidak berlebih kadar gulanya bagi penderita diabetes'],
      contraindications: ['Aman untuk konsumsi harian keluarga'],
      whenToSeeDoctor: 'Jika demam tinggi >38.5C atau menggigil hebat.',
    },
    references: [
      {
        title: 'Profil Antioksidan Minuman Fungsional Tradisional Wedang Uwuh',
        source: 'Jurnal Gizi dan Dietetik Indonesia (UGM)',
      },
    ],
  },
];
