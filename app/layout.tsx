// app/layout.tsx
import { Inter, Inknut_Antiqua } from "next/font/google";
import "./globals.css";
import ClientAuthProvider from "./components/clientAuthProvider";

const inter = Inter({ subsets: ["latin"], weight: "400" });
const inknutAntiqua = Inknut_Antiqua({ 
  subsets: ["latin"], 
  weight: "400", 
  variable: "--font-inknut" 
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} antialiased ${inknutAntiqua.variable}`}
        suppressHydrationWarning
      >
        <ClientAuthProvider>
          {children}
        </ClientAuthProvider>
      </body>
    </html>
  );
}