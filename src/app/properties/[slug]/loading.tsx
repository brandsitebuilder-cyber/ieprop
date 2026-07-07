export default function Loading() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-pulse">
      {/* Breadcrumb */}
      <div className="h-4 bg-gray-200 rounded w-48 mb-6" />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {/* Image skeleton */}
          <div className="aspect-[16/9] bg-gray-200 rounded-xl" />

          {/* Title & price skeleton */}
          <div className="space-y-2">
            <div className="h-5 bg-gray-200 rounded w-24" />
            <div className="h-8 bg-gray-200 rounded w-3/4" />
            <div className="h-4 bg-gray-200 rounded w-1/3" />
          </div>

          {/* Stats grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-gray-200 rounded-xl p-4 h-24" />
            ))}
          </div>

          {/* Description */}
          <div className="space-y-2">
            <div className="h-6 bg-gray-200 rounded w-32" />
            <div className="h-4 bg-gray-200 rounded w-full" />
            <div className="h-4 bg-gray-200 rounded w-full" />
            <div className="h-4 bg-gray-200 rounded w-2/3" />
          </div>

          {/* Features */}
          <div className="space-y-2">
            <div className="h-6 bg-gray-200 rounded w-24" />
            <div className="grid grid-cols-2 gap-2">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-5 bg-gray-200 rounded" />
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar skeleton */}
        <div className="space-y-6">
          <div className="bg-gray-200 rounded-xl h-80" />
          <div className="bg-gray-200 rounded-xl h-64" />
        </div>
      </div>
    </div>
  );
}
