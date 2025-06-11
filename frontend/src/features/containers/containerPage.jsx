// src/features/containers/ContainerPage.jsx
import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { GET_CONTAINERS } from './graphql/containerQueries';
import { ContainerActions } from './hooks/containerActions';
import ContainerCard from './components/containerCard';
import LogsModal from './components/logsModal';

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

  if (loading) return <p>Lade Daten...</p>;
  if (error) return <p>Fehler: {JSON.stringify(error)}</p>;
  if (!data) return <p>Keine Daten verfügbar</p>;

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
