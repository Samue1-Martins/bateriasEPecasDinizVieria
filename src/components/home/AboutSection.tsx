import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function AboutSection() {
  return (
    <section className="py-16 sm:py-24 bg-white border-t border-neutral-100">
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          {/* Left side image */}
          <div className="lg:col-span-5">
            <div className="relative overflow-hidden rounded-2xl shadow-sm border border-neutral-200/80 bg-neutral-100">
              <Image
                src="/images/general/history-mechanic.webp"
                alt="História da Auto Peças Diniz Vieira"
                width={800}
                height={600}
                className="w-full h-auto object-cover max-h-[500px]"
              />
            </div>
            <p className="text-[11px] text-neutral-400 mt-2 text-right lg:text-left">
              Imagem ilustrativa. Não retrata a loja física real.
            </p>
          </div>

          {/* Right side text */}
          <div className="lg:col-span-7 flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#D62828]" />
              <span className="text-[11px] sm:text-xs font-bold uppercase tracking-[0.2em] text-[#D62828]">
                JUNTOS DESDE 2023
              </span>
            </div>

            <h2 className="text-2xl sm:text-4xl font-extrabold text-[#151515] tracking-tight">
              Nossa história, nosso compromisso.
            </h2>

            <div className="space-y-4 text-sm sm:text-base text-neutral-600 leading-relaxed pt-1">
              <p>
                Tudo começou em 2023 com o sonho de oferecer um serviço cada vez mais completo aos nossos clientes. Ao lado da oficina, surgiu a ideia de abrir uma loja de autopeças, facilitando a vida de quem precisava de consertos, peças e baterias.
              </p>
              <p>
                Percebemos que muitos clientes precisavam procurar peças em outros lugares depois de identificar um problema no veículo. Decidimos então unir a oficina à loja, trazendo mais praticidade, agilidade e confiança.
              </p>
              <p>
                Hoje, loja e oficina trabalham lado a lado, compartilhando o compromisso de cuidar de cada veículo com responsabilidade, dedicação e respeito aos nossos clientes.
              </p>
            </div>

            <div className="pt-2">
              <Link
                href="/about"
                className="inline-flex items-center gap-2 text-sm font-bold text-[#D62828] hover:text-[#b91c1c] transition-colors"
              >
                <span>Conheça nossa história</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutSection;
