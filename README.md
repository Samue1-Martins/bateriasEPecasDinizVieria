# Auto Peças Diniz Vieira

Site institucional e catálogo público de autopeças e baterias com direcionamento consultivo para atendimento via WhatsApp.

---

## 🛠️ Tecnologias Utilizadas
- **Framework:** Next.js 16 (App Router com suporte a Partial Prerendering)
- **Biblioteca Base:** React 19 / React DOM 19
- **Linguagem:** TypeScript 5
- **Estilização:** Tailwind CSS v4 & shadcn/ui
- **Ícones:** Lucide React
- **Tipografia:** Manrope
- **Qualidade de Código:** ESLint 9 & TypeScript Compiler

---

## 📁 Estrutura de Arquitetura

```text
src/
├── app/
│   ├── layout.tsx              # Layout raiz com fontes e metadados
│   ├── page.tsx                # Página Inicial (Landing Page completa)
│   ├── about/page.tsx          # Página Quem Somos
│   ├── catalog/
│   │   ├── page.tsx            # Catálogo Público (Server Component)
│   │   └── CatalogContent.tsx  # Busca, filtros de categoria e ordenação (Client Component)
│   └── catalog/[slug]/
│       ├── page.tsx            # Detalhes do Produto (generateStaticParams + SSR)
│       └── ProductGallery.tsx  # Galeria com troca interativa de fotos
├── components/
│   ├── ui/                     # Primitivos shadcn/ui (Button, card, input, etc.)
│   ├── layout/                 # Header e Footer institucionais
│   ├── home/                   # HeroSection, AboutSection, ContactSection
│   ├── categories/             # CategoryCard e CategoriesSection
│   └── products/               # ProductCard e FeaturedProductsSection
├── data/
│   ├── demo-categories.ts      # 7 categorias demonstrativas
│   ├── demo-products.ts        # 13 produtos demonstrativos completos
│   └── index.ts
├── services/
│   └── products.service.ts     # Camada de abstração de dados (preparada para Firebase)
├── types/
│   ├── product.ts              # Contrato de dados de Produto e Filtros
│   ├── category.ts             # Contrato de dados de Categoria
│   └── company.ts              # Informações institucionais da empresa
└── lib/
    ├── constants.ts            # Centralizador do WhatsApp oficial e dados da empresa
    └── utils.ts                # Helper cn (clsx + tailwind-merge)
```

---

## 📱 Centralização do WhatsApp
Todo o fluxo de contato com a empresa utiliza o número oficial único:
- **Número Internacional:** `5531988012447`
- **Exibição:** `+55 (31) 98801-2447`
- **Helper Centralizado:** `buildWhatsAppLink(message)` em `src/lib/constants.ts`
- **Mensagens dinâmicas:** `WHATSAPP_MESSAGES.productInquiry(nome, marca)` gera o texto contextualizado por produto.

---

## 📦 Catálogo Demonstrativo e Avisos
O projeto conta com 13 produtos distribuídos nas 7 categorias oficiais. Como os preços, especificações e estoque são fictícios para homologação da interface, todos os pontos de contato exibem um aviso visual transparente ao visitante:
> *"Catálogo demonstrativo. Produtos, preços e disponibilidade são ilustrativos. Consulte nossa equipe pelo WhatsApp para confirmar as informações reais."*

---

## 🖼️ Organização de Imagens e Ativos Locais
- Imagens institucionais: `public/images/general/`
- Imagens de produtos: `public/images/products/`
- Documentação de licenças e fontes: `public/images/ASSET_SOURCES.md`

---

## 🚀 Preparação para Integração Futura com Firebase
A camada `src/services/products.service.ts` atua como uma interface agnóstica (`getCategories`, `getProducts`, `getProductBySlug`, `getFeaturedProducts`, `getRelatedProducts`). 
Para conectar o **Cloud Firestore** na próxima etapa, bastará apontar esses métodos para as coleções correspondentes sem necessidade de alterar as páginas e componentes visuais.

---

## 🧪 Scripts Disponíveis
```bash
# Executar em modo desenvolvimento
npm run dev

# Validação de código com ESLint
npm run lint

# Checagem estrita de tipos TypeScript
npx tsc --noEmit

# Compilação otimizada de produção
npm run build
```
