"use client";

import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PropertyPaginationProps {
  currentPage: number;
  totalPages: number;
  baseParams: { [key: string]: string | undefined };
}

function buildUrl(page: number, baseParams: { [key: string]: string | undefined }) {
  const params = new URLSearchParams();
  Object.entries(baseParams).forEach(([key, val]) => {
    if (val && key !== "page") {
      params.set(key, val);
    }
  });
  if (page > 1) {
    params.set("page", String(page));
  }
  const qs = params.toString();
  return `/properties${qs ? `?${qs}` : ""}`;
}

export default function PropertyPagination({
  currentPage,
  totalPages,
  baseParams,
}: PropertyPaginationProps) {
  const pages: (number | "...")[] = [];
  for (let i = 1; i <= totalPages; i++) {
    if (i === 1 || i === totalPages || (i >= currentPage - 1 && i <= currentPage + 1)) {
      pages.push(i);
    } else if (pages[pages.length - 1] !== "...") {
      pages.push("...");
    }
  }

  return (
    <nav className="flex items-center justify-center gap-1">
      {currentPage > 1 && (
        <Link
          href={buildUrl(currentPage - 1, baseParams)}
          className="inline-flex items-center justify-center w-10 h-10 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-50 transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
        </Link>
      )}

      {pages.map((p, i) =>
        p === "..." ? (
          <span key={`dots-${i}`} className="w-10 h-10 flex items-center justify-center text-gray-400 text-sm">
            ...
          </span>
        ) : (
          <Link
            key={p}
            href={buildUrl(p, baseParams)}
            className={`inline-flex items-center justify-center w-10 h-10 rounded-lg text-sm font-medium transition-colors ${
              p === currentPage
                ? "bg-brand-600 text-white"
                : "border border-gray-300 text-gray-600 hover:bg-gray-50"
            }`}
          >
            {p}
          </Link>
        )
      )}

      {currentPage < totalPages && (
        <Link
          href={buildUrl(currentPage + 1, baseParams)}
          className="inline-flex items-center justify-center w-10 h-10 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-50 transition-colors"
        >
          <ChevronRight className="w-4 h-4" />
        </Link>
      )}
    </nav>
  );
}
