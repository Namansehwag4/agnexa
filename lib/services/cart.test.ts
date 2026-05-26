import { describe, it, expect } from "vitest";
import { calculateCart } from "./cart";

describe("calculateCart", () => {
  it("should calculate correct totals for items with different GST rates", () => {
    const items = [
      { productId: "p1", name: "Extinguisher", sku: "FE-1", price: 2000, gstRate: 18, quantity: 2 }, // subtotal: 4000, gst: 720
      { productId: "p2", name: "Detector", sku: "SD-1", price: 1000, gstRate: 12, quantity: 1 }    // subtotal: 1000, gst: 120
    ];
    const result = calculateCart(items);
    expect(result.subtotal).toBe(5000);
    expect(result.gstTotal).toBe(840);
    expect(result.shippingTotal).toBe(250); // Under 10,000 threshold
    expect(result.grandTotal).toBe(5000 + 840 + 250);
  });

  it("should apply free shipping for subtotals over 10000", () => {
    const items = [
      { productId: "p1", name: "Heavy Extinguisher", sku: "FE-2", price: 6000, gstRate: 18, quantity: 2 } // subtotal: 12000
    ];
    const result = calculateCart(items);
    expect(result.shippingTotal).toBe(0);
    expect(result.grandTotal).toBe(12000 + (12000 * 0.18));
  });

  it("should apply discount correctly and cap grandTotal at 0", () => {
    const items = [
      { productId: "p1", name: "Helmet", sku: "H-1", price: 500, gstRate: 18, quantity: 1 } // subtotal: 500, gst: 90, shipping: 250 -> total: 840
    ];
    const result = calculateCart(items, 150); // Discount 150
    expect(result.discountTotal).toBe(150);
    expect(result.grandTotal).toBe(500 + 90 + 250 - 150);

    const resultNegative = calculateCart(items, 2000); // Massive discount
    expect(resultNegative.grandTotal).toBe(0);
  });

  it("should handle empty cart correctly", () => {
    const result = calculateCart([]);
    expect(result.subtotal).toBe(0);
    expect(result.gstTotal).toBe(0);
    expect(result.shippingTotal).toBe(250);
    expect(result.grandTotal).toBe(250);
  });
});
