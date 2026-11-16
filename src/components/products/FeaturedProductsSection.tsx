import React from "react";
import Link from "next/link";
import { ArrowRight, Info } from "lucide-react";
import { ProductCard } from "./ProductCard";
import { getFeaturedProducts } from "@/services";

export async function FeaturedProductsSection() {
  const featuredProducts = await getFeaturedProducts();

  return (
    <section id="destaques" className="py-14 sm:py-20 bg-[#F8F9FA]/60 border-t border-neutral-100">
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header da Seção */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 sm:mb-10">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#D62828]" />
              <span className="text-[11px] sm:text-xs font-bold uppercase tracking-[0.2em] text-[#D62828]">
                PEÇAS E SOLUÇÕES
              </span>
            </div>

            <h2 className="text-2xl sm:text-4xl font-extrabold text-[#151515] tracking-tight">
              Em destaque por aqui
            </h2>

            <p className="text-sm sm:text-base text-neutral-500">
              Uma seleção especial para conhecer as possibilidades do nosso catálogo.
            </p>
          </div>

          <Link
            href="/catalog"
            className="inline-flex items-center gap-2 text-sm font-bold text-[#D62828] hover:text-[#b91c1c] transition-colors self-start sm:self-end"
          >
            <span>Ver todo o catálogo</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Aviso de Catálogo Demonstrativo */}
        <div className="bg-white border border-neutral-200/80 rounded-xl p-3 sm:p-4 mb-8 flex items-start gap-3 shadow-2xs">
          <Info className="w-4 h-4 text-neutral-500 shrink-0 mt-0.5" />
          <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
            Catálogo demonstrativo. Produtos, marcas, preços e disponibilidade ilustrativos para apresentação. Consulte nossa equipe pelo WhatsApp para confirmar as informações.
          </p>
        </div>

        {/* Grid de Produtos */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default FeaturedProductsSection;
