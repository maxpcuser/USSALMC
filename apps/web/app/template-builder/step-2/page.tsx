// Template Builder step 2 component
'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

const TemplateBuilderStep2 = () => {
  const router = useRouter();
  
  const handleNext = () => {
    // Navigate to step 3
    router.push('/template-builder/step-3');
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Load Page</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 border border-gray-300 dark:border-gray-700 rounded-lg p-4">
          <h2 className="text-lg font-semibold mb-3">Page Preview</h2>
          <div className="bg-gray-100 dark:bg-gray-800 rounded h-96 flex items-center justify-center">
            <p className="text-gray-500 dark:text-gray-400">Page preview would appear here</p>
          </div>
        </div>
        
        <div>
          <h2 className="text-lg font-semibold mb-3">Information</h2>
          <div className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg p-4 mb-4">
            <h3 className="font-medium mb-2">URL Analysis</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">The system has analyzed the page to detect structure.</p>
            <div className="space-y-2">
              <p><span className="font-medium">Detected Domain:</span> wiki.robertsspaceindustries.com</p>
              <p><span className="font-medium">Page Title:</span> Ship - Roberts Space Industries</p>
              <p><span className="font-medium">Content Type:</span> HTML Document</p>
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg p-4">
            <h3 className="font-medium mb-2">Available Entity Types</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">Select the entity type for this extraction.</p>
            <div className="space-y-2">
              {[1, 2, 3].map((id) => (
                <div key={id} className="flex items-center">
                  <input 
                    type="radio" 
                    id={`entity-${id}`} 
                    name="entity-type" 
                    className="mr-2"
                  />
                  <label htmlFor={`entity-${id}`}>Entity Type {id}</label>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-6 flex justify-end">
        <button 
          onClick={handleNext}
          className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-6 rounded"
        >
          Next: Select Entity Type
        </button>
      </div>
    </div>
  );
};

export default TemplateBuilderStep2;