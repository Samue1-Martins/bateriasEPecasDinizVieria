import React from "react";
import { Category } from "@/types";

export interface CategoryCardProps {
  category: Category;
  count?: number;
}

export function CategoryCard({ category, count }: CategoryCardProps) {
  return (
    <div className="group bg-white p-5 rounded-xl border border-neutral-200 shadow-sm hover:border-[#D62828] hover:shadow-md transition-all flex flex-col justify-between">
      <div>
        <div className="w-10 h-10 rounded-lg bg-[#F5F5F5] group-hover:bg-[#D62828] group-hover:text-white transition-colors flex items-center justify-center text-[#D62828] font-black text-lg mb-3">
          {category.name.charAt(0)}
        </div>
        <h4 className="font-bold text-[#151515] text-base group-hover:text-[#D62828] transition-colors mb-1">
          {category.name}
        </h4>
        {category.description && (
          <p className="text-xs text-gray-500 leading-relaxed mb-3">
            {category.description}
          </p>
        )}
      </div>

      <div className="pt-2 border-t border-gray-100 flex items-center justify-between text-xs text-gray-400">
        <span>{count !== undefined ? `${count} itens cadastrados` : "Catálogo ativo"}</span>
        <span className="text-[#D62828] font-semibold group-hover:translate-x-1 transition-transform inline-flex items-center">
          Ver itens →
        </span>
      </div>
    </div>
  );
}
