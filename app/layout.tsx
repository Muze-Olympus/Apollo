"use client";

import { Inter, Inknut_Antiqua } from "next/font/google";
import "./globals.css";
import { AuthContextProvider } from "./context/AuthContext";
import { useState, useEffect } from "react";

const inter = Inter({ subsets: ["latin"], weight: "400" });
const inknutAntiqua = Inknut_Antiqua({ subsets: ["latin"], weight: "400", variable: "--font-inknut" });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Add state to track client-side rendering
  const [isMounted, setIsMounted] = useState(false);
  
  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <html lang="en">
      <body
        className={`${inter.className} antialiased ${inknutAntiqua.variable}`}
        suppressHydrationWarning
      >
        <AuthContextProvider>
          {children}
        </AuthContextProvider>
      </body>
    </html>
  );
}