import { AlertTriangle, BarChart3, Boxes, FileText, Package, QrCode, ShieldCheck, ShoppingBag, Users, Wrench, type LucideIcon } from "lucide-react";

const cards: Array<[LucideIcon, string, string, string]> = [
  [Package, "Products", "Create, edit, delete, upload images, attach brochures.", "/admin/products"],
  [Boxes, "Inventory", "Stock levels, low-stock alerts, and SKU control.", "/admin/inventory"],
  [ShoppingBag, "Orders", "Payment status, fulfilment, GST invoices, tracking.", "/admin/orders"],
  [FileText, "Quotes", "B2B inquiries, quantity pricing, lead pipeline.", "/admin/quotes"],
  [Wrench, "Service requests", "AMC, refill, installation, audit and inspection jobs.", "/admin/services"],
  [Users, "Users", "Customers, staff, admin roles, permissions.", "/admin/users"],
  [QrCode, "QR assets", "Asset tags, inspections, refill logs, and health status.", "/admin/qr"],
  [ShieldCheck, "Safety audit reports", "Risk scores, compliance analysis, suggested products, and reports.", "/admin/audits"],
  [AlertTriangle, "Emergency requests", "Panic alerts, location payloads, and response handling.", "/admin/emergency"],
  [BarChart3, "Analytics", "Revenue, conversion, product and service demand.", "/admin/analytics"]
];

export default async function AdminPage() {
  return (
    <div className="min-h-screen bg-smoke py-8">
      <div className="section-shell">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="text-sm font-bold uppercase text-ember">Admin</p>
            <h1 className="mt-2 text-5xl font-black tracking-tight">Enterprise safety control center</h1>
          </div>
          <a href="/api/admin/analytics" className="rounded-md bg-carbon px-5 py-3 text-sm font-bold text-white">Export analytics JSON</a>
        </div>
        <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {cards.map(([Icon, title, copy, href]) => (
            <a key={String(title)} href={href} className="rounded-3xl border border-line bg-white p-6 shadow-soft transition hover:-translate-y-1 hover:border-bluefire">
              <Icon className="mb-4 size-8 text-ember" />
              <h2 className="text-xl font-black">{String(title)}</h2>
              <p className="mt-2 text-sm leading-6 text-zinc-600 dark:text-zinc-400">{String(copy)}</p>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
