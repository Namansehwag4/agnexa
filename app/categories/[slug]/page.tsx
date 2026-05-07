import Image from "next/image";
import Link from "next/link";
import { AddToCart } from "@/components/commerce/add-to-cart";
import { productCatalog } from "@/lib/constants/products";

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const products = productCatalog.filter((product) => product.category.toLowerCase().replaceAll(" ", "-") === slug);
  return (
    <div className="section-shell py-12">
      <p className="text-sm font-bold uppercase text-ember">Category</p>
      <h1 className="mt-2 text-4xl font-black capitalize">{slug.replaceAll("-", " ")}</h1>
      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <div key={product.slug} className="rounded-lg border border-zinc-200 bg-white p-3 dark:border-zinc-800 dark:bg-zinc-950">
            <Link href={`/products/${product.slug}`}>
              <Image src={product.images[0]} alt={product.name} width={600} height={420} className="h-56 w-full rounded-md object-cover" />
              <h2 className="mt-4 text-lg font-black">{product.name}</h2>
              <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">{product.shortDesc}</p>
            </Link>
            <div className="mt-4">
              <AddToCart product={{ productId: product.slug, name: product.name, sku: product.sku, price: product.price, gstRate: 18, image: product.images[0] }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
