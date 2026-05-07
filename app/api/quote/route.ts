import { NextResponse } from "next/server";
import { z } from "zod";
import { sendNotificationEmail } from "@/lib/email/notify";
import { prisma } from "@/lib/db/prisma";

const quoteSchema = z.object({
  name: z.string().min(2),
  phone: z.string().min(8),
  email: z.string().email(),
  company: z.string().optional(),
  city: z.string().min(2),
  gstin: z.string().optional(),
  requirements: z.string().min(5)
});

export async function POST(request: Request) {
  const body = quoteSchema.parse(await request.json());
  const quote = await prisma.quoteRequest.create({
    data: { ...body, requirements: { text: body.requirements } }
  });
  await sendNotificationEmail({
    to: process.env.MAIL_FROM || "sales@agnexa.com",
    subject: `New B2B quote request from ${body.name}`,
    text: `${body.name} requested: ${body.requirements}`
  });
  return NextResponse.json({ quote }, { status: 201 });
}

export async function GET() {
  const quotes = await prisma.quoteRequest.findMany({ orderBy: { createdAt: "desc" } });
  return NextResponse.json({ quotes });
}
