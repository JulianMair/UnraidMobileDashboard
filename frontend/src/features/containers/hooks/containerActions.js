// src/features/containers/hooks/useContainerActions.js
import { useMutation } from '@apollo/client';
import axios from 'axios';
import { START_CONTAINER, STOP_CONTAINER } from '../graphql/containerQueries';

export const ContainerActions = ({ refetch, setLogsData, setShowModal }) => {
  const [startContainer] = useMutation(START_CONTAINER);
  const [stopContainer] = useMutation(STOP_CONTAINER);

  const handleContainerStart = async id => {
    try {
      const result = await startContainer({ variables: { startId: id } });
      alert(`Container ${result.data.docker.start.names[0].substring(1)} gestartet.`);
      refetch();
    } catch (e) {
      console.error('Fehler beim Starten:', e);
    }
  };

  const handleContainerStop = async id => {
    try {
      const result = await stopContainer({ variables: { stopId: id } });
      alert(`Container ${result.data.docker.stop.names[0].substring(1)} gestoppt.`);
      refetch();
    } catch (e) {
      console.error('Fehler beim Stoppen:', e);
    }
  };

  const handleLogs = async id => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/containers/${id}/logs`);
      setLogsData(response.data.logs);
      setShowModal(true);
    } catch (e) {
      console.error('Fehler beim Laden der Logs', e);
    }
  };

  const handleOpenWebsite = container => {
    console.log(container.ports);
    window.open("http://192.168.178.10:"+ container.ports[1].publicPort, '_blank');
  };

  return {
    handleContainerStart,
    handleContainerStop,
    handleLogs,
    handleOpenWebsite,
  };
};
