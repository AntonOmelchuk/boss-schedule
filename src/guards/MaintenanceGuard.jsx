import useTranslation from "../hooks/useTranslation";

/**
 * MaintenanceGuard component
 * Blocks user interaction when global or specific route maintenance is active in Firebase.
 */
const MaintenanceGuard = ({ maintenanceStatus, children }) => {
  const { t } = useTranslation();

  return (
    <>
      {/* Maintenance Overlay Window */}
      {maintenanceStatus && (
        <div
          className="fixed inset-0 z-[99999] flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-xl
          animate-fade-in select-none"
        >
          <div
            className="bg-slate-900 border border-amber-500/30 rounded-3xl p-8 max-w-lg w-full shadow-2xl
            shadow-amber-500/10 flex flex-col items-center text-center gap-6 relative overflow-hidden"
          >
            {/* Top accent line */}
            <div
              className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-amber-500 via-yellow-400
              to-amber-500 animate-pulse"
            />

            {/* Icon */}
            <div
              className="w-20 h-20 rounded-2xl bg-slate-950 border border-amber-500/20 flex items-center justify-center
              text-4xl shadow-inner shadow-amber-500/5"
            >
              🛠️
            </div>

            {/* Translation Text Content */}
            <div className="flex flex-col gap-2">
              <div
                className="inline-block px-3 py-1 font-black tracking-widest text-amber-400 bg-amber-500/10 border
                border-amber-500/20 rounded-full uppercase self-center animate-pulse"
              >
                <span className="w-2 h-2 rounded-full bg-amber-500 animate-ping" />
                {t.maintenance.title}
              </div>
              <p className="text-sm font-medium text-slate-300 leading-relaxed">
                {t.maintenance.subtitle}
              </p>
              <p className="text-xs text-slate-400 leading-relaxed mt-1">
                {t.maintenance.description}
              </p>
            </div>
          </div>
        </div>
      )}

      <div
        className={
          maintenanceStatus ? "pointer-events-none select-none blur-sm" : ""
        }
      >
        {children}
      </div>
    </>
  );
};

export default MaintenanceGuard;
