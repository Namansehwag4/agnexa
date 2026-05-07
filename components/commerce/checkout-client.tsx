"use client";

import { CreditCard, Truck } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
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

declare global {
  interface Window {
    Razorpay?: new (options: Record<string, unknown>) => { open: () => void };
  }
}

export function CheckoutClient() {
  const [items, setItems] = useState<CartItem[]>([]);
  const [status, setStatus] = useState("");
  const totals = useMemo(() => calculateCart(items), [items]);

  useEffect(() => {
    setItems(JSON.parse(window.localStorage.getItem("agnexa-cart") || "[]"));
  }, []);

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const payload = {
      customerName: formData.get("customerName"),
      customerEmail: formData.get("customerEmail"),
      customerPhone: formData.get("customerPhone"),
      paymentMode: formData.get("paymentMode"),
      shippingAddress: {
        line1: formData.get("line1"),
        line2: formData.get("line2"),
        city: formData.get("city"),
        state: formData.get("state"),
        pincode: formData.get("pincode")
      },
      items
    };
    setStatus("Creating order...");
    const response = await fetch("/api/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
    const data = await response.json();
    if (!response.ok) {
      setStatus(data.error || "Checkout failed.");
      return;
    }
    if (payload.paymentMode === "COD") {
      window.localStorage.removeItem("agnexa-cart");
      setStatus(`Order placed. Tracking number: ${data.orderNumber}`);
      return;
    }
    if (!window.Razorpay) {
      setStatus("Razorpay checkout script is still loading. Please try again.");
      return;
    }
    const checkout = new window.Razorpay({
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
      amount: data.razorpay.amount,
      currency: "INR",
      name: "Agnexa Fire Safety",
      description: "Fire safety equipment order",
      order_id: data.razorpay.id,
      handler: async (payment: Record<string, string>) => {
        await fetch("/api/payments/verify", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payment)
        });
        window.localStorage.removeItem("agnexa-cart");
        setStatus(`Payment received. Tracking number: ${data.orderNumber}`);
      }
    });
    checkout.open();
  }

  return (
    <div className="bg-smoke">
    <div className="section-shell grid gap-8 py-12 lg:grid-cols-[1fr_360px]">
      <form onSubmit={submit} className="grid gap-6">
        <div>
          <p className="text-sm font-bold uppercase text-ember">Secure checkout</p>
          <h1 className="mt-2 text-4xl font-black tracking-tight">Delivery, GST details, and payment</h1>
        </div>
        <section className="rounded-3xl border border-line bg-white p-6 shadow-soft">
          <h2 className="mb-4 flex items-center gap-2 text-xl font-black"><Truck className="size-5 text-ember" /> Shipping details</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field name="customerName" label="Name" required />
            <Field name="customerPhone" label="Phone" required />
            <Field name="customerEmail" label="Email" type="email" required />
            <Field name="line1" label="Address line 1" required />
            <Field name="line2" label="Address line 2" />
            <Field name="city" label="City" required />
            <Field name="state" label="State" required />
            <Field name="pincode" label="Pincode" required />
            <Field name="gstin" label="GSTIN (optional)" />
          </div>
        </section>
        <section className="rounded-3xl border border-line bg-white p-6 shadow-soft">
          <h2 className="mb-4 flex items-center gap-2 text-xl font-black"><CreditCard className="size-5 text-ember" /> Payment</h2>
          <div className="grid gap-3 sm:grid-cols-2">
            <label className="rounded-2xl border border-line p-4 font-semibold"><input type="radio" name="paymentMode" value="RAZORPAY" defaultChecked className="mr-2" /> Razorpay / UPI / Card / NetBanking</label>
            <label className="rounded-2xl border border-line p-4 font-semibold"><input type="radio" name="paymentMode" value="COD" className="mr-2" /> Cash on delivery</label>
          </div>
          <p className="mt-3 text-xs leading-5 text-slate-500">UPI is available through Razorpay checkout when enabled on your Razorpay account.</p>
        </section>
        <Button type="submit" disabled={!items.length}>Place secure order</Button>
        {status && <p className="font-semibold text-ember">{status}</p>}
      </form>
      <aside className="h-fit rounded-3xl border border-line bg-white p-6 shadow-soft">
        <h2 className="text-xl font-black">GST summary</h2>
        <div className="mt-5 grid gap-3 text-sm">
          {items.map((item) => <div key={item.productId} className="flex justify-between gap-3"><span>{item.name} x {item.quantity}</span><span>₹{(item.price * item.quantity).toLocaleString("en-IN")}</span></div>)}
          <div className="border-t border-line pt-3">GST: ₹{Math.round(totals.gstTotal).toLocaleString("en-IN")}</div>
          <div>Shipping: ₹{totals.shippingTotal.toLocaleString("en-IN")}</div>
          <div className="text-2xl font-black">₹{Math.round(totals.grandTotal).toLocaleString("en-IN")}</div>
        </div>
        <div className="mt-5 rounded-2xl bg-slate-50 p-4 text-xs leading-5 text-slate-600">Invoice number is generated after order creation. For bulk purchase, use quotation flow before checkout.</div>
      </aside>
      <script src="https://checkout.razorpay.com/v1/checkout.js" async />
    </div>
    </div>
  );
}

function Field({ label, ...props }: React.InputHTMLAttributes<HTMLInputElement> & { label: string }) {
  return (
    <label className="grid gap-2 text-sm font-semibold">
      {label}
      <input {...props} className="h-12 rounded-2xl border border-line bg-transparent px-3 outline-none focus:border-bluefire" />
    </label>
  );
}
