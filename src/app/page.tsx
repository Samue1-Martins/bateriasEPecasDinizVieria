import React from "react";
import { Header, Footer } from "@/components/layout";
import { Badge, Button } from "@/components/ui";
import { CategoryCard } from "@/components/categories";
import { ProductCard } from "@/components/products";
import { getCategories, getFeaturedProducts } from "@/services";
import { COMPANY_DETAILS, buildWhatsAppLink } from "@/lib/constants";

export default async function HomePage() {
  const categories = await getCategories();
  const featuredProducts = await getFeaturedProducts();
  const whatsappUrl = buildWhatsAppLink(
    "Olá! Estou visitando a página inicial da Auto Peças Diniz Vieira."
  );

  return (
    <div className="min-h-screen flex flex-col bg-[#F5F5F5]">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section
          id="inicio"
          className="relative bg-[#151515] text-white py-16 sm:py-24 border-b-4 border-[#F4C542]"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl space-y-6">
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant="secondary">EPIC Concluído: Ambiente Configurado</Badge>
                <Badge variant="primary">Next.js + TypeScript + Tailwind CSS</Badge>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight">
                Auto Peças <span className="text-[#F4C542]">Diniz Vieira</span>
              </h1>

              <p className="text-base sm:text-lg text-gray-300 leading-relaxed">
                Bem-vindo ao ambiente de desenvolvimento do novo portal
                institucional e catálogo digital da{" "}
                <strong className="text-white">Auto Peças Diniz Vieira</strong>.
                Estrutura modular, escalável e pronta para receber as próximas etapas do projeto.
              </p>

              <div className="flex flex-wrap gap-3 pt-2">
                <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                  <Button variant="whatsapp" size="lg" className="gap-2">
                    <span>Atendimento via WhatsApp</span>
                  </Button>
                </a>
                <a href="#identidade">
                  <Button
                    variant="outline"
                    size="lg"
                    className="border-white text-white hover:bg-white hover:text-[#151515]"
                  >
                    Identidade Visual & Configuração
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Brand Palette Validation Section */}
        <section id="identidade" className="py-12 bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-6">
              <h2 className="text-xl sm:text-2xl font-bold text-[#151515]">
                Identidade Visual Obrigatória
              </h2>
              <p className="text-sm text-gray-600">
                Variáveis e tokens de cores configurados no Tailwind CSS para o projeto.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
              <div className="p-4 rounded-xl border border-gray-200 bg-[#151515] text-white">
                <div className="text-xs uppercase font-semibold text-gray-400">Preto</div>
                <div className="text-lg font-black mt-2">#151515</div>
                <div className="text-xs text-gray-400 mt-1">bg-brand-black</div>
              </div>

              <div className="p-4 rounded-xl border border-gray-300 bg-white text-[#151515] shadow-sm">
                <div className="text-xs uppercase font-semibold text-gray-500">Branco</div>
                <div className="text-lg font-black mt-2">#FFFFFF</div>
                <div className="text-xs text-gray-400 mt-1">bg-brand-white</div>
              </div>

              <div className="p-4 rounded-xl border border-red-700 bg-[#D62828] text-white">
                <div className="text-xs uppercase font-semibold text-red-200">Vermelho</div>
                <div className="text-lg font-black mt-2">#D62828</div>
                <div className="text-xs text-red-200 mt-1">bg-brand-red</div>
              </div>

              <div className="p-4 rounded-xl border border-yellow-500 bg-[#F4C542] text-[#151515]">
                <div className="text-xs uppercase font-semibold text-neutral-800">Amarelo</div>
                <div className="text-lg font-black mt-2">#F4C542</div>
                <div className="text-xs text-neutral-800 mt-1">bg-brand-yellow</div>
              </div>

              <div className="p-4 rounded-xl border border-gray-300 bg-[#F5F5F5] text-[#151515]">
                <div className="text-xs uppercase font-semibold text-gray-500">Cinza Claro</div>
                <div className="text-lg font-black mt-2">#F5F5F5</div>
                <div className="text-xs text-gray-500 mt-1">bg-brand-gray</div>
              </div>
            </div>
          </div>
        </section>

        {/* Project Architecture Overview */}
        <section className="py-12 bg-[#F5F5F5]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
            {/* Tech cards */}
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-[#151515] mb-2">
                Stack Tecnológica & Padrões
              </h2>
              <p className="text-sm text-gray-600 mb-6">
                Tecnologias configuradas em versões modernas, estáveis e integradas via App Router.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
                  <div className="w-8 h-8 rounded bg-black text-white font-black flex items-center justify-center text-xs mb-3">
                    NEXT
                  </div>
                  <h3 className="font-bold text-[#151515] text-sm">Next.js (App Router)</h3>
                  <p className="text-xs text-gray-500 mt-1">
                    Estrutura em <code className="bg-gray-100 px-1 py-0.5 rounded">src/app</code>, com Server Components e roteamento moderno.
                  </p>
                </div>

                <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
                  <div className="w-8 h-8 rounded bg-[#3178C6] text-white font-bold flex items-center justify-center text-xs mb-3">
                    TS
                  </div>
                  <h3 className="font-bold text-[#151515] text-sm">TypeScript</h3>
                  <p className="text-xs text-gray-500 mt-1">
                    Tipagem estática estrita em <code className="bg-gray-100 px-1 py-0.5 rounded">src/types</code> e alias <code className="bg-gray-100 px-1 py-0.5 rounded">@/*</code>.
                  </p>
                </div>

                <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
                  <div className="w-8 h-8 rounded bg-[#38BDF8] text-white font-bold flex items-center justify-center text-xs mb-3">
                    TW
                  </div>
                  <h3 className="font-bold text-[#151515] text-sm">Tailwind CSS</h3>
                  <p className="text-xs text-gray-500 mt-1">
                    Design system com as cores da Diniz Vieira e utilitários responsivos.
                  </p>
                </div>

                <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
                  <div className="w-8 h-8 rounded bg-[#FFCA28] text-[#151515] font-bold flex items-center justify-center text-xs mb-3">
                    FB
                  </div>
                  <h3 className="font-bold text-[#151515] text-sm">Firebase (Próxima Fase)</h3>
                  <p className="text-xs text-gray-500 mt-1">
                    Camada de serviços em <code className="bg-gray-100 px-1 py-0.5 rounded">src/services</code> preparada para integração do catálogo.
                  </p>
                </div>
              </div>
            </div>

            {/* Categories Preview */}
            <div id="categorias">
              <div className="flex justify-between items-end mb-6">
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-[#151515]">
                    Categorias do Catálogo
                  </h2>
                  <p className="text-sm text-gray-600">
                    Estrutura de organização preparada para autopeças e baterias.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {categories.map((category) => (
                  <CategoryCard key={category.id} category={category} />
                ))}
              </div>
            </div>

            {/* Featured Products Preview */}
            <div id="produtos">
              <div className="flex justify-between items-end mb-6">
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-[#151515]">
                    Exemplo de Produtos & Baterias
                  </h2>
                  <p className="text-sm text-gray-600">
                    Componente reutilizável com exibição de especificações e botão de cotação via WhatsApp.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {featuredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </div>

            {/* Institutional History Placeholder */}
            <div id="sobre" className="bg-white p-6 sm:p-8 rounded-2xl border border-gray-200 shadow-sm">
              <div className="max-w-3xl space-y-3">
                <span className="text-xs uppercase tracking-wider font-bold text-[#D62828]">
                  Sobre a Empresa
                </span>
                <h3 className="text-2xl font-black text-[#151515]">
                  {COMPANY_DETAILS.name}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {COMPANY_DETAILS.history}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                  <div className="bg-[#F5F5F5] p-4 rounded-xl border border-gray-200">
                    <h4 className="font-bold text-sm text-[#151515] mb-1">Nossa Missão</h4>
                    <p className="text-xs text-gray-600">{COMPANY_DETAILS.mission}</p>
                  </div>
                  <div className="bg-[#F5F5F5] p-4 rounded-xl border border-gray-200">
                    <h4 className="font-bold text-sm text-[#151515] mb-1">Nossa Visão</h4>
                    <p className="text-xs text-gray-600">{COMPANY_DETAILS.vision}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
