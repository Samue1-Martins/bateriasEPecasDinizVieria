import React from "react";
import {
  BatteryCharging,
  Wrench,
  ShieldCheck,
  Phone,
  ArrowRight,
  Clock,
  MapPin,
} from "lucide-react";
import { Button, Badge } from "@/components/ui";
import { COMPANY_DETAILS, buildWhatsAppLink } from "@/lib/constants";

export function HeroSection() {
  const whatsappUrl = buildWhatsAppLink(
    "Olá! Gostaria de consultar uma peça/bateria na Auto Peças Diniz Vieira."
  );

  return (
    <section
      id="inicio"
      className="relative bg-[#151515] text-white pt-12 pb-16 sm:pt-20 sm:pb-24 border-b-4 border-[#D62828] overflow-hidden"
    >
      {/* Background ambient glow effect */}
      <div className="absolute top-0 right-0 -mt-12 -mr-12 w-96 h-96 bg-[#D62828]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -mb-12 -ml-12 w-96 h-96 bg-[#F4C542]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Coluna Principal / Textos */}
          <div className="lg:col-span-7 space-y-6">
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="secondary" className="gap-1.5 py-1 px-3 font-bold text-xs">
                <BatteryCharging className="size-3.5 text-[#151515]" />
                <span>Especialistas em Baterias & Autopeças</span>
              </Badge>
              <span className="text-xs text-gray-400 flex items-center gap-1">
                <Clock className="size-3.5 text-[#F4C542]" />
                {COMPANY_DETAILS.contact.workingHours.weekdays}
              </span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight">
              A peça certa para o seu veículo com{" "}
              <span className="text-[#F4C542]">tradição</span> e{" "}
              <span className="text-[#D62828]">qualidade</span>.
            </h1>

            <p className="text-base sm:text-lg text-gray-300 leading-relaxed max-w-2xl">
              Na <strong>Auto Peças Diniz Vieira</strong> você encontra linha completa de
              baterias automotivas, peças de motor, suspensão, freios e lubrificantes.
              Atendimento técnico de balcão e cotação rápida pelo WhatsApp.
            </p>

            {/* Ações / Botões */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                <Button variant="whatsapp" size="lg" className="gap-2.5 shadow-lg">
                  <Phone className="size-5" />
                  <span>Pedir Cotação no WhatsApp</span>
                </Button>
              </a>

              <a href="#categorias">
                <Button
                  variant="outline"
                  size="lg"
                  className="gap-2 border-white/60 text-white hover:bg-white hover:text-[#151515]"
                >
                  <span>Ver Categorias</span>
                  <ArrowRight className="size-4" />
                </Button>
              </a>
            </div>

            {/* Micro métricas e garantias */}
            <div className="pt-6 border-t border-neutral-800 grid grid-cols-2 sm:grid-cols-3 gap-4">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-neutral-800 flex items-center justify-center text-[#F4C542] shrink-0">
                  <ShieldCheck className="size-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">Garantia Estendida</h4>
                  <p className="text-[11px] text-gray-400">Até 24 meses</p>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-neutral-800 flex items-center justify-center text-[#D62828] shrink-0">
                  <BatteryCharging className="size-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">Teste de Bateria</h4>
                  <p className="text-[11px] text-gray-400">Diagnóstico gratuito</p>
                </div>
              </div>

              <div className="flex items-center gap-2.5 col-span-2 sm:col-span-1">
                <div className="w-8 h-8 rounded-lg bg-neutral-800 flex items-center justify-center text-[#25D366] shrink-0">
                  <Wrench className="size-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">Peças Originais</h4>
                  <p className="text-[11px] text-gray-400">Procedência garantida</p>
                </div>
              </div>
            </div>
          </div>

          {/* Coluna Secundária / Card de Cotação Rápida */}
          <div className="lg:col-span-5">
            <div className="bg-white text-[#151515] p-6 sm:p-8 rounded-2xl shadow-2xl border-2 border-[#D62828] space-y-6">
              <div className="flex items-center justify-between pb-3 border-b">
                <div>
                  <Badge variant="primary">Atendimento Direto</Badge>
                  <h3 className="text-xl font-extrabold text-[#151515] mt-1">
                    Precisa de uma Peça Agora?
                  </h3>
                </div>
                <div className="w-10 h-10 rounded-full bg-[#D62828]/10 text-[#D62828] flex items-center justify-center font-bold">
                  DV
                </div>
              </div>

              <p className="text-xs text-gray-600 leading-relaxed">
                Envie o <strong>modelo, ano e motorização</strong> do seu carro, ou nos envie uma
                foto da peça que você procura. Nossos consultores respondem imediatamente com valor e prazo.
              </p>

              <div className="space-y-3 bg-[#F5F5F5] p-4 rounded-xl text-xs text-gray-700">
                <div className="flex items-center justify-between">
                  <span className="font-semibold flex items-center gap-1.5">
                    <BatteryCharging className="size-4 text-[#D62828]" />
                    Baterias 45Ah a 100Ah
                  </span>
                  <span className="text-[#D62828] font-bold">A pronta entrega</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-semibold flex items-center gap-1.5">
                    <Wrench className="size-4 text-[#151515]" />
                    Freios, Suspensão & Motor
                  </span>
                  <span className="text-gray-500">Linha Leve & Utilitários</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-semibold flex items-center gap-1.5">
                    <MapPin className="size-4 text-emerald-600" />
                    Retirada na Loja ou Entrega
                  </span>
                  <span className="text-emerald-700 font-bold">Consulte sua região</span>
                </div>
              </div>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                <Button variant="whatsapp" size="lg" className="w-full gap-2 text-sm font-bold shadow-md">
                  <Phone className="size-4" />
                  <span>Chamar no WhatsApp: {COMPANY_DETAILS.contact.whatsappDisplay}</span>
                </Button>
              </a>

              <p className="text-[11px] text-center text-gray-500">
                Atendimento rápido • Segunda a Sexta 08h-18h | Sábado 08h-13h
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
