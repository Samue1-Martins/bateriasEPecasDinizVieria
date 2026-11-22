import React from "react";
import { getCategories } from "@/services";
import { AdminProductsList } from "@/components/admin/AdminProductsList";

export default async function AdminPage() {
  const categories = await getCategories();

  return <AdminProductsList categories={categories} />;
}
