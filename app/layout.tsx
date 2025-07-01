// layout.tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { BackgroundBeams } from "@/components/ui/background-beams";
import { Footer } from "@/components/Footer";
import { Toaster } from "sonner";
import { Providers } from "./providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Akari Art | Home",
  description:
    "Generate stunning visuals using Akari AI or explore community creations.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable}`}
      suppressHydrationWarning={true}
    >
      <body
        className="antialiased bg-black text-white"
        suppressHydrationWarning={true}
      >
        <Providers>
          <div className="flex flex-col items-center w-full min-h-screen">
            <Navbar />
            <main className="w-full flex-grow">{children}</main>
            <Footer />
            <BackgroundBeams />
            <Toaster />
          </div>
        </Providers>
      </body>
    </html>
  );
}
