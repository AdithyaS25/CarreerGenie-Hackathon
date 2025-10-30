"use client";

import "./globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Orbitron:wght@500;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen font-[Orbitron] overflow-x-hidden transition-colors duration-500">
        <div className="min-h-screen flex flex-col relative">
          {children}
        </div>
      </body>
    </html>
  );
}
