import { QuoteForm } from "@/components/forms/quote-form";

export default function ServicesPage() {
  return (
    <div className="bg-smoke">
      <div className="section-shell grid gap-10 py-12 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <p className="text-sm font-bold uppercase text-ember">Service bookings</p>
          <h1 className="mt-2 text-5xl font-black tracking-tight">Installation, refill, AMC, inspection, and compliance visits.</h1>
          <p className="mt-5 leading-7 text-slate-600">Book technician-supported services with preferred date, location, site details, and service tracking.</p>
          <div className="mt-8 grid gap-4">
            {[
              ["Installation", "Extinguisher mounting, signage, commissioning, and handover notes"],
              ["Refill reminders", "Pressure check, pickup/replacement coordination, and refill due tracking"],
              ["Inspection", "Hydrant, hose reel, alarm, detector, exit light, and extinguisher readiness checks"],
              ["AMC support", "Service schedules, maintenance history, technician assignment, and renewal reminders"],
              ["Compliance overview", "Expiry overview, inspection status, and building safety summary"]
            ].map(([title, copy]) => (
              <div key={title} className="rounded-2xl border border-line bg-white p-4 shadow-sm">
                <h2 className="font-black">{title}</h2>
                <p className="mt-1 text-sm leading-6 text-slate-600">{copy}</p>
              </div>
            ))}
          </div>
        </div>
        <QuoteForm serviceMode />
      </div>
    </div>
  );
}
