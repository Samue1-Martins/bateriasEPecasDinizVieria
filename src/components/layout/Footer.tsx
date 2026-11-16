import Link from "next/link";
import { MessageCircle } from "lucide-react";
import {
  WHATSAPP_DISPLAY,
  WORKING_HOURS,
  buildWhatsAppLink,
  WHATSAPP_MESSAGES,
} from "@/lib/constants";

type FooterProps = {
  phone?: string;
  hours?: string;
};

export function Footer({
  phone = WHATSAPP_DISPLAY,
  hours = WORKING_HOURS,
}: FooterProps) {
  const currentYear = 2026;
  const whatsappUrl = buildWhatsAppLink(WHATSAPP_MESSAGES.general);

  return (
    <footer className="relative w-full bg-[#151515] text-white">
      {/* === Main content – 3 columns === */}
      <div className="mx-auto max-w-[1360px] px-4 py-12 md:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3">

          {/* 1️⃣ Logotipo textual + descrição */}
          <div className="flex flex-col">
            <Link
              href="/"
              aria-label="Auto Peças Diniz Vieira - Página inicial"
              className="flex items-center gap-2.5"
            >
              <span className="h-[30px] w-[3px] rounded-full bg-[#D62828]" />
              <span className="flex flex-col leading-none">
                <span className="text-[8px] font-bold uppercase tracking-[0.22em] text-neutral-300">
                  Auto Peças
                </span>
                <span className="mt-1 text-[17px] font-extrabold tracking-tight text-white">
                  Diniz Vieira
                </span>
              </span>
            </Link>

            <p className="mt-4 text-[12px] leading-relaxed text-neutral-400">
              Peças, cuidado e confiança. Loja e oficina lado a lado desde 2023.
            </p>
          </div>

          {/* 2️⃣ Navegação */}
          <nav aria-label="Navegação do rodapé">
            <h3 className="mb-2.5 text-[11px] font-bold text-white uppercase tracking-wider">
              Explore
            </h3>
            <ul className="flex flex-col gap-2.5">
              <li>
                <Link
                  href="/"
                  className="text-[11px] text-neutral-400 transition-colors hover:text-white"
                >
                  Inicial
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-[11px] text-neutral-400 transition-colors hover:text-white"
                >
                  Quem Somos
                </Link>
              </li>
              <li>
                <Link
                  href="/catalog"
                  className="text-[11px] text-neutral-400 transition-colors hover:text-white"
                >
                  Catálogo
                </Link>
              </li>
            </ul>
          </nav>

          {/* 3️⃣ Contato */}
          <div>
            <h3 className="mb-2.5 text-[11px] font-bold text-white uppercase tracking-wider">
              Conte com nossa equipe
            </h3>
            <ul className="flex flex-col gap-2.5 text-[11px]">
              <li className="text-neutral-400">
                Horário: {hours}
              </li>
              <li className="text-neutral-400">
                Atendimento presencial e online
              </li>
              <li className="font-semibold text-white flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                WhatsApp: {phone}
              </li>
            </ul>
          </div>

        </div>

        {/* Divisor */}
        <div className="mt-8 border-t border-white/10 pt-7">
          <p className="text-[10px] text-neutral-400">
            © {currentYear} Auto Peças Diniz Vieira. Todos os direitos reservados.
          </p>
        </div>
      </div>

      {/* === Botão WhatsApp – desktop (flutuante) === */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Fale conosco pelo WhatsApp"
        className="fixed bottom-6 right-6 z-40 hidden md:inline-flex h-[44px] items-center gap-2 rounded-full bg-[#D62828] px-5 text-xs font-bold text-white shadow-lg hover:bg-[#b91c1c] active:translate-y-px transition-all"
      >
        <MessageCircle size={18} strokeWidth={2} />
        WhatsApp
      </a>

      {/* === Botão WhatsApp – mobile (centralizado) === */}
      <div className="px-4 pb-6 md:hidden">
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-[#D62828] text-xs font-bold text-white hover:bg-[#b91c1c] transition-colors"
        >
          <MessageCircle size={18} />
          WhatsApp
        </a>
      </div>
    </footer>
  );
}

export default Footer;
