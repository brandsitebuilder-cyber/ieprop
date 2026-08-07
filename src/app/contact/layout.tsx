import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Get in touch with ieProp. Our estate agents are ready to help you buy, sell, or rent property.",
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
