'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const DiscoveryJobsPage = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

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
          status: 'Processing',
          startedAt: '2023-01-16T09:15:00Z',
          completedAt: null,
          duration: '30m'
        },
        {
          id: 3,
          sourceId: 1,
          templateId: 2,
          status: 'Failed',
          startedAt: '2023-01-14T14:20:00Z',
          completedAt: '2023-01-14T14:25:00Z',
          duration: '5m'
        }
      ]);
      
      setLoading(false);
    };

    fetchData();
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed': return 'bg-green-100 text-green-800';
      case 'Processing': return 'bg-blue-100 text-blue-800';
      case 'Failed': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleDeleteJob = (id: number) => {
    // Mock delete - in real app this would call API
    setJobs(jobs.filter(job => job.id !== id));
  };

  if (loading) {
    return <div className="p-6">Loading discovery jobs...</div>;
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Discovery Jobs</h1>
        <Link href="/discovery/jobs/new" className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">
          New Discovery Job
        </Link>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-700">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Job ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Source</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Template</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Started</th>
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
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  {new Date(job.startedAt).toLocaleString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">{job.duration}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <div className="flex space-x-2">
                    <Link href={`/discovery/jobs/${job.id}`} className="text-blue-600 hover:text-blue-900">View</Link>
                    <button 
                      onClick={() => handleDeleteJob(job.id)} 
                      className="text-red-600 hover:text-red-900"
                    >
                      Delete
                    </button>
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

export default DiscoveryJobsPage;