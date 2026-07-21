const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload || !payload.length) return null;

  const data = payload[0].payload; // Усі дані поточного івенту

  // Системні та розраховані поля, які не є назвами КП
  const systemKeys = [
    "event_label",
    "date",
    "action",
    "total_players",
    "avg_players",
  ];

  // Фільтруємо лише КП з онлайном > 0 та сортуємо від більшого до меншого
  const cpList = Object.keys(data)
    .filter((key) => !systemKeys.includes(key) && Number(data[key]) > 0)
    .map((cpName) => ({ name: cpName, count: Number(data[cpName]) }))
    .sort((a, b) => b.count - a.count);

  return (
    <div
      className="bg-slate-900/95 border border-slate-700/80 p-4 rounded-xl shadow-2xl
      backdrop-blur-md min-w-72.5 text-slate-100 pointer-events-none"
    >
      {/* Заголовок: Назва івенту та загальна явка */}
      <div className="border-b border-slate-700/60 pb-2 mb-2 flex items-center justify-between gap-4">
        <span className="font-bold text-sm text-slate-100">{label}</span>
        <span className="text-xs px-2 py-0.5 rounded bg-slate-800 text-sky-400 font-semibold border border-slate-700">
          Total: {data.total_players}
        </span>
      </div>

      {/* Метрики онлайну та порівняння із середньою лінією */}
      <div className="flex justify-between text-xs mb-3 px-1 text-slate-400">
        <span>
          5-Event Avg:{" "}
          <strong className="text-amber-400">{data.avg_players}</strong>
        </span>
        <span>
          Status:{" "}
          <strong
            className={
              data.total_players >= data.avg_players
                ? "text-emerald-400"
                : "text-rose-400"
            }
          >
            {data.total_players >= data.avg_players
              ? "▲ Above Avg"
              : "▼ Below Avg"}
          </strong>
        </span>
      </div>

      {/* Розподіл по КП (Grid у 2 колонки) */}
      <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">
        CP Breakdown:
      </div>
      <div className="grid grid-cols-2 gap-x-2.5 gap-y-1 max-h-72 overflow-y-auto pr-1 custom-scrollbar">
        {cpList.length > 0 ? (
          cpList.map((cp) => (
            <div
              key={cp.name}
              className="flex justify-between items-center py-1 px-2 rounded bg-slate-800/40 border
               border-slate-800/60 hover:bg-slate-800 transition"
            >
              <span
                className="text-slate-300 font-medium text-[11px] truncate max-w-21.25"
                title={cp.name}
              >
                {cp.name}
              </span>
              <span className="font-bold text-slate-100 text-xs">
                {cp.count}
              </span>
            </div>
          ))
        ) : (
          <span className="text-slate-500 italic col-span-2 text-xs">
            No CP data available
          </span>
        )}
      </div>
    </div>
  );
};

export default CustomTooltip;
