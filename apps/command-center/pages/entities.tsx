
// /apps/command-center/pages/entities.tsx - Entity Explorer Page
import React from 'react';

const EntitiesPage = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Entity Explorer</h1>
      
      <div className="mt-4 p-4 bg-gray-100 rounded">
        <h2 className="text-lg font-semibold">Entities in Knowledge Base</h2>
        <p className="mt-2">
          Browse and explore the knowledge base entities.
        </p>
      </div>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        {[1, 2, 3, 4, 5, 6].map((item) => (
          <div key={item} className="border p-4 rounded hover:bg-gray-50 cursor-pointer">
            <h3 className="font-semibold">Entity {item}</h3>
            <p className="text-sm mt-2">
              Brief description of the entity in the knowledge base...
            </p>
            <div className="mt-2 text-xs text-gray-500">
              12 documents • 3 relationships
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EntitiesPage;
