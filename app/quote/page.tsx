import { QuoteForm } from "@/components/forms/quote-form";

export default function QuotePage() {
  return (
    <div className="bg-smoke">
      <div className="section-shell grid gap-10 py-12 lg:grid-cols-[0.85fr_1.15fr]">
        <div>
          <p className="text-sm font-bold uppercase text-ember">Bulk business orders</p>
          <h1 className="mt-2 text-5xl font-black tracking-tight">Request a GST quotation for your site or contract.</h1>
          <p className="mt-5 leading-7 text-slate-600">
            Share product list, quantities, city, GST details, installation needs, and timeline. Our team can support contractors, facility managers, builders, schools, hospitals, factories, and housing societies.
          </p>
          <div className="mt-8 grid gap-3">
            {[
              "GST invoice and delivery support across India",
              "Contractor and quantity-based pricing",
              "Installation, inspection, refill, and AMC add-ons",
              "Quotation tracking from admin dashboard"
            ].map((item) => (
              <div key={item} className="rounded-2xl border border-line bg-white px-4 py-3 text-sm font-semibold text-slate-700 shadow-sm">{item}</div>
            ))}
          </div>
        </div>
        <QuoteForm />
      </div>
    </div>
  );
}
