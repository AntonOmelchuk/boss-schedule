import { useShallow } from "zustand/shallow";

import useTranslation from "../../hooks/useTranslation";
import useAppStore from "../../store/useAppStore";

const SLIDER_VALUES = [5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60];

const AlertsSlider = () => {
  const { defaultLeadTime, setDefaultLeadTime } = useAppStore(
    useShallow((state) => ({
      defaultLeadTime: state.defaultLeadTime,
      setDefaultLeadTime: state.setDefaultLeadTime,
    })),
  );
  const { t } = useTranslation();

  return (
    <div className="space-y-3 border-t border-slate-800/80 pt-4">
      <div className="flex justify-between items-center">
        <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
          {t.pushLeadTimeLabel}
        </label>
        <span
          className="text-sm font-black text-amber-400 bg-amber-500/10 border border-amber-500/20
            px-2.5 py-1 rounded-lg"
        >
          {defaultLeadTime} {t.minutesShort || "хв"}
        </span>
      </div>

      <p className="text-xs text-slate-400 leading-relaxed">
        {t.pushLeadTimeDesc}
      </p>

      {/* Range Slider Control */}
      <div className="pt-2 space-y-2">
        <input
          type="range"
          min="5"
          max="60"
          step="5"
          value={defaultLeadTime}
          onChange={(e) => setDefaultLeadTime(Number(e.target.value))}
          className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-500
            focus:outline-none focus:ring-2 focus:ring-amber-500/30"
        />

        {/* Ticks Label */}
        <div className="flex justify-between text-[10px] text-slate-500 font-bold px-1">
          {SLIDER_VALUES.map((item) => (
            <span key={item}>{item}</span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AlertsSlider;
