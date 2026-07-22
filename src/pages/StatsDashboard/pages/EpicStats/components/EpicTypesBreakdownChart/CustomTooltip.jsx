const CustomPieTooltip = ({ active, payload }) => {
  if (!active || !payload || !payload.length) return null;
  const data = payload[0];

  return (
    <div
      className="bg-slate-900/90 border border-slate-700 p-3 rounded-xl shadow-2xl
      backdrop-blur-md text-xs text-slate-100"
    >
      <div className="flex items-center gap-2 mb-1">
        <span
          className="w-3 h-3 rounded-full"
          style={{ backgroundColor: data.payload.fill }}
        />
        <span className="text-sm font-bold text-slate-200">{data.name}</span>
      </div>
      <div className="text-sm text-slate-300">
        Total Farmed: <strong className="text-white">{data.value}</strong>
      </div>
      <div className="text-sm text-slate-400">
        Share: <strong>{data.payload.percent}%</strong>
      </div>
    </div>
  );
};

export default CustomPieTooltip;
