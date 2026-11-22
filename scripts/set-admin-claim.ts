import fs from "node:fs";
import path from "node:path";
import { loadEnvConfig } from "@next/env";
import { getApps, initializeApp, cert } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";

const projectDir = process.cwd();
loadEnvConfig(projectDir);

const CREDENTIAL_FILE_NAME =
  "diniz-auto-pecas-firebase-adminsdk-fbsvc-160544393d.json";
const CREDENTIAL_PATH = path.resolve(projectDir, CREDENTIAL_FILE_NAME);

function parseArgs() {
  const args = process.argv.slice(2);
  let uid: string | undefined;
  let email: string | undefined;

  for (const arg of args) {
    if (arg.startsWith("--uid=")) {
      uid = arg.slice("--uid=".length).trim();
    } else if (arg.startsWith("--email=")) {
      email = arg.slice("--email=".length).trim();
    }
  }

  return { uid, email };
}

async function main() {
  const { uid, email } = parseArgs();

  if (!uid && !email) {
    console.error("Uso:");
    console.error("  npx tsx scripts/set-admin-claim.ts --uid=<UID_DO_USUARIO>");
    console.error("  npx tsx scripts/set-admin-claim.ts --email=<EMAIL_DO_USUARIO>");
    process.exit(1);
  }

  if (!fs.existsSync(CREDENTIAL_PATH)) {
    console.error(
      `Arquivo de credencial do Firebase Admin não encontrado em: ${CREDENTIAL_PATH}`
    );
    process.exit(1);
  }

  const serviceAccount = JSON.parse(fs.readFileSync(CREDENTIAL_PATH, "utf-8"));
  const projectId =
    process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || serviceAccount.project_id;

  const app = getApps().length
    ? getApps()[0]
    : initializeApp({
        credential: cert(serviceAccount),
        projectId,
      });

  const adminAuth = getAuth(app);

  const userRecord = uid
    ? await adminAuth.getUser(uid)
    : await adminAuth.getUserByEmail(email!);

  const existingClaims = userRecord.customClaims || {};
  await adminAuth.setCustomUserClaims(userRecord.uid, {
    ...existingClaims,
    admin: true,
  });

  console.log(
    `Custom Claim { admin: true } atribuída com sucesso ao usuário UID=${userRecord.uid} (${
      userRecord.email || "sem e-mail"
    }).`
  );
  console.log(
    "Importante: o usuário precisa fazer login novamente (ou atualizar o ID token) para que a permissão entre em vigor."
  );
}

main().catch((error: unknown) => {
  const message = error instanceof Error ? error.message : String(error);
  console.error(`Erro ao atribuir Custom Claim administrativa: ${message}`);
  process.exit(1);
});
