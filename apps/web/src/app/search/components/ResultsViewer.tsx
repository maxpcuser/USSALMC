'use client';

import { useState } from 'react';

export function ResultsViewer() {
  const [results] = useState([
    {
      id: '1',
      title: 'Advanced Knowledge Extraction Techniques',
      source: 'Knowledge Base',
      snippet: 'This comprehensive guide covers the latest methods in knowledge extraction, including pattern recognition and data mapping...',
      relevance: 95,
      date: '2023-10-17',
      tags: ['extraction', 'knowledge', 'techniques'],
    },
    {
      id: '2',
      title: 'USSA Lore Documentation Framework',
      source: 'Documentation Hub',
      snippet: 'The USSA lore documentation framework provides structured approaches to organizing and retrieving information across multiple sources...',
      relevance: 87,
      date: '2023-10-15',
      tags: ['documentation', 'framework', 'ussa'],
    },
    {
      id: '3',
      title: 'Data Processing Pipeline Analysis',
      source: 'Technical Repository',
      snippet: 'An in-depth analysis of the data processing pipeline used for knowledge extraction, including optimization strategies...',
      relevance: 78,
      date: '2023-10-10',
      tags: ['data', 'pipeline', 'analysis'],
    },
  ]);

  const [selectedResult, setSelectedResult] = useState<string | null>(null);

  return (
    <div>
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Search Results</h2>
      
      <div className="space-y-4">
        {results.map((result) => (
          <div
            key={result.id}
            className={`border rounded-lg p-4 hover:bg-gray-50 cursor-pointer transition-colors ${
              selectedResult === result.id ? 'ring-2 ring-blue-500 border-blue-500' : ''
            }`}
            onClick={() => setSelectedResult(result.id)}
          >
            <div className="flex justify-between items-start">
              <h3 className="font-medium text-gray-900">{result.title}</h3>
              <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                {result.relevance}%
              </span>
            </div>
            
            <div className="mt-2 flex items-center text-sm text-gray-500">
              <span>{result.source}</span>
              <span className="mx-2">•</span>
              <span>{result.date}</span>
            </div>
            
            <p className="mt-2 text-gray-700">{result.snippet}</p>
            
            <div className="mt-2 flex flex-wrap gap-1">
              {result.tags.map((tag, index) => (
                <span
                  key={index}
                  className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
      
      {results.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          No results found. Try adjusting your search query.
        </div>
      )}
    </div>
  );
}