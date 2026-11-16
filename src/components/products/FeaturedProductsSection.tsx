import React from "react";
import Link from "next/link";
import { Info, ArrowRight } from "lucide-react";
import { ProductCard, ProductCardProps } from "./ProductCard";

export const FEATURED_PRODUCTS_DATA: ProductCardProps[] = [
  {
    id: '1',
    category: "Baterias",
    brand: "Voltiva",
    name: "Bateria Energia 60 Ah",
    description: "Energia para a partida e os sistemas elétricos.",
    specifications: "12 V • 60 Ah • Polo positivo à direita",
    price: 389.9,
    statusText: "Disponível • demonstração",
    imageUrl: "/bateria-60ah.jpg",
  },
  {
    id: '2',
    category: "Velas de ignição",
    brand: "Ignis",
    name: "Vela de ignição Essencial",
    description: "Componente de reposição para o sistema de ignição.",
    specifications: "Unidade • Eletrodo de níquel",
    price: 24.9,
    statusText: "Disponível • demonstração",
    imageUrl: "/bateria-60ah.jpg",
  },
  {
    id: '3',
    category: "Óleos de motor",
    brand: "Motiva",
    name: "Óleo de motor 5W-30",
    description: "Lubrificação para o cuidado diário do motor.",
    specifications: "1 litro • Sintético • SAE 5W-30",
    price: 42.9,
    statusText: "Disponível • demonstração",
    imageUrl: "/bateria-60ah.jpg",
  },
];

export function FeaturedProductsSection() {
  return (
    <section id="catalogo" className="py-14 sm:py-20 bg-[#F8F9FA]/60 border-t border-neutral-100">
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header da Seção */}
        <div className="space-y-3 mb-8 sm:mb-10">
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
            Uma seleção para conhecer as possibilidades do nosso catálogo.
          </p>
        </div>

        {/* Banner Informativo / Aviso Legal de Demonstração */}
        <div className="flex items-start gap-3 p-4 mb-8 rounded-xl bg-neutral-100/90 border border-neutral-200/80 text-xs text-neutral-600 leading-relaxed">
          <Info className="w-4 h-4 text-neutral-500 shrink-0 mt-0.5" />
          <p>
            <strong>Catálogo demonstrativo.</strong> Produtos, marcas, preços e
            disponibilidade fictícios, apenas para apresentação. Confirme as
            informações com nossa equipe.
          </p>
        </div>

        {/* Grid com os Cards de Produtos */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURED_PRODUCTS_DATA.map((product) => (
            <ProductCard key={product.name} {...product} />
          ))}
        </div>

        {/* Link / Ação: Ver todo o catálogo */}
        <div className="mt-8 pt-4">
          <Link
            href="#catalogo"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#151515] hover:text-[#D62828] transition-colors"
          >
            <span>Ver todo o catálogo</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

export default FeaturedProductsSection;
