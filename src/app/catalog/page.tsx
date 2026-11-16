import React from 'react';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import { Footer } from '@/components/layout';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/input';
import { ProductCard } from '@/components/products';
import {
    Search,
    LayoutGrid,
    Check,
    Info,
    ChevronDown,
    MessageCircle
} from 'lucide-react';

export const metadata = {
    title: 'Catálogo | Auto Peças Diniz Vieira',
    description: 'Encontre produtos e soluções para cuidar do seu veículo. Baterias, óleos, filtros e muito mais.',
};

// Dados mocados extraídos do protótipo
const MOCK_PRODUCTS = [
    {
        id: '1',
        category: 'Baterias',
        brand: 'Heliar',
        name: 'Bateria Energia 60 Ah',
        description: 'Energia para a partida e os sistemas elétricos.',
        specifications: '12 V - 60 Ah - Polo positivo à direita.\nAplicação a confirmar: Consulte nossa equipe com o modelo e ano do veículo.',
        price: 389.90,
        statusText: 'Disponível - em estoque',
        imageUrl: '/imagem.webp',
    },
    {
        id: '2',
        category: 'Velas de ignição',
        brand: 'NGK',
        name: 'Vela de ignição Essencial',
        description: 'Componente de reposição para o sistema de ignição.',
        specifications: 'Unidade - Número da peça: ...\nAplicação a confirmar: Consulte nossa equipe com o modelo e ano do veículo.',
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
        specifications: '1 litro - Sintético - API SN/RC.\nAplicação a confirmar: Consulte nossa equipe com o modelo e ano do veículo.',
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
        specifications: 'Unidade - Peça de reposição.\nAplicação a confirmar: Consulte nossa equipe com o modelo e ano do veículo.',
        price: 29.90,
        statusText: 'Disponível - em estoque',
        imageUrl: '/imagem.webp',
    },
    {
        id: '5',
        category: 'Lubrificantes',
        brand: 'Molykote',
        name: 'Lubrificante multiuso',
        description: 'Proteção extra e manutenção de peças metálicas.',
        specifications: 'Aerossol - 300 ml.\nAplicação a confirmar: Consulte nossa equipe com o modelo e ano do veículo.',
        price: 22.90,
        statusText: 'Disponível - em estoque',
        imageUrl: '/imagem.webp',
    },
    {
        id: '6',
        category: 'Aditivos',
        brand: 'Tirreno',
        name: 'Aditivo para radiador',
        description: 'Arrefecimento e proteção contra superaquecimento.',
        specifications: '1 litro - Pronto para uso.\nAplicação a confirmar: Consulte nossa equipe com o modelo e ano do veículo.',
        price: 0, // 0 será tratado como "Consulte o preço"
        statusText: 'Disponível - sob encomenda',
        imageUrl: '/imagem.webp',
    },
    {
        id: '7',
        category: 'Acessórios automotivos',
        brand: 'Bosch',
        name: 'Palheta Flex 20"',
        description: 'Reposição para o limpador de para-brisa.',
        specifications: 'Unidade - 20 polegadas.\nAplicação a confirmar: Consulte nossa equipe com o modelo e ano do veículo.',
        price: 0, // 0 será tratado como "Consulte o preço"
        statusText: 'Disponível - sob encomenda',
        imageUrl: '/imagem.webp',
    },
];

const CATEGORIES = [
    "Baterias",
    "Velas de ignição",
    "Óleos de motor",
    "Filtros",
    "Lubrificantes",
    "Aditivos",
    "Acessórios automotivos"
];

export default function CatalogoPage() {
    return (
        <div className="flex min-h-screen flex-col bg-white">
            <Header />

            <main className="flex-grow">
                {/* Breadcrumb */}
                <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 py-5 text-xs sm:text-sm text-neutral-500">
                    <Link href="/" className="hover:text-[#D62828] transition-colors">Inicial</Link>
                    <span className="mx-2">/</span>
                    <span className="font-medium text-neutral-900">Catálogo</span>
                </div>

                {/* Cabeçalho da Página e Busca */}
                <section className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 pb-6 pt-2 flex flex-col gap-4">
                    <div className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#D62828]" />
                        <span className="text-[11px] sm:text-xs font-bold uppercase tracking-[0.2em] text-[#D62828]">
                            PEÇAS PARA SEGUIR EM FRENTE
                        </span>
                    </div>

                    <div className="flex flex-col gap-2">
                        <h1 className="text-3xl sm:text-5xl lg:text-[3.25rem] font-extrabold text-[#151515] tracking-tight">
                            Nosso catálogo
                        </h1>
                        <p className="text-base sm:text-lg text-neutral-600 leading-relaxed">
                            Encontre produtos e soluções para cuidar do seu veículo.
                        </p>
                    </div>

                    {/* Barra de Pesquisa */}
                    <div className="relative mt-2 max-w-4xl">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
                        <Input
                            type="text"
                            placeholder="Buscar por nome ou marca"
                            className="w-full pl-12 pr-20 h-13 bg-white border-neutral-300 rounded-lg text-sm sm:text-base shadow-xs focus-visible:ring-1 focus-visible:ring-[#D62828]"
                        />
                        <button className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-semibold text-neutral-600 hover:text-[#151515] transition-colors">
                            Buscar
                        </button>
                    </div>
                </section>

                {/* Filtros de Categorias */}
                <section className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex flex-col gap-3">
                        <div className="flex items-center gap-2 text-neutral-700 font-medium">
                            <LayoutGrid className="w-4 h-4 text-[#D62828]" />
                            <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-neutral-600">Categorias</span>
                        </div>

                        {/* Scroll horizontal em telas pequenas */}
                        <div className="flex items-center gap-2.5 overflow-x-auto pb-2 scrollbar-hide">
                            <Button
                                variant="default"
                                className="bg-[#D62828] hover:bg-[#b91c1c] text-white rounded-full px-5 h-9 text-xs font-semibold shrink-0 flex items-center gap-1.5 shadow-xs"
                            >
                                <Check className="w-3.5 h-3.5" />
                                Todos
                            </Button>
                            {CATEGORIES.map((cat, idx) => (
                                <Button
                                    key={idx}
                                    variant="outline"
                                    className="rounded-full px-5 h-9 text-xs shrink-0 border-neutral-300 text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900 font-medium"
                                >
                                    {cat}
                                </Button>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Alerta de Catálogo Ilustrativo */}
                <section className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 py-2">
                    <div className="bg-[#F8F9FA] border border-neutral-200/80 rounded-xl p-3 sm:p-4 flex gap-3 items-start sm:items-center">
                        <Info className="w-4 h-4 text-neutral-500 shrink-0 mt-0.5 sm:mt-0" />
                        <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                            Catálogo em construção. Produtos, marcas, preços e disponibilidade ilustrativos, apenas para apresentação. Confirme as informações com nossa equipe.
                        </p>
                    </div>
                </section>

                {/* Listagem de Produtos */}
                <section className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="flex flex-row justify-between items-end mb-6 border-b border-neutral-100 pb-4">
                        <div>
                            <h2 className="text-base sm:text-lg font-bold text-[#151515]">7 produtos</h2>
                            <p className="text-xs text-neutral-500">Todas as categorias</p>
                        </div>

                        <button className="flex items-center gap-1.5 text-xs sm:text-sm text-neutral-600 hover:text-neutral-900 transition-colors font-medium">
                            Mais relevantes
                            <ChevronDown className="w-3.5 h-3.5" />
                        </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                        {MOCK_PRODUCTS.map((product) => (
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

                    <div className="mt-14 text-center">
                        <p className="text-xs sm:text-sm text-neutral-400">
                            Você está vendo todos os 7 produtos desta marca/categoria.
                        </p>
                    </div>
                </section>

                {/* CTA Inferior */}
                <section className="bg-[#F8F9FA] mt-12 py-16 lg:py-24 border-t border-neutral-100">
                    <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row lg:items-center justify-between gap-6 lg:gap-8">
                        <div className="flex flex-col gap-2 max-w-2xl">
                            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#151515] tracking-tight">
                                A peça certa começa com uma boa conversa.
                            </h2>
                            <p className="text-base sm:text-lg text-neutral-600 leading-relaxed">
                                Envie o modelo, o ano e a peça que procura. Nossa equipe avalia e confirma a aplicação e a disponibilidade.
                            </p>
                        </div>

                        <Link href="https://wa.me/31988012447" target="_blank" rel="noopener noreferrer" className="w-full lg:w-auto">
                            <Button size="lg" className="w-full lg:w-auto bg-[#D62828] hover:bg-[#b91c1c] text-white h-11 px-6 rounded-lg text-sm font-bold gap-2 shadow-xs active:translate-y-px transition-all">
                                <MessageCircle className="w-4 h-4" />
                                Fale pelo WhatsApp
                            </Button>
                        </Link>
                    </div>
                </section>

            </main>

            <Footer whatsappHref="https://wa.me/31988012447" />
        </div>
    );
}