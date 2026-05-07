"use client";

import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";

type CartProduct = {
  productId: string;
  name: string;
  sku: string;
  price: number;
  gstRate: number;
  quantity?: number;
  image?: string;
};

export function AddToCart({ product }: { product: CartProduct }) {
  function add() {
    const current = JSON.parse(window.localStorage.getItem("agnexa-cart") || "[]") as CartProduct[];
    const existing = current.find((item) => item.productId === product.productId);
    const next = existing
      ? current.map((item) =>
          item.productId === product.productId
            ? { ...item, quantity: (item.quantity || 1) + (product.quantity || 1) }
            : item
        )
      : [...current, { ...product, quantity: product.quantity || 1 }];
    window.localStorage.setItem("agnexa-cart", JSON.stringify(next));
    window.dispatchEvent(new Event("agnexa-cart-updated"));
  }

  return (
    <Button onClick={add} className="w-full">
      <ShoppingCart className="size-4" />
      Add to cart
    </Button>
  );
}
