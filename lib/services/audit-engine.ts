import { productCatalog } from "@/lib/constants/products";

export type AuditInput = {
  buildingType: string;
  areaSqFt: number;
  floors: number;
  occupancyCount: number;
  electricalLoad: string;
  hasKitchen: boolean;
  hasIndustrialEquipment: boolean;
};

export function generateAuditReport(input: AuditInput) {
  let score = 22;
  score += Math.min(22, Math.ceil(input.areaSqFt / 1500));
  score += input.floors * 4;
  score += Math.min(18, Math.ceil(input.occupancyCount / 40));
  score += input.electricalLoad.toLowerCase().includes("high") ? 18 : 8;
  score += input.hasKitchen ? 10 : 0;
  score += input.hasIndustrialEquipment ? 16 : 0;
  score = Math.min(100, score);

  const riskLevel = score >= 82 ? "CRITICAL" : score >= 65 ? "HIGH" : score >= 42 ? "MODERATE" : "LOW";
  const extinguisherCount = Math.max(2, Math.ceil(input.areaSqFt / 1500));

  return {
    riskScore: score,
    riskLevel,
    recommendations: [
      `Install at least ${extinguisherCount} certified extinguishers across accessible fire points.`,
      "Create QR-based asset logs for every extinguisher and safety device.",
      "Schedule monthly inspections for high-traffic and electrical zones.",
      input.hasKitchen ? "Add Class K/wet chemical protection and kitchen hood inspection routines." : "Maintain normal pantry fire controls.",
      input.hasIndustrialEquipment ? "Add machine-zone detection, isolation guidance, and technician inspection logs." : "Maintain office-grade alarm and detection coverage."
    ],
    compliance: {
      extinguisherCoverage: "Review placement every 15-20 meters of travel distance.",
      evacuation: "Maintain illuminated exit routes and drill records.",
      inspection: "Keep refill, pressure, and expiry records audit-ready."
    },
    suggestedProducts: productCatalog.slice(0, 3),
    cards: [
      { title: "Coverage", copy: `${extinguisherCount} extinguisher points recommended for this area.` },
      { title: "Inspection", copy: "QR logs and reminders reduce missed refill and expiry events." },
      { title: "Compliance", copy: "Report highlights documentation and device-readiness gaps." }
    ]
  };
}
