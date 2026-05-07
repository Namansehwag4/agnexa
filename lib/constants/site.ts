export const siteConfig = {
  name: "Agnexa Fire Safety",
  url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  description:
    "Fire safety equipment, AMC service, QR asset tracking, installation, inspection, refill reminders, and compliance support for Indian homes, offices, and industrial sites.",
  phone: "+91 99999 99999",
  email: "sales@agnexa.com",
  address: "Industrial Safety Hub, New Delhi, India",
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "919999999999",
  gstin: "07AAGCA9999A1Z5"
};

export const platformNav = [
  { href: "/ai-audit", label: "Safety Audit" },
  { href: "/tracking", label: "QR Tracking" },
  { href: "/amc", label: "AMC" },
  { href: "/services", label: "Services" },
  { href: "/products", label: "Shop" },
  { href: "/quote", label: "Bulk Orders" }
];

export const categories = [
  "Fire Extinguishers",
  "Smoke Detectors",
  "Fire Alarms",
  "Fire Hose Reels",
  "Hydrant Systems",
  "Sprinklers",
  "Fire Blankets",
  "Safety Helmets",
  "PPE Kits",
  "Safety Gloves",
  "Safety Shoes",
  "Exit Lights",
  "Emergency Lights",
  "Fire Escape Ladders",
  "Gas Leak Detectors",
  "Industrial Safety Equipment",
  "First Aid Kits",
  "Emergency Response Kits",
  "Fire Doors",
  "Fire Resistant Storage",
  "Electrical Safety Equipment"
];
