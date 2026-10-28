export interface ProductVariant {
  id: string;
  name: string;
  stock: number;
  price: number;
  sku: string;
}

export interface Product {
  id: string;
  title: string;
  subtitle: string;
  category: 'Kecantikan/Perawatan Wajah' | 'Perawatan Tubuh/Perawatan Kulit' | 'Perawatan Tubuh/Perlengkapan Mandi' | 'Kecantikan/Make up Wajah' | 'Keychains' | 'Uncategorized';
  categoryLabel: 'Wajah' | 'Tubuh' | 'Makeup' | 'Paket Ritual' | 'Aksesoris';
  productType: string;
  status: 'Active' | 'Draft' | 'Archived';
  inventory: number;
  variantsCount: number;
  variants: ProductVariant[];
  channels: number;
  catalogs: number;
  price: number;
  originalPrice: number;
  rating: number;
  reviewsCount: number;
  badge?: string;
  bpomNumber: string;
  accentColor: string;
  iconEmoji: string;
  heroTagline: string;
  description: string;
  benefits: string[];
  keyIngredients: string[];
  howToUse: string[];
  isFeatured?: boolean;
  isFlashSale?: boolean;
}

export interface ReviewItem {
  id: string;
  author: string;
  avatar: string;
  city: string;
  rating: number;
  productName: string;
  comment: string;
  verified: boolean;
  timeAgo: string;
  skinType: string;
}
