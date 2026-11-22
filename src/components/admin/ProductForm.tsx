"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Save,
  Loader2,
  AlertCircle,
  Upload,
  Trash2,
  Plus,
  ImageIcon,
} from "lucide-react";
import { Category, Product, ProductSpecification, ProductStatus } from "@/types";
import {
  AdminProductInput,
  createProduct,
  updateProduct,
  generateSlug,
  isSlugAvailable,
} from "@/services/admin-products.service";
import {
  validateImageFile,
  uploadProductImage,
  deleteProductImage,
  extractStoragePathFromUrl,
} from "@/services/storage.service";
import { invalidateCatalogCache } from "@/app/admin/actions";
import { auth } from "@/lib/firebase";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/Button";

interface ProductFormProps {
  mode: "create" | "edit";
  categories: Category[];
  initialProduct?: Product;
}

interface PendingGalleryFile {
  id: string;
  file: File;
  previewUrl: string;
}

export function ProductForm({
  mode,
  categories,
  initialProduct,
}: ProductFormProps) {
  const router = useRouter();

  // Campos básicos
  const [name, setName] = useState(initialProduct?.name ?? "");
  const [slug, setSlug] = useState(initialProduct?.slug ?? "");
  const [slugEditedManually, setSlugEditedManually] = useState(mode === "edit");
  const [brand, setBrand] = useState(initialProduct?.brand ?? "");
  const [categoryId, setCategoryId] = useState(
    initialProduct?.categoryId ?? categories[0]?.id ?? ""
  );
  const [code, setCode] = useState(initialProduct?.code ?? "");
  const [description, setDescription] = useState(initialProduct?.description ?? "");

  // Preço e status
  const [priceOnRequest, setPriceOnRequest] = useState(
    initialProduct?.priceOnRequest ?? false
  );
  const [priceText, setPriceText] = useState(
    initialProduct?.price !== null && initialProduct?.price !== undefined
      ? String(initialProduct.price)
      : ""
  );
  const [status, setStatus] = useState<ProductStatus>(
    initialProduct?.status ?? "in_stock"
  );
  const [active, setActive] = useState(initialProduct?.active ?? true);
  const [featured, setFeatured] = useState(initialProduct?.featured ?? false);

  // Imagem principal
  const [existingMainImageUrl] = useState(initialProduct?.mainImageUrl ?? "");
  const [existingMainImagePath] = useState(initialProduct?.mainImagePath ?? "");
  const [mainImageFile, setMainImageFile] = useState<File | null>(null);
  const [mainImagePreview, setMainImagePreview] = useState<string | null>(null);

  // Galeria de imagens
  const [existingGalleryUrls, setExistingGalleryUrls] = useState<string[]>(
    initialProduct?.galleryUrls ?? []
  );
  const [removedGalleryUrls, setRemovedGalleryUrls] = useState<string[]>([]);
  const [pendingGalleryFiles, setPendingGalleryFiles] = useState<PendingGalleryFile[]>([]);

  // Especificações técnicas
  const [specifications, setSpecifications] = useState<ProductSpecification[]>(
    initialProduct?.specifications ?? []
  );

  // Aplicações veiculares
  const [vehicleApplications, setVehicleApplications] = useState<string[]>(
    initialProduct?.vehicleApplications ?? []
  );

  // Estado de submissão
  const [submitting, setSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Limpeza de Object URLs ao desmontar
  useEffect(() => {
    return () => {
      if (mainImagePreview) {
        URL.revokeObjectURL(mainImagePreview);
      }
      for (const item of pendingGalleryFiles) {
        URL.revokeObjectURL(item.previewUrl);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleNameChange = (value: string) => {
    setName(value);
    if (!slugEditedManually) {
      setSlug(generateSlug(value));
    }
  };

  const handleSlugChange = (value: string) => {
    setSlugEditedManually(true);
    setSlug(value);
  };

  const handleMainImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    setErrorMessage(null);
    const file = e.target.files?.[0];
    if (!file) return;

    const validationError = validateImageFile(file);
    if (validationError) {
      setErrorMessage(validationError);
      e.target.value = "";
      return;
    }

    if (mainImagePreview) {
      URL.revokeObjectURL(mainImagePreview);
    }

    setMainImageFile(file);
    setMainImagePreview(URL.createObjectURL(file));
  };

  const handleClearNewMainImage = () => {
    if (mainImagePreview) {
      URL.revokeObjectURL(mainImagePreview);
    }
    setMainImageFile(null);
    setMainImagePreview(null);
  };

  const handleGalleryFilesSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    setErrorMessage(null);
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    const validNewItems: PendingGalleryFile[] = [];
    for (const file of files) {
      const validationError = validateImageFile(file);
      if (validationError) {
        setErrorMessage(validationError);
        e.target.value = "";
        return;
      }
      validNewItems.push({
        id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
        file,
        previewUrl: URL.createObjectURL(file),
      });
    }

    setPendingGalleryFiles((prev) => [...prev, ...validNewItems]);
    e.target.value = "";
  };

  const handleRemoveExistingGalleryImage = (url: string) => {
    setExistingGalleryUrls((prev) => prev.filter((item) => item !== url));
    setRemovedGalleryUrls((prev) => [...prev, url]);
  };

  const handleRemovePendingGalleryImage = (id: string) => {
    setPendingGalleryFiles((prev) => {
      const target = prev.find((item) => item.id === id);
      if (target) {
        URL.revokeObjectURL(target.previewUrl);
      }
      return prev.filter((item) => item.id !== id);
    });
  };

  // Especificações
  const addSpecification = () => {
    setSpecifications((prev) => [...prev, { label: "", value: "" }]);
  };

  const updateSpecification = (
    index: number,
    field: "label" | "value",
    val: string
  ) => {
    setSpecifications((prev) =>
      prev.map((item, i) => (i === index ? { ...item, [field]: val } : item))
    );
  };

  const removeSpecification = (index: number) => {
    setSpecifications((prev) => prev.filter((_, i) => i !== index));
  };

  // Aplicações veiculares
  const addVehicleApplication = () => {
    setVehicleApplications((prev) => [...prev, ""]);
  };

  const updateVehicleApplication = (index: number, val: string) => {
    setVehicleApplications((prev) =>
      prev.map((item, i) => (i === index ? val : item))
    );
  };

  const removeVehicleApplication = (index: number) => {
    setVehicleApplications((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage(null);

    // 1. Validações de formulário
    const trimmedName = name.trim();
    const normalizedSlug = generateSlug(slug);
    const trimmedBrand = brand.trim();
    const trimmedDescription = description.trim();

    if (!trimmedName) {
      setErrorMessage("Informe o nome do produto.");
      return;
    }
    if (!normalizedSlug) {
      setErrorMessage("Informe um slug válido para o produto.");
      return;
    }
    if (!trimmedBrand) {
      setErrorMessage("Informe a marca do produto.");
      return;
    }
    if (!categoryId) {
      setErrorMessage("Selecione uma categoria.");
      return;
    }
    if (!trimmedDescription) {
      setErrorMessage("Informe a descrição do produto.");
      return;
    }

    let parsedPrice: number | null = null;
    if (!priceOnRequest) {
      if (priceText.trim() !== "") {
        const normalizedNumber = Number(priceText.replace(",", "."));
        if (!Number.isFinite(normalizedNumber) || normalizedNumber < 0) {
          setErrorMessage("Informe um preço válido (número maior ou igual a zero).");
          return;
        }
        parsedPrice = normalizedNumber;
      }
    }

    if (mode === "create" && !mainImageFile) {
      setErrorMessage("Selecione a imagem principal do produto.");
      return;
    }

    // Filtra especificações e aplicações preenchidas
    const cleanedSpecs = specifications
      .map((s) => ({ label: s.label.trim(), value: s.value.trim() }))
      .filter((s) => s.label !== "" || s.value !== "");

    for (const spec of cleanedSpecs) {
      if (!spec.label || !spec.value) {
        setErrorMessage(
          "Preencha tanto o nome quanto o valor em todas as especificações técnicas."
        );
        return;
      }
    }

    const cleanedApplications = vehicleApplications
      .map((a) => a.trim())
      .filter((a) => a !== "");

    setSubmitting(true);
    const newlyUploadedPaths: string[] = [];

    try {
      // 2. Valida unicidade do slug antes de fazer qualquer upload
      setSubmitStatus("Validando slug...");
      const slugAvailable = await isSlugAvailable(
        normalizedSlug,
        mode === "edit" ? initialProduct?.id : undefined
      );
      if (!slugAvailable) {
        setErrorMessage(`O slug "${normalizedSlug}" já está sendo usado por outro produto.`);
        setSubmitting(false);
        setSubmitStatus(null);
        return;
      }

      // 3. Upload das novas imagens para o Storage
      let finalMainImageUrl = existingMainImageUrl;
      let finalMainImagePath: string | undefined =
        existingMainImagePath || extractStoragePathFromUrl(existingMainImageUrl) || undefined;

      if (mainImageFile) {
        setSubmitStatus("Enviando imagem principal...");
        const uploaded = await uploadProductImage(mainImageFile, normalizedSlug);
        finalMainImageUrl = uploaded.url;
        finalMainImagePath = uploaded.path;
        newlyUploadedPaths.push(uploaded.path);
      }

      const uploadedGalleryResults: { url: string; path: string }[] = [];
      if (pendingGalleryFiles.length > 0) {
        setSubmitStatus(
          `Enviando ${pendingGalleryFiles.length} imagem(ns) da galeria...`
        );
        for (const item of pendingGalleryFiles) {
          const uploaded = await uploadProductImage(item.file, normalizedSlug);
          uploadedGalleryResults.push(uploaded);
          newlyUploadedPaths.push(uploaded.path);
        }
      }

      const finalGalleryUrls = [
        ...existingGalleryUrls,
        ...uploadedGalleryResults.map((u) => u.url),
      ];
      const finalGalleryPaths = finalGalleryUrls
        .map((u) => extractStoragePathFromUrl(u))
        .filter((p): p is string => Boolean(p));

      const inputPayload: AdminProductInput = {
        name: trimmedName,
        slug: normalizedSlug,
        description: trimmedDescription,
        brand: trimmedBrand,
        categoryId,
        code: code.trim() || undefined,
        price: parsedPrice,
        priceOnRequest,
        status,
        active,
        featured,
        mainImageUrl: finalMainImageUrl,
        mainImagePath: finalMainImagePath,
        galleryUrls: finalGalleryUrls,
        galleryPaths: finalGalleryPaths,
        specifications: cleanedSpecs,
        vehicleApplications: cleanedApplications,
      };

      // 4. Salva no Firestore
      setSubmitStatus("Salvando produto no Firestore...");
      if (mode === "create") {
        await createProduct(inputPayload);
      } else if (initialProduct) {
        await updateProduct(initialProduct.id, inputPayload);
      }

      // Invalida o cache do catálogo público imediatamente (com validação do token admin no servidor)
      const idToken = await auth.currentUser?.getIdToken();
      if (idToken) {
        await invalidateCatalogCache(idToken);
      }

      // 5. Somente após sucesso no Firestore, remove imagens antigas que deixaram de ser usadas
      const stillUsedPaths = new Set<string>();
      const mainPathInUse = extractStoragePathFromUrl(finalMainImageUrl);
      if (mainPathInUse) stillUsedPaths.add(mainPathInUse);
      for (const p of finalGalleryPaths) {
        stillUsedPaths.add(p);
      }

      const oldCandidatesToRemove = new Set<string>();
      if (mainImageFile && existingMainImageUrl) {
        const oldMainPath =
          existingMainImagePath || extractStoragePathFromUrl(existingMainImageUrl);
        if (oldMainPath && !stillUsedPaths.has(oldMainPath)) {
          oldCandidatesToRemove.add(oldMainPath);
        }
      }

      for (const removedUrl of removedGalleryUrls) {
        const oldPath = extractStoragePathFromUrl(removedUrl);
        if (oldPath && !stillUsedPaths.has(oldPath)) {
          oldCandidatesToRemove.add(oldPath);
        }
      }

      if (oldCandidatesToRemove.size > 0) {
        setSubmitStatus("Limpando imagens antigas...");
        for (const pathToRemove of oldCandidatesToRemove) {
          await deleteProductImage(pathToRemove);
        }
      }

      router.push("/admin");
      router.refresh();
    } catch (error) {
      // Rollback: se o Firestore falhar após uploads, remove os arquivos recém-enviados
      if (newlyUploadedPaths.length > 0) {
        setSubmitStatus("Revertendo uploads após falha...");
        for (const uploadedPath of newlyUploadedPaths) {
          await deleteProductImage(uploadedPath);
        }
      }

      const message = error instanceof Error ? error.message : String(error);
      setErrorMessage(message);
    } finally {
      setSubmitting(false);
      setSubmitStatus(null);
    }
  };

  const displayedMainImage = mainImagePreview || existingMainImageUrl;

  return (
    <div className="flex flex-col gap-6 max-w-4xl mx-auto">
      {/* Cabeçalho */}
      <div className="flex flex-col gap-2">
        <Link
          href="/admin"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-neutral-500 hover:text-[#151515] transition-colors w-fit"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Voltar para a listagem</span>
        </Link>

        <div className="flex items-center gap-2 mt-1">
          <span className="w-1.5 h-1.5 rounded-full bg-[#D62828]" />
          <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#D62828]">
            {mode === "create" ? "Novo Cadastro" : "Edição de Produto"}
          </span>
        </div>

        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#151515] tracking-tight">
          {mode === "create"
            ? "Cadastrar produto"
            : `Editar: ${initialProduct?.name}`}
        </h1>
      </div>

      {errorMessage && (
        <div
          role="alert"
          className="flex items-start gap-2.5 p-4 rounded-xl bg-red-50 border border-red-200 text-red-800 text-sm"
        >
          <AlertCircle className="w-5 h-5 text-[#D62828] shrink-0 mt-0.5" />
          <span>{errorMessage}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col gap-6" noValidate>
        {/* 1. Informações Básicas */}
        <Card className="bg-white border border-neutral-200 rounded-2xl shadow-2xs">
          <CardContent className="p-6 flex flex-col gap-5">
            <h2 className="text-base font-bold text-[#151515] border-b border-neutral-100 pb-3">
              Informações básicas
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-neutral-700">
                  Nome do produto *
                </label>
                <Input
                  value={name}
                  onChange={(e) => handleNameChange(e.target.value)}
                  placeholder="Ex.: Bateria Automotiva 60Ah Selada"
                  disabled={submitting}
                  className="h-10 bg-white border-neutral-300"
                  required
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-neutral-700">
                  Slug (URL) *
                </label>
                <Input
                  value={slug}
                  onChange={(e) => handleSlugChange(e.target.value)}
                  placeholder="ex-bateria-automotiva-60ah"
                  disabled={submitting}
                  className="h-10 bg-white border-neutral-300 font-mono text-xs"
                  required
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-neutral-700">
                  Marca *
                </label>
                <Input
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                  placeholder="Ex.: Voltiva Energy"
                  disabled={submitting}
                  className="h-10 bg-white border-neutral-300"
                  required
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-neutral-700">
                  Categoria *
                </label>
                <select
                  value={categoryId}
                  onChange={(e) => setCategoryId(e.target.value)}
                  disabled={submitting}
                  className="w-full h-10 rounded-lg border border-neutral-300 bg-white px-3 text-sm text-[#151515] focus:outline-none focus:ring-1 focus:ring-[#D62828]"
                  required
                >
                  <option value="">Selecione uma categoria</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-neutral-700">
                  Código de referência
                </label>
                <Input
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  placeholder="Ex.: BAT-60AH-01"
                  disabled={submitting}
                  className="h-10 bg-white border-neutral-300 font-mono text-xs"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-neutral-700">
                  Status de estoque *
                </label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value as ProductStatus)}
                  disabled={submitting}
                  className="w-full h-10 rounded-lg border border-neutral-300 bg-white px-3 text-sm text-[#151515] focus:outline-none focus:ring-1 focus:ring-[#D62828]"
                >
                  <option value="in_stock">Em estoque</option>
                  <option value="on_demand">Sob encomenda</option>
                  <option value="out_of_stock">Esgotado</option>
                </select>
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-neutral-700">
                Descrição *
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={4}
                disabled={submitting}
                placeholder="Descreva as características principais do produto..."
                className="w-full rounded-lg border border-neutral-300 bg-white p-3 text-sm text-[#151515] focus:outline-none focus:ring-1 focus:ring-[#D62828]"
                required
              />
            </div>

            {/* Preço e Visibilidade */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 border-t border-neutral-100">
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold uppercase tracking-wider text-neutral-700">
                  Preço (R$)
                </label>
                <Input
                  type="text"
                  inputMode="decimal"
                  value={priceText}
                  onChange={(e) => setPriceText(e.target.value)}
                  placeholder="Ex.: 489.90"
                  disabled={submitting || priceOnRequest}
                  className="h-10 bg-white border-neutral-300 disabled:bg-neutral-100"
                />
                <label className="inline-flex items-center gap-2 text-sm text-neutral-700 cursor-pointer mt-1">
                  <input
                    type="checkbox"
                    checked={priceOnRequest}
                    onChange={(e) => setPriceOnRequest(e.target.checked)}
                    disabled={submitting}
                    className="rounded border-neutral-300 accent-[#D62828]"
                  />
                  <span>Preço sob consulta</span>
                </label>
              </div>

              <div className="flex flex-col gap-3 justify-center">
                <label className="inline-flex items-center gap-2.5 text-sm font-medium text-[#151515] cursor-pointer">
                  <input
                    type="checkbox"
                    checked={active}
                    onChange={(e) => setActive(e.target.checked)}
                    disabled={submitting}
                    className="rounded border-neutral-300 accent-[#D62828] w-4 h-4"
                  />
                  <span>Produto ativo (visível no catálogo público)</span>
                </label>

                <label className="inline-flex items-center gap-2.5 text-sm font-medium text-[#151515] cursor-pointer">
                  <input
                    type="checkbox"
                    checked={featured}
                    onChange={(e) => setFeatured(e.target.checked)}
                    disabled={submitting}
                    className="rounded border-neutral-300 accent-[#D62828] w-4 h-4"
                  />
                  <span>Exibir em destaque na página inicial</span>
                </label>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 2. Imagens */}
        <Card className="bg-white border border-neutral-200 rounded-2xl shadow-2xs">
          <CardContent className="p-6 flex flex-col gap-6">
            <div className="border-b border-neutral-100 pb-3">
              <h2 className="text-base font-bold text-[#151515]">
                Imagens do produto
              </h2>
              <p className="text-xs text-neutral-500 mt-0.5">
                Aceita apenas arquivos de imagem (máximo 5 MB cada). Os envios ao Storage ocorrem somente ao salvar.
              </p>
            </div>

            {/* Imagem Principal */}
            <div className="flex flex-col gap-3">
              <label className="text-xs font-bold uppercase tracking-wider text-neutral-700">
                Imagem principal *
              </label>

              <div className="flex flex-col sm:flex-row items-start gap-4">
                <div className="w-36 h-36 rounded-xl bg-[#F5F5F5] border border-neutral-200 flex items-center justify-center overflow-hidden p-2 shrink-0">
                  {displayedMainImage ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={displayedMainImage}
                      alt="Pré-visualização da imagem principal"
                      className="max-w-full max-h-full object-contain"
                    />
                  ) : (
                    <ImageIcon className="w-8 h-8 text-neutral-400" />
                  )}
                </div>

                <div className="flex flex-col gap-2">
                  <label className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-neutral-300 bg-white hover:bg-neutral-50 text-xs font-semibold text-[#151515] cursor-pointer w-fit">
                    <Upload className="w-4 h-4 text-[#D62828]" />
                    <span>
                      {displayedMainImage
                        ? "Substituir imagem principal"
                        : "Selecionar imagem principal"}
                    </span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleMainImageSelect}
                      disabled={submitting}
                      className="hidden"
                    />
                  </label>

                  {mainImageFile && (
                    <div className="flex items-center gap-2 text-xs text-neutral-600">
                      <span>Selecionado: {mainImageFile.name}</span>
                      {existingMainImageUrl && (
                        <button
                          type="button"
                          onClick={handleClearNewMainImage}
                          className="text-[#D62828] font-semibold hover:underline cursor-pointer"
                        >
                          Desfazer
                        </button>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Galeria de Imagens */}
            <div className="flex flex-col gap-3 pt-4 border-t border-neutral-100">
              <div className="flex items-center justify-between gap-2">
                <label className="text-xs font-bold uppercase tracking-wider text-neutral-700">
                  Galeria de imagens adicionais
                </label>

                <label className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-neutral-300 bg-white hover:bg-neutral-50 text-xs font-semibold text-[#151515] cursor-pointer">
                  <Plus className="w-3.5 h-3.5 text-[#D62828]" />
                  <span>Adicionar imagens</span>
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleGalleryFilesSelect}
                    disabled={submitting}
                    className="hidden"
                  />
                </label>
              </div>

              {existingGalleryUrls.length === 0 && pendingGalleryFiles.length === 0 ? (
                <p className="text-xs text-neutral-500">
                  Nenhuma imagem adicional na galeria.
                </p>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {existingGalleryUrls.map((url) => (
                    <div
                      key={url}
                      className="relative group rounded-xl bg-[#F5F5F5] border border-neutral-200 p-2 aspect-square flex items-center justify-center overflow-hidden"
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={url}
                        alt="Imagem da galeria"
                        className="max-w-full max-h-full object-contain"
                      />
                      <button
                        type="button"
                        onClick={() => handleRemoveExistingGalleryImage(url)}
                        disabled={submitting}
                        title="Remover da galeria"
                        className="absolute top-1.5 right-1.5 p-1.5 rounded-lg bg-white/90 border border-neutral-200 text-neutral-600 hover:text-[#D62828] cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}

                  {pendingGalleryFiles.map((item) => (
                    <div
                      key={item.id}
                      className="relative group rounded-xl bg-amber-50/40 border border-amber-300 p-2 aspect-square flex items-center justify-center overflow-hidden"
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={item.previewUrl}
                        alt={item.file.name}
                        className="max-w-full max-h-full object-contain"
                      />
                      <span className="absolute bottom-1.5 left-1.5 px-1.5 py-0.5 rounded bg-amber-100 text-amber-900 text-[10px] font-bold">
                        Nova
                      </span>
                      <button
                        type="button"
                        onClick={() => handleRemovePendingGalleryImage(item.id)}
                        disabled={submitting}
                        title="Remover da seleção"
                        className="absolute top-1.5 right-1.5 p-1.5 rounded-lg bg-white/90 border border-neutral-200 text-neutral-600 hover:text-[#D62828] cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* 3. Especificações Técnicas */}
        <Card className="bg-white border border-neutral-200 rounded-2xl shadow-2xs">
          <CardContent className="p-6 flex flex-col gap-4">
            <div className="flex items-center justify-between border-b border-neutral-100 pb-3">
              <h2 className="text-base font-bold text-[#151515]">
                Especificações técnicas
              </h2>
              <Button
                type="button"
                variant="outline"
                onClick={addSpecification}
                disabled={submitting}
                className="h-8 px-3 text-xs font-semibold gap-1.5 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Adicionar</span>
              </Button>
            </div>

            {specifications.length === 0 ? (
              <p className="text-xs text-neutral-500">
                Nenhuma especificação cadastrada.
              </p>
            ) : (
              <div className="flex flex-col gap-2.5">
                {specifications.map((spec, index) => (
                  <div key={index} className="grid grid-cols-1 sm:grid-cols-12 gap-2 items-center">
                    <Input
                      value={spec.label}
                      onChange={(e) =>
                        updateSpecification(index, "label", e.target.value)
                      }
                      placeholder="Ex.: Tensão Nominal"
                      disabled={submitting}
                      className="sm:col-span-5 h-9 text-sm bg-white border-neutral-300"
                    />
                    <Input
                      value={spec.value}
                      onChange={(e) =>
                        updateSpecification(index, "value", e.target.value)
                      }
                      placeholder="Ex.: 12 V"
                      disabled={submitting}
                      className="sm:col-span-6 h-9 text-sm bg-white border-neutral-300"
                    />
                    <div className="sm:col-span-1 flex justify-end">
                      <button
                        type="button"
                        onClick={() => removeSpecification(index)}
                        disabled={submitting}
                        title="Remover especificação"
                        className="p-2 text-neutral-400 hover:text-[#D62828] cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* 4. Aplicações em Veículos */}
        <Card className="bg-white border border-neutral-200 rounded-2xl shadow-2xs">
          <CardContent className="p-6 flex flex-col gap-4">
            <div className="flex items-center justify-between border-b border-neutral-100 pb-3">
              <h2 className="text-base font-bold text-[#151515]">
                Aplicações em veículos
              </h2>
              <Button
                type="button"
                variant="outline"
                onClick={addVehicleApplication}
                disabled={submitting}
                className="h-8 px-3 text-xs font-semibold gap-1.5 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Adicionar</span>
              </Button>
            </div>

            {vehicleApplications.length === 0 ? (
              <p className="text-xs text-neutral-500">
                Nenhuma aplicação veicular cadastrada.
              </p>
            ) : (
              <div className="flex flex-col gap-2.5">
                {vehicleApplications.map((app, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <Input
                      value={app}
                      onChange={(e) =>
                        updateVehicleApplication(index, e.target.value)
                      }
                      placeholder="Ex.: Veículos hatch e sedãs compactos 1.0 a 1.8 Flex"
                      disabled={submitting}
                      className="h-9 text-sm bg-white border-neutral-300"
                    />
                    <button
                      type="button"
                      onClick={() => removeVehicleApplication(index)}
                      disabled={submitting}
                      title="Remover aplicação"
                      className="p-2 text-neutral-400 hover:text-[#D62828] cursor-pointer shrink-0"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Ações finais */}
        <div className="flex flex-col sm:flex-row items-center justify-end gap-3 pt-2">
          <Link href="/admin" className="w-full sm:w-auto">
            <Button
              type="button"
              variant="outline"
              disabled={submitting}
              className="w-full sm:w-auto h-11 px-6 text-sm font-semibold cursor-pointer"
            >
              Cancelar
            </Button>
          </Link>

          <Button
            type="submit"
            disabled={submitting}
            className="w-full sm:w-auto h-11 px-7 bg-[#D62828] hover:bg-[#b91c1c] text-white font-bold text-sm gap-2 cursor-pointer"
          >
            {submitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>{submitStatus || "Salvando..."}</span>
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                <span>
                  {mode === "create" ? "Cadastrar produto" : "Salvar alterações"}
                </span>
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}
