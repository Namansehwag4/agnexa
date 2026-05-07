import { redirect } from "next/navigation";
import { BellRing, FileText, QrCode, ShieldCheck, ShoppingBag, Wrench } from "lucide-react";
import { auth } from "@/lib/auth/config";

export default async function DashboardPage() {
  const session = await auth();
  if (!session?.user) redirect("/auth/login");

  return (
    <div className="bg-smoke py-12">
      <div className="section-shell">
        <p className="text-sm font-bold uppercase text-ember">Customer workspace</p>
        <h1 className="mt-2 text-5xl font-black tracking-tight">Safety operations dashboard</h1>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {[
            [ShoppingBag, "My Products", "Equipment orders, invoices, warranty, and product documents."],
            [QrCode, "QR Assets", "Tracked extinguishers, health status, refill and expiry logs."],
            [ShieldCheck, "AMC Status", "Active plans, upcoming inspections, renewal timeline."],
            [BellRing, "Alerts", "Expiry, refill, inspection, AMC, and emergency notifications."],
            [FileText, "Reports", "Safety audit reports, compliance recommendations, PDF exports."],
            [Wrench, "Service Requests", "Installation, refill, audit, and technician booking requests."]
          ].map(([Icon, title, copy]) => (
            <div key={String(title)} className="rounded-3xl border border-line bg-white p-6 shadow-soft">
              <Icon className="mb-4 size-8 text-bluefire" />
              <h2 className="text-xl font-black">{String(title)}</h2>
              <p className="mt-2 text-sm leading-6 text-slate-600">{String(copy)}</p>
            </div>
          ))}
        </div>
        <div className="mt-8 rounded-3xl border border-line bg-white p-6 shadow-soft">
          <h2 className="text-2xl font-black">Upcoming safety timeline</h2>
          <div className="mt-5 grid gap-3">
            {["CO2 extinguisher refill due in 18 days", "Professional AMC inspection scheduled for 12 Jun 2026", "Safety audit report ready for download"].map((item) => (
              <div key={item} className="rounded-2xl bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-600">{item}</div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
