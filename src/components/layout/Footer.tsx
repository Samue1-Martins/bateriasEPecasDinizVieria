import Link from "next/link";
import { MessageCircle } from "lucide-react";

type FooterProps = {
  whatsappHref: string;
  address?: string;
  phone?: string;
  hours?: string;
  whatsappLabel?: string;
};

export function Footer({
  whatsappHref,
  address = "Endereço a informar",
  phone = "Telefone a informar",
  hours = "Horários a informar",
  whatsappLabel = "WhatsApp · número a informar",
}: FooterProps) {
  // const currentYear = new Date().getFullYear();

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
            <h3 className="mb-2.5 text-[11px] font-bold text-white">Explore</h3>
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
            <h3 className="mb-2.5 text-[11px] font-bold text-white">Conte com nossa equipe</h3>
            <ul className="flex flex-col gap-2.5 text-[11px]">
              <li className="text-neutral-400">{address}</li>
              <li className="text-neutral-400">{phone}</li>
              <li className="text-neutral-400">{hours}</li>
              <li className="font-semibold text-white">{whatsappLabel}</li>
            </ul>
          </div>
        </div>

        {/* Divider & copyright */}
        <div className="mt-8 border-t border-white/10 pt-7 text-center">
          <p className="text-[10px] text-neutral-400">
            © 2026 Auto Peças Diniz Vieira. Todos os direitos reservados.
          </p>
        </div>
      </div>

      {/* === Botão WhatsApp – desktop (flutuante) === */}
      <a
        href={whatsappHref}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Fale conosco pelo WhatsApp"
        className="hidden md:inline-flex absolute right-4 bottom-4 items-center gap-2 rounded-full bg-[#D62828] px-5 py-2 text-[11px] font-semibold text-white transition-colors hover:bg-[#B91F1F] hover:shadow-lg"
      >
        <MessageCircle size={17} strokeWidth={1.8} />
        WhatsApp
      </a>

      {/* === Botão WhatsApp – mobile (centralizado) === */}
      <div className="md:hidden mt-6 text-center">
        <a
          href={whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-full bg-[#D62828] px-5 py-2 text-[11px] font-semibold text-white transition-colors hover:bg-[#B91F1F]"
        >
          <MessageCircle size={17} />
          WhatsApp
        </a>
      </div>
    </footer>
  );
}
