
// /apps/web/pages/security/index.tsx - Main security dashboard
import React from 'react';

const SecurityDashboardPage = () => {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold">Security Operations Dashboard</h1>
      <p className="mt-2">Monitor system security, access control and threat detection</p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
        <div className="bg-blue-50 p-4 rounded">
          <h3 className="font-semibold">Active Sessions</h3>
          <p className="text-2xl font-bold">12</p>
          <p className="text-sm">Currently logged in</p>
        </div>

        <div className="bg-green-50 p-4 rounded">
          <h3 className="font-semibold">Security Alerts</h3>
          <p className="text-2xl font-bold">2</p>
          <p className="text-sm">Open incidents</p>
        </div>

        <div className="bg-yellow-50 p-4 rounded">
          <h3 className="font-semibold">Failed Logins</h3>
          <p className="text-2xl font-bold">1</p>
          <p className="text-sm">Today</p>
        </div>

        <div className="bg-purple-50 p-4 rounded">
          <h3 className="font-semibold">Threat Activity</h3>
          <p className="text-2xl font-bold">0</p>
          <p className="text-sm">Active threats</p>
        </div>
      </div>

      <div className="mt-6 p-4 bg-gray-50 rounded">
        <h2 className="text-xl font-semibold">Security Status</h2>
        <ul className="list-disc pl-5 mt-2">
          <li>All systems operational</li>
          <li>Authentication service running</li>
          <li>Session monitoring active</li>
          <li>Security event logging enabled</li>
        </ul>
      </div>

      <div className="mt-6">
        <h2 className="text-xl font-semibold">Security Actions</h2>
        <p className="mt-2">Ready for security management operations.</p>
        
        <div className="flex space-x-4 mt-4">
          <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            Manage Users
          </button>
          <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
            View Alerts  
          </button>
          <button className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600">
            Monitor Events
          </button>
        </div>
      </div>
    </div>
  );
};

export default SecurityDashboardPage;
