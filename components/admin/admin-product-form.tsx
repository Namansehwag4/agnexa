"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

export function AdminProductForm() {
  const [status, setStatus] = useState("");

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const payload = {
      name: formData.get("name"),
      slug: formData.get("slug"),
      sku: formData.get("sku"),
      shortDesc: formData.get("shortDesc"),
      description: formData.get("description"),
      price: Number(formData.get("price")),
      stock: Number(formData.get("stock")),
      categoryId: formData.get("categoryId")
    };
    setStatus("Saving product...");
    const response = await fetch("/api/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
    setStatus(response.ok ? "Product saved." : "Could not save product. Check admin auth and category ID.");
  }

  return (
    <form onSubmit={submit} className="grid gap-4 rounded-lg border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-carbon">
      <div className="grid gap-4 md:grid-cols-2">
        <Field name="name" label="Product name" required />
        <Field name="slug" label="SEO slug" required />
        <Field name="sku" label="SKU" required />
        <Field name="categoryId" label="Category ID" required />
        <Field name="price" label="Price" type="number" required />
        <Field name="stock" label="Stock" type="number" required />
      </div>
      <Field name="shortDesc" label="Short description" required />
      <label className="grid gap-2 text-sm font-semibold">
        Description
        <textarea name="description" rows={5} className="rounded-md border border-zinc-200 bg-transparent px-3 py-3 dark:border-zinc-800" />
      </label>
      <label className="grid gap-2 text-sm font-semibold">
        Product images
        <input name="images" type="file" multiple className="rounded-md border border-zinc-200 px-3 py-3 dark:border-zinc-800" />
      </label>
      <Button type="submit">Save product</Button>
      {status && <p className="text-sm font-semibold text-ember">{status}</p>}
    </form>
  );
}

function Field({ label, ...props }: React.InputHTMLAttributes<HTMLInputElement> & { label: string }) {
  return (
    <label className="grid gap-2 text-sm font-semibold">
      {label}
      <input {...props} className="h-11 rounded-md border border-zinc-200 bg-transparent px-3 dark:border-zinc-800" />
    </label>
  );
}
