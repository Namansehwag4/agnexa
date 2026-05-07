import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import Script from "next/script";
import { CheckCircle2, QrCode, RotateCcw, Star, Truck, Wrench } from "lucide-react";
import { AddToCart } from "@/components/commerce/add-to-cart";
import { LinkButton } from "@/components/ui/button";
import { productCatalog } from "@/lib/constants/products";
import { productSchema } from "@/lib/seo/schema";

export function generateStaticParams() {
  return productCatalog.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const product = productCatalog.find((item) => item.slug === slug);
  if (!product) return {};
  return {
    title: product.name,
    description: product.shortDesc,
    alternates: { canonical: `/products/${product.slug}` }
  };
}

export default async function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = productCatalog.find((item) => item.slug === slug);
  if (!product) notFound();

  return (
    <div className="bg-smoke py-12">
      <div className="section-shell">
      <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr]">
        <div>
          <Image src={product.images[0]} alt={product.name} width={1000} height={760} className="h-[420px] w-full rounded-3xl object-cover shadow-industrial" priority />
          <div className="mt-4 grid grid-cols-4 gap-3">
            {product.images.map((image) => (
              <Image key={image} src={image} alt={product.name} width={220} height={160} className="h-24 rounded-2xl object-cover" />
            ))}
          </div>
        </div>
        <div>
          <p className="text-sm font-bold uppercase text-ember">{product.category}</p>
          <h1 className="mt-2 text-5xl font-black tracking-tight">{product.name}</h1>
          <div className="mt-4 flex flex-wrap items-center gap-3 text-sm text-slate-600">
            <span className="flex items-center gap-1 font-bold text-amber-600"><Star className="size-4 fill-amber-500" /> {product.rating || 4.5}</span>
            <span>{product.reviews || 24} verified reviews</span>
            <span>SKU: {product.sku}</span>
          </div>
          <p className="mt-4 text-lg leading-8 text-slate-600">{product.description}</p>
          <div className="mt-5 flex flex-wrap gap-2">
            {product.certifications.map((cert) => (
              <span key={cert} className="rounded-full bg-red-50 px-3 py-1 text-xs font-bold text-ember">{cert}</span>
            ))}
          </div>
          <div className="mt-7 rounded-3xl border border-line bg-white p-5 shadow-soft">
            <div className="flex items-end justify-between">
              <div>
                <p className="text-sm text-slate-500">Starting price</p>
                <p className="text-4xl font-black">₹{product.price.toLocaleString("en-IN")}</p>
                <p className="mt-1 text-sm font-semibold text-slate-500">GST {product.gstRate || 18}% extra/inclusive as configured on invoice</p>
              </div>
              {product.mrp && <p className="text-sm text-slate-500 line-through">MRP ₹{product.mrp.toLocaleString("en-IN")}</p>}
            </div>
            {product.bulkPrice && <p className="mt-4 rounded-2xl bg-slate-50 px-4 py-3 text-sm font-bold text-slate-700">Bulk orders from ₹{product.bulkPrice.toLocaleString("en-IN")} per unit. Minimum quantity: {product.minBulkQty || 10}</p>}
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              <AddToCart product={{ productId: product.slug, name: product.name, sku: product.sku, price: product.price, gstRate: product.gstRate || 18, image: product.images[0] }} />
              <LinkButton href="/quote" variant="secondary" className="w-full">Request bulk quote</LinkButton>
            </div>
          </div>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            {[
              [Truck, "India delivery", "GST invoice and dispatch coordination"],
              [Wrench, "Service support", product.serviceSupport || "Service support available"],
              [QrCode, "QR tracking", "Service history and installation logs supported"],
              [RotateCcw, "Reorder flow", "Repeat orders and AMC add-ons available"]
            ].map(([Icon, title, copy]) => (
              <div key={String(title)} className="rounded-2xl border border-line bg-white p-4 shadow-sm">
                <Icon className="mb-2 size-5 text-ember" />
                <h2 className="font-black">{String(title)}</h2>
                <p className="mt-1 text-xs leading-5 text-slate-600">{String(copy)}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 grid gap-5 sm:grid-cols-2">
            <Spec title="Specifications" data={product.specifications} />
            <Spec title="Technical details" data={product.technicalData} />
          </div>
          <div className="mt-5 rounded-3xl border border-line bg-white p-5 shadow-soft">
            <h2 className="font-black">Usage area</h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">{product.usageArea}</p>
            <div className="mt-4 grid gap-2 text-sm font-semibold text-slate-600">
              {["Warranty tracking", "Installation log", "Inspection reminders", "Related AMC support"].map((item) => (
                <span key={item} className="flex items-center gap-2"><CheckCircle2 className="size-4 text-success" /> {item}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
      <section className="mt-16">
        <h2 className="text-2xl font-black">Related products</h2>
        <div className="mt-5 grid gap-4 md:grid-cols-3">
          {productCatalog.filter((item) => item.slug !== product.slug).slice(0, 3).map((item) => (
            <a key={item.slug} href={`/products/${item.slug}`} className="rounded-2xl border border-line bg-white p-4 font-bold shadow-sm hover:text-ember">
              {item.name}
            </a>
          ))}
        </div>
      </section>
      </div>
      <Script id="product-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema({ name: product.name, description: product.description, sku: product.sku, price: product.price, image: product.images[0] })) }} />
    </div>
  );
}

function Spec({ title, data }: { title: string; data: Record<string, string | undefined> }) {
  return (
    <div className="rounded-3xl border border-line bg-white p-5 shadow-soft">
      <h2 className="font-black">{title}</h2>
      <dl className="mt-4 grid gap-3 text-sm">
        {Object.entries(data).filter(([, value]) => Boolean(value)).map(([key, value]) => (
          <div key={key} className="flex justify-between gap-3 border-b border-line pb-2 last:border-0">
            <dt className="text-slate-500">{key}</dt>
            <dd className="font-semibold text-right">{value}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
