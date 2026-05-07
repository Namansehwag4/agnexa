import { siteConfig } from "@/lib/constants/site";

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: siteConfig.name,
    url: siteConfig.url,
    telephone: siteConfig.phone,
    email: siteConfig.email,
    address: siteConfig.address,
    areaServed: "India",
    priceRange: "$$"
  };
}

export function productSchema(product: {
  name: string;
  description: string;
  sku: string;
  price: number | string;
  image?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    sku: product.sku,
    image: product.image,
    brand: { "@type": "Brand", name: siteConfig.name },
    offers: {
      "@type": "Offer",
      priceCurrency: "INR",
      price: String(product.price),
      availability: "https://schema.org/InStock"
    }
  };
}
