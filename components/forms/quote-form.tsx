"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

export function QuoteForm({ serviceMode = false }: { serviceMode?: boolean }) {
  const [status, setStatus] = useState<string>("");

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const endpoint = serviceMode ? "/api/services" : "/api/quote";
    const payload = Object.fromEntries(formData.entries());
    setStatus("Submitting...");
    const response = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
    setStatus(response.ok ? "Request received. Our team will contact you shortly." : "Unable to submit. Please try WhatsApp or email.");
    if (response.ok) form.reset();
  }

  return (
    <form onSubmit={submit} className="grid gap-4 rounded-3xl border border-line bg-white p-6 shadow-soft">
      <div className="grid gap-4 sm:grid-cols-2">
        <Field name="name" label="Full name" required />
        <Field name="phone" label="Phone" required />
        <Field name="email" label="Email" type="email" required />
        {!serviceMode && <Field name="company" label="Company" />}
        {!serviceMode && <Field name="city" label="City" required />}
        {!serviceMode && <Field name="gstin" label="GSTIN" />}
        {!serviceMode && <Field name="quantity" label="Approx. quantity" type="number" />}
        {serviceMode && (
          <label className="grid gap-2 text-sm font-semibold">
            Service type
            <select name="type" className="h-12 rounded-2xl border border-line bg-transparent px-3 outline-none focus:border-bluefire">
              <option value="INSTALLATION">Installation</option>
              <option value="REFILL">Extinguisher refill</option>
              <option value="SAFETY_AUDIT">Safety audit</option>
              <option value="AMC">AMC contract</option>
              <option value="INSPECTION">Inspection</option>
            </select>
          </label>
        )}
        {serviceMode && <Field name="preferredAt" label="Preferred date" type="date" />}
      </div>
      {!serviceMode && (
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="grid gap-2 text-sm font-semibold">
            Inquiry type
            <select name="inquiryType" className="h-12 rounded-2xl border border-line bg-transparent px-3 outline-none focus:border-bluefire">
              <option>Corporate purchase</option>
              <option>Contractor pricing</option>
              <option>Housing society</option>
              <option>School / hospital</option>
              <option>Factory / warehouse</option>
            </select>
          </label>
          <label className="grid gap-2 text-sm font-semibold">
            Timeline
            <select name="urgency" className="h-12 rounded-2xl border border-line bg-transparent px-3 outline-none focus:border-bluefire">
              <option>Within 7 days</option>
              <option>Within 15 days</option>
              <option>This month</option>
              <option>Planning stage</option>
            </select>
          </label>
        </div>
      )}
      {serviceMode && <Field name="siteAddress" label="Site address" required />}
      <label className="grid gap-2 text-sm font-semibold">
        {serviceMode ? "Service details" : "Products, quantity, and requirements"}
        <textarea name={serviceMode ? "details" : "requirements"} required rows={5} className="rounded-2xl border border-line bg-transparent px-3 py-3 outline-none focus:border-bluefire" placeholder={serviceMode ? "Example: 12 ABC extinguishers need refill, site is in Gurugram..." : "Example: 25 ABC 6 KG extinguishers, 12 exit lights, GST invoice, delivery to Pune..."} />
      </label>
      <div className="rounded-2xl bg-slate-50 p-4 text-xs leading-5 text-slate-600">
        We use this information only to prepare pricing, availability, service scope, and GST quotation details.
      </div>
      <Button type="submit">{serviceMode ? "Book service" : "Request quotation"}</Button>
      {status && <p className="text-sm font-semibold text-ember">{status}</p>}
    </form>
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
