// Template Detail page component
'use client';

import React from 'react';
import { ExtractionTemplate } from '../../lib/types/template';

const TemplateDetailPage = ({ params }: { params: { id: string } }) => {
  const [template, setTemplate] = React.useState<ExtractionTemplate | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    // Mock data - in real implementation this would connect to API
    const fetchTemplate = () => {
      try {
        setLoading(false);
        setTemplate({
          id: 1,
          name: "Ship Template",
          description: "Template for extracting ship information from RSI wikis",
          sourceId: 1,
          entityTypeId: 1,
          sourceDomain: "wiki.robertsspaceindustries.com",
          status: "approved",
          isActive: true,
          currentVersionId: 2,
          createdAt: "2023-01-15T10:00:00Z",
          updatedAt: "2023-01-15T10:00:00Z",
          templateVersions: [
            {
              id: 1,
              templateId: 1,
              versionNumber: 1,
              changeSummary: "Initial version",
              selectorStrategy: "css-selectors",
              configuration: {},
              createdAt: "2023-01-15T10:00:00Z"
            },
            {
              id: 2,
              templateId: 1,
              versionNumber: 2,
              changeSummary: "Fixed some selectors for better accuracy",
              selectorStrategy: "css-selectors",
              configuration: {},
              createdAt: "2023-01-20T14:30:00Z"
            }
          ],
          templateTests: [
            {
              id: 1,
              templateVersionId: 2,
              testUrl: "https://wiki.robertsspaceindustries.com/ship/typex",
              status: "completed",
              result: {},
              executedAt: "2023-01-20T14:30:00Z"
            }
          ],
          templateStatistics: {
            id: 1,
            templateId: 1,
            successfulExtractions: 42,
            failedExtractions: 2,
            successRate: 95.45,
            confidenceScore: 0.92,
            lastExecutionAt: "2023-01-20T14:30:00Z"
          },
          entityType: {
            id: 1,
            name: "ship",
            displayName: "Ship",
            description: "A spacecraft vessel",
            icon: "🚢",
            isSystem: true,
            isActive: true,
            createdAt: "2023-01-10T09:00:00Z",
            updatedAt: "2023-01-10T09:00:00Z"
          }
        } as ExtractionTemplate);
      } catch (err) {
        setError('Failed to fetch template');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchTemplate();
  }, [params.id]);

  if (loading) return <div className="p-6">Loading template...</div>;
  if (error) return <div className="p-6 text-red-500">{error}</div>;
  if (!template) return <div className="p-6">Template not found</div>;

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">{template.name}</h1>
        <div className="flex space-x-2">
          <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">
            Edit Template
          </button>
          <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded">
            New Version
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-3">Template Information</h2>
          <div className="space-y-2">
            <p><span className="font-medium">Domain:</span> {template.sourceDomain}</p>
            <p><span className="font-medium">Entity Type:</span> {template.entityType?.displayName || 'Unknown'}</p>
            <p><span className="font-medium">Status:</span> 
              <span className={`ml-2 px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${template.status === 'approved' ? 'bg-green-100 text-green-800' : template.status === 'testing' ? 'bg-yellow-100 text-yellow-800' : 'bg-gray-100 text-gray-800'}`}>
                {template.status}
              </span>
            </p>
            <p><span className="font-medium">Created:</span> {new Date(template.createdAt).toLocaleDateString()}</p>
            <p><span className="font-medium">Updated:</span> {new Date(template.updatedAt).toLocaleDateString()}</p>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-3">Statistics</h2>
          <div className="space-y-2">
            <p><span className="font-medium">Success Rate:</span> {template.templateStatistics?.successRate ? template.templateStatistics.successRate.toFixed(2) : '0.00'}%</p>
            <p><span className="font-medium">Confidence:</span> {template.templateStatistics?.confidenceScore ? (template.templateStatistics.confidenceScore * 100).toFixed(0) : '0'}%</p>
            <p><span className="font-medium">Successful Extractions:</span> {template.templateStatistics?.successfulExtractions || 0}</p>
            <p><span className="font-medium">Failed Extractions:</span> {template.templateStatistics?.failedExtractions || 0}</p>
            <p><span className="font-medium">Last Execution:</span> {template.templateStatistics?.lastExecutionAt ? new Date(template.templateStatistics.lastExecutionAt).toLocaleDateString() : 'Never'}</p>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-3">Recent Tests</h2>
          <ul className="space-y-2">
            {template.templateTests?.slice(0, 3).map((test) => (
              <li key={test.id} className="text-sm">
                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${test.status === 'completed' ? 'bg-green-100 text-green-800' : test.status === 'failed' ? 'bg-red-100 text-red-800' : 'bg-gray-100 text-gray-800'}`}>
                  {test.status}
                </span>
                <span className="ml-2">{new Date(test.executedAt || '').toLocaleString()}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-3">Template Versions</h2>
          <div className="space-y-4">
            {template.templateVersions?.map((version) => (
              <div key={version.id} className="border border-gray-200 dark:border-gray-700 rounded p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium">Version {version.versionNumber}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{version.changeSummary}</p>
                  </div>
                  <button className="text-blue-600 hover:text-blue-900 text-sm">View Details</button>
                </div>
                <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                  Created: {new Date(version.createdAt).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-3">Template Fields</h2>
          <div className="space-y-3">
            {/* Placeholder for field mappings */}
            <div className="p-3 border border-gray-200 dark:border-gray-700 rounded">
              <div className="flex justify-between">
                <span className="font-medium">Name</span>
                <span className="text-sm text-gray-500 dark:text-gray-400">CSS selector: .ship-name</span>
              </div>
            </div>
            <div className="p-3 border border-gray-200 dark:border-gray-700 rounded">
              <div className="flex justify-between">
                <span className="font-medium">Manufacturer</span>
                <span className="text-sm text-gray-500 dark:text-gray-400">CSS selector: .ship-manufacturer</span>
              </div>
            </div>
            <div className="p-3 border border-gray-200 dark:border-gray-700 rounded">
              <div className="flex justify-between">
                <span className="font-medium">Cargo Capacity</span>
                <span className="text-sm text-gray-500 dark:text-gray-400">CSS selector: .ship-cargo</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TemplateDetailPage;