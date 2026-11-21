import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import { loadEnvConfig } from "@next/env";
import { getApps, initializeApp, cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import { getStorage } from "firebase-admin/storage";
import { DEMO_CATEGORIES } from "../src/data/demo-categories";
import { DEMO_PRODUCTS } from "../src/data/demo-products";
import { ProductSpecification, ProductStatus } from "../src/types";

// Carregamento das variáveis de ambiente (.env, .env.local)
const projectDir = process.cwd();
loadEnvConfig(projectDir);

const CREDENTIAL_FILE_NAME =
  "diniz-auto-pecas-firebase-adminsdk-fbsvc-160544393d.json";
const CREDENTIAL_PATH = path.resolve(projectDir, CREDENTIAL_FILE_NAME);

// Trava de segurança definitiva: impede qualquer gravação até que seja expressamente autorizada.
const MIGRATION_AUTHORIZED = false;

interface StorageFileInfo {
  fileName: string;
  destinationPath: string;
  localRelPath: string;
  exists: boolean;
  token: string;
  isExistingToken: boolean;
  publicUrl: string;
}

interface PreparedCategoryDoc {
  id: string;
  data: {
    id: string;
    name: string;
    slug: string;
    order: number;
    iconKey: string;
    active: boolean;
    description: string | null;
  };
}

interface PreparedProductDoc {
  id: string;
  data: {
    id: string;
    name: string;
    slug: string;
    description: string;
    brand: string;
    categoryId: string;
    code: string | null;
    price: number | null;
    priceOnRequest: boolean;
    status: ProductStatus;
    active: boolean;
    featured: boolean;
    mainImageUrl: string;
    galleryUrls: string[];
    specifications: ProductSpecification[];
    vehicleApplications: string[];
    createdAt: string;
    updatedAt: string;
  };
}

interface MigrationReport {
  categoriesTotal: number;
  categoriesToInsert: string[];
  categoriesExisting: string[];
  productsTotal: number;
  productsToInsert: string[];
  productsExisting: string[];
  imagesTotal: number;
  imagesToUpload: string[];
  imagesExisting: string[];
  storageFilesInfo: Map<string, StorageFileInfo>;
  imageUrlsMap: Record<string, string>;
  firestoreConnected: boolean;
  storageConnected: boolean;
  errors: string[];
  warnings: string[];
}

const VALID_STATUSES: ProductStatus[] = [
  "in_stock",
  "on_demand",
  "out_of_stock",
];

/**
 * 1. Inicialização do Firebase Admin SDK.
 */
function initFirebaseAdmin() {
  if (!fs.existsSync(CREDENTIAL_PATH)) {
    throw new Error(
      `Arquivo de credencial do Firebase Admin não encontrado no caminho: ${CREDENTIAL_PATH}`
    );
  }

  const credentialRaw = fs.readFileSync(CREDENTIAL_PATH, "utf-8");
  const serviceAccount = JSON.parse(credentialRaw);

  const projectId =
    process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || serviceAccount.project_id;

  const storageBucket =
    process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET ||
    serviceAccount.storage_bucket ||
    serviceAccount.storageBucket;

  if (!projectId) {
    throw new Error(
      "Identificador do projeto (projectId) não encontrado nem nas credenciais nem no ambiente."
    );
  }

  if (!storageBucket) {
    throw new Error(
      "Bucket do Firebase Storage (NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET) não configurado."
    );
  }

  const app = getApps().length
    ? getApps()[0]
    : initializeApp({
        credential: cert(serviceAccount),
        projectId,
        storageBucket,
      });

  const firestore = getFirestore(app);
  const bucket = getStorage(app).bucket();

  return { firestore, bucket, storageBucket };
}

/**
 * 2. Validação rigorosa dos dados demonstrativos em memória.
 */
function validateData(report: MigrationReport): {
  categoryIds: Set<string>;
  referencedImages: Set<string>;
} {
  const categoryIds = new Set<string>();
  const categorySlugs = new Set<string>();

  if (!Array.isArray(DEMO_CATEGORIES) || DEMO_CATEGORIES.length !== 7) {
    report.errors.push(
      `Quantidade de categorias inválida: esperado 7, encontrado ${
        Array.isArray(DEMO_CATEGORIES) ? DEMO_CATEGORIES.length : "não-array"
      }.`
    );
  }

  for (const cat of DEMO_CATEGORIES) {
    // Campos obrigatórios de categoria
    if (!cat.id || typeof cat.id !== "string" || cat.id.trim() === "") {
      report.errors.push(`Categoria com ID inválido ou ausente: ${JSON.stringify(cat)}`);
    } else if (categoryIds.has(cat.id)) {
      report.errors.push(`ID de categoria duplicado: "${cat.id}".`);
    } else {
      categoryIds.add(cat.id);
    }

    if (!cat.name || typeof cat.name !== "string" || cat.name.trim() === "") {
      report.errors.push(`Categoria "${cat.id}" possui name inválido.`);
    }

    if (!cat.slug || typeof cat.slug !== "string" || cat.slug.trim() === "") {
      report.errors.push(`Categoria "${cat.id}" possui slug inválido.`);
    } else if (categorySlugs.has(cat.slug)) {
      report.errors.push(`Slug de categoria duplicado: "${cat.slug}".`);
    } else {
      categorySlugs.add(cat.slug);
    }

    if (typeof cat.order !== "number" || !Number.isFinite(cat.order)) {
      report.errors.push(`Categoria "${cat.id}" possui order inválido (não finito ou não numérico).`);
    }

    if (!cat.iconKey || typeof cat.iconKey !== "string" || cat.iconKey.trim() === "") {
      report.errors.push(`Categoria "${cat.id}" possui iconKey inválido.`);
    }

    if (typeof cat.active !== "boolean") {
      report.errors.push(`Categoria "${cat.id}" possui active inválido (deve ser booleano).`);
    }

    if (cat.description !== undefined && cat.description !== null && typeof cat.description !== "string") {
      report.errors.push(`Categoria "${cat.id}" possui description com tipo inválido.`);
    }
  }

  const productIds = new Set<string>();
  const productSlugs = new Set<string>();
  const referencedImages = new Set<string>();

  if (!Array.isArray(DEMO_PRODUCTS) || DEMO_PRODUCTS.length !== 13) {
    report.errors.push(
      `Quantidade de produtos inválida: esperado 13, encontrado ${
        Array.isArray(DEMO_PRODUCTS) ? DEMO_PRODUCTS.length : "não-array"
      }.`
    );
  }

  for (const prod of DEMO_PRODUCTS) {
    // Validação de ID e Slug
    if (!prod.id || typeof prod.id !== "string" || prod.id.trim() === "") {
      report.errors.push(`Produto com ID inválido ou ausente: ${JSON.stringify(prod)}`);
    } else if (productIds.has(prod.id)) {
      report.errors.push(`ID de produto duplicado: "${prod.id}".`);
    } else {
      productIds.add(prod.id);
    }

    if (!prod.name || typeof prod.name !== "string" || prod.name.trim() === "") {
      report.errors.push(`Produto "${prod.id}" possui name inválido.`);
    }

    if (!prod.slug || typeof prod.slug !== "string" || prod.slug.trim() === "") {
      report.errors.push(`Produto "${prod.id}" possui slug inválido.`);
    } else if (productSlugs.has(prod.slug)) {
      report.errors.push(`Slug de produto duplicado: "${prod.slug}".`);
    } else {
      productSlugs.add(prod.slug);
    }

    if (!prod.description || typeof prod.description !== "string" || prod.description.trim() === "") {
      report.errors.push(`Produto "${prod.id}" possui description inválido.`);
    }

    if (!prod.brand || typeof prod.brand !== "string" || prod.brand.trim() === "") {
      report.errors.push(`Produto "${prod.id}" possui brand inválido.`);
    }

    // Integridade referencial
    if (!prod.categoryId || typeof prod.categoryId !== "string" || !categoryIds.has(prod.categoryId)) {
      report.errors.push(
        `Produto "${prod.id}" referencia categoryId inexistente ou inválido: "${prod.categoryId}".`
      );
    }

    if (prod.code !== undefined && prod.code !== null && typeof prod.code !== "string") {
      report.errors.push(`Produto "${prod.id}" possui code com tipo inválido.`);
    }

    // Validação estrita de price: null ou número finito
    if (prod.price !== null) {
      if (typeof prod.price !== "number" || !Number.isFinite(prod.price) || prod.price < 0) {
        report.errors.push(
          `Produto "${prod.id}" possui price inválido (deve ser número finito não-negativo ou null).`
        );
      }
    }

    if (typeof prod.priceOnRequest !== "boolean") {
      report.errors.push(`Produto "${prod.id}" possui priceOnRequest não booleano.`);
    }

    if (!VALID_STATUSES.includes(prod.status)) {
      report.errors.push(`Produto "${prod.id}" possui status inválido: "${prod.status}".`);
    }

    if (typeof prod.active !== "boolean") {
      report.errors.push(`Produto "${prod.id}" possui active não booleano.`);
    }

    if (typeof prod.featured !== "boolean") {
      report.errors.push(`Produto "${prod.id}" possui featured não booleano.`);
    }

    // Validação de imagens
    if (!prod.mainImageUrl || typeof prod.mainImageUrl !== "string" || prod.mainImageUrl.trim() === "") {
      report.errors.push(`Produto "${prod.id}" não possui mainImageUrl válida.`);
    } else {
      referencedImages.add(prod.mainImageUrl);
    }

    if (!Array.isArray(prod.galleryUrls)) {
      report.errors.push(`Produto "${prod.id}" possui galleryUrls que não é um array.`);
    } else {
      for (const g of prod.galleryUrls) {
        if (!g || typeof g !== "string" || g.trim() === "") {
          report.errors.push(`Produto "${prod.id}" possui item inválido em galleryUrls.`);
        } else {
          referencedImages.add(g);
        }
      }
    }

    // Validação de specifications (array de ProductSpecification { label, value })
    if (!Array.isArray(prod.specifications)) {
      report.errors.push(`Produto "${prod.id}" possui specifications que não é um array.`);
    } else {
      for (const spec of prod.specifications) {
        if (
          !spec ||
          typeof spec !== "object" ||
          typeof spec.label !== "string" ||
          spec.label.trim() === "" ||
          typeof spec.value !== "string" ||
          spec.value.trim() === ""
        ) {
          report.errors.push(
            `Produto "${prod.id}" possui especificação inválida (deve conter label e value como strings não-vazias): ${JSON.stringify(spec)}`
          );
        }
      }
    }

    // Validação de vehicleApplications (array de strings)
    if (!Array.isArray(prod.vehicleApplications)) {
      report.errors.push(`Produto "${prod.id}" possui vehicleApplications que não é um array.`);
    } else {
      for (const v of prod.vehicleApplications) {
        if (!v || typeof v !== "string" || v.trim() === "") {
          report.errors.push(`Produto "${prod.id}" possui item inválido em vehicleApplications.`);
        }
      }
    }
  }

  report.categoriesTotal = DEMO_CATEGORIES.length;
  report.productsTotal = DEMO_PRODUCTS.length;
  return { categoryIds, referencedImages };
}

/**
 * 3. Validação física dos arquivos locais de imagem e restrição contra path traversal e symlinks.
 */
function validateLocalImages(
  referencedImages: Set<string>,
  report: MigrationReport
): string[] {
  const allowedDir = path.resolve(projectDir, "public", "images", "products");

  if (!fs.existsSync(allowedDir)) {
    report.errors.push(`Diretório permitido de imagens não existe: "${allowedDir}"`);
    return [];
  }

  // Resolve o caminho físico canônico do diretório base (resolvendo possíveis links simbólicos no próprio diretório)
  const realAllowedDir = fs.realpathSync(allowedDir);
  const uniqueFiles: string[] = [];

  for (const imgUrl of referencedImages) {
    // 1. Rejeição de barras invertidas
    if (imgUrl.includes("\\")) {
      report.errors.push(
        `Formato inválido de caminho: barras invertidas não são permitidas ("${imgUrl}").`
      );
      continue;
    }

    // 2. Rejeição de prefixo inesperado
    if (!imgUrl.startsWith("/images/products/")) {
      report.errors.push(
        `URL de imagem com formato inesperado (deve iniciar com "/images/products/"): "${imgUrl}"`
      );
      continue;
    }

    // 3. Extração da porção relativa após /images/products/
    const subPath = imgUrl.slice("/images/products/".length);
    const segments = subPath.split("/");

    // 4. Rejeição explícita de segmentos contendo '.', '..' ou strings vazias
    if (segments.some((seg) => seg === "" || seg === "." || seg === "..")) {
      report.errors.push(
        `Segmento inválido ou tentativa de path traversal detectada ("${imgUrl}").`
      );
      continue;
    }

    // 5. Devem ser apenas arquivos diretos dentro da pasta (sem subdiretórios adicionais não mapeados)
    if (segments.length !== 1) {
      report.errors.push(
        `Subdiretórios não são permitidos em /images/products/: "${imgUrl}"`
      );
      continue;
    }

    const fileName = segments[0];

    // Validação de extensão .svg esperada
    if (!fileName.toLowerCase().endsWith(".svg")) {
      report.errors.push(`Arquivo com extensão não permitida (esperado .svg): "${imgUrl}"`);
      continue;
    }

    // 6. Resolução do caminho absoluto dentro do diretório autorizado
    const resolvedPath = path.resolve(realAllowedDir, fileName);

    // 7. Verificação de contenção no diretório canônico antes de verificar existência
    if (
      !resolvedPath.startsWith(realAllowedDir + path.sep) &&
      resolvedPath !== path.join(realAllowedDir, fileName)
    ) {
      report.errors.push(`Tentativa de path traversal detectada na imagem: "${imgUrl}"`);
      continue;
    }

    // 8. Checagem de existência no disco
    if (!fs.existsSync(resolvedPath)) {
      report.errors.push(`Arquivo de imagem não encontrado no disco: "${resolvedPath}"`);
      continue;
    }

    // 9. Verificação de link simbólico com fs.realpathSync()
    try {
      const realFilePath = fs.realpathSync(resolvedPath);
      if (!realFilePath.startsWith(realAllowedDir + path.sep)) {
        report.errors.push(
          `ALERTA DE SEGURANÇA: Link simbólico para fora do diretório autorizado: "${realFilePath}" (origem: "${imgUrl}").`
        );
        continue;
      }

      const relPath = path.posix.join("images", "products", fileName);
      if (!uniqueFiles.includes(relPath)) {
        uniqueFiles.push(relPath);
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      report.errors.push(`Falha ao resolver caminho físico real de "${resolvedPath}": ${msg}`);
    }
  }

  uniqueFiles.sort();
  report.imagesTotal = uniqueFiles.length;
  return uniqueFiles;
}

/**
 * 4. Consulta somente-leitura dos documentos existentes no Firestore.
 */
async function checkExistingFirestoreDocs(
  firestore: ReturnType<typeof getFirestore>,
  report: MigrationReport
): Promise<{
  existingCategories: Set<string>;
  existingProducts: Set<string>;
}> {
  const existingCategories = new Set<string>();
  const existingProducts = new Set<string>();

  try {
    const catSnapshot = await firestore.collection("categories").get();
    catSnapshot.forEach((doc) => existingCategories.add(doc.id));
    report.firestoreConnected = true;
  } catch (err: unknown) {
    report.firestoreConnected = false;
    const msg = err instanceof Error ? err.message : String(err);
    report.errors.push(`Falha ao consultar coleção "categories" no Firestore: ${msg}`);
  }

  try {
    const prodSnapshot = await firestore.collection("products").get();
    prodSnapshot.forEach((doc) => existingProducts.add(doc.id));
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    report.errors.push(`Falha ao consultar coleção "products" no Firestore: ${msg}`);
  }

  for (const cat of DEMO_CATEGORIES) {
    if (existingCategories.has(cat.id)) {
      report.categoriesExisting.push(cat.id);
    } else {
      report.categoriesToInsert.push(cat.id);
    }
  }

  for (const prod of DEMO_PRODUCTS) {
    if (existingProducts.has(prod.id)) {
      report.productsExisting.push(prod.id);
    } else {
      report.productsToInsert.push(prod.id);
    }
  }

  return { existingCategories, existingProducts };
}

/**
 * 5. Consulta somente-leitura dos arquivos no Storage e determinação determinística dos tokens.
 */
async function checkExistingStorageFiles(
  bucket: ReturnType<ReturnType<typeof getStorage>["bucket"]>,
  localImages: string[],
  storageBucket: string,
  report: MigrationReport
): Promise<Map<string, StorageFileInfo>> {
  const filesInfoMap = new Map<string, StorageFileInfo>();

  try {
    const [exists] = await bucket.exists();
    if (!exists) {
      report.storageConnected = false;
      report.errors.push(`Bucket do Firebase Storage não existe ou não está acessível.`);
      return filesInfoMap;
    }
    report.storageConnected = true;
  } catch (err: unknown) {
    report.storageConnected = false;
    const msg = err instanceof Error ? err.message : String(err);
    report.errors.push(`Falha de conexão com o Storage: ${msg}`);
    return filesInfoMap;
  }

  for (const localRelPath of localImages) {
    const fileName = path.basename(localRelPath);
    const destinationPath = `products/${fileName}`;
    const fileRef = bucket.file(destinationPath);

    let fileExists = false;
    let recoveredToken: string | undefined;

    try {
      const [exists] = await fileRef.exists();
      fileExists = exists;

      if (fileExists) {
        report.imagesExisting.push(destinationPath);
        const [metadata] = await fileRef.getMetadata();
        const rawToken = metadata.metadata?.firebaseStorageDownloadTokens;

        if (typeof rawToken === "string" && rawToken.trim() !== "") {
          // Arquivos existentes com múltiplos tokens separados por vírgula pegam o primeiro token válido
          recoveredToken = rawToken.split(",")[0].trim();
        } else {
          // Arquivo existe no Storage mas NÃO possui token de download configurado
          report.errors.push(
            `CONFLITO: O arquivo "${destinationPath}" já existe no Storage, mas NÃO possui token de download válido em seus metadados.`
          );
        }
      } else {
        report.imagesToUpload.push(destinationPath);
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      report.errors.push(`Falha ao verificar arquivo "${destinationPath}" no Storage: ${msg}`);
    }

    // Se o arquivo for novo, gera o token definitivo único que será gravado tanto no upload quanto nos documentos
    const token = recoveredToken || crypto.randomUUID();
    const encodedPath = encodeURIComponent(destinationPath);
    const publicUrl = `https://firebasestorage.googleapis.com/v0/b/${storageBucket}/o/${encodedPath}?alt=media&token=${token}`;

    const originalAppUrl = `/${localRelPath}`;
    const fileInfo: StorageFileInfo = {
      fileName,
      destinationPath,
      localRelPath,
      exists: fileExists,
      token,
      isExistingToken: Boolean(recoveredToken),
      publicUrl,
    };

    filesInfoMap.set(originalAppUrl, fileInfo);
    report.imageUrlsMap[originalAppUrl] = publicUrl;
  }

  report.storageFilesInfo = filesInfoMap;
  return filesInfoMap;
}

/**
 * 6. Preparação dos documentos Firestore com os tokens e URLs previamente estabelecidos.
 */
function prepareFirestoreDocs(
  imageUrlsMap: Record<string, string>
): {
  categoriesDocs: PreparedCategoryDoc[];
  productsDocs: PreparedProductDoc[];
} {
  const categoriesDocs: PreparedCategoryDoc[] = DEMO_CATEGORIES.map((cat) => ({
    id: cat.id,
    data: {
      id: cat.id,
      name: cat.name,
      slug: cat.slug,
      order: cat.order,
      iconKey: cat.iconKey,
      active: cat.active,
      description: cat.description ?? null,
    },
  }));

  const productsDocs: PreparedProductDoc[] = DEMO_PRODUCTS.map((prod) => {
    const mainImageUrl = imageUrlsMap[prod.mainImageUrl] || prod.mainImageUrl;
    const galleryUrls = (prod.galleryUrls || []).map(
      (url) => imageUrlsMap[url] || url
    );

    return {
      id: prod.id,
      data: {
        id: prod.id,
        name: prod.name,
        slug: prod.slug,
        description: prod.description,
        brand: prod.brand,
        categoryId: prod.categoryId,
        code: prod.code ?? null,
        price: prod.price !== null ? prod.price : null,
        priceOnRequest: prod.priceOnRequest,
        status: prod.status,
        active: prod.active,
        featured: prod.featured,
        mainImageUrl,
        galleryUrls,
        specifications: prod.specifications,
        vehicleApplications: prod.vehicleApplications,
        createdAt: prod.createdAt || new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    };
  });

  return { categoriesDocs, productsDocs };
}

/**
 * 7. Execução segura da migração (com validações de tokens, proteções e retomada).
 */
async function executeMigration(
  firestore: ReturnType<typeof getFirestore>,
  bucket: ReturnType<ReturnType<typeof getStorage>["bucket"]>,
  storageFilesInfo: Map<string, StorageFileInfo>,
  categoriesDocs: PreparedCategoryDoc[],
  productsDocs: PreparedProductDoc[],
  overwriteDocs: boolean,
  overwriteFiles: boolean
) {
  if (!MIGRATION_AUTHORIZED) {
    throw new Error(
      "MIGRAÇÃO BLOQUEADA: A constante MIGRATION_AUTHORIZED está desativada. Nenhuma gravação permitida."
    );
  }

  console.log("\n⚡ INICIANDO MIGRAÇÃO DEFINITIVA...");

  // Passo A: Upload seguro para o Storage
  const publicDir = path.resolve(projectDir, "public");

  for (const [, info] of storageFilesInfo.entries()) {
    if (info.exists && !overwriteFiles) {
      console.log(`[Storage] Preservando arquivo existente (sem sobrescrita): ${info.destinationPath}`);
      continue;
    }

    const localFilePath = path.resolve(publicDir, info.localRelPath);
    console.log(`[Storage] Enviando: ${info.destinationPath} com token correspondente...`);

    // Utiliza estritamente o token previamente determinado para associar ao arquivo
    await bucket.upload(localFilePath, {
      destination: info.destinationPath,
      metadata: {
        contentType: "image/svg+xml",
        cacheControl: "public, max-age=31536000, immutable",
        metadata: {
          firebaseStorageDownloadTokens: info.token,
        },
      },
    });
  }

  // Passo B: Gravação dos Documentos no Firestore em Batch
  const batch = firestore.batch();

  for (const cat of categoriesDocs) {
    const docRef = firestore.collection("categories").doc(cat.id);
    if (overwriteDocs) {
      batch.set(docRef, cat.data);
    } else {
      batch.create(docRef, cat.data);
    }
  }

  for (const prod of productsDocs) {
    const docRef = firestore.collection("products").doc(prod.id);
    if (overwriteDocs) {
      batch.set(docRef, prod.data);
    } else {
      batch.create(docRef, prod.data);
    }
  }

  console.log("[Firestore] Gravando documentos no Firestore em lote...");
  await batch.commit();
  console.log("✅ MIGRAÇÃO DEFINITIVA CONCLUÍDA COM SUCESSO!");
}

/**
 * 8. Apresentação do Relatório Detalhado.
 */
function printReport(
  report: MigrationReport,
  isDryRun: boolean,
  isExecute: boolean,
  overwriteDocs: boolean,
  overwriteFiles: boolean
): void {
  console.log("\n=======================================================");
  console.log("         RELATÓRIO DE PREPARAÇÃO DA MIGRAÇÃO");
  console.log("=======================================================");
  console.log(
    `Modo selecionado: ${
      isDryRun
        ? "🔍 DRY-RUN (Somente Leitura e Planejamento)"
        : isExecute
        ? "⚡ EXECUTE (Operação Real de Escrita)"
        : "⚠️  DESCONHECIDO (Segurança acionada)"
    }`
  );
  console.log(`Sobrescrita de Documentos (--overwrite-docs): ${overwriteDocs ? "⚠️ HABILITADA" : "🔒 BLOQUEADA"}`);
  console.log(`Sobrescrita de Arquivos   (--overwrite-files): ${overwriteFiles ? "⚠️ HABILITADA" : "🔒 BLOQUEADA"}`);
  console.log("-------------------------------------------------------");
  console.log(`Conectividade Firestore: ${report.firestoreConnected ? "✅ Conectado" : "❌ Falha"}`);
  console.log(`Conectividade Storage:   ${report.storageConnected ? "✅ Conectado" : "❌ Falha"}`);
  console.log("-------------------------------------------------------");
  console.log("📊 STATUS DAS COLEÇÕES NO FIRESTORE:");
  console.log(`  • Categorias a inserir:  ${report.categoriesToInsert.length}`);
  console.log(
    `  • Categorias existentes: ${report.categoriesExisting.length} ${
      report.categoriesExisting.length > 0 ? `(${report.categoriesExisting.join(", ")})` : ""
    }`
  );
  console.log(`  • Produtos a inserir:    ${report.productsToInsert.length}`);
  console.log(
    `  • Produtos existentes:   ${report.productsExisting.length} ${
      report.productsExisting.length > 0 ? `(${report.productsExisting.join(", ")})` : ""
    }`
  );
  console.log("-------------------------------------------------------");
  console.log("🖼️  STATUS DOS ARQUIVOS NO STORAGE:");
  console.log(`  • Total de imagens locais únicas: ${report.imagesTotal}`);
  console.log(`  • Imagens a enviar:               ${report.imagesToUpload.length}`);
  console.log(
    `  • Imagens já existentes:          ${report.imagesExisting.length} ${
      report.imagesExisting.length > 0 ? `(${report.imagesExisting.join(", ")})` : ""
    }`
  );
  console.log("-------------------------------------------------------");

  console.log("🔗 MAPEAMENTO PREVISTO DE IMAGENS E TOKENS:");
  for (const [localUrl, info] of report.storageFilesInfo.entries()) {
    const statusToken = info.isExistingToken
      ? "Token existente recuperado"
      : isDryRun
      ? "Token planejado (dry-run)"
      : "Token gerado para envio";
    console.log(`  ${localUrl}`);
    console.log(`    Status: ${info.exists ? "Já existe no Storage" : "Novo arquivo a enviar"}`);
    console.log(`    Token:  ${statusToken} (${info.token.slice(0, 8)}...)`);
    console.log(`    URL:    ${info.publicUrl.split("&token=")[0]}&token=[PREVISTO]`);
  }
  console.log("-------------------------------------------------------");

  if (report.warnings.length > 0) {
    console.log("⚠️  AVISOS:");
    for (const w of report.warnings) {
      console.log(`  - ${w}`);
    }
    console.log("-------------------------------------------------------");
  }

  if (report.errors.length > 0) {
    console.log("❌ ERROS IMPEDITIVOS:");
    for (const e of report.errors) {
      console.log(`  - ${e}`);
    }
    console.log("-------------------------------------------------------");
    console.log("🚨 A migração NÃO pode prosseguir até que os erros sejam resolvidos.");
  } else {
    console.log("✅ VALIDAÇÃO E PLANEJAMENTO APROVADOS!");
    console.log("🔒 Nenhuma gravação ou upload foi executado nesta etapa.");
  }
  console.log("=======================================================\n");
}

/**
 * Função principal.
 */
async function main() {
  const args = process.argv.slice(2);

  const allowedFlags = ["--dry-run", "--execute", "--overwrite-docs", "--overwrite-files"];
  const unknownArgs = args.filter((a) => !allowedFlags.includes(a));

  if (unknownArgs.length > 0) {
    console.error(`\n❌ Argumento(s) não reconhecido(s): ${unknownArgs.join(", ")}`);
    console.error("Opções válidas:");
    console.error("  --dry-run           (Execução segura somente leitura)");
    console.error("  --execute           (Execução definitiva - atualmente bloqueada por segurança)");
    console.error("  --overwrite-docs    (Permite sobrescrever documentos existentes no Firestore)");
    console.error("  --overwrite-files   (Permite sobrescrever arquivos existentes no Storage)\n");
    process.exit(1);
  }

  const isDryRun = args.includes("--dry-run");
  const isExecute = args.includes("--execute");
  const overwriteDocs = args.includes("--overwrite-docs");
  const overwriteFiles = args.includes("--overwrite-files");

  // Trava de segurança: impede execução de escrita se não autorizado
  if (isExecute && !MIGRATION_AUTHORIZED) {
    console.error("\n❌ BLOQUEIO DE SEGURANÇA: O argumento --execute NÃO está autorizado nesta etapa.");
    console.error("A migração definitiva requer autorização explícita e MIGRATION_AUTHORIZED = true.");
    console.error("Para planejar e auditar em segurança, execute:");
    console.error("  npx tsx scripts/seed-firebase.ts --dry-run\n");
    process.exit(1);
  }

  if (!isDryRun && !isExecute) {
    console.error("\n⚠️  Modo de execução ausente.");
    console.error("Para executar a auditoria em modo somente-leitura:");
    console.error("  npx tsx scripts/seed-firebase.ts --dry-run");
    console.error("Para executar a migração definitiva:");
    console.error("  npx tsx scripts/seed-firebase.ts --execute\n");
    process.exit(1);
  }

  const report: MigrationReport = {
    categoriesTotal: 0,
    categoriesToInsert: [],
    categoriesExisting: [],
    productsTotal: 0,
    productsToInsert: [],
    productsExisting: [],
    imagesTotal: 0,
    imagesToUpload: [],
    imagesExisting: [],
    storageFilesInfo: new Map(),
    imageUrlsMap: {},
    firestoreConnected: false,
    storageConnected: false,
    errors: [],
    warnings: [],
  };

  try {
    console.log("1. Inicializando Firebase Admin SDK...");
    const { firestore, bucket, storageBucket } = initFirebaseAdmin();

    console.log("2. Validando dados demonstrativos em memória...");
    const { referencedImages } = validateData(report);

    console.log("3. Validando arquivos de imagem locais...");
    const localImages = validateLocalImages(referencedImages, report);

    console.log("4. Consultando documentos existentes no Firestore (somente-leitura)...");
    const { existingCategories, existingProducts } = await checkExistingFirestoreDocs(
      firestore,
      report
    );

    console.log("5. Consultando arquivos existentes no Firebase Storage (somente-leitura)...");
    const storageFilesInfo = await checkExistingStorageFiles(bucket, localImages, storageBucket, report);

    console.log("6. Preparando documentos e mapeamento de URLs para Firestore...");
    const { categoriesDocs, productsDocs } = prepareFirestoreDocs(report.imageUrlsMap);

    // Validação estrita de conflitos com Firestore
    if (!overwriteDocs) {
      if (existingCategories.size > 0 || existingProducts.size > 0) {
        report.errors.push(
          `CONFLITO FIRESTORE: Já existem documentos nas coleções (${existingCategories.size} categorias, ${existingProducts.size} produtos). A migração foi interrompida para evitar sobrescrita acidental. Para autorizar, use --overwrite-docs.`
        );
      }
    }

    // Validação estrita de conflitos com Storage
    if (!overwriteFiles) {
      if (report.imagesExisting.length > 0) {
        report.warnings.push(
          `AVISO STORAGE: Já existem ${report.imagesExisting.length} imagens no Storage. Elas serão preservadas e reutilizadas. Para forçar o reenvio e sobrescrita dos arquivos, use --overwrite-files.`
        );
      }
    }

    printReport(report, isDryRun, isExecute, overwriteDocs, overwriteFiles);

    if (report.errors.length > 0) {
      process.exit(1);
    }

    // Chamada de escrita (bloqueada por MIGRATION_AUTHORIZED e trava de isExecute)
    if (isExecute && !isDryRun) {
      await executeMigration(
        firestore,
        bucket,
        storageFilesInfo,
        categoriesDocs,
        productsDocs,
        overwriteDocs,
        overwriteFiles
      );
    }
  } catch (error: unknown) {
    const errorMsg = error instanceof Error ? error.message : String(error);
    console.error("\n❌ Erro crítico durante a execução do seed:");
    console.error(errorMsg);
    process.exit(1);
  }
}

main();
