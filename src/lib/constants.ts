import { CompanyInfo } from "@/types";

export const BRAND_COLORS = {
  black: "#151515",
  white: "#FFFFFF",
  red: "#D62828",
  yellow: "#F4C542",
  gray: "#F5F5F5",
} as const;

export const COMPANY_DETAILS: CompanyInfo = {
  name: "Auto Peças Diniz Vieira Ltda.",
  tradeName: "Auto Peças Diniz Vieira",
  slogan: "Tradição e confiança em baterias e autopeças",
  history:
    "Fundada com o compromisso de fornecer peças automotivas e baterias de alta qualidade, a Auto Peças Diniz Vieira consolidou-se como referência em atendimento técnico, honestidade e preços justos.",
  mission:
    "Oferecer as melhores soluções em peças automotivas e baterias, assegurando segurança, desempenho e atendimento ágil aos nossos clientes.",
  vision:
    "Ser a principal referência regional no comércio de autopeças e baterias, reconhecida pela excelência no suporte ao cliente e catálogo diversificado.",
  values: [
    "Compromisso com a qualidade",
    "Transparência e honestidade",
    "Atendimento consultivo e técnico",
    "Agilidade na entrega e suporte",
  ],
  contact: {
    phone: "(11) 99999-9999",
    whatsapp: "5511999999999",
    whatsappDisplay: "(11) 99999-9999",
    email: "contato@autopecasdinizvieira.com.br",
    address: {
      street: "Avenida Principal",
      number: "1000",
      neighborhood: "Centro",
      city: "São Paulo",
      state: "SP",
      zipCode: "01000-000",
      fullFormatted: "Av. Principal, 1000 - Centro, São Paulo - SP",
    },
    workingHours: {
      weekdays: "08:00 às 18:00",
      saturday: "08:00 às 13:00",
      sunday: "Fechado",
    },
  },
};

export const NAV_ITEMS = [
  { label: "Início", href: "#inicio" },
  { label: "Sobre Nós", href: "#sobre" },
  { label: "Produtos & Baterias", href: "#produtos" },
  { label: "Categorias", href: "#categorias" },
  { label: "Contato", href: "#contato" },
] as const;

export function buildWhatsAppLink(
  message: string,
  phone: string = COMPANY_DETAILS.contact.whatsapp
): string {
  const cleanPhone = phone.replace(/\D/g, "");
  const encodedMsg = encodeURIComponent(message);
  return `https://wa.me/${cleanPhone}?text=${encodedMsg}`;
}
