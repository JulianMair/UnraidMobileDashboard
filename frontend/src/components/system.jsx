import React, { useEffect, useState } from 'react';
import axios from 'axios';

function System() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const fetchStats = () => {
      axios.get('http://127.0.0.1:8000/system')
        .then(response => {
          setStats(response.data);
        })
        .catch(error => {
          console.error('Fehler beim Laden der Daten:', error);
        });
    };

    fetchStats();
    const interval = setInterval(fetchStats, 2000);
    return () => clearInterval(interval);
  }, []);

  if (!stats) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-white text-xl">Daten werden geladen...</p>
      </div>
    );
  }

  const formatMemory = (bytes) => {
    const gb = bytes / 1024 / 1024 / 1024;
    return gb >= 1 ? `${gb.toFixed(2)} GB` : `${(bytes / 1024 / 1024).toFixed(2)} MB`;
  };

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
          <span className="font-medium">CPU Usage:</span> {formatPercent(stats.cpu_usage)}
        </p>
      </div>

      {/* Memory Section */}
      <div className="mb-6 border border-gray-700 rounded-lg p-6 bg-gray-800 shadow">
        <h2 className="text-2xl font-bold text-blue-400 mb-4">💾 Arbeitsspeicher</h2>
        <p className="text-lg"><span className="font-medium">Total:</span> {formatMemory(stats.memory.total)}</p>
        <p className="text-lg"><span className="font-medium">Available:</span> {formatMemory(stats.memory.available)}</p>
        <p className="text-lg"><span className="font-medium">Used:</span> {formatMemory(stats.memory.used)}</p>
      </div>

      {/* Disk Section */}
      <div className="mb-6 border border-gray-700 rounded-lg p-6 bg-gray-800 shadow">
        <h2 className="text-2xl font-bold text-purple-400 mb-4">📀 Festplatte</h2>
        <p className="text-lg">
          <span className="font-medium">Disk Usage:</span> {formatPercent(stats.disk_usage.percent)}
        </p>
        <p className="text-lg">
          <span className="font-medium">Disk total:</span> {formatMemory(stats.disk_usage.used)}
        </p>
        <p className="text-lg">
          <span className="font-medium">Disk free:</span> {formatMemory(stats.disk_usage.free)}
        </p>
      </div>

      {/* Uptime */}
      <div className="border-t border-gray-700 pt-4 text-center text-gray-300 mt-8">
        <p className="text-lg"><strong>Uptime:</strong> {formatUptime(stats.uptime)}</p>
      </div>
    </div>
  );
}

export default System;
