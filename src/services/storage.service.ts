import { ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";
import { FirebaseError } from "firebase/app";
import { storage } from "@/lib/firebase";

export const MAX_IMAGE_SIZE_BYTES = 5 * 1024 * 1024; // 5 MB

export interface UploadedImageResult {
  url: string;
  path: string;
}

/**
 * Valida se o arquivo é uma imagem e respeita o limite de 5 MB das regras do Storage.
 */
export function validateImageFile(file: File): string | null {
  if (!file.type || !file.type.startsWith("image/")) {
    return `O arquivo "${file.name}" não é uma imagem válida.`;
  }

  if (file.size > MAX_IMAGE_SIZE_BYTES) {
    return `O arquivo "${file.name}" excede o limite máximo de 5 MB.`;
  }

  return null;
}

function sanitizeFileName(name: string): string {
  return name
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9._-]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

/**
 * Faz upload de uma imagem de produto para `products/` no Firebase Storage.
 */
export async function uploadProductImage(
  file: File,
  slugHint?: string
): Promise<UploadedImageResult> {
  const validationError = validateImageFile(file);
  if (validationError) {
    throw new Error(validationError);
  }

  const safeOriginal = sanitizeFileName(file.name) || "imagem";
  const prefix = slugHint ? `${sanitizeFileName(slugHint)}-` : "";
  const uniqueSuffix = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
  const storagePath = `products/${prefix}${uniqueSuffix}-${safeOriginal}`;

  const storageRef = ref(storage, storagePath);
  await uploadBytes(storageRef, file, {
    contentType: file.type,
    cacheControl: "public, max-age=31536000, immutable",
  });

  const url = await getDownloadURL(storageRef);
  return { url, path: storagePath };
}

/**
 * Extrai o caminho interno do Firebase Storage (ex.: `products/battery-60ah.svg`)
 * a partir de uma URL pública de download do Firebase Storage.
 */
export function extractStoragePathFromUrl(url: string): string | null {
  if (!url) return null;

  // Se já for um path relativo interno do Storage
  if (url.startsWith("products/")) {
    return url;
  }

  try {
    const parsed = new URL(url);
    if (!parsed.hostname.includes("firebasestorage.googleapis.com")) {
      return null;
    }

    const marker = "/o/";
    const idx = parsed.pathname.indexOf(marker);
    if (idx === -1) return null;

    const encodedPath = parsed.pathname.slice(idx + marker.length);
    const decodedPath = decodeURIComponent(encodedPath);
    return decodedPath.startsWith("products/") ? decodedPath : null;
  } catch {
    return null;
  }
}

/**
 * Remove uma imagem do Firebase Storage a partir de seu path ou URL.
 * Ignora silenciosamente caso o objeto já não exista (`storage/object-not-found`).
 */
export async function deleteProductImage(
  pathOrUrl: string
): Promise<{ ok: boolean; error?: string }> {
  const storagePath = extractStoragePathFromUrl(pathOrUrl);
  if (!storagePath) {
    return { ok: true };
  }

  try {
    const storageRef = ref(storage, storagePath);
    await deleteObject(storageRef);
    return { ok: true };
  } catch (error) {
    if (error instanceof FirebaseError && error.code === "storage/object-not-found") {
      return { ok: true };
    }
    const message = error instanceof Error ? error.message : String(error);
    return {
      ok: false,
      error: `Falha ao remover imagem "${storagePath}": ${message}`,
    };
  }
}
