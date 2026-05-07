import { NextResponse } from "next/server";
import { auth } from "@/lib/auth/config";
import { prisma } from "@/lib/db/prisma";
import { razorpay } from "@/lib/payments/razorpay";
import { calculateCart, checkoutSchema } from "@/lib/services/cart";

export async function POST(request: Request) {
  const session = await auth();
  const parsed = checkoutSchema.safeParse(await request.json());
  if (!parsed.success) return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });

  const { items, paymentMode, customerEmail, customerName, customerPhone, shippingAddress } = parsed.data;
  const totals = calculateCart(items);
  const orderNumber = `AGN-${new Date().getFullYear()}-${Math.floor(100000 + Math.random() * 900000)}`;

  let razorpayOrder;
  if (paymentMode === "RAZORPAY") {
    razorpayOrder = await razorpay.orders.create({
      amount: Math.round(totals.grandTotal * 100),
      currency: "INR",
      receipt: orderNumber,
      notes: { customerEmail }
    });
  }

  const order = await prisma.order.create({
    data: {
      orderNumber,
      userId: session?.user?.id,
      customerName,
      customerEmail,
      customerPhone,
      shippingAddress,
      billingAddress: parsed.data.billingAddress || shippingAddress,
      subtotal: totals.subtotal,
      gstTotal: totals.gstTotal,
      shippingTotal: totals.shippingTotal,
      discountTotal: totals.discountTotal,
      grandTotal: totals.grandTotal,
      paymentMode,
      paymentStatus: paymentMode === "COD" ? "COD" : "PENDING",
      razorpayOrderId: razorpayOrder?.id,
      invoiceNumber: `INV-${orderNumber}`,
      items: {
        create: items.map((item) => ({
          productId: item.productId,
          name: item.name,
          sku: item.sku,
          quantity: item.quantity,
          price: item.price,
          gstRate: item.gstRate
        }))
      }
    }
  });

  return NextResponse.json({ orderId: order.id, orderNumber, razorpay: razorpayOrder });
}
