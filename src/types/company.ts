export interface CompanyContact {
  phone: string;
  whatsapp: string;
  whatsappDisplay: string;
  email: string;
  address: {
    street: string;
    number: string;
    neighborhood: string;
    city: string;
    state: string;
    zipCode: string;
    fullFormatted: string;
  };
  workingHours: {
    weekdays: string;
    saturday: string;
    sunday: string;
  };
  socialLinks?: {
    instagram?: string;
    facebook?: string;
  };
}

export interface CompanyInfo {
  name: string;
  tradeName: string;
  slogan: string;
  history: string;
  mission: string;
  vision: string;
  values: string[];
  contact: CompanyContact;
}
