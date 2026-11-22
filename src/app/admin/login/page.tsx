"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Lock, Mail, AlertCircle, Loader2, ArrowLeft } from "lucide-react";
import { FirebaseError } from "firebase/app";
import { useAuth } from "@/components/admin/AuthProvider";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/Button";

function mapAuthError(error: unknown): string {
  if (error instanceof FirebaseError) {
    switch (error.code) {
      case "auth/invalid-credential":
      case "auth/wrong-password":
      case "auth/user-not-found":
        return "E-mail ou senha inválidos.";
      case "auth/invalid-email":
        return "Informe um endereço de e-mail válido.";
      case "auth/too-many-requests":
        return "Muitas tentativas de acesso. Aguarde alguns instantes e tente novamente.";
      case "auth/user-disabled":
        return "Esta conta foi desativada.";
      default:
        return "Não foi possível realizar o login. Tente novamente.";
    }
  }

  if (error instanceof Error) {
    return error.message;
  }

  return "Erro inesperado ao autenticar.";
}

export default function AdminLoginPage() {
  const router = useRouter();
  const { user, isAdmin, loading, login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    if (!loading && user && isAdmin) {
      router.replace("/admin");
    }
  }, [loading, user, isAdmin, router]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage(null);

    const trimmedEmail = email.trim();
    if (!trimmedEmail || !password) {
      setErrorMessage("Preencha o e-mail e a senha.");
      return;
    }

    setSubmitting(true);
    try {
      await login(trimmedEmail, password);
      router.replace("/admin");
    } catch (error) {
      setErrorMessage(mapAuthError(error));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F5F5] flex flex-col items-center justify-center px-4 py-10">
      <div className="w-full max-w-md flex flex-col gap-6">
        {/* Marca */}
        <div className="flex flex-col items-center text-center gap-2">
          <div className="flex items-center gap-2.5 select-none">
            <span className="w-1.5 h-8 bg-[#D62828] rounded-full" />
            <div className="flex flex-col items-start leading-none">
              <span className="text-[10px] font-bold tracking-[0.25em] text-[#151515] uppercase">
                Auto Peças
              </span>
              <span className="text-2xl font-extrabold text-[#151515] tracking-tight">
                Diniz Vieira
              </span>
            </div>
          </div>
          <p className="text-sm text-neutral-600 mt-1">
            Acesso restrito ao painel administrativo
          </p>
        </div>

        <Card className="bg-white border border-neutral-200 shadow-sm rounded-2xl">
          <CardContent className="p-6 sm:p-8">
            <form onSubmit={handleSubmit} className="flex flex-col gap-5" noValidate>
              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="admin-email"
                  className="text-xs font-bold uppercase tracking-wider text-neutral-700"
                >
                  E-mail
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <Input
                    id="admin-email"
                    type="email"
                    autoComplete="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="admin@dinizvieira.com.br"
                    disabled={submitting}
                    className="pl-10 h-11 bg-white border-neutral-300 focus-visible:ring-1 focus-visible:ring-[#D62828]"
                    required
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="admin-password"
                  className="text-xs font-bold uppercase tracking-wider text-neutral-700"
                >
                  Senha
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <Input
                    id="admin-password"
                    type="password"
                    autoComplete="current-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    disabled={submitting}
                    className="pl-10 h-11 bg-white border-neutral-300 focus-visible:ring-1 focus-visible:ring-[#D62828]"
                    required
                  />
                </div>
              </div>

              {errorMessage && (
                <div
                  role="alert"
                  className="flex items-start gap-2.5 p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-800 text-xs sm:text-sm"
                >
                  <AlertCircle className="w-4 h-4 text-[#D62828] shrink-0 mt-0.5" />
                  <span>{errorMessage}</span>
                </div>
              )}

              <Button
                type="submit"
                disabled={submitting || loading}
                className="w-full h-11 bg-[#D62828] hover:bg-[#b91c1c] text-white font-bold text-sm rounded-lg cursor-pointer gap-2"
              >
                {submitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Entrando...</span>
                  </>
                ) : (
                  <span>Entrar no painel</span>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        <div className="text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs font-medium text-neutral-500 hover:text-[#151515] transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Voltar para o site</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
