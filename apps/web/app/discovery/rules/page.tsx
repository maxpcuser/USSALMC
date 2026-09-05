'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

const DiscoveryRulesPage = () => {
  const [rules, setRules] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock data - in real app this would be API calls
    const fetchData = () => {
      setRules([
        {
          id: 1,
          templateId: 2,
          ruleName: 'Ship URL Pattern',
          ruleType: 'URL Pattern',
          priority: 1,
          isActive: true
        },
        {
          id: 2,
          templateId: 2,
          ruleName: 'Category Page Detection',
          ruleType: 'Category',
          priority: 2,
          isActive: true
        },
        {
          id: 3,
          templateId: 2,
          ruleName: 'Navigation Link Analysis',
          ruleType: 'Link Analysis',
          priority: 3,
          isActive: false
        }
      ]);
      
      setLoading(false);
    };

    fetchData();
  }, []);

  const toggleRuleStatus = (id: number) => {
    // Mock - in real app this would call API
    setRules(rules.map(rule => 
      rule.id === id ? { ...rule, isActive: !rule.isActive } : rule
    ));
  };

  const handleDeleteRule = (id: number) => {
    // Mock delete - in real app this would call API
    setRules(rules.filter(rule => rule.id !== id));
  };

  if (loading) {
    return <div className="p-6">Loading discovery rules...</div>;
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Discovery Rules</h1>
        <Link href="/discovery/rules/new" className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">
          New Discovery Rule
        </Link>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-700">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Type</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Template</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Priority</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            {rules.map((rule) => (
              <tr key={rule.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">{rule.ruleName}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">{rule.ruleType}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">Template {rule.templateId}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">{rule.priority}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${rule.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                    {rule.isActive ? 'Active' : 'Inactive'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <div className="flex space-x-2">
                    <Link href={`/discovery/rules/${rule.id}/edit`} className="text-blue-600 hover:text-blue-900">Edit</Link>
                    <button 
                      onClick={() => toggleRuleStatus(rule.id)} 
                      className="text-yellow-600 hover:text-yellow-900"
                    >
                      {rule.isActive ? 'Disable' : 'Enable'}
                    </button>
                    <button 
                      onClick={() => handleDeleteRule(rule.id)} 
                      className="text-red-600 hover:text-red-900"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DiscoveryRulesPage;