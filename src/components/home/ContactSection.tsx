// import Image from "next/image";
import {
  MapPin,
  MessageCircle,
  Phone,
  Clock3,
} from "lucide-react";

type ContactSectionProps = {
  whatsappHref: string;
  address?: string;
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
        <p className="text-[10px] font-medium text-neutral-500">{label}</p>
        <p className="text-[12px] font-medium text-[#151515]">{value}</p>
      </div>
    </div>
  );
}

function LocationPlaceholder() {
  return (
    <div className="relative aspect-[503/277] w-full overflow-hidden rounded-[10px] bg-[#E3E3E3]">
      {/* Ruas ilustrativas do mapa */}
      <svg
        viewBox="0 0 503 277"
        preserveAspectRatio="none"
        className="absolute inset-0 h-full w-full"
        aria-hidden="true"
      >
        <path d="M-20 85 L520 -55" stroke="white" strokeWidth="18" fill="none" />
        <path d="M-20 210 L520 75" stroke="white" strokeWidth="18" fill="none" />
        <path d="M95 -20 L25 300" stroke="white" strokeWidth="18" fill="none" />
      </svg>

      {/* Cartão central de localização */}
      <div className="absolute inset-0 flex items-center justify-center p-4">
        <div className="flex flex-col items-center rounded-xl bg-white px-9 py-5 text-center shadow-sm">
          <MapPin size={22} strokeWidth={1.8} className="mb-2 text-[#D62828]" />
          <h3 className="text-[13px] font-bold text-[#151515]">Localização a informar</h3>
          <p className="mt-2 text-[10px] text-neutral-500">
            Mapa esquemático · sem localização real
          </p>
        </div>
      </div>
    </div>
  );
}

export function ContactSection({
  whatsappHref,
  address = "Endereço a informar",
  phone = "Telefone a informar",
  hours = "Horários a informar",
}: ContactSectionProps) {
  return (
    <section
      id="contato"
      aria-labelledby="contact-heading"
      className="w-full bg-[#F5F5F5] px-5 py-14 md:px-10 md:py-16 lg:px-[70px]"
    >
      <div className="mx-auto grid max-w-[1100px] grid-cols-1 gap-10 md:grid-cols-2 md:gap-12 lg:gap-16">
        {/* Coluna esquerda – informações */}
        <div className="flex flex-col items-start">
          <h2
            id="contact-heading"
            className="max-w-[470px] text-[28px] font-bold leading-[1.15] tracking-[-0.035em] text-[#151515] md:text-[30px]"
          >
            Precisando de uma peça para seu veículo?
          </h2>
          <p className="mt-3 max-w-[470px] text-[13px] leading-[1.6] text-neutral-600">
            Consulte a disponibilidade e tire suas dúvidas. Estamos aqui para ajudar você a encontrar a peça certa.
          </p>

          {/* Botão WhatsApp */}
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 inline-flex h-10 items-center gap-2 rounded-md bg-[#D62828] px-4 text-[12px] font-semibold text-white transition-colors hover:bg-[#B91F1F] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D62828]"
          >
            <MessageCircle size={16} />
            Fale pelo WhatsApp
          </a>

          {/* Dados de contato */}
          <div className="mt-5 flex flex-col gap-4">
            <ContactInfoItem icon={MapPin} label="Endereço" value={address} />
            <ContactInfoItem icon={Phone} label="Telefone / WhatsApp" value={phone} />
            <ContactInfoItem icon={Clock3} label="Atendimento" value={hours} />
          </div>
        </div>

        {/* Coluna direita – mapa */}
        <div className="w-full">
          <LocationPlaceholder />
          <p className="mt-2 text-[9px] text-neutral-500">
            O endereço e as informações de atendimento serão atualizados.
          </p>
        </div>
      </div>
    </section>
  );
}
