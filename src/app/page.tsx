import React from "react";
import { Header, Footer } from "@/components/layout";
import {
  HeroSection,
  AboutSection,
  ContactSection,
} from "@/components/home";
import { CategoriesSection } from "@/components/categories";
import { FeaturedProductsSection } from "@/components/products";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />

      <main className="flex-1">
        {/* 1. Hero + Diferenciais Rápidos */}
        <HeroSection />

        {/* 2. Categorias de produtos */}
        <CategoriesSection />

        {/* 3. Produtos em destaque (Consome getFeaturedProducts()) */}
        <FeaturedProductsSection />

        {/* 4. História / Lado a Lado */}
        <AboutSection />

        {/* 5. Seção de contato com localização neutra e WhatsApp */}
        <ContactSection />
      </main>

      <Footer />
    </div>
  );
}
