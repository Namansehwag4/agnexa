import { NextResponse } from "next/server";
import { categories } from "@/lib/constants/site";
import { prisma } from "@/lib/db/prisma";

export async function GET() {
  try {
    const rows = await prisma.category.findMany({ include: { _count: { select: { products: true } } } });
    return NextResponse.json({ categories: rows });
  } catch {
    return NextResponse.json({ categories });
  }
}
