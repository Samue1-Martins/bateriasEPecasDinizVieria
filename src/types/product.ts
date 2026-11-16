export type ProductStatus =
  | "in_stock"
  | "on_demand"
  | "out_of_stock";

export interface ProductSpecification {
  label: string;
  value: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  brand: string;
  categoryId: string;
  code?: string;
  price: number | null;
  priceOnRequest: boolean;
  status: ProductStatus;
  active: boolean;
  featured: boolean;
  mainImageUrl: string;
  galleryUrls: string[];
  specifications: ProductSpecification[];
  vehicleApplications: string[];
  createdAt?: string;
  updatedAt?: string;
}

export interface ProductFilter {
  categoryId?: string;
  searchTerm?: string;
  status?: ProductStatus;
  featuredOnly?: boolean;
  sortBy?: "relevance" | "price_asc" | "price_desc" | "name_asc";
}
