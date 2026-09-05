
// /apps/command-center/pages/search.tsx - Search Page
import React from 'react';

const SearchPage = () => {
  const [query, setQuery] = React.useState('');
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Searching for:', query);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Global Search</h1>
      
      <form onSubmit={handleSearch} className="mt-4 p-4 bg-gray-100 rounded">
        <div className="flex">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Enter your search query..."
            className="flex-grow px-4 py-2 border rounded-l"
          />
          <button 
            type="submit" 
            className="bg-blue-500 text-white px-6 py-2 rounded-r hover:bg-blue-600"
          >
            Search
          </button>
        </div>
      </form>

      <div className="mt-6">
        <h2 className="text-xl font-semibold">Search Results</h2>
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          {[1, 2, 3, 4].map((item) => (
            <div key={item} className="border p-4 rounded">
              <h3 className="font-semibold">Result {item}</h3>
              <p className="text-sm mt-2">
                Search result content for query related to knowledge core system...
              </p>
              <button className="mt-2 text-blue-500 hover:underline">View Details</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
