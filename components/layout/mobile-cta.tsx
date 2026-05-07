import { MessageCircle, ShoppingCart, FileText } from "lucide-react";
import Link from "next/link";
import { siteConfig } from "@/lib/constants/site";

export function MobileCta() {
  return (
    <div className="fixed inset-x-3 bottom-3 z-50 grid grid-cols-3 gap-2 rounded-2xl border border-line bg-white/95 p-2 shadow-industrial backdrop-blur md:hidden">
      <Link href="/products" className="flex min-h-11 flex-col items-center justify-center rounded-xl bg-slate-50 text-[11px] font-bold text-slate-700">
        <ShoppingCart className="mb-1 size-4 text-ember" />
        Shop
      </Link>
      <Link href="/quote" className="flex min-h-11 flex-col items-center justify-center rounded-xl bg-ember text-[11px] font-bold text-white">
        <FileText className="mb-1 size-4" />
        Quote
      </Link>
      <Link href={`https://wa.me/${siteConfig.whatsapp}`} className="flex min-h-11 flex-col items-center justify-center rounded-xl bg-slate-50 text-[11px] font-bold text-slate-700">
        <MessageCircle className="mb-1 size-4 text-emerald-600" />
        WhatsApp
      </Link>
    </div>
  );
}
