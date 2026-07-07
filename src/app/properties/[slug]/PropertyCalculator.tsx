'use client';

import { useState } from 'react';
import { Calculator, Home, ArrowRightLeft, ChevronDown, ChevronUp } from 'lucide-react';

interface PropertyCalculatorProps {
  price: number;
  type: 'sale' | 'rent';
}

function calculateBond(price: number, depositPct: number, rate: number, years: number) {
  const deposit = price * (depositPct / 100);
  const loan = price - deposit;
  const monthlyRate = rate / 100 / 12;
  const n = years * 12;
  if (monthlyRate === 0 || loan <= 0) return { monthly: 0, totalInterest: 0, totalCost: 0, loan };
  const monthly = (loan * monthlyRate * Math.pow(1 + monthlyRate, n)) / (Math.pow(1 + monthlyRate, n) - 1);
  return {
    monthly: Math.round(monthly),
    totalInterest: Math.round(monthly * n - loan),
    totalCost: Math.round(monthly * n + deposit),
    loan,
  };
}

function transferDuty(price: number) {
  if (price <= 1_100_000) return 0;
  if (price <= 1_512_500) return (price - 1_100_000) * 0.03;
  if (price <= 2_117_500) return 12_375 + (price - 1_512_500) * 0.06;
  if (price <= 2_722_500) return 48_675 + (price - 2_117_500) * 0.08;
  if (price <= 12_500_000) return 97_075 + (price - 2_722_500) * 0.11;
  return 1_172_600 + (price - 12_500_000) * 0.13;
}

export default function PropertyCalculator({ price, type }: PropertyCalculatorProps) {
  const [open, setOpen] = useState(false);
  const [depositPct, setDepositPct] = useState(10);
  const [rate, setRate] = useState(11.75);
  const [years, setYears] = useState(20);

  if (type === 'rent') return null;

  const bond = calculateBond(price, depositPct, rate, years);
  const duty = transferDuty(price);

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center gap-2 p-4 text-left font-semibold text-gray-900 hover:bg-gray-50 transition-colors"
      >
        <Calculator className="w-5 h-5 text-brand-600" />
        Affordability Calculator
        {open ? <ChevronUp className="w-4 h-4 ml-auto" /> : <ChevronDown className="w-4 h-4 ml-auto" />}
      </button>

      {open && (
        <div className="px-4 pb-4 space-y-4 border-t border-gray-100 pt-4">
          <p className="text-sm text-gray-500">See what this property would cost you monthly.</p>

          {/* Bond inputs */}
          <div className="space-y-3">
            <div>
              <label className="text-xs text-gray-500">Deposit: {depositPct}%</label>
              <input type="range" min={0} max={50} value={depositPct} onChange={e => setDepositPct(Number(e.target.value))} className="w-full accent-brand-600" />
            </div>
            <div className="flex gap-2">
              <div className="flex-1">
                <label className="text-xs text-gray-500">Rate %</label>
                <input type="number" value={rate} onChange={e => setRate(Number(e.target.value))} step={0.25} className="w-full border border-gray-200 rounded px-2 py-1 text-sm" />
              </div>
              <div className="flex-1">
                <label className="text-xs text-gray-500">Years</label>
                <select value={years} onChange={e => setYears(Number(e.target.value))} className="w-full border border-gray-200 rounded px-2 py-1 text-sm">
                  <option value={20}>20</option>
                  <option value={25}>25</option>
                  <option value={30}>30</option>
                </select>
              </div>
            </div>
          </div>

          {/* Results */}
          <div className="bg-brand-50 rounded-lg p-3 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Monthly repayment</span>
              <span className="font-bold text-brand-700">R {bond.monthly.toLocaleString('en-ZA')}</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-gray-500">Total interest</span>
              <span className="text-amber-600">R {bond.totalInterest.toLocaleString('en-ZA')}</span>
            </div>
            <div className="flex justify-between text-xs pt-1 border-t border-brand-100">
              <span className="text-gray-500">Transfer duty</span>
              <span className="text-gray-700">R {Math.round(duty).toLocaleString('en-ZA')}</span>
            </div>
          </div>

          <a href="/calculators" className="block text-center text-xs text-brand-600 hover:text-brand-700">
            Full calculator →
          </a>
        </div>
      )}
    </div>
  );
}
