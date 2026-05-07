import { NextResponse } from "next/server";
import { productCatalog } from "@/lib/constants/products";

export async function POST(request: Request) {
  const body = await request.json();
  const useCase = String(body.useCase || "").toLowerCase();
  const area = Number(body.areaSqFt || 1000);
  const risk = useCase.includes("electrical") ? "CO2 extinguishers and smoke detectors" : "ABC extinguishers, alarms, and exit lights";
  const extinguisherCount = Math.max(1, Math.ceil(area / 1500));
  return NextResponse.json({
    recommendation: `For ${area} sq ft, start with ${extinguisherCount} certified units, ${risk}, plus inspection signage.`,
    products: productCatalog.slice(0, 3)
  });
}
