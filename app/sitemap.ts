import type { MetadataRoute } from "next";
import { productCatalog } from "@/lib/constants/products";
import { siteConfig } from "@/lib/constants/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["", "/ai-audit", "/tracking", "/amc", "/emergency", "/dashboard", "/notifications", "/products", "/quote", "/services", "/blog", "/contact", "/about"].map((path) => ({
    url: `${siteConfig.url}${path}`,
    lastModified: new Date()
  }));
  const productRoutes = productCatalog.map((product) => ({
    url: `${siteConfig.url}/products/${product.slug}`,
    lastModified: new Date()
  }));
  return [...staticRoutes, ...productRoutes];
}
