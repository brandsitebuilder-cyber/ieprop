import HomeContent from './home-content';
import SearchBar from '@/components/search-bar';

export default function HomePage() {
  return (
    <div className="flex flex-col">
      <section className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <SearchBar />
          <div className="flex items-center justify-between mt-3 text-sm">
            <span className="text-gray-500">Browse our property portfolio</span>
          </div>
        </div>
      </section>
      <HomeContent />
    </div>
  );
}
