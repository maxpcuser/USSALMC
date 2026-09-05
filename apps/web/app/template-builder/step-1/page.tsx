// Template Builder step 1 component
'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

const TemplateBuilderStep1 = () => {
  const router = useRouter();
  
  const handleSelectSource = (sourceId: number) => {
    // Navigate to step 2 with source ID
    router.push(`/template-builder/step-2?sourceId=${sourceId}`);
  };

  const handleEnterUrl = (url: string) => {
    // Navigate to step 2 with URL
    router.push(`/template-builder/step-2?url=${encodeURIComponent(url)}`);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Select Source</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div 
          className="border border-gray-300 dark:border-gray-700 rounded-lg p-6 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition"
          onClick={() => handleSelectSource(1)}
        >
          <h2 className="text-xl font-semibold mb-2">Select From Existing Source</h2>
          <p className="text-gray-600 dark:text-gray-400">
            Choose an existing source from your collection. This allows you to use templates with sources that have already been defined.
          </p>
          <div className="mt-4 flex justify-between items-center">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
              Source 1
            </span>
            <button className="text-blue-600 hover:text-blue-800">Select</button>
          </div>
        </div>

        <div 
          className="border border-gray-300 dark:border-gray-700 rounded-lg p-6 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition"
          onClick={() => document.getElementById('url-input')?.focus()}
        >
          <h2 className="text-xl font-semibold mb-2">Enter Sample URL</h2>
          <p className="text-gray-600 dark:text-gray-400">
            Provide a sample URL to load and analyze for template extraction. The system will automatically detect the domain.
          </p>
          <div className="mt-4">
            <input
              type="url"
              id="url-input"
              placeholder="https://example.com/page"
              className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded bg-white dark:bg-gray-800"
            />
            <button 
              onClick={() => handleEnterUrl('https://example.com/page')}
              className="mt-2 w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
            >
              Load Page
            </button>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-200 dark:border-gray-800 pt-4">
        <h3 className="text-lg font-medium mb-3">Recently Used Sources</h3>
        <div className="flex flex-wrap gap-2">
          {[1, 2, 3].map((id) => (
            <button
              key={id}
              onClick={() => handleSelectSource(id)}
              className="px-4 py-2 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg"
            >
              Source {id}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TemplateBuilderStep1;