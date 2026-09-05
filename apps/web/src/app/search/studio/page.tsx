'use client';

import { SearchInputPanel } from './components/SearchInputPanel';
import { ResultsViewer } from './components/ResultsViewer';
import { ResultDetailView } from './components/ResultDetailView';

export default function SearchStudio() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Search Studio</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <SearchInputPanel />
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Saved Searches</h2>
              {/* Saved searches list would go here */}
            </div>
          </div>
          
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <ResultsViewer />
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6">
              <ResultDetailView />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}