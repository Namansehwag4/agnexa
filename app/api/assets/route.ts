import { NextResponse } from "next/server";
import { z } from "zod";
import { auth } from "@/lib/auth/config";
import { prisma } from "@/lib/db/prisma";
import { createAssetQrDataUrl } from "@/lib/services/qr";

const assetSchema = z.object({
  assetTag: z.string().min(3),
  location: z.string().min(2),
  building: z.string().optional(),
  floor: z.string().optional(),
  installedAt: z.string(),
  expiresAt: z.string().optional()
});

export async function POST(request: Request) {
  const session = await auth();
  const body = assetSchema.parse(await request.json());
  const targetUrl = `${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/tracking/${body.assetTag}`;
  const qrCodeDataUrl = createAssetQrDataUrl(body.assetTag, targetUrl);
  const asset = await prisma.fireAsset.create({
    data: {
      ...body,
      userId: session?.user?.id,
      installedAt: new Date(body.installedAt),
      expiresAt: body.expiresAt ? new Date(body.expiresAt) : undefined,
      qrCodeDataUrl
    }
  });
  return NextResponse.json({ asset }, { status: 201 });
}

export async function GET() {
  const assets = await prisma.fireAsset.findMany({ orderBy: { createdAt: "desc" }, take: 100 });
  return NextResponse.json({ assets });
}
