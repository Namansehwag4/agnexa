"use client";

import { AlertTriangle, MapPin, PhoneCall, Route } from "lucide-react";
import { useState } from "react";
import { Button, LinkButton } from "@/components/ui/button";
import { siteConfig } from "@/lib/constants/site";

export function EmergencyClient() {
  const [status, setStatus] = useState("");

  async function trigger() {
    setStatus("Capturing location...");
    navigator.geolocation?.getCurrentPosition(async (position) => {
      const response = await fetch("/api/emergency", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: "Emergency visitor",
          phone: "Unknown",
          message: "Emergency panic button triggered",
          location: { lat: position.coords.latitude, lng: position.coords.longitude }
        })
      });
      setStatus(response.ok ? "Emergency alert created. Contact local emergency services immediately." : "Could not create alert. Call emergency services now.");
    }, () => setStatus("Location permission denied. Call emergency services immediately."));
  }

  return (
    <div className="bg-smoke py-12">
      <div className="section-shell grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <p className="text-sm font-bold uppercase text-ember">Emergency response ecosystem</p>
          <h1 className="mt-2 text-5xl font-black tracking-tight">Panic workflows for the moments that cannot wait.</h1>
          <p className="mt-5 text-lg leading-8 text-slate-600">Trigger alerts, capture live location, contact support, and guide evacuation through a single emergency interface.</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button onClick={trigger} className="min-h-14 text-base"><AlertTriangle className="size-5" /> Panic Button</Button>
            <LinkButton href={`https://wa.me/${siteConfig.whatsapp}`} variant="secondary"><PhoneCall className="size-4" /> WhatsApp desk</LinkButton>
          </div>
          {status && <p className="mt-5 rounded-2xl bg-white p-4 font-semibold text-ember shadow-soft">{status}</p>}
        </div>
        <div className="grid gap-4">
          {[
            [MapPin, "Live location sharing", "Capture browser location and attach it to the emergency request."],
            [PhoneCall, "Quick contact system", "WhatsApp, phone, admin queue, and nearby station suggestions."],
            [Route, "Evacuation guidance", "Clear evacuation steps for occupants and floor wardens."]
          ].map(([Icon, title, copy]) => (
            <div key={String(title)} className="rounded-3xl border border-line bg-white p-6 shadow-soft">
              <Icon className="mb-4 size-8 text-bluefire" />
              <h2 className="text-xl font-black">{String(title)}</h2>
              <p className="mt-2 leading-7 text-slate-600">{String(copy)}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
