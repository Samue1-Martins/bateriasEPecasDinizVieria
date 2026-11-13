import React from "react";
import {
  BatteryCharging,
  Zap,
  Droplets,
  SlidersHorizontal,
  SprayCan,
  FlaskConical,
  Wrench,
} from "lucide-react";

export interface CategoryItem {
  id: string;
  name: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
}

export const CATEGORIES_DATA: CategoryItem[] = [
  {
    id: "baterias",
    name: "Baterias",
    href: "#catalogo",
    icon: BatteryCharging,
  },
  {
    id: "velas",
    name: "Velas de ignição",
    href: "#catalogo",
    icon: Zap,
  },
  {
    id: "oleos",
    name: "Óleos de motor",
    href: "#catalogo",
    icon: Droplets,
  },
  {
    id: "filtros",
    name: "Filtros",
    href: "#catalogo",
    icon: SlidersHorizontal,
  },
  {
    id: "lubrificantes",
    name: "Lubrificantes",
    href: "#catalogo",
    icon: SprayCan,
  },
  {
    id: "aditivos",
    name: "Aditivos",
    href: "#catalogo",
    icon: FlaskConical,
  },
  {
    id: "acessorios",
    name: "Acessórios automotivos",
    href: "#catalogo",
    icon: Wrench,
  },
];

export function CategoryCard({ category }: { category: CategoryItem }) {
  const Icon = category.icon;

  return (
    <a
      href={category.href}
      className="group flex flex-col justify-between min-h-[140px] p-5 rounded-2xl bg-[#F8F9FA] hover:bg-neutral-100/90 border border-transparent hover:border-neutral-200 shadow-xs hover:shadow-sm transition-all duration-200"
    >
      <div className="text-[#D62828] transition-transform duration-200 group-hover:scale-105">
        <Icon className="w-6 h-6 stroke-[1.75]" />
      </div>
      <span className="text-sm font-semibold text-[#151515] leading-snug group-hover:text-[#D62828] transition-colors">
        {category.name}
      </span>
    </a>
  );
}

export function CategoriesSection() {
  return (
    <section id="categorias" className="py-12 sm:py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header da Seção */}
        <div className="space-y-3 mb-8 sm:mb-10">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#D62828]" />
            <span className="text-[11px] sm:text-xs font-bold uppercase tracking-[0.2em] text-[#D62828]">
              PARA CADA NECESSIDADE
            </span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-extrabold text-[#151515] tracking-tight">
            O cuidado começa pela peça certa.
          </h2>

          <p className="text-sm sm:text-base text-neutral-500">
            Explore nossas categorias e encontre o que você precisa.
          </p>
        </div>

        {/* Grid de Categorias: 2 cols no mobile, 4 no tablet, 7 no desktop */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3 sm:gap-4">
          {CATEGORIES_DATA.map((cat) => (
            <CategoryCard key={cat.id} category={cat} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default CategoriesSection;
