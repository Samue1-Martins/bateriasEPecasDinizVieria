import { cacheTag } from "next/cache";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
  limit as firestoreLimit,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Category, Product, ProductFilter } from "@/types";
import { mapDocToCategory, mapDocToProduct } from "./firestore-mappers";

/**
 * Retorna todas as categorias ativas ordenadas por 'order' crescente.
 */
export async function getCategories(): Promise<Category[]> {
  "use cache";
  cacheTag("categories");
  try {
    const categoriesRef = collection(db, "categories");
    const q = query(categoriesRef, where("active", "==", true));

    const snapshot = await getDocs(q);
    const categories = snapshot.docs.map(mapDocToCategory);
    return categories.sort((a, b) => a.order - b.order);
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    throw new Error(`[products.service] Falha ao buscar categorias: ${message}`);
  }
}

/**
 * Retorna uma categoria ativa pelo seu ID.
 */
export async function getCategoryById(id: string): Promise<Category | null> {
  "use cache";
  cacheTag("categories");
  if (!id || typeof id !== "string") {
    return null;
  }

  try {
    const docRef = doc(db, "categories", id);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      return null;
    }

    const category = mapDocToCategory(docSnap);
    return category.active ? category : null;
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    throw new Error(`[products.service] Falha ao buscar categoria com id "${id}": ${message}`);
  }
}

/**
 * Retorna uma categoria ativa pelo seu slug.
 */
export async function getCategoryBySlug(slug: string): Promise<Category | null> {
  "use cache";
  cacheTag("categories");
  if (!slug || typeof slug !== "string") {
    return null;
  }

  try {
    const categoriesRef = collection(db, "categories");
    const q = query(
      categoriesRef,
      where("slug", "==", slug),
      where("active", "==", true),
      firestoreLimit(1)
    );

    const snapshot = await getDocs(q);
    if (snapshot.empty) {
      return null;
    }

    return mapDocToCategory(snapshot.docs[0]);
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    throw new Error(`[products.service] Falha ao buscar categoria com slug "${slug}": ${message}`);
  }
}

/**
 * Retorna produtos ativos aplicando filtros e ordenação em memória para preservar
 * busca textual parcial case-insensitive (name, brand, code, description) e regras de ordenação de preços.
 */
export async function getProducts(filter?: ProductFilter): Promise<Product[]> {
  "use cache";
  cacheTag("products");
  try {
    const productsRef = collection(db, "products");
    const q = query(productsRef, where("active", "==", true));
    const snapshot = await getDocs(q);

    let products = snapshot.docs.map(mapDocToProduct);

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
          break;
      }
    }

    return products;
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    throw new Error(`[products.service] Falha ao buscar produtos: ${message}`);
  }
}

/**
 * Retorna produtos ativos marcados com destaque (featured: true).
 */
export async function getFeaturedProducts(): Promise<Product[]> {
  "use cache";
  cacheTag("products");
  try {
    const productsRef = collection(db, "products");
    const q = query(
      productsRef,
      where("active", "==", true),
      where("featured", "==", true)
    );

    const snapshot = await getDocs(q);
    return snapshot.docs.map(mapDocToProduct);
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    throw new Error(`[products.service] Falha ao buscar produtos em destaque: ${message}`);
  }
}

/**
 * Retorna um produto ativo pelo seu slug.
 */
export async function getProductBySlug(slug: string): Promise<Product | null> {
  "use cache";
  cacheTag("products");
  if (!slug || typeof slug !== "string") {
    return null;
  }

  try {
    const productsRef = collection(db, "products");
    const q = query(
      productsRef,
      where("slug", "==", slug),
      where("active", "==", true),
      firestoreLimit(1)
    );

    const snapshot = await getDocs(q);
    if (snapshot.empty) {
      return null;
    }

    return mapDocToProduct(snapshot.docs[0]);
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    throw new Error(`[products.service] Falha ao buscar produto com slug "${slug}": ${message}`);
  }
}

/**
 * Retorna um produto ativo pelo seu ID de documento.
 */
export async function getProductById(id: string): Promise<Product | null> {
  "use cache";
  cacheTag("products");
  if (!id || typeof id !== "string") {
    return null;
  }

  try {
    const docRef = doc(db, "products", id);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      return null;
    }

    const product = mapDocToProduct(docSnap);
    return product.active ? product : null;
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    throw new Error(`[products.service] Falha ao buscar produto com id "${id}": ${message}`);
  }
}

/**
 * Retorna produtos relacionados da mesma categoria, excluindo o produto atual
 * e respeitando o limite fornecido sem perda antecipada de resultados.
 */
export async function getRelatedProducts(
  categoryId: string,
  currentProductId: string,
  limit = 3
): Promise<Product[]> {
  "use cache";
  cacheTag("products");
  if (!categoryId) {
    return [];
  }

  try {
    const productsRef = collection(db, "products");
    // Busca até limit + 1 produtos para garantir que a exclusão de currentProductId preserve o limite desejado
    const q = query(
      productsRef,
      where("active", "==", true),
      where("categoryId", "==", categoryId),
      firestoreLimit(limit + 1)
    );

    const snapshot = await getDocs(q);
    const products = snapshot.docs.map(mapDocToProduct);

    return products.filter((p) => p.id !== currentProductId).slice(0, limit);
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    throw new Error(
      `[products.service] Falha ao buscar produtos relacionados para categoria "${categoryId}": ${message}`
    );
  }
}
