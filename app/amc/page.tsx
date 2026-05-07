import { CheckCircle2 } from "lucide-react";
import { LinkButton } from "@/components/ui/button";

const plans = [
  ["Starter", "₹2,999/mo", "For shops and small offices", ["Quarterly inspection", "Expiry alerts", "Basic refill coordination"]],
  ["Professional", "₹7,999/mo", "For offices, schools, and clinics", ["Monthly inspection", "QR asset logs", "Technician booking", "Renewal reminders"]],
  ["Enterprise", "Custom", "For factories and multi-site portfolios", ["SLA support", "Fire audit dashboard", "Multi-location analytics", "Dedicated service manager"]]
];

export default function AmcPage() {
  return (
    <div className="bg-smoke py-12">
      <div className="section-shell">
        <p className="text-sm font-bold uppercase text-ember">AMC management</p>
        <h1 className="mt-2 max-w-3xl text-5xl font-black tracking-tight">Annual maintenance contracts with service schedules and reminders.</h1>
        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          {plans.map(([name, price, copy, features]) => (
            <div key={String(name)} className="rounded-3xl border border-line bg-white p-7 shadow-soft">
              <h2 className="text-2xl font-black">{String(name)}</h2>
              <p className="mt-2 text-slate-600">{String(copy)}</p>
              <div className="mt-6 text-4xl font-black">{String(price)}</div>
              <div className="mt-6 grid gap-3">
                {(features as string[]).map((feature) => (
                  <div key={feature} className="flex items-center gap-2 text-sm font-semibold text-slate-600"><CheckCircle2 className="size-4 text-success" /> {feature}</div>
                ))}
              </div>
              <LinkButton href="/services" className="mt-7 w-full">Start AMC</LinkButton>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
