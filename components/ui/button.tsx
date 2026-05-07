import Link from "next/link";
import { cn } from "@/lib/utils/cn";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "ghost" | "dark";
};

export function Button({ className, variant = "primary", ...props }: ButtonProps) {
  return (
    <button
      className={cn(
        "focus-ring inline-flex min-h-11 items-center justify-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold transition",
        variant === "primary" && "bg-ember text-white shadow-glow hover:bg-red-700",
        variant === "secondary" && "border border-line bg-white text-carbon shadow-sm hover:border-bluefire hover:text-bluefire",
        variant === "ghost" && "text-slate-700 hover:bg-slate-100",
        variant === "dark" && "bg-carbon text-white hover:bg-zinc-800",
        className
      )}
      {...props}
    />
  );
}

export function LinkButton({
  href,
  children,
  className,
  variant = "primary"
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
  variant?: ButtonProps["variant"];
}) {
  return (
    <Link
      href={href}
      className={cn(
        "focus-ring inline-flex min-h-11 items-center justify-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold transition",
        variant === "primary" && "bg-ember text-white shadow-glow hover:bg-red-700",
        variant === "secondary" && "border border-line bg-white text-carbon shadow-sm hover:border-bluefire hover:text-bluefire",
        variant === "ghost" && "text-slate-700 hover:bg-slate-100",
        variant === "dark" && "bg-carbon text-white hover:bg-zinc-800",
        className
      )}
    >
      {children}
    </Link>
  );
}
