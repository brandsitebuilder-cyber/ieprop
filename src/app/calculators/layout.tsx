import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Calculators",
  description: "Free bond repayment, transfer duty and affordability calculators. Plan your property purchase with accurate cost estimates.",
};

export default function CalculatorsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
