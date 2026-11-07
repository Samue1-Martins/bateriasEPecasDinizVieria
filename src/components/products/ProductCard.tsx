import React from "react";
import { Product } from "@/types";
import { formatCurrency } from "@/lib/utils";
import { buildWhatsAppLink } from "@/lib/constants";
import { Badge, Button } from "@/components/ui";

export interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const message = `Olá! Gostaria de consultar a disponibilidade do item: "${product.name}" (Cód: ${product.sku || product.id}).`;
  const whatsappUrl = buildWhatsAppLink(message);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-neutral-200 overflow-hidden flex flex-col hover:shadow-md transition-shadow">
      {/* Visual Header / Badge */}
      <div className="bg-[#151515] p-4 flex items-center justify-between border-b-2 border-[#D62828]">
        <span className="text-xs font-bold text-gray-300 tracking-wider">
          {product.brand || "AUTO PEÇAS"}
        </span>
        {product.inStock ? (
          <Badge variant="secondary">Disponível</Badge>
        ) : (
          <Badge variant="gray">Sob encomenda</Badge>
        )}
      </div>

      {/* Body info */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <span className="text-xs text-[#D62828] font-semibold uppercase tracking-wider block mb-1">
            {product.categoryName || "Geral"}
          </span>
          <h4 className="text-base font-bold text-[#151515] mb-2 line-clamp-2">
            {product.name}
          </h4>
          <p className="text-xs text-gray-600 mb-4 line-clamp-2 leading-relaxed">
            {product.description}
          </p>

          {/* Specifications pill list */}
          {product.specifications && product.specifications.length > 0 && (
            <div className="mb-4 bg-[#F5F5F5] p-2.5 rounded-lg space-y-1">
              {product.specifications.map((spec) => (
                <div
                  key={spec.name}
                  className="flex justify-between text-xs text-gray-700"
                >
                  <span className="font-medium text-gray-500">{spec.name}:</span>
                  <span className="font-semibold text-[#151515]">{spec.value}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Pricing & CTA */}
        <div className="pt-3 border-t border-gray-100 flex items-center justify-between gap-3">
          <div>
            <span className="text-[10px] uppercase text-gray-400 block font-medium">
              Valor
            </span>
            <span className="text-lg font-black text-[#151515]">
              {formatCurrency(product.price)}
            </span>
          </div>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-shrink-0"
          >
            <Button variant="whatsapp" size="sm" className="gap-1.5 text-xs">
              <span>Cotar</span>
            </Button>
          </a>
        </div>
      </div>
    </div>
  );
}
