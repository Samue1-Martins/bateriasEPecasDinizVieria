import React from "react";
import Image from "next/image";
import { ShieldCheck, Package } from "lucide-react";
import { buildWhatsAppLink, WHATSAPP_MESSAGES } from "@/lib/constants";

export function HeroSection() {
  const whatsappUrl = buildWhatsAppLink(WHATSAPP_MESSAGES.contact);

  return (
    <section id="inicio" className="bg-white">
      {/* Bloco Hero Principal */}
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-16 lg:pt-16 lg:pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Coluna de Textos */}
          <div className="lg:col-span-6 space-y-6">
            {/* Tag / Eyebrow */}
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#D62828]" />
              <span className="text-[11px] sm:text-xs font-bold uppercase tracking-[0.2em] text-[#D62828]">
                LOJA E OFICINA. LADO A LADO.
              </span>
            </div>

            {/* Título Principal */}
            <h1 className="text-3xl sm:text-5xl lg:text-[3.5rem] font-extrabold text-[#151515] tracking-tight leading-[1.12]">
              Tudo o que seu veículo precisa, em um só lugar.
            </h1>

            {/* Subtítulo */}
            <p className="text-base sm:text-lg text-neutral-600 leading-relaxed max-w-xl">
              Qualidade em autopeças, atendimento de confiança e praticidade para
              cuidar do seu veículo.
            </p>

            {/* Ações / Botões */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href="#destaques"
                className="inline-flex items-center justify-center rounded-lg bg-[#D62828] px-6 py-3.5 text-sm font-bold text-white shadow-xs hover:bg-[#b91c1c] active:translate-y-px transition-all"
              >
                Conheça nossos produtos
              </a>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-lg border border-neutral-300 bg-white px-6 py-3.5 text-sm font-semibold text-[#151515] shadow-xs hover:bg-neutral-50 active:translate-y-px transition-all"
              >
                Fale conosco
              </a>
            </div>

            {/* Garantia / Sublegenda */}
            <div className="flex items-center gap-2 text-xs text-neutral-500 pt-2">
              <ShieldCheck className="w-4 h-4 text-[#D62828]" />
              <span>Desde 2023, cuidando de quem está ao volante.</span>
            </div>
          </div>

          {/* Coluna da Imagem */}
          <div className="lg:col-span-6">
            <div className="relative overflow-hidden rounded-2xl shadow-sm border border-neutral-200/80 bg-neutral-100">
              <Image
                src="/images/general/workshop-hero.webp"
                alt="Mecânico trabalhando em oficina automotiva"
                width={800}
                height={520}
                priority
                className="w-full h-auto object-cover max-h-[520px]"
              />
            </div>
            <p className="text-[11px] text-neutral-400 mt-2 text-right lg:text-left">
              Imagem ilustrativa de oficina. Não retrata a loja física real.
            </p>
          </div>
        </div>
      </div>

      {/* Faixa Inferior de Diferenciais / Benefícios Rápidos */}
      <div className="border-t border-neutral-200 bg-[#FAFAFA] py-8 sm:py-10">
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {/* Item 1 */}
            <div className="flex items-start gap-3.5">
              <div className="text-[#D62828] mt-0.5 shrink-0">
                <Package className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-[#151515]">
                  Peças para o seu dia a dia
                </h3>
                <p className="text-xs text-neutral-600 mt-0.5">
                  Variedade para cuidar do veículo.
                </p>
              </div>
            </div>

            {/* Item 2 */}
            <div className="flex items-start gap-3.5">
              <div className="text-[#D62828] mt-0.5 shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-[#151515]">
                  Atendimento de confiança
                </h3>
                <p className="text-xs text-neutral-600 mt-0.5">
                  Orientação honesta, sem complicações.
                </p>
              </div>
            </div>

            {/* Item 3 */}
            <div className="flex items-start gap-3.5">
              <div className="text-[#D62828] mt-0.5 shrink-0">
                <Package className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-[#151515]">
                  Loja e oficina
                </h3>
                <p className="text-xs text-neutral-600 mt-0.5">
                  Mais praticidade em um só lugar.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
