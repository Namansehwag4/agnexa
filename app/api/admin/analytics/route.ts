import { NextResponse } from "next/server";
import { auth } from "@/lib/auth/config";
import { prisma } from "@/lib/db/prisma";

export async function GET() {
  const session = await auth();
  if (session?.user?.role !== "ADMIN") return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const [orders, products, quotes, services, users, audits, assets, alerts] = await Promise.all([
    prisma.order.count(),
    prisma.product.count(),
    prisma.quoteRequest.count(),
    prisma.serviceRequest.count(),
    prisma.user.count(),
    prisma.auditReport.count(),
    prisma.fireAsset.count(),
    prisma.emergencyAlert.count()
  ]);
  return NextResponse.json({
    metrics: { orders, products, quotes, services, users, audits, assets, alerts },
    modules: ["revenue", "inventory", "lead pipeline", "safety audit risk", "QR asset health", "emergency response"]
  });
}
