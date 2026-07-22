const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload || !payload.length) return null;

  const total = payload.reduce(
    (sum, item) => sum + (Number(item.value) || 0),
    0,
  );

  return (
    <div
      className="bg-slate-900/95 border border-slate-700/80 p-3.5 rounded-xl shadow-2xl
    backdrop-blur-md text-slate-100 min-w-48"
    >
      <div className="font-bold text-sm text-sky-400 border-b border-slate-700/60 pb-1 mb-2 flex justify-between">
        <span>{label}</span>
        <span className="text-slate-300">Total: {total}</span>
      </div>
      <div className="flex flex-col gap-1 text-xs">
        {payload.map((item) => (
          <div
            key={item.dataKey}
            className="flex justify-between items-center gap-4"
          >
            <div className="flex items-center gap-1.5">
              <span
                className="w-2.5 h-2.5 rounded-full"
                style={{ backgroundColor: item.fill }}
              />
              <span className="text-slate-300">{item.dataKey}:</span>
            </div>
            <span className="font-bold text-slate-100">{item.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CustomTooltip;
