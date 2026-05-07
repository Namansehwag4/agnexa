import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";
import { categories } from "../lib/constants/site";
import { productCatalog } from "../lib/constants/products";

const prisma = new PrismaClient();

async function main() {
  const categoryRows = await Promise.all(
    categories.map((name) =>
      prisma.category.upsert({
        where: { slug: name.toLowerCase().replaceAll(" ", "-") },
        update: {},
        create: {
          name,
          slug: name.toLowerCase().replaceAll(" ", "-"),
          description: `Certified ${name.toLowerCase()} for industrial, commercial, and residential compliance.`
        }
      })
    )
  );

  const categoryByName = new Map(categoryRows.map((category: { name: string; id: string }) => [category.name, category]));

  for (const product of productCatalog) {
    const category = categoryByName.get(product.category) as { id: string } | undefined;
    if (!category) continue;
    await prisma.product.upsert({
      where: { slug: product.slug },
      update: {},
      create: {
        id: product.slug,
        name: product.name,
        slug: product.slug,
        sku: product.sku,
        shortDesc: product.shortDesc,
        description: product.description,
        price: product.price,
        mrp: product.mrp,
        gstRate: 18,
        stock: product.stock,
        minBulkQty: 10,
        bulkPrice: Math.round(product.price * 0.88),
        certifications: product.certifications,
        specifications: product.specifications,
        technicalData: product.technicalData,
        isFeatured: product.isFeatured,
        categoryId: category.id,
        images: {
          create: product.images.map((url, index) => ({
            url,
            alt: product.name,
            sortOrder: index
          }))
        }
      }
    });
  }

  await prisma.coupon.upsert({
    where: { code: "SAFETY10" },
    update: {},
    create: {
      code: "SAFETY10",
      description: "Launch coupon for online equipment orders",
      percentOff: 10,
      minSubtotal: 5000
    }
  });

  const amcPlans = [
    {
      name: "Starter",
      slug: "starter",
      description: "For shops and small offices that need basic reminder-led maintenance.",
      monthlyPrice: 2999,
      yearlyPrice: 29990,
      features: ["Quarterly inspection", "Expiry alerts", "Basic refill coordination"],
      priority: 1
    },
    {
      name: "Professional",
      slug: "professional",
      description: "For offices, schools, clinics, and multi-floor commercial spaces.",
      monthlyPrice: 7999,
      yearlyPrice: 79990,
      features: ["Monthly inspection", "QR asset logs", "Technician booking", "Renewal automation"],
      priority: 2
    },
    {
      name: "Enterprise",
      slug: "enterprise",
      description: "For factories, warehouses, and multi-site safety operations.",
      monthlyPrice: 0,
      yearlyPrice: 0,
      features: ["SLA support", "Multi-location analytics", "Dedicated service manager", "Compliance dashboard"],
      priority: 3
    }
  ];

  for (const plan of amcPlans) {
    await prisma.amcPlan.upsert({
      where: { slug: plan.slug },
      update: plan,
      create: plan
    });
  }

  await prisma.user.upsert({
    where: { email: "admin@agnexa.com" },
    update: {},
    create: {
      name: "Agnexa Admin",
      email: "admin@agnexa.com",
      phone: "9999999999",
      role: "ADMIN",
      passwordHash: await bcrypt.hash("Admin@12345", 12)
    }
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
