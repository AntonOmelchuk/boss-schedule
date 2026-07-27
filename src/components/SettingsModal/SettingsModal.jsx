import { useShallow } from "zustand/react/shallow";

import { version } from "../../../package.json";
import useTranslation from "../../hooks/useTranslation";
import useAppStore from "../../store/useAppStore";
import { LANGUAGES } from "../../utils/constants";
import Switch from "../UI/Switch";

const SettingsModal = ({ isOpen, onClose }) => {
  const { t, language, setLanguage } = useTranslation();

  const { defaultLeadTime, setDefaultLeadTime } = useAppStore(
    useShallow((state) => ({
      defaultLeadTime: state.defaultLeadTime,
      setDefaultLeadTime: state.setDefaultLeadTime,
    })),
  );

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm
      animate-fadeIn"
    >
      <div
        className="bg-slate-900 border border-slate-800 text-slate-200 rounded-2xl w-full max-w-md p-5
          shadow-2xl relative
          space-y-6"
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <h3 className="text-lg font-bold text-slate-100 flex items-center gap-2">
            <span>⚙️</span> {t.settingsTitle}
          </h3>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white text-xl font-bold p-1 rounded-lg hover:bg-slate-800
              transition-colors"
          >
            ✕
          </button>
        </div>

        {/* Section 1: Language Switcher */}
        <div className="flex items-center">
          <label className="text-left text-sm font-semibold text-slate-400 uppercase tracking-wider">
            {t.languageLabel}
          </label>
          <div className="flex ml-auto">
            <Switch
              onClick={() =>
                setLanguage(
                  language === LANGUAGES.UA ? LANGUAGES.EN : LANGUAGES.UA,
                )
              }
              firstItem="UA"
              secondItem="EN"
              isActive={language === LANGUAGES.UA}
            />
          </div>
        </div>

        {/* Section 2: Default Push Notification Lead Time Slider */}
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
              <span>5</span>
              <span>15</span>
              <span>30</span>
              <span>45</span>
              <span>60</span>
            </div>
          </div>
        </div>

        {/* Footer Close Button */}
        <div className="pt-2">
          <button
            onClick={onClose}
            className="w-full py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-sm rounded-xl
              transition-colors cursor-pointer"
          >
            {t.close}
          </button>
        </div>
        <span className="text-xs">version {version}</span>
      </div>
    </div>
  );
};

export default SettingsModal;
