import Link from "next/link";
import { siteConfig } from "@/lib/constants/site";

export function Footer() {
  return (
    <footer className="border-t border-line bg-white text-carbon">
      <div className="section-shell grid gap-10 py-12 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div>
          <div className="mb-4 flex items-center gap-3 text-lg font-black uppercase">
            <span className="grid size-9 place-items-center rounded-xl bg-ember text-white shadow-glow">A</span>
            Agnexa Fire Safety
          </div>
          <p className="max-w-md text-sm leading-6 text-slate-600">{siteConfig.description}</p>
        </div>
        <div>
          <h3 className="mb-3 text-sm font-bold uppercase text-slate-400">Platform</h3>
          <div className="grid gap-2 text-sm text-slate-600">
            <Link href="/ai-audit">Safety audit</Link>
            <Link href="/tracking">QR tracking</Link>
            <Link href="/amc">AMC plans</Link>
            <Link href="/emergency">Emergency system</Link>
          </div>
        </div>
        <div>
          <h3 className="mb-3 text-sm font-bold uppercase text-slate-400">Commerce</h3>
          <div className="grid gap-2 text-sm text-slate-600">
            <Link href="/products">Products</Link>
            <Link href="/quote">Bulk quotation</Link>
            <Link href="/track-order">Order tracking</Link>
            <Link href="/checkout">Checkout</Link>
          </div>
        </div>
        <div>
          <h3 className="mb-3 text-sm font-bold uppercase text-slate-400">Contact</h3>
          <div className="grid gap-2 text-sm text-slate-600">
            <span>{siteConfig.phone}</span>
            <span>{siteConfig.email}</span>
            <span>{siteConfig.address}</span>
          </div>
        </div>
      </div>
      <div className="border-t border-line py-5 text-center text-xs text-slate-500">
        © {new Date().getFullYear()} Agnexa Fire Safety. GST: {siteConfig.gstin}
      </div>
    </footer>
  );
}
