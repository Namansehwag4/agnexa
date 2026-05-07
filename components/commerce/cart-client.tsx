"use client";

import { Trash2 } from "lucide-react";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { LinkButton } from "@/components/ui/button";
import { calculateCart } from "@/lib/services/cart";

type CartItem = {
  productId: string;
  name: string;
  sku: string;
  price: number;
  gstRate: number;
  quantity: number;
  image?: string;
};

export function CartClient() {
  const [items, setItems] = useState<CartItem[]>([]);

  useEffect(() => {
    setItems(JSON.parse(window.localStorage.getItem("agnexa-cart") || "[]"));
  }, []);

  function persist(next: CartItem[]) {
    setItems(next);
    window.localStorage.setItem("agnexa-cart", JSON.stringify(next));
  }

  const totals = useMemo(() => calculateCart(items), [items]);

  if (!items.length) {
    return (
      <div className="section-shell py-16">
        <h1 className="text-3xl font-black">Cart</h1>
        <div className="mt-8 rounded-lg border border-zinc-200 p-8 text-center dark:border-zinc-800">
          <p className="text-zinc-600 dark:text-zinc-400">Your cart is empty.</p>
          <LinkButton href="/products" className="mt-5">Browse products</LinkButton>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-smoke">
    <div className="section-shell grid gap-8 py-16 lg:grid-cols-[1fr_360px]">
      <section>
        <h1 className="text-4xl font-black tracking-tight">Cart</h1>
        <div className="mt-8 grid gap-4">
          {items.map((item) => (
            <div key={item.productId} className="grid gap-4 rounded-3xl border border-line bg-white p-4 shadow-soft sm:grid-cols-[110px_1fr_auto]">
              {item.image && <Image src={item.image} alt={item.name} width={220} height={160} className="h-28 w-full rounded-2xl object-cover sm:w-28" />}
              <div>
                <h2 className="font-bold">{item.name}</h2>
                <p className="mt-1 text-sm text-zinc-500">{item.sku}</p>
                <p className="mt-3 font-black">₹{item.price.toLocaleString("en-IN")}</p>
                <p className="mt-1 text-xs text-slate-500">GST {item.gstRate}% • Refill/service support can be added after checkout</p>
              </div>
              <div className="flex items-center gap-3">
                <input
                  type="number"
                  min={1}
                  value={item.quantity}
                  onChange={(event) =>
                    persist(items.map((row) => (row.productId === item.productId ? { ...row, quantity: Number(event.target.value) } : row)))
                  }
                  className="h-11 w-20 rounded-xl border border-line bg-transparent px-3"
                />
                <button
                  aria-label="Remove item"
                  onClick={() => persist(items.filter((row) => row.productId !== item.productId))}
                  className="grid size-11 place-items-center rounded-xl border border-line text-ember"
                >
                  <Trash2 className="size-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
      <aside className="h-fit rounded-3xl border border-line bg-white p-6 shadow-soft">
        <h2 className="text-xl font-black">Order summary</h2>
        <div className="mt-5 grid gap-3 text-sm">
          <div className="flex justify-between"><span>Subtotal</span><span>₹{totals.subtotal.toLocaleString("en-IN")}</span></div>
          <div className="flex justify-between"><span>GST</span><span>₹{Math.round(totals.gstTotal).toLocaleString("en-IN")}</span></div>
          <div className="flex justify-between"><span>Shipping</span><span>₹{totals.shippingTotal.toLocaleString("en-IN")}</span></div>
          <div className="border-t border-line pt-3 text-lg font-black">
            <div className="flex justify-between"><span>Total</span><span>₹{Math.round(totals.grandTotal).toLocaleString("en-IN")}</span></div>
          </div>
        </div>
        <LinkButton href="/checkout" className="mt-6 w-full">Proceed to checkout</LinkButton>
        <LinkButton href="/quote" variant="secondary" className="mt-3 w-full">Request bulk pricing</LinkButton>
      </aside>
    </div>
    </div>
  );
}
