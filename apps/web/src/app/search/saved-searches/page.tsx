'use client';

export default function SavedSearches() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Saved Searches</h1>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="mb-4">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">Your Saved Searches</h2>
            <p className="text-gray-600">Manage your saved search queries and results</p>
          </div>
          
          {/* Saved searches list would go here */}
          <div className="space-y-4">
            <div className="border rounded-lg p-4 hover:bg-gray-50">
              <h3 className="font-medium text-gray-900">Recent searches</h3>
              <p className="text-sm text-gray-500">2023-10-17 14:30:45</p>
            </div>
            
            <div className="border rounded-lg p-4 hover:bg-gray-50">
              <h3 className="font-medium text-gray-900">Technology trends analysis</h3>
              <p className="text-sm text-gray-500">2023-10-15 09:15:22</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}