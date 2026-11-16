"use client";

import React, { useState } from "react";
import Image from "next/image";

interface ProductGalleryProps {
  mainImageUrl: string;
  galleryUrls: string[];
  productName: string;
}

export function ProductGallery({
  mainImageUrl,
  galleryUrls,
  productName,
}: ProductGalleryProps) {
  // Lista com a imagem principal + galeria sem duplicatas
  const allImages = Array.from(new Set([mainImageUrl, ...(galleryUrls || [])]));
  const [activeImage, setActiveImage] = useState<string>(allImages[0] || mainImageUrl);

  return (
    <div className="flex flex-col gap-4">
      {/* Imagem Principal */}
      <div className="relative w-full aspect-[4/3] bg-[#F8F9FA] rounded-2xl overflow-hidden border border-neutral-200/80 flex items-center justify-center p-8 shadow-xs">
        <Image
          src={activeImage}
          alt={productName}
          fill
          priority
          className="object-contain p-6 transition-all duration-300"
          sizes="(max-width: 1024px) 100vw, 50vw"
        />
      </div>

      {/* Miniaturas interativas */}
      {allImages.length > 1 && (
        <div className="grid grid-cols-4 gap-3">
          {allImages.map((img, idx) => {
            const isSelected = activeImage === img;
            return (
              <button
                type="button"
                key={idx}
                onClick={() => setActiveImage(img)}
                className={`relative aspect-[4/3] bg-[#F8F9FA] rounded-xl overflow-hidden border cursor-pointer transition-all ${
                  isSelected
                    ? "border-[#D62828] ring-2 ring-[#D62828]/20 shadow-xs"
                    : "border-neutral-200 hover:border-neutral-300"
                }`}
              >
                <Image
                  src={img}
                  alt={`${productName} miniatura ${idx + 1}`}
                  fill
                  className="object-contain p-2"
                  sizes="15vw"
                />
              </button>
            );
          })}
        </div>
      )}

      <p className="text-[11px] text-neutral-400 mt-1">
        Imagens ilustrativas. Consulte nossa equipe para fotos e detalhes reais do lote.
      </p>
    </div>
  );
}

export default ProductGallery;
