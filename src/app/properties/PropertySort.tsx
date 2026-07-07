"use client";

import { useRouter } from "next/navigation";

const SORT_OPTIONS = [
  { label: "Newest", value: "newest" },
  { label: "Price: Low to High", value: "price-asc" },
  { label: "Price: High to Low", value: "price-desc" },
];

interface PropertySortProps {
  currentSort: string;
  baseParams: { [key: string]: string | undefined };
}

export default function PropertySort({ currentSort, baseParams }: PropertySortProps) {
  const router = useRouter();

  const handleSort = (sort: string) => {
    const params = new URLSearchParams();
    Object.entries(baseParams).forEach(([key, val]) => {
      if (val && key !== "sort" && key !== "page") {
        params.set(key, val);
      }
    });
    if (sort !== "newest") {
      params.set("sort", sort);
    }
    router.push(`/properties?${params.toString()}`);
  };

  return (
    <select
      value={currentSort}
      onChange={(e) => handleSort(e.target.value)}
      className="rounded-lg border border-gray-300 px-3 py-2 text-sm bg-white focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none"
    >
      {SORT_OPTIONS.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  );
}
