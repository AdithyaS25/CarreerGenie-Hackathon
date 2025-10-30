"use client";
import { useRouter } from "next/navigation";

export default function LandingPage() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center px-6">
      {/* Title */}
      <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-5 text-[var(--accent)] drop-shadow-[0_0_10px_rgba(0,255,255,0.6)] tracking-wide">
        Welcome to CareerWise
      </h1>

      {/* Subtitle */}
      <p className="text-gray-300 max-w-xl mb-10 text-base sm:text-lg leading-relaxed">
        Unsure about your next move? Take our quick quiz and discover your best-fit career path.
      </p>

      {/* Glass Card */}
      <div className="card p-6 sm:p-8 max-w-md w-full text-gray-200 space-y-6">
        <p className="text-sm sm:text-base text-gray-400">
          No boring forms — just a quick interactive journey to clarity.
        </p>

        <button
          onClick={() => router.push("/quiz")}
          className="btn w-full text-base sm:text-lg py-3 font-semibold"
        >
          Get Started 🚀
        </button>
      </div>

      {/* Subtle bottom glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[70%] h-32 bg-[radial-gradient(circle,rgba(0,255,255,0.25)_0%,transparent_70%)] blur-3xl pointer-events-none"></div>
    </div>
  );
}
