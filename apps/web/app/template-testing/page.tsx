// Template testing page component
'use client';

import React from 'react';
import { TemplateTest } from '../../lib/types/template';

const TemplateTestingPage = () => {
  const [tests, setTests] = React.useState<TemplateTest[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    // Mock data - in real implementation this would connect to API
    const fetchTests = () => {
      try {
        setLoading(false);
        setTests([
          {
            id: 1,
            templateVersionId: 2,
            testUrl: "https://wiki.robertsspaceindustries.com/ship/typex",
            status: "completed",
            executedAt: "2023-01-20T14:30:00Z",
            result: {
              success: true,
              extractedData: {
                name: "Type X Ship",
                manufacturer: "Tycho Systems"
              },
              executionTime: 1500
            }
          },
          {
            id: 2,
            templateVersionId: 2,
            testUrl: "https://wiki.robertsspaceindustries.com/ship/typex2",
            status: "failed",
            executedAt: "2023-01-21T09:15:00Z",
            result: {
              success: false,
              error: "Could not locate element .ship-name"
            }
          }
        ] as TemplateTest[]);
      } catch (err) {
        setError('Failed to fetch tests');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchTests();
  }, []);

  if (loading) return <div className="p-6">Loading tests...</div>;
  if (error) return <div className="p-6 text-red-500">{error}</div>;

  const runTest = (testId: number) => {
    // In a real application, this would call the API to re-run the test
    console.log(`Running test ${testId}`);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Template Testing</h1>
        <button 
          onClick={() => console.log('Create new test')}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
        >
          New Test
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-3">Test Results</h2>
          <div className="space-y-4">
            {tests.map((test) => (
              <div key={test.id} className="border border-gray-200 dark:border-gray-700 rounded p-4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-medium">{test.testUrl}</h3>
                    {test.result?.success ? (
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        Success
                      </span>
                    ) : (
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                        Failed
                      </span>
                    )}
                  </div>
                  <button 
                    onClick={() => runTest(test.id)}
                    className="text-blue-600 hover:text-blue-900 text-sm"
                  >
                    Re-run
                  </button>
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                  Executed: {new Date(test.executedAt || '').toLocaleString()}
                </p>
                {test.result && test.result.success ? (
                  <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded p-3 mt-2">
                    <h4 className="font-medium mb-1">Extracted Data</h4>
                    <pre className="text-xs overflow-auto max-h-32">
                      {JSON.stringify(test.result.extractedData, null, 2)}
                    </pre>
                  </div>
                ) : test.result && !test.result.success ? (
                  <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded p-3 mt-2">
                    <h4 className="font-medium mb-1">Error</h4>
                    <p className="text-sm">{test.result.error}</p>
                  </div>
                ) : null}
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-3">Test Details</h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-medium mb-2">Template Information</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                <span className="font-medium">Name:</span> Ship Template<br/>
                <span className="font-medium">Version:</span> 1.0<br/>
                <span className="font-medium">Status:</span> Approved
              </p>
            </div>

            <div>
              <h3 className="font-medium mb-2">Test Configuration</h3>
              <div className="text-sm space-y-2">
                <p><span className="font-medium">Maximum Execution Time:</span> 5 seconds</p>
                <p><span className="font-medium">Retry Attempts:</span> 3</p>
                <p><span className="font-medium">Timeout:</span> 10 seconds</p>
              </div>
            </div>

            <div>
              <h3 className="font-medium mb-2">Actions</h3>
              <button className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded mb-2">
                Run All Tests
              </button>
              <button className="w-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-white py-2 px-4 rounded">
                Configure Tests
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TemplateTestingPage;