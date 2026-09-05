'use client';

import { useState } from 'react';

export function ResultDetailView() {
  const [selectedResult] = useState({
    id: '1',
    title: 'Advanced Knowledge Extraction Techniques',
    source: 'Knowledge Base',
    content: `This comprehensive guide covers the latest methods in knowledge extraction, including pattern recognition and data mapping. The techniques described here are particularly useful for processing large volumes of structured and unstructured data to extract meaningful insights.

Key features discussed in this document include:
- Pattern recognition algorithms for identifying relevant information
- Data mapping strategies for organizing extracted knowledge
- Integration with existing database systems
- Performance optimization principles

The methodology presented involves multiple stages of analysis:
1. Initial data preprocessing and cleaning
2. Pattern identification through machine learning models
3. Knowledge graph construction
4. Result validation and refinement
5. Integration with existing systems

Each stage is accompanied by practical examples and implementation guidelines that can be easily adapted to different use cases.`,
    relevance: 95,
    date: '2023-10-17',
    tags: ['extraction', 'knowledge', 'techniques'],
    related: [
      { id: '2', title: 'USSA Lore Documentation Framework' },
      { id: '3', title: 'Data Processing Pipeline Analysis' },
    ],
  });

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-gray-800">Result Details</h2>
      
      <div className="border rounded-lg p-6">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-lg font-medium text-gray-900">{selectedResult.title}</h3>
          <span className="text-sm bg-green-100 text-green-800 px-2 py-1 rounded">
            {selectedResult.relevance}% relevance
          </span>
        </div>
        
        <div className="flex items-center text-sm text-gray-500 mb-4">
          <span>{selectedResult.source}</span>
          <span className="mx-2">•</span>
          <span>{selectedResult.date}</span>
        </div>
        
        <div 
          className="prose max-w-none mb-6"
          dangerouslySetInnerHTML={{ __html: selectedResult.content.replace(/\n/g, '<br />') }}
        />
        
        <div className="mt-4">
          <h4 className="font-medium text-gray-900 mb-2">Tags</h4>
          <div className="flex flex-wrap gap-1">
            {selectedResult.tags.map((tag, index) => (
              <span
                key={index}
                className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
        
        <div className="mt-6">
          <h4 className="font-medium text-gray-900 mb-2">Related Results</h4>
          <div className="space-y-2">
            {selectedResult.related.map((related) => (
              <div key={related.id} className="p-3 border rounded hover:bg-gray-50 cursor-pointer">
                <span className="text-blue-600 hover:underline">{related.title}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <div className="flex space-x-3">
        <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
          Save to Favorites
        </button>
        <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
          Export Results
        </button>
        <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
          Share Result
        </button>
      </div>
    </div>
  );
}