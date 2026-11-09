import React from "react";
import type { Metadata } from "next";
import {
  Wrench,
  BatteryCharging,
  Droplet,
  Search,
  Phone,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  Info,
} from "lucide-react";
import {
  Button,
  Badge,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  Input,
  Separator,
} from "@/components/ui";

export const metadata: Metadata = {
  title: "UI Preview & Design System | Auto Peças Diniz Vieira",
  description:
    "Página interna de teste e validação de componentes, tipografia e identidade visual.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function UiPreviewPage() {
  return (
    <div className="min-h-screen bg-muted/40 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Header da Página de Teste */}
        <header className="bg-card rounded-2xl p-6 sm:p-8 border shadow-xs space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary text-primary-foreground font-black text-xl flex items-center justify-center">
                DV
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
                  Auto Peças Diniz Vieira
                </h1>
                <p className="text-xs text-muted-foreground">
                  EPIC 02 — Guia Visual e Teste de Componentes de Interface
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="gap-1.5 py-1 px-3">
                <Sparkles className="size-3.5" />
                <span>Rota Interna: /ui-preview</span>
              </Badge>
              <Badge variant="outline" className="py-1 px-3">
                v0.2.0
              </Badge>
            </div>
          </div>
          <Separator />
          <p className="text-sm text-muted-foreground leading-relaxed">
            Esta página serve como ambiente de homologação técnica para validar a
            integração do <strong>shadcn/ui</strong>, biblioteca de ícones{" "}
            <strong>Lucide React</strong>, tipografia <strong>Manrope</strong> e as
            variáveis semânticas de cores oficiais da marca.
          </p>
        </header>

        {/* 1. SEÇÃO DE TIPOGRAFIA (MANROPE) */}
        <section className="bg-card rounded-2xl p-6 sm:p-8 border shadow-xs space-y-6">
          <div className="space-y-1">
            <h2 className="text-xl sm:text-2xl font-bold text-foreground flex items-center gap-2">
              <span>1. Tipografia — Fonte Manrope</span>
            </h2>
            <p className="text-xs text-muted-foreground">
              Configurada globalmente através de <code>next/font/google</code> com pesos 400 a 800 e fallbacks de sistema.
            </p>
          </div>
          <Separator />

          <div className="space-y-6">
            <div className="space-y-1 border-b pb-4">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-primary">
                Título Principal (Heading 1 — 800 ExtraBold)
              </span>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-foreground tracking-tight">
                Potência, Confiança e Tradição em Peças Automotivas
              </h1>
            </div>

            <div className="space-y-1 border-b pb-4">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-primary">
                Subtítulo de Seção (Heading 2 — 700 Bold)
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-foreground tracking-tight">
                Catálogo Especializado de Baterias e Acessórios
              </h2>
            </div>

            <div className="space-y-1 border-b pb-4">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-primary">
                Subtítulo de Card ou Módulo (Heading 3 — 600 SemiBold)
              </span>
              <h3 className="text-xl font-semibold text-foreground">
                Atendimento Técnico Consultivo e Peças de Primeira Linha
              </h3>
            </div>

            <div className="space-y-1 border-b pb-4">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-primary">
                Texto de Corpo (Body Text — 400 Regular / 500 Medium)
              </span>
              <p className="text-sm sm:text-base text-foreground leading-relaxed">
                A Auto Peças Diniz Vieira disponibiliza uma ampla variedade de componentes
                automotivos para veículos de passeio, comerciais leves e pesados. Nossa equipe
                é treinada para identificar a peça exata para a necessidade do seu veículo,
                assegurando agilidade e segurança na sua manutenção preventiva ou corretiva.
              </p>
            </div>

            <div className="space-y-1">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-primary">
                Texto Auxiliar / Legenda (Caption & Muted Text — 400 Regular)
              </span>
              <p className="text-xs text-muted-foreground">
                * As imagens, valores e especificações apresentados são para fins de testes de interface. Consulte a disponibilidade em tempo real via WhatsApp.
              </p>
            </div>
          </div>
        </section>

        {/* 2. SEÇÃO DE CORES DA IDENTIDADE VISUAL */}
        <section className="bg-card rounded-2xl p-6 sm:p-8 border shadow-xs space-y-6">
          <div className="space-y-1">
            <h2 className="text-xl sm:text-2xl font-bold text-foreground">
              2. Cores da Identidade Visual
            </h2>
            <p className="text-xs text-muted-foreground">
              Variáveis semânticas configuradas no Tailwind CSS v4 e mapeadas no shadcn/ui.
            </p>
          </div>
          <Separator />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {/* Preto */}
            <div className="rounded-xl border bg-[#151515] text-white p-4 flex flex-col justify-between shadow-xs h-32">
              <div>
                <span className="text-[10px] uppercase font-bold tracking-wider text-gray-400">
                  Preto
                </span>
                <p className="text-xl font-black mt-1">#151515</p>
              </div>
              <div className="text-[11px] text-gray-300">
                Textos e elementos de destaque
              </div>
            </div>

            {/* Branco */}
            <div className="rounded-xl border border-gray-300 bg-[#FFFFFF] text-[#151515] p-4 flex flex-col justify-between shadow-xs h-32">
              <div>
                <span className="text-[10px] uppercase font-bold tracking-wider text-gray-500">
                  Branco
                </span>
                <p className="text-xl font-black mt-1">#FFFFFF</p>
              </div>
              <div className="text-[11px] text-gray-600">
                Fundo principal da aplicação
              </div>
            </div>

            {/* Vermelho */}
            <div className="rounded-xl border border-red-700 bg-[#D62828] text-white p-4 flex flex-col justify-between shadow-xs h-32">
              <div>
                <span className="text-[10px] uppercase font-bold tracking-wider text-red-200">
                  Vermelho (Primary)
                </span>
                <p className="text-xl font-black mt-1">#D62828</p>
              </div>
              <div className="text-[11px] text-red-100">
                Botões e ações principais (CTA)
              </div>
            </div>

            {/* Amarelo */}
            <div className="rounded-xl border border-yellow-500 bg-[#F4C542] text-[#151515] p-4 flex flex-col justify-between shadow-xs h-32">
              <div>
                <span className="text-[10px] uppercase font-bold tracking-wider text-neutral-800">
                  Amarelo (Secondary)
                </span>
                <p className="text-xl font-black mt-1">#F4C542</p>
              </div>
              <div className="text-[11px] text-neutral-800 font-medium">
                Destaques, etiquetas e alertas
              </div>
            </div>

            {/* Cinza Claro */}
            <div className="rounded-xl border border-gray-300 bg-[#F5F5F5] text-[#151515] p-4 flex flex-col justify-between shadow-xs h-32">
              <div>
                <span className="text-[10px] uppercase font-bold tracking-wider text-gray-500">
                  Cinza Claro (Muted)
                </span>
                <p className="text-xl font-black mt-1">#F5F5F5</p>
              </div>
              <div className="text-[11px] text-gray-600">
                Fundos secundários e seções
              </div>
            </div>
          </div>
        </section>

        {/* 3. SEÇÃO DE BOTÕES (SHADCN/UI) */}
        <section className="bg-card rounded-2xl p-6 sm:p-8 border shadow-xs space-y-6">
          <div className="space-y-1">
            <h2 className="text-xl sm:text-2xl font-bold text-foreground">
              3. Botões — Componente Button
            </h2>
            <p className="text-xs text-muted-foreground">
              Variantes do botão do shadcn/ui configuradas com os tokens da Auto Peças Diniz Vieira.
            </p>
          </div>
          <Separator />

          <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-3">
              {/* Botão Primário */}
              <Button variant="default">
                <span>Botão Primário</span>
              </Button>

              {/* Botão Secundário */}
              <Button variant="secondary">
                <span>Botão Secundário</span>
              </Button>

              {/* Botão Outline */}
              <Button variant="outline">
                <span>Botão Outline</span>
              </Button>

              {/* Botão Desabilitado */}
              <Button disabled variant="default">
                <span>Botão Desabilitado</span>
              </Button>

              {/* Botão WhatsApp */}
              <Button variant="whatsapp" className="gap-2">
                <Phone className="size-4" />
                <span>Atendimento WhatsApp</span>
              </Button>

              {/* Botão Destrutivo */}
              <Button variant="destructive">
                <span>Destrutivo</span>
              </Button>

              {/* Botão Ghost */}
              <Button variant="ghost">
                <span>Ghost</span>
              </Button>
            </div>

            <div className="pt-2">
              <span className="text-xs font-semibold text-muted-foreground block mb-2">
                Tamanhos Disponíveis (com ícones de ação):
              </span>
              <div className="flex flex-wrap items-center gap-3">
                <Button size="sm" variant="default" className="gap-1.5">
                  <Search className="size-3.5" />
                  <span>Pequeno (sm)</span>
                </Button>
                <Button size="default" variant="default" className="gap-2">
                  <Wrench className="size-4" />
                  <span>Médio Padrão (default)</span>
                  <ArrowRight className="size-4" />
                </Button>
                <Button size="lg" variant="default" className="gap-2">
                  <BatteryCharging className="size-5" />
                  <span>Grande (lg)</span>
                  <ArrowRight className="size-5" />
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* 4. SEÇÃO DE ÍCONES LUCIDE REACT */}
        <section className="bg-card rounded-2xl p-6 sm:p-8 border shadow-xs space-y-6">
          <div className="space-y-1">
            <h2 className="text-xl sm:text-2xl font-bold text-foreground">
              4. Ícones — Lucide React
            </h2>
            <p className="text-xs text-muted-foreground">
              Conjunto de ícones especificados com padrão unificado de tamanho (20px), espessura (2px) e alinhamento centralizado.
            </p>
          </div>
          <Separator />

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {/* Wrench */}
            <div className="p-4 rounded-xl border bg-muted/30 flex flex-col items-center justify-center text-center gap-2 hover:border-primary transition-colors">
              <div className="w-12 h-12 rounded-lg bg-background border flex items-center justify-center text-primary shadow-2xs">
                <Wrench className="size-6" strokeWidth={2} />
              </div>
              <span className="text-xs font-bold text-foreground">Wrench</span>
              <span className="text-[10px] text-muted-foreground">Peças & Oficina</span>
            </div>

            {/* BatteryCharging */}
            <div className="p-4 rounded-xl border bg-muted/30 flex flex-col items-center justify-center text-center gap-2 hover:border-primary transition-colors">
              <div className="w-12 h-12 rounded-lg bg-background border flex items-center justify-center text-[#F4C542] shadow-2xs">
                <BatteryCharging className="size-6 text-[#151515]" strokeWidth={2} />
              </div>
              <span className="text-xs font-bold text-foreground">BatteryCharging</span>
              <span className="text-[10px] text-muted-foreground">Baterias & Carga</span>
            </div>

            {/* Droplet */}
            <div className="p-4 rounded-xl border bg-muted/30 flex flex-col items-center justify-center text-center gap-2 hover:border-primary transition-colors">
              <div className="w-12 h-12 rounded-lg bg-background border flex items-center justify-center text-primary shadow-2xs">
                <Droplet className="size-6" strokeWidth={2} />
              </div>
              <span className="text-xs font-bold text-foreground">Droplet</span>
              <span className="text-[10px] text-muted-foreground">Óleos & Fluidos</span>
            </div>

            {/* Search */}
            <div className="p-4 rounded-xl border bg-muted/30 flex flex-col items-center justify-center text-center gap-2 hover:border-primary transition-colors">
              <div className="w-12 h-12 rounded-lg bg-background border flex items-center justify-center text-foreground shadow-2xs">
                <Search className="size-6" strokeWidth={2} />
              </div>
              <span className="text-xs font-bold text-foreground">Search</span>
              <span className="text-[10px] text-muted-foreground">Busca no Catálogo</span>
            </div>

            {/* Phone */}
            <div className="p-4 rounded-xl border bg-muted/30 flex flex-col items-center justify-center text-center gap-2 hover:border-primary transition-colors">
              <div className="w-12 h-12 rounded-lg bg-background border flex items-center justify-center text-[#25D366] shadow-2xs">
                <Phone className="size-6" strokeWidth={2} />
              </div>
              <span className="text-xs font-bold text-foreground">Phone</span>
              <span className="text-[10px] text-muted-foreground">Telefone & Contato</span>
            </div>

            {/* ArrowRight */}
            <div className="p-4 rounded-xl border bg-muted/30 flex flex-col items-center justify-center text-center gap-2 hover:border-primary transition-colors">
              <div className="w-12 h-12 rounded-lg bg-background border flex items-center justify-center text-primary shadow-2xs">
                <ArrowRight className="size-6" strokeWidth={2} />
              </div>
              <span className="text-xs font-bold text-foreground">ArrowRight</span>
              <span className="text-[10px] text-muted-foreground">Navegação & Links</span>
            </div>
          </div>
        </section>

        {/* 5. SEÇÃO DE INPUT, BADGE E SEPARATOR */}
        <section className="bg-card rounded-2xl p-6 sm:p-8 border shadow-xs space-y-6">
          <div className="space-y-1">
            <h2 className="text-xl sm:text-2xl font-bold text-foreground">
              5. Outros Componentes — Input, Badge & Separator
            </h2>
            <p className="text-xs text-muted-foreground">
              Campos de busca com ícone e etiquetas de disponibilidade.
            </p>
          </div>
          <Separator />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            {/* Campo de Busca (Input) */}
            <div className="space-y-3">
              <label htmlFor="catalog-search" className="text-xs font-bold uppercase text-foreground">
                Campo de Busca no Catálogo
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-muted-foreground">
                  <Search className="size-4" />
                </div>
                <Input
                  id="catalog-search"
                  type="text"
                  placeholder="Buscar peça por nome, código ou categoria (ex: 60Ah, pastilha)..."
                  className="pl-9 h-10 bg-background"
                />
              </div>
              <p className="text-[11px] text-muted-foreground">
                Componente <code>Input</code> estilizado com focus ring na cor primária da marca.
              </p>
            </div>

            {/* Badges de Disponibilidade */}
            <div className="space-y-3">
              <span className="text-xs font-bold uppercase text-foreground block">
                Badges de Disponibilidade e Categorização
              </span>
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant="default" className="gap-1">
                  <ShieldCheck className="size-3" />
                  <span>Em Estoque (Primary)</span>
                </Badge>

                <Badge variant="secondary" className="gap-1">
                  <span>Destaque da Semana</span>
                </Badge>

                <Badge variant="outline">
                  <span>Sob Encomenda</span>
                </Badge>

                <Badge variant="gray">
                  <span>Linha Pesada</span>
                </Badge>

                <Badge variant="dark">
                  <span>Garantia 18 Meses</span>
                </Badge>
              </div>
              <p className="text-[11px] text-muted-foreground">
                Variantes de cor semânticas para identificação rápida do estado dos produtos.
              </p>
            </div>
          </div>
        </section>

        {/* 6. SEÇÃO DE CARDS (SHADCN/UI) */}
        <section className="bg-card rounded-2xl p-6 sm:p-8 border shadow-xs space-y-6">
          <div className="space-y-1">
            <h2 className="text-xl sm:text-2xl font-bold text-foreground">
              6. Cards — Componente Card
            </h2>
            <p className="text-xs text-muted-foreground">
              Demonstração dos 3 tipos solicitados: institucional, categoria automotiva e demonstrativo de produto.
            </p>
          </div>
          <Separator />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Card 1: Institucional */}
            <Card className="flex flex-col justify-between border-t-4 border-t-primary shadow-xs">
              <CardHeader>
                <div className="flex items-center gap-2 text-primary mb-1">
                  <Info className="size-4" />
                  <span className="text-xs font-bold uppercase tracking-wider">
                    Institucional
                  </span>
                </div>
                <CardTitle className="text-lg font-bold">
                  Tradição Diniz Vieira
                </CardTitle>
                <CardDescription>
                  Compromisso com honestidade e peças originais
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2 text-xs text-muted-foreground leading-relaxed">
                <p>
                  Com anos de experiência consolidada no setor automotivo, oferecemos
                  atendimento de excelência e suporte técnico qualificado para cada modelo de veículo.
                </p>
                <div className="pt-2 border-t text-[11px] space-y-1 text-foreground">
                  <p><strong>Local:</strong> Atendimento regional e balcão</p>
                  <p><strong>Horário:</strong> Seg. a Sex. 08h às 18h | Sáb. até 13h</p>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" size="sm" className="w-full gap-2">
                  <span>Saiba Mais Sobre Nós</span>
                  <ArrowRight className="size-3.5" />
                </Button>
              </CardFooter>
            </Card>

            {/* Card 2: Categoria Automotiva */}
            <Card className="flex flex-col justify-between border-t-4 border-t-secondary shadow-xs group hover:border-primary transition-colors">
              <CardHeader>
                <div className="flex items-center justify-between mb-1">
                  <div className="w-9 h-9 rounded-lg bg-secondary/30 text-foreground flex items-center justify-center font-bold">
                    <BatteryCharging className="size-5 text-[#151515]" />
                  </div>
                  <Badge variant="secondary">Principal</Badge>
                </div>
                <CardTitle className="text-lg font-bold group-hover:text-primary transition-colors">
                  Linha de Baterias
                </CardTitle>
                <CardDescription>
                  Veículos leves, comerciais e motocicletas
                </CardDescription>
              </CardHeader>
              <CardContent className="text-xs text-muted-foreground leading-relaxed">
                <p>
                  Baterias seladas de alta performance, livres de manutenção e com garantia de até 24 meses das principais fabricantes do mercado.
                </p>
                <div className="mt-3 bg-muted p-2.5 rounded-lg flex justify-between items-center text-xs">
                  <span className="font-medium text-foreground">Modelos disponíveis:</span>
                  <span className="font-bold text-primary">45Ah a 100Ah</span>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="default" size="sm" className="w-full gap-2">
                  <span>Ver Todos os Itens</span>
                  <ArrowRight className="size-3.5" />
                </Button>
              </CardFooter>
            </Card>

            {/* Card 3: Demonstrativo de Produto */}
            <Card className="flex flex-col justify-between border shadow-xs overflow-hidden">
              <div className="bg-[#151515] p-3 text-white flex items-center justify-between border-b-2 border-primary">
                <span className="text-[11px] font-bold text-gray-300">DEMO • PRODUTO</span>
                <Badge variant="secondary">Pronta Entrega</Badge>
              </div>
              <CardHeader className="pt-4">
                <div className="text-[11px] text-primary font-bold uppercase tracking-wider">
                  Bateria Automotiva
                </div>
                <CardTitle className="text-base font-bold">
                  Bateria 60Ah Selada Livre de Manutenção
                </CardTitle>
                <CardDescription className="text-xs">
                  Alta durabilidade com tecnologia de liga de prata
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="bg-muted p-2 rounded-md space-y-1 text-xs">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Tensão:</span>
                    <span className="font-semibold text-foreground">12V</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Capacidade:</span>
                    <span className="font-semibold text-foreground">60 Ah</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Garantia:</span>
                    <span className="font-semibold text-foreground">18 meses</span>
                  </div>
                </div>
                <div className="flex items-baseline justify-between pt-1">
                  <span className="text-xs text-muted-foreground">Valor sugerido:</span>
                  <span className="text-lg font-black text-foreground">R$ 420,00</span>
                </div>
              </CardContent>
              <CardFooter className="pt-0">
                <Button variant="whatsapp" size="sm" className="w-full gap-2">
                  <Phone className="size-3.5" />
                  <span>Cotar no WhatsApp</span>
                </Button>
              </CardFooter>
            </Card>
          </div>
        </section>

        {/* Rodapé Informativo da Rota de Demonstração */}
        <footer className="text-center text-xs text-muted-foreground py-4 border-t space-y-1">
          <p>
            <strong>Ambiente Interno de Homologação Visual</strong> — Auto Peças Diniz Vieira.
          </p>
          <p>
            Esta rota (<code>/ui-preview</code>) foi desenvolvida exclusivamente para testes de layout e não faz parte da navegação do cliente final.
          </p>
        </footer>
      </div>
    </div>
  );
}

