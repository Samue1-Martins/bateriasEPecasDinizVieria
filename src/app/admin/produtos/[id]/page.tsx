import React, { Suspense } from "react";
import { getCategories } from "@/services";
import { AdminEditProductLoader } from "@/components/admin/AdminEditProductLoader";

export default async function AdminEditProductPage() {
  const categories = await getCategories();

  return (
    <Suspense
      fallback={
        <div className="max-w-4xl mx-auto bg-white border border-neutral-200 rounded-2xl p-12 text-center text-sm text-neutral-500">
          Carregando produto...
        </div>
      }
    >
      <AdminEditProductLoader categories={categories} />
    </Suspense>
  );
}
