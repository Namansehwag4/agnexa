import { CalendarClock, QrCode, ShieldCheck, Wrench } from "lucide-react";
import { LinkButton } from "@/components/ui/button";

const assets = [
  ["AGN-QR-1001", "Lobby ABC 6KG", "Healthy", "Next inspection: 12 Jun 2026"],
  ["AGN-QR-1002", "Server Room CO2", "Service due", "Refill due in 18 days"],
  ["AGN-QR-1003", "Warehouse Hydrant Point", "Attention", "Pressure check needed"]
];

export default function TrackingPage() {
  return (
    <div className="bg-smoke py-12">
      <div className="section-shell grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
        <div>
          <p className="text-sm font-bold uppercase text-ember">QR smart tracking</p>
          <h1 className="mt-2 text-5xl font-black tracking-tight">Every extinguisher becomes a smart asset.</h1>
          <p className="mt-5 text-lg leading-8 text-slate-600">Generate QR tags, scan assets, view inspection history, refill logs, expiry alerts, and health indicators.</p>
          <div className="mt-8 flex gap-3">
            <LinkButton href="/api/assets/qr/sample">Generate QR</LinkButton>
            <LinkButton href="/tracking/scan" variant="secondary">Open scanner</LinkButton>
          </div>
        </div>
        <div className="rounded-3xl border border-line bg-white p-6 shadow-soft">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="text-2xl font-black">Asset health dashboard</h2>
            <QrCode className="size-7 text-bluefire" />
          </div>
          <div className="grid gap-4">
            {assets.map(([tag, name, health, detail]) => (
              <div key={tag} className="grid gap-4 rounded-2xl border border-line p-4 sm:grid-cols-[1fr_auto] sm:items-center">
                <div>
                  <p className="text-xs font-bold text-slate-500">{tag}</p>
                  <h3 className="mt-1 font-black">{name}</h3>
                  <p className="mt-1 text-sm text-slate-600">{detail}</p>
                </div>
                <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-700">{health}</span>
              </div>
            ))}
          </div>
          <div className="mt-5 grid gap-3 sm:grid-cols-3">
            {[ShieldCheck, Wrench, CalendarClock].map((Icon, index) => (
              <div key={index} className="rounded-2xl bg-slate-50 p-4"><Icon className="size-6 text-ember" /></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
