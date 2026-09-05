'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

const DiscoveryDashboard = () => {
  const [jobs, setJobs] = useState([]);
  const [candidates, setCandidates] = useState([]);
  const [statistics, setStatistics] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock data - in real app this would be API calls
    const fetchData = () => {
      setJobs([
        {
          id: 1,
          sourceId: 1,
          templateId: 2,
          status: 'Completed',
          startedAt: '2023-01-15T10:30:00Z',
          completedAt: '2023-01-15T11:45:00Z',
          duration: '1h 15m'
        },
        {
          id: 2,
          sourceId: 1,
          templateId: 2,
          status: 'Running',
          startedAt: '2023-01-16T09:15:00Z',
          completedAt: null,
          duration: '30m'
        }
      ]);
      
      setCandidates([
        {
          id: 1,
          candidateUrl: 'https://wiki.example.com/ships/prospector',
          confidenceScore: 0.95,
          status: 'Discovered',
          templateId: 2
        },
        {
          id: 2,
          candidateUrl: 'https://wiki.example.com/ships/mole',
          confidenceScore: 0.87,
          status: 'Approved',
          templateId: 2
        }
      ]);
      
      setStatistics({
        pagesScanned: 156,
        linksDiscovered: 2342,
        candidatesGenerated: 124,
        candidatesApproved: 89,
        candidatesRejected: 12,
        averageConfidence: 0.78
      });
      
      setLoading(false);
    };

    fetchData();
  }, []);

  if (loading) {
    return <div className="p-6">Loading dashboard...</div>;
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed': return 'bg-green-100 text-green-800';
      case 'Running': return 'bg-blue-100 text-blue-800';
      case 'Failed': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCandidateStatusColor = (status: string) => {
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
        <h1 className="text-3xl font-bold">Discovery Engine</h1>
        <Link href="/discovery/jobs/new" className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">
          New Discovery Job
        </Link>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Pages Scanned</h3>
          <p className="text-2xl font-bold">{statistics?.pagesScanned}</p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Links Discovered</h3>
          <p className="text-2xl font-bold">{statistics?.linksDiscovered}</p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Candidates</h3>
          <p className="text-2xl font-bold">{statistics?.candidatesGenerated}</p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Approved</h3>
          <p className="text-2xl font-bold">{statistics?.candidatesApproved}</p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Rejected</h3>
          <p className="text-2xl font-bold">{statistics?.candidatesRejected}</p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Avg. Confidence</h3>
          <p className="text-2xl font-bold">{statistics?.averageConfidence}</p>
        </div>
      </div>

      {/* Recent Jobs */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow mb-8">
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-semibold">Recent Discovery Jobs</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Job ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Source</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Template</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Duration</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {jobs.map((job) => (
                <tr key={job.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">{job.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">Source {job.sourceId}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">Template {job.templateId}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(job.status)}`}>
                      {job.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">{job.duration}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <Link href={`/discovery/jobs/${job.id}`} className="text-blue-600 hover:text-blue-900">View</Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Recent Candidates */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-semibold">Recent Discovery Candidates</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">URL</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Confidence</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Template</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {candidates.map((candidate) => (
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
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getCandidateStatusColor(candidate.status)}`}>
                      {candidate.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">Template {candidate.templateId}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <Link href={`/discovery/candidates/${candidate.id}`} className="text-blue-600 hover:text-blue-900 mr-3">Review</Link>
                    <button className="text-green-600 hover:text-green-900">Approve</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DiscoveryDashboard;