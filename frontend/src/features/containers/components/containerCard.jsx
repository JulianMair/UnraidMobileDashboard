import React from 'react';
import { DocumentTextIcon, ArrowTopRightOnSquareIcon } from '@heroicons/react/24/solid';

export default function ContainerCard({ container, onStart, onStop, onLogs, onOpenWebsite }) {
  return (
    <div className="relative flex flex-col items-center justify-between bg-gray-700 p-4 rounded-xl shadow-lg border border-gray-600 hover:shadow-2xl hover:scale-105 transition-all duration-300 w-full max-w-xs mx-auto sm:max-w-none">
      <button onClick={() => onLogs(container.id)} className="absolute top-2 left-2 p-1 bg-gray-800 rounded-full hover:bg-gray-600 transition">
        <DocumentTextIcon className="w-7 h-7 text-white" />
      </button>
      <button onClick={() => onOpenWebsite(container)} className="absolute top-2 right-2 p-1 bg-gray-800 rounded-full hover:bg-gray-600 transition">
        <ArrowTopRightOnSquareIcon className="w-7 h-7 text-white" />
      </button>

      <h2 className="text-lg font-bold text-white text-center mt-6">{container.names[0].substring(1).toUpperCase()}</h2>

      <img
        src={container.labels?.['net.unraid.docker.icon'] || 'src/assets/Icons/default.png'}
        onError={e => (e.target.src = 'src/assets/Icons/question.png')}
        alt={container.name}
        className="w-16 h-16 mt-2 object-contain"
      />

      <p className={`text-lg font-semibold mt-2 ${container.state === 'RUNNING' ? 'text-green-400' : 'text-red-400'}`}>
        {container.state}
      </p>

      <div className="flex flex-col sm:flex-row gap-2 w-full mt-4">
        <button onClick={() => onStart(container.id)} className="flex-1 bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg transition-all duration-200 active:scale-95">
          Start
        </button>
        <button onClick={() => onStop(container.id)} className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg transition-all duration-200 active:scale-95">
          Stop
        </button>
      </div>
    </div>
  );
}

