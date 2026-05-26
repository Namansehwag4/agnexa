"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { motion } from "framer-motion";
import { Flame, Mail, Lock, ShieldAlert, ArrowRight } from "lucide-react";
import Link from "next/link";

export function LoginForm() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setLoading(true);

    const formData = new FormData(event.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false
      });

      if (res?.error) {
        setError("Invalid email or password. Please try again.");
      } else {
        window.location.href = "/dashboard";
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  async function handleGoogleLogin() {
    setLoading(true);
    try {
      await signIn("google", { callbackUrl: "/dashboard" });
    } catch (err) {
      setError("Google authentication failed.");
      setLoading(false);
    }
  }

  return (
    <div className="relative min-h-[85vh] w-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 overflow-hidden bg-smoke">
      {/* Background decoration */}
      <div className="absolute inset-0 z-0">
        <div className="absolute -top-40 -left-40 size-96 rounded-full bg-red-500/5 blur-3xl" />
        <div className="absolute -bottom-40 -right-40 size-96 rounded-full bg-blue-500/5 blur-3xl" />
        <div className="saas-grid absolute inset-0 opacity-40" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative z-10 w-full max-w-md glass-card border border-line bg-white/90 p-8 shadow-industrial"
      >
        <div className="text-center">
          <div className="inline-flex size-14 items-center justify-center rounded-2xl bg-red-50 text-ember shadow-glow mb-4">
            <Flame className="size-8" />
          </div>
          <h2 className="text-3xl font-black tracking-tight text-carbon">Welcome Back</h2>
          <p className="mt-2 text-sm font-semibold text-slate-500">
            Access your Agnexa safety & compliance portal
          </p>
        </div>

        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 flex items-start gap-3 rounded-2xl border border-red-100 bg-red-50/50 p-4 text-sm text-ember"
          >
            <ShieldAlert className="size-5 shrink-0 mt-0.5" />
            <div>
              <p className="font-bold">Login failed</p>
              <p className="text-xs text-red-600/90 mt-0.5">{error}</p>
            </div>
          </motion.div>
        )}

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
              Email Address
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400">
                <Mail className="size-4" />
              </span>
              <input
                required
                name="email"
                type="email"
                placeholder="you@company.com"
                className="h-12 w-full rounded-2xl border border-line bg-transparent pl-10 pr-4 text-sm font-semibold outline-none transition focus:border-bluefire focus:ring-1 focus:ring-bluefire"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500">
                Password
              </label>
              <Link
                href="/auth/forgot"
                className="text-xs font-bold text-bluefire hover:underline"
              >
                Forgot Password?
              </Link>
            </div>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400">
                <Lock className="size-4" />
              </span>
              <input
                required
                name="password"
                type="password"
                placeholder="••••••••"
                className="h-12 w-full rounded-2xl border border-line bg-transparent pl-10 pr-4 text-sm font-semibold outline-none transition focus:border-bluefire focus:ring-1 focus:ring-bluefire"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="flex h-12 w-full items-center justify-center gap-2 rounded-2xl bg-ember font-bold text-white shadow-glow transition hover:bg-red-700 disabled:opacity-50"
          >
            {loading ? (
              <span className="size-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
            ) : (
              <>
                Login to Dashboard <ArrowRight className="size-4" />
              </>
            )}
          </button>
        </form>

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-line" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-white px-3 font-bold text-slate-400">Or continue with</span>
          </div>
        </div>

        <button
          onClick={handleGoogleLogin}
          type="button"
          disabled={loading}
          className="flex h-12 w-full items-center justify-center gap-3 rounded-2xl border border-line bg-white font-bold text-carbon transition hover:bg-slate-50 hover:border-slate-300 disabled:opacity-50"
        >
          <svg className="size-5" viewBox="0 0 24 24" width="24" height="24">
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
            />
            <path
              fill="#EA4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
            />
          </svg>
          Google Workspace
        </button>

        <p className="mt-8 text-center text-sm font-semibold text-slate-500">
          Don&apos;t have an account?{" "}
          <Link href="/auth/register" className="font-bold text-bluefire hover:underline">
            Create an account
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
