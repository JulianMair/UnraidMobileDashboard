import React, { useEffect, useState } from 'react';
import { gql, useQuery, useSubscription } from "@apollo/client";
import axios from 'axios';
import { DocumentTextIcon, ArrowTopRightOnSquareIcon } from "@heroicons/react/24/solid";

const GET_VMS = gql`
query Containers {
  docker {
    containers {
      names
      labels
      state
      status
      autoStart
      ports {
        publicPort
      }
    }
  }
}
`;
function Container() {
    const [containers, setContainers] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [logsData, setLogsData] = useState("");


    const handleContainerStart = async (id) => {
        try {
            const response = await axios.post(`http://192.168.178.10:8096/containers/${id}/start`, {
            });
            console.log("Erfolgreich:", response.data);
        } catch (error) {
            console.error("Fehler beim Senden:", error);
        }
    };
    const handleContainerStop = async (id) => {
        try {
            const response = await axios.post(`http://192.168.178.10:8096/containers/${id}/stop`, {
            });
            console.log("Erfolgreich:", response.data);
        } catch (error) {
            console.error("Fehler beim Senden:", error);
        }
    };

    const handleLogs = async (id) => {
        try {
            const response = await axios.get(`http://192.168.178.10:8096/containers/${id}/logs`);
            setLogsData(response.data.logs); // oder z.B. response.data.logs
            console.log(response.data);
            setShowModal(true);
        } catch (error) {
            console.error("Fehler beim Laden der Logs", error);
        }
    };

    const handleOpenWebsite = (container) => {
        console.log(container)
        window.open(container.webui, "_blank");
    };

    const closeModal = () => {
        setShowModal(false);
        setLogsData("");
    };



    useEffect(() => {
        const fetchContainer = () =>{

        
        axios.get('http://192.168.178.10:8096/containers/')
            .then(response => {
                setContainers(response.data);
            })
            .catch(error => {
                console.error('Fehler beim Laden der Daten:', error);
            });
        };

        fetchContainer();
        const interval = setInterval(fetchContainer, 2000);
        return () => clearInterval(interval);
    }, []);

    if (!containers) {
        return <p>Daten werden geladen...</p>;
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4 bg-gray-900 relative">
            {containers.map((container) => (
                <div
                    key={container.id}
                    className="relative flex flex-col items-center justify-between bg-gray-700 p-4 rounded-xl shadow-lg border border-gray-600 
                       hover:shadow-2xl hover:scale-105 transition-all duration-300 w-full max-w-xs mx-auto sm:max-w-none">

                    {/*  Logs-Icon (Top Left) */}
                    <button onClick={() => handleLogs(container.id)}
                        className="absolute top-2 left-2 p-1 bg-gray-800 rounded-full hover:bg-gray-600 transition">
                        <DocumentTextIcon className="w-7 h-7 text-white" />
                    </button>

                    {/*  Webseite-Icon (Top Right) */}
                    <button onClick={() => handleOpenWebsite(container)}
                        className="absolute top-2 right-2 p-1 bg-gray-800 rounded-full hover:bg-gray-600 transition">
                        <ArrowTopRightOnSquareIcon className="w-7 h-7 text-white" />
                    </button>

                    {/* Container Name */}
                    <h2 className="text-lg font-bold text-white text-center mt-6">{container.name}</h2>

                    {/* Container Icon */}
                    <img
                        src={container.logo}
                        onError={(e) => e.target.src = "src/assets/Icons/question.png"}
                        alt={container.name}
                        className="w-16 h-16 mt-2 object-contain"
                    />

                    {/* Status */}
                    <p className={`text-lg font-semibold mt-2 ${container.status === "running" ? "text-green-400" : "text-red-400"}`}>
                        {container.status}
                    </p>

                    {/* Buttons */}
                    <div className="flex flex-col sm:flex-row gap-2 w-full mt-4">
                        <button
                            onClick={() => handleContainerStart(container.id)}
                            className="flex-1 bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg transition-all duration-200 active:scale-95 w-full sm:w-auto">
                            Start
                        </button>

                        <button
                            onClick={() => handleContainerStop(container.id)}
                            className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg transition-all duration-200 active:scale-95 w-full sm:w-auto">
                            Stop
                        </button>
                    </div>
                </div>
            ))}
            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
                    <div className="bg-gray-800 text-white p-6 rounded-xl max-w-2xl w-full relative shadow-2xl">
                        <button
                            onClick={closeModal}
                            className="absolute top-3 right-3 text-white hover:text-red-400 transition text-2xl"
                        >
                            ×
                        </button>

                        <h2 className="text-xl font-bold mb-4">Logs</h2>
                        <pre className="bg-gray-900 p-4 rounded-lg max-h-[600px] overflow-y-auto text-sm whitespace-pre-wrap">
                            {logsData || "Keine Logs vorhanden."}
                        </pre>
                    </div>
                </div>
            )}



        </div>


    );

}

export default Container;
