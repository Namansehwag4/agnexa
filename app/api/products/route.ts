import { NextResponse } from "next/server";
import { z } from "zod";
import { auth } from "@/lib/auth/config";
import { productCatalog } from "@/lib/constants/products";
import { prisma } from "@/lib/db/prisma";

const productSchema = z.object({
  name: z.string().min(2),
  slug: z.string().min(2),
  sku: z.string().min(2),
  shortDesc: z.string().min(5),
  description: z.string().min(10),
  price: z.number().positive(),
  categoryId: z.string(),
  stock: z.number().int().min(0).default(0)
});

export async function GET() {
  try {
    const products = await prisma.product.findMany({
      where: { isActive: true },
      include: { category: true, images: true, reviews: true },
      orderBy: { createdAt: "desc" }
    });
    return NextResponse.json({ products });
  } catch {
    return NextResponse.json({ products: productCatalog });
  }
}

export async function POST(request: Request) {
  const session = await auth();
  if (session?.user?.role !== "ADMIN") return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const body = productSchema.parse(await request.json());
  const product = await prisma.product.create({
    data: {
      ...body,
      gstRate: 18,
      certifications: [],
      specifications: {},
      technicalData: {}
    }
  });
  return NextResponse.json({ product }, { status: 201 });
}
