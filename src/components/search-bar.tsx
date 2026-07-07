'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search } from 'lucide-react';

export default function SearchBar() {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [type, setType] = useState('');
  const [price, setPrice] = useState('');
  const [beds, setBeds] = useState('');

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (type) params.set('type', type);
    if (beds) params.set('bedrooms', beds);
    if (query) params.set('location', query);
    
    // Parse price range
    if (price) {
      if (price.endsWith('+')) {
        params.set('minPrice', price.replace('+', ''));
      } else {
        const [min, max] = price.split('-');
        if (min) params.set('minPrice', min);
        if (max) params.set('maxPrice', max);
      }
    }
    
    router.push(`/properties?${params.toString()}`);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSearch();
  };

  return (
    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
      <div className="flex-1 relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input
          type="text"
          placeholder="Search by suburb, city, or street..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          className="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent"
        />
      </div>

      <select
        value={type}
        onChange={(e) => setType(e.target.value)}
        className="px-3 py-2.5 border border-gray-200 rounded-lg text-sm bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-brand-500 w-full sm:w-auto"
      >
        <option value="">All types</option>
        <option value="sale">For Sale</option>
        <option value="rent">To Rent</option>
      </select>

      <select
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        className="px-3 py-2.5 border border-gray-200 rounded-lg text-sm bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-brand-500 w-full sm:w-auto"
      >
        <option value="">Any price</option>
        <option value="0-500000">R 0 – R 500k</option>
        <option value="500000-1000000">R 500k – R 1m</option>
        <option value="1000000-3000000">R 1m – R 3m</option>
        <option value="3000000-5000000">R 3m – R 5m</option>
        <option value="5000000+">R 5m+</option>
      </select>

      <select
        value={beds}
        onChange={(e) => setBeds(e.target.value)}
        className="px-3 py-2.5 border border-gray-200 rounded-lg text-sm bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-brand-500 w-full sm:w-auto"
      >
        <option value="">Beds: Any</option>
        <option value="1">1+</option>
        <option value="2">2+</option>
        <option value="3">3+</option>
        <option value="4">4+</option>
        <option value="5">5+</option>
      </select>

      <button 
        onClick={handleSearch}
        className="px-6 py-2.5 rounded-lg text-sm font-medium text-white bg-brand-600 hover:bg-brand-700 transition-colors whitespace-nowrap w-full sm:w-auto"
      >
        Find properties
      </button>
    </div>
  );
}
