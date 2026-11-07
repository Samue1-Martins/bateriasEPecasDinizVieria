import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Auto Peças Diniz Vieira | Tradição e Qualidade em Peças e Baterias",
  description:
    "Catálogo e informações institucionais da Auto Peças Diniz Vieira. Variedade em autopeças, baterias e acessórios com atendimento especializado.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`${inter.variable} antialiased`}>
      <body className="min-h-screen bg-[#F5F5F5] text-[#151515] font-sans flex flex-col">
        {children}
      </body>
    </html>
  );
}
