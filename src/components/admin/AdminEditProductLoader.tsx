"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Loader2, AlertCircle, ArrowLeft } from "lucide-react";
import { Category, Product } from "@/types";
import { getAdminProductById } from "@/services/admin-products.service";
import { ProductForm } from "./ProductForm";

interface AdminEditProductLoaderProps {
  categories: Category[];
}

export function AdminEditProductLoader({
  categories,
}: AdminEditProductLoaderProps) {
  const params = useParams<{ id: string }>();
  const productId = typeof params?.id === "string" ? params.id : "";
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoading(true);
      setError(null);
      try {
        const data = await getAdminProductById(productId);
        if (!cancelled) {
          setProduct(data);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : String(err));
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, [productId]);

  if (loading) {
    return (
      <div className="bg-white border border-neutral-200 rounded-2xl p-12 flex flex-col items-center justify-center gap-3 text-neutral-600 max-w-4xl mx-auto">
        <Loader2 className="w-6 h-6 animate-spin text-[#D62828]" />
        <p className="text-sm font-medium">Carregando dados do produto...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto flex flex-col gap-4">
        <div
          role="alert"
          className="bg-red-50 border border-red-200 rounded-2xl p-6 flex items-start gap-3 text-red-800"
        >
          <AlertCircle className="w-5 h-5 text-[#D62828] shrink-0 mt-0.5" />
          <div className="flex flex-col gap-1">
            <span className="font-bold text-sm">Erro ao carregar produto</span>
            <span className="text-xs sm:text-sm">{error}</span>
          </div>
        </div>
        <Link
          href="/admin"
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#151515] hover:text-[#D62828]"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Voltar para a listagem</span>
        </Link>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="max-w-4xl mx-auto bg-white border border-neutral-200 rounded-2xl p-10 text-center flex flex-col items-center gap-4">
        <p className="text-base font-bold text-[#151515]">Produto não encontrado</p>
        <p className="text-sm text-neutral-500">
          O produto solicitado não existe ou já foi removido.
        </p>
        <Link
          href="/admin"
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#D62828] hover:underline"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Voltar para a listagem</span>
        </Link>
      </div>
    );
  }

  return (
    <ProductForm
      mode="edit"
      categories={categories}
      initialProduct={product}
    />
  );
}
