# Auto Peças Diniz Vieira — Portal Institucional & Catálogo

Site institucional e catálogo público de produtos e baterias automotivas para a **Auto Peças Diniz Vieira**, com direcionamento de clientes para atendimento consultivo via WhatsApp.

---

## 🛠 Tecnologias Utilizadas

- **[Next.js](https://nextjs.org/)** (v16.4.5) — Framework React com App Router e Server Components.
- **[React](https://react.dev/)** (v19.3.0) — Biblioteca para construção de interfaces reativas.
- **[TypeScript](https://www.typescriptlang.org/)** (v5) — Tipagem estática rigorosa para escalabilidade e segurança.
- **[Tailwind CSS](https://tailwindcss.com/)** (v4) — Framework de estilização baseado em classes utilitárias e variáveis semânticas.
- **[shadcn/ui](https://ui.shadcn.com/)** (v4) — Coleção de componentes acessíveis e customizáveis baseados em `@base-ui/react`.
- **[Lucide React](https://lucide.dev/)** — Biblioteca moderna de ícones vetoriais.
- **[ESLint](https://eslint.org/)** (v9) — Padronização de código e garantia de boas práticas.
- **Firebase** *(Próxima etapa)* — Integração planejada para armazenamento de dados do catálogo e imagens via Firestore / Storage.

---

## 🎨 Identidade Visual & Design System

### Paleta de Cores Oficial

| Cor | Hex | Token Tailwind | Variável Semântica shadcn/ui | Utilização |
| :--- | :--- | :--- | :--- | :--- |
| **Preto** | `#151515` | `bg-brand-black` / `text-brand-black` | `--foreground` | Textos e elementos de destaque |
| **Branco** | `#FFFFFF` | `bg-brand-white` / `text-brand-white` | `--background`, `--card` | Fundo principal da aplicação |
| **Vermelho** | `#D62828` | `bg-brand-red` / `text-brand-red` | `--primary`, `--ring` | Botões e ações principais (CTA) |
| **Amarelo** | `#F4C542` | `bg-brand-yellow` / `text-brand-yellow` | `--secondary`, `--accent` | Destaques, badges e etiquetas |
| **Cinza Claro** | `#F5F5F5` | `bg-brand-gray` / `text-brand-gray` | `--muted` | Fundos secundários e cartões |

### Tipografia
- Fonte principal: **Manrope** (pesos 400 a 800 carregados via `next/font/google` com display `swap` e fallbacks de sistema).

---

## 🧩 Componentes de Interface (shadcn/ui)

Componentes instalados e centralizados em `src/components/ui`:
- **Button:** Variantes `default` (vermelho), `secondary` (amarelo), `outline`, `whatsapp`, `destructive`, `ghost` e tamanhos `sm`, `default`, `lg`.
- **Card:** `Card`, `CardHeader`, `CardTitle`, `CardDescription`, `CardContent`, `CardFooter`.
- **Badge:** Etiquetas semânticas com suporte a variantes `default`, `secondary`, `outline`, `dark` e `gray`.
- **Input:** Campo de entrada com foco tematizado na identidade da marca.
- **Separator:** Divisor horizontal e vertical acessível.

### Ícones Padronizados (Lucide React)
- `Wrench` — Serviços, oficina e ferramentas.
- `BatteryCharging` — Baterias e sistema elétrico.
- `Droplet` — Óleos, lubrificantes e fluidos.
- `Search` — Busca e filtros de catálogo.
- `Phone` — Telefonia e contato direto.
- `ArrowRight` — Navegação e direcionamento.

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

### 4. Guia Visual / Teste de Componentes
Acesse a rota interna de desenvolvimento:
```
http://localhost:3000/ui-preview
```
*(Esta rota é restrita a homologação visual e não é exibida na navegação pública).*

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

```text
bateriasEPecasDinizVieria/
├── public/                 # Arquivos estáticos públicos
├── src/
│   ├── app/                # App Router do Next.js
│   │   ├── ui-preview/     # Página de testes visuais e Design System (/ui-preview)
│   │   ├── favicon.ico     # Ícone da aplicação
│   │   ├── globals.css     # Estilos globais e tokens semânticos do shadcn/Tailwind v4
│   │   ├── layout.tsx      # Layout raiz com configuração global da fonte Manrope
│   │   └── page.tsx        # Página inicial provisória com validação visual
│   │
│   ├── components/         # Componentes React reutilizáveis
│   │   ├── categories/     # Componentes de exibição de categorias
│   │   ├── layout/         # Componentes estruturais (Header, Footer)
│   │   ├── products/       # Componentes de produtos (ProductCard)
│   │   └── ui/             # Primitivos shadcn/ui (Button, Card, Badge, Input, Separator)
│   │
│   ├── lib/                # Constantes, dados institucionais e utilitários (cn, formatCurrency)
│   ├── services/           # Camada de serviços preparada para Firebase
│   ├── types/              # Interfaces TypeScript de produtos, categorias e empresa
│   └── assets/             # Mapeamento de recursos gráficos
│
├── components.json         # Configuração oficial do shadcn/ui
├── eslint.config.mjs       # Configuração do ESLint 9
├── next.config.ts          # Configurações do Next.js
├── package.json            # Metadados e dependências do projeto
├── README.md               # Documentação principal do projeto
└── tsconfig.json           # Configuração TypeScript e alias `@/*`
```
