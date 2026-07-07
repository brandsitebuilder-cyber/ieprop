'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Home, Building2, Banknote, UserRound, Calculator, Menu, X, Phone } from 'lucide-react';

const NAV_ITEMS = [
  { label: 'Buy', href: '/buy', icon: Home, active: true },
  { label: 'Rent', href: '/rent', icon: Building2 },
  { label: 'Sold', href: '/sold', icon: Banknote },
  { label: 'Agents', href: '/agents', icon: UserRound },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 h-14 bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto h-full px-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <Image
            src="/assets/icon-blue.png"
            alt="ieProp"
            width={28}
            height={28}
            className="w-7 h-7"
          />
          <span className="text-lg font-bold text-gray-900">ieProp</span>
        </Link>

        {/* Desktop nav tabs */}
        <div className="hidden md:flex items-center gap-1">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.label}
                href={item.href}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                  item.active
                    ? 'text-brand-700 bg-brand-50'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                <Icon className="w-4 h-4" />
                {item.label}
              </Link>
            );
          })}
        </div>

        {/* Desktop right */}
        <div className="hidden md:flex items-center gap-4">
          <Link
            href="/calculators"
            className="text-sm font-medium text-gray-600 hover:text-brand-700 transition-colors"
          >
            <Calculator className="w-4 h-4 inline mr-1" />
            Calculators
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium text-white bg-brand-700 hover:bg-brand-800 transition-colors"
          >
            <Phone className="w-4 h-4" />
            Contact
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden p-2 rounded-md text-gray-600 hover:bg-gray-100"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 px-4 py-3 space-y-1">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium ${
                  item.active
                    ? 'text-brand-700 bg-brand-50'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
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
            className="flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100"
          >
            <Calculator className="w-4 h-4" />
            Calculators
          </Link>
          <Link
            href="/contact"
            onClick={() => setMobileOpen(false)}
            className="flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium text-white bg-brand-700 hover:bg-brand-800"
          >
            <Phone className="w-4 h-4" />
            Contact
          </Link>
        </div>
      )}
    </nav>
  );
}
