import React, { Suspense } from "react";
import Link from "next/link";
import { Header, Footer } from "@/components/layout";
import { Button } from "@/components/ui/Button";
import { Info, MessageCircle } from "lucide-react";
import { getCategories, getProducts } from "@/services";
import { CatalogContent } from "./CatalogContent";
import { buildWhatsAppLink, WHATSAPP_MESSAGES } from "@/lib/constants";

export const metadata = {
  title: "Catálogo de Produtos | Auto Peças Diniz Vieira",
  description:
    "Encontre produtos e soluções para cuidar do seu veículo. Baterias, óleos, filtros, velas e muito mais.",
};

export default async function CatalogPage() {
  const [products, categories] = await Promise.all([
    getProducts(),
    getCategories(),
  ]);

  const whatsappGeneralUrl = buildWhatsAppLink(WHATSAPP_MESSAGES.contact);

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Header />

      <main className="flex-grow">
        {/* Breadcrumb */}
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 py-5 text-xs sm:text-sm text-neutral-500">
          <Link href="/" className="hover:text-[#D62828] transition-colors">
            Inicial
          </Link>
          <span className="mx-2">/</span>
          <span className="font-medium text-neutral-900">Catálogo</span>
        </div>

        {/* Cabeçalho da Página */}
        <section className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 pb-4 pt-1 flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#D62828]" />
            <span className="text-[11px] sm:text-xs font-bold uppercase tracking-[0.2em] text-[#D62828]">
              PEÇAS PARA SEGUIR EM FRENTE
            </span>
          </div>

          <div className="flex flex-col gap-2">
            <h1 className="text-3xl sm:text-5xl lg:text-[3.25rem] font-extrabold text-[#151515] tracking-tight">
              Nosso catálogo
            </h1>
            <p className="text-base sm:text-lg text-neutral-600 leading-relaxed">
              Encontre produtos e soluções para cuidar do seu veículo.
            </p>
          </div>
        </section>

        {/* Alerta de Catálogo Demonstrativo */}
        <section className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 py-2">
          <div className="bg-[#F8F9FA] border border-neutral-200/80 rounded-xl p-3 sm:p-4 flex gap-3 items-start sm:items-center">
            <Info className="w-4 h-4 text-neutral-500 shrink-0 mt-0.5 sm:mt-0" />
            <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
              Catálogo demonstrativo. Produtos, preços e disponibilidade são ilustrativos. Consulte nossa equipe pelo WhatsApp para confirmar as informações reais.
            </p>
          </div>
        </section>

        {/* Área Funcional de Busca, Filtros e Grid */}
        <section className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
          <Suspense fallback={<div className="h-40 animate-pulse bg-neutral-100 rounded-2xl" />}>
            <CatalogContent
              initialProducts={products}
              categories={categories}
            />
          </Suspense>
        </section>

        {/* CTA Inferior de Contato */}
        <section className="bg-[#F8F9FA] mt-12 py-16 lg:py-24 border-t border-neutral-100">
          <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row lg:items-center justify-between gap-6 lg:gap-8">
            <div className="flex flex-col gap-2 max-w-2xl">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#151515] tracking-tight">
                A peça certa começa com uma boa conversa.
              </h2>
              <p className="text-base sm:text-lg text-neutral-600 leading-relaxed">
                Envie o modelo, o ano e a peça que procura. Nossa equipe avalia e confirma a aplicação e a disponibilidade.
              </p>
            </div>

            <a
              href={whatsappGeneralUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full lg:w-auto"
            >
              <Button
                size="lg"
                className="w-full lg:w-auto bg-[#D62828] hover:bg-[#b91c1c] text-white h-12 px-7 rounded-lg text-sm font-bold gap-2 shadow-xs active:translate-y-px transition-all"
              >
                <MessageCircle className="w-4 h-4" />
                Fale pelo WhatsApp
              </Button>
            </a>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
