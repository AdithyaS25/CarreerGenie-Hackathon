import React from "react";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "default" | "outline" | "success";
};

export function Button({ children, variant = "default", className = "", ...props }: ButtonProps) {
  const base =
    "btn relative font-semibold px-6 py-2 rounded-xl transition-all duration-300 active:scale-95";
  const variants = {
    default: "bg-[var(--accent)] text-black hover:scale-105 shadow-[0_0_20px_var(--accent-dim)]",
    outline:
      "bg-transparent border border-[var(--accent)] text-[var(--accent)] hover:bg-[var(--accent)] hover:text-black shadow-[0_0_15px_var(--accent-dim)]",
    success:
      "bg-green-500 text-black hover:scale-105 shadow-[0_0_20px_rgba(34,197,94,0.4)]",
  };

  return (
    <button className={`${base} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
}
