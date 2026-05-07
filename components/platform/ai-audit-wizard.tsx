"use client";

import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Download, ShieldAlert } from "lucide-react";
import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";

const steps = ["Building", "Risk Inputs", "Operations", "Report"];

export function AiAuditWizard() {
  const [step, setStep] = useState(0);
  const [report, setReport] = useState<any>(null);
  const [form, setForm] = useState({
    buildingType: "Commercial office",
    areaSqFt: 12000,
    floors: 4,
    occupancyCount: 180,
    electricalLoad: "Moderate",
    hasKitchen: true,
    hasIndustrialEquipment: false
  });

  const progress = useMemo(() => ((step + 1) / steps.length) * 100, [step]);

  async function generate() {
    const response = await fetch("/api/audit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form)
    });
    const data = await response.json();
    setReport(data.report);
    setStep(3);
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[320px_1fr]">
      <aside className="rounded-3xl border border-line bg-white p-6 shadow-soft">
        <p className="text-sm font-bold uppercase text-ember">Safety Audit</p>
        <h2 className="mt-2 text-2xl font-black">Fire risk assessment</h2>
        <div className="mt-6 h-2 rounded-full bg-slate-100">
          <div className="h-2 rounded-full bg-bluefire transition-all" style={{ width: `${progress}%` }} />
        </div>
        <div className="mt-6 grid gap-3">
          {steps.map((label, index) => (
            <div key={label} className={`rounded-2xl px-4 py-3 text-sm font-bold ${index === step ? "bg-bluefire text-white" : "bg-slate-50 text-slate-600"}`}>
              {index + 1}. {label}
            </div>
          ))}
        </div>
      </aside>
      <motion.section key={step} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="rounded-3xl border border-line bg-white p-6 shadow-soft">
        {step === 0 && (
          <AuditStep title="Tell us about your building">
            <Field label="Building type" value={form.buildingType} onChange={(value) => setForm({ ...form, buildingType: value })} />
            <NumberField label="Area in sq ft" value={form.areaSqFt} onChange={(value) => setForm({ ...form, areaSqFt: value })} />
            <NumberField label="Number of floors" value={form.floors} onChange={(value) => setForm({ ...form, floors: value })} />
          </AuditStep>
        )}
        {step === 1 && (
          <AuditStep title="Risk inputs">
            <NumberField label="Occupancy count" value={form.occupancyCount} onChange={(value) => setForm({ ...form, occupancyCount: value })} />
            <Field label="Electrical systems" value={form.electricalLoad} onChange={(value) => setForm({ ...form, electricalLoad: value })} />
            <Toggle label="Kitchen present" checked={form.hasKitchen} onChange={(value) => setForm({ ...form, hasKitchen: value })} />
          </AuditStep>
        )}
        {step === 2 && (
          <AuditStep title="Operations profile">
            <Toggle label="Industrial equipment present" checked={form.hasIndustrialEquipment} onChange={(value) => setForm({ ...form, hasIndustrialEquipment: value })} />
            <div className="rounded-2xl bg-slate-50 p-5 text-sm leading-6 text-slate-600">
              Agnexa will combine occupancy, area, electrical load, kitchen risk, and industrial equipment exposure to prepare a practical risk score, recommendations, compliance notes, and suggested products.
            </div>
          </AuditStep>
        )}
        {step === 3 && report && (
          <div>
            <div className="flex flex-col justify-between gap-4 md:flex-row md:items-start">
              <div>
                <p className="text-sm font-bold uppercase text-ember">Generated report</p>
                <h1 className="mt-2 text-4xl font-black">Risk score: {report.riskScore}/100</h1>
                <p className="mt-3 text-slate-600">Risk level: <span className="font-black text-ember">{report.riskLevel}</span></p>
              </div>
              <Button><Download className="size-4" /> Download PDF</Button>
            </div>
            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {report.cards.map((card: any) => (
                <div key={card.title} className="rounded-2xl border border-line bg-slate-50 p-5">
                  <ShieldAlert className="mb-3 size-6 text-bluefire" />
                  <h3 className="font-black">{card.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{card.copy}</p>
                </div>
              ))}
            </div>
            <div className="mt-6 rounded-2xl border border-line p-5">
              <h3 className="font-black">Recommendations</h3>
              <ul className="mt-3 grid gap-2 text-sm text-slate-600">
                {report.recommendations.map((item: string) => <li key={item}>• {item}</li>)}
              </ul>
            </div>
          </div>
        )}
        <div className="mt-8 flex justify-between">
          <Button variant="secondary" onClick={() => setStep(Math.max(0, step - 1))} disabled={step === 0}>
            <ArrowLeft className="size-4" /> Back
          </Button>
          {step < 2 ? (
            <Button onClick={() => setStep(step + 1)}>Next <ArrowRight className="size-4" /></Button>
          ) : step === 2 ? (
            <Button onClick={generate}>Generate safety report</Button>
          ) : null}
        </div>
      </motion.section>
    </div>
  );
}

function AuditStep({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h1 className="text-3xl font-black">{title}</h1>
      <div className="mt-6 grid gap-4">{children}</div>
    </div>
  );
}

function Field({ label, value, onChange }: { label: string; value: string; onChange: (value: string) => void }) {
  return <label className="grid gap-2 text-sm font-bold">{label}<input value={value} onChange={(event) => onChange(event.target.value)} className="h-12 rounded-2xl border border-line px-4 outline-none focus:border-bluefire" /></label>;
}

function NumberField({ label, value, onChange }: { label: string; value: number; onChange: (value: number) => void }) {
  return <label className="grid gap-2 text-sm font-bold">{label}<input type="number" value={value} onChange={(event) => onChange(Number(event.target.value))} className="h-12 rounded-2xl border border-line px-4 outline-none focus:border-bluefire" /></label>;
}

function Toggle({ label, checked, onChange }: { label: string; checked: boolean; onChange: (value: boolean) => void }) {
  return <label className="flex items-center justify-between rounded-2xl border border-line p-4 text-sm font-bold">{label}<input type="checkbox" checked={checked} onChange={(event) => onChange(event.target.checked)} className="size-5" /></label>;
}
