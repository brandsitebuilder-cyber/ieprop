import { Suspense } from "react";
import type { Metadata } from "next";
import { supabase } from "@/lib/supabase";
import type { Property } from "@/lib/supabase";
import PropertyCard from "@/components/PropertyCard";
import PropertyFilters from "./PropertyFilters";
import PropertySort from "./PropertySort";
import PropertyPagination from "./PropertyPagination";

export const metadata: Metadata = {
  title: "Properties | ieProp",
  description:
    "Browse our full portfolio of properties for sale and to rent across South Africa.",
};

interface SearchParams {
  [key: string]: string | undefined;
  type?: string;
  minPrice?: string;
  maxPrice?: string;
  bedrooms?: string;
  bathrooms?: string;
  location?: string;
  status?: string;
  sort?: string;
  page?: string;
}

const PAGE_SIZE = 12;

async function getProperties(searchParams: SearchParams) {
  let query = supabase
    .from("ieprop_properties")
    .select("*, images:ieprop_property_images(*)", { count: "exact" })
    .eq("status", searchParams.status || "active");

  // Filters
  if (searchParams.type && ["sale", "rent"].includes(searchParams.type)) {
    query = query.eq("type", searchParams.type);
  }
  if (searchParams.minPrice) {
    query = query.gte("price", Number(searchParams.minPrice));
  }
  if (searchParams.maxPrice) {
    query = query.lte("price", Number(searchParams.maxPrice));
  }
  if (searchParams.bedrooms) {
    query = query.gte("bedrooms", Number(searchParams.bedrooms));
  }
  if (searchParams.bathrooms) {
    query = query.gte("bathrooms", Number(searchParams.bathrooms));
  }
  if (searchParams.location) {
    query = query.ilike("location", `%${searchParams.location}%`);
  }

  // Sorting
  const sort = searchParams.sort ?? "newest";
  switch (sort) {
    case "price-asc":
      query = query.order("price", { ascending: true });
      break;
    case "price-desc":
      query = query.order("price", { ascending: false });
      break;
    case "newest":
    default:
      query = query.order("created_at", { ascending: false });
      break;
  }

  // Pagination
  const page = Math.max(1, Number(searchParams.page) || 1);
  const from = (page - 1) * PAGE_SIZE;
  const to = from + PAGE_SIZE - 1;
  query = query.range(from, to);

  const { data, count, error } = await query;
  if (error) {
    console.error("Failed to fetch properties:", error.message);
    return { properties: [] as Property[], total: 0, page };
  }

  // Ensure images are sorted
  const properties = (data as Property[]).map((p) => ({
    ...p,
    images: (p.images ?? []).sort((a, b) => a.sort_order - b.sort_order),
  }));

  return { properties, total: count ?? 0, page };
}

export default async function PropertiesPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const params = await searchParams;
  const { properties, total, page } = await getProperties(params);
  const totalPages = Math.ceil(total / PAGE_SIZE);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          Properties {params.type === "rent" ? "To Rent" : "For Sale"}
        </h1>
        <p className="mt-2 text-gray-600">
          {total > 0
            ? `Showing ${Math.min(PAGE_SIZE, total - (page - 1) * PAGE_SIZE)} of ${total} properties`
            : "No properties match your search"}
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Filter sidebar */}
        <aside className="w-full lg:w-64 shrink-0">
          <Suspense
            fallback={
              <div className="bg-white rounded-xl border border-gray-200 p-5 animate-pulse">
                <div className="h-4 bg-gray-200 rounded w-20 mb-4" />
                <div className="space-y-3">
                  <div className="h-10 bg-gray-100 rounded" />
                  <div className="h-10 bg-gray-100 rounded" />
                  <div className="h-10 bg-gray-100 rounded" />
                </div>
              </div>
            }
          >
            <PropertyFilters currentParams={params} />
          </Suspense>
        </aside>

        {/* Results */}
        <div className="flex-1 min-w-0">
          {/* Sort bar */}
          <div className="flex items-center justify-between mb-6">
            <p className="text-sm text-gray-500">
              {total} {total === 1 ? "property" : "properties"} found
            </p>
            <PropertySort currentSort={params.sort ?? "newest"} baseParams={params} />
          </div>

          {/* Results grid */}
          {properties.length > 0 ? (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
                {properties.map((property) => (
                  <PropertyCard key={property.id} property={property} />
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="mt-10">
                  <PropertyPagination
                    currentPage={page}
                    totalPages={totalPages}
                    baseParams={params}
                  />
                </div>
              )}
            </>
          ) : (
            /* Empty state */
            <div className="text-center py-20">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gray-100 mb-6">
                <svg
                  className="w-10 h-10 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                No properties match your search
              </h3>
              <p className="text-gray-500 max-w-md mx-auto">
                Try adjusting your filters or removing some criteria to see more
                results.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
