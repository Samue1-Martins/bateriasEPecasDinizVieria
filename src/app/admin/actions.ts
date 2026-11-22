"use server";

import { updateTag } from "next/cache";

interface IdentityToolkitUser {
  localId?: string;
  customAttributes?: string;
}

/**
 * Valida no servidor se o Firebase ID Token pertence a um administrador
 * autorizado (Custom Claim `admin: true`) usando a API oficial do Identity Toolkit.
 */
async function verifyAdminIdToken(idToken: string): Promise<void> {
  if (!idToken || typeof idToken !== "string") {
    throw new Error("Token de autenticação ausente.");
  }

  const apiKey = process.env.NEXT_PUBLIC_FIREBASE_API_KEY;
  if (!apiKey) {
    throw new Error("Configuração do Firebase ausente no servidor.");
  }

  const response = await fetch(
    `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${encodeURIComponent(
      apiKey
    )}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ idToken }),
      cache: "no-store",
    }
  );

  if (!response.ok) {
    throw new Error("Sessão administrativa inválida ou expirada.");
  }

  const data = (await response.json()) as { users?: IdentityToolkitUser[] };
  const user = data.users?.[0];
  if (!user) {
    throw new Error("Usuário administrador não encontrado.");
  }

  let claims: Record<string, unknown> = {};
  if (user.customAttributes) {
    try {
      claims = JSON.parse(user.customAttributes) as Record<string, unknown>;
    } catch {
      claims = {};
    }
  }

  if (claims.admin !== true) {
    throw new Error("Permissão administrativa insuficiente para revalidar o cache.");
  }
}

/**
 * Invalida imediatamente o cache de produtos do catálogo público
 * após operações administrativas autorizadas no Firestore.
 */
export async function invalidateCatalogCache(idToken: string): Promise<void> {
  await verifyAdminIdToken(idToken);
  updateTag("products");
}
