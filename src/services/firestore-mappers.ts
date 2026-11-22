import { DocumentData, QueryDocumentSnapshot } from "firebase/firestore";
import { Category, Product, ProductSpecification, ProductStatus } from "@/types";

const VALID_PRODUCT_STATUSES: readonly ProductStatus[] = [
  "in_stock",
  "on_demand",
  "out_of_stock",
] as const;

type FirestoreDocLike =
  | QueryDocumentSnapshot<DocumentData>
  | { id: string; data: () => DocumentData | undefined };

/**
 * Converte e valida estritamente os dados de um documento do Firestore para a tipagem Category.
 * Lança erro identificável se algum campo obrigatório ou formato estiver inválido.
 */
export function mapDocToCategory(docSnap: FirestoreDocLike): Category {
  const data = docSnap.data();
  if (!data) {
    throw new Error(`[category:${docSnap.id}] Documento vazio ou sem dados válidos.`);
  }

  if (typeof data.name !== "string" || data.name.trim() === "") {
    throw new Error(
      `[category:${docSnap.id}] Campo "name" inválido: esperado string não-vazia, recebido ${JSON.stringify(
        data.name
      )}.`
    );
  }

  if (typeof data.slug !== "string" || data.slug.trim() === "") {
    throw new Error(
      `[category:${docSnap.id}] Campo "slug" inválido: esperado string não-vazia, recebido ${JSON.stringify(
        data.slug
      )}.`
    );
  }

  if (typeof data.iconKey !== "string" || data.iconKey.trim() === "") {
    throw new Error(
      `[category:${docSnap.id}] Campo "iconKey" inválido: esperado string não-vazia, recebido ${JSON.stringify(
        data.iconKey
      )}.`
    );
  }

  if (typeof data.order !== "number" || !Number.isFinite(data.order)) {
    throw new Error(
      `[category:${docSnap.id}] Campo "order" inválido: esperado número finito, recebido ${JSON.stringify(
        data.order
      )}.`
    );
  }

  if (typeof data.active !== "boolean") {
    throw new Error(
      `[category:${docSnap.id}] Campo "active" inválido: esperado booleano, recebido ${JSON.stringify(
        data.active
      )}.`
    );
  }

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
export function mapDocToProduct(docSnap: FirestoreDocLike): Product {
  const data = docSnap.data();
  if (!data) {
    throw new Error(`[product:${docSnap.id}] Documento vazio ou sem dados válidos.`);
  }

  if (typeof data.name !== "string" || data.name.trim() === "") {
    throw new Error(
      `[product:${docSnap.id}] Campo "name" inválido: esperado string não-vazia, recebido ${JSON.stringify(
        data.name
      )}.`
    );
  }

  if (typeof data.slug !== "string" || data.slug.trim() === "") {
    throw new Error(
      `[product:${docSnap.id}] Campo "slug" inválido: esperado string não-vazia, recebido ${JSON.stringify(
        data.slug
      )}.`
    );
  }

  if (typeof data.description !== "string" || data.description.trim() === "") {
    throw new Error(
      `[product:${docSnap.id}] Campo "description" inválido: esperado string não-vazia, recebido ${JSON.stringify(
        data.description
      )}.`
    );
  }

  if (typeof data.brand !== "string" || data.brand.trim() === "") {
    throw new Error(
      `[product:${docSnap.id}] Campo "brand" inválido: esperado string não-vazia, recebido ${JSON.stringify(
        data.brand
      )}.`
    );
  }

  if (typeof data.categoryId !== "string" || data.categoryId.trim() === "") {
    throw new Error(
      `[product:${docSnap.id}] Campo "categoryId" inválido: esperado string não-vazia, recebido ${JSON.stringify(
        data.categoryId
      )}.`
    );
  }

  if (typeof data.mainImageUrl !== "string" || data.mainImageUrl.trim() === "") {
    throw new Error(
      `[product:${docSnap.id}] Campo "mainImageUrl" inválido: esperado string de URL não-vazia, recebido ${JSON.stringify(
        data.mainImageUrl
      )}.`
    );
  }

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

  if (typeof data.priceOnRequest !== "boolean") {
    throw new Error(
      `[product:${docSnap.id}] Campo "priceOnRequest" inválido: esperado booleano, recebido ${JSON.stringify(
        data.priceOnRequest
      )}.`
    );
  }

  if (typeof data.active !== "boolean") {
    throw new Error(
      `[product:${docSnap.id}] Campo "active" inválido: esperado booleano, recebido ${JSON.stringify(
        data.active
      )}.`
    );
  }

  if (typeof data.featured !== "boolean") {
    throw new Error(
      `[product:${docSnap.id}] Campo "featured" inválido: esperado booleano, recebido ${JSON.stringify(
        data.featured
      )}.`
    );
  }

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

  const mainImagePath =
    typeof data.mainImagePath === "string" && data.mainImagePath.trim() !== ""
      ? data.mainImagePath.trim()
      : undefined;

  const galleryPaths = Array.isArray(data.galleryPaths)
    ? data.galleryPaths
        .filter((p): p is string => typeof p === "string" && p.trim() !== "")
        .map((p) => p.trim())
    : undefined;

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
    ...(mainImagePath ? { mainImagePath } : {}),
    galleryUrls,
    ...(galleryPaths && galleryPaths.length > 0 ? { galleryPaths } : {}),
    specifications,
    vehicleApplications,
    createdAt,
    updatedAt,
  };
}
