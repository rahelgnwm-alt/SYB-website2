import { Injectable, signal, computed } from '@angular/core';
import { Product, ReviewItem } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private readonly initialProducts: Product[] = [
    {
      id: 'syb-peeling-gel',
      title: 'NEW SYB Facial Glowing Peeling Gel *Gel Pembersih Wajah*',
      subtitle: 'Gentle exfoliating gel that lifts dead skin cells & reveals crystal glass skin in 60 seconds.',
      category: 'Kecantikan/Perawatan Wajah',
      categoryLabel: 'Wajah',
      productType: 'Kecantikan/Perawatan Wajah',
      status: 'Active',
      inventory: 123517,
      variantsCount: 27,
      variants: [
        { id: 'v1', name: 'Original Glow 100ml', stock: 54200, price: 38000, sku: 'SYB-PL-ORG' },
        { id: 'v2', name: 'Peach Bright 100ml', stock: 41317, price: 38000, sku: 'SYB-PL-PCH' },
        { id: 'v3', name: 'Aloe Soothing 100ml', stock: 28000, price: 38000, sku: 'SYB-PL-ALOE' }
      ],
      channels: 4,
      catalogs: 2,
      price: 38000,
      originalPrice: 55000,
      rating: 4.9,
      reviewsCount: 3890,
      badge: 'Best Seller 💖',
      bpomNumber: 'NA18210200841',
      accentColor: '#FF6584',
      iconEmoji: '✨',
      heroTagline: 'Exfoliate lembut tanpa perih, kulit langsung kenyal & glowing!',
      description: 'Formula gel lembut diperkaya ekstrak Centella Asiatica & Collagen yang mengangkat sel kulit mati secara instan tanpa mengikis lapisan pelindung kulit.',
      benefits: ['Mengangkat sel kulit mati dlm 60 detik', 'Mencerahkan flek hitam & noda bekas jerawat', 'Membuat makeup menempel sempurna', 'Bikin kulit halus selembut sutra'],
      keyIngredients: ['Hydrolyzed Collagen', 'Centella Asiatica', 'Niacinamide 2%', 'Glutathione'],
      howToUse: ['Bersihkan wajah dan keringkan dengan handuk', 'Oleskan gel secukupnya ke seluruh wajah', 'Pijat memutar perlahan sampai bulir kotoran terangkat', 'Bilas bersih dengan air hangat'],
      isFeatured: true,
      isFlashSale: false
    },
    {
      id: 'syb-paket-ritual-malam',
      title: 'NEW SYB [PAKET RITUAL MALAM 3in1] 1PC RED JELLY + 1PC NIGHT CREAM + 1PC TONER',
      subtitle: 'Complete 3-step night recovery ritual for maximum glass skin morning radiance.',
      category: 'Kecantikan/Perawatan Wajah',
      categoryLabel: 'Paket Ritual',
      productType: 'Kecantikan/Perawatan Wajah',
      status: 'Active',
      inventory: 2578,
      variantsCount: 4,
      variants: [
        { id: 'v1', name: 'Paket Glow Lengkap (3in1)', stock: 1578, price: 119000, sku: 'SYB-RIT-GLOW' },
        { id: 'v2', name: 'Paket Acne Calming (3in1)', stock: 1000, price: 119000, sku: 'SYB-RIT-ACNE' }
      ],
      channels: 4,
      catalogs: 2,
      price: 119000,
      originalPrice: 165000,
      rating: 5.0,
      reviewsCount: 1420,
      badge: 'Viral Bundle 🌸',
      bpomNumber: 'NA18210103429',
      accentColor: '#FF2A7A',
      iconEmoji: '🌙',
      heroTagline: 'Bangun tidur dengan kulit kenyal, cerah, dan bebas kusam!',
      description: 'Kombinasi terbaik Red Jelly Forte, Niacinamide Night Cream, dan Hydra Essence Toner untuk perbaikan skin barrier di malam hari.',
      benefits: ['Menghidrasi kulit hingga lapisan terdalam', 'Mengunci kelembapan 24 jam nonstop', 'Menyamarkan garis halus dan pori-pori', 'Menenangkan kulit kemerahan'],
      keyIngredients: ['Red Algae Extract', 'Niacinamide 10%', 'Ceramide Complex', 'Hyaluronic Acid 4D'],
      howToUse: ['Tuangkan Toner ke kapas/telapak tangan, tepuk perlahan', 'Aplikasikan Red Jelly Serum merata ke seluruh wajah', 'Kunci dengan Night Cream sebelum tidur'],
      isFeatured: true,
      isFlashSale: true
    },
    {
      id: 'syb-whitening-day-cream',
      title: 'NEW SYB [WHITENING DAY CREAM] NIACINAMIDE 10% UV FILTER + GLOWING FINISH',
      subtitle: 'Ultra-lightweight tone-up moisturizer with SPF 35 protection & pearlescent glow.',
      category: 'Kecantikan/Perawatan Wajah',
      categoryLabel: 'Wajah',
      productType: 'Kecantikan/Perawatan Wajah',
      status: 'Active',
      inventory: 200,
      variantsCount: 2,
      variants: [
        { id: 'v1', name: 'Pot 30g', stock: 120, price: 49000, sku: 'SYB-DC-30G' },
        { id: 'v2', name: 'Tube 50g', stock: 80, price: 68000, sku: 'SYB-DC-50G' }
      ],
      channels: 4,
      catalogs: 2,
      price: 49000,
      originalPrice: 70000,
      rating: 4.8,
      reviewsCount: 890,
      badge: 'Flash Sale ⚡',
      bpomNumber: 'NA18220101452',
      accentColor: '#FFB3C6',
      iconEmoji: '☀️',
      heroTagline: 'Cerah seketika tanpa whitecast, ringan dipakai seharian!',
      description: 'Day cream dengan formula watery gel yang langsung menyatu dengan warna kulit, memberikan efek glowing instan dan proteksi dari sinar UV.',
      benefits: ['Instant tone-up natural glowing', 'Melindungi dari sinar UV & polusi', 'Non-comedogenic, tidak menyumbat pori', 'Bisa jadi makeup primer halus'],
      keyIngredients: ['Niacinamide 10%', 'Zinc Oxide (UV Filter)', 'Alpha Arbutin', 'Licorice Root'],
      howToUse: ['Gunakan di pagi hari setelah mencuci wajah & serum', 'Oleskan merata ke wajah dan leher 15 menit sebelum beraktivitas'],
      isFeatured: false,
      isFlashSale: true
    },
    {
      id: 'syb-cheek-blusher',
      title: 'NEW SYB CHEEK BLUSHER - Blush On Travel Friendly Marshmallow Soft',
      subtitle: 'Silky airy liquid blush that blends seamlessly for natural girl-next-door flush.',
      category: 'Kecantikan/Make up Wajah',
      categoryLabel: 'Makeup',
      productType: 'Kecantikan/Make up Wajah',
      status: 'Active',
      inventory: 0,
      variantsCount: 2,
      variants: [
        { id: 'v1', name: '01 Strawberry Sorbet', stock: 0, price: 35000, sku: 'SYB-BL-01' },
        { id: 'v2', name: '02 Peach Milkshake', stock: 0, price: 35000, sku: 'SYB-BL-02' }
      ],
      channels: 4,
      catalogs: 2,
      price: 35000,
      originalPrice: 50000,
      rating: 4.9,
      reviewsCount: 650,
      badge: 'Restocking Soon 🎀',
      bpomNumber: 'NA18221200388',
      accentColor: '#FF4D8D',
      iconEmoji: '🍧',
      heroTagline: 'Pipi merona manis alami ala cewek Korea!',
      description: 'Blush on praktis travel-friendly dengan tekstur mousse creamy yang tahan 12 jam tanpa luntur atau mempertegas tekstur pori-pori.',
      benefits: ['Warna pigmented namun mudah di-blend', 'Hasil akhir semi-matte dewy', 'Kemasan imut pas di pouch makeup', 'Tidak lengket & smudge-proof'],
      keyIngredients: ['Vitamin E', 'Jojoba Oil', 'Shea Butter', 'Pure Mineral Pigments'],
      howToUse: ['Totolkan 2-3 titik di tulang pipi', 'Tepuk-tepuk dengan jari atau spons hingga merata'],
      isFeatured: false,
      isFlashSale: false
    },
    {
      id: 'syb-aha-body-toner-100',
      title: 'NEW SYB AHA Skinboost Body Toner [FLASH SALE]',
      subtitle: 'Intensive skin exfoliant & brightening body toner for stubborn dark spots.',
      category: 'Kecantikan/Perawatan Wajah',
      categoryLabel: 'Tubuh',
      productType: 'Kecantikan/Perawatan Wajah',
      status: 'Active',
      inventory: 100,
      variantsCount: 1,
      variants: [
        { id: 'v1', name: '100ml Flash Sale', stock: 100, price: 42000, sku: 'SYB-AHA-100' }
      ],
      channels: 4,
      catalogs: 2,
      price: 42000,
      originalPrice: 65000,
      rating: 4.9,
      reviewsCount: 2190,
      badge: 'Flash Sale ⚡',
      bpomNumber: 'NA18200108390',
      accentColor: '#FF7A00',
      iconEmoji: '🍊',
      heroTagline: 'Toner badan viral penyelamat siku, lutut, dan leher kusam!',
      description: 'Diformulasikan dengan AHA Glycolic Acid & Niacinamide murni untuk meratakan warna kulit belang dan mencerahkan area lipatan yang gelap.',
      benefits: ['Mencerahkan ketiak, siku & lutut', 'Menghaluskan tekstur kulit gradakan (strawberry skin)', 'Mempercepat regenerasi sel kulit baru', 'Menyegarkan dengan aroma fruity segar'],
      keyIngredients: ['Glycolic Acid (AHA) 5%', 'Niacinamide', 'Fruit Extracts', 'Panthenol'],
      howToUse: ['Tuang pada kapas secukupnya', 'Usapkan merata pada area badan yang ingin dicerahkan', 'Gunakan rutin malam hari'],
      isFeatured: true,
      isFlashSale: true
    },
    {
      id: 'syb-aha-body-toner-250',
      title: 'NEW SYB AHA SKINBOOST BODY TONER 250 ML [FLASH SALE]',
      subtitle: 'Jumbo 250ml size of our famous brightening acid toner for long-lasting routine.',
      category: 'Perawatan Tubuh/Perlengkapan Mandi',
      categoryLabel: 'Tubuh',
      productType: 'Perawatan Tubuh/Perlengkapan Mandi',
      status: 'Active',
      inventory: 100,
      variantsCount: 1,
      variants: [
        { id: 'v1', name: 'Jumbo Bottle 250ml', stock: 100, price: 58000, sku: 'SYB-AHA-250' }
      ],
      channels: 4,
      catalogs: 2,
      price: 58000,
      originalPrice: 89000,
      rating: 5.0,
      reviewsCount: 3100,
      badge: 'Best Value 🧴',
      bpomNumber: 'NA18200108390',
      accentColor: '#FF5C39',
      iconEmoji: '🧪',
      heroTagline: 'Ukuran jumbo hemat 2x lipat untuk perawatan badan maksimal!',
      description: 'Botol besar 250ml siap pakai untuk pemakaian 2 bulan. Ampuh mencerahkan kulit badan kusam dan mengangkat daki menumpuk.',
      benefits: ['Isi 2.5x lebih banyak dan hemat', 'Kulit badan tampak 3 tingkat lebih cerah', 'Membantu penyerapan lotion lebih maksimal', 'Aman untuk semua jenis kulit'],
      keyIngredients: ['AHA Complex', 'Vitamin C Ethyl Ether', 'Allantoin', 'Citrus Extract'],
      howToUse: ['Gunakan setelah mandi saat kulit bersih', 'Tuang langsung ke telapak tangan atau kapas, usapkan merata'],
      isFeatured: false,
      isFlashSale: true
    },
    {
      id: 'syb-depilatory-cream',
      title: '【MINI SIZE 25GR】 SYB COSMETIC Depilatory Hair Removal Cream',
      subtitle: 'Painless, gentle hair removal cream with soothing chamomile & silk proteins.',
      category: 'Perawatan Tubuh/Perawatan Kulit',
      categoryLabel: 'Tubuh',
      productType: 'Perawatan Tubuh/Perawatan Kulit',
      status: 'Active',
      inventory: 100,
      variantsCount: 1,
      variants: [
        { id: 'v1', name: 'Travel Mini 25g', stock: 100, price: 28000, sku: 'SYB-DEP-25G' }
      ],
      channels: 4,
      catalogs: 2,
      price: 28000,
      originalPrice: 40000,
      rating: 4.7,
      reviewsCount: 420,
      badge: 'Gentle Formula 🌸',
      bpomNumber: 'NA18210800012',
      accentColor: '#B388FF',
      iconEmoji: '✨',
      heroTagline: 'Rontokkan bulu halus dalam 8 menit tanpa rasa sakit!',
      description: 'Krim penghilang bulu khusus wanita yang bekerja cepat melepas bulu hingga ke pangkal, membuat kulit mulus bersih tanpa rasa perih.',
      benefits: ['Tanpa rasa sakit sama sekali', 'Bulu tumbuh kembali lebih halus dan lama', 'Kulit terasa lembap berkat chamomile', 'Spatula lembut sudah termasuk dlm box'],
      keyIngredients: ['Chamomile Extract', 'Silk Protein', 'Aloe Vera Leaf Water', 'Sweet Almond Oil'],
      howToUse: ['Oleskan krim tebal merata menutupi bulu', 'Diamkan selama 6-8 menit', 'Gunakan spatula untuk mengangkat krim & bulu', 'Bilas dengan air dingin tanpa sabun'],
      isFeatured: false,
      isFlashSale: false
    },
    {
      id: 'syb-red-jelly-serum',
      title: 'NEW SYB FORTE Red Jelly Serum 20ml with Niacinamide Glowing Skin',
      subtitle: 'Signature Korean-inspired gel serum that plumps, brightens, and repairs.',
      category: 'Kecantikan/Perawatan Wajah',
      categoryLabel: 'Wajah',
      productType: 'Kecantikan/Perawatan Wajah',
      status: 'Active',
      inventory: 100,
      variantsCount: 1,
      variants: [
        { id: 'v1', name: 'Dropper Bottle 20ml', stock: 100, price: 45000, sku: 'SYB-RJ-20ML' }
      ],
      channels: 4,
      catalogs: 2,
      price: 45000,
      originalPrice: 68000,
      rating: 4.9,
      reviewsCount: 1980,
      badge: 'Glowing Star 🌟',
      bpomNumber: 'NA18210103429',
      accentColor: '#FF1744',
      iconEmoji: '🍓',
      heroTagline: 'Serum jelly merah legendaris untuk kulit glowing bak kaca!',
      description: 'Serum bertekstur jelly merah bening dengan jutaan mikro-molekul Niacinamide dan Astaxanthin yang menembus ke lapisan kulit dalam untuk glow maksimal.',
      benefits: ['Kulit glowing berkilau dalam 7 hari', 'Mengencangkan dan mengenyalkan kulit', 'Mengurangi flek kemerahan & bekas jerawat', 'Sensasi sejuk dingin menenangkan'],
      keyIngredients: ['Astaxanthin (Super Antioxidant)', 'Niacinamide 5%', 'Sodium Hyaluronate', 'Beta-Glucan'],
      howToUse: ['Teteskan 2-3 tetes ke telapak tangan/wajah', 'Ratakan perlahan dengan gerakan memutar ke atas', 'Gunakan pagi dan malam hari'],
      isFeatured: true,
      isFlashSale: false
    },
    {
      id: 'syb-keychain-fluffy',
      title: 'Gantungan Kunci Bulu - bulu Cute Fluffy Keychain',
      subtitle: 'Ultra-soft plushie pom-pom keychain with pastel heart clip for your bag.',
      category: 'Keychains',
      categoryLabel: 'Aksesoris',
      productType: 'Keychains',
      status: 'Active',
      inventory: 200,
      variantsCount: 1,
      variants: [
        { id: 'v1', name: 'Baby Pink Cloud', stock: 200, price: 15000, sku: 'SYB-KC-PLUSH' }
      ],
      channels: 4,
      catalogs: 2,
      price: 15000,
      originalPrice: 25000,
      rating: 4.9,
      reviewsCount: 310,
      badge: 'Cute Merch 🧸',
      bpomNumber: 'ACC-SYB-NONMED',
      accentColor: '#FFB6C1',
      iconEmoji: '🎀',
      heroTagline: 'Gantungan kunci super lembut imut pemanis tas & pouch kamu!',
      description: 'Merchandise eksklusif SYB Girl Squad berbahan faux-fur ultra lembut dengan pengait gold plated anti karat yang super aesthetic.',
      benefits: ['Bahan super empuk & tidak mudah rontok', 'Ring gold kuat & awet', 'Pilihan hadiah manis untuk sahabat'],
      keyIngredients: ['Premium Plush Fiber', 'Alloy Golden Ring', 'Silicone Heart Charm'],
      howToUse: ['Kaitkan pada ritsleting tas, pouch skincare, atau gantungan kunci motor'],
      isFeatured: false,
      isFlashSale: false
    },
    {
      id: 'syb-keychain-butterfly',
      title: 'Gantungan Kunci Kupu-Kupu Aesthetic Butterfly Charm',
      subtitle: 'Iridescent holographic butterfly pendant with crystal beads & ribbon accent.',
      category: 'Keychains',
      categoryLabel: 'Aksesoris',
      productType: 'Keychains',
      status: 'Active',
      inventory: 200,
      variantsCount: 1,
      variants: [
        { id: 'v1', name: 'Aurora Hologram', stock: 200, price: 15000, sku: 'SYB-KC-BUTTERFLY' }
      ],
      channels: 4,
      catalogs: 2,
      price: 15000,
      originalPrice: 25000,
      rating: 5.0,
      reviewsCount: 280,
      badge: 'Cute Merch 🦋',
      bpomNumber: 'ACC-SYB-NONMED',
      accentColor: '#BA68C8',
      iconEmoji: '🦋',
      heroTagline: 'Aksen aesthetic hologram yang berkilau di bawah cahaya!',
      description: 'Gantungan kunci akrilik kupu-kupu dengan efek kilau pelangi hologram 3D yang sangat cocok dipadukan dengan totebag atau tas sekolah.',
      benefits: ['Reflektif hologram cantik', 'Ringan & tidak mudah lecet', 'Desain aesthetic Y2K Korean style'],
      keyIngredients: ['Acrylic Hologram', 'Stainless Ring', 'Glass Bead Accents'],
      howToUse: ['Kaitkan pada tas atau dompet kesayanganmu'],
      isFeatured: false,
      isFlashSale: false
    },
    {
      id: 'syb-spa-exfoliating-gel',
      title: 'SYB Spa Exfoliating Gel Fruity Brightening',
      subtitle: 'Body peeling scrub gel with fresh fruit enzymes for effortless radiant skin.',
      category: 'Perawatan Tubuh/Perawatan Kulit',
      categoryLabel: 'Tubuh',
      productType: 'Perawatan Tubuh/Perawatan Kulit',
      status: 'Active',
      inventory: 2633,
      variantsCount: 17,
      variants: [
        { id: 'v1', name: 'Cherry Blossom 300ml', stock: 1200, price: 32000, sku: 'SYB-SPA-CHERRY' },
        { id: 'v2', name: 'Strawberry Milk 300ml', stock: 833, price: 32000, sku: 'SYB-SPA-STRAW' },
        { id: 'v3', name: 'Grape Splash 300ml', stock: 600, price: 32000, sku: 'SYB-SPA-GRAPE' }
      ],
      channels: 4,
      catalogs: 2,
      price: 32000,
      originalPrice: 48000,
      rating: 4.8,
      reviewsCount: 4210,
      badge: 'Fan Favorite 🍓',
      bpomNumber: 'NA18200700812',
      accentColor: '#FF4081',
      iconEmoji: '🍇',
      heroTagline: 'Sensasi spa wangi buah di rumah, daki langsung rontok bersih!',
      description: 'Eksfoliasi badan tanpa butiran scrub kasar yang bikin iritasi. Bulir gelnya dengan lembut mengikat daki dan debu polusi dalam sekejap.',
      benefits: ['Rontokkan daki tanpa rasa sakit', 'Aroma buah segar bikin mood bahagia', 'Mencerahkan kulit belang akibat sinar matahari', 'Ukuran besar 300ml awet berbulan-bulan'],
      keyIngredients: ['Fruit Enzyme Blend', 'Glutathione', 'Glycerin', 'Aloe Vera Extract'],
      howToUse: ['Gunakan pada kulit tubuh yang kering', 'Gosok perlahan sampai kotoran dan daki terangkat', 'Bilas dengan air mengalir'],
      isFeatured: true,
      isFlashSale: false
    },
    {
      id: 'syb-pomegranate-lotion',
      title: 'NEW SYB Pomegranate Moist Whitening Lotion dengan Ekstrak Delima',
      subtitle: 'Nutrient-rich brightening body lotion with natural pomegranate antioxidants.',
      category: 'Perawatan Tubuh/Perawatan Kulit',
      categoryLabel: 'Tubuh',
      productType: 'Perawatan Tubuh/Perawatan Kulit',
      status: 'Active',
      inventory: 2918,
      variantsCount: 3,
      variants: [
        { id: 'v1', name: 'Pump Bottle 250ml', stock: 1918, price: 48000, sku: 'SYB-POM-250' },
        { id: 'v2', name: 'Refill Pouch 250ml', stock: 1000, price: 42000, sku: 'SYB-POM-REF' }
      ],
      channels: 4,
      catalogs: 2,
      price: 48000,
      originalPrice: 75000,
      rating: 4.9,
      reviewsCount: 1850,
      badge: 'Brightening Hero 🍷',
      bpomNumber: 'NA18210107293',
      accentColor: '#C2185B',
      iconEmoji: '🍒',
      heroTagline: 'Keharuman mewah delima merah dengan kelembapan 48 jam!',
      description: 'Lotion dengan kandungan ekstrak buah delima kaya antioksidan polifenol yang menjaga elastisitas kulit sekaligus mencerahkan kulit secara intensif.',
      benefits: ['Aroma manis segar tahan sepanjang hari', 'Tekstur cepat menyerap tanpa lengket', 'Menyamarkan kerutan halus dan kulit bersisik', 'Melembutkan kulit sejak pemakaian pertama'],
      keyIngredients: ['Punica Granatum (Pomegranate) Extract', 'Niacinamide', 'Shea Butter', 'Vitamin E'],
      howToUse: ['Usapkan merata ke seluruh tubuh setelah mandi', 'Ulangi pemakaian saat kulit terasa kering'],
      isFeatured: false,
      isFlashSale: false
    },
    {
      id: 'syb-bibit-whitening-dna-salmon',
      title: 'SYB Bibit Whitening Body Lotion DNA Salmon Glowing Cerah Seketika',
      subtitle: 'Top-selling Indonesian body whitening sensation with premium Marine DNA Salmon.',
      category: 'Perawatan Tubuh/Perawatan Kulit',
      categoryLabel: 'Tubuh',
      productType: 'Perawatan Tubuh/Perawatan Kulit',
      status: 'Active',
      inventory: 44427,
      variantsCount: 12,
      variants: [
        { id: 'v1', name: 'Original Salmon Glow 150ml', stock: 20000, price: 55000, sku: 'SYB-DNA-150' },
        { id: 'v2', name: 'Luxury Shimmer Glow 150ml', stock: 14427, price: 58000, sku: 'SYB-DNA-SHIM' },
        { id: 'v3', name: 'Jumbo Size 300ml', stock: 10000, price: 89000, sku: 'SYB-DNA-300' }
      ],
      channels: 4,
      catalogs: 2,
      price: 55000,
      originalPrice: 85000,
      rating: 5.0,
      reviewsCount: 8900,
      badge: '44k+ Sold • Legend 👑',
      bpomNumber: 'NA18210109923',
      accentColor: '#FF6F91',
      iconEmoji: '🐟',
      heroTagline: 'Rahasia kulit putih glowing glowing idaman para cewek!',
      description: 'Formula legendaris Bibit Whitening diperkaya Marine DNA Salmon murni dari perairan dalam untuk peremajaan sel kulit dan pemutihan maksimal tanpa efek samping.',
      benefits: ['Hasil cerah alami tampak dalam 3 hari pemakaian', 'Meratakan warna kulit yang belang terbakar matahari', 'Mengunci kelembapan kulit tubuh 24 jam', 'Tekstur wangi manis powdery lembut'],
      keyIngredients: ['Sodium DNA (Marine Salmon)', 'Alpha Arbutin 2%', 'Glutathione', 'Niacinamide', 'Collagen Peptides'],
      howToUse: ['Gunakan setiap sehabis mandi pagi dan sore hari', 'Untuk hasil terbaik, gunakan bersama SYB AHA Body Toner'],
      isFeatured: true,
      isFlashSale: true
    },
    {
      id: 'syb-aloe-vera-gel',
      title: 'SYB SOOTHING & MOISTURE GEL ALOE VERA 99% Nature Fresh',
      subtitle: 'Pure 99% organic fermented aloe vera soothing gel for face, hair, and sun recovery.',
      category: 'Kecantikan/Perawatan Wajah',
      categoryLabel: 'Wajah',
      productType: 'Kecantikan/Perawatan Wajah',
      status: 'Active',
      inventory: 1500,
      variantsCount: 1,
      variants: [
        { id: 'v1', name: 'Tub 300ml Big Size', stock: 1500, price: 32000, sku: 'SYB-ALOE-300' }
      ],
      channels: 4,
      catalogs: 2,
      price: 32000,
      originalPrice: 48000,
      rating: 4.8,
      reviewsCount: 1250,
      badge: 'Cooling Relief 🌿',
      bpomNumber: 'NA18180104820',
      accentColor: '#00C853',
      iconEmoji: '🍃',
      heroTagline: 'Kesejukan alami 99% lidah buaya yang menenangkan kulit terbakar!',
      description: 'Gel multifungsi untuk wajah, tubuh, kuku, dan rambut. Meredakan kulit memerah akibat sengatan matahari dan memberikan hidrasi instan.',
      benefits: ['Menenangkan jerawat yang meradang', 'Meredakan kulit terbakar matahari (sunburn)', 'Bisa untuk masker mata & pelembap rambut', 'Bebas alkohol dan paraben'],
      keyIngredients: ['Aloe Barbadensis Leaf Juice 99%', 'Centella Asiatica', 'Glycerin', 'Trehalose'],
      howToUse: ['Oleskan secukupnya pada area wajah atau tubuh yang kering / memerah', 'Bisa disimpan di kulkas untuk sensasi dingin ekstra'],
      isFeatured: false,
      isFlashSale: false
    }
  ];

  private readonly initialReviews: ReviewItem[] = [
    {
      id: 'rev-1',
      author: 'Clarissa Maharani',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
      city: 'Jakarta Selatan',
      rating: 5,
      productName: 'SYB Bibit Whitening DNA Salmon',
      comment: 'Beneran secinta itu sama lotion DNA Salmonnya! Wanginya manis powdery kayak parfum mahal, trus kulit belang di tangan abis naik motor langsung rata dlm 5 harian. Packagingnya cute bgt 💖',
      verified: true,
      timeAgo: '2 hari lalu',
      skinType: 'Kulit Kering & Belang'
    },
    {
      id: 'rev-2',
      author: 'Nabila Putri S.',
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=150&q=80',
      city: 'Surabaya',
      rating: 5,
      productName: 'NEW SYB Facial Glowing Peeling Gel',
      comment: 'Ini peeling gel paling nagih sedunia! Pas digosok kotoran sama daki wajah langsung rontok tanpa bikin kulit ketarik atau merah. Habis dibilas wajah langsung bouncy kayak jelly 🥺✨',
      verified: true,
      timeAgo: 'Kemarin',
      skinType: 'Kulit Kombinasi'
    },
    {
      id: 'rev-3',
      author: 'Amanda Vanesha',
      avatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=150&q=80',
      city: 'Bandung',
      rating: 5,
      productName: 'NEW SYB [PAKET RITUAL MALAM 3in1]',
      comment: 'Red Jelly nya bener-bener holy grail! Pagi-pagi bangun muka glowing basah tapi gak berminyak sama sekali. Paket hemat bgt dapet 3 produk langsung!',
      verified: true,
      timeAgo: '4 hari lalu',
      skinType: 'Kulit Normal to Dry'
    },
    {
      id: 'rev-4',
      author: 'Jessica Felicia',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80',
      city: 'Medan',
      rating: 5,
      productName: 'NEW SYB AHA Skinboost Body Toner',
      comment: 'Lutut sama siku yang tadinya item gradakan jadi haluuus bgt. Dipakein kapas abis mandi daki abu-abu keangkat semua. Wajib repurchase botol jumbo 250ml!',
      verified: true,
      timeAgo: '5 hari lalu',
      skinType: 'All Skin Types'
    }
  ];

  // State signals
  readonly products = signal<Product[]>(this.initialProducts);
  readonly reviews = signal<ReviewItem[]>(this.initialReviews);
  readonly selectedCategory = signal<string>('All');
  readonly searchQuery = signal<string>('');
  readonly quickViewProduct = signal<Product | null>(null);

  // Computed signals
  readonly filteredProducts = computed(() => {
    const list = this.products();
    const cat = this.selectedCategory();
    const query = this.searchQuery().toLowerCase().trim();

    return list.filter(item => {
      const matchCategory = cat === 'All' || item.categoryLabel === cat;
      const matchQuery = !query || 
        item.title.toLowerCase().includes(query) ||
        item.subtitle.toLowerCase().includes(query) ||
        item.category.toLowerCase().includes(query);
      return matchCategory && matchQuery;
    });
  });

  readonly featuredProducts = computed(() => 
    this.products().filter(p => p.isFeatured)
  );

  readonly flashSaleProducts = computed(() => 
    this.products().filter(p => p.isFlashSale)
  );

  readonly totalInventoryStock = computed(() => 
    this.products().reduce((acc, p) => acc + p.inventory, 0)
  );

  // Actions
  setCategory(category: string): void {
    this.selectedCategory.set(category);
  }

  setSearchQuery(q: string): void {
    this.searchQuery.set(q);
  }

  openQuickView(product: Product): void {
    this.quickViewProduct.set(product);
  }

  closeQuickView(): void {
    this.quickViewProduct.set(null);
  }

  getProductById(id: string): Product | undefined {
    return this.products().find(p => p.id === id);
  }

  addProduct(newProduct: Product): void {
    this.products.update(list => [newProduct, ...list]);
  }

  updateProduct(updated: Product): void {
    this.products.update(list => 
      list.map(p => p.id === updated.id ? updated : p)
    );
  }

  deleteProduct(id: string): void {
    this.products.update(list => list.filter(p => p.id !== id));
  }

  toggleProductStatus(id: string): void {
    this.products.update(list => 
      list.map(p => {
        if (p.id === id) {
          const nextStatus = p.status === 'Active' ? 'Draft' : 'Active';
          return { ...p, status: nextStatus };
        }
        return p;
      })
    );
  }
}
