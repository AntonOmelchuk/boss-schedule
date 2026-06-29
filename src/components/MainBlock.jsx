import { formatRemaining } from "../utils/general";

const MainBlock = ({ t, nearestEvent, now }) => {
  // Допоміжна функція конфігурації дипломатичних стилів
  // Текст залишається білим, але отримує м'яке неонове світіння кольору статусу
  const getDiplomacyConfig = (rel) => {
    if (rel === "enemy") {
      return {
        gradientStyle:
          "conic-gradient(from 90deg at 50% 50%, #0f172a 0%, #ef4444 50%, #7f1d1d 75%, #0f172a 100%)",
        timerClass: "text-slate-100 drop-shadow-[0_0_15px_rgba(239,68,68,0.4)]",
        titleClass:
          "text-slate-100 drop-shadow-[0_2px_8px_rgba(239,68,68,0.35)]",
        badgeIcon: "💀",
        badgeClass: "bg-red-500/10 text-red-400 border-red-500/20",
      };
    }

    if (rel === "alliance") {
      return {
        gradientStyle:
          "conic-gradient(from 90deg at 50% 50%, #0f172a 0%, #10b981 50%, #064e3b 75%, #0f172a 100%)",
        timerClass:
          "text-slate-100 drop-shadow-[0_0_15px_rgba(16,185,129,0.4)]",
        titleClass:
          "text-slate-100 drop-shadow-[0_2px_8px_rgba(16,185,129,0.35)]",
        badgeIcon: "🛡️",
        badgeClass: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
      };
    }

    // Дефолтний / Нейтральний статус (Золотий)
    return {
      gradientStyle:
        "conic-gradient(from 90deg at 50% 50%, #0f172a 0%, #f59e0b 50%, #78350f 75%, #0f172a 100%)",
      timerClass: "text-slate-100 drop-shadow-[0_0_15px_rgba(245,158,11,0.4)]",
      titleClass:
        "text-slate-100 drop-shadow-[0_2px_8px_rgba(245,158,11,0.35)]",
      badgeIcon: "👑",
      badgeClass: "bg-amber-500/10 text-amber-400 border-amber-500/20",
    };
  };

  // Отримуємо relation події
  const status = nearestEvent?.relation || "neutral";
  const config = getDiplomacyConfig(status);

  const { gradientStyle, timerClass, titleClass, badgeClass, badgeIcon } =
    config;

  return (
    <div className="relative mb-10 rounded-xl p-0.5 overflow-hidden shadow-2xl">
      {/* Динамічна рамка, що крутиться під колір дипломатії */}
      <div
        className="absolute inset-[-150%] animate-spin"
        style={{
          backgroundImage: gradientStyle,
          animationDuration: "4s",
        }}
      />

      {/* Внутрішній вміст картки */}
      <div
        className="bg-slate-900/95 backdrop-blur-xl rounded-xl p-6 relative z-10 flex flex-col
        items-center justify-center w-full h-full"
      >
        <h2 className="text-slate-400 uppercase tracking-widest text-xs font-bold mb-3 text-center drop-shadow">
          {t.nearestEvent}
        </h2>

        {/* Велика іконка івенту */}
        <div className="text-5xl mb-2 drop-shadow-lg scale-110 duration-300 hover:scale-125 transition-transform">
          {nearestEvent ? nearestEvent.icon : "⚔️"}
        </div>

        {/* Назва івенту */}
        <div
          className={`text-3xl md:text-4xl font-black mb-1 text-center capitalize ${titleClass}`}
        >
          {nearestEvent?.name || "⚔️"}
        </div>

        {/* Бейдж власника (якщо є) */}
        {nearestEvent?.owner && (
          <div className="mb-4">
            <span
              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black uppercase
              tracking-wider border shadow-md animate-pulse ${badgeClass}`}
            >
              {badgeIcon} {nearestEvent.owner}
            </span>
          </div>
        )}

        {/* Таймер зворотного відліку */}
        <div
          className={`text-5xl md:text-6xl font-mono tracking-widest font-black ${timerClass}`}
        >
          {nearestEvent
            ? formatRemaining(nearestEvent.ts - now, false, t)
            : "00:00:00"}
        </div>
      </div>
    </div>
  );
};

export default MainBlock;
