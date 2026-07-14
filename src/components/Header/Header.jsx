import { useNavigate } from "react-router-dom";

import logo from "../../assets/logo.png";
import useTranslation from "../../hooks/useTranslation";
import { LANGUAGES } from "../../utils/constants";
import Button from "../UI/Button";
import Switch from "../UI/Switch";

const Header = () => {
  const navigate = useNavigate();
  const { t, language, setLanguage } = useTranslation();

  return (
    <header className="text-center mb-8 flex justify-between">
      <img
        src={logo}
        alt="Iron Gates"
        className="h-16 w-16 md:h-20 md:w-20 object-contain
          border border-slate-600/50 rounded-full shadow-xl"
      />

      <div className="min-h-16 max-w-full">
        <h1
          className="hidden min-[444px]:block text-2xl md:text-3xl lg:text-4xl
          font-bold text-transparent [-webkit-text-stroke:1px_#94a3b8] tracking-widest px-4 text-center drop-shadow-md"
        >
          {t.title}
        </h1>
      </div>

      <div className="">
        <Switch
          onClick={() =>
            setLanguage(language === LANGUAGES.UA ? LANGUAGES.EN : LANGUAGES.UA)
          }
          firstItem="UA"
          secondItem="EN"
          isActive={language === LANGUAGES.UA}
        />
        <Button
          onClick={() => navigate("/schedule")}
          className="mt-3 hidden md:inline-flex"
        >
          <span className="uppercase font-bold">Schedule</span>
        </Button>
      </div>
    </header>
  );
};

export default Header;
