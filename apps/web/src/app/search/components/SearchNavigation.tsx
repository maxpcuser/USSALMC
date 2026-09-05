'use client';

import Link from 'next/link';

export function SearchNavigation() {
  return (
    <nav className="bg-white shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex space-x-8">
          <Link href="/search" className="py-4 text-blue-600 border-b-2 border-blue-600 font-medium">
            Dashboard
          </Link>
          <Link href="/search/studio" className="py-4 text-gray-500 hover:text-gray-700 font-medium">
            Studio
          </Link>
          <Link href="/search/saved-searches" className="py-4 text-gray-500 hover:text-gray-700 font-medium">
            Saved Searches
          </Link>
          <Link href="/search/profiles" className="py-4 text-gray-500 hover:text-gray-700 font-medium">
            Profiles
          </Link>
        </div>
      </div>
    </nav>
  );
}