import { NextResponse } from "next/server";
import { createAssetQrSvg } from "@/lib/services/qr";

export async function GET(_: Request, { params }: { params: Promise<{ tag: string }> }) {
  const { tag } = await params;
  const targetUrl = `${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/tracking/${tag}`;
  const svg = createAssetQrSvg(tag, targetUrl);
  return new NextResponse(svg, {
    headers: {
      "Content-Type": "image/svg+xml",
      "Content-Disposition": `inline; filename="${tag}.svg"`
    }
  });
}
