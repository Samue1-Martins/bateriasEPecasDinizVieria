import React from "react";
import { MessageCircle, Clock3, MapPin, Phone } from "lucide-react";
import {
  WHATSAPP_DISPLAY,
  WORKING_HOURS,
  buildWhatsAppLink,
  WHATSAPP_MESSAGES,
} from "@/lib/constants";

type ContactSectionProps = {
  phone?: string;
  hours?: string;
};

type ContactInfoItemProps = {
  icon: React.ElementType;
  label: string;
  value: string;
};

function ContactInfoItem({ icon: Icon, label, value }: ContactInfoItemProps) {
  return (
    <div className="flex items-start gap-3">
      <Icon
        size={18}
        strokeWidth={1.8}
        className="mt-0.5 shrink-0 text-[#D62828]"
        aria-hidden="true"
      />
      <div className="space-y-0.5">
        <p className="text-[10px] font-medium text-neutral-500 uppercase tracking-wider">{label}</p>
        <p className="text-[13px] font-semibold text-[#151515]">{value}</p>
      </div>
    </div>
  );
}

function LocationPlaceholder({ whatsappLocationUrl }: { whatsappLocationUrl: string }) {
  return (
    <div className="relative aspect-[503/277] w-full overflow-hidden rounded-2xl bg-neutral-200/80 border border-neutral-300/80 flex items-center justify-center p-6 text-center">
      {/* Padrão geométrico esquemático de fundo */}
      <svg
        viewBox="0 0 503 277"
        preserveAspectRatio="none"
        className="absolute inset-0 h-full w-full opacity-40"
        aria-hidden="true"
      >
        <path d="M-20 85 L520 -55" stroke="white" strokeWidth="18" fill="none" />
        <path d="M-20 210 L520 75" stroke="white" strokeWidth="18" fill="none" />
        <path d="M95 -20 L25 300" stroke="white" strokeWidth="18" fill="none" />
        <path d="M380 -20 L440 300" stroke="white" strokeWidth="18" fill="none" />
      </svg>

      {/* Cartão central de localização neutra */}
      <div className="relative z-10 flex flex-col items-center max-w-sm rounded-xl bg-white/95 backdrop-blur-xs px-8 py-6 shadow-sm border border-neutral-200">
        <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center mb-3">
          <MapPin size={22} strokeWidth={2} className="text-[#D62828]" />
        </div>
        <h3 className="text-sm font-bold text-[#151515]">Localização da Loja e Oficina</h3>
        <p className="mt-1.5 text-xs text-neutral-600 leading-relaxed">
          Consulte nossa localização exata e pontos de referência diretamente com nossa equipe.
        </p>
        <a
          href={whatsappLocationUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3.5 inline-flex items-center gap-1.5 text-xs font-bold text-[#D62828] hover:text-[#b91c1c] transition-colors"
        >
          <span>Solicitar endereço no WhatsApp</span>
          <span aria-hidden="true">→</span>
        </a>
      </div>
    </div>
  );
}

export function ContactSection({
  phone = WHATSAPP_DISPLAY,
  hours = WORKING_HOURS,
}: ContactSectionProps) {
  const whatsappUrl = buildWhatsAppLink(WHATSAPP_MESSAGES.contact);
  const whatsappLocationUrl = buildWhatsAppLink(WHATSAPP_MESSAGES.location);

  return (
    <section
      id="contato"
      aria-labelledby="contact-heading"
      className="w-full bg-[#F5F5F5] px-4 py-16 sm:py-20 md:px-6 lg:px-8 border-t border-neutral-200/60"
    >
      <div className="mx-auto grid max-w-[1360px] grid-cols-1 items-center gap-10 md:grid-cols-2 md:gap-14 lg:gap-16">
        {/* Coluna esquerda – informações */}
        <div className="flex flex-col items-start">
          <h2
            id="contact-heading"
            className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#151515] tracking-tight leading-tight"
          >
            Precisando de uma peça para seu veículo?
          </h2>
          <p className="mt-3 text-base sm:text-lg text-neutral-600 leading-relaxed max-w-xl">
            Consulte a disponibilidade e tire suas dúvidas. Estamos aqui para ajudar você a encontrar a peça certa.
          </p>

          {/* Botão WhatsApp */}
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex h-11 items-center gap-2 rounded-lg bg-[#D62828] px-6 text-sm font-bold text-white transition-colors hover:bg-[#b91c1c] shadow-xs active:translate-y-px"
          >
            <MessageCircle size={17} />
            Fale pelo WhatsApp
          </a>

          {/* Dados de contato */}
          <div className="mt-8 flex flex-col gap-4">
            <ContactInfoItem icon={Phone} label="Telefone / WhatsApp" value={phone} />
            <ContactInfoItem icon={Clock3} label="Horário de Atendimento" value={hours} />
          </div>
        </div>

        {/* Coluna direita – mapa neutro */}
        <div className="w-full">
          <LocationPlaceholder whatsappLocationUrl={whatsappLocationUrl} />
          <p className="mt-2 text-[11px] text-neutral-400 text-center md:text-left">
            Atendimento presencial e consultas sob confirmação com nossa equipe.
          </p>
        </div>
      </div>
    </section>
  );
}

export default ContactSection;
