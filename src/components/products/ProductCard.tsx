import React from "react";
import Image from "next/image";
import Link from "next/link";
import { MessageCircle } from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import { buildWhatsAppLink } from "@/lib/constants";

export interface ProductCardProps {
  id: string; // <-- Propriedade id adicionada
  category: string;
  brand: string;
  name: string;
  description: string;
  specifications: string;
  price: number;
  statusText?: string;
  imageUrl?: string;
}

export function ProductCard({
  id, 
  category,
  brand,
  name,
  description,
  specifications,
  price,
  statusText = "Disponível • demonstração",
  imageUrl,
}: ProductCardProps) {
  const whatsappUrl = buildWhatsAppLink(
    `Olá! Gostaria de consultar sobre o produto: ${name} (${brand}).`
  );

  return (
    <div className="bg-white rounded-[12px] border border-[#E3E3E3] p-4 flex flex-col justify-between shadow-xs hover:shadow-md transition-shadow">
      {/* Imagem do Produto */}
      <div className="relative w-full h-[180px] sm:h-[190px] rounded-lg overflow-hidden bg-[#F8F9FA] flex items-center justify-center mb-4">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={name}
            fill
            className="object-contain p-2"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="text-neutral-300 font-semibold text-xs tracking-wider uppercase">
            Sem Imagem
          </div>
        )}
      </div>

      {/* Conteúdo Informativo */}
      <div className="flex-1 flex flex-col justify-between">
        <div>
          {/* Categoria / Marca */}
          <span className="text-[11px] text-neutral-400 block mb-1">
            {category} • {brand}
          </span>

          {/* Nome do Produto */}
          <h3 className="text-base font-bold text-[#151515] leading-snug mb-1">
            {name}
          </h3>

          {/* Descrição resumida */}
          <p className="text-xs text-neutral-500 leading-relaxed mb-2">
            {description}
          </p>

          {/* Especificações técnicas */}
          <p className="text-[11px] text-neutral-400 leading-normal mb-4">
            {specifications}
          </p>
        </div>

        {/* Preço e Status */}
        <div className="pt-2">
          <div className="text-xl sm:text-2xl font-black text-[#151515] tracking-tight">
            {formatCurrency(price)}
          </div>

          {/* Status com bullet amarelo */}
          <div className="flex items-center gap-1.5 mt-1.5 mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-[#F4C542]" />
            <span className="text-[11px] text-neutral-500 font-normal">
              {statusText}
            </span>
          </div>

          {/* Botões de Ação */}
          <div className="flex flex-col gap-2">
            {/* Botão Ver Detalhes com roteamento */}
            <Link
              href={`/catalog/${id}`}
              className="flex w-full items-center justify-center rounded-lg border border-neutral-200 bg-white py-2.5 px-4 text-xs sm:text-sm font-semibold text-[#151515] shadow-xs hover:bg-neutral-50 active:translate-y-px transition-all"
            >
              Ver detalhes
            </Link>

            {/* Botão Consultar pelo WhatsApp */}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#D62828] py-2.5 px-4 text-xs sm:text-sm font-semibold text-white shadow-xs hover:bg-[#b91c1c] active:translate-y-px transition-all"
            >
              <MessageCircle className="w-4 h-4 fill-white/20" />
              <span>Consultar pelo WhatsApp</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;