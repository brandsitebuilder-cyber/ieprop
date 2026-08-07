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
  metadataBase: new URL("https://ieprop.vercel.app"),
  title: {
    default: "ieProp — Premium Property Listings South Africa",
    template: "%s | ieProp",
  },
  description:
    "Find your dream property in South Africa. Browse houses, apartments, and plots for sale and to rent. Expert estate agents in Cape Town, Johannesburg, and across SA.",
  keywords: ["property", "real estate", "house for sale", "South Africa", "Cape Town", "apartment", "estate agent", "property listings"],
  authors: [{ name: "ieProp" }],
  openGraph: {
    type: "website",
    locale: "en_ZA",
    siteName: "ieProp",
    title: "ieProp — Premium Property Listings",
    description: "Find your dream property. Browse houses, apartments, and plots for sale and to rent across South Africa.",
    images: [{ url: "/assets/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "ieProp — Premium Property Listings",
    description: "Find your dream property across South Africa.",
  },
  robots: { index: true, follow: true },
  icons: { icon: "/assets/favicon.png" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} h-full`}>
      <body className="min-h-full flex flex-col bg-gray-50 text-gray-900 antialiased">
        <ClickTracking />
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
