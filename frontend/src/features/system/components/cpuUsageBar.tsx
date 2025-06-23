const CpuUsageBar = ({ usage }) => {
  const percentage = Math.min(100, Math.max(0, usage)); // Begrenzung 0–100

  return (
    <div className="w-full bg-gray-700 rounded-lg overflow-hidden shadow">
      <div
        className="h-5 transition-all duration-300"
        style={{
          width: `${percentage}%`,
          backgroundColor:
            percentage < 50 ? '#22c55e' : percentage < 80 ? '#facc15' : '#ef4444',
        }}
      ></div>
    </div>
  );
};

export default CpuUsageBar;
