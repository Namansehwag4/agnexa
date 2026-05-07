import { signIn } from "@/lib/auth/config";
import { LinkButton } from "@/components/ui/button";

export default function LoginPage() {
  async function credentialsLogin(formData: FormData) {
    "use server";
    await signIn("credentials", {
      email: formData.get("email"),
      password: formData.get("password"),
      redirectTo: "/dashboard"
    });
  }

  return (
    <div className="section-shell grid min-h-[70vh] place-items-center py-12">
      <div className="w-full max-w-md rounded-lg border border-zinc-200 p-6 shadow-sm dark:border-zinc-800">
        <h1 className="text-3xl font-black">Login</h1>
        <form action={credentialsLogin} className="mt-6 grid gap-4">
          <input name="email" type="email" placeholder="Email" className="h-11 rounded-md border border-zinc-200 bg-transparent px-3 dark:border-zinc-800" />
          <input name="password" type="password" placeholder="Password" className="h-11 rounded-md border border-zinc-200 bg-transparent px-3 dark:border-zinc-800" />
          <button className="h-11 rounded-md bg-ember font-bold text-white">Login</button>
        </form>
        <form action={async () => { "use server"; await signIn("google", { redirectTo: "/dashboard" }); }} className="mt-3">
          <button className="h-11 w-full rounded-md border border-zinc-200 font-bold dark:border-zinc-800">Continue with Google</button>
        </form>
        <LinkButton href="/auth/register" variant="ghost" className="mt-3 w-full">Create account</LinkButton>
      </div>
    </div>
  );
}
