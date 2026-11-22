import React from "react";
import { getCategories } from "@/services";
import { ProductForm } from "@/components/admin/ProductForm";

export default async function AdminNewProductPage() {
  const categories = await getCategories();

  return <ProductForm mode="create" categories={categories} />;
}
