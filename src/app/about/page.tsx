import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Header, Footer } from "@/components/layout";
import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Wrench,
  Store,
  MessageCircle,
  ShieldCheck,
  HeartHandshake,
  Award,
  ClipboardCheck,
} from "lucide-react";
import { buildWhatsAppLink, WHATSAPP_MESSAGES } from "@/lib/constants";

export const metadata = {
  title: "Quem Somos | Auto Peças Diniz Vieira",
  description:
    "Conheça a história da Auto Peças Diniz Vieira. Uma loja que nasceu ao lado da oficina desde 2023.",
};

export default function AboutPage() {
  const whatsappUrl = buildWhatsAppLink(WHATSAPP_MESSAGES.general);

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Header />

      <main className="flex-grow">
        {/* Breadcrumb */}
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 py-5 text-xs sm:text-sm text-neutral-500">
          <Link href="/" className="hover:text-[#D62828] transition-colors">
            Inicial
          </Link>
          <span className="mx-2">/</span>
          <span className="font-medium text-neutral-900">Quem Somos</span>
        </div>

        {/* 1. Hero / Introdução */}
        <section className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-20 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <div className="flex flex-col gap-4 sm:gap-6">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#D62828]" />
              <span className="text-[11px] sm:text-xs font-bold uppercase tracking-[0.2em] text-[#D62828]">
                PROXIMIDADE QUE FAZ A DIFERENÇA
              </span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-[3.25rem] font-extrabold text-[#151515] leading-[1.12] tracking-tight">
              Conheça a Auto Peças
              <br />
              Diniz Vieira
            </h1>

            <p className="text-base sm:text-lg text-neutral-600 leading-relaxed max-w-xl">
              Uma loja que nasceu ao lado da oficina. E continua ao lado de quem
              precisa cuidar do veículo.
            </p>

            <div className="flex items-center gap-2.5 mt-1">
              <span className="w-2 h-2 bg-[#F4C542] rounded-full" />
              <p className="text-sm font-semibold text-[#151515]">
                Nossa história começa em 2023.
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <div className="relative w-full aspect-[4/3] bg-neutral-100 rounded-2xl overflow-hidden border border-neutral-200/80 shadow-sm">
              <Image
                src="/images/general/counter-service.webp"
                alt="Atendimento e balcão na Auto Peças Diniz Vieira"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
            <p className="text-[11px] text-neutral-400">
              Foto ilustrativa de atendimento. Não retrata a loja física real.
            </p>
          </div>
        </section>

        {/* 2. História */}
        <section className="bg-[#F8F9FA] border-y border-neutral-100">
          <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
            {/* Coluna da Esquerda (Títulos) */}
            <div className="lg:col-span-5 flex flex-col gap-4">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#D62828]" />
                <span className="text-[11px] sm:text-xs font-bold uppercase tracking-[0.2em] text-[#D62828]">
                  UM SONHO, UM NOVO CAMINHO
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#151515] tracking-tight leading-tight">
                Nossa história, nosso compromisso.
              </h2>
              <p className="text-base sm:text-lg text-neutral-600 leading-relaxed">
                Mais praticidade para você. O mesmo compromisso em cada
                atendimento.
              </p>
            </div>

            {/* Coluna da Direita (Textos e Card 2023) */}
            <div className="lg:col-span-7 flex flex-col gap-6 text-sm sm:text-base text-neutral-600 leading-relaxed">
              <p>
                Tudo começou em 2023 com o sonho de oferecer um serviço cada vez
                mais completo aos nossos clientes. Ao lado da oficina, surgiu a
                ideia de abrir uma loja de autopeças, facilitando a vida de quem
                precisava de consertos, peças e baterias.
              </p>
              <p>
                Percebemos que muitos clientes precisavam procurar peças em
                outros lugares depois de identificar um problema no veículo.
                Decidimos então unir a oficina à loja, trazendo mais
                praticidade, agilidade e confiança.
              </p>
              <p>
                Hoje, loja e oficina trabalham lado a lado, compartilhando o
                compromisso de cuidar de cada veículo com responsabilidade,
                dedicação e respeito aos nossos clientes.
              </p>

              {/* Card Destaque 2023 */}
              <div className="bg-white rounded-xl shadow-xs p-6 lg:p-8 mt-2 flex flex-col sm:flex-row sm:items-center gap-4 border border-neutral-200/80">
                <span className="text-3xl sm:text-4xl font-extrabold text-[#D62828]">
                  2023
                </span>
                <span className="text-xs sm:text-sm text-neutral-600">
                  O início de uma história construída com trabalho, cuidado e
                  proximidade.
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* 3. Lado a Lado (Oficina + Loja) */}
        <section className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <div className="flex flex-col gap-2">
            <div className="relative w-full aspect-[4/3] lg:aspect-[1.1] bg-neutral-100 rounded-2xl overflow-hidden border border-neutral-200/80 shadow-sm">
              <Image
                src="/images/general/workshop-hero.webp"
                alt="Mecânico trabalhando"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
            <p className="text-[11px] text-neutral-400">
              Foto ilustrativa de oficina. Não retrata nossas instalações físicas.
            </p>
          </div>

          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#D62828]" />
                <span className="text-[11px] sm:text-xs font-bold uppercase tracking-[0.2em] text-[#D62828]">
                  LADO A LADO
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#151515] tracking-tight leading-tight">
                Oficina + loja. Mais facilidade para você.
              </h2>
              <p className="text-base sm:text-lg text-neutral-600 leading-relaxed">
                Da identificação do problema à busca pela peça: aproximamos essas
                etapas para tornar o cuidado com seu veículo mais simples.
              </p>
            </div>

            <div className="flex flex-col gap-6">
              <div className="flex gap-4 items-start">
                <div className="p-2.5 rounded-lg bg-neutral-100 text-[#D62828] shrink-0">
                  <Wrench className="w-5 h-5 stroke-[1.75]" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-[#151515] mb-1">
                    O cuidado começa na oficina
                  </h3>
                  <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                    Atenção ao que o veículo precisa.
                  </p>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <div className="p-2.5 rounded-lg bg-neutral-100 text-[#D62828] shrink-0">
                  <Store className="w-5 h-5 stroke-[1.75]" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-[#151515] mb-1">
                    A solução continua na loja
                  </h3>
                  <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                    Orientação para consultar peças e baterias.
                  </p>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <div className="p-2.5 rounded-lg bg-neutral-100 text-[#D62828] shrink-0">
                  <MessageCircle className="w-5 h-5 stroke-[1.75]" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-[#151515] mb-1">
                    A conversa acompanha tudo
                  </h3>
                  <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                    Confirme aplicação, modelo e ano com a equipe.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 4. Valores / Nosso Compromisso */}
        <section className="bg-white py-16 lg:py-24 border-t border-neutral-100">
          <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-12 flex flex-col gap-3">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#D62828]" />
                <span className="text-[11px] sm:text-xs font-bold uppercase tracking-[0.2em] text-[#D62828]">
                  NOSSO COMPROMISSO
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#151515] tracking-tight">
                O que guia nosso trabalho
              </h2>
              <p className="text-sm sm:text-base text-neutral-500">
                Princípios que fazem parte da nossa forma de atender.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="border-neutral-200/80 shadow-xs rounded-2xl bg-white">
                <CardContent className="p-6 lg:p-8 flex flex-col gap-3">
                  <ShieldCheck className="w-7 h-7 text-[#D62828] stroke-[1.75]" />
                  <h3 className="text-base sm:text-lg font-bold text-[#151515]">
                    Confiança
                  </h3>
                  <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                    Uma relação construída com clareza, respeito e atenção em
                    cada conversa.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-neutral-200/80 shadow-xs rounded-2xl bg-white">
                <CardContent className="p-6 lg:p-8 flex flex-col gap-3">
                  <HeartHandshake className="w-7 h-7 text-[#D62828] stroke-[1.75]" />
                  <h3 className="text-base sm:text-lg font-bold text-[#151515]">
                    Dedicação
                  </h3>
                  <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                    Cuidado com os detalhes e disposição para entender o que você
                    precisa.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-neutral-200/80 shadow-xs rounded-2xl bg-white">
                <CardContent className="p-6 lg:p-8 flex flex-col gap-3">
                  <Award className="w-7 h-7 text-[#D62828] stroke-[1.75]" />
                  <h3 className="text-base sm:text-lg font-bold text-[#151515]">
                    Qualidade
                  </h3>
                  <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                    Atenção na escolha das peças e na orientação para o seu
                    veículo.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-neutral-200/80 shadow-xs rounded-2xl bg-white">
                <CardContent className="p-6 lg:p-8 flex flex-col gap-3">
                  <ClipboardCheck className="w-7 h-7 text-[#D62828] stroke-[1.75]" />
                  <h3 className="text-base sm:text-lg font-bold text-[#151515]">
                    Responsabilidade
                  </h3>
                  <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                    Compromisso com as informações e com cada pessoa que nos
                    procura.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* 5. CTA Final */}
        <section className="bg-[#F8F9FA] py-18 lg:py-24 border-t border-neutral-100">
          <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-start lg:items-center text-left lg:text-center gap-5">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#151515] tracking-tight">
              Conte com a gente para cuidar do seu veículo.
            </h2>
            <p className="text-base sm:text-lg text-neutral-600 leading-relaxed max-w-2xl">
              Conheça as categorias ou fale com nossa equipe sobre a peça que
              procura.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 pt-2 w-full lg:w-auto">
              <Link href="/catalog" className="w-full sm:w-auto">
                <Button
                  size="lg"
                  className="w-full bg-[#D62828] hover:bg-[#b91c1c] text-white h-12 px-7 rounded-lg text-sm font-bold shadow-xs active:translate-y-px transition-all"
                >
                  Conheça nossos produtos
                </Button>
              </Link>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto"
              >
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full h-12 px-7 rounded-lg text-sm font-semibold border-neutral-300 text-[#151515] bg-white hover:bg-neutral-50 gap-2 shadow-xs active:translate-y-px transition-all"
                >
                  <MessageCircle className="w-4 h-4" />
                  Fale pelo WhatsApp
                </Button>
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
