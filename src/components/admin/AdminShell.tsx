"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LogOut, Package, ExternalLink, ShieldCheck, Loader2 } from "lucide-react";
import { useAuth } from "./AuthProvider";
import { Button } from "@/components/ui/Button";

export function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, isAdmin, loading, logout } = useAuth();

  const isLoginPage = pathname === "/admin/login";

  useEffect(() => {
    if (isLoginPage || loading) {
      return;
    }

    if (!user || !isAdmin) {
      router.replace("/admin/login");
    }
  }, [isLoginPage, loading, user, isAdmin, router]);

  // A página de login permanece acessível sem autenticação
  if (isLoginPage) {
    return <>{children}</>;
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F5F5F5] flex items-center justify-center p-4">
        <div className="flex flex-col items-center gap-3 text-neutral-600">
          <Loader2 className="w-7 h-7 animate-spin text-[#D62828]" />
          <p className="text-sm font-medium">Verificando credenciais administrativas...</p>
        </div>
      </div>
    );
  }

  if (!user || !isAdmin) {
    return null;
  }

  const handleLogout = async () => {
    await logout();
    router.replace("/admin/login");
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F5F5F5]">
      <header className="sticky top-0 z-40 bg-[#151515] text-white border-b border-white/10">
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          <div className="flex items-center gap-6">
            <Link href="/admin" className="flex items-center gap-2.5 select-none">
              <span className="w-1 h-7 bg-[#D62828] rounded-full" />
              <div className="flex flex-col leading-none">
                <span className="text-[9px] font-bold tracking-[0.22em] text-neutral-300 uppercase">
                  Auto Peças Diniz Vieira
                </span>
                <span className="text-base font-extrabold text-white tracking-tight mt-0.5">
                  Painel Administrativo
                </span>
              </div>
            </Link>

            <nav className="hidden sm:flex items-center gap-2">
              <Link
                href="/admin"
                className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-semibold transition-colors ${
                  pathname === "/admin"
                    ? "bg-[#D62828] text-white"
                    : "text-neutral-300 hover:text-white hover:bg-white/10"
                }`}
              >
                <Package className="w-4 h-4" />
                <span>Produtos</span>
              </Link>
            </nav>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/catalog"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:inline-flex items-center gap-1.5 text-xs font-medium text-neutral-300 hover:text-white transition-colors px-2.5 py-1.5 rounded-lg hover:bg-white/10"
            >
              <span>Ver catálogo público</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>

            <div className="hidden lg:flex items-center gap-2 text-xs text-neutral-300 bg-white/5 border border-white/10 px-3 py-1.5 rounded-lg">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span className="max-w-[200px] truncate">{user.email}</span>
            </div>

            <Button
              type="button"
              variant="outline"
              onClick={handleLogout}
              className="h-9 px-3 text-xs font-semibold bg-transparent border-white/20 text-white hover:bg-white/10 hover:text-white gap-1.5 cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sair</span>
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-[1360px] w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
    </div>
  );
}
