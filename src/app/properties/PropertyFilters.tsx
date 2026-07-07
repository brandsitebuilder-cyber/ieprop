"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useRef } from "react";
import { Search } from "lucide-react";

interface PropertyFiltersProps {
  currentParams: { [key: string]: string | undefined };
}

const PRICE_OPTIONS = [
  { label: "Any", value: "" },
  { label: "R500K", value: "500000" },
  { label: "R1M", value: "1000000" },
  { label: "R2M", value: "2000000" },
  { label: "R5M", value: "5000000" },
  { label: "R10M", value: "10000000" },
];

const BED_OPTIONS = ["Any", "1+", "2+", "3+", "4+", "5+"];
const BATH_OPTIONS = ["Any", "1+", "2+", "3+", "4+"];

export default function PropertyFilters({ currentParams }: PropertyFiltersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const locationRef = useRef<HTMLInputElement>(null);

  const updateFilter = useCallback(
    (key: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value) {
        params.set(key, value);
      } else {
        params.delete(key);
      }
      if (key !== "page") params.delete("page");
      router.push(`/properties?${params.toString()}`);
    },
    [router, searchParams]
  );

  const applyLocation = () => {
    const val = locationRef.current?.value || "";
    updateFilter("location", val);
  };

  const clearFilters = useCallback(() => {
    router.push("/properties");
  }, [router]);

  const hasFilters =
    currentParams.type ||
    currentParams.minPrice ||
    currentParams.maxPrice ||
    currentParams.bedrooms ||
    currentParams.bathrooms ||
    currentParams.location;

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5 sticky top-24">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-gray-900">Filters</h3>
        {hasFilters && (
          <button onClick={clearFilters} className="text-xs text-brand-600 hover:text-brand-700 font-medium">
            Clear all
          </button>
        )}
      </div>

      <div className="space-y-5">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Property Type</label>
          <select
            value={currentParams.type ?? ""}
            onChange={(e) => updateFilter("type", e.target.value)}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm bg-white focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none"
          >
            <option value="">All Types</option>
            <option value="sale">For Sale</option>
            <option value="rent">To Rent</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Min Price</label>
          <select
            value={currentParams.minPrice ?? ""}
            onChange={(e) => updateFilter("minPrice", e.target.value)}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm bg-white focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none"
          >
            {PRICE_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Max Price</label>
          <select
            value={currentParams.maxPrice ?? ""}
            onChange={(e) => updateFilter("maxPrice", e.target.value)}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm bg-white focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none"
          >
            {PRICE_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Bedrooms</label>
          <select
            value={currentParams.bedrooms ?? ""}
            onChange={(e) => updateFilter("bedrooms", e.target.value)}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm bg-white focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none"
          >
            {BED_OPTIONS.map((opt, i) => (
              <option key={opt} value={i === 0 ? "" : String(i)}>{opt}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Bathrooms</label>
          <select
            value={currentParams.bathrooms ?? ""}
            onChange={(e) => updateFilter("bathrooms", e.target.value)}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm bg-white focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none"
          >
            {BATH_OPTIONS.map((opt, i) => (
              <option key={opt} value={i === 0 ? "" : String(i)}>{opt}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Location</label>
          <div className="relative">
            <input
              ref={locationRef}
              type="text"
              placeholder="Search location..."
              defaultValue={currentParams.location ?? ""}
              onKeyDown={(e) => { if (e.key === "Enter") applyLocation(); }}
              className="w-full rounded-lg border border-gray-300 pl-3 pr-10 py-2 text-sm bg-white focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none"
            />
            <button
              onClick={applyLocation}
              className="absolute right-1 top-1/2 -translate-y-1/2 p-1.5 text-gray-400 hover:text-brand-600 transition-colors"
            >
              <Search size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
