import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CpuUsageBar from './components/CpuUsageBar';
import DiskPieChart from './components/diskPieChart';
import MemoryPieChart from './components/memoryPieChart';
import { ServerStackIcon } from "@heroicons/react/24/outline";
import { ArrowPathIcon } from "@heroicons/react/24/outline";

function System() {
  const [systemData, setSystemData] = useState(null);

  useEffect(() => {
    const fetchStats = () => {
      axios.get('http://127.0.0.1:8000/system')
        .then(response => {
          setSystemData(response.data);
        })
        .catch(error => {
          console.error('Fehler beim Laden der Daten:', error);
        });
    };

    fetchStats();
    const interval = setInterval(fetchStats, 2000);
    return () => clearInterval(interval);
  }, []);

  if (!systemData) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] text-white">
        <ArrowPathIcon className="w-10 h-10 animate-spin text-blue-400 mb-2" />
        <p className="text-lg">Daten werden geladen...</p>
      </div>
    );
  }
  const formatUptime = (milliseconds) => {
    const seconds = milliseconds / 1000;
    const days = Math.floor(seconds / 86400);
    const hours = Math.floor((seconds % 86400) / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const sec = Math.floor(seconds % 60);
    return `${days}d ${hours}h ${minutes}m ${sec}s`;
  };

  const formatPercent = (value) => `${value.toFixed(2)}%`;

  return (
    <div className="p-8 bg-gray-900 rounded-xl shadow-xl max-w-4xl mx-auto mt-8 text-white">
      <h1 className="text-3xl font-semibold mb-8 text-center">Systemstatistiken</h1>

      {/* CPU Section */}
      <div className="mb-6 border border-gray-700 rounded-lg p-6 bg-gray-800 shadow">
        <h2 className="text-2xl font-bold text-green-400 mb-4">🧠 CPU</h2>
        <p className="text-lg">
          <span className="font-medium">CPU Usage:</span> <CpuUsageBar usage ={systemData.cpu_usage}/>
          <p className="mt-2 text-sm">{systemData.cpu_usage.toFixed(1)}%</p>
          <div className='columns-2'>
            {systemData.cpu_usage_per_core.map((percent, index) => (
              <div className="p-2 text-white">
                  <h2 className="text-sm font-bold sb-1">CPU-Kern {index +1}</h2>
                  <CpuUsageBar usage={percent} />
                  <p className="mt-2 text-sm">{percent.toFixed(1)}%</p>
              </div>

            ))}
         </div>
        </p>
      </div>

      {/* Memory Section */}
      <div className="mb-2 border border-gray-700 rounded-lg p-6 bg-gray-800 shadow">
        <h2 className="text-2xl font-bold text-purple-400 mb-4"><ServerStackIcon className="w-6 h-6 text-white" /> Ram-Auslastung</h2>
        <MemoryPieChart 
          memory_total={systemData.memory_total} 
          memory_used={systemData.memory_used} 
          memory_available={systemData.memory_available}
        />
      </div>
            
      {/* Disk Section */}
    <div className="mb-2 border border-gray-700 rounded-lg p-6 bg-gray-800 shadow">
        <h2 className="text-2xl font-bold text-purple-400 mb-4">📀 Festplatten</h2>
      
      <div className="grid grid-cols-2 gap-3 w-full">
        {systemData.disks?.map((disk, index) => (
          <DiskPieChart key={index} disk={disk} />
        ))}
      </div>


      {/* Uptime */}
      <div className="border-t border-gray-700 pt-4 text-center text-gray-300 mt-8">
        <p className="text-lg"><strong>Uptime:</strong> {formatUptime(systemData.uptime)}</p>
      </div>
    </div>
    </div>
  );
}

export default System;
