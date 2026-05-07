import { NextResponse } from "next/server";
import { verifyWebhookSignature } from "@/lib/payments/razorpay";

export async function POST(request: Request) {
  const body = await request.text();
  const signature = request.headers.get("x-razorpay-signature") || "";
  if (!verifyWebhookSignature(body, signature)) {
    return NextResponse.json({ error: "Invalid webhook signature" }, { status: 400 });
  }
  return NextResponse.json({ received: true });
}
