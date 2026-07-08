'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Home, Building2, Banknote, UserRound, Calculator, Menu, X, Phone } from 'lucide-react';

const NAV_ITEMS = [
  { label: 'Buy', href: '/properties?type=sale', icon: Home, active: true },
  { label: 'Rent', href: '/properties?type=rent', icon: Building2 },
  { label: 'Sold', href: '/properties?status=sold&type=sale', icon: Banknote },
  { label: 'Agents', href: '/agents', icon: UserRound },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 h-14 bg-navy-900 border-b border-navy-800">
      <div className="max-w-7xl mx-auto h-full px-4 flex items-center justify-between">
        <Link href="/" className="flex items-center shrink-0">
          <img src="/assets/logo.png" alt="ieProp" className="h-10 w-auto" />
        </Link>

        <div className="hidden md:flex items-center gap-1">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.label}
                href={item.href}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                  item.active
                    ? 'text-brand-400 bg-navy-800'
                    : 'text-gray-400 hover:text-white hover:bg-navy-800'
                }`}
              >
                <Icon className="w-4 h-4" />
                {item.label}
              </Link>
            );
          })}
        </div>

        <div className="hidden md:flex items-center gap-4">
          <Link href="/calculators" className="text-sm font-medium text-gray-400 hover:text-white transition-colors">
            <Calculator className="w-4 h-4 inline mr-1" />
            Calculators
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium text-white bg-brand-500 hover:bg-brand-600 transition-colors"
          >
            <Phone className="w-4 h-4" />
            Contact
          </Link>
        </div>

        <button
          className="md:hidden p-2 rounded-md text-gray-400 hover:text-white hover:bg-navy-800"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {mobileOpen && (
        <div className="md:hidden bg-navy-800 border-t border-navy-700 px-4 py-3 space-y-1">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium ${
                  item.active
                    ? 'text-brand-400 bg-navy-700'
                    : 'text-gray-400 hover:text-white hover:bg-navy-700'
                }`}
              >
                <Icon className="w-4 h-4" />
                {item.label}
              </Link>
            );
          })}
          <Link
            href="/calculators"
            onClick={() => setMobileOpen(false)}
            className="flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium text-gray-400 hover:text-white hover:bg-navy-700"
          >
            <Calculator className="w-4 h-4" />
            Calculators
          </Link>
          <Link
            href="/contact"
            onClick={() => setMobileOpen(false)}
            className="flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium text-white bg-brand-500 hover:bg-brand-600"
          >
            <Phone className="w-4 h-4" />
            Contact
          </Link>
        </div>
      )}
    </nav>
  );
}
