const AllEventsItem = ({ icon, name, owner, spawnDate, relation }) => {
  // Допоміжна функція для отримання іконки та стилів бейджа
  const getBadgeConfig = (rel) => {
    if (rel === "enemy") {
      return {
        icon: "💀",
        classes: "bg-red-500/10 text-red-400 border-red-500/20",
      };
    }
    if (rel === "alliance") {
      return {
        icon: "🛡️",
        classes: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
      };
    }
    return {
      icon: "👑",
      classes: "bg-amber-500/10 text-amber-400 border-amber-500/20",
    };
  };

  // Допоміжна функція для отримання фону та рамки картки
  const getCardClassName = (rel) => {
    const baseClasses = [
      "group relative border rounded-xl p-4 flex items-center",
      "gap-4 transition-all duration-300 shadow-md",
    ].join(" ");

    if (rel === "enemy") {
      return [
        baseClasses,
        "bg-gradient-to-r from-red-950/20 via-slate-950/50 to-slate-950/50",
        "border-red-900/40 hover:border-red-700/60 shadow-red-950/10",
      ].join(" ");
    }

    if (rel === "alliance") {
      return [
        baseClasses,
        "bg-gradient-to-r from-emerald-950/20 via-slate-950/50 to-slate-950/50",
        "border-emerald-900/40 hover:border-emerald-700/60 shadow-emerald-950/10",
      ].join(" ");
    }

    return [
      baseClasses,
      "bg-slate-950/50 hover:bg-slate-950/80 border-slate-800/80",
      "hover:border-slate-700/60",
    ].join(" ");
  };

  const badge = getBadgeConfig(relation);

  return (
    <div className={getCardClassName(relation)}>
      {/* Іконка івенту */}
      <div className="text-4xl mr-4 bg-slate-900 p-2 rounded shrink-0">
        {icon}
      </div>

      {/* Текстовий блок */}
      <div className="flex-1 overflow-hidden min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <h4 className="font-bold text-lg text-slate-100 truncate capitalize">
            {name}
          </h4>

          {/* Динамічний бейдж власника */}
          {owner && (
            <span
              className={`inline-flex items-center gap-1 px-2.5 py-0.5 
              rounded-md text-[10px] font-black uppercase tracking-wider 
              border shadow-sm animate-pulse ${badge.classes}`}
            >
              {badge.icon} {owner}
            </span>
          )}
        </div>

        {/* Дата респауну */}
        <div className="text-xs text-slate-400 mt-1">{spawnDate}</div>
      </div>
    </div>
  );
};

export default AllEventsItem;
