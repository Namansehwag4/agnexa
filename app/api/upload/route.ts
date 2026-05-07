import { NextResponse } from "next/server";
import { auth } from "@/lib/auth/config";
import { uploadToCloudinary } from "@/lib/services/cloudinary";

export async function POST(request: Request) {
  const session = await auth();
  if (session?.user?.role !== "ADMIN") return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const formData = await request.formData();
  const files = formData.getAll("images").filter((file): file is File => file instanceof File);
  const uploaded = await Promise.all(files.map((file) => uploadToCloudinary(file)));
  return NextResponse.json({ uploaded });
}
