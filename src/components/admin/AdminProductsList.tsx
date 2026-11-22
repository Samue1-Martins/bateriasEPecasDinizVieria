"use client";

import React, { useEffect, useMemo, useState, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Search,
  Star,
  AlertCircle,
  Loader2,
  PackageX,
  Filter,
  Plus,
  Pencil,
  Trash2,
  Power,
  AlertTriangle,
} from "lucide-react";
import { Category, Product, ProductStatus } from "@/types";
import {
  getAdminProducts,
  toggleProductActive,
  toggleProductFeatured,
  deleteProduct,
} from "@/services/admin-products.service";
import { invalidateCatalogCache } from "@/app/admin/actions";
import { auth } from "@/lib/firebase";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/card";

interface AdminProductsListProps {
  categories: Category[];
}

type ActiveFilter = "all" | "active" | "inactive";
type StatusFilter = "all" | ProductStatus;

const STATUS_LABELS: Record<ProductStatus, { label: string; className: string }> = {
  in_stock: {
    label: "Em estoque",
    className: "bg-emerald-50 text-emerald-700 border-emerald-200",
  },
  on_demand: {
    label: "Sob encomenda",
    className: "bg-amber-50 text-amber-800 border-amber-200",
  },
  out_of_stock: {
    label: "Esgotado",
    className: "bg-red-50 text-red-700 border-red-200",
  },
};

function formatPrice(price: number | null, priceOnRequest: boolean): string {
  if (price === null || priceOnRequest) {
    return "Sob consulta";
  }
  return price.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

export function AdminProductsList({ categories }: AdminProductsListProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [actionWarning, setActionWarning] = useState<string | null>(null);
  const [busyProductId, setBusyProductId] = useState<string | null>(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
  const [activeFilter, setActiveFilter] = useState<ActiveFilter>("all");

  const refreshProducts = useCallback(async () => {
    setError(null);
    try {
      const data = await getAdminProducts();
      setProducts(data);
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      setError(message);
    }
  }, []);

  useEffect(() => {
    let cancelled = false;

    async function initialLoad() {
      try {
        const data = await getAdminProducts();
        if (!cancelled) {
          setProducts(data);
        }
      } catch (err) {
        if (!cancelled) {
          const message = err instanceof Error ? err.message : String(err);
          setError(message);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    initialLoad();
    return () => {
      cancelled = true;
    };
  }, []);

  const categoryMap = useMemo(() => {
    const map = new Map<string, string>();
    for (const cat of categories) {
      map.set(cat.id, cat.name);
    }
    return map;
  }, [categories]);

  const filteredProducts = useMemo(() => {
    let result = [...products];

    if (categoryFilter !== "all") {
      result = result.filter((p) => p.categoryId === categoryFilter);
    }

    if (statusFilter !== "all") {
      result = result.filter((p) => p.status === statusFilter);
    }

    if (activeFilter === "active") {
      result = result.filter((p) => p.active);
    } else if (activeFilter === "inactive") {
      result = result.filter((p) => !p.active);
    }

    if (searchTerm.trim() !== "") {
      const term = searchTerm.toLowerCase().trim();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(term) ||
          p.brand.toLowerCase().includes(term) ||
          (p.code && p.code.toLowerCase().includes(term))
      );
    }

    return result;
  }, [products, categoryFilter, statusFilter, activeFilter, searchTerm]);

  const hasActiveFilters =
    searchTerm.trim() !== "" ||
    categoryFilter !== "all" ||
    statusFilter !== "all" ||
    activeFilter !== "all";

  const clearFilters = () => {
    setSearchTerm("");
    setCategoryFilter("all");
    setStatusFilter("all");
    setActiveFilter("all");
  };

  const handleToggleActive = async (product: Product) => {
    setActionWarning(null);
    setError(null);
    setBusyProductId(product.id);
    try {
      await toggleProductActive(product.id, !product.active);
      const idToken = await auth.currentUser?.getIdToken();
      if (idToken) {
        await invalidateCatalogCache(idToken);
      }
      await refreshProducts();
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setBusyProductId(null);
    }
  };

  const handleToggleFeatured = async (product: Product) => {
    setActionWarning(null);
    setError(null);
    setBusyProductId(product.id);
    try {
      await toggleProductFeatured(product.id, !product.featured);
      const idToken = await auth.currentUser?.getIdToken();
      if (idToken) {
        await invalidateCatalogCache(idToken);
      }
      await refreshProducts();
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setBusyProductId(null);
    }
  };

  const handleDelete = async (product: Product) => {
    const confirmed = window.confirm(
      `Tem certeza que deseja excluir o produto "${product.name}"? Esta ação não pode ser desfeita.`
    );
    if (!confirmed) return;

    setActionWarning(null);
    setError(null);
    setBusyProductId(product.id);
    try {
      const { storageWarnings } = await deleteProduct(product);
      const idToken = await auth.currentUser?.getIdToken();
      if (idToken) {
        await invalidateCatalogCache(idToken);
      }
      if (storageWarnings.length > 0) {
        setActionWarning(
          `O produto "${product.name}" foi excluído do Firestore, mas houve aviso ao limpar imagens no Storage: ${storageWarnings.join(
            "; "
          )}`
        );
      }
      await refreshProducts();
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setBusyProductId(null);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Cabeçalho */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#D62828]" />
            <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#D62828]">
              Gerenciamento do Catálogo
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#151515] tracking-tight">
            Produtos cadastrados
          </h1>
          <p className="text-sm text-neutral-600">
            Cadastre, edite, ative/desative ou exclua produtos diretamente no Firestore.
          </p>
        </div>

        <div className="flex items-center gap-3 self-start sm:self-end">
          <div className="text-xs sm:text-sm font-medium text-neutral-600 bg-white border border-neutral-200 px-3.5 py-2 rounded-xl">
            <strong className="text-[#151515]">{filteredProducts.length}</strong> de{" "}
            <strong className="text-[#151515]">{products.length}</strong>
          </div>

          <Link href="/admin/produtos/novo">
            <Button
              type="button"
              className="h-10 px-4 bg-[#D62828] hover:bg-[#b91c1c] text-white font-bold text-xs sm:text-sm gap-1.5 rounded-xl cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Novo produto</span>
            </Button>
          </Link>
        </div>
      </div>

      {/* Aviso de limpeza parcial no Storage */}
      {actionWarning && (
        <div
          role="status"
          className="bg-amber-50 border border-amber-200 rounded-2xl p-4 flex items-start gap-3 text-amber-900 text-xs sm:text-sm"
        >
          <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <span>{actionWarning}</span>
        </div>
      )}

      {/* Barra de Busca e Filtros */}
      <Card className="bg-white border border-neutral-200 shadow-2xs rounded-2xl">
        <CardContent className="p-4 sm:p-5 flex flex-col gap-4">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
            {/* Busca */}
            <div className="relative md:col-span-5">
              <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <Input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Buscar por nome, marca ou código..."
                className="pl-10 h-10 bg-white border-neutral-300 text-sm focus-visible:ring-1 focus-visible:ring-[#D62828]"
              />
            </div>

            {/* Categoria */}
            <div className="md:col-span-3">
              <select
                aria-label="Filtrar por categoria"
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="w-full h-10 rounded-lg border border-neutral-300 bg-white px-3 text-sm text-[#151515] focus:outline-none focus:ring-1 focus:ring-[#D62828]"
              >
                <option value="all">Todas as categorias</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Status de Estoque */}
            <div className="md:col-span-2">
              <select
                aria-label="Filtrar por status de estoque"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as StatusFilter)}
                className="w-full h-10 rounded-lg border border-neutral-300 bg-white px-3 text-sm text-[#151515] focus:outline-none focus:ring-1 focus:ring-[#D62828]"
              >
                <option value="all">Todos os status</option>
                <option value="in_stock">Em estoque</option>
                <option value="on_demand">Sob encomenda</option>
                <option value="out_of_stock">Esgotado</option>
              </select>
            </div>

            {/* Situação Ativo/Inativo */}
            <div className="md:col-span-2">
              <select
                aria-label="Filtrar por situação"
                value={activeFilter}
                onChange={(e) => setActiveFilter(e.target.value as ActiveFilter)}
                className="w-full h-10 rounded-lg border border-neutral-300 bg-white px-3 text-sm text-[#151515] focus:outline-none focus:ring-1 focus:ring-[#D62828]"
              >
                <option value="all">Ativos e inativos</option>
                <option value="active">Somente ativos</option>
                <option value="inactive">Somente inativos</option>
              </select>
            </div>
          </div>

          {hasActiveFilters && (
            <div className="flex items-center justify-between pt-1 border-t border-neutral-100 text-xs">
              <span className="inline-flex items-center gap-1.5 text-neutral-500">
                <Filter className="w-3.5 h-3.5 text-[#D62828]" />
                Filtros aplicados
              </span>
              <button
                type="button"
                onClick={clearFilters}
                className="font-semibold text-[#D62828] hover:text-[#b91c1c] cursor-pointer"
              >
                Limpar filtros
              </button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Estados de Carregamento / Erro / Vazio / Tabela */}
      {loading ? (
        <div className="bg-white border border-neutral-200 rounded-2xl p-12 flex flex-col items-center justify-center gap-3 text-neutral-600">
          <Loader2 className="w-6 h-6 animate-spin text-[#D62828]" />
          <p className="text-sm font-medium">Carregando produtos do Firestore...</p>
        </div>
      ) : error ? (
        <div
          role="alert"
          className="bg-red-50 border border-red-200 rounded-2xl p-6 flex items-start gap-3 text-red-800"
        >
          <AlertCircle className="w-5 h-5 text-[#D62828] shrink-0 mt-0.5" />
          <div className="flex flex-col gap-1">
            <span className="font-bold text-sm">Erro ao processar operação</span>
            <span className="text-xs sm:text-sm">{error}</span>
          </div>
        </div>
      ) : filteredProducts.length === 0 ? (
        <div className="bg-white border border-neutral-200 rounded-2xl p-12 flex flex-col items-center justify-center text-center gap-3">
          <PackageX className="w-10 h-10 text-neutral-400" />
          <div className="flex flex-col gap-1">
            <p className="text-base font-bold text-[#151515]">Nenhum produto encontrado</p>
            <p className="text-sm text-neutral-500">
              Ajuste os filtros ou cadastre um novo produto.
            </p>
          </div>
        </div>
      ) : (
        <div className="bg-white border border-neutral-200 rounded-2xl overflow-hidden shadow-2xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#F5F5F5] border-b border-neutral-200 text-[11px] font-bold uppercase tracking-wider text-neutral-600">
                  <th className="py-3.5 px-4">Produto</th>
                  <th className="py-3.5 px-4">Categoria</th>
                  <th className="py-3.5 px-4">Preço</th>
                  <th className="py-3.5 px-4">Estoque</th>
                  <th className="py-3.5 px-4">Situação</th>
                  <th className="py-3.5 px-4 text-right">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100 text-sm">
                {filteredProducts.map((product) => {
                  const statusInfo = STATUS_LABELS[product.status];
                  const categoryName =
                    categoryMap.get(product.categoryId) || product.categoryId;
                  const isBusy = busyProductId === product.id;

                  return (
                    <tr
                      key={product.id}
                      className={`hover:bg-neutral-50/80 transition-colors ${
                        !product.active ? "opacity-70 bg-neutral-50/40" : ""
                      }`}
                    >
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-3.5 min-w-[240px]">
                          <div className="relative w-12 h-12 rounded-xl bg-[#F5F5F5] border border-neutral-200 shrink-0 overflow-hidden p-1.5">
                            <Image
                              src={product.mainImageUrl}
                              alt={product.name}
                              fill
                              className="object-contain p-1"
                              sizes="48px"
                            />
                          </div>
                          <div className="flex flex-col min-w-0">
                            <div className="flex items-center gap-1.5">
                              <span className="font-bold text-[#151515] truncate">
                                {product.name}
                              </span>
                              {product.featured && (
                                <Star
                                  className="w-3.5 h-3.5 fill-amber-500 text-amber-500 shrink-0"
                                  aria-label="Produto em destaque"
                                />
                              )}
                            </div>
                            <div className="flex items-center gap-2 text-xs text-neutral-500">
                              <span>{product.brand}</span>
                              {product.code && (
                                <>
                                  <span className="text-neutral-300">•</span>
                                  <span className="font-mono text-[11px] text-neutral-600">
                                    {product.code}
                                  </span>
                                </>
                              )}
                            </div>
                          </div>
                        </div>
                      </td>

                      <td className="py-3.5 px-4 whitespace-nowrap text-neutral-700 font-medium">
                        {categoryName}
                      </td>

                      <td className="py-3.5 px-4 whitespace-nowrap font-semibold text-[#151515]">
                        {formatPrice(product.price, product.priceOnRequest)}
                      </td>

                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <Badge variant="outline" className={statusInfo.className}>
                          {statusInfo.label}
                        </Badge>
                      </td>

                      <td className="py-3.5 px-4 whitespace-nowrap">
                        {product.active ? (
                          <Badge
                            variant="outline"
                            className="bg-emerald-50 text-emerald-700 border-emerald-200"
                          >
                            Ativo
                          </Badge>
                        ) : (
                          <Badge
                            variant="outline"
                            className="bg-neutral-100 text-neutral-600 border-neutral-300"
                          >
                            Inativo
                          </Badge>
                        )}
                      </td>

                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <div className="flex items-center justify-end gap-1.5">
                          <Link
                            href={`/admin/produtos/${product.id}`}
                            title="Editar produto"
                            className="p-2 rounded-lg border border-neutral-200 bg-white text-neutral-700 hover:text-[#151515] hover:bg-neutral-50 transition-colors"
                          >
                            <Pencil className="w-4 h-4" />
                          </Link>

                          <button
                            type="button"
                            onClick={() => handleToggleFeatured(product)}
                            disabled={isBusy}
                            title={
                              product.featured
                                ? "Remover destaque"
                                : "Marcar como destaque"
                            }
                            className={`p-2 rounded-lg border transition-colors cursor-pointer disabled:opacity-50 ${
                              product.featured
                                ? "border-amber-300 bg-amber-50 text-amber-600 hover:bg-amber-100"
                                : "border-neutral-200 bg-white text-neutral-500 hover:text-amber-600 hover:bg-neutral-50"
                            }`}
                          >
                            <Star
                              className={`w-4 h-4 ${
                                product.featured ? "fill-amber-500" : ""
                              }`}
                            />
                          </button>

                          <button
                            type="button"
                            onClick={() => handleToggleActive(product)}
                            disabled={isBusy}
                            title={
                              product.active
                                ? "Desativar produto"
                                : "Ativar produto"
                            }
                            className={`p-2 rounded-lg border transition-colors cursor-pointer disabled:opacity-50 ${
                              product.active
                                ? "border-emerald-200 bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
                                : "border-neutral-200 bg-white text-neutral-500 hover:text-emerald-700 hover:bg-neutral-50"
                            }`}
                          >
                            <Power className="w-4 h-4" />
                          </button>

                          <button
                            type="button"
                            onClick={() => handleDelete(product)}
                            disabled={isBusy}
                            title="Excluir produto"
                            className="p-2 rounded-lg border border-neutral-200 bg-white text-neutral-500 hover:text-[#D62828] hover:border-red-200 hover:bg-red-50 transition-colors cursor-pointer disabled:opacity-50"
                          >
                            {isBusy ? (
                              <Loader2 className="w-4 h-4 animate-spin" />
                            ) : (
                              <Trash2 className="w-4 h-4" />
                            )}
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
