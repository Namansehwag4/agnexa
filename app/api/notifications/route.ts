import { NextResponse } from "next/server";
import { z } from "zod";
import { auth } from "@/lib/auth/config";
import { prisma } from "@/lib/db/prisma";

const notificationSchema = z.object({
  type: z.enum(["EXPIRY", "REFILL", "AMC_RENEWAL", "INSPECTION", "EMERGENCY", "SYSTEM"]),
  channel: z.enum(["EMAIL", "SMS", "WHATSAPP", "IN_APP"]),
  title: z.string().min(2),
  message: z.string().min(3),
  scheduledFor: z.string().optional()
});

export async function POST(request: Request) {
  const session = await auth();
  const body = notificationSchema.parse(await request.json());
  const notification = await prisma.notification.create({
    data: {
      ...body,
      userId: session?.user?.id,
      scheduledFor: body.scheduledFor ? new Date(body.scheduledFor) : undefined
    }
  });
  return NextResponse.json({ notification }, { status: 201 });
}

export async function GET() {
  const session = await auth();
  const notifications = await prisma.notification.findMany({
    where: session?.user?.id ? { userId: session.user.id } : {},
    orderBy: { createdAt: "desc" },
    take: 50
  });
  return NextResponse.json({ notifications });
}
