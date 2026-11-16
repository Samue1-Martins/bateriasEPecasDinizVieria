import React from "react";
import Image from "next/image";
import Link from "next/link";
import { MessageCircle, ArrowRight } from "lucide-react";
import { Product } from "@/types";
import { buildWhatsAppLink, WHATSAPP_MESSAGES } from "@/lib/constants";

export interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const {
    name,
    slug,
    brand,
    description,
    price,
    priceOnRequest,
    status,
    mainImageUrl,
    specifications,
  } = product;

  const whatsappUrl = buildWhatsAppLink(
    WHATSAPP_MESSAGES.productInquiry(name, brand)
  );

  // Tratamento visual de status
  let statusBadge = {
    label: "Disponível • em estoque",
    bulletClass: "bg-emerald-500",
  };

  if (status === "on_demand") {
    statusBadge = {
      label: "Sob encomenda",
      bulletClass: "bg-amber-500",
    };
  } else if (status === "out_of_stock") {
    statusBadge = {
      label: "Indisponível no momento",
      bulletClass: "bg-neutral-400",
    };
  }

  // Especificação resumida
  const specSummary =
    specifications && specifications.length > 0
      ? `${specifications[0].label}: ${specifications[0].value}`
      : null;

  return (
    <article className="group flex flex-col justify-between rounded-2xl bg-white border border-neutral-200/80 shadow-xs hover:shadow-md transition-all duration-200 overflow-hidden">
      <div>
        {/* Top Image Container */}
        <Link
          href={`/catalog/${slug}`}
          className="relative block aspect-[4/3] w-full bg-[#F8F9FA] overflow-hidden p-6 border-b border-neutral-100"
        >
          <Image
            src={mainImageUrl}
            alt={name}
            fill
            className="object-contain p-4 group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </Link>

        {/* Content Container */}
        <div className="p-5 flex flex-col gap-2">
          {/* Marca */}
          <div className="flex items-center justify-between text-xs text-neutral-500">
            <span className="font-semibold uppercase tracking-wider text-neutral-400">
              {brand}
            </span>
            {product.code && (
              <span className="text-[10px] text-neutral-400 font-mono">
                {product.code}
              </span>
            )}
          </div>

          {/* Nome do Produto */}
          <Link href={`/catalog/${slug}`}>
            <h3 className="text-base font-bold text-[#151515] group-hover:text-[#D62828] transition-colors line-clamp-1">
              {name}
            </h3>
          </Link>

          {/* Descrição resumida */}
          <p className="text-xs text-neutral-600 line-clamp-2 leading-relaxed">
            {description}
          </p>

          {/* Especificação resumida */}
          {specSummary && (
            <p className="text-[11px] text-neutral-500 font-medium pt-1 line-clamp-1 border-t border-neutral-100 mt-1">
              {specSummary}
            </p>
          )}
        </div>
      </div>

      {/* Bottom Area: Preço e Ações */}
      <div className="p-5 pt-0 flex flex-col gap-3">
        {/* Preço e Status */}
        <div className="flex flex-col gap-1 border-t border-neutral-100 pt-3">
          <div className="min-h-[28px] flex items-baseline">
            {priceOnRequest || price === null ? (
              <span className="text-base font-bold text-neutral-700">
                Consulte o preço
              </span>
            ) : (
              <span className="text-xl font-extrabold text-[#151515] tracking-tight">
                R$ {price.toFixed(2).replace(".", ",")}
              </span>
            )}
          </div>

          <div className="flex items-center gap-1.5 text-[11px] text-neutral-500">
            <span
              className={`w-2 h-2 rounded-full ${statusBadge.bulletClass}`}
            />
            <span>{statusBadge.label}</span>
          </div>
        </div>

        {/* Botões de Ação */}
        <div className="flex flex-col gap-2 pt-1">
          <Link
            href={`/catalog/${slug}`}
            className="inline-flex items-center justify-center gap-1.5 w-full h-9 rounded-lg border border-neutral-200 bg-white hover:bg-neutral-50 text-xs font-semibold text-[#151515] transition-colors"
          >
            <span>Ver detalhes</span>
            <ArrowRight className="w-3.5 h-3.5 text-neutral-400" />
          </Link>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 w-full h-10 rounded-lg bg-[#D62828] hover:bg-[#b91c1c] text-white text-xs font-bold transition-all shadow-xs active:translate-y-px"
          >
            <MessageCircle className="w-4 h-4 fill-white/20" />
            <span>Consultar pelo WhatsApp</span>
          </a>
        </div>
      </div>
    </article>
  );
}

export default ProductCard;
