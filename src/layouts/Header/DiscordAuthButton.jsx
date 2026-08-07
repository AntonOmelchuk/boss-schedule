import { DISCORD_AUTH_URL } from "../../constants/auth";
import useTranslation from "../../hooks/useTranslation";

const DiscordAuthButton = () => {
  const { t } = useTranslation();

  return (
    <a
      href={DISCORD_AUTH_URL}
      className="flex items-center gap-2 bg-[#5865F2] hover:bg-[#4752C4] text-white font-bold
        text-xs px-3.5 py-2 rounded-xl shadow-lg shadow-[#5865F2]/20 transition transform active:scale-95"
    >
      <svg className="w-4 h-4 fill-current" viewBox="0 0 127.14 96.36">
        {/* eslint-disable-next-line max-len */}
        <path d="M107.7 8.07A105.15 105.15 0 0 0 81.47 0a72.06 72.06 0 0 0-3.36 6.83 97.68 97.68 0 0 0-29.11 0A72.37 72.37 0 0 0 45.64 0a105.89 105.89 0 0 0-26.25 8.09C2.79 32.65-1.71 56.6.54 80.21a105.73 105.73 0 0 0 32.17 16.15 77.7 77.7 0 0 0 6.89-11.11 68.42 68.42 0 0 1-10.85-5.18c.91-.66 1.8-1.34 2.66-2a75.57 75.57 0 0 0 64.32 0c.87.71 1.76 1.39 2.66 2a68.68 68.68 0 0 1-10.87 5.19 77 77 0 0 0 6.89 11.1 105.25 105.25 0 0 0 32.19-16.14c2.64-27.38-4.51-51.11-18.91-72.14zM42.45 65.69c-6.28 0-11.41-5.77-11.41-12.83 0-7.06 5.01-12.84 11.41-12.84 6.44 0 11.53 5.8 11.41 12.84 0 7.06-5.01 12.83-11.41 12.83zm42.24 0c-6.28 0-11.41-5.77-11.41-12.83 0-7.06 5.01-12.84 11.41-12.84 6.44 0 11.53 5.8 11.41 12.84 0 7.06-5.01 12.83-11.41 12.83z" />
      </svg>
      <span>{t.login}</span>
    </a>
  );
};

export default DiscordAuthButton;
