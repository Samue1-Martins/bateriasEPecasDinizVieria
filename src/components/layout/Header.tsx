import React from "react";
import { COMPANY_DETAILS, NAV_ITEMS, buildWhatsAppLink } from "@/lib/constants";
import { Button } from "@/components/ui";

export function Header() {
  const whatsappHref = buildWhatsAppLink(
    "Olá! Acessei o site da Auto Peças Diniz Vieira e gostaria de mais informações."
  );

  return (
    <header className="sticky top-0 z-50 bg-[#151515] border-b-4 border-[#D62828] shadow-md text-white">
      {/* Top microbar */}
      <div className="bg-[#0f0f0f] text-xs py-1.5 px-4 text-gray-300 border-b border-neutral-800">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-1">
          <span className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-[#25D366]"></span>
            Atendimento especializado em autopeças e baterias
          </span>
          <div className="flex items-center gap-4">
            <span>{COMPANY_DETAILS.contact.workingHours.weekdays}</span>
            <span className="text-[#F4C542] font-semibold">
              Tel: {COMPANY_DETAILS.contact.phone}
            </span>
          </div>
        </div>
      </div>

      {/* Main navigation bar */}
      <div className="max-w-7xl mx-auto px-4 py-3.5 flex items-center justify-between gap-4">
        {/* Brand identity */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-[#D62828] flex items-center justify-center font-black text-xl text-white shadow-inner border border-red-400">
            DV
          </div>
          <div>
            <a href="#inicio" className="text-xl sm:text-2xl font-black tracking-tight text-white hover:text-[#F4C542] transition-colors">
              AUTO PEÇAS <span className="text-[#F4C542]">DINIZ VIEIRA</span>
            </a>
            <p className="text-xs text-gray-400 hidden sm:block">
              {COMPANY_DETAILS.slogan}
            </p>
          </div>
        </div>

        {/* Desktop navigation */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="text-gray-200 hover:text-[#F4C542] transition-colors"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* WhatsApp CTA Action */}
        <div className="flex items-center gap-3">
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Atendimento no WhatsApp"
          >
            <Button variant="whatsapp" size="sm" className="gap-2">
              <svg
                className="w-4 h-4 fill-current"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2zm.01 1.67c4.55 0 8.24 3.7 8.24 8.24 0 2.2-.86 4.28-2.42 5.84a8.19 8.19 0 0 1-5.82 2.41c-1.47 0-2.91-.39-4.18-1.15l-.3-.18-3.11.82.83-3.03-.2-.31a8.2 8.2 0 0 1-1.26-4.4c0-4.54 3.7-8.24 8.24-8.24zm4.5 11.66c-.25-.13-1.48-.73-1.71-.81-.23-.09-.4-.13-.57.13-.17.25-.66.81-.81.98-.15.17-.3.19-.55.06-.25-.13-1.06-.39-2.02-1.25-.75-.67-1.26-1.5-1.4-1.75-.15-.25-.02-.39.1-.51.11-.11.25-.29.37-.43.13-.15.17-.25.25-.42.08-.17.04-.32-.02-.45-.06-.13-.57-1.37-.78-1.87-.2-.49-.41-.42-.56-.43h-.48c-.17 0-.45.06-.68.32-.23.25-.89.87-.89 2.12s.91 2.46 1.04 2.63c.13.17 1.79 2.74 4.34 3.84.61.26 1.08.42 1.45.54.61.19 1.17.17 1.61.1.49-.07 1.48-.61 1.69-1.19.21-.59.21-1.09.15-1.19-.06-.11-.23-.17-.48-.29z" />
              </svg>
              <span>WhatsApp</span>
            </Button>
          </a>
        </div>
      </div>
    </header>
  );
}
