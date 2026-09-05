// Template Builder step 3 component
'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

const TemplateBuilderStep3 = () => {
  const router = useRouter();
  const [selectedEntityType, setSelectedEntityType] = useState<number | null>(null);
  
  const handleNext = () => {
    if (selectedEntityType) {
      // Navigate to step 4
      router.push('/template-builder/step-4');
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Select Entity Type</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {[
          { id: 1, name: "Ship", description: "Spacecraft vessels" },
          { id: 2, name: "Weapon", description: "Weapons and armaments" },
          { id: 3, name: "Module", description: "Ship modules and components" },
          { id: 4, name: "Character", description: "People and NPCs" },
          { id: 5, name: "Station", description: "Space stations and facilities" },
          { id: 6, name: "System", description: "Star systems and locations" }
        ].map((entityType) => (
          <div 
            key={entityType.id}
            className={`border rounded-lg p-4 cursor-pointer transition ${
              selectedEntityType === entityType.id 
                ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' 
                : 'border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800'
            }`}
            onClick={() => setSelectedEntityType(entityType.id)}
          >
            <div className="flex items-start">
              <div className="bg-gray-200 dark:bg-gray-700 rounded-lg w-12 h-12 flex items-center justify-center mr-3">
                {entityType.name.charAt(0)}
              </div>
              <div>
                <h2 className="font-semibold">{entityType.name}</h2>
                <p className="text-sm text-gray-600 dark:text-gray-400">{entityType.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="border-t border-gray-200 dark:border-gray-800 pt-4">
        <h3 className="text-lg font-medium mb-3">Create New Entity Type</h3>
        <div className="flex space-x-4">
          <input
            type="text"
            placeholder="Entity type name"
            className="flex-1 p-2 border border-gray-300 dark:border-gray-700 rounded bg-white dark:bg-gray-800"
          />
          <button className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded">
            Create
          </button>
        </div>
      </div>

      <div className="mt-6 flex justify-end">
        <button 
          onClick={handleNext}
          disabled={!selectedEntityType}
          className={`${
            selectedEntityType 
              ? 'bg-blue-500 hover:bg-blue-600' 
              : 'bg-gray-300 dark:bg-gray-700 cursor-not-allowed'
          } text-white py-2 px-6 rounded`}
        >
          Next: Field Mapping
        </button>
      </div>
    </div>
  );
};

export default TemplateBuilderStep3;