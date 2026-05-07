import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Search, SlidersHorizontal, Star } from "lucide-react";
import { AddToCart } from "@/components/commerce/add-to-cart";
import { productCatalog } from "@/lib/constants/products";
import { categories } from "@/lib/constants/site";

export const metadata: Metadata = {
  title: "Fire Safety Products",
  description: "Shop certified fire extinguishers, detectors, alarms, hydrant equipment, emergency lights, and PPE."
};

export default function ProductsPage({
  searchParams
}: {
  searchParams?: Promise<{ category?: string; search?: string }>;
}) {
  return <ProductList searchParams={searchParams} />;
}

async function ProductList({ searchParams }: { searchParams?: Promise<{ category?: string; search?: string }> }) {
  const resolved = await searchParams;
  const query = resolved?.search?.toLowerCase() || "";
  const category = resolved?.category || "";
  const products = productCatalog.filter((product) =>
    [product.name, product.category, product.shortDesc, product.usageArea].join(" ").toLowerCase().includes(query)
    && (!category || product.category.toLowerCase().replaceAll(" ", "-") === category)
  );

  return (
    <div className="bg-smoke">
      <div className="section-shell py-12">
      <div className="mb-8 rounded-3xl border border-line bg-white p-6 shadow-soft">
        <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-sm font-bold uppercase text-ember">Product catalog</p>
          <h1 className="mt-2 text-4xl font-black tracking-tight">Certified fire and industrial safety products</h1>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600">GST-ready billing, bulk contractor pricing, refill support, installation help, and QR-based service history for selected products.</p>
        </div>
        <form className="flex min-w-72 gap-2 rounded-2xl border border-line bg-slate-50 p-2">
          <Search className="ml-2 mt-2.5 size-4 text-slate-400" />
          <input name="search" defaultValue={resolved?.search || ""} placeholder="Search extinguishers, PPE, alarms..." className="h-10 flex-1 bg-transparent px-2 text-sm outline-none" />
          <button className="rounded-xl bg-carbon px-5 text-sm font-bold text-white transition hover:bg-slate-800">Search</button>
        </form>
        </div>
      </div>
      <div className="grid gap-6 lg:grid-cols-[240px_1fr]">
        <aside className="h-fit rounded-3xl border border-line bg-white p-5 shadow-soft">
          <h2 className="flex items-center gap-2 font-black"><SlidersHorizontal className="size-4 text-ember" /> Filters</h2>
          <div className="mt-4 grid gap-2 text-sm">
            <a href="/products" className={`rounded-xl px-3 py-2 font-semibold ${!category ? "bg-red-50 text-ember" : "text-slate-600 hover:bg-slate-50"}`}>All products</a>
            {categories.slice(0, 12).map((item) => {
              const slug = item.toLowerCase().replaceAll(" ", "-");
              return <a key={item} href={`/products?category=${slug}`} className={`rounded-xl px-3 py-2 font-semibold ${category === slug ? "bg-red-50 text-ember" : "text-slate-600 hover:bg-slate-50"}`}>{item}</a>;
            })}
          </div>
          <div className="mt-6 rounded-2xl bg-slate-50 p-4">
            <p className="text-sm font-black">Business purchase?</p>
            <p className="mt-1 text-xs leading-5 text-slate-500">Request GST quote, contractor pricing, and installation support.</p>
            <a href="/quote" className="mt-3 inline-flex text-sm font-bold text-ember">Request quote</a>
          </div>
        </aside>
        <section className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {products.map((product) => (
            <div key={product.slug} className="group rounded-3xl border border-line bg-white p-3 shadow-soft transition duration-300 hover:-translate-y-1 hover:border-red-200 hover:shadow-industrial">
              <Link href={`/products/${product.slug}`}>
                <div className="relative overflow-hidden rounded-2xl bg-slate-100">
                  <Image src={product.images[0]} alt={product.name} width={600} height={420} className="h-56 w-full object-cover transition duration-500 group-hover:scale-105" />
                  <span className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 text-xs font-bold text-ember shadow-sm">GST {product.gstRate || 18}%</span>
                </div>
                <p className="mt-4 text-xs font-bold uppercase text-ember">{product.category}</p>
                <h2 className="mt-2 min-h-14 text-lg font-black leading-snug group-hover:text-ember">{product.name}</h2>
                <p className="mt-2 min-h-12 text-sm leading-6 text-slate-600">{product.shortDesc}</p>
              </Link>
              <div className="mt-3 flex items-center justify-between text-xs text-slate-500">
                <span className="flex items-center gap-1 font-bold text-amber-600"><Star className="size-3 fill-amber-500" /> {product.rating || 4.5}</span>
                <span>{product.reviews || 24} reviews</span>
              </div>
              <div className="mt-3 rounded-2xl bg-slate-50 p-3 text-xs leading-5 text-slate-600">
                <p><b>Use:</b> {product.usageArea}</p>
                <p><b>Service:</b> {product.serviceSupport}</p>
              </div>
              <div className="mt-4 flex items-center justify-between">
                <span className="text-xl font-black">₹{product.price.toLocaleString("en-IN")}</span>
                <span className="rounded-full bg-emerald-50 px-2 py-1 text-xs font-bold text-emerald-700">{product.stock} in stock</span>
              </div>
              {product.bulkPrice && <p className="mt-1 text-xs font-semibold text-slate-500">Bulk from ₹{product.bulkPrice.toLocaleString("en-IN")} / unit</p>}
              <div className="mt-4">
                <AddToCart product={{ productId: product.slug, name: product.name, sku: product.sku, price: product.price, gstRate: product.gstRate || 18, image: product.images[0] }} />
              </div>
            </div>
          ))}
        </section>
      </div>
      </div>
    </div>
  );
}
