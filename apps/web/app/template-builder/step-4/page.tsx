// Template Builder step 4 component
'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

const TemplateBuilderStep4 = () => {
  const router = useRouter();
  const [fieldMappings, setFieldMappings] = useState({
    name: '',
    manufacturer: '',
    cargo: '',
    role: ''
  });
  
  const handleFieldChange = (fieldName: string, value: string) => {
    setFieldMappings(prev => ({
      ...prev,
      [fieldName]: value
    }));
  };
  
  const handleNext = () => {
    // Navigate to step 5
    router.push('/template-builder/step-5');
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Field Mapping</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg p-4 mb-6">
            <h2 className="text-lg font-semibold mb-3">Page Element Preview</h2>
            <div className="bg-gray-100 dark:bg-gray-700 rounded h-64 flex items-center justify-center">
              <p className="text-gray-500 dark:text-gray-400">Page elements would be displayed here for selection</p>
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg p-4">
            <h2 className="text-lg font-semibold mb-3">Selectors</h2>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium mb-1">Name (CSS Selector)</label>
                <input 
                  type="text" 
                  value={fieldMappings.name}
                  onChange={(e) => handleFieldChange('name', e.target.value)}
                  placeholder=".ship-name"
                  className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded bg-white dark:bg-gray-800"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Manufacturer (CSS Selector)</label>
                <input 
                  type="text" 
                  value={fieldMappings.manufacturer}
                  onChange={(e) => handleFieldChange('manufacturer', e.target.value)}
                  placeholder=".ship-manufacturer"
                  className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded bg-white dark:bg-gray-800"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Cargo Capacity (CSS Selector)</label>
                <input 
                  type="text" 
                  value={fieldMappings.cargo}
                  onChange={(e) => handleFieldChange('cargo', e.target.value)}
                  placeholder=".ship-cargo"
                  className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded bg-white dark:bg-gray-800"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Role (CSS Selector)</label>
                <input 
                  type="text" 
                  value={fieldMappings.role}
                  onChange={(e) => handleFieldChange('role', e.target.value)}
                  placeholder=".ship-role"
                  className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded bg-white dark:bg-gray-800"
                />
              </div>
            </div>
          </div>
        </div>
        
        <div>
          <div className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg p-4 mb-6">
            <h2 className="text-lg font-semibold mb-3">Entity Fields</h2>
            <div className="space-y-2">
              {[
                { id: 1, name: "Name", type: "text" },
                { id: 2, name: "Manufacturer", type: "text" },
                { id: 3, name: "Cargo Capacity", type: "number" },
                { id: 4, name: "Role", type: "text" }
              ].map((field) => (
                <div key={field.id} className="p-2 border border-gray-200 dark:border-gray-700 rounded">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium">{field.name}</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Type: {field.type}</p>
                    </div>
                    <button className="text-blue-600 hover:text-blue-800 text-sm">
                      Map
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg p-4">
            <h2 className="text-lg font-semibold mb-3">Element Information</h2>
            <div className="space-y-2 text-sm">
              <p><span className="font-medium">Selected Element:</span> div.ship-details</p>
              <p><span className="font-medium">Tag Name:</span> div</p>
              <p><span className="font-medium">Attribute:</span> class="ship-details"</p>
              <p><span className="font-medium">Content:</span> This ship is a...</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-6 flex justify-end">
        <button 
          onClick={handleNext}
          className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-6 rounded"
        >
          Next: Review & Save
        </button>
      </div>
    </div>
  );
};

export default TemplateBuilderStep4;