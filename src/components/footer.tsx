import Link from 'next/link';
import Image from 'next/image';

const FOOTER_LINKS = [
  { label: 'Buy', href: '/buy' },
  { label: 'Rent', href: '/rent' },
  { label: 'Agents', href: '/agents' },
  { label: 'Calculators', href: '/calculators' },
  { label: 'Contact', href: '/contact' },
];

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400">
      <div className="max-w-7xl mx-auto px-4 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Logo + name */}
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/assets/logo-white.png"
            alt="ieProp"
            width={24}
            height={24}
            className="w-6 h-6"
          />
          <span className="text-sm font-semibold text-gray-300">ieProp</span>
        </Link>

        {/* Nav links */}
        <div className="flex flex-wrap items-center justify-center gap-4 text-sm">
          {FOOTER_LINKS.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="hover:text-white transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Copyright */}
        <div className="text-xs text-gray-500 text-center sm:text-right">
          © 2026. Built by{' '}
          <a
            href="https://brandaisolutions.co.za"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-300 transition-colors underline underline-offset-2"
          >
            Brand AI Solutions
          </a>
        </div>
      </div>
    </footer>
  );
}
