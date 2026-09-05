'use client';

import { SearchInputPanel } from './components/SearchInputPanel';
import { ResultsViewer } from './components/ResultsViewer';

export default function SearchDashboard() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Search Dashboard</h1>
        
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <SearchInputPanel />
        </div>
        
        <div>
          <ResultsViewer />
        </div>
      </div>
    </div>
  );
}