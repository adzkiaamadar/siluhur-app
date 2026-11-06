export interface HealthTipArticle {
  id: string;
  category: 'Semua' | 'Makan' | 'Tidur' | 'Aktivitas';
  title: string;
  readTime: string;
  imageUrl: string;
  summary: string;
  content: string[];
  tips: string[];
  nusantaraWisdom: string;
}

export const HEALTH_TIPS: HealthTipArticle[] = [
  {
    id: 'tip-1',
    category: 'Makan',
    title: 'Pola Makan Seimbang untuk Imun Tubuh',
    readTime: '5 menit baca',
    imageUrl: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80',
    summary: 'Menerapkan piring gizi seimbang dengan memanfaatkan bumbu rempah Nusantara untuk memaksimalkan daya tahan tubuh.',
    content: [
      'Pola makan berbasis gizi seimbang di Indonesia dikenal dengan pedoman "Isi Piringku": separuh piring terdiri dari sayur dan buah, separuh lainnya karbohidrat dan lauk-pauk.',
      'Kelebihan kuliner Nusantara adalah kekayaan rempah alami seperti bawang merah, bawang putih, jahe, kunyit, dan serai yang bukan hanya memberi rasa lezat tanpa MSG berlebih, tapi juga menyumbang zat fitonutrien antioksidan.',
      'Kurangi konsumsi gula berlebih, minyak gorengan berulang kali pakai (minyak jelantah), dan makanan ultra-proses.',
    ],
    tips: [
      'Gunakan kunyit dan jahe segar dalam olahan sup dan kuah sehari-hari',
      'Penuhi 5 porsi sayur dan buah lokal berwarna-warni per hari',
      'Batasi gula tambahan maksimal 4 sendok makan (50g) per hari',
    ],
    nusantaraWisdom:
      'Pepatah Jawa "Pangan iku tamba" (makanan adalah obat) mengingatkan bahwa apa yang kita santap setiap hari adalah fondasi utama kekebalan jasmani.',
  },
  {
    id: 'tip-2',
    category: 'Tidur',
    title: 'Tips Tidur Berkualitas di Era Digital',
    readTime: '4 menit baca',
    imageUrl: 'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?auto=format&fit=crop&w=600&q=80',
    summary: 'Meredam paparan cahaya biru gawai dan memanfaatkan aromaterapi herbal untuk tidur lebih lelap dan regenerasi sel.',
    content: [
      'Tidur adalah waktu utama otak membersihkan sisa metabolit (glymphatic system) dan memperkuat sistem imun.',
      'Paparan sinar biru dari layar ponsel menekan sekresi hormon melatonin, membuat otak mengira hari masih siang sehingga fase deep sleep terganggu.',
      'Membangun rutinitas malam (sleep hygiene) yang konsisten dapat membantu mengatasi insomnia ringan tanpa ketergantungan obat tidur.',
    ],
    tips: [
      'Hentikan menatap layar gawai 45 menit sebelum memejamkan mata',
      'Nikmati secangkir seduhan hangat jahe sereh atau chamomile 1 jam sebelum tidur',
      'Jaga suhu kamar tetap sejuk dan pencahayaan redup',
    ],
    nusantaraWisdom:
      'Nenek moyang Nusantara terbiasa menyelaraskan ritme biologis dengan alam (tidur saat malam gelap dan bangun saat fajar menyingsing).',
  },
  {
    id: 'tip-3',
    category: 'Aktivitas',
    title: 'Mulai Aktif Bergerak dari Hal Kecil',
    readTime: '4 menit baca',
    imageUrl: 'https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?auto=format&fit=crop&w=600&q=80',
    summary: 'Melawan gaya hidup sedentari dengan langkah kaki harian dan peregangan sederhana tanpa perlu beban olahraga berat.',
    content: [
      'Duduk terus-menerus lebih dari 6 jam sehari berhubungan erat dengan risiko penyakit kardiovaskular dan resistensi insulin.',
      'Aktivitas fisik tidak harus selalu berupa latihan angkat beban atau lari maraton di gym. Bergerak aktif kumulatif 30 menit per hari sudah memberikan perlindungan jantung yang nyata.',
      'Jalan kaki 6.000 hingga 8.000 langkah sehari membantu sirkulasi darah dan memperbaiki stabilitas gula darah pasca-makan.',
    ],
    tips: [
      'Lakukan peregangan otot ringan setiap 50 menit bekerja di depan laptop',
      'Pilih naik tangga dibanding lift untuk jarak 1-2 lantai',
      'Jalan santai pagi selama 15 menit sembari menghirup udara segar dan mendapat vitamin D alami',
    ],
    nusantaraWisdom:
      'Masyarakat pedesaan Indonesia masa lampau memiliki kesehatan kardiovaskular yang tangguh karena terbiasa berjalan kaki dan mencangkul di tanah ladang.',
  },
  {
    id: 'tip-4',
    category: 'Semua',
    title: 'Pentingnya Minum Air Putih Setiap Hari',
    readTime: '3 menit baca',
    imageUrl: 'https://images.unsplash.com/photo-1559839914-17aae19cec71?auto=format&fit=crop&w=600&q=80',
    summary: 'Menjaga kecukupan cairan untuk metabolisme sel, kerja ginjal, dan daya konsentrasi optimal.',
    content: [
      'Sekitar 60% tubuh manusia tersusun atas air. Kehilangan hanya 2% cairan tubuh sudah dapat menyebabkan penurunan konsentrasi, sakit kepala, dan kelelahan.',
      'Kebutuhan cairan orang dewasa di iklim tropis Indonesia umumnya berkisar antara 2 hingga 2,5 liter (sekitar 8 gelas) per hari.',
      'Air putih adalah cairan terbaik; wedang herbal tanpa gula dapat dihitung sebagai asupan cairan sehat pendamping.',
    ],
    tips: [
      'Awali pagi dengan 1 gelas air putih hangat begitu bangun tidur',
      'Bawa botol minum pribadi ke mana pun beraktivitas',
      'Periksa warna urin: warna kuning jerami jernih menandakan hidrasi cukup',
    ],
    nusantaraWisdom:
      'Air adalah sumber kehidupan dalam falsafah Nusantara ("Tirta Amerta"). Menghormati tubuh dimulai dari memberinya air yang murni dan cukup.',
  },
];
