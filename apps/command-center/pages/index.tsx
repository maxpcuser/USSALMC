
// /apps/command-center/pages/index.tsx - Dashboard Page
import React from 'react';

const DashboardPage = () => {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold">USSA Command & Control</h1>
      <p className="mt-2">Knowledge Core Dashboard</p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
        <div className="bg-blue-50 p-4 rounded">
          <h3 className="font-semibold">Search Queries</h3>
          <p className="text-2xl font-bold">142</p>
          <p className="text-sm">Today</p>
        </div>

        <div className="bg-green-50 p-4 rounded">
          <h3 className="font-semibold">Active Contexts</h3>
          <p className="text-2xl font-bold">27</p>
          <p className="text-sm">Currently viewing</p>
        </div>

        <div className="bg-yellow-50 p-4 rounded">
          <h3 className="font-semibold">Entities</h3>
          <p className="text-2xl font-bold">89</p>
          <p className="text-sm">Known entities</p>
        </div>

        <div className="bg-purple-50 p-4 rounded">
          <h3 className="font-semibold">Documents</h3>
          <p className="text-2xl font-bold">241</p>
          <p className="text-sm">Total documents</p>
        </div>
      </div>

      <div className="mt-6 p-4 bg-gray-50 rounded">
        <h2 className="text-xl font-semibold">Quick Actions</h2>
        <div className="flex space-x-4 mt-4">
          <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            Global Search
          </button>
          <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
            Context Explorer  
          </button>
          <button className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600">
            Entity Browser
          </button>
        </div>
      </div>

      <div className="mt-6 p-4 bg-gray-50 rounded">
        <h2 className="text-xl font-semibold">System Status</h2>
        <ul className="list-disc pl-5 mt-2">
          <li>API Service: Connected</li>
          <li>Search Engine: Operational</li>
          <li>Context Engine: Active</li>
          <li>Database: Connected</li>
          <li>Authentication: Secure</li>
        </ul>
      </div>

      <div className="mt-6">
        <h2 className="text-xl font-semibold">Recent Activity</h2>
        <div className="mt-4 bg-white p-4 rounded border">
          <p>• New entity added: USSA Mission Control Center</p>
          <p>• Document indexed: Tactical Ops Manual v3.2</p>
          <p>• Context retrieved for: Alpha-4 Project</p>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
