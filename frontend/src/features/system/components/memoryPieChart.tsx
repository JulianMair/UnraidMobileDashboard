import React from 'react';
import { PieChart, Pie, Cell, Tooltip } from 'recharts';

const COLORS = ['#FF6B6B', '#4CAF50']; // Used / Free

function MemoryPieChart({ memory_total: memory_total, memory_used: memory_used, memory_available: memory_available }) {
  const used = memory_used;
  const free = memory_available;
  const total = memory_total;
  const percentUsed = ((used / total) * 100).toFixed(1);

  const data = [
    { name: 'Used', value: used },
    { name: 'Free', value: free },
  ];

  return (
    <div className="flex flex-col items-center justify-between text-white text-s bg-gray-800 shadow w-full min-h-[10px]">

      <PieChart width={150} height={150}>
        <Pie
          data={data}
          dataKey="value"
          outerRadius={48}
          innerRadius={34}
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
          className="text-lg"
          fill="#fff"
        >
          {percentUsed}%
        </text>

        <Tooltip formatter={(value) => `${value} GB`} />
      </PieChart>

      <div className="mt-1 text-center leading-tight text-s">
        <p className="truncate"><span className="text-red-400 font-normal">Used:</span> {used.toFixed(2)} GB</p>
        <p className="truncate"><span className="text-green-400 font-normal">Free:</span> {free.toFixed(2)} GB</p>
        <p className="text-gray-400 text-[14px]">Gesamt: {total.toFixed(2)} GB</p>
      </div>
    </div>
  );
}

export default MemoryPieChart;
