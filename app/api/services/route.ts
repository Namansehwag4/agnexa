import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/db/prisma";

const serviceSchema = z.object({
  type: z.enum(["INSTALLATION", "REFILL", "SAFETY_AUDIT", "AMC", "INSPECTION"]),
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(8),
  siteAddress: z.string().min(4),
  details: z.string().min(5)
});

export async function POST(request: Request) {
  const body = serviceSchema.parse(await request.json());
  const service = await prisma.serviceRequest.create({ data: body });
  return NextResponse.json({ service }, { status: 201 });
}

export async function GET() {
  const services = await prisma.serviceRequest.findMany({ orderBy: { createdAt: "desc" } });
  return NextResponse.json({ services });
}
