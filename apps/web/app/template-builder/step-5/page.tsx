// Template Builder step 5 component
'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

const TemplateBuilderStep5 = () => {
  const router = useRouter();
  
  const handleSave = () => {
    // In a real implementation, this would save the template
    alert('Template saved successfully!');
    router.push('/templates');
  };

  const handleTest = () => {
    // Navigate to test page
    router.push('/template-testing');
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Review & Save</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg p-4 mb-6">
            <h2 className="text-lg font-semibold mb-3">Template Summary</h2>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="font-medium">Name:</span>
                <span>Ship Template</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Source:</span>
                <span>wiki.robertsspaceindustries.com</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Entity Type:</span>
                <span>Ship</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Version:</span>
                <span>1.0 (draft)</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Status:</span>
                <span>Draft</span>
              </div>
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg p-4">
            <h2 className="text-lg font-semibold mb-3">Field Mappings</h2>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span>Name:</span>
                <span>.ship-name</span>
              </div>
              <div className="flex justify-between">
                <span>Manufacturer:</span>
                <span>.ship-manufacturer</span>
              </div>
              <div className="flex justify-between">
                <span>Cargo Capacity:</span>
                <span>.ship-cargo</span>
              </div>
              <div className="flex justify-between">
                <span>Role:</span>
                <span>.ship-role</span>
              </div>
            </div>
          </div>
        </div>
        
        <div>
          <div className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg p-4 mb-6">
            <h2 className="text-lg font-semibold mb-3">Actions</h2>
            <div className="space-y-3">
              <button 
                onClick={handleSave}
                className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
              >
                Save Template
              </button>
              <button 
                onClick={handleTest}
                className="w-full bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded"
              >
                Test Template
              </button>
              <button className="w-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-white py-2 px-4 rounded">
                Save & Continue
              </button>
              <button className="w-full bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded">
                Discard
              </button>
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg p-4">
            <h2 className="text-lg font-semibold mb-3">Version History</h2>
            <div className="space-y-2">
              <p className="text-sm text-gray-600 dark:text-gray-400">Version 1.0 (created today)</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Version 0.9 (last week)</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Version 0.8 (2 weeks ago)</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TemplateBuilderStep5;