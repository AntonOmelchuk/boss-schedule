import { version } from "../../../package.json";
import { useIsPWA } from "../../hooks/useIsPWA";
import useTranslation from "../../hooks/useTranslation";
import AlertsSlider from "./AlertsSlider";
import LanguageSwitcher from "./LanguageSwitcher";

const SettingsModal = ({ isOpen, onClose }) => {
  const { t, setLanguage } = useTranslation();
  const isPWA = useIsPWA();

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
              transition-colors cursor-pointer"
          >
            ✕
          </button>
        </div>

        {/* Section 1: Language Switcher */}
        <LanguageSwitcher setLanguage={setLanguage} />

        {/* Section 2: Default Push Notification Lead Time Slider */}
        {isPWA && <AlertsSlider />}

        {/* Section 3: App & Developer Credits */}
        <div
          className="bg-slate-950/60 rounded-xl p-3 border border-slate-800/80 flex items-center justify-between
          text-xs"
        >
          <div className="flex items-center gap-2">
            <span className="text-slate-400">Created by</span>
            <span className="px-2 py-0.5 rounded bg-amber-500/10 border border-amber-500/20 text-amber-400 font-bold">
              toBe
            </span>
          </div>
          <span className="text-slate-500 font-mono">v{version}</span>
        </div>

        {/* Footer Close Button */}
        <div className="pt-1">
          <button
            onClick={onClose}
            className="w-full py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-sm rounded-xl
              transition-colors cursor-pointer"
          >
            {t.close}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SettingsModal;
