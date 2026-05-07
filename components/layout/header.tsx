"use client";

import { Menu, Search, ShoppingCart, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { LinkButton } from "@/components/ui/button";
import { platformNav, siteConfig } from "@/lib/constants/site";

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-white/88 backdrop-blur-xl">
      <div className="section-shell flex h-18 min-h-16 items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-3 font-black tracking-tight text-carbon">
          <span className="grid size-9 place-items-center rounded-xl bg-ember text-white shadow-glow">A</span>
          <span>Agnexa Fire Safety</span>
        </Link>
        <nav className="hidden items-center gap-6 md:flex">
          {platformNav.map((item) => (
            <Link key={item.href} href={item.href} className="text-sm font-semibold text-slate-600 hover:text-ember">
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="hidden items-center gap-2 md:flex">
          <Link href="/products?search=" className="focus-ring grid size-10 place-items-center rounded-xl border border-line bg-white" aria-label="Search">
            <Search className="size-4" />
          </Link>
          <Link href="/cart" className="focus-ring grid size-10 place-items-center rounded-xl border border-line bg-white" aria-label="Cart">
            <ShoppingCart className="size-4" />
          </Link>
          <LinkButton href="/ai-audit" variant="secondary">
            Start Safety Audit
          </LinkButton>
          <LinkButton href={`https://wa.me/${siteConfig.whatsapp}`}>
            WhatsApp Support
          </LinkButton>
        </div>
        <button className="grid size-10 place-items-center md:hidden" onClick={() => setOpen((value) => !value)} aria-label="Toggle menu">
          {open ? <X /> : <Menu />}
        </button>
      </div>
      {open && (
        <div className="border-t border-line bg-white px-4 py-4 md:hidden">
          <div className="flex flex-col gap-3">
            {platformNav.map((item) => (
              <Link key={item.href} href={item.href} onClick={() => setOpen(false)} className="rounded-xl px-3 py-2 text-sm font-semibold hover:bg-slate-100">
                {item.label}
              </Link>
            ))}
            <LinkButton href="/cart" variant="secondary">Cart</LinkButton>
            <LinkButton href={`https://wa.me/${siteConfig.whatsapp}`} variant="primary">WhatsApp</LinkButton>
          </div>
        </div>
      )}
    </header>
  );
}
