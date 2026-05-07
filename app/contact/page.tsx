import { QuoteForm } from "@/components/forms/quote-form";
import { siteConfig } from "@/lib/constants/site";

export default function ContactPage() {
  return (
    <div className="section-shell grid gap-10 py-12 lg:grid-cols-[0.8fr_1.2fr]">
      <div>
        <p className="text-sm font-bold uppercase text-ember">Contact</p>
        <h1 className="mt-2 text-4xl font-black">Talk to a fire safety specialist</h1>
        <div className="mt-8 grid gap-3 text-zinc-600 dark:text-zinc-400">
          <p>{siteConfig.phone}</p>
          <p>{siteConfig.email}</p>
          <p>{siteConfig.address}</p>
        </div>
      </div>
      <QuoteForm />
    </div>
  );
}
