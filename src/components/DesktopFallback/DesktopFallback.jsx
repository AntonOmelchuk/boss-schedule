import BackButton from "../UI/BackButton";

/**
 * Modern Fallback UI component shown when a page requires a desktop screen width (1280px+).
 */
const DesktopFallback = () => {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center p-6 gap-6">
      {/* Visual Badge Icon */}
      <div className="relative flex items-center justify-center">
        <div
          className="w-20 h-20 rounded-3xl bg-slate-900 border border-slate-800 flex items-center
          justify-center text-4xl shadow-xl"
        >
          🖥️
        </div>
        <span
          className="absolute -bottom-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full
        bg-amber-500/20 text-amber-400 border border-amber-500/40 text-xs font-bold"
        >
          !
        </span>
      </div>

      {/* Text Info */}
      <div className="flex flex-col gap-2 max-w-sm">
        <h2 className="text-2xl font-bold text-slate-100 tracking-tight">
          Desktop Only Page
        </h2>
        <p className="text-sm text-slate-400 leading-relaxed">
          This page contains complex schedules and detailed stats optimized
          exclusively for screen widths of{" "}
          <span className="text-amber-400 font-semibold">1280px+</span>.
        </p>
      </div>

      {/* Action Button */}
      <BackButton />
    </div>
  );
};

export default DesktopFallback;
