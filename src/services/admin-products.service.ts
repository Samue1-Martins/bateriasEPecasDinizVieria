import {
  collection,
  doc,
  getDoc,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Product, ProductSpecification, ProductStatus } from "@/types";
import { mapDocToProduct } from "./firestore-mappers";
import { deleteProductImage, extractStoragePathFromUrl } from "./storage.service";

export interface AdminProductInput {
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
  mainImagePath?: string;
  galleryUrls: string[];
  galleryPaths?: string[];
  specifications: ProductSpecification[];
  vehicleApplications: string[];
}

/**
 * Gera um slug normalizado a partir do nome do produto.
 */
export function generateSlug(value: string): string {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

/**
 * Verifica se o slug está disponível na coleção `products`.
 */
export async function isSlugAvailable(
  slug: string,
  excludeProductId?: string
): Promise<boolean> {
  const normalized = slug.trim().toLowerCase();
  if (!normalized) return false;

  const productsRef = collection(db, "products");
  const q = query(productsRef, where("slug", "==", normalized));
  const snapshot = await getDocs(q);

  if (snapshot.empty) {
    return true;
  }

  return snapshot.docs.every((d) => d.id === excludeProductId);
}

/**
 * Retorna todos os produtos (ativos e inativos) diretamente do Firestore,
 * sem cache, para uso exclusivo no painel administrativo.
 */
export async function getAdminProducts(): Promise<Product[]> {
  try {
    const productsRef = collection(db, "products");
    const snapshot = await getDocs(productsRef);

    const products = snapshot.docs.map(mapDocToProduct);
    return products.sort((a, b) => a.name.localeCompare(b.name, "pt-BR"));
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    throw new Error(
      `[admin-products.service] Falha ao listar produtos administrativos: ${message}`
    );
  }
}

/**
 * Retorna um produto pelo ID (ativo ou inativo) diretamente do Firestore,
 * sem cache, para uso exclusivo no painel administrativo.
 */
export async function getAdminProductById(id: string): Promise<Product | null> {
  if (!id || typeof id !== "string") {
    return null;
  }

  try {
    const docRef = doc(db, "products", id);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      return null;
    }

    return mapDocToProduct(docSnap);
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    throw new Error(
      `[admin-products.service] Falha ao buscar produto administrativo com id "${id}": ${message}`
    );
  }
}

function buildFirestorePayload(
  input: AdminProductInput,
  timestamps: { createdAt?: string; updatedAt: string }
) {
  const payload: Record<string, unknown> = {
    name: input.name.trim(),
    slug: input.slug.trim().toLowerCase(),
    description: input.description.trim(),
    brand: input.brand.trim(),
    categoryId: input.categoryId.trim(),
    code: input.code && input.code.trim() !== "" ? input.code.trim() : null,
    price: input.priceOnRequest ? null : input.price,
    priceOnRequest: input.priceOnRequest,
    status: input.status,
    active: input.active,
    featured: input.featured,
    mainImageUrl: input.mainImageUrl.trim(),
    mainImagePath: input.mainImagePath || extractStoragePathFromUrl(input.mainImageUrl) || null,
    galleryUrls: input.galleryUrls.map((u) => u.trim()),
    galleryPaths:
      input.galleryPaths && input.galleryPaths.length > 0
        ? input.galleryPaths
        : input.galleryUrls
            .map((u) => extractStoragePathFromUrl(u))
            .filter((p): p is string => Boolean(p)),
    specifications: input.specifications.map((s) => ({
      label: s.label.trim(),
      value: s.value.trim(),
    })),
    vehicleApplications: input.vehicleApplications.map((a) => a.trim()),
    updatedAt: timestamps.updatedAt,
  };

  if (timestamps.createdAt) {
    payload.createdAt = timestamps.createdAt;
  }

  return payload;
}

/**
 * Cria um novo produto no Firestore validando unicidade de slug.
 */
export async function createProduct(input: AdminProductInput): Promise<Product> {
  const slug = input.slug.trim().toLowerCase();
  const available = await isSlugAvailable(slug);
  if (!available) {
    throw new Error(`O slug "${slug}" já está em uso por outro produto.`);
  }

  const now = new Date().toISOString();
  const payload = buildFirestorePayload(input, { createdAt: now, updatedAt: now });

  try {
    const productsRef = collection(db, "products");
    const docRef = await addDoc(productsRef, payload);

    // Persiste o próprio ID no campo `id` para manter compatibilidade com os documentos existentes
    await updateDoc(docRef, { id: docRef.id });

    const createdSnap = await getDoc(docRef);
    return mapDocToProduct(createdSnap);
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    throw new Error(`[admin-products.service] Falha ao cadastrar produto: ${message}`);
  }
}

/**
 * Atualiza um produto existente no Firestore validando unicidade de slug.
 */
export async function updateProduct(
  id: string,
  input: AdminProductInput
): Promise<Product> {
  const slug = input.slug.trim().toLowerCase();
  const available = await isSlugAvailable(slug, id);
  if (!available) {
    throw new Error(`O slug "${slug}" já está em uso por outro produto.`);
  }

  const now = new Date().toISOString();
  const payload = buildFirestorePayload(input, { updatedAt: now });

  try {
    const docRef = doc(db, "products", id);
    await updateDoc(docRef, payload);

    const updatedSnap = await getDoc(docRef);
    return mapDocToProduct(updatedSnap);
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    throw new Error(
      `[admin-products.service] Falha ao atualizar produto "${id}": ${message}`
    );
  }
}

/**
 * Alterna o estado ativo/inativo de um produto.
 */
export async function toggleProductActive(
  id: string,
  active: boolean
): Promise<void> {
  try {
    const docRef = doc(db, "products", id);
    await updateDoc(docRef, {
      active,
      updatedAt: new Date().toISOString(),
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    throw new Error(
      `[admin-products.service] Falha ao atualizar situação do produto "${id}": ${message}`
    );
  }
}

/**
 * Alterna a marcação de destaque de um produto.
 */
export async function toggleProductFeatured(
  id: string,
  featured: boolean
): Promise<void> {
  try {
    const docRef = doc(db, "products", id);
    await updateDoc(docRef, {
      featured,
      updatedAt: new Date().toISOString(),
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    throw new Error(
      `[admin-products.service] Falha ao atualizar destaque do produto "${id}": ${message}`
    );
  }
}

/**
 * Exclui o produto no Firestore e, em seguida, tenta remover suas imagens no Storage.
 * Retorna eventuais avisos de limpeza no Storage sem ocultar que o documento foi excluído.
 */
export async function deleteProduct(
  product: Product
): Promise<{ storageWarnings: string[] }> {
  try {
    const docRef = doc(db, "products", product.id);
    await deleteDoc(docRef);
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    throw new Error(
      `[admin-products.service] Falha ao excluir produto "${product.id}": ${message}`
    );
  }

  // Coleta caminhos únicos de todas as imagens associadas ao produto
  const pathsToDelete = new Set<string>();
  const mainPath = product.mainImagePath || extractStoragePathFromUrl(product.mainImageUrl);
  if (mainPath) {
    pathsToDelete.add(mainPath);
  }

  for (const p of product.galleryPaths || []) {
    const resolved = extractStoragePathFromUrl(p);
    if (resolved) pathsToDelete.add(resolved);
  }

  for (const url of product.galleryUrls || []) {
    const resolved = extractStoragePathFromUrl(url);
    if (resolved) pathsToDelete.add(resolved);
  }

  const storageWarnings: string[] = [];
  for (const storagePath of pathsToDelete) {
    const result = await deleteProductImage(storagePath);
    if (!result.ok && result.error) {
      storageWarnings.push(result.error);
    }
  }

  return { storageWarnings };
}
