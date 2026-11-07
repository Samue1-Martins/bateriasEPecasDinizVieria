export interface ProductSpecification {
  name: string;
  value: string;
}

export interface Product {
  id: string;
  name: string;
  sku?: string;
  description: string;
  categoryId: string;
  categoryName?: string;
  price?: number;
  promotionalPrice?: number;
  imageUrl?: string;
  inStock: boolean;
  featured?: boolean;
  brand?: string;
  compatibility?: string[];
  specifications?: ProductSpecification[];
  createdAt?: string;
  updatedAt?: string;
}

export interface ProductFilter {
  categoryId?: string;
  searchTerm?: string;
  inStockOnly?: boolean;
  featuredOnly?: boolean;
}
