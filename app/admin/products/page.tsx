import { AdminProductForm } from "@/components/admin/admin-product-form";

export default function AdminProductsPage() {
  return (
    <div className="section-shell py-10">
      <p className="text-sm font-bold uppercase text-ember">Admin products</p>
      <h1 className="mt-2 text-4xl font-black">Add and manage products</h1>
      <div className="mt-8">
        <AdminProductForm />
      </div>
    </div>
  );
}
