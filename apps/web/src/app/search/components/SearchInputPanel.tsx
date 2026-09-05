'use client';

import { useState } from 'react';

export function SearchInputPanel() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isAdvancedOpen, setIsAdvancedOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle search logic here
    console.log('Searching for:', searchQuery);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">
          Search Query
        </label>
        <input
          type="text"
          id="search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Enter your search query..."
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="source-type" className="block text-sm font-medium text-gray-700 mb-1">
            Source Type
          </label>
          <select
            id="source-type"
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          >
            <option>All Sources</option>
            <option>Documents</option>
            <option>Knowledge Base</option>
            <option>External APIs</option>
          </select>
        </div>
        
        <div>
          <label htmlFor="date-range" className="block text-sm font-medium text-gray-700 mb-1">
            Date Range
          </label>
          <select
            id="date-range"
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          >
            <option>All Time</option>
            <option>Last 7 Days</option>
            <option>Last 30 Days</option>
            <option>Last Year</option>
          </select>
        </div>
      </div>
      
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={() => setIsAdvancedOpen(!isAdvancedOpen)}
          className="text-sm text-blue-600 hover:text-blue-800"
        >
          {isAdvancedOpen ? 'Hide Advanced Options' : 'Show Advanced Options'}
        </button>
        
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Search
        </button>
      </div>
      
      {isAdvancedOpen && (
        <div className="border-t pt-4 space-y-4">
          <div>
            <label htmlFor="filters" className="block text-sm font-medium text-gray-700 mb-1">
              Filters (comma separated)
            </label>
            <input
              type="text"
              id="filters"
              placeholder="e.g., category:technology, author:john"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="min-relevance" className="block text-sm font-medium text-gray-700 mb-1">
                Minimum Relevance
              </label>
              <input
                type="range"
                id="min-relevance"
                min="0"
                max="100"
                defaultValue="70"
                className="w-full"
              />
              <div className="text-xs text-gray-500">70%</div>
            </div>
            
            <div>
              <label htmlFor="max-results" className="block text-sm font-medium text-gray-700 mb-1">
                Max Results
              </label>
              <input
                type="number"
                id="max-results"
                defaultValue="25"
                min="1"
                max="100"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
        </div>
      )}
    </form>
  );
}