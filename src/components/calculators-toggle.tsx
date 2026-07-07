'use client';

import { useState } from 'react';
import { Calculator, ChevronDown, ChevronUp, Home, ArrowRightLeft } from 'lucide-react';

export default function CalculatorsToggle() {
  const [open, setOpen] = useState(false);

  return (
    <section className="mt-8 py-6 border-t border-gray-200">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 text-lg font-bold text-gray-900 hover:text-brand-700 transition-colors w-full"
      >
        <Calculator className="w-5 h-5" />
        Property Calculators
        {open ? (
          <ChevronUp className="w-4 h-4 ml-auto" />
        ) : (
          <ChevronDown className="w-4 h-4 ml-auto" />
        )}
      </button>

      {open && (
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Bond Calculator */}
          <div className="bg-white border border-gray-200 rounded-xl p-5">
            <div className="flex items-center gap-2 mb-3">
              <Home className="w-5 h-5 text-brand-600" />
              <h3 className="font-semibold text-gray-900">Bond Calculator</h3>
            </div>
            <p className="text-sm text-gray-500 mb-3">
              Calculate your monthly bond repayments based on the purchase price and interest rate.
            </p>
            <button className="px-4 py-2 rounded-lg text-sm font-medium text-white bg-brand-600 hover:bg-brand-700 transition-colors">
              Calculate Bond
            </button>
          </div>

          {/* Transfer Calculator */}
          <div className="bg-white border border-gray-200 rounded-xl p-5">
            <div className="flex items-center gap-2 mb-3">
              <ArrowRightLeft className="w-5 h-5 text-brand-600" />
              <h3 className="font-semibold text-gray-900">Transfer Cost Calculator</h3>
            </div>
            <p className="text-sm text-gray-500 mb-3">
              Estimate transfer duties and legal fees when purchasing a property.
            </p>
            <button className="px-4 py-2 rounded-lg text-sm font-medium text-white bg-brand-600 hover:bg-brand-700 transition-colors">
              Calculate Transfer
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
