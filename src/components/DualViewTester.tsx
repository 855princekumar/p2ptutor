import React from 'react';
import { ExternalLink } from 'lucide-react';
import { openDualView } from '../utils/testUtils';

export function DualViewTester() {
  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div className="bg-white rounded-lg shadow-lg p-4 space-y-2">
        <h3 className="text-sm font-semibold text-gray-700">Test Both Views</h3>
        <div className="flex space-x-2">
          <button
            onClick={() => openDualView('tutor')}
            className="flex items-center space-x-1 px-3 py-1 bg-blue-100 text-blue-700 rounded hover:bg-blue-200"
          >
            <ExternalLink size={14} />
            <span>Tutor</span>
          </button>
          <button
            onClick={() => openDualView('trainee')}
            className="flex items-center space-x-1 px-3 py-1 bg-green-100 text-green-700 rounded hover:bg-green-200"
          >
            <ExternalLink size={14} />
            <span>Trainee</span>
          </button>
        </div>
      </div>
    </div>
  );
}