import { NextResponse } from "next/server";
import { z } from "zod";
import { auth } from "@/lib/auth/config";
import { prisma } from "@/lib/db/prisma";
import { generateAuditReport } from "@/lib/services/audit-engine";

const auditSchema = z.object({
  buildingType: z.string().min(2),
  areaSqFt: z.number().int().positive(),
  floors: z.number().int().positive(),
  occupancyCount: z.number().int().positive(),
  electricalLoad: z.string(),
  hasKitchen: z.boolean(),
  hasIndustrialEquipment: z.boolean()
});

export async function POST(request: Request) {
  const session = await auth();
  const input = auditSchema.parse(await request.json());
  const report = generateAuditReport(input);
  try {
    await prisma.auditReport.create({
      data: {
        userId: session?.user?.id,
        ...input,
        inputs: input,
        riskScore: report.riskScore,
        riskLevel: report.riskLevel,
        recommendations: report.recommendations,
        compliance: report.compliance,
        suggestedProducts: report.suggestedProducts
      }
    });
  } catch {
    // The wizard still works before database migration is complete.
  }
  return NextResponse.json({ report: { ...report, input } });
}

export async function GET() {
  const reports = await prisma.auditReport.findMany({ orderBy: { createdAt: "desc" }, take: 50 });
  return NextResponse.json({ reports });
}
