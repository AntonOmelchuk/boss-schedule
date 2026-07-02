import logo from "../../assets/logo.png";
import useTranslation from "../../hooks/useTranslation";
import { LANGUAGES } from "../../utils/constants";
import Switch from "../UI/Switch";

const Header = () => {
  const { t, language, setLanguage } = useTranslation();

  return (
    <header className="text-center mb-8 relative flex justify-center">
      <img
        src={logo}
        alt="Iron Gates"
        className="absolute left-0 top-0 h-16 w-16 md:h-20 md:w-20 object-contain
          border border-slate-600/50 rounded-full shadow-xl"
      />
      <Switch
        onClick={() =>
          setLanguage(language === LANGUAGES.UA ? LANGUAGES.EN : LANGUAGES.UA)
        }
        firstItem="UA"
        secondItem="EN"
        isActive={language === LANGUAGES.UA}
      />

      <div className="min-h-16 max-w-full">
        <h1
          className="hidden min-[444px]:block text-2xl md:text-3xl lg:text-4xl
          font-bold text-transparent [-webkit-text-stroke:1px_#94a3b8] tracking-widest px-4 text-center drop-shadow-md"
        >
          {t.title}
        </h1>
      </div>
    </header>
  );
};

export default Header;
