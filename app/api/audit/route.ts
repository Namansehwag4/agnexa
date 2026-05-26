import { NextResponse } from "next/server";
import { z } from "zod";
import { auth } from "@/lib/auth/config";
import { prisma } from "@/lib/db/prisma";
import { rateLimit, getClientIp } from "@/lib/utils/rate-limit";
import { askGeminiForAudit } from "@/lib/services/gemini";

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
  const ip = getClientIp(request);
  const limiter = rateLimit(ip, 3, 60 * 1000); // Max 3 audits per minute
  if (!limiter.success) {
    return NextResponse.json(
      { error: "Too many audit requests. Please try again in a minute." },
      { status: 429, headers: { "X-RateLimit-Reset": String(limiter.reset) } }
    );
  }

  const session = await auth();
  const input = auditSchema.parse(await request.json());
  const report = await askGeminiForAudit(input);
  try {
    const dbReport = await prisma.auditReport.create({
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
    return NextResponse.json({ report: { ...report, id: dbReport.id, input } });
  } catch (err) {
    console.error("Failed to create audit report in DB:", err);
    // The wizard still works before database migration is complete.
  }
  return NextResponse.json({ report: { ...report, id: "draft", input } });
}

export async function GET() {
  const reports = await prisma.auditReport.findMany({ orderBy: { createdAt: "desc" }, take: 50 });
  return NextResponse.json({ reports });
}
