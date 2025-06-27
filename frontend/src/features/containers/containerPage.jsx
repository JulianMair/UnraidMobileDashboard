// src/features/containers/ContainerPage.jsx
import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { GET_CONTAINERS } from './graphql/containerQueries';
import { ContainerActions } from './hooks/containerActions';
import ContainerCard from './components/containerCard';
import LogsModal from './components/logsModal';

import { ExclamationTriangleIcon } from "@heroicons/react/24/solid";
import { ArrowPathIcon } from "@heroicons/react/24/outline";

function ContainerPage() {
  const [showModal, setShowModal] = useState(false);
  const [logsData, setLogsData] = useState('');
  const { data, loading, error, refetch } = useQuery(GET_CONTAINERS, {
    variables: { skipCache: false },
  });

  const {
    handleContainerStart,
    handleContainerStop,
    handleLogs,
    handleOpenWebsite,
  } = ContainerActions({ refetch, setLogsData, setShowModal });

if (loading) {
  return (
    <div className="flex flex-col items-center justify-center h-[60vh] text-white">
      <ArrowPathIcon className="w-10 h-10 animate-spin text-blue-400 mb-2" />
      <p className="text-lg">Daten werden geladen...</p>
    </div>
  );
}

if (error) {
  return (
    <div className="flex flex-col items-center justify-center py-6 px-4 text-red-200 bg-red-950 rounded-md max-w-sm mx-auto">
      <ExclamationTriangleIcon className="w-6 h-6 text-red-400 mb-1" />
      <p className="text-base font-medium">Fehler beim Laden</p>
      <details className="mt-2 w-full text-xs bg-red-900 p-2 rounded overflow-x-auto">
        <summary className="cursor-pointer text-red-300">Details anzeigen</summary>
        <pre className="whitespace-pre-wrap break-words">
          {JSON.stringify(error, null, 2)}
        </pre>
      </details>
    </div>
  );
}


if (!data) {
  return (
    <div className="flex flex-col items-center justify-center h-[60vh] text-white">
      <ExclamationTriangleIcon className="w-10 h-10 text-yellow-400 mb-2" />
      <p className="text-lg">Keine Daten verfügbar.</p>
    </div>
  );
}

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4 bg-gray-900 relative">
      {data.docker.containers.map(container => (
        <ContainerCard
          key={container.id}
          container={container}
          onStart={handleContainerStart}
          onStop={handleContainerStop}
          onLogs={handleLogs}
          onOpenWebsite={handleOpenWebsite}
        />
      ))}

      {showModal && (
        <LogsModal
          logs={logsData}
          onClose={() => {
            setShowModal(false);
            setLogsData('');
          }}
        />
      )}
    </div>
  );
}

export default ContainerPage;
