import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const manrope = Manrope({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
  fallback: [
    "system-ui",
    "-apple-system",
    "BlinkMacSystemFont",
    "Segoe UI",
    "Roboto",
    "sans-serif",
  ],
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
    <html lang="pt-BR" className={cn("antialiased", manrope.variable)}>
      <body className="min-h-screen bg-background text-foreground font-sans flex flex-col">
        {children}
      </body>
    </html>
  );
}
