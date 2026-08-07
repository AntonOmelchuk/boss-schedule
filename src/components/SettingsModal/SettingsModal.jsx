import { version } from "../../../package.json";
import { DISCORD_AUTH_URL } from "../../constants/auth";
import { useIsPWA } from "../../hooks/useIsPWA";
import useTranslation from "../../hooks/useTranslation";
import useAuthStore from "../../store/useAuthStore";
import AlertsSlider from "./AlertsSlider";
import LanguageSwitcher from "./LanguageSwitcher";

const SettingsModal = ({ isOpen, onClose }) => {
  const { t, setLanguage } = useTranslation();
  const isPWA = useIsPWA();
  const { user, isAuthenticated, logout } = useAuthStore();

  const isSetupComplete =
    user?.is_setup_complete ||
    (Boolean(user?.char_name) && Boolean(user?.cp_name));

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm
      animate-fadeIn"
    >
      <div
        className="bg-slate-900 border border-slate-800 text-slate-200 rounded-2xl w-full max-w-md p-5
          shadow-2xl relative space-y-5 max-h-[90vh] overflow-y-auto"
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

        {/* Section 1: User Profile Block */}
        {isAuthenticated && user ? (
          <div className="bg-slate-950/70 border border-slate-800/90 rounded-xl p-3.5 space-y-3">
            {/* Discord Info Header */}
            <div className="flex items-center justify-between border-b border-slate-800/60 pb-2.5">
              <div className="flex items-center gap-3">
                <img
                  src={
                    user.avatar_url ||
                    "https://cdn.discordapp.com/embed/avatars/0.png"
                  }
                  alt="Avatar"
                  className="w-10 h-10 rounded-full border border-amber-500/40"
                />
                <div className="flex flex-col">
                  <span className="text-sm text-left font-bold text-amber-400">
                    {user.char_name || user.username}
                  </span>
                </div>
              </div>

              {/* Logout Button */}
              <button
                onClick={logout}
                className="px-2.5 py-1 bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20
                  rounded-lg text-xs font-semibold transition cursor-pointer"
              >
                {t.logout}
              </button>
            </div>

            {/* Fixed Read-only Profile Info */}
            {isSetupComplete && (
              <div
                className="bg-slate-900/80 border border-slate-800/80 rounded-lg p-2.5 flex items-center
                  justify-between"
              >
                <div>
                  <span className="text-xs text-slate-400 uppercase tracking-wider">
                    {t.cpNameLabel}
                  </span>
                </div>
                <div>
                  <span className="text-sm font-bold text-slate-200">
                    {user.cp_name || "—"}
                  </span>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="bg-slate-950/70 border border-slate-800/90 rounded-xl p-4 text-center space-y-3">
            <p className="text-xs text-slate-400">{t.loginDescription}</p>
            <a
              href={DISCORD_AUTH_URL}
              className="inline-flex items-center justify-center gap-2 w-full py-2 bg-[#5865F2]
                hover:bg-[#4752C4] text-white font-bold text-xs rounded-xl shadow-lg shadow-[#5865F2]/20 transition"
            >
              {t.loginViaDiscord}
            </a>
          </div>
        )}

        {/* Section 2: Language Switcher */}
        <LanguageSwitcher setLanguage={setLanguage} />

        {/* Section 3: Default Push Notification Lead Time Slider */}
        {!isPWA && <AlertsSlider />}

        {/* Section 4: App & Developer Credits */}
        <div
          className="bg-slate-950/60 rounded-xl p-3 border border-slate-800/80 flex items-center justify-between
          text-xs"
        >
          <div className="flex items-center gap-2">
            <span className="text-slate-400">{t.createdBy}</span>
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
