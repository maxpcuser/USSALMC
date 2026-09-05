'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

const DiscoveryCandidatesPage = () => {
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedStatus, setSelectedStatus] = useState('All');

  useEffect(() => {
    // Mock data - in real app this would be API calls
    const fetchData = () => {
      setCandidates([
        {
          id: 1,
          candidateUrl: 'https://wiki.example.com/ships/prospector',
          confidenceScore: 0.95,
          status: 'Approved',
          templateId: 2,
          discoveredAt: '2023-01-16T09:30:00Z'
        },
        {
          id: 2,
          candidateUrl: 'https://wiki.example.com/ships/mole',
          confidenceScore: 0.87,
          status: 'Discovered',
          templateId: 2,
          discoveredAt: '2023-01-16T09:45:00Z'
        },
        {
          id: 3,
          candidateUrl: 'https://wiki.example.com/ships/orion',
          confidenceScore: 0.92,
          status: 'Rejected',
          templateId: 2,
          discoveredAt: '2023-01-16T10:00:00Z'
        },
        {
          id: 4,
          candidateUrl: 'https://wiki.example.com/ships/reclaimer',
          confidenceScore: 0.78,
          status: 'Discovered',
          templateId: 2,
          discoveredAt: '2023-01-16T10:15:00Z'
        }
      ]);
      
      setLoading(false);
    };

    fetchData();
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Approved': return 'bg-green-100 text-green-800';
      case 'Rejected': return 'bg-red-100 text-red-800';
      case 'Discovered': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredCandidates = selectedStatus === 'All' 
    ? candidates 
    : candidates.filter(candidate => candidate.status === selectedStatus);

  if (loading) {
    return <div className="p-6">Loading discovery candidates...</div>;
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Discovery Candidates</h1>
        <div className="flex space-x-2">
          <select 
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="border rounded px-3 py-2 text-sm"
          >
            <option value="All">All Statuses</option>
            <option value="Discovered">Discovered</option>
            <option value="Approved">Approved</option>
            <option value="Rejected">Rejected</option>
          </select>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-700">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">URL</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Confidence</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Template</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Discovered</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            {filteredCandidates.map((candidate) => (
              <tr key={candidate.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium max-w-xs truncate">{candidate.candidateUrl}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="w-24 bg-gray-200 rounded-full h-2.5 dark:bg-gray-700 mr-2">
                      <div 
                        className="bg-blue-600 h-2.5 rounded-full" 
                        style={{ width: `${candidate.confidenceScore * 100}%` }}
                      ></div>
                    </div>
                    <span>{candidate.confidenceScore.toFixed(2)}</span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(candidate.status)}`}>
                    {candidate.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">Template {candidate.templateId}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  {new Date(candidate.discoveredAt).toLocaleString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <div className="flex space-x-2">
                    <Link href={`/discovery/candidates/${candidate.id}`} className="text-blue-600 hover:text-blue-900">Review</Link>
                    {candidate.status === 'Discovered' && (
                      <>
                        <button className="text-green-600 hover:text-green-900">Approve</button>
                        <button className="text-red-600 hover:text-red-900">Reject</button>
                      </>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DiscoveryCandidatesPage;