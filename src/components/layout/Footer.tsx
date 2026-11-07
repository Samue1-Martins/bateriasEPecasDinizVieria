import React from "react";
import { COMPANY_DETAILS, NAV_ITEMS } from "@/lib/constants";

const CURRENT_YEAR = 2026;

export function Footer() {
  return (
    <footer className="bg-[#151515] text-white border-t-4 border-[#D62828] mt-auto">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand info */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-md bg-[#D62828] flex items-center justify-center font-black text-white">
                DV
              </div>
              <h3 className="text-xl font-black text-[#F4C542]">
                AUTO PEÇAS DINIZ VIEIRA
              </h3>
            </div>
            <p className="text-gray-300 text-sm max-w-md leading-relaxed">
              {COMPANY_DETAILS.history}
            </p>
            <div className="pt-2 text-xs text-gray-400">
              <p className="font-semibold text-white">Horário de Funcionamento:</p>
              <p>Segunda a Sexta: {COMPANY_DETAILS.contact.workingHours.weekdays}</p>
              <p>Sábado: {COMPANY_DETAILS.contact.workingHours.saturday}</p>
              <p>Domingo: {COMPANY_DETAILS.contact.workingHours.sunday}</p>
            </div>
          </div>

          {/* Quick links */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider border-b border-neutral-800 pb-2">
              Navegação
            </h4>
            <ul className="space-y-2 text-sm text-gray-300">
              {NAV_ITEMS.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    className="hover:text-[#F4C542] transition-colors"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact and Location */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider border-b border-neutral-800 pb-2">
              Atendimento
            </h4>
            <div className="text-sm text-gray-300 space-y-2">
              <p>
                <strong className="text-white">Telefone:</strong>{" "}
                {COMPANY_DETAILS.contact.phone}
              </p>
              <p>
                <strong className="text-white">WhatsApp:</strong>{" "}
                {COMPANY_DETAILS.contact.whatsappDisplay}
              </p>
              <p>
                <strong className="text-white">E-mail:</strong>{" "}
                {COMPANY_DETAILS.contact.email}
              </p>
              <p className="pt-1">
                <strong className="text-white">Endereço:</strong><br />
                {COMPANY_DETAILS.contact.address.fullFormatted}
              </p>
            </div>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="mt-10 pt-6 border-t border-neutral-800 text-xs text-center text-gray-400 flex flex-col sm:flex-row justify-between items-center gap-2">
          <p>
            © {CURRENT_YEAR} {COMPANY_DETAILS.name} - Todos os direitos reservados.
          </p>
          <p className="text-[#F4C542]">
            Ambiente de Desenvolvimento Inicial
          </p>
        </div>
      </div>
    </footer>
  );
}
