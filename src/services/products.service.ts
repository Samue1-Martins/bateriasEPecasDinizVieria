import { Category, Product, ProductFilter } from "@/types";
import { DEMO_CATEGORIES, DEMO_PRODUCTS } from "@/data";

/**
 * Camada de abstração de serviços de produtos e categorias.
 * Atualmente consome os dados demonstrativos de src/data/.
 * Futuramente esses métodos consultarão diretamente o Cloud Firestore.
 */

export async function getCategories(): Promise<Category[]> {
  return DEMO_CATEGORIES.filter((c) => c.active).sort((a, b) => a.order - b.order);
}

export async function getCategoryById(id: string): Promise<Category | null> {
  const category = DEMO_CATEGORIES.find((c) => c.id === id && c.active);
  return category || null;
}

export async function getCategoryBySlug(slug: string): Promise<Category | null> {
  const category = DEMO_CATEGORIES.find((c) => c.slug === slug && c.active);
  return category || null;
}

export async function getProducts(filter?: ProductFilter): Promise<Product[]> {
  let products = DEMO_PRODUCTS.filter((p) => p.active);

  if (!filter) {
    return products;
  }

  if (filter.categoryId && filter.categoryId !== "todos") {
    products = products.filter((p) => p.categoryId === filter.categoryId);
  }

  if (filter.searchTerm && filter.searchTerm.trim() !== "") {
    const term = filter.searchTerm.toLowerCase().trim();
    products = products.filter(
      (p) =>
        p.name.toLowerCase().includes(term) ||
        p.brand.toLowerCase().includes(term) ||
        (p.code && p.code.toLowerCase().includes(term)) ||
        p.description.toLowerCase().includes(term)
    );
  }

  if (filter.status) {
    products = products.filter((p) => p.status === filter.status);
  }

  if (filter.featuredOnly) {
    products = products.filter((p) => p.featured);
  }

  if (filter.sortBy) {
    switch (filter.sortBy) {
      case "price_asc":
        products.sort((a, b) => {
          if (a.price === null) return 1;
          if (b.price === null) return -1;
          return a.price - b.price;
        });
        break;
      case "price_desc":
        products.sort((a, b) => {
          if (a.price === null) return 1;
          if (b.price === null) return -1;
          return b.price - a.price;
        });
        break;
      case "name_asc":
        products.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "relevance":
      default:
        // Mantém ordenação padrão
        break;
    }
  }

  return products;
}

export async function getFeaturedProducts(): Promise<Product[]> {
  return DEMO_PRODUCTS.filter((p) => p.active && p.featured);
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const product = DEMO_PRODUCTS.find((p) => p.slug === slug && p.active);
  return product || null;
}

export async function getProductById(id: string): Promise<Product | null> {
  const product = DEMO_PRODUCTS.find((p) => p.id === id && p.active);
  return product || null;
}

export async function getRelatedProducts(
  categoryId: string,
  currentProductId: string,
  limit = 3
): Promise<Product[]> {
  return DEMO_PRODUCTS.filter(
    (p) => p.active && p.categoryId === categoryId && p.id !== currentProductId
  ).slice(0, limit);
}
