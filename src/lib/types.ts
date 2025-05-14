export interface Product {
  id: string;
  name: string;
  description: string;
  longDescription?: string;
  price: number;
  category: 'Jackets' | 'Pants' | 'Boots' | 'Accessories' | 'Vests';
  sizes: string[];
  colors: string[];
  image: string; // Main image URL
  images?: string[]; // Additional image URLs
  rating?: number;
  stock?: number;
  slug: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedSize: string;
  selectedColor: string;
}

export interface WishlistItem {
  product: Product;
  addedAt: Date;
}

export type FilterOptions = {
  category?: string[];
  size?: string[];
  color?: string[];
  priceRange?: [number, number];
};

export type SortOption = 'price-asc' | 'price-desc' | 'name-asc' | 'name-desc' | 'rating-desc' | 'newest';
