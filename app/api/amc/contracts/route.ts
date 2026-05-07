import { NextResponse } from "next/server";
import { z } from "zod";
import { auth } from "@/lib/auth/config";
import { prisma } from "@/lib/db/prisma";

const contractSchema = z.object({
  planId: z.string(),
  siteName: z.string().min(2),
  siteAddress: z.string().min(5),
  billingCycle: z.enum(["monthly", "yearly"]),
  startsAt: z.string()
});

export async function POST(request: Request) {
  const session = await auth();
  const body = contractSchema.parse(await request.json());
  const start = new Date(body.startsAt);
  const renewsAt = new Date(start);
  renewsAt.setMonth(renewsAt.getMonth() + (body.billingCycle === "yearly" ? 12 : 1));
  const contract = await prisma.amcContract.create({
    data: {
      contractNumber: `AMC-${Date.now()}`,
      userId: session?.user?.id,
      planId: body.planId,
      siteName: body.siteName,
      siteAddress: body.siteAddress,
      billingCycle: body.billingCycle,
      startsAt: start,
      renewsAt
    }
  });
  return NextResponse.json({ contract }, { status: 201 });
}
