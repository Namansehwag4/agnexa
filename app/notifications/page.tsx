import { BellRing, Mail, MessageSquare, Smartphone } from "lucide-react";

export default function NotificationsPage() {
  return (
    <div className="section-shell py-12">
      <p className="text-sm font-bold uppercase text-ember">Reminder ecosystem</p>
      <h1 className="mt-2 text-5xl font-black tracking-tight">Never miss refill, expiry, AMC, or inspection timelines.</h1>
      <div className="mt-10 grid gap-5 md:grid-cols-4">
        {[[BellRing, "In-app alerts"], [Mail, "Email"], [Smartphone, "SMS"], [MessageSquare, "WhatsApp"]].map(([Icon, label]) => (
          <div key={String(label)} className="rounded-3xl border border-line bg-white p-6 shadow-soft">
            <Icon className="mb-4 size-7 text-bluefire" />
            <h2 className="font-black">{String(label)}</h2>
          </div>
        ))}
      </div>
    </div>
  );
}
