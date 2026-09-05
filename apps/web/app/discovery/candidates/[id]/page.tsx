'use client';

import React, { useState } from 'react';
import Link from 'next/link';

const DiscoveryCandidateDetail = ({ params }: { params: { id: string } }) => {
  const [candidate, setCandidate] = useState({
    id: parseInt(params.id),
    candidateUrl: 'https://wiki.example.com/ships/prospector',
    normalizedUrl: 'https://wiki.example.com/ships/prospector',
    confidenceScore: 0.95,
    status: 'Discovered',
    candidateReason: 'URL pattern matches ship template',
    discoveredAt: '2023-01-16T09:30:00Z',
    pageTitle: 'Prospector Ship',
    metadata: {
      linksFound: 12,
      internalLinks: 8,
      externalLinks: 4
    },
    templateId: 2
  });

  const [newStatus, setNewStatus] = useState(candidate.status);

  const handleApprove = () => {
    // Mock - in real app this would call API
    setCandidate({...candidate, status: 'Approved'});
    setNewStatus('Approved');
  };

  const handleReject = () => {
    // Mock - in real app this would call API
    setCandidate({...candidate, status: 'Rejected'});
    setNewStatus('Rejected');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Approved': return 'bg-green-100 text-green-800';
      case 'Rejected': return 'bg-red-100 text-red-800';
      case 'Discovered': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Discovery Candidate Detail</h1>
        <Link href="/discovery/candidates" className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded">
          Back to Candidates
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Candidate Details</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">URL</label>
              <p className="mt-1 text-sm">{candidate.candidateUrl}</p>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Normalized URL</label>
              <p className="mt-1 text-sm">{candidate.normalizedUrl}</p>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Page Title</label>
              <p className="mt-1 text-sm">{candidate.pageTitle}</p>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Reason</label>
              <p className="mt-1 text-sm">{candidate.candidateReason}</p>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Discovered</label>
              <p className="mt-1 text-sm">{new Date(candidate.discoveredAt).toLocaleString()}</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Actions</h2>
          
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Current Status</label>
            <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(candidate.status)}`}>
              {candidate.status}
            </span>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Confidence Score</label>
            <div className="flex items-center">
              <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700 mr-2">
                <div 
                  className="bg-blue-600 h-2.5 rounded-full" 
                  style={{ width: `${candidate.confidenceScore * 100}%` }}
                ></div>
              </div>
              <span className="text-sm font-medium">{candidate.confidenceScore.toFixed(2)}</span>
            </div>
          </div>

          <div className="flex space-x-3">
            <button 
              onClick={handleApprove}
              className="flex-1 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
            >
              Approve
            </button>
            <button 
              onClick={handleReject}
              className="flex-1 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
            >
              Reject
            </button>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Metadata</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Links Found</p>
            <p className="mt-1 text-lg font-semibold">{candidate.metadata.linksFound}</p>
          </div>
          
          <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Internal Links</p>
            <p className="mt-1 text-lg font-semibold">{candidate.metadata.internalLinks}</p>
          </div>
          
          <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">External Links</p>
            <p className="mt-1 text-lg font-semibold">{candidate.metadata.externalLinks}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DiscoveryCandidateDetail;