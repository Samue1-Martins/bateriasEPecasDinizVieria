import React, { Suspense } from "react";
import type { Metadata } from "next";
import { AuthProvider } from "@/components/admin/AuthProvider";
import { AdminShell } from "@/components/admin/AdminShell";

export const metadata: Metadata = {
  title: "Painel Administrativo | Auto Peças Diniz Vieira",
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthProvider>
      <Suspense
        fallback={
          <div className="min-h-screen bg-[#F5F5F5] flex items-center justify-center p-4 text-sm text-neutral-500">
            Carregando painel administrativo...
          </div>
        }
      >
        <AdminShell>{children}</AdminShell>
      </Suspense>
    </AuthProvider>
  );
}
