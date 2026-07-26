import AlertIcon from "../../../../components/SVG/AlertIcon";
import useTranslation from "../../../../hooks/useTranslation";

const AlertButton = ({ handleBellClick, isAlertActive, leadTimeMinutes }) => {
  const { t } = useTranslation();

  const activeStyles = isAlertActive
    ? "bg-amber-500/20 border-amber-500/50 text-amber-400 shadow-lg shadow-amber-500/10 scale-105"
    : "bg-slate-800/40 border-slate-700/50 text-slate-500 hover:text-slate-300 hover:bg-slate-800";

  return (
    <button
      onClick={handleBellClick}
      className={`absolute top-3 right-3 p-1.5 rounded-lg border transition-all duration-300 flex items-center gap-1
        ${activeStyles}`}
    >
      {/* Bell Icon */}
      <AlertIcon isAlertActive={isAlertActive} />

      {/* Lead Time Badge */}
      {isAlertActive && (
        <span className="text-[10px] font-bold text-amber-400 pr-0.5">
          {leadTimeMinutes}
          {t.m}
        </span>
      )}
    </button>
  );
};

export default AlertButton;
