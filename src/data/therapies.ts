import { TraditionalTherapy } from '../types';

export const THERAPY_DATABASE: TraditionalTherapy[] = [
  {
    id: 'kerokan',
    name: 'Kerokan (Gua Sha Nusantara)',
    regionOrigin: 'Jawa & Seluruh Nusantara',
    culturalBackground:
      'Kerokan adalah salah satu kearifan perawatan rumahan paling populer di Indonesia. Dilakukan dengan menggosokkan tepi koin logam tumpul atau tanduk kerbau pada punggung yang dilumuri minyak kelapa atau balsem hangat hingga timbul bilur-bilur merah (petechiae).',
    communityPurpose:
      'Masyarakat percaya kerokan dapat "mengeluarkan angin" dari tubuh yang tersumbat, melancarkan peredaran darah, meredakan rasa meriang, pusing, pegal, dan mengusir rasa dingin saat masuk angin.',
    scientificExplanation:
      'Secara kedokteran modern, "angin" tidak keluar melalui kulit. Gesekan tumpul memicu ekstravasasi darah mikro kapiler (petechiae) yang merangsang respons imun lokal, vasodilatasi pembuluh darah, sekresi enzim heme-oksigenase-1 (HO-1) yang bersifat anti-inflamasi, serta memicu pelepasan hormon endorfin yang menimbulkan rasa rileks dan berkurangnya persepsi nyeri.',
    evidenceLevel: 'Sedang',
    physiologicalMechanism:
      'Mikrotrauma terkontrol memicu vasodilatasi lokal, peningkatan perfusi mikrosirkulasi kulit hingga 4 kali lipat, modulasi jalur sitokin pro-inflamasi, dan aktivasi sistem saraf parasimpatis.',
    risksAndLimitations: [
      'Bukan pengobatan untuk penyakit infeksi bakteri, virus akut (DBD, Tifoid), atau masalah jantung',
      'Risiko lecet kulit dan infeksi sekunder jika koin berkarat atau tekanan terlalu keras',
      'Jangan dikerok pada luka terbuka atau tahi lalat besar',
    ],
    contraindications: [
      'Penderita kelainan pembekuan darah (Hemofilia, ITP)',
      'Pasien yang sedang mengonsumsi obat pengencer darah (Warfarin, Heparin)',
      'Area kulit yang mengalami infeksi, luka bakar, atau dermatitis aktif',
      'Bagian depan leher (area sinus karotis)',
      'Ibu hamil di area perut dan pinggang bawah',
    ],
    medicalRedFlags: [
      'Nyeri dada menjalar ke lengan kiri atau rahang (waspada serangan jantung, jangan dikerok!)',
      'Demam tinggi lebih dari 3 hari',
      'Sesak napas berat atau batuk darah',
    ],
    safePractices: [
      'Gunakan koin bermata tumpul yang bersih dan telah dicuci sabun atau disanitasi',
      'Gunakan pelumas yang cukup (minyak kelapa murni, minyak zaitun, atau minyak telon)',
      'Arah gesekan menyudut mengikuti alur tulang iga dari dalam ke luar, hindari menggosok tepat di atas tulang belakang',
      'Cukup hingga timbul warna merah muda atau merah terang, tidak perlu sampai membiru gelap atau terluka',
      'Minum air hangat setelah kerokan dan istirahat yang cukup',
    ],
    disclaimer:
      'Fitur ini bersifat edukatif dan bukan pengganti konsultasi medis. Kerokan adalah terapi komplementer non-invasif untuk gejala pegal dan meriang ringan, bukan penanganan penyakit gawat darurat.',
  },
  {
    id: 'urut-tradisional',
    name: 'Pijat / Urut Tradisional Nusantara',
    regionOrigin: 'Jawa, Sunda, Bali, Sumatra',
    culturalBackground:
      'Urut telah dipraktikkan turun-temurun oleh para dukun pijat dan pemijat keluarga. Tekniknya mengombinasikan tekanan telapak tangan, jempol, dan remasan otot yang diwariskan dari tradisi keraton hingga pedesaan.',
    communityPurpose:
      'Mengendurkan otot kaku setelah bekerja keras di ladang atau kantor, mempercepat pemulihan pasca-melahirkan, meredakan pegal linu, dan memulihkan vitalitas tubuh.',
    scientificExplanation:
      'Pijat tradisional bekerja melalui manipulasi mekanik jaringan lunak (otot, fasia, tendon). Terbukti menurunkan kadar hormon kortisol (stres), meningkatkan sirkulasi cairan limfatik, dan meredakan spasme otot melalui relaksasi neuromuscular reflex.',
    evidenceLevel: 'Kuat',
    physiologicalMechanism:
      'Inhibisi transmisi nyeri spinal (Gate Control Theory), peningkatan sirkulasi mikrovaskular, pemecahan perlekatan fasia, dan perangsangan pelepasan serotonin serta dopamin.',
    risksAndLimitations: [
      'Tidak boleh memijat patah tulang (fraktur) atau dislokasi sendi akut sembarangan',
      'Tekanan berlebihan pada saraf tepi dapat menyebabkan kebas atau cedera jaringan lunak',
    ],
    contraindications: [
      'Trombosis vena dalam (DVT) karena risiko lepasnya bekuan darah',
      'Fraktur tulang akut yang belum distabilkan',
      'Kanker tulang atau area tumor aktif',
      'Luka bakar atau infeksi kulit menular',
    ],
    medicalRedFlags: [
      'Bengkak akut disertai deformitas tulang atau ketidakmampuan menopang berat badan',
      'Nyeri punggung disertai mati rasa pada area genital atau inkontinensia urine (Cauda Equina Syndrome)',
    ],
    safePractices: [
      'Komunikasikan batas rasa sakit kepada terapis; pijat yang baik tidak harus menyiksa',
      'Gunakan minyak alami yang ramah kulit (minyak kelapa, minyak wijen)',
      'Pastikan terapis memiliki kebersihan tangan yang baik',
      'Hindari manipulasi kasar pada area leher depan dan lipatan paha',
    ],
    disclaimer:
      'Urut adalah terapi fisik suportif untuk relaksasi dan kelelahan otot, bukan pengganti penanganan ortopedi untuk patah tulang atau cedera sendi berat.',
  },
  {
    id: 'kompres-hangat-herbal',
    name: 'Kompres Hangat Herbal (Pilis, Tapel & Boreh)',
    regionOrigin: 'Jawa, Bali, Madura',
    culturalBackground:
      'Boreh di Bali dan Pilis/Tapel di tanah Jawa adalah pasta herbal yang dibalurkan pada tubuh atau dahi. Menggunakan racukan rimpang kencur, jahe, cengkeh, dan beras tumbuk yang menghangatkan.',
    communityPurpose:
      'Boreh digunakan untuk menghangatkan badan, meredakan nyeri rematik saat cuaca dingin, dan mengusir lelah. Pilis dahi digunakan oleh ibu pasca-melahirkan untuk mencegah pusing mata kunang-kunang.',
    scientificExplanation:
      'Efek termal panas lokal menyebabkan vasodilatasi pembuluh darah kulit dan otot, mengurangi kekakuan sendi dan kram. Senyawa volatil seperti eugenol dan gingerol memberikan efek analgesik ringan secara transdermal.',
    evidenceLevel: 'Sedang',
    physiologicalMechanism:
      'Termoterapi perifer meningkatkan ambang rangsang nyeri nosiseptor, memperlancar pembuangan metabolit asam laktat dari otot yang lelah, dan aroma rempah memberikan stimulasi aromaterapi menenangkan.',
    risksAndLimitations: [
      'Sensitivitas kulit terhadap pasta rempah (dermatitis kontak alergi)',
      'Suhu kompres yang terlalu panas dapat menyebabkan luka bakar derajat satu',
    ],
    contraindications: [
      'Cedera olahraga akut dalam 48 jam pertama (sebaiknya kompres dingin/es, bukan panas)',
      'Kulit luka terbuka atau dermatitis eksem',
    ],
    medicalRedFlags: [
      'Demam tinggi pada anak (gunakan kompres air hangat biasa, hindari rempah tajam)',
      'Kemerahan hebat, melepuh, atau gatal menyebar pasca-aplikasi',
    ],
    safePractices: [
      'Lakukan uji tempel (patch test) sedikit ramuan di lengan bawah sebelum mengoleskan luas',
      'Pastikan suhu kompres nyaman (sekitar 38-40 derajat Celcius)',
      'Bersihkan sisa pasta herbal dengan air hangat setelah 20-30 menit',
    ],
    disclaimer:
      'Gunakan sebagai perawatan kenyamanan relaksasi. Jangan gunakan pada cedera baru yang masih membengkak merah panas.',
  },
  {
    id: 'jamu-godokan',
    name: 'Jamu Godokan & Jamu Gendong',
    regionOrigin: 'Jawa (Yogyakarta, Solo, Sukoharjo)',
    culturalBackground:
      'Tradisi meramu tanaman obat segar yang direbus dalam kuali tanah liat (gerabah) dengan air mendidih. Jamu telah diakui UNESCO sebagai Warisan Budaya Takbenda Dunia (Intangible Cultural Heritage) pada Desember 2023.',
    communityPurpose:
      'Memelihara daya tahan tubuh secara holistik, pencegahan penyakit ringan, menjaga berat badan ideal, dan memelihara kecantikan serta vitalitas sehari-hari.',
    scientificExplanation:
      'Proses ekstraksi air panas menyari senyawa polar seperti flavonoid, fenolat, tannin, dan kurkuminoid. Berfungsi sebagai antioksidan sinergis yang mendukung homeostasis tubuh.',
    evidenceLevel: 'Kuat',
    physiologicalMechanism:
      'Peningkatan kapasitas antioksidan plasma, efek imunomodulasi ringan, stimulasi peristaltik saluran cerna secara lembut.',
    risksAndLimitations: [
      'Jamu yang tercemar bahan kimia obat (BKO) ilegal (seperti parasetamol atau deksametason)',
      'Kerusakan ginjal dan hati jika jamu menggunakan tanaman yang tidak teridentifikasi atau tercemar logam berat',
    ],
    contraindications: [
      'Pasien gagal ginjal kronis stadium akhir (harus membatasi asupan kalium dan cairan)',
      'Ibu hamil tanpa petunjuk dokter kandungan',
    ],
    medicalRedFlags: [
      'Jamu yang diklaim "langsung cespleng sembuh dalam 1 jam" (waspada indikasi BKO berbahaya)',
      'Timbul bengkak pada wajah atau kaki setelah minum jamu kemasan',
    ],
    safePractices: [
      'Prioritaskan jamu segar buatan sendiri atau penjual jamu terpercaya yang menggunakan bahan alami asli',
      'Jika membeli jamu kemasan, pastikan memiliki nomor izin edar BPOM (TR/HT/FF)',
      'Gunakan panci kaca, enamel, atau gerabah tanah liat; hindari panci aluminium atau tembaga untuk merebus rimpang asam',
    ],
    disclaimer:
      'Jamu adalah sarana pemeliharaan kesehatan dan gaya hidup promotif-preventif, bukan obat kuratif untuk penyakit kronis akut.',
  },
];
