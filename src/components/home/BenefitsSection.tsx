import React from "react";
import {
  BatteryCharging,
  Wrench,
  Droplet,
  Phone,
  CheckCircle2,
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui";

const BENEFITS = [
  {
    icon: BatteryCharging,
    title: "Troca e Teste de Baterias",
    description:
      "Realizamos teste de voltagem e diagnóstico do alternador no balcão. Troca rápida e orientações para maior vida útil da bateria.",
    highlights: ["Diagnóstico gratuito", "Marcas líderes de mercado", "Garantia de até 24 meses"],
    color: "text-[#D62828]",
    bg: "bg-[#D62828]/10",
  },
  {
    icon: Wrench,
    title: "Peças Originais e Certificadas",
    description:
      "Trabalhamos exclusivamente com fabricantes conceituados e componentes de primeira linha para motor, freios, suspensão e transmissão.",
    highlights: ["Procedência garantida com NF", "Compatibilidade exata", "Durabilidade comprovada"],
    color: "text-[#151515]",
    bg: "bg-[#151515]/10",
  },
  {
    icon: Droplet,
    title: "Óleos & Lubrificantes Homologados",
    description:
      "Óleos de motor minerais, semi-sintéticos e sintéticos de viscosidades 0W20, 5W30, 5W40, 15W40, além de fluidos de freio e aditivos de arrefecimento.",
    highlights: ["Normas API e ACEA", "Filtros de óleo e combustível", "Proteção total ao motor"],
    color: "text-[#D62828]",
    bg: "bg-[#D62828]/10",
  },
  {
    icon: Phone,
    title: "Cotação Ágil pelo WhatsApp",
    description:
      "Economize tempo: envie o que precisa direto no aplicativo e receba fotos, orçamentos e prazos de entrega em poucos minutos.",
    highlights: ["Suporte técnico consultivo", "Envio de fotos e dados", "Reserva de peças na loja"],
    color: "text-emerald-600",
    bg: "bg-emerald-500/10",
  },
];

export function BenefitsSection() {
  return (
    <section id="diferenciais" className="py-16 sm:py-20 bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-[#D62828]">
            Por que escolher a Diniz Vieira
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-[#151515] tracking-tight">
            Excelência no atendimento e segurança para o seu veículo
          </h2>
          <p className="text-sm sm:text-base text-gray-600">
            Mais do que vender peças automotivas, oferecemos a orientação correta para que
            seu carro, utilitário ou caminhão rode com total segurança e desempenho.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {BENEFITS.map((item) => {
            const Icon = item.icon;
            return (
              <Card
                key={item.title}
                className="hover:border-[#D62828] hover:shadow-md transition-all flex flex-col justify-between"
              >
                <CardHeader>
                  <div
                    className={`w-12 h-12 rounded-xl ${item.bg} ${item.color} flex items-center justify-center mb-3`}
                  >
                    <Icon className="size-6" strokeWidth={2} />
                  </div>
                  <CardTitle className="text-base font-bold text-[#151515]">
                    {item.title}
                  </CardTitle>
                  <CardDescription className="text-xs leading-relaxed text-gray-600">
                    {item.description}
                  </CardDescription>
                </CardHeader>

                <CardContent className="pt-2">
                  <ul className="space-y-1.5 border-t pt-3">
                    {item.highlights.map((highlight) => (
                      <li
                        key={highlight}
                        className="text-xs text-gray-700 flex items-center gap-1.5"
                      >
                        <CheckCircle2 className="size-3.5 text-[#D62828] shrink-0" />
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
