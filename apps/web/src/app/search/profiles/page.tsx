'use client';

export default function SearchProfiles() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Search Profiles</h1>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">Profile Management</h2>
            <p className="text-gray-600">Configure search preferences and personalization settings</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="border rounded-lg p-4">
              <h3 className="font-medium text-gray-900 mb-2">Search Preferences</h3>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span>Include related results</span>
                  <input type="checkbox" className="rounded" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <span>Show full content</span>
                  <input type="checkbox" className="rounded" />
                </div>
                <div className="flex items-center justify-between">
                  <span>Filter by source type</span>
                  <input type="checkbox" className="rounded" defaultChecked />
                </div>
              </div>
            </div>
            
            <div className="border rounded-lg p-4">
              <h3 className="font-medium text-gray-900 mb-2">Personalization</h3>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span>Save recent searches</span>
                  <input type="checkbox" className="rounded" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <span>Enable search suggestions</span>
                  <input type="checkbox" className="rounded" defaultChecked />
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-6 border rounded-lg p-4">
            <h3 className="font-medium text-gray-900 mb-2">Search History</h3>
            <p className="text-sm text-gray-500">Last 10 searches</p>
            <ul className="mt-2 space-y-1">
              <li className="text-sm">Technology trends analysis</li>
              <li className="text-sm">USSA lore research</li>
              <li className="text-sm">Knowledge extraction patterns</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}