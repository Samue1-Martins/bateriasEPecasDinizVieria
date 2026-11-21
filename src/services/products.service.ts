import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
  limit as firestoreLimit,
  DocumentData,
  QueryDocumentSnapshot,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Category, Product, ProductFilter, ProductSpecification, ProductStatus } from "@/types";

const VALID_PRODUCT_STATUSES: readonly ProductStatus[] = [
  "in_stock",
  "on_demand",
  "out_of_stock",
] as const;

/**
 * Converte e valida estritamente os dados de um documento do Firestore para a tipagem Category.
 * Lança erro identificável se algum campo obrigatório ou formato estiver inválido.
 */
function mapDocToCategory(
  docSnap:
    | QueryDocumentSnapshot<DocumentData>
    | { id: string; data: () => DocumentData | undefined }
): Category {
  const data = docSnap.data();
  if (!data) {
    throw new Error(`[category:${docSnap.id}] Documento vazio ou sem dados válidos.`);
  }

  // 1. name: string válida e não-vazia
  if (typeof data.name !== "string" || data.name.trim() === "") {
    throw new Error(
      `[category:${docSnap.id}] Campo "name" inválido: esperado string não-vazia, recebido ${JSON.stringify(
        data.name
      )}.`
    );
  }

  // 2. slug: string válida e não-vazia
  if (typeof data.slug !== "string" || data.slug.trim() === "") {
    throw new Error(
      `[category:${docSnap.id}] Campo "slug" inválido: esperado string não-vazia, recebido ${JSON.stringify(
        data.slug
      )}.`
    );
  }

  // 3. iconKey: string válida e não-vazia
  if (typeof data.iconKey !== "string" || data.iconKey.trim() === "") {
    throw new Error(
      `[category:${docSnap.id}] Campo "iconKey" inválido: esperado string não-vazia, recebido ${JSON.stringify(
        data.iconKey
      )}.`
    );
  }

  // 4. order: número finito
  if (typeof data.order !== "number" || !Number.isFinite(data.order)) {
    throw new Error(
      `[category:${docSnap.id}] Campo "order" inválido: esperado número finito, recebido ${JSON.stringify(
        data.order
      )}.`
    );
  }

  // 5. active: booleano
  if (typeof data.active !== "boolean") {
    throw new Error(
      `[category:${docSnap.id}] Campo "active" inválido: esperado booleano, recebido ${JSON.stringify(
        data.active
      )}.`
    );
  }

  // 6. description: opcional (se presente, deve ser string válida)
  let description: string | undefined;
  if (data.description !== undefined && data.description !== null) {
    if (typeof data.description !== "string") {
      throw new Error(
        `[category:${docSnap.id}] Campo opcional "description" inválido: esperado string ou nulo/ausente, recebido ${JSON.stringify(
          data.description
        )}.`
      );
    }
    const trimmed = data.description.trim();
    if (trimmed !== "") {
      description = trimmed;
    }
  }

  return {
    id: docSnap.id,
    name: data.name.trim(),
    slug: data.slug.trim(),
    order: data.order,
    iconKey: data.iconKey.trim(),
    active: data.active,
    description,
  };
}

/**
 * Converte e valida estritamente os dados de um documento do Firestore para a tipagem Product.
 * Lança erro identificável se algum campo obrigatório ou formato estiver inválido.
 */
function mapDocToProduct(
  docSnap:
    | QueryDocumentSnapshot<DocumentData>
    | { id: string; data: () => DocumentData | undefined }
): Product {
  const data = docSnap.data();
  if (!data) {
    throw new Error(`[product:${docSnap.id}] Documento vazio ou sem dados válidos.`);
  }

  // 1. name: string válida e não-vazia
  if (typeof data.name !== "string" || data.name.trim() === "") {
    throw new Error(
      `[product:${docSnap.id}] Campo "name" inválido: esperado string não-vazia, recebido ${JSON.stringify(
        data.name
      )}.`
    );
  }

  // 2. slug: string válida e não-vazia
  if (typeof data.slug !== "string" || data.slug.trim() === "") {
    throw new Error(
      `[product:${docSnap.id}] Campo "slug" inválido: esperado string não-vazia, recebido ${JSON.stringify(
        data.slug
      )}.`
    );
  }

  // 3. description: string válida e não-vazia
  if (typeof data.description !== "string" || data.description.trim() === "") {
    throw new Error(
      `[product:${docSnap.id}] Campo "description" inválido: esperado string não-vazia, recebido ${JSON.stringify(
        data.description
      )}.`
    );
  }

  // 4. brand: string válida e não-vazia
  if (typeof data.brand !== "string" || data.brand.trim() === "") {
    throw new Error(
      `[product:${docSnap.id}] Campo "brand" inválido: esperado string não-vazia, recebido ${JSON.stringify(
        data.brand
      )}.`
    );
  }

  // 5. categoryId: string válida e não-vazia
  if (typeof data.categoryId !== "string" || data.categoryId.trim() === "") {
    throw new Error(
      `[product:${docSnap.id}] Campo "categoryId" inválido: esperado string não-vazia, recebido ${JSON.stringify(
        data.categoryId
      )}.`
    );
  }

  // 6. mainImageUrl: string válida e não-vazia
  if (typeof data.mainImageUrl !== "string" || data.mainImageUrl.trim() === "") {
    throw new Error(
      `[product:${docSnap.id}] Campo "mainImageUrl" inválido: esperado string de URL não-vazia, recebido ${JSON.stringify(
        data.mainImageUrl
      )}.`
    );
  }

  // 7. status: exclusivamente "in_stock" | "on_demand" | "out_of_stock"
  if (
    typeof data.status !== "string" ||
    !VALID_PRODUCT_STATUSES.includes(data.status as ProductStatus)
  ) {
    throw new Error(
      `[product:${docSnap.id}] Campo "status" inválido: esperado um de [${VALID_PRODUCT_STATUSES.join(
        ", "
      )}], recebido ${JSON.stringify(data.status)}.`
    );
  }

  // 8. price: apenas número finito >= 0 ou null
  let price: number | null = null;
  if (data.price !== null && data.price !== undefined) {
    if (typeof data.price !== "number" || !Number.isFinite(data.price) || data.price < 0) {
      throw new Error(
        `[product:${docSnap.id}] Campo "price" inválido: esperado número finito >= 0 ou null, recebido ${JSON.stringify(
          data.price
        )}.`
      );
    }
    price = data.price;
  }

  // 9. priceOnRequest: booleano
  if (typeof data.priceOnRequest !== "boolean") {
    throw new Error(
      `[product:${docSnap.id}] Campo "priceOnRequest" inválido: esperado booleano, recebido ${JSON.stringify(
        data.priceOnRequest
      )}.`
    );
  }

  // 10. active: booleano
  if (typeof data.active !== "boolean") {
    throw new Error(
      `[product:${docSnap.id}] Campo "active" inválido: esperado booleano, recebido ${JSON.stringify(
        data.active
      )}.`
    );
  }

  // 11. featured: booleano
  if (typeof data.featured !== "boolean") {
    throw new Error(
      `[product:${docSnap.id}] Campo "featured" inválido: esperado booleano, recebido ${JSON.stringify(
        data.featured
      )}.`
    );
  }

  // 12. specifications: array de objetos com label e value strings válidas
  if (!Array.isArray(data.specifications)) {
    throw new Error(
      `[product:${docSnap.id}] Campo "specifications" inválido: esperado array de especificações, recebido ${typeof data.specifications}.`
    );
  }
  const specifications: ProductSpecification[] = [];
  for (let i = 0; i < data.specifications.length; i++) {
    const item = data.specifications[i];
    if (
      !item ||
      typeof item !== "object" ||
      typeof item.label !== "string" ||
      item.label.trim() === "" ||
      typeof item.value !== "string" ||
      item.value.trim() === ""
    ) {
      throw new Error(
        `[product:${docSnap.id}] Especificação no índice ${i} inválida: esperado objeto com { label: string, value: string } não-vazios, recebido ${JSON.stringify(
          item
        )}.`
      );
    }
    specifications.push({
      label: item.label.trim(),
      value: item.value.trim(),
    });
  }

  // 13. galleryUrls: array de strings válidas
  if (!Array.isArray(data.galleryUrls)) {
    throw new Error(
      `[product:${docSnap.id}] Campo "galleryUrls" inválido: esperado array de URLs, recebido ${typeof data.galleryUrls}.`
    );
  }
  const galleryUrls: string[] = [];
  for (let i = 0; i < data.galleryUrls.length; i++) {
    const url = data.galleryUrls[i];
    if (typeof url !== "string" || url.trim() === "") {
      throw new Error(
        `[product:${docSnap.id}] URL da galeria no índice ${i} inválida: esperado string não-vazia, recebido ${JSON.stringify(
          url
        )}.`
      );
    }
    galleryUrls.push(url.trim());
  }

  // 14. vehicleApplications: array de strings válidas
  if (!Array.isArray(data.vehicleApplications)) {
    throw new Error(
      `[product:${docSnap.id}] Campo "vehicleApplications" inválido: esperado array de strings, recebido ${typeof data.vehicleApplications}.`
    );
  }
  const vehicleApplications: string[] = [];
  for (let i = 0; i < data.vehicleApplications.length; i++) {
    const app = data.vehicleApplications[i];
    if (typeof app !== "string" || app.trim() === "") {
      throw new Error(
        `[product:${docSnap.id}] Aplicação veicular no índice ${i} inválida: esperado string não-vazia, recebido ${JSON.stringify(
          app
        )}.`
      );
    }
    vehicleApplications.push(app.trim());
  }

  // 15. code: opcional
  let code: string | undefined;
  if (data.code !== undefined && data.code !== null) {
    if (typeof data.code !== "string") {
      throw new Error(
        `[product:${docSnap.id}] Campo opcional "code" inválido: esperado string, recebido ${JSON.stringify(
          data.code
        )}.`
      );
    }
    const trimmed = data.code.trim();
    if (trimmed !== "") {
      code = trimmed;
    }
  }

  // 16. createdAt e updatedAt: opcionais
  const createdAt = typeof data.createdAt === "string" ? data.createdAt : undefined;
  const updatedAt = typeof data.updatedAt === "string" ? data.updatedAt : undefined;

  return {
    id: docSnap.id,
    name: data.name.trim(),
    slug: data.slug.trim(),
    description: data.description.trim(),
    brand: data.brand.trim(),
    categoryId: data.categoryId.trim(),
    code,
    price,
    priceOnRequest: data.priceOnRequest,
    status: data.status as ProductStatus,
    active: data.active,
    featured: data.featured,
    mainImageUrl: data.mainImageUrl.trim(),
    galleryUrls,
    specifications,
    vehicleApplications,
    createdAt,
    updatedAt,
  };
}

/**
 * Retorna todas as categorias ativas ordenadas por 'order' crescente.
 */
export async function getCategories(): Promise<Category[]> {
  "use cache";
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
