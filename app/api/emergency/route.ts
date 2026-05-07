import { NextResponse } from "next/server";
import { z } from "zod";
import { auth } from "@/lib/auth/config";
import { prisma } from "@/lib/db/prisma";

const emergencySchema = z.object({
  name: z.string().min(2),
  phone: z.string(),
  building: z.string().optional(),
  message: z.string().min(4),
  location: z.record(z.string(), z.union([z.string(), z.number()]))
});

export async function POST(request: Request) {
  const session = await auth();
  const body = emergencySchema.parse(await request.json());
  const alert = await prisma.emergencyAlert.create({ data: { ...body, userId: session?.user?.id } });
  return NextResponse.json({
    alert,
    nearbyFireStations: [
      { name: "Nearest Fire Station", eta: "8-12 min", distance: "3.2 km" },
      { name: "City Emergency Control Room", eta: "Phone support", distance: "Call now" }
    ]
  }, { status: 201 });
}

export async function GET() {
  const alerts = await prisma.emergencyAlert.findMany({ orderBy: { createdAt: "desc" }, take: 50 });
  return NextResponse.json({ alerts });
}
