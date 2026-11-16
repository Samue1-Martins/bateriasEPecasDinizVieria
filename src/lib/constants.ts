import { CompanyInfo } from "@/types";

export const WHATSAPP_NUMBER = "5531988012447";
export const WHATSAPP_DISPLAY = "+55 (31) 98801-2447";
export const WORKING_HOURS = "08:00 às 18:00";

/**
 * Função centralizada para geração de links do WhatsApp.
 * Utiliza o número oficial internacional: 5531988012447.
 */
export function buildWhatsAppLink(message: string): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

/**
 * Mensagens padrão pré-formatadas para o WhatsApp.
 */
export const WHATSAPP_MESSAGES = {
  general: "Olá! Gostaria de conhecer os produtos da Auto Peças Diniz Vieira.",
  location: "Olá! Gostaria de consultar a localização da Auto Peças Diniz Vieira.",
  contact: "Olá! Gostaria de falar sobre peças e serviços com a equipe da Auto Peças Diniz Vieira.",
  productInquiry: (productName: string, productBrand?: string) =>
    `Olá! Gostaria de consultar a disponibilidade do produto ${productName}${productBrand ? ` (${productBrand})` : ""}.`,
};

export const COMPANY_DETAILS: CompanyInfo = {
  name: "Auto Peças Diniz Vieira",
  tradeName: "Auto Peças Diniz Vieira",
  slogan: "Peças, cuidado e confiança. Loja e oficina lado a lado desde 2023.",
  history:
    "Tudo começou em 2023 com o sonho de oferecer um serviço cada vez mais completo aos nossos clientes. Ao lado da oficina, surgiu a ideia de abrir uma loja de autopeças, facilitando a vida de quem precisava de consertos, peças e baterias. Hoje, loja e oficina trabalham lado a lado, cuidando de cada veículo com dedicação.",
  mission:
    "Oferecer produtos de qualidade e atendimento próximo e transparente, garantindo a tranquilidade e a segurança de cada motorista.",
  vision:
    "Ser a loja e oficina de autopeças de maior confiança na região, reconhecida pelo atendimento técnico humanizado e pela agilidade.",
  values: [
    "Confiança e transparência",
    "Qualidade e procedência das peças",
    "Cuidado lado a lado com o cliente",
    "Responsabilidade e dedicação",
  ],
  contact: {
    phone: WHATSAPP_DISPLAY,
    whatsapp: WHATSAPP_NUMBER,
    whatsappDisplay: WHATSAPP_DISPLAY,
    email: "contato@dinizvieira.com.br", // informativo
    address: {
      street: "",
      number: "",
      neighborhood: "",
      city: "",
      state: "MG",
      zipCode: "",
      fullFormatted: "Consulte nossa localização pelo WhatsApp",
    },
    workingHours: {
      weekdays: WORKING_HOURS,
      saturday: WORKING_HOURS,
      sunday: "",
    },
    socialLinks: {
      instagram: "https://instagram.com",
    },
  },
};
