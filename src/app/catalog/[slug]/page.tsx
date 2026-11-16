import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Header, Footer } from "@/components/layout";
import { ProductCard } from "@/components/products";
import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/card";
import { Info, MessageCircle, AlertCircle } from "lucide-react";
import {
  getProductBySlug,
  getRelatedProducts,
  getCategoryById,
  getProducts,
} from "@/services";
import { buildWhatsAppLink, WHATSAPP_MESSAGES } from "@/lib/constants";
import { ProductGallery } from "./ProductGallery";

interface ProductDetailPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const products = await getProducts();
  return products.map((product) => ({
    slug: product.slug,
  }));
}

export async function generateMetadata({ params }: ProductDetailPageProps) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    return {
      title: "Produto não encontrado | Auto Peças Diniz Vieira",
    };
  }

  return {
    title: `${product.name} | Auto Peças Diniz Vieira`,
    description: product.description,
  };
}

export default async function ProductDetailPage({
  params,
}: ProductDetailPageProps) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const [category, relatedProducts] = await Promise.all([
    getCategoryById(product.categoryId),
    getRelatedProducts(product.categoryId, product.id, 3),
  ]);

  const whatsappProductUrl = buildWhatsAppLink(
    WHATSAPP_MESSAGES.productInquiry(product.name, product.brand)
  );

  const whatsappGeneralUrl = buildWhatsAppLink(WHATSAPP_MESSAGES.contact);

  // Status visual
  let statusBadge = {
    label: "Disponível • em estoque",
    bulletClass: "bg-emerald-500",
  };

  if (product.status === "on_demand") {
    statusBadge = {
      label: "Disponível sob encomenda",
      bulletClass: "bg-amber-500",
    };
  } else if (product.status === "out_of_stock") {
    statusBadge = {
      label: "Indisponível no momento",
      bulletClass: "bg-neutral-400",
    };
  }

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Header />

      <main className="flex-grow">
        {/* Breadcrumb */}
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 py-5 text-xs sm:text-sm text-neutral-500">
          <Link href="/" className="hover:text-[#D62828] transition-colors">
            Inicial
          </Link>
          <span className="mx-2">/</span>
          <Link
            href="/catalog"
            className="hover:text-[#D62828] transition-colors"
          >
            Catálogo
          </Link>
          <span className="mx-2">/</span>
          <Link
            href={`/catalog?category=${product.categoryId}`}
            className="hover:text-[#D62828] transition-colors"
          >
            {category?.name || "Categoria"}
          </Link>
          <span className="mx-2">/</span>
          <span className="font-medium text-neutral-900">{product.name}</span>
        </div>

        {/* Alerta de Catálogo Demonstrativo */}
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 mb-6">
          <div className="bg-[#F8F9FA] border border-neutral-200/80 rounded-xl p-3 sm:p-4 flex gap-3 items-start sm:items-center">
            <Info className="w-4 h-4 text-neutral-500 shrink-0 mt-0.5 sm:mt-0" />
            <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
              Catálogo demonstrativo. Produtos, especificações, preços e disponibilidade ilustrativos para apresentação. Confirme as informações com nossa equipe pelo WhatsApp.
            </p>
          </div>
        </div>

        {/* 1. Hero do Produto */}
        <section className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 pb-16 lg:pb-24 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
          {/* Galeria Interativa com Miniaturas */}
          <ProductGallery
            mainImageUrl={product.mainImageUrl}
            galleryUrls={product.galleryUrls}
            productName={product.name}
          />

          {/* Informações Principais e CTA */}
          <div className="flex flex-col pt-1 lg:pt-4">
            <div className="flex items-center gap-2 mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[#D62828]" />
              <span className="text-[11px] sm:text-xs font-bold uppercase tracking-[0.2em] text-[#D62828] flex items-center gap-2">
                <span className="capitalize">{category?.name || "Autopeça"}</span>
                <span className="text-neutral-300">•</span>
                <span className="capitalize">{product.brand}</span>
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-[2.75rem] font-extrabold text-[#151515] tracking-tight leading-tight mb-3">
              {product.name}
            </h1>

            <p className="text-base sm:text-lg text-neutral-600 leading-relaxed mb-4">
              {product.description}
            </p>

            {/* Código de Referência se houver */}
            {product.code && (
              <p className="text-xs text-neutral-500 mb-6 font-mono">
                Código de referência: <span className="font-semibold text-neutral-700">{product.code}</span>
              </p>
            )}

            {/* Preço e Status */}
            <div className="flex flex-col gap-1 mb-6 border-b border-neutral-100 pb-6">
              <div className="min-h-[44px] flex items-baseline">
                {product.priceOnRequest || product.price === null ? (
                  <span className="text-2xl sm:text-3xl font-extrabold text-neutral-800 tracking-tight">
                    Preço sob consulta
                  </span>
                ) : (
                  <span className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#151515] tracking-tight">
                    R$ {product.price.toFixed(2).replace(".", ",")}
                  </span>
                )}
              </div>

              <span className="text-xs sm:text-sm text-neutral-500 flex items-center gap-1.5 mt-2">
                <span className={`w-2 h-2 rounded-full ${statusBadge.bulletClass}`} />
                {statusBadge.label}
              </span>
            </div>

            {/* Botão de WhatsApp */}
            <a
              href={whatsappProductUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full"
            >
              <Button
                size="lg"
                className="w-full bg-[#D62828] hover:bg-[#b91c1c] text-white h-13 rounded-lg text-sm sm:text-base font-bold gap-2 mb-4 shadow-xs transition-all active:translate-y-px"
              >
                <MessageCircle className="w-5 h-5 fill-white/20" />
                Consultar disponibilidade pelo WhatsApp
              </Button>
            </a>

            <p className="text-xs text-neutral-500 leading-relaxed mb-5">
              Consulte preço e disponibilidade reais com nossa equipe. A consulta pelo WhatsApp não representa compra ou reserva antecipada.
            </p>

            {/* Alerta de Aplicação */}
            <div className="bg-[#F8F9FA] border border-neutral-200/80 rounded-xl p-4 flex gap-3">
              <AlertCircle className="w-5 h-5 text-[#D62828] shrink-0 mt-0.5" />
              <div className="flex flex-col gap-1">
                <span className="text-sm font-bold text-[#151515]">
                  Dúvidas sobre a aplicação correta no seu veículo?
                </span>
                <span className="text-xs text-neutral-600 leading-relaxed">
                  Envie modelo, ano e motorização para nossa equipe confirmar a compatibilidade exata.
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* 2. Especificações e Aplicações */}
        <section className="bg-[#F8F9FA] py-16 lg:py-24 border-t border-neutral-100">
          <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
            {/* Coluna da Esquerda: Aplicações */}
            <div className="lg:col-span-6 flex flex-col gap-8">
              <div className="flex flex-col gap-3">
                <h2 className="text-xl sm:text-2xl font-bold text-[#151515]">
                  Aplicações veiculares
                </h2>
                <div className="text-sm sm:text-base text-neutral-600 space-y-3 leading-relaxed">
                  {product.vehicleApplications.map((app, idx) => (
                    <div key={idx} className="flex items-start gap-2.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#D62828] mt-2 shrink-0" />
                      <p>{app}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <h3 className="text-lg sm:text-xl font-bold text-[#151515]">
                  Orientações para confirmação
                </h3>
                <p className="text-sm text-neutral-600 leading-relaxed">
                  Determinadas peças e componentes possuem variações sutis por lote, chassi ou versão de acabamento. Nossa oficina e balcão prestam suporte consultivo gratuito antes da aquisição.
                </p>
              </div>
            </div>

            {/* Coluna da Direita: Card de Ficha Técnica */}
            <div className="lg:col-span-6">
              <Card className="border-neutral-200/80 shadow-xs rounded-2xl bg-white h-full">
                <CardContent className="p-6 lg:p-8">
                  <h3 className="text-lg sm:text-xl font-bold text-[#151515] mb-5">
                    Especificações técnicas
                  </h3>

                  <div className="flex flex-col">
                    <div className="flex flex-col sm:flex-row py-3.5 border-b border-neutral-100">
                      <span className="text-xs sm:text-sm text-neutral-500 sm:w-1/3 mb-1 sm:mb-0">
                        Marca
                      </span>
                      <span className="text-xs sm:text-sm font-semibold text-[#151515] sm:w-2/3">
                        {product.brand}
                      </span>
                    </div>

                    <div className="flex flex-col sm:flex-row py-3.5 border-b border-neutral-100">
                      <span className="text-xs sm:text-sm text-neutral-500 sm:w-1/3 mb-1 sm:mb-0">
                        Categoria
                      </span>
                      <span className="text-xs sm:text-sm font-semibold text-[#151515] sm:w-2/3">
                        {category?.name || "Autopeça"}
                      </span>
                    </div>

                    {product.specifications.map((spec, idx) => (
                      <div
                        key={idx}
                        className="flex flex-col sm:flex-row py-3.5 border-b border-neutral-100 last:border-0"
                      >
                        <span className="text-xs sm:text-sm text-neutral-500 sm:w-1/3 mb-1 sm:mb-0">
                          {spec.label}
                        </span>
                        <span className="text-xs sm:text-sm font-semibold text-[#151515] sm:w-2/3">
                          {spec.value}
                        </span>
                      </div>
                    ))}
                  </div>

                  <p className="text-[11px] text-neutral-400 mt-6 pt-4 border-t border-neutral-100">
                    Ficha técnica demonstrativa para apresentação. Confirme as especificações do fabricante antes da instalação.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* 3. Produtos Relacionados */}
        {relatedProducts.length > 0 && (
          <section className="py-16 lg:py-24 max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 border-b border-neutral-100">
            <div className="mb-8 space-y-2">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#D62828]" />
                <span className="text-[11px] sm:text-xs font-bold uppercase tracking-[0.2em] text-[#D62828]">
                  RELACIONADOS
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#151515] tracking-tight">
                Outros produtos em {category?.name || "nossa loja"}
              </h2>
              <p className="text-sm sm:text-base text-neutral-500">
                Conheça mais opções do nosso catálogo.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {relatedProducts.map((relProduct) => (
                <ProductCard key={relProduct.id} product={relProduct} />
              ))}
            </div>
          </section>
        )}

        {/* 4. CTA Inferior */}
        <section className="bg-[#F8F9FA] py-16 lg:py-24">
          <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row lg:items-center justify-between gap-6 lg:gap-8">
            <div className="flex flex-col gap-2 max-w-2xl">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#151515] tracking-tight">
                A peça certa começa com uma boa conversa.
              </h2>
              <p className="text-base sm:text-lg text-neutral-600 leading-relaxed">
                Envie o modelo, o ano e a peça que procura. Nossa equipe ajuda a confirmar a aplicação e a disponibilidade.
              </p>
            </div>

            <a
              href={whatsappGeneralUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full lg:w-auto"
            >
              <Button
                size="lg"
                className="w-full lg:w-auto bg-[#D62828] hover:bg-[#b91c1c] text-white h-12 px-7 rounded-lg text-sm font-bold gap-2 shadow-xs transition-all active:translate-y-px"
              >
                <MessageCircle className="w-4 h-4 fill-white/20" />
                Fale pelo WhatsApp
              </Button>
            </a>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
