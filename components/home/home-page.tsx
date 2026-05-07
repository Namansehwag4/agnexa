"use client";

import { motion } from "framer-motion";
import { ArrowRight, BadgeCheck, BarChart3, Building2, Flame, ShieldCheck, Siren, Wrench, type LucideIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { LinkButton } from "@/components/ui/button";
import { categories, siteConfig } from "@/lib/constants/site";
import { productCatalog } from "@/lib/constants/products";

const stats = [
  ["12,500+", "equipment units supplied"],
  ["840+", "industrial sites covered"],
  ["24/7", "emergency assistance"],
  ["98%", "AMC renewal trust"]
];

const trustCards: Array<[LucideIcon, string, string]> = [
  [ShieldCheck, "Certifications", "ISI, BIS, CE, ISO-led product sourcing with traceable compliance data."],
  [Wrench, "AMC services", "Refill, audit, maintenance, tagging, reporting, and inspection reminders."],
  [Building2, "B2B ready", "Quantity pricing, GST invoices, corporate quotes, and account-based support."]
];

export function HomePage() {
  return (
    <div className="bg-white dark:bg-carbon">
      <section className="industrial-grid relative overflow-hidden bg-carbon text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(220,38,38,0.28),transparent_34%),linear-gradient(120deg,rgba(9,9,11,0.88),rgba(9,9,11,0.58))]" />
        <div className="section-shell relative grid min-h-[650px] items-center gap-12 py-16 lg:grid-cols-[1.05fr_0.95fr]">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65 }}>
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-bold uppercase text-red-100">
              <Flame className="size-4 text-flame" />
              Certified fire protection partner
            </div>
            <h1 className="max-w-4xl text-4xl font-black leading-tight sm:text-5xl lg:text-6xl">
              Fire safety equipment, services, and AMC for serious facilities.
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-7 text-zinc-200 sm:text-lg">
              Buy certified equipment, request bulk quotations, book installation, schedule inspections, and manage compliance from one industrial-grade platform.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <LinkButton href="/products">Shop Equipment <ArrowRight className="size-4" /></LinkButton>
              <LinkButton href="/quote" variant="secondary">Request Bulk Quote</LinkButton>
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.15, duration: 0.65 }} className="relative">
            <div className="overflow-hidden rounded-lg border border-white/10 bg-white/10 shadow-industrial">
              <Image
                src="https://images.unsplash.com/photo-1581092335397-9583eb92d232?auto=format&fit=crop&w=1400&q=80"
                alt="Industrial fire safety equipment installation"
                width={900}
                height={680}
                priority
                className="h-[360px] w-full object-cover sm:h-[460px]"
              />
            </div>
            <div className="absolute -bottom-5 left-5 right-5 grid grid-cols-3 rounded-lg border border-white/10 bg-carbon/95 p-4 shadow-industrial backdrop-blur">
              {stats.slice(0, 3).map(([value, label]) => (
                <div key={label} className="border-r border-white/10 px-3 last:border-0">
                  <div className="text-lg font-black text-white">{value}</div>
                  <div className="text-xs text-zinc-400">{label}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <section className="section-shell py-16">
        <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="text-sm font-bold uppercase text-ember">Featured products</p>
            <h2 className="mt-2 text-3xl font-black">High-trust safety essentials</h2>
          </div>
          <Link href="/products" className="font-semibold text-ember">View catalog</Link>
        </div>
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {productCatalog.map((product) => (
            <Link key={product.slug} href={`/products/${product.slug}`} className="group rounded-lg border border-zinc-200 bg-white p-3 shadow-sm transition hover:-translate-y-1 hover:shadow-industrial dark:border-zinc-800 dark:bg-zinc-950">
              <Image src={product.images[0]} alt={product.name} width={500} height={380} className="h-48 w-full rounded-md object-cover" />
              <div className="p-2">
                <p className="text-xs font-bold uppercase text-ember">{product.category}</p>
                <h3 className="mt-2 min-h-12 font-bold group-hover:text-ember">{product.name}</h3>
                <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">{product.shortDesc}</p>
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-lg font-black">₹{product.price.toLocaleString("en-IN")}</span>
                  <span className="rounded-md bg-zinc-100 px-2 py-1 text-xs font-bold dark:bg-zinc-900">GST ready</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="bg-zinc-50 py-16 dark:bg-zinc-950">
        <div className="section-shell">
          <div className="mb-8 max-w-2xl">
            <p className="text-sm font-bold uppercase text-ember">Categories</p>
            <h2 className="mt-2 text-3xl font-black">Everything for compliant fire protection</h2>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {categories.map((category) => (
              <Link key={category} href={`/categories/${category.toLowerCase().replaceAll(" ", "-")}`} className="rounded-lg border border-zinc-200 bg-white p-5 font-bold transition hover:border-ember hover:text-ember dark:border-zinc-800 dark:bg-carbon">
                {category}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section-shell grid gap-8 py-16 lg:grid-cols-3">
        {trustCards.map(([Icon, title, copy]) => (
          <div key={String(title)} className="rounded-lg border border-zinc-200 p-7 dark:border-zinc-800">
            <Icon className="mb-5 size-9 text-ember" />
            <h3 className="text-xl font-black">{String(title)}</h3>
            <p className="mt-3 leading-7 text-zinc-600 dark:text-zinc-400">{String(copy)}</p>
          </div>
        ))}
      </section>

      <section className="bg-carbon py-16 text-white">
        <div className="section-shell grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="text-sm font-bold uppercase text-flame">Fire safety statistics</p>
            <h2 className="mt-2 text-3xl font-black">Compliance visibility for owners, EHS teams, and facility managers.</h2>
            <p className="mt-5 leading-7 text-zinc-300">Track equipment readiness, upcoming inspections, AMC requests, quotes, and invoices from a single dashboard.</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {stats.map(([value, label]) => (
              <div key={label} className="rounded-lg border border-white/10 bg-white/5 p-6">
                <BarChart3 className="mb-4 size-7 text-flame" />
                <div className="text-3xl font-black">{value}</div>
                <div className="mt-2 text-sm text-zinc-400">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-shell grid gap-6 py-16 lg:grid-cols-2">
        <div className="rounded-lg bg-ember p-8 text-white">
          <BadgeCheck className="mb-5 size-9" />
          <h2 className="text-3xl font-black">Book AMC and safety audits</h2>
          <p className="mt-4 leading-7 text-red-50">Schedule inspection, installation, extinguisher refill, hydrant checks, and annual maintenance contracts.</p>
          <LinkButton href="/services" variant="dark" className="mt-7">Book a service</LinkButton>
        </div>
        <div className="rounded-lg border border-zinc-200 p-8 dark:border-zinc-800">
          <Siren className="mb-5 size-9 text-ember" />
          <h2 className="text-3xl font-black">Emergency procurement support</h2>
          <p className="mt-4 leading-7 text-zinc-600 dark:text-zinc-400">Need urgent equipment for audit closure or site opening? Send your list on WhatsApp for rapid quote support.</p>
          <LinkButton href={`https://wa.me/${siteConfig.whatsapp}`} className="mt-7">Contact emergency desk</LinkButton>
        </div>
      </section>
    </div>
  );
}
