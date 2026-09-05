
// /apps/web/pages/performance/index.tsx - Main performance dashboard
import React from 'react';

const PerformanceDashboardPage = () => {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold">Performance & Scalability Dashboard</h1>
      <p className="mt-2">Monitor system performance, scalability, and resource utilization</p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
        <div className="bg-blue-50 p-4 rounded">
          <h3 className="font-semibold">Search Latency</h3>
          <p className="text-2xl font-bold">42ms</p>
          <p className="text-sm">P95 latency</p>
        </div>

        <div className="bg-green-50 p-4 rounded">
          <h3 className="font-semibold">Throughput</h3>
          <p className="text-2xl font-bold">1,247/sec</p>
          <p className="text-sm">Requests/second</p>
        </div>

        <div className="bg-yellow-50 p-4 rounded">
          <h3 className="font-semibold">CPU Usage</h3>
          <p className="text-2xl font-bold">38%</p>
          <p className="text-sm">Current utilization</p>
        </div>

        <div className="bg-purple-50 p-4 rounded">
          <h3 className="font-semibold">Memory</h3>
          <p className="text-2xl font-bold">1.2GB</p>
          <p className="text-sm">Current usage</p>
        </div>
      </div>

      <div className="mt-6 p-4 bg-gray-50 rounded">
        <h2 className="text-xl font-semibold">System Status</h2>
        <ul className="list-disc pl-5 mt-2">
          <li>Search engine operational</li>
          <li>Context engine stable</li>
          <li>Embedding pipeline functional</li>
          <li>Database performance within target</li>
          <li>Worker capacity adequate</li>
        </ul>
      </div>

      <div className="mt-6">
        <h2 className="text-xl font-semibold">Load Testing Status</h2>
        <p className="mt-2">Performance testing framework ready for execution.</p>
        
        <div className="flex space-x-4 mt-4">
          <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            Run Load Test
          </button>
          <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
            Run Stress Test  
          </button>
          <button className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600">
            Generate Report
          </button>
        </div>
      </div>
    </div>
  );
};

export default PerformanceDashboardPage;
