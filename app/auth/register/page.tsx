import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/db/prisma";

export default function RegisterPage() {
  async function register(formData: FormData) {
    "use server";
    const password = String(formData.get("password"));
    await prisma.user.create({
      data: {
        name: String(formData.get("name")),
        email: String(formData.get("email")),
        phone: String(formData.get("phone")),
        passwordHash: await bcrypt.hash(password, 12)
      }
    });
    redirect("/auth/login");
  }

  return (
    <div className="section-shell grid min-h-[70vh] place-items-center py-12">
      <form action={register} className="grid w-full max-w-md gap-4 rounded-lg border border-zinc-200 p-6 shadow-sm dark:border-zinc-800">
        <h1 className="text-3xl font-black">Create account</h1>
        <input name="name" placeholder="Name" className="h-11 rounded-md border border-zinc-200 bg-transparent px-3 dark:border-zinc-800" />
        <input name="email" type="email" placeholder="Email" className="h-11 rounded-md border border-zinc-200 bg-transparent px-3 dark:border-zinc-800" />
        <input name="phone" placeholder="Phone" className="h-11 rounded-md border border-zinc-200 bg-transparent px-3 dark:border-zinc-800" />
        <input name="password" type="password" placeholder="Password" className="h-11 rounded-md border border-zinc-200 bg-transparent px-3 dark:border-zinc-800" />
        <button className="h-11 rounded-md bg-ember font-bold text-white">Register</button>
      </form>
    </div>
  );
}
