// Template List page component
'use client';

import React from 'react';
import { ExtractionTemplate } from '../../lib/types/template';

const TemplatesPage = () => {
  const [templates, setTemplates] = React.useState<ExtractionTemplate[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    // Mock data - in real implementation this would connect to API
    const fetchTemplates = () => {
      try {
        setLoading(false);
        setTemplates([
          {
            id: 1,
            name: "Ship Template",
            description: "Template for extracting ship information",
            entityTypeId: 1,
            sourceDomain: "wiki.robertsspaceindustries.com",
            status: "approved",
            isActive: true,
            createdAt: "2023-01-15T10:00:00Z",
            updatedAt: "2023-01-15T10:00:00Z",
            sourceDomain: "wiki.robertsspaceindustries.com",
            templateStatistics: {
              id: 1,
              templateId: 1,
              successfulExtractions: 42,
              failedExtractions: 2,
              successRate: 95.45,
              confidenceScore: 0.92,
              lastExecutionAt: "2023-01-15T10:00:00Z"
            }
          },
          {
            id: 2,
            name: "Weapon Template",
            description: "Template for extracting weapon information",
            entityTypeId: 2,
            sourceDomain: "wiki.robertsspaceindustries.com",
            status: "testing",
            isActive: true,
            createdAt: "2023-01-16T14:30:00Z",
            updatedAt: "2023-01-16T14:30:00Z",
            sourceDomain: "wiki.robertsspaceindustries.com",
            templateStatistics: {
              id: 2,
              templateId: 2,
              successfulExtractions: 18,
              failedExtractions: 1,
              successRate: 94.74,
              confidenceScore: 0.88,
              lastExecutionAt: "2023-01-16T14:30:00Z"
            }
          }
        ] as ExtractionTemplate[]);
      } catch (err) {
        setError('Failed to fetch templates');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchTemplates();
  }, []);

  if (loading) return <div className="p-6">Loading templates...</div>;
  if (error) return <div className="p-6 text-red-500">{error}</div>;

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Templates</h1>
        <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">
          Create Template
        </button>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-700">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Entity Type</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Domain</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Confidence</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Success Rate</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Version</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Created Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            {templates.map((template) => (
              <tr key={template.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900 dark:text-white">{template.name}</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">{template.description}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                  {/* Placeholder for entity type name */}
                  Ship
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                  {template.sourceDomain}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${template.status === 'approved' ? 'bg-green-100 text-green-800' : template.status === 'testing' ? 'bg-yellow-100 text-yellow-800' : 'bg-gray-100 text-gray-800'}`}>
                    {template.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                  {template.templateStatistics?.confidenceScore ? (template.templateStatistics.confidenceScore * 100).toFixed(0) + '%' : 'N/A'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                  {template.templateStatistics?.successRate ? template.templateStatistics.successRate.toFixed(2) + '%' : '0.00%'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                  {/* Placeholder for version */}
                  1.0
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                  {new Date(template.createdAt).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button className="text-blue-600 hover:text-blue-900 mr-3">Edit</button>
                  <button className="text-gray-600 hover:text-gray-900 mr-3">Versions</button>
                  <button className="text-red-600 hover:text-red-900">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TemplatesPage;