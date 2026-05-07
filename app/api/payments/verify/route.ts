import { NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";
import { verifyRazorpaySignature } from "@/lib/payments/razorpay";

export async function POST(request: Request) {
  const body = await request.json();
  const valid = verifyRazorpaySignature({
    orderId: body.razorpay_order_id,
    paymentId: body.razorpay_payment_id,
    signature: body.razorpay_signature
  });
  if (!valid) return NextResponse.json({ error: "Invalid signature" }, { status: 400 });

  await prisma.order.updateMany({
    where: { razorpayOrderId: body.razorpay_order_id },
    data: {
      paymentStatus: "PAID",
      status: "CONFIRMED",
      razorpayPaymentId: body.razorpay_payment_id
    }
  });
  return NextResponse.json({ ok: true });
}
