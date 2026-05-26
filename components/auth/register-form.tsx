"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Flame, Mail, Lock, User, Phone, ShieldAlert, ArrowRight } from "lucide-react";
import Link from "next/link";

export function RegisterForm() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setLoading(true);

    const formData = new FormData(event.currentTarget);
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const phone = formData.get("phone") as string;
    const password = formData.get("password") as string;

    if (password.length < 8) {
      setError("Password must be at least 8 characters long.");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, phone, password })
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Registration failed. Please check details.");
      } else {
        window.location.href = "/auth/login";
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
    } finally {
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
          <h2 className="text-3xl font-black tracking-tight text-carbon">Create Account</h2>
          <p className="mt-2 text-sm font-semibold text-slate-500">
            Sign up to manage products, quotes, and AMC compliance
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
              <p className="font-bold">Registration failed</p>
              <p className="text-xs text-red-600/90 mt-0.5">{error}</p>
            </div>
          </motion.div>
        )}

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
              Full Name
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400">
                <User className="size-4" />
              </span>
              <input
                required
                name="name"
                type="text"
                placeholder="Naman Sehwag"
                className="h-12 w-full rounded-2xl border border-line bg-transparent pl-10 pr-4 text-sm font-semibold outline-none transition focus:border-bluefire focus:ring-1 focus:ring-bluefire"
              />
            </div>
          </div>

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
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
              Phone Number
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400">
                <Phone className="size-4" />
              </span>
              <input
                required
                name="phone"
                type="tel"
                placeholder="+91 99999 99999"
                className="h-12 w-full rounded-2xl border border-line bg-transparent pl-10 pr-4 text-sm font-semibold outline-none transition focus:border-bluefire focus:ring-1 focus:ring-bluefire"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
              Password
            </label>
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
                Create Account <ArrowRight className="size-4" />
              </>
            )}
          </button>
        </form>

        <p className="mt-8 text-center text-sm font-semibold text-slate-500">
          Already have an account?{" "}
          <Link href="/auth/login" className="font-bold text-bluefire hover:underline">
            Login here
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
