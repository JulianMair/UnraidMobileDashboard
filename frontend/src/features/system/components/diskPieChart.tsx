import React from 'react';
import { PieChart, Pie, Cell, Tooltip } from 'recharts';

const COLORS = ['#FF6B6B', '#4CAF50']; // Used / Free

function DiskPieChart({ disk }) {
  const used = disk.used_gb;
  const free = disk.free_gb;
  const total = used + free;
  const percentUsed = ((used / total) * 100).toFixed(1);

  const data = [
    { name: 'Used', value: used },
    { name: 'Free', value: free },
  ];

  return (
    <div className="flex flex-col items-center justify-between text-white text-xs border border-black rounded-lg p-3 bg-gray-800 shadow w-full min-h-[220px]">
      <h4 className="font-semibold text-center break-words mb-1 text-sm leading-snug max-w-full">
        {disk.mountpoint || disk.device}
      </h4>

      <PieChart width={90} height={90}>
        <Pie
          data={data}
          dataKey="value"
          outerRadius={38}
          innerRadius={24}
          cx="50%"
          cy="50%"
          stroke="#000"
          strokeWidth={1}
        >
          {data.map((_, index) => (
            <Cell key={index} fill={COLORS[index]} />
          ))}
        </Pie>

        {/* Prozentwert in der Mitte */}
        <text
          x="50%"
          y="50%"
          textAnchor="middle"
          dominantBaseline="middle"
          className="text-xs"
          fill="#fff"
        >
          {percentUsed}%
        </text>

        <Tooltip formatter={(value) => `${value} GB`} />
      </PieChart>

      <div className="mt-1 text-center leading-tight text-xs">
        <p className="truncate"><span className="text-red-400 font-medium">Used:</span> {used.toFixed(2)} GB</p>
        <p className="truncate"><span className="text-green-400 font-medium">Free:</span> {free.toFixed(2)} GB</p>
        <p className="text-gray-400 text-[10px]">Gesamt: {total.toFixed(2)} GB</p>
      </div>
    </div>
  );
}

export default DiskPieChart;
