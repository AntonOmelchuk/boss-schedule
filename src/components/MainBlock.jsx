import { formatRemaining } from "../utils/general";

const MainBlock = ({ t, nearestBoss, now }) => {
  return (
    <div className="relative mb-10 rounded-xl p-[2px] overflow-hidden shadow-2xl">
      {/* Анімований фон, що обертається (градієнтний ефект бордера) */}
      <div className="absolute inset-[-150%] bg-[conic-gradient(from_90deg_at_50%_50%,#0f172a_0%,#f59e0b_50%,#dc2626_75%,#0f172a_100%)] animate-[spin_4s_linear_infinite]"></div>

      {/* Внутрішній блок, який перекриває центр (залишається лише яскрава рамка) */}
      <div className="bg-slate-800/95 backdrop-blur-xl rounded-xl p-6 relative z-10 flex flex-col items-center justify-center w-full h-full">
        <h2 className="text-slate-400 uppercase tracking-widest text-xs font-bold mb-3 text-center drop-shadow">
          {t.nearest}
        </h2>

        <div className="text-4xl mb-2 drop-shadow-lg">
          {nearestBoss ? nearestBoss.icon : "⚔️"}
        </div>
        <div className="text-3xl md:text-4xl font-bold text-amber-400 mb-2 text-center drop-shadow-md">
          {nearestBoss ? nearestBoss.name : t.allAlive}
        </div>

        <div
          className={`text-5xl md:text-6xl font-mono tracking-widest drop-shadow-lg font-bold ${nearestBoss ? "text-white" : "text-green-500 animate-pulse"}`}
        >
          {nearestBoss
            ? formatRemaining(nearestBoss.ts - now, false, t)
            : "00:00:00"}
        </div>
      </div>
    </div>
  );
};

export default MainBlock;
