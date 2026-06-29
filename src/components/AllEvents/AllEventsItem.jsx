const AllEventsItem = ({ icon, name, owner, spawnDate, relation }) => {
  // Функція конфігурації дипломатичних стилів для кожної окремої картки в сітці
  const getDiplomacyConfig = (rel) => {
    if (rel === "enemy") {
      return {
        gradientStyle:
          "conic-gradient(from 90deg at 50% 50%, #0f172a 0%, #ef4444 50%, #7f1d1d 75%, #0f172a 100%)",
        titleClass:
          "text-slate-100 drop-shadow-[0_2px_8px_rgba(239,68,68,0.35)]",
        badgeIcon: "💀",
        badgeClass: "bg-red-500/10 text-red-400 border-red-500/20",
        iconBorder: "border-red-500/30 text-red-400 bg-red-950/20",
        glowClass:
          "shadow-[0_0_15px_rgba(239,68,68,0.08)] hover:shadow-[0_0_25px_rgba(239,68,68,0.2)] hover:border-red-500/20",
      };
    }

    if (rel === "alliance") {
      return {
        gradientStyle:
          "conic-gradient(from 90deg at 50% 50%, #0f172a 0%, #10b981 50%, #064e3b 75%, #0f172a 100%)",
        titleClass:
          "text-slate-100 drop-shadow-[0_2px_8px_rgba(16,185,129,0.35)]",
        badgeIcon: "🛡️",
        badgeClass: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
        iconBorder: "border-emerald-500/30 text-emerald-400 bg-emerald-950/20",
        glowClass:
          "shadow-[0_0_15px_rgba(16,185,129,0.08)] hover:shadow-[0_0_25px_rgba(16,185,129,0.2)]" +
          "hover:border-emerald-500/20",
      };
    }

    // Дефолтний / Нейтральний статус (Золотий)
    return {
      gradientStyle:
        "conic-gradient(from 90deg at 50% 50%, #0f172a 0%, #f59e0b 50%, #78350f 75%, #0f172a 100%)",
      titleClass:
        "text-slate-100 drop-shadow-[0_2px_8px_rgba(245,158,11,0.35)]",
      badgeIcon: "👑",
      badgeClass: "bg-amber-500/10 text-amber-400 border-amber-500/20",
      iconBorder: "border-amber-500/30 text-amber-400 bg-amber-950/20",
      glowClass:
        "shadow-[0_0_15px_rgba(245,158,11,0.08)] hover:shadow-[0_0_25px_rgba(245,158,11,0.2)]" +
        "hover:border-amber-500/20",
    };
  };

  const status = relation || "neutral";
  const config = getDiplomacyConfig(status);

  return (
    <div
      className={`group relative rounded-xl p-px overflow-hidden transition-all duration-500 border
         border-slate-800/50 ${config.glowClass}`}
    >
      {/* Динамічний неоновий градієнт, який прискорюється та стає яскравішим при наведенні */}
      <div
        className="absolute inset-[-180%] animate-spin pointer-events-none opacity-30 group-hover:opacity-100
          group-hover:scale-110 duration-700 transition-all"
        style={{
          backgroundImage: config.gradientStyle,
          animationDuration: "8s",
        }}
      />

      {/* Внутрішня підкладка картки */}
      <div
        className="bg-slate-900/95 backdrop-blur-xl rounded-xl p-4 relative z-10 flex
        items-center gap-4 w-full h-full text-left"
      >
        {/* Іконка івенту з дипломатичною рамкою кольору статусу */}
        <div
          className={`w-12 h-12 rounded-lg border flex items-center justify-center text-3xl shrink-0
          shadow-inner group-hover:scale-105 duration-300 transition-transform ${config.iconBorder}`}
        >
          {icon}
        </div>

        {/* Текстовий блок події */}
        <div className="flex-1 overflow-hidden min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h4
              className={`font-black text-lg tracking-wide capitalize truncate ${config.titleClass}`}
            >
              {name}
            </h4>

            {/* Динамічний бейдж клану-власника */}
            {owner && (
              <span
                className={`inline-flex items-center gap-1 px-2 py-0.5
                rounded-md text-[10px] font-black uppercase tracking-wider
                border shadow-sm animate-pulse ${config.badgeClass}`}
              >
                {config.badgeIcon} {owner}
              </span>
            )}
          </div>

          {/* Дата респауну події */}
          <div className="text-xs font-medium text-slate-400 mt-1 flex items-center gap-1.5">
            <span className="inline-block w-1 h-1 rounded-full bg-slate-500"></span>
            {spawnDate}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllEventsItem;
