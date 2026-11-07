# Auto Peças Diniz Vieira — Portal Institucional & Catálogo

Site institucional e catálogo público de produtos e baterias automotivas para a **Auto Peças Diniz Vieira**, com direcionamento de clientes para atendimento consultivo via WhatsApp.

---

## 🛠 Tecnologias Utilizadas

- **[Next.js](https://nextjs.org/)** (v16.4.5) — Framework React com App Router e Server Components.
- **[React](https://react.dev/)** (v19.3.0) — Biblioteca para construção de interfaces reativas.
- **[TypeScript](https://www.typescriptlang.org/)** (v5) — Tipagem estática rigorosa para escalabilidade e segurança.
- **[Tailwind CSS](https://tailwindcss.com/)** (v4) — Framework de estilização baseado em classes utilitárias e variáveis semânticas.
- **[ESLint](https://eslint.org/)** (v9) — Padronização de código e garantia de boas práticas.
- **Firebase** *(Próxima etapa)* — Integração planejada para armazenamento de dados do catálogo e imagens via Firestore / Storage.

---

## 🎨 Identidade Visual

O projeto foi configurado com a paleta oficial da Auto Peças Diniz Vieira:

| Cor | Hex | Token Tailwind | CSS Variable |
| :--- | :--- | :--- | :--- |
| **Preto** | `#151515` | `bg-brand-black` / `text-brand-black` | `--brand-black` |
| **Branco** | `#FFFFFF` | `bg-brand-white` / `text-brand-white` | `--brand-white` |
| **Vermelho** | `#D62828` | `bg-brand-red` / `text-brand-red` | `--brand-red` |
| **Amarelo** | `#F4C542` | `bg-brand-yellow` / `text-brand-yellow` | `--brand-yellow` |
| **Cinza Claro** | `#F5F5F5` | `bg-brand-gray` / `text-brand-gray` | `--brand-gray` |

Tipografia padrão: **Inter** (carregada via `next/font/google` com fallback do sistema).

---

## 📋 Pré-requisitos

Antes de iniciar, certifique-se de possuir em seu ambiente:

- **Node.js**: versão `18.18+` ou `20+` (desenvolvido e testado no Node `v25.8.0`).
- **npm**: versão `9+` ou `11+` (ou gerenciador compatível).
- **Git** instalado.

---

## 🚀 Instalação e Execução

### 1. Clonar ou acessar o repositório
```bash
git clone <url-do-repositorio>
cd bateriasEPecasDinizVieria
```

### 2. Instalar as dependências
```bash
npm install
```

### 3. Executar o servidor de desenvolvimento
```bash
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000) no navegador para visualizar a aplicação.

---

## 💻 Comandos Disponíveis

| Comando | Descrição |
| :--- | :--- |
| `npm run dev` | Inicia o servidor local de desenvolvimento na porta `3000`. |
| `npm run build` | Compila e gera o build otimizado de produção. |
| `npm run start` | Inicia o servidor de produção local após o build. |
| `npm run lint` | Executa a verificação estática do ESLint no código fonte. |
| `npx tsc --noEmit` | Valida todos os tipos TypeScript sem gerar arquivos de saída. |

---

## 📂 Estrutura de Pastas

O projeto adota uma arquitetura modular estruturada sob o diretório `src/`:

```text
bateriasEPecasDinizVieria/
├── public/                 # Arquivos estáticos públicos (favicons, imagens estáticas)
├── src/
│   ├── app/                # App Router do Next.js
│   │   ├── favicon.ico     # Ícone da aplicação
│   │   ├── globals.css     # Estilos globais e tokens de cores do Tailwind v4
│   │   ├── layout.tsx      # Layout raiz com configuração de fonte e metadados
│   │   └── page.tsx        # Página inicial provisória com validação visual
│   │
│   ├── components/         # Componentes React reutilizáveis
│   │   ├── categories/     # Componentes de exibição de categorias (CategoryCard)
│   │   ├── layout/         # Componentes de estrutura (Header, Footer)
│   │   ├── products/       # Componentes de exibição de produtos (ProductCard)
│   │   └── ui/             # Primitivos de UI (Button, Badge)
│   │
│   ├── lib/                # Constantes, configurações e funções utilitárias
│   │   ├── constants.ts    # Dados da empresa, contatos, paleta e rotas
│   │   └── utils.ts        # Utilitários (formatCurrency, cn)
│   │
│   ├── services/           # Camada de serviços (preparada para integração Firebase)
│   │   ├── products.service.ts # Contrato e serviços de produtos/categorias
│   │   └── index.ts
│   │
│   ├── types/              # Definições de tipos e interfaces TypeScript
│   │   ├── category.ts     # Interfaces de Categoria
│   │   ├── company.ts      # Interfaces institucionais da empresa
│   │   ├── product.ts      # Interfaces de Produto e filtros
│   │   └── index.ts
│   │
│   └── assets/             # Constantes de ativos e referências a imagens
│       └── index.ts
│
├── .gitignore              # Arquivos e diretórios ignorados pelo Git
├── AGENTS.md               # Instruções e diretrizes de agentes Next.js
├── eslint.config.mjs       # Configuração moderna do ESLint 9 (Flat Config)
├── next.config.ts          # Configurações do Next.js
├── package.json            # Metadados e dependências do projeto
├── README.md               # Documentação principal do projeto
└── tsconfig.json           # Configuração do compilador TypeScript e alias `@/*`
```

---

## 🔒 Regras de Negócio & Escopo

Nesta fase de infraestrutura e ambiente inicial:
- Apenas funcionalidades públicas e de catálogo informativo.
- Sem e-commerce, carrinho, pagamentos ou autenticação de usuários.
- Atendimento e cotações realizados via integração com links diretos do WhatsApp.
- Base de dados futura configurada para conectar com Firebase Firestore e Storage.
