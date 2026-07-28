'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, ChevronDown } from 'lucide-react';

const NAV_ITEMS = [
  { label: 'About', href: '/about' },
  { label: 'Properties', href: '/properties' },
  { label: 'Developments', href: '/developments' },
  {
    label: 'International & Golden Visa',
    href: '#',
    dropdown: [
      { label: 'International', href: '/international' },
      { label: 'Golden Visa', href: '/golden-visa' },
    ],
  },
  { label: 'Our Team', href: '/people' },
  { label: 'Contact', href: '/contact' },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <nav className="sticky top-0 z-50 h-14 bg-navy-900 border-b border-navy-800">
      <div className="max-w-7xl mx-auto h-full px-4 flex items-center justify-between">
        <Link href="/" className="flex items-center shrink-0">
          <img src="/assets/logo.png" alt="ieProp" className="h-14 w-auto -my-1" />
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-0.5">
          {NAV_ITEMS.map((item) => {
            if (item.dropdown) {
              return (
                <div key={item.label} className="relative" ref={dropdownRef}>
                  <button
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    className={`flex items-center gap-1 px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                      dropdownOpen
                        ? 'text-brand-400 bg-navy-800'
                        : 'text-gray-400 hover:text-white hover:bg-navy-800'
                    }`}
                  >
                    {item.label}
                    <ChevronDown className={`w-3.5 h-3.5 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} />
                  </button>
                  {dropdownOpen && (
                    <div className="absolute top-full left-0 mt-1 w-48 bg-navy-800 border border-navy-700 rounded-lg shadow-lg py-1 z-50">
                      {item.dropdown.map((sub) => (
                        <Link
                          key={sub.label}
                          href={sub.href}
                          onClick={() => setDropdownOpen(false)}
                          className="block px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-navy-700 transition-colors"
                        >
                          {sub.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            }
            return (
              <Link
                key={item.label}
                href={item.href}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium text-gray-400 hover:text-white hover:bg-navy-800 transition-colors"
              >
                {item.label}
              </Link>
            );
          })}
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden p-2 rounded-md text-gray-400 hover:text-white hover:bg-navy-800"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Nav */}
      {mobileOpen && (
        <div className="md:hidden bg-navy-800 border-t border-navy-700 px-4 py-3 space-y-0.5">
          {NAV_ITEMS.map((item) => {
            if (item.dropdown) {
              return (
                <div key={item.label}>
                  <div className="px-3 py-2 text-sm font-medium text-gray-500 uppercase tracking-wider">
                    {item.label}
                  </div>
                  {item.dropdown.map((sub) => (
                    <Link
                      key={sub.label}
                      href={sub.href}
                      onClick={() => setMobileOpen(false)}
                      className="flex items-center gap-2 px-5 py-2 rounded-md text-sm font-medium text-gray-400 hover:text-white hover:bg-navy-700"
                    >
                      {sub.label}
                    </Link>
                  ))}
                </div>
              );
            }
            return (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium text-gray-400 hover:text-white hover:bg-navy-700"
              >
                {item.label}
              </Link>
            );
          })}
        </div>
      )}
    </nav>
  );
}
