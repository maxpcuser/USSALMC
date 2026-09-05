// Dashboard page component
'use client';

import React from 'react';
import { SourceApiClient } from '../lib/api/source-api-client';
import { EntityTypeApiClient } from '../lib/api/entity-type-api-client';
import { EntityApiClient } from '../lib/api/entity-api-client';
import { RelationshipApiClient } from '../lib/api/relationship-api-client';

const Dashboard = () => {
  const [sourceCount, setSourceCount] = React.useState(0);
  const [entityTypeCount, setEntityTypeCount] = React.useState(0);
  const [entityCount, setEntityCount] = React.useState(0);
  const [relationshipCount, setRelationshipCount] = React.useState(0);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const sourceApiClient = new SourceApiClient();
        const entityTypeApiClient = new EntityTypeApiClient();
        const entityApiClient = new EntityApiClient();
        const relationshipApiClient = new RelationshipApiClient();
        
        const sources = await sourceApiClient.getSources();
        const entityTypes = await entityTypeApiClient.getEntityTypes();
        const entities = await entityApiClient.getEntities();
        const relationships = await relationshipApiClient.getRelationships();
        
        setSourceCount(sources.length);
        setEntityTypeCount(entityTypes.length);
        setEntityCount(entities.length);
        setRelationshipCount(relationships.length);
      } catch (error) {
        console.error('Failed to fetch dashboard data:', error);
      }
    };
    
    fetchData();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-2">Sources</h2>
          <p className="text-3xl font-bold">{sourceCount}</p>
        </div>
        
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-2">Entity Types</h2>
          <p className="text-3xl font-bold">{entityTypeCount}</p>
        </div>
        
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-2">Entities</h2>
          <p className="text-3xl font-bold">{entityCount}</p>
        </div>
        
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-2">Relationships</h2>
          <p className="text-3xl font-bold">{relationshipCount}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Recent Sources</h2>
          <div className="space-y-2">
            {/* Placeholder for recent sources */}
            <p className="text-gray-500">No recent sources found</p>
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Recent Entities</h2>
          <div className="space-y-2">
            {/* Placeholder for recent entities */}
            <p className="text-gray-500">No recent entities found</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;