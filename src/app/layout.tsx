import "./globals.css";
import { Orbitron } from "next/font/google";

const orbitron = Orbitron({
  subsets: ["latin"],
  weight: ["500", "700"],
  display: "swap",
  fallback: ["Arial", "sans-serif"],
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body
        className={`min-h-screen ${orbitron.className} overflow-x-hidden transition-colors duration-500`}
        suppressHydrationWarning
      >
        <div className="min-h-screen flex flex-col relative">
          {children}
        </div>
      </body>
    </html>
  );
}
