import React from "react";
import { Header, Footer } from "@/components/layout";
import { AboutSection, ContactSection } from "@/components/home";
import { HeroSection } from "@/components/home";
import { CategoriesSection } from "@/components/categories";
import { FeaturedProductsSection } from "@/components/products";

function getWhatsAppLink(message: string): string {
  const phone = "31988012447"; 
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${phone}?text=${encoded}`;
}

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />

      <main className="flex-1">
        {/* 1. Hero + Faixa de Benefícios rápidos */}
        <HeroSection />

        {/* 2. Categorias de produtos */}
        <CategoriesSection />

        {/* 3. Produtos em destaque */}
        <FeaturedProductsSection />

        <AboutSection />

        {/* 5️⃣ Seção de contato (nova) */}
        <ContactSection
          whatsappHref={getWhatsAppLink(
            "Olá! Gostaria de consultar um produto."
          )}
          address="Endereço a informar"
          phone="Telefone a informar"
          hours="Horários a informar"
        />

      </main>

      <Footer
        whatsappHref={getWhatsAppLink(
          "Olá! Gostaria de consultar um produto."
        )}
        address="Endereço a informar"
        phone="Telefone a informar"
        hours="Horários a informar"
      />

    </div>
  );
}
