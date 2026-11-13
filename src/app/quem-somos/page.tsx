import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Header from '@/components/layout/Header';
import { Footer } from '@/components/layout';
import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/card';
import {
    Wrench,
    Store,
    MessageCircle,
    ShieldCheck,
    HeartHandshake,
    Award,
    ClipboardCheck
} from 'lucide-react';

export const metadata = {
    title: 'Quem Somos | Auto Peças Diniz Vieira',
    description: 'Conheça a história da Auto Peças Diniz Vieira. Uma loja que nasceu ao lado da oficina.',
};

export default function QuemSomosPage() {
    return (
        <div className="flex min-h-screen flex-col bg-white">
            <Header />

            <main className="flex-grow">
                {/* Breadcrumb */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 text-sm text-neutral-500">
                    <Link href="/" className="hover:text-[#D62828] transition-colors">Inicial</Link>
                    <span className="mx-2">/</span>
                    <span className="font-medium text-neutral-400">Quem Somos</span>
                </div>

                {/* 1. Hero / Introdução */}
                <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-16 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
                    <div className="flex flex-col gap-5">
                        <div className="flex items-center gap-3">
                            <div className="w-1.5 h-1.5 bg-[#D62828]" />
                            <span className="text-[10px] font-bold tracking-widest text-neutral-500 uppercase">
                                Proximidade que faz a diferença
                            </span>
                        </div>

                        <h1 className="text-4xl lg:text-[44px] font-bold text-[#151515] leading-[1.1] tracking-tight">
                            Conheça a Auto Peças<br />Diniz Vieira
                        </h1>

                        <p className="text-neutral-500 text-lg lg:w-4/5">
                            Uma loja que nasceu ao lado da oficina. E continua ao lado de quem precisa cuidar do veículo.
                        </p>

                        <div className="flex items-center gap-3 mt-2">
                            <div className="w-1.5 h-1.5 bg-[#F4C542] rounded-full" />
                            <p className="text-[#151515] font-semibold text-sm">
                                Nossa história começa em 2023.
                            </p>
                        </div>
                    </div>

                    <div className="flex flex-col gap-3">
                        <div className="relative w-full aspect-[4/3] bg-neutral-100 rounded-2xl overflow-hidden">
                            <Image
                                src="/imagem.webp"
                                alt="Atendimento no balcão"
                                fill
                                className="object-cover"
                            />
                        </div>
                        <p className="text-[11px] text-neutral-400">
                            Foto Ilustrativa. Não retrata a Auto Peças Diniz Vieira.
                        </p>
                    </div>
                </section>

                {/* 2. História */}
                <section className="bg-[#F8F9FA]">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">

                        {/* Coluna da Esquerda (Títulos) */}
                        <div className="lg:col-span-5 flex flex-col gap-5">
                            <div className="flex items-center gap-3">
                                <div className="w-1.5 h-1.5 bg-[#D62828]" />
                                <span className="text-[10px] font-bold tracking-widest text-neutral-500 uppercase">
                                    Um sonho, um novo caminho
                                </span>
                            </div>
                            <h2 className="text-3xl lg:text-4xl font-bold text-[#151515] tracking-tight leading-tight pr-4">
                                Nossa história, nosso compromisso.
                            </h2>
                            <p className="text-neutral-500 text-lg pr-4">
                                Mais praticidade para você. O mesmo compromisso em cada atendimento.
                            </p>
                        </div>

                        {/* Coluna da Direita (Textos e Card 2023) */}
                        <div className="lg:col-span-7 flex flex-col gap-6 text-neutral-500 leading-relaxed">
                            <p>
                                Tudo começou em 2023 com o sonho de oferecer um serviço cada vez mais completo aos nossos clientes. Ao lado da oficina, surgiu a ideia de abrir uma loja de autopeças, facilitando a vida de quem precisava de consertos, peças e baterias.
                            </p>
                            <p>
                                Percebemos que muitos clientes precisavam procurar peças em outros lugares depois de identificar um problema no veículo. Decidimos então unir a oficina à loja, trazendo mais praticidade, agilidade e confiança.
                            </p>
                            <p>
                                Hoje, loja e oficina trabalham lado a lado, compartilhando o compromisso de cuidar de cada veículo com responsabilidade, dedicação e respeito aos nossos clientes.
                            </p>

                            {/* Card Destaque 2023 */}
                            <div className="bg-white rounded-xl shadow-sm p-6 lg:p-8 mt-4 flex flex-col sm:flex-row sm:items-center gap-4 border border-neutral-100">
                                <span className="text-3xl font-bold text-[#D62828]">2023</span>
                                <span className="text-neutral-500 text-sm">
                                    O início de uma história construída com trabalho, cuidado e proximidade.
                                </span>
                            </div>
                        </div>

                    </div>
                </section>

                {/* 3. Lado a Lado (Oficina + Loja) */}
                <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">

                    <div className="flex flex-col gap-3">
                        <div className="relative w-full aspect-[4/3] lg:aspect-[1.1] bg-neutral-100 rounded-2xl overflow-hidden">
                            <Image
                                src="/imagem.webp"
                                alt="Mecânico"
                                fill
                                className="object-cover"
                            />
                        </div>
                        <p className="text-[11px] text-neutral-400">
                            Foto ilustrativa de oficina. Não retrata nossas instalações.
                        </p>
                    </div>

                    <div className="flex flex-col gap-10">
                        <div className="flex flex-col gap-5">
                            <div className="flex items-center gap-3">
                                <div className="w-1.5 h-1.5 bg-[#D62828]" />
                                <span className="text-[10px] font-bold tracking-widest text-neutral-500 uppercase">
                                    Lado a lado
                                </span>
                            </div>
                            <h2 className="text-3xl lg:text-4xl font-bold text-[#151515] tracking-tight leading-tight">
                                Oficina + loja. Mais facilidade para você.
                            </h2>
                            <p className="text-neutral-500 text-lg">
                                Da identificação do problema à busca pela peça: aproximamos essas etapas para tornar o cuidado com seu veículo mais simples.
                            </p>
                        </div>

                        <div className="flex flex-col gap-8">
                            <div className="flex gap-4">
                                <Wrench className="w-6 h-6 text-[#D62828] shrink-0 stroke-[1.5]" />
                                <div>
                                    <h3 className="text-base font-bold text-[#151515] mb-1">O cuidado começa na oficina</h3>
                                    <p className="text-sm text-neutral-500">Atenção ao que o veículo precisa.</p>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <Store className="w-6 h-6 text-[#D62828] shrink-0 stroke-[1.5]" />
                                <div>
                                    <h3 className="text-base font-bold text-[#151515] mb-1">A solução continua na loja</h3>
                                    <p className="text-sm text-neutral-500">Orientação para consultar peças e baterias.</p>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <MessageCircle className="w-6 h-6 text-[#D62828] shrink-0 stroke-[1.5]" />
                                <div>
                                    <h3 className="text-base font-bold text-[#151515] mb-1">A conversa acompanha tudo</h3>
                                    <p className="text-sm text-neutral-500">Confirme aplicação, modelo e ano com a equipe.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 4. Valores / Nosso Compromisso */}
                <section className="bg-white py-16 lg:py-24 border-t border-neutral-100">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="mb-12 flex flex-col gap-5">
                            <div className="flex items-center gap-3">
                                <div className="w-1.5 h-1.5 bg-[#D62828]" />
                                <span className="text-[10px] font-bold tracking-widest text-neutral-500 uppercase">
                                    Nosso compromisso
                                </span>
                            </div>
                            <h2 className="text-3xl lg:text-4xl font-bold text-[#151515] tracking-tight">
                                O que guia nosso trabalho
                            </h2>
                            <p className="text-neutral-500">
                                Princípios que fazem parte da nossa forma de atender.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
                            <Card className="border-neutral-100 shadow-sm rounded-2xl bg-white">
                                <CardContent className="p-8 flex flex-col gap-4">
                                    <ShieldCheck className="w-8 h-8 text-[#D62828] stroke-[1.5]" />
                                    <h4 className="text-lg font-bold text-[#151515]">Confiança</h4>
                                    <p className="text-sm text-neutral-500 leading-relaxed">
                                        Uma relação construída com clareza, respeito e atenção em cada conversa.
                                    </p>
                                </CardContent>
                            </Card>

                            <Card className="border-neutral-100 shadow-sm rounded-2xl bg-white">
                                <CardContent className="p-8 flex flex-col gap-4">
                                    <HeartHandshake className="w-8 h-8 text-[#D62828] stroke-[1.5]" />
                                    <h4 className="text-lg font-bold text-[#151515]">Dedicação</h4>
                                    <p className="text-sm text-neutral-500 leading-relaxed">
                                        Cuidado com os detalhes e disposição para entender o que você precisa.
                                    </p>
                                </CardContent>
                            </Card>

                            <Card className="border-neutral-100 shadow-sm rounded-2xl bg-white">
                                <CardContent className="p-8 flex flex-col gap-4">
                                    <Award className="w-8 h-8 text-[#D62828] stroke-[1.5]" />
                                    <h4 className="text-lg font-bold text-[#151515]">Qualidade</h4>
                                    <p className="text-sm text-neutral-500 leading-relaxed">
                                        Atenção na escolha das peças e na orientação para o seu veículo.
                                    </p>
                                </CardContent>
                            </Card>

                            <Card className="border-neutral-100 shadow-sm rounded-2xl bg-white">
                                <CardContent className="p-8 flex flex-col gap-4">
                                    <ClipboardCheck className="w-8 h-8 text-[#D62828] stroke-[1.5]" />
                                    <h4 className="text-lg font-bold text-[#151515]">Responsabilidade</h4>
                                    <p className="text-sm text-neutral-500 leading-relaxed">
                                        Compromisso com as informações e com cada pessoa que nos procura.
                                    </p>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </section>

                {/* 5. CTA */}
                <section className="bg-[#F8F9FA] py-20 lg:py-28">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-start lg:items-center text-left lg:text-center gap-6">
                        <h2 className="text-3xl lg:text-4xl font-bold text-[#151515] tracking-tight">
                            Conte com a gente para cuidar do seu veículo.
                        </h2>
                        <p className="text-neutral-500 text-lg">
                            Conheça as categorias ou fale com nossa equipe sobre a peça que procura.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 mt-4 w-full lg:w-auto">
                            <Link href="/catalogo" className="w-full sm:w-auto">
                                <Button size="lg" className="w-full bg-[#D62828] hover:bg-[#D62828]/90 text-white h-12 px-8 rounded-md font-semibold">
                                    Conheça nossos produtos
                                </Button>
                            </Link>
                            <Link href="https://wa.me/SEUNUMERO" target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto">
                                <Button size="lg" variant="outline" className="w-full h-12 px-8 rounded-md font-semibold border-neutral-200 text-[#151515] bg-white hover:bg-neutral-50 gap-2">
                                    <MessageCircle className="w-5 h-5" />
                                    Fale pelo WhatsApp
                                </Button>
                            </Link>
                        </div>
                    </div>
                </section>

            </main>

            <Footer whatsappHref="https://wa.me/SEUNUMERO" />
        </div>
    );
}