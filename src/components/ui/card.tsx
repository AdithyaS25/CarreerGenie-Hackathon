import React from "react";

export function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={`card bg-gray-900/60 border border-gray-700/60 rounded-2xl shadow-lg backdrop-blur-md transition-all duration-500 hover:shadow-[0_0_25px_var(--accent-dim)] ${className}`}
    >
      {children}
    </div>
  );
}
