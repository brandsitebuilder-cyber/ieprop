import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import ClickTracking from "@/components/ClickTracking";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "ieProp — Property Listings",
  description:
    "Find your dream property. Browse houses, apartments, and plots for sale and to rent.",
  icons: {
    icon: "/assets/favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full`}>
      <head>
        <link rel="preload" as="video" href="/video/hero.mp4" type="video/mp4" />
      </head>
      <body className="min-h-full flex flex-col bg-gray-50 text-gray-900 antialiased">
        <ClickTracking />
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
