import allyLogo from "../../../assets/ally-logo.png";
import useTranslation from "../../../hooks/useTranslation";

const Header = () => {
  const { t } = useTranslation();

  return (
    <div className="text-center space-y-2">
      <div
        className="inline-flex p-1 rounded-full
        border-amber-400/20"
      >
        <img src={allyLogo} className="w-30 rounded-full" />
      </div>
      <h2 className="text-xl font-bold text-white">
        {t.onboarding?.welcomeTitle}
      </h2>
      <p className="text-xs text-slate-400">{t.onboarding?.welcomeSubtitle}</p>
    </div>
  );
};

export default Header;
