import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Header } from '@/components/layout';
import { Footer } from '@/components/layout';
import { ProductCard } from '@/components/products';
import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/card';
import { Info, MessageCircle, AlertCircle } from 'lucide-react';
import { buildWhatsAppLink } from '@/lib/constants';

export const metadata = {
    title: 'Bateria Energia 60 Ah | Auto Peças Diniz Vieira',
    description: 'Energia para a partida e os sistemas elétricos.',
};

// Dados mocados simulando o produto ativo
const PRODUCT = {
    id: '1',
    category: 'Baterias',
    brand: 'Voltiva',
    name: 'Bateria Energia 60 Ah',
    description: 'Energia para a partida e os sistemas elétricos.',
    specifications: '12 V - 60 Ah - Polo positivo à direita',
    price: 389.90,
    statusText: 'Disponível - em estoque',
    mainImage: '/imagem.webp',
    gallery: [
        '/imagem.webp',
        '/imagem.webp',
        '/imagem.webp',
    ],
    details: {
        about: [
            "A Bateria Energia 60 Ah da Voltiva é um exemplo demonstrativo de bateria automotiva de 12 V, destinada à partida e à alimentação dos sistemas elétricos do veículo.",
            "A escolha da bateria deve considerar a capacidade exigida pelo veículo, as dimensões do compartimento e a posição dos polos. Confirme esses dados antes de escolher a peça.",
            "Esse produto, sua marca e suas informações são fictícios e fazem parte da apresentação do catálogo."
        ],
        application: [
            "Aplicação a confirmar: Consulte nossa equipe com o modelo e ano do veículo.",
            "Tenha em mãos marca, modelo, ano e motorização. Se possível, envie também uma foto da bateria atual."
        ]
    },
    techSpecs: {
        "Marca": "Voltiva",
        "Categoria": "Baterias",
        "Tensão nominal": "12 V",
        "Capacidade": "60 Ah",
        "Polo positivo": "À direita",
        "Dimensões": "A confirmar com a equipe",
        "Aplicação": "A confirmar por modelo e ano"
    }
};

// Dados mocados para produtos relacionados
const RELATED_PRODUCTS = [
    {
        id: '2',
        category: 'Velas de ignição',
        brand: 'NGK',
        name: 'Vela de ignição Essencial',
        description: 'Componente de reposição para o sistema de ignição.',
        specifications: 'Unidade - Número da peça: ...',
        price: 24.90,
        statusText: 'Disponível - em estoque',
        imageUrl: '/imagem.webp',
    },
    {
        id: '3',
        category: 'Óleos de motor',
        brand: 'Motul',
        name: 'Óleo de motor 5W-30',
        description: 'Lubrificante para o cuidado diário do motor.',
        specifications: '1 litro - Sintético - API SN/RC.',
        price: 42.90,
        statusText: 'Disponível - em estoque',
        imageUrl: '/imagem.webp',
    },
    {
        id: '4',
        category: 'Filtros',
        brand: 'Tecfil',
        name: 'Filtro de óleo Protec',
        description: 'Filtragem de impurezas do óleo do motor.',
        specifications: 'Unidade - Peça de reposição.',
        price: 29.90,
        statusText: 'Disponível - em estoque',
        imageUrl: '/imagem.webp',
    }
];

export default function ProductDetailPage() {
    // Utiliza a função para gerar o link correto do WhatsApp
    const whatsappProductUrl = buildWhatsAppLink(`Olá! Gostaria de consultar sobre o produto: ${PRODUCT.name} (${PRODUCT.brand}).`);

    return (
        <div className="flex min-h-screen flex-col bg-white">
            <Header />

            <main className="flex-grow">
                {/* Breadcrumb */}
                <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 py-5 text-xs sm:text-sm text-neutral-500">
                    <Link href="/" className="hover:text-[#D62828] transition-colors">Inicial</Link>
                    <span className="mx-2">/</span>
                    <Link href="/catalog" className="hover:text-[#D62828] transition-colors">Catálogo</Link>
                    <span className="mx-2">/</span>
                    <span className="hover:text-[#D62828] transition-colors cursor-pointer">{PRODUCT.category}</span>
                    <span className="mx-2">/</span>
                    <span className="font-medium text-neutral-900">{PRODUCT.name}</span>
                </div>

                {/* Alerta de Catálogo Demonstrativo */}
                <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 mb-6">
                    <div className="bg-[#F8F9FA] border border-neutral-200/80 rounded-xl p-3 sm:p-4 flex gap-3 items-start sm:items-center">
                        <Info className="w-4 h-4 text-neutral-500 shrink-0 mt-0.5 sm:mt-0" />
                        <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                            Catálogo demonstrativo. Produtos, marcas, preços e disponibilidade fictícios, apenas para apresentação. Confirme as informações com nossa equipe.
                        </p>
                    </div>
                </div>

                {/* 1. Hero do Produto */}
                <section className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 pb-16 lg:pb-24 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">

                    {/* Galeria de Imagens */}
                    <div className="flex flex-col gap-4">
                        <div className="relative w-full aspect-[4/3] bg-[#F8F9FA] rounded-2xl overflow-hidden border border-neutral-200/80 flex items-center justify-center p-8 shadow-xs">
                            <Image
                                src={PRODUCT.mainImage}
                                alt={PRODUCT.name}
                                fill
                                className="object-contain p-8"
                                sizes="(max-width: 1024px) 100vw, 50vw"
                            />
                        </div>

                        {/* Miniaturas */}
                        <div className="grid grid-cols-3 gap-3 sm:gap-4">
                            {PRODUCT.gallery.map((img, idx) => (
                                <div
                                    key={idx}
                                    className={`relative aspect-[4/3] bg-[#F8F9FA] rounded-xl overflow-hidden border cursor-pointer transition-colors ${idx === 0 ? 'border-[#D62828]' : 'border-neutral-200 hover:border-neutral-300'}`}
                                >
                                    <Image src={img} alt={`Miniatura ${idx + 1}`} fill className="object-contain p-2" sizes="15vw" />
                                </div>
                            ))}
                        </div>
                        <p className="text-[11px] text-neutral-400 mt-1">
                            Imagens ilustrativas do produto. Fale com nossa equipe.
                        </p>
                    </div>

                    {/* Informações Principais e CTA */}
                    <div className="flex flex-col pt-1 lg:pt-4">
                        <div className="flex items-center gap-2 mb-3">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#D62828]" />
                            <span className="text-[11px] sm:text-xs font-bold uppercase tracking-[0.2em] text-[#D62828] flex items-center gap-2">
                                <span className="capitalize">{PRODUCT.category}</span>
                                <span className="text-neutral-300">•</span>
                                <span className="capitalize">{PRODUCT.brand}</span>
                            </span>
                        </div>

                        <h1 className="text-3xl sm:text-4xl lg:text-[2.75rem] font-extrabold text-[#151515] tracking-tight leading-tight mb-3">
                            {PRODUCT.name}
                        </h1>

                        <p className="text-base sm:text-lg text-neutral-600 leading-relaxed mb-3">
                            {PRODUCT.description}
                        </p>
                        <p className="text-xs sm:text-sm text-neutral-500 leading-relaxed mb-6">
                            {PRODUCT.specifications}
                        </p>

                        <div className="flex flex-col gap-1 mb-6 border-b border-neutral-100 pb-6">
                            <span className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#151515] tracking-tight">
                                R$ {PRODUCT.price.toFixed(2).replace('.', ',')}
                            </span>
                            <span className="text-xs sm:text-sm text-neutral-500 flex items-center gap-1.5 mt-1">
                                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                                {PRODUCT.statusText}
                            </span>
                        </div>

                        <a 
                            href={whatsappProductUrl} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="w-full"
                        >
                            <Button size="lg" className="w-full bg-[#D62828] hover:bg-[#b91c1c] text-white h-13 rounded-lg text-sm sm:text-base font-bold gap-2 mb-4 shadow-xs transition-all active:translate-y-px">
                                <MessageCircle className="w-5 h-5 fill-white/20" />
                                Consultar pelo WhatsApp
                            </Button>
                        </a>

                        <p className="text-xs text-neutral-500 leading-relaxed mb-5">
                            Consulte preço e disponibilidade reais com nossa equipe. A consulta não representa uma compra ou reserva.
                        </p>

                        {/* Caixa de Alerta / Dúvida */}
                        <div className="bg-[#F8F9FA] border border-neutral-200/80 rounded-xl p-4 flex gap-3">
                            <AlertCircle className="w-5 h-5 text-[#D62828] shrink-0 mt-0.5" />
                            <div className="flex flex-col gap-1">
                                <span className="text-sm font-bold text-[#151515]">É a bateria certa para seu veículo?</span>
                                <span className="text-xs text-neutral-600 leading-relaxed">Aplicação a confirmar. Consulte nossa equipe com o modelo e ano do veículo.</span>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 2. Sobre o Produto e Especificações */}
                <section className="bg-[#F8F9FA] py-16 lg:py-24 border-t border-neutral-100">
                    <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">

                        {/* Coluna da Esquerda: Textos descritivos */}
                        <div className="lg:col-span-6 flex flex-col gap-8">
                            <div className="flex flex-col gap-3">
                                <h2 className="text-xl sm:text-2xl font-bold text-[#151515]">Sobre o produto</h2>
                                <div className="text-sm sm:text-base text-neutral-600 space-y-3 leading-relaxed">
                                    {PRODUCT.details.about.map((text, idx) => (
                                        <p key={idx}>{text}</p>
                                    ))}
                                </div>
                            </div>

                            <div className="flex flex-col gap-3">
                                <h3 className="text-lg sm:text-xl font-bold text-[#151515]">Aplicações veiculares</h3>
                                <div className="text-sm sm:text-base text-neutral-600 space-y-3 leading-relaxed">
                                    {PRODUCT.details.application.map((text, idx) => (
                                        <p key={idx}>{text}</p>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Coluna da Direita: Card de Especificações Técnicas */}
                        <div className="lg:col-span-6">
                            <Card className="border-neutral-200/80 shadow-xs rounded-2xl bg-white h-full">
                                <CardContent className="p-6 lg:p-8">
                                    <h3 className="text-lg sm:text-xl font-bold text-[#151515] mb-5">Especificações técnicas</h3>

                                    <div className="flex flex-col">
                                        {Object.entries(PRODUCT.techSpecs).map(([key, value], idx) => (
                                            <div
                                                key={idx}
                                                className="flex flex-col sm:flex-row py-3.5 border-b border-neutral-100 last:border-0"
                                            >
                                                <span className="text-xs sm:text-sm text-neutral-500 sm:w-1/3 mb-1 sm:mb-0">{key}</span>
                                                <span className="text-xs sm:text-sm font-semibold text-[#151515] sm:w-2/3">{value}</span>
                                            </div>
                                        ))}
                                    </div>

                                    <p className="text-[11px] text-neutral-400 mt-6 pt-4 border-t border-neutral-100">
                                        Ficha técnica fictícia para demonstração. Confirme os dados do fabricante antes da escolha.
                                    </p>
                                </CardContent>
                            </Card>
                        </div>

                    </div>
                </section>

                {/* 3. Produtos Relacionados */}
                <section className="py-16 lg:py-24 max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 border-b border-neutral-100">
                    <div className="mb-8 space-y-2">
                        <div className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#D62828]" />
                            <span className="text-[11px] sm:text-xs font-bold uppercase tracking-[0.2em] text-[#D62828]">
                                RELACIONADOS
                            </span>
                        </div>
                        <h2 className="text-2xl sm:text-3xl font-extrabold text-[#151515] tracking-tight">
                            Outros cuidados para seu veículo
                        </h2>
                        <p className="text-sm sm:text-base text-neutral-500">
                            Conheça também estas opções demonstrativas do catálogo.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                        {RELATED_PRODUCTS.map((product) => (
                            <ProductCard
                                key={product.id}
                                id={product.id}
                                category={product.category}
                                brand={product.brand}
                                name={product.name}
                                description={product.description}
                                specifications={product.specifications}
                                price={product.price}
                                statusText={product.statusText}
                                imageUrl={product.imageUrl}
                            />
                        ))}
                    </div>
                </section>

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

                        <Link href={buildWhatsAppLink('Olá! Gostaria de falar sobre uma peça para o meu veículo.')} target="_blank" rel="noopener noreferrer" className="w-full lg:w-auto">
                            <Button size="lg" className="w-full lg:w-auto bg-[#D62828] hover:bg-[#b91c1c] text-white h-11 px-6 rounded-lg text-sm font-bold gap-2 shadow-xs transition-all active:translate-y-px">
                                <MessageCircle className="w-4 h-4" />
                                Fale pelo WhatsApp
                            </Button>
                        </Link>
                    </div>
                </section>

            </main>

            <Footer whatsappHref={buildWhatsAppLink('Olá!')} />
        </div>
    );
}