import { NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";

const fallbackPlans = [
  { name: "Starter", slug: "starter", monthlyPrice: 2999, yearlyPrice: 29990 },
  { name: "Professional", slug: "professional", monthlyPrice: 7999, yearlyPrice: 79990 },
  { name: "Enterprise", slug: "enterprise", monthlyPrice: 0, yearlyPrice: 0 }
];

export async function GET() {
  try {
    const plans = await prisma.amcPlan.findMany({ where: { isActive: true }, orderBy: { priority: "asc" } });
    return NextResponse.json({ plans });
  } catch {
    return NextResponse.json({ plans: fallbackPlans });
  }
}
