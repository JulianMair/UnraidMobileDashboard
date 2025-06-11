// src/features/containers/components/LogsModal.jsx
import React from 'react';

export default function LogsModal({ logs, onClose }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
      <div className="bg-gray-800 text-white p-6 rounded-xl max-w-2xl w-full relative shadow-2xl">
        <button onClick={onClose} className="absolute top-3 right-3 text-white hover:text-red-400 transition text-2xl">×</button>
        <h2 className="text-xl font-bold mb-4">Logs</h2>
        <pre className="bg-gray-900 p-4 rounded-lg max-h-[600px] overflow-y-auto text-sm whitespace-pre-wrap">
          {logs || 'Keine Logs vorhanden.'}
        </pre>
      </div>
    </div>
  );
}
