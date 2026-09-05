
// /apps/web/pages/operations/index.tsx - Main operations dashboard
import React from 'react';

const OperationsDashboardPage = () => {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold">Operations & Deployment Dashboard</h1>
      <p className="mt-2">Manage system deployments, services and infrastructure</p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
        <div className="bg-blue-50 p-4 rounded">
          <h3 className="font-semibold">Environment Status</h3>
          <p className="text-2xl font-bold">Production</p>
          <p className="text-sm">Active</p>
        </div>

        <div className="bg-green-50 p-4 rounded">
          <h3 className="font-semibold">Services Healthy</h3>
          <p className="text-2xl font-bold">4/4</p>
          <p className="text-sm">All services running</p>
        </div>

        <div className="bg-yellow-50 p-4 rounded">
          <h3 className="font-semibold">Deployments</h3>
          <p className="text-2xl font-bold">12</p>
          <p className="text-sm">Completed today</p>
        </div>

        <div className="bg-purple-50 p-4 rounded">
          <h3 className="font-semibold">Last Release</h3>
          <p className="text-2xl font-bold">v1.2.0</p>
          <p className="text-sm">Deployed 2 hours ago</p>
        </div>
      </div>

      <div className="mt-6 p-4 bg-gray-50 rounded">
        <h2 className="text-xl font-semibold">System Status</h2>
        <ul className="list-disc pl-5 mt-2">
          <li>API Service: Running</li>
          <li>Web Application: Running</li>
          <li>Worker Processes: Running</li>
          <li>Database: Connected</li>
          <li>Search Engine: Operational</li>
        </ul>
      </div>

      <div className="mt-6">
        <h2 className="text-xl font-semibold">Operations Actions</h2>
        <p className="mt-2">Manage system deployment and operations.</p>
        
        <div className="flex space-x-4 mt-4">
          <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            Deploy New Version
          </button>
          <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
            View Logs  
          </button>
          <button className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600">
            Health Check
          </button>
        </div>
      </div>
    </div>
  );
};

export default OperationsDashboardPage;
