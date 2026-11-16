"use client";

import React, { useState, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { Search, LayoutGrid, Check, ChevronDown, PackageX } from "lucide-react";
import { Category, Product } from "@/types";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/Button";
import { ProductCard } from "@/components/products/ProductCard";

interface CatalogContentProps {
  initialProducts: Product[];
  categories: Category[];
}

type SortOption = "relevance" | "price_asc" | "price_desc" | "name_asc";

export function CatalogContent({
  initialProducts,
  categories,
}: CatalogContentProps) {
  const searchParams = useSearchParams();
  const categoryFromUrl = searchParams.get("category");

  const [userSelectedCategory, setUserSelectedCategory] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [sortBy, setSortBy] = useState<SortOption>("relevance");

  const selectedCategory = userSelectedCategory !== null 
    ? userSelectedCategory 
    : (categoryFromUrl || "todos");

  // Filtro combinado de busca e categoria
  const filteredProducts = useMemo(() => {
    let result = [...initialProducts];

    // Filtro por Categoria
    if (selectedCategory && selectedCategory !== "todos") {
      result = result.filter((p) => p.categoryId === selectedCategory);
    }

    // Filtro por Busca (Nome, Marca, Código ou Descrição)
    if (searchTerm.trim() !== "") {
      const term = searchTerm.toLowerCase().trim();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(term) ||
          p.brand.toLowerCase().includes(term) ||
          (p.code && p.code.toLowerCase().includes(term)) ||
          p.description.toLowerCase().includes(term)
      );
    }

    // Ordenação
    switch (sortBy) {
      case "price_asc":
        result.sort((a, b) => {
          if (a.price === null) return 1;
          if (b.price === null) return -1;
          return a.price - b.price;
        });
        break;
      case "price_desc":
        result.sort((a, b) => {
          if (a.price === null) return 1;
          if (b.price === null) return -1;
          return b.price - a.price;
        });
        break;
      case "name_asc":
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "relevance":
      default:
        break;
    }

    return result;
  }, [initialProducts, selectedCategory, searchTerm, sortBy]);

  const activeCategoryName =
    selectedCategory === "todos"
      ? "Todas as categorias"
      : categories.find((c) => c.id === selectedCategory)?.name || "Categoria";

  return (
    <div className="flex flex-col gap-6">
      {/* Barra de Pesquisa */}
      <div className="relative max-w-4xl">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
        <Input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Buscar por nome, marca ou código de peça..."
          className="w-full pl-12 pr-24 h-13 bg-white border-neutral-300 rounded-lg text-sm sm:text-base shadow-xs focus-visible:ring-1 focus-visible:ring-[#D62828]"
        />
        {searchTerm && (
          <button
            onClick={() => setSearchTerm("")}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-semibold text-neutral-400 hover:text-neutral-700 transition-colors"
          >
            Limpar
          </button>
        )}
      </div>

      {/* Pílulas de Filtros de Categorias */}
      <section className="py-2">
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2 text-neutral-700 font-medium">
            <LayoutGrid className="w-4 h-4 text-[#D62828]" />
            <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-neutral-600">
              Categorias
            </span>
          </div>

          <div className="flex items-center gap-2.5 overflow-x-auto pb-2 scrollbar-hide">
            <Button
              variant={selectedCategory === "todos" ? "default" : "outline"}
              onClick={() => setUserSelectedCategory("todos")}
              className={`rounded-full px-5 h-9 text-xs font-semibold shrink-0 flex items-center gap-1.5 shadow-xs transition-colors ${
                selectedCategory === "todos"
                  ? "bg-[#D62828] hover:bg-[#b91c1c] text-white"
                  : "border-neutral-300 text-neutral-700 hover:bg-neutral-50"
              }`}
            >
              {selectedCategory === "todos" && <Check className="w-3.5 h-3.5" />}
              Todos ({initialProducts.length})
            </Button>

            {categories.map((cat) => {
              const isSelected = selectedCategory === cat.id;
              const count = initialProducts.filter((p) => p.categoryId === cat.id).length;

              return (
                <Button
                  key={cat.id}
                  variant={isSelected ? "default" : "outline"}
                  onClick={() => setUserSelectedCategory(cat.id)}
                  className={`rounded-full px-4.5 h-9 text-xs shrink-0 flex items-center gap-1.5 font-medium transition-colors ${
                    isSelected
                      ? "bg-[#D62828] hover:bg-[#b91c1c] text-white font-semibold"
                      : "border-neutral-300 text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900"
                  }`}
                >
                  {isSelected && <Check className="w-3.5 h-3.5" />}
                  {cat.name} ({count})
                </Button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Barra de Status e Ordenação */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 border-b border-neutral-100 pb-4 pt-2">
        <div>
          <h2 className="text-base sm:text-lg font-bold text-[#151515]">
            {filteredProducts.length}{" "}
            {filteredProducts.length === 1 ? "produto encontrado" : "produtos encontrados"}
          </h2>
          <p className="text-xs text-neutral-500">{activeCategoryName}</p>
        </div>

        {/* Dropdown de Ordenação */}
        <div className="flex items-center gap-2 self-end sm:self-auto">
          <label htmlFor="sort-select" className="text-xs text-neutral-500 font-medium hidden sm:inline">
            Ordenar por:
          </label>
          <div className="relative">
            <select
              id="sort-select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              className="appearance-none bg-white border border-neutral-200 rounded-lg px-3 py-1.5 pr-8 text-xs font-semibold text-neutral-700 hover:border-neutral-300 focus:outline-hidden focus:ring-1 focus:ring-[#D62828] cursor-pointer"
            >
              <option value="relevance">Mais relevantes</option>
              <option value="price_asc">Menor preço</option>
              <option value="price_desc">Maior preço</option>
              <option value="name_asc">Nome (A - Z)</option>
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-neutral-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Grid de Produtos ou Estado Vazio */}
      {filteredProducts.length > 0 ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="mt-12 text-center">
            <p className="text-xs sm:text-sm text-neutral-400">
              Você está vendo todos os {filteredProducts.length} produtos correspondentes aos filtros aplicados.
            </p>
          </div>
        </>
      ) : (
        /* Estado Lista Vazia */
        <div className="py-16 text-center flex flex-col items-center justify-center rounded-2xl border border-dashed border-neutral-300 bg-neutral-50/50 p-8">
          <div className="w-12 h-12 rounded-full bg-neutral-100 flex items-center justify-center text-neutral-400 mb-3">
            <PackageX className="w-6 h-6 stroke-[1.5]" />
          </div>
          <h3 className="text-base font-bold text-[#151515]">Nenhum produto encontrado</h3>
          <p className="text-xs sm:text-sm text-neutral-500 max-w-md mt-1 mb-5">
            Não encontramos itens correspondentes a &quot;{searchTerm}&quot;. Tente buscar por outros termos ou selecione outra categoria.
          </p>
          <Button
            variant="outline"
            onClick={() => {
              setSearchTerm("");
              setUserSelectedCategory("todos");
            }}
            className="text-xs font-semibold"
          >
            Limpar filtros e ver todos
          </Button>
        </div>
      )}
    </div>
  );
}

export default CatalogContent;
