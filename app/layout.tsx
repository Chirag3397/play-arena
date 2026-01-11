import type { Metadata } from "next";
import { Exo_2 } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { clsx } from "clsx";
import { ClerkProvider } from "@clerk/nextjs";

import Footer from "@/components/Footer";

const exo2 = Exo_2({
  subsets: ["latin"],
  variable: "--font-exo2",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Play Arena Gaming Lounge | The Ultimate Gaming Experience",
  description: "High-end PCs, PS5s, and Racing Simulators. Book your slot now.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" className={exo2.variable}>
        <body className="font-sans antialiased text-white bg-background selection:bg-primary selection:text-white overflow-x-hidden">
          <Navbar />
          <main className="pt-20 min-h-screen">
            {children}
          </main>
          <Footer />
        </body>
      </html>
    </ClerkProvider>
  );
}
