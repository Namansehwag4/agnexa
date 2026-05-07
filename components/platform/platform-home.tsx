"use client";

import { motion } from "framer-motion";
import { Activity, AlarmClock, ArrowRight, BellRing, CheckCircle2, CreditCard, Flame, LayoutDashboard, MapPin, QrCode, Radar, ShieldCheck, ShoppingBag, Wrench } from "lucide-react";
import Link from "next/link";
import { LinkButton } from "@/components/ui/button";

const modules = [
  { href: "/ai-audit", icon: ShieldCheck, title: "Safety Audit", copy: "Multi-step building assessment with risk score, compliance gaps, recommended equipment, and report-ready summary." },
  { href: "/amc", icon: CreditCard, title: "AMC Management", copy: "Plans, renewals, inspection reminders, service history, technician scheduling, and maintenance logs." },
  { href: "/tracking", icon: QrCode, title: "QR Asset Tracking", copy: "Every extinguisher gets a QR code, health status, refill history, expiry tracking, and maintenance logs." },
  { href: "/emergency", icon: AlarmClock, title: "Emergency System", copy: "Panic alerts, quick contacts, location capture, fire station suggestions, and evacuation guidance." }
];

const metrics = [
  ["91", "Compliance score", "Moderate risk across audited sites"],
  ["326", "Tracked assets", "24 assets need refill in 30 days"],
  ["18", "AMC renewals", "Auto reminders scheduled"],
  ["4.8s", "Emergency flow", "Average time to alert dispatch"]
];

export function PlatformHome() {
  return (
    <div className="bg-smoke text-carbon">
      <section className="saas-grid relative overflow-hidden">
        <div className="absolute inset-x-0 top-0 h-72 bg-gradient-to-b from-white to-transparent" />
        <div className="section-shell relative grid min-h-[760px] items-center gap-12 py-16 lg:grid-cols-[1.05fr_0.95fr]">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-line bg-white px-4 py-2 text-sm font-bold text-slate-600 shadow-sm">
              <ShieldCheck className="size-4 text-bluefire" />
              Fire safety ecommerce and service platform
            </div>
            <h1 className="max-w-4xl text-5xl font-black leading-[1.04] tracking-tight sm:text-6xl lg:text-7xl">
              Fire safety equipment, service, and compliance in one place.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
              Agnexa combines certified products, bulk GST quotations, AMC schedules, QR asset tracking, refill reminders, installation booking, and compliance dashboards for Indian businesses.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <LinkButton href="/ai-audit">Start Safety Audit <ArrowRight className="size-4" /></LinkButton>
              <LinkButton href="/dashboard" variant="secondary">View Dashboard</LinkButton>
            </div>
            <div className="mt-10 grid max-w-xl grid-cols-3 gap-4">
              {["ISO-ready reports", "QR lifecycle logs", "Razorpay billing"].map((item) => (
                <div key={item} className="flex items-center gap-2 text-sm font-semibold text-slate-600">
                  <CheckCircle2 className="size-4 text-success" />
                  {item}
                </div>
              ))}
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 30, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 0.7, delay: 0.08 }} className="glass-card p-4">
            <div className="rounded-2xl border border-line bg-white p-5">
              <div className="mb-5 flex items-center justify-between">
                <div>
                  <p className="text-sm font-bold text-slate-500">Agnexa dashboard</p>
                  <h2 className="mt-1 text-2xl font-black">Compliance overview</h2>
                </div>
                <span className="rounded-full bg-red-50 px-3 py-1 text-xs font-bold text-ember">Live</span>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                {metrics.map(([value, label, detail]) => (
                  <div key={label} className="rounded-2xl border border-line bg-slate-50 p-4">
                    <div className="text-3xl font-black">{value}</div>
                    <div className="mt-1 font-bold">{label}</div>
                    <div className="mt-1 text-xs leading-5 text-slate-500">{detail}</div>
                  </div>
                ))}
              </div>
              <div className="mt-4 rounded-2xl border border-line p-4">
                <div className="mb-4 flex items-center justify-between">
                  <span className="font-bold">Risk distribution</span>
                  <Radar className="size-5 text-bluefire" />
                </div>
                <div className="space-y-3">
                  {[["Low", "36%", "bg-success"], ["Moderate", "42%", "bg-bluefire"], ["High", "18%", "bg-ember"], ["Critical", "4%", "bg-carbon"]].map(([label, width, color]) => (
                    <div key={label}>
                      <div className="mb-1 flex justify-between text-xs font-semibold text-slate-500"><span>{label}</span><span>{width}</span></div>
                      <div className="h-2 rounded-full bg-slate-100"><div className={`h-2 rounded-full ${color}`} style={{ width }} /></div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="section-shell py-16">
        <div className="mb-10 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="text-sm font-bold uppercase text-ember">Core modules</p>
            <h2 className="mt-2 text-4xl font-black tracking-tight">Practical tools for fire safety operations</h2>
          </div>
          <Link href="/products" className="font-bold text-bluefire">Shop certified equipment</Link>
        </div>
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {modules.map((module) => (
            <Link key={module.href} href={module.href} className="rounded-3xl border border-line bg-white p-6 shadow-soft transition hover:-translate-y-1 hover:border-bluefire">
              <span className="grid size-12 place-items-center rounded-2xl bg-slate-50 text-bluefire">
                <module.icon className="size-6" />
              </span>
              <h3 className="mt-6 text-xl font-black">{module.title}</h3>
              <p className="mt-3 text-sm leading-6 text-slate-600">{module.copy}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="section-shell grid gap-6 py-16 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="rounded-3xl bg-carbon p-8 text-white shadow-industrial">
          <Flame className="mb-6 size-10 text-red-200" />
          <h2 className="text-4xl font-black tracking-tight">Emergency-ready workflows, not static contact pages.</h2>
          <p className="mt-5 leading-7 text-slate-300">Trigger alerts, capture live location, guide evacuation, and route emergency information to admins from the web platform.</p>
          <LinkButton href="/emergency" className="mt-8">Open Emergency System</LinkButton>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {[
            [LayoutDashboard, "Customer dashboard", "Products, QR assets, AMC, reports, alerts, and service requests."],
            [BellRing, "Reminder system", "Expiry, refill, inspection, and AMC renewal reminders with email, SMS, and WhatsApp-ready structure."],
            [ShoppingBag, "Ecommerce flow", "Cart, checkout, GST invoices, filters, wishlist, reviews, comparison, COD, UPI, and Razorpay."],
            [MapPin, "Location context", "Emergency location capture and nearby fire station recommendation UI."]
          ].map(([Icon, title, copy]) => (
            <div key={String(title)} className="rounded-3xl border border-line bg-white p-6 shadow-soft">
              <Icon className="mb-4 size-7 text-ember" />
              <h3 className="font-black">{String(title)}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">{String(copy)}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section-shell pb-20">
        <div className="rounded-3xl border border-line bg-white p-8 shadow-soft">
          <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
            <div>
              <p className="text-sm font-bold uppercase text-bluefire">Enterprise polish</p>
              <h2 className="mt-2 text-4xl font-black tracking-tight">Built for owners, EHS heads, facility managers, and service teams.</h2>
            </div>
            <div className="grid gap-3 sm:grid-cols-3">
              {[
                [Activity, "Analytics"],
                [ShieldCheck, "Compliance"],
                [Wrench, "Service"]
              ].map(([Icon, title]) => (
                <div key={String(title)} className="rounded-2xl bg-slate-50 p-5">
                  <Icon className="mb-3 size-6 text-bluefire" />
                  <div className="font-black">{String(title)}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
