import { LANGUAGES } from "../../constants/general";
import useTranslation from "../../hooks/useTranslation";
import Switch from "../UI/Switch";

const LanguageSwitcher = ({ withoutLabel }) => {
  const { t, language, setLanguage } = useTranslation();
  return (
    <div className="flex items-center">
      {!withoutLabel && (
        <label className="text-left text-sm font-semibold text-slate-400 uppercase tracking-wider">
          {t.languageLabel}
        </label>
      )}
      <div className="flex ml-auto">
        <Switch
          onClick={() =>
            setLanguage(language === LANGUAGES.UA ? LANGUAGES.EN : LANGUAGES.UA)
          }
          firstItem={LANGUAGES.UA}
          secondItem={LANGUAGES.EN}
          isActive={language === LANGUAGES.UA}
        />
      </div>
    </div>
  );
};

export default LanguageSwitcher;
