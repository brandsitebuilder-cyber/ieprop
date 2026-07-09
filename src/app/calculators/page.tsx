"use client";

import { useState } from "react";
import { Calculator, Home, ArrowRightLeft } from "lucide-react";

type TabType = "bond" | "transfer";

// --- Bond Calculator ---
function BondCalculator() {
  const [purchasePrice, setPurchasePrice] = useState(1500000);
  const [depositPercent, setDepositPercent] = useState(10);
  const [interestRate, setInterestRate] = useState(11.75);
  const [term, setTerm] = useState(20);

  const deposit = purchasePrice * (depositPercent / 100);
  const loanAmount = purchasePrice - deposit;
  const monthlyRate = interestRate / 100 / 12;
  const numPayments = term * 12;

  let monthlyRepayment = 0;
  if (monthlyRate > 0 && numPayments > 0 && loanAmount > 0) {
    monthlyRepayment =
      (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, numPayments)) /
      (Math.pow(1 + monthlyRate, numPayments) - 1);
  }

  const totalPayments = monthlyRepayment * numPayments;
  const totalInterest = totalPayments - loanAmount;

  return (
    <div className="space-y-6">
      {/* Purchase Price */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Purchase Price
        </label>
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 font-medium">
            R
          </span>
          <input
            type="number"
            value={purchasePrice}
            onChange={(e) => setPurchasePrice(Number(e.target.value) || 0)}
            className="w-full pl-7 pr-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand/30 focus:border-brand outline-none text-gray-900"
            min={0}
          />
        </div>
      </div>

      {/* Deposit % */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Deposit (%)
        </label>
        <input
          type="range"
          min={0}
          max={50}
          step={1}
          value={depositPercent}
          onChange={(e) => setDepositPercent(Number(e.target.value))}
          className="w-full accent-brand"
        />
        <div className="flex justify-between text-sm text-gray-500 mt-1">
          <span>{depositPercent}%</span>
          <span>R {deposit.toLocaleString("en-ZA")}</span>
        </div>
      </div>

      {/* Interest Rate */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Interest Rate (%)
        </label>
        <input
          type="number"
          value={interestRate}
          onChange={(e) => setInterestRate(Number(e.target.value) || 0)}
          step={0.25}
          className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand/30 focus:border-brand outline-none text-gray-900"
        />
      </div>

      {/* Term */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Loan Term (years)
        </label>
        <div className="flex gap-2">
          {[20, 25, 30].map((y) => (
            <button
              key={y}
              onClick={() => setTerm(y)}
              className={`flex-1 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                term === y
                  ? "bg-brand text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {y} yrs
            </button>
          ))}
        </div>
      </div>

      {/* Loan Amount */}
      <div className="bg-gray-50 rounded-lg p-4">
        <p className="text-sm text-gray-500">Loan Amount</p>
        <p className="text-xl font-bold text-gray-900">
          R {loanAmount.toLocaleString("en-ZA")}
        </p>
      </div>

      {/* Results */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-brand/5 rounded-lg p-4 text-center">
          <p className="text-sm text-gray-500 mb-1">Monthly Repayment</p>
          <p className="text-2xl font-bold text-brand">
            R {Math.round(monthlyRepayment).toLocaleString("en-ZA")}
          </p>
        </div>
        <div className="bg-amber-50 rounded-lg p-4 text-center">
          <p className="text-sm text-gray-500 mb-1">Total Interest</p>
          <p className="text-2xl font-bold text-amber-600">
            R {Math.round(totalInterest).toLocaleString("en-ZA")}
          </p>
        </div>
        <div className="bg-blue-50 rounded-lg p-4 text-center">
          <p className="text-sm text-gray-500 mb-1">Total Cost</p>
          <p className="text-2xl font-bold text-blue-600">
            R {Math.round(totalPayments + deposit).toLocaleString("en-ZA")}
          </p>
        </div>
      </div>
    </div>
  );
}

// --- Transfer Duty Calculator ---
function calculateTransferDuty(price: number): number {
  if (price <= 1_100_000) return 0;
  if (price <= 1_512_500) return (price - 1_100_000) * 0.03;
  if (price <= 2_117_500) return 12_375 + (price - 1_512_500) * 0.06;
  if (price <= 2_722_500) return 48_675 + (price - 2_117_500) * 0.08;
  if (price <= 12_500_000) return 97_075 + (price - 2_722_500) * 0.11;
  return 1_172_600 + (price - 12_500_000) * 0.13;
}

function estimateAttorneyFees(price: number): number {
  // Rough estimate for conveyancing attorney fees
  if (price <= 500_000) return 20_000;
  if (price <= 1_000_000) return 25_000;
  if (price <= 2_000_000) return 30_000;
  if (price <= 3_000_000) return 35_000;
  if (price <= 5_000_000) return 40_000;
  return 50_000;
}

function TransferCalculator() {
  const [purchasePrice, setPurchasePrice] = useState(1500000);

  const transferDuty = calculateTransferDuty(purchasePrice);
  const attorneyFees = estimateAttorneyFees(purchasePrice);
  const deedsOfficeFee = 1350; // Fixed fee
  const totalTransferCost = transferDuty + attorneyFees + deedsOfficeFee;

  return (
    <div className="space-y-6">
      {/* Purchase Price */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Purchase Price
        </label>
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 font-medium">
            R
          </span>
          <input
            type="number"
            value={purchasePrice}
            onChange={(e) => setPurchasePrice(Number(e.target.value) || 0)}
            className="w-full pl-7 pr-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand/30 focus:border-brand outline-none text-gray-900"
            min={0}
          />
        </div>
      </div>

      {/* Results */}
      <div className="space-y-3">
        <div className="flex justify-between items-center py-3 border-b">
          <span className="text-gray-600">Transfer Duty</span>
          <span className="font-semibold text-gray-900">
            R {Math.round(transferDuty).toLocaleString("en-ZA")}
          </span>
        </div>
        <div className="flex justify-between items-center py-3 border-b">
          <span className="text-gray-600">Attorney Fees (est.)</span>
          <span className="font-semibold text-gray-900">
            R {Math.round(attorneyFees).toLocaleString("en-ZA")}
          </span>
        </div>
        <div className="flex justify-between items-center py-3 border-b">
          <span className="text-gray-600">Deeds Office Fee</span>
          <span className="font-semibold text-gray-900">
            R {deedsOfficeFee.toLocaleString("en-ZA")}
          </span>
        </div>
        <div className="flex justify-between items-center py-3 bg-brand/5 rounded-lg px-4 -mx-4">
          <span className="font-semibold text-gray-900">Total Transfer Cost</span>
          <span className="text-xl font-bold text-brand">
            R {Math.round(totalTransferCost).toLocaleString("en-ZA")}
          </span>
        </div>
      </div>

      {/* Brackets reference */}
      <details className="text-sm text-gray-500">
        <summary className="cursor-pointer hover:text-gray-700">
          Transfer Duty Brackets (2025/26)
        </summary>
        <div className="mt-2 space-y-1 bg-gray-50 rounded-lg p-3 text-xs">
          <p>R0 – R1,100,000: 0%</p>
          <p>R1,100,001 – R1,512,500: 3% above R1.1m</p>
          <p>R1,512,501 – R2,117,500: R12,375 + 6% above R1,512,500</p>
          <p>R2,117,501 – R2,722,500: R48,675 + 8% above R2,117,500</p>
          <p>R2,722,501 – R12,500,000: R97,075 + 11% above R2,722,500</p>
          <p>&gt;R12,500,000: R1,172,600 + 13% above R12.5m</p>
        </div>
      </details>
    </div>
  );
}

// --- Main Page ---
export default function CalculatorsPage() {
  const [activeTab, setActiveTab] = useState<TabType>("bond");

  return (
    <main className="flex-1">
      {/* Hero */}
      <section className="bg-brand text-white py-16">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold tracking-tight">Property Calculators</h1>
          <p className="mt-4 text-brand-100 text-lg max-w-2xl mx-auto">
            Calculate your bond repayments and transfer costs. Get a clear picture of your property investment.
          </p>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-12">
        {/* Tab buttons (mobile) */}
        <div className="flex sm:hidden gap-2 mb-6">
          <button
            onClick={() => setActiveTab("bond")}
            className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg font-medium transition-colors ${
              activeTab === "bond"
                ? "bg-brand text-white"
                : "bg-gray-100 text-gray-600"
            }`}
          >
            <Home size={18} />
            Bond
          </button>
          <button
            onClick={() => setActiveTab("transfer")}
            className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg font-medium transition-colors ${
              activeTab === "transfer"
                ? "bg-brand text-white"
                : "bg-gray-100 text-gray-600"
            }`}
          >
            <ArrowRightLeft size={18} />
            Transfer
          </button>
        </div>

        {/* Side-by-side (desktop) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Bond Calculator */}
          <div className={activeTab === "bond" ? "block" : "hidden lg:block"}>
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 lg:p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-brand/10">
                  <Home size={20} className="text-brand" />
                </div>
                <h2 className="text-xl font-bold text-gray-900">Bond Calculator</h2>
              </div>
              <BondCalculator />
            </div>
          </div>

          {/* Transfer Calculator */}
          <div className={activeTab === "transfer" ? "block" : "hidden lg:block"}>
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 lg:p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-brand/10">
                  <ArrowRightLeft size={20} className="text-brand" />
                </div>
                <h2 className="text-xl font-bold text-gray-900">
                  Transfer Cost Calculator
                </h2>
              </div>
              <TransferCalculator />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
