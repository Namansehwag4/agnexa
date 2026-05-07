import { z } from "zod";

export const cartItemSchema = z.object({
  productId: z.string(),
  name: z.string(),
  sku: z.string(),
  price: z.number().positive(),
  gstRate: z.number().min(0),
  quantity: z.number().int().positive(),
  image: z.string().optional()
});

export const checkoutSchema = z.object({
  customerName: z.string().min(2),
  customerEmail: z.string().email(),
  customerPhone: z.string().min(8),
  paymentMode: z.enum(["RAZORPAY", "COD"]),
  shippingAddress: z.object({
    line1: z.string().min(4),
    line2: z.string().optional(),
    city: z.string().min(2),
    state: z.string().min(2),
    pincode: z.string().min(4)
  }),
  billingAddress: z.record(z.string(), z.string()).optional(),
  items: z.array(cartItemSchema).min(1),
  couponCode: z.string().optional()
});

export function calculateCart(items: Array<z.infer<typeof cartItemSchema>>, discount = 0) {
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const gstTotal = items.reduce(
    (sum, item) => sum + (item.price * item.quantity * item.gstRate) / 100,
    0
  );
  const shippingTotal = subtotal > 10000 ? 0 : 250;
  const grandTotal = Math.max(0, subtotal + gstTotal + shippingTotal - discount);
  return { subtotal, gstTotal, shippingTotal, discountTotal: discount, grandTotal };
}
