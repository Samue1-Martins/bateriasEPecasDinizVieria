import { Category, Product } from "@/types";

// Initial mock data simulating catalog structure until Firebase is connected
const MOCK_CATEGORIES: Category[] = [
  {
    id: "cat-baterias",
    name: "Baterias Automotivas",
    slug: "baterias-automotivas",
    description: "Baterias para carros de passeio, utilitários, motos e veículos pesados.",
    active: true,
    order: 1,
  },
  {
    id: "cat-freios",
    name: "Sistema de Freios",
    slug: "sistema-de-freios",
    description: "Pastilhas, discos, lonas, tambores e fluidos para segurança total.",
    active: true,
    order: 2,
  },
  {
    id: "cat-suspensao",
    name: "Suspensão & Direção",
    slug: "suspensao-e-direcao",
    description: "Amortecedores, molas, pivôs, terminais e buchas.",
    active: true,
    order: 3,
  },
  {
    id: "cat-motor",
    name: "Motor & Injeção",
    slug: "motor-e-injecao",
    description: "Filtros, velas, correias, bombas e componentes de injeção eletrônica.",
    active: true,
    order: 4,
  },
];

const MOCK_PRODUCTS: Product[] = [
  {
    id: "prod-1",
    name: "Bateria Automotiva 60Ah Selada",
    sku: "BAT-60AH-01",
    description: "Alta durabilidade, livre de manutenção, garantia estendida de 18 meses.",
    categoryId: "cat-baterias",
    categoryName: "Baterias Automotivas",
    price: 420.0,
    inStock: true,
    featured: true,
    brand: "Linha Premium",
    specifications: [
      { name: "Amperagem", value: "60 Ah" },
      { name: "Tensão", value: "12V" },
      { name: "Garantia", value: "18 meses" },
    ],
  },
  {
    id: "prod-2",
    name: "Jogo de Pastilhas de Freio Dianteiro",
    sku: "FRE-PAS-02",
    description: "Composto cerâmico de alto rendimento, menor desgaste e frenagem silenciosa.",
    categoryId: "cat-freios",
    categoryName: "Sistema de Freios",
    price: 185.0,
    inStock: true,
    featured: true,
    brand: "Top Brake",
    specifications: [
      { name: "Posição", value: "Dianteira" },
      { name: "Material", value: "Semi-metálica" },
    ],
  },
  {
    id: "prod-3",
    name: "Kit Amortecedor Dianteiro com Coxim",
    sku: "SUS-AMO-03",
    description: "Pressurizado a gás, maior estabilidade e conforto em todos os terrenos.",
    categoryId: "cat-suspensao",
    categoryName: "Suspensão & Direção",
    price: 360.0,
    inStock: true,
    featured: true,
    brand: "Max Ride",
    specifications: [
      { name: "Tipo", value: "Pressurizado a gás" },
      { name: "Garantia", value: "24 meses" },
    ],
  },
  {
    id: "prod-4",
    name: "Kit Filtros de Óleo, Ar e Combustível",
    sku: "MOT-FIL-04",
    description: "Filtração de alta eficiência para proteção e performance do motor.",
    categoryId: "cat-motor",
    categoryName: "Motor & Injeção",
    price: 130.0,
    inStock: true,
    featured: true,
    brand: "FilterPro",
    specifications: [
      { name: "Aplicação", value: "Linha Leve Flex" },
      { name: "Itens", value: "3 Filtros" },
    ],
  },
];

/**
 * Service abstraction layer.
 * In future phases, these methods will read directly from Firebase Firestore.
 */
export async function getCategories(): Promise<Category[]> {
  return MOCK_CATEGORIES.filter((c) => c.active).sort((a, b) => a.order - b.order);
}

export async function getFeaturedProducts(): Promise<Product[]> {
  return MOCK_PRODUCTS.filter((p) => p.featured);
}

export async function getProductsByCategory(categoryId: string): Promise<Product[]> {
  return MOCK_PRODUCTS.filter((p) => p.categoryId === categoryId);
}
