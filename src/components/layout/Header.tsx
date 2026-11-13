'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, MessageCircle } from 'lucide-react';
import { buildWhatsAppLink } from '@/lib/constants';

const NAV_LINKS = [
  { label: 'Inicial', href: '/' },
  { label: 'Quem Somos', href: '/quem-somos' },
  { label: 'Catálogo', href: '/catalogo' },
] as const;

export const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const whatsappUrl = buildWhatsAppLink('Olá! Gostaria de informações sobre peças.');

  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b border-neutral-200 shadow-xs">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Top bar */}
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 select-none">
            <span className="w-1 h-7 bg-[#D62828] rounded-full" />
            <div className="flex flex-col">
              <span className="text-[9px] font-bold tracking-[0.25em] text-[#151515] uppercase leading-none">
                AUTO PEÇAS
              </span>
              <span className="text-lg font-extrabold text-[#151515] tracking-tight leading-tight">
                Diniz Vieira
              </span>
            </div>
          </Link>

          {/* Desktop Navigation (lg+) */}
          <nav className="hidden lg:flex items-center gap-8">
            {NAV_LINKS.map((link) => {
              const isActive = link.href === '/' 
                ? pathname === '/' 
                : pathname?.startsWith(link.href);

              return (
                <Link
                  key={link.label}
                  href={link.href}
                  className={
                    isActive
                      ? 'relative py-5 text-sm font-semibold text-[#D62828] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2.5px] after:bg-[#D62828]'
                      : 'text-sm font-medium text-neutral-600 hover:text-[#151515] transition-colors'
                  }
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Right CTA Button (Desktop & Tablet: md+) */}
          <div className="hidden md:flex items-center">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg bg-[#D62828] px-4 py-2 text-sm font-semibold text-white shadow-xs hover:bg-[#b91c1c] active:translate-y-px transition-all"
            >
              <MessageCircle className="h-4 w-4 fill-white/20" />
              <span>Fale pelo WhatsApp</span>
            </a>
          </div>

          {/* Mobile hamburger button (< md) */}
          <div className="flex md:hidden">
            <button
              type="button"
              aria-label="Abrir menu de navegação"
              aria-expanded={isOpen}
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center rounded-md p-2 text-neutral-700 hover:bg-neutral-100 hover:text-neutral-900 transition-colors focus:outline-hidden focus:ring-2 focus:ring-[#D62828]"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Tablet sub-bar: nav links (md to lg) */}
        <div className="hidden md:flex lg:hidden items-center justify-center gap-8 border-t border-neutral-100 py-2.5">
          {NAV_LINKS.map((link) => {
            const isActive = link.href === '/' 
              ? pathname === '/' 
              : pathname?.startsWith(link.href);

            return (
              <Link
                key={link.label}
                href={link.href}
                className={
                  isActive
                    ? 'relative py-1 text-sm font-semibold text-[#D62828] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-[#D62828]'
                    : 'text-sm font-medium text-neutral-600 hover:text-[#151515] transition-colors'
                }
              >
                {link.label}
              </Link>
            );
          })}
        </div>

        {/* Mobile secondary row: full-width CTA button (< md) */}
        <div className="md:hidden pb-3 pt-1">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#D62828] px-4 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-[#b91c1c] active:translate-y-px transition-all"
          >
            <MessageCircle className="h-4 w-4 fill-white/20" />
            <span>Fale pelo WhatsApp</span>
          </a>
        </div>
      </div>

      {/* Mobile dropdown drawer when hamburger is toggled (< md) */}
      {isOpen && (
        <nav
          aria-label="Menu móvel"
          className="md:hidden border-t border-neutral-200 bg-white px-4 pt-2 pb-4 shadow-lg animate-in slide-in-from-top-2 duration-150"
        >
          <ul className="flex flex-col divide-y divide-neutral-100">
            {NAV_LINKS.map((link) => {
              const isActive = link.href === '/' 
                ? pathname === '/' 
                : pathname?.startsWith(link.href);

              return (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className={`block py-3 text-base font-medium transition-colors ${
                      isActive
                        ? 'text-[#D62828] font-semibold'
                        : 'text-neutral-700 hover:text-[#151515]'
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      )}
    </header>
  );
};

export default Header; 