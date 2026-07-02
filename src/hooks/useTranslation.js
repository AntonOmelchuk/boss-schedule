import useAppStore from "../store/useAppStore";
import { LANGUAGES } from "../utils/constants";
import translations from "../utils/translations";

/**
 * Custom hook to manage multi-language UI translations.
 * Retrieves the localization state from the global Zustand store and returns the current language context.
 *
 * @returns {Object} Language context containing:
 *   - @property {Object} t - Dictionary of translated strings for the active language.
 *   - @property {string} language - The active language code ('ua' or 'en').
 *   - @property {Function} setLanguage - Action to update the active language in the store.
 */
const useTranslation = () => {
  // Retrieve the current language and action setter from the Zustand store
  const language = useAppStore((state) => state.language);
  const setLanguage = useAppStore((state) => state.setLanguage);

  // Return translation dictionary (with safe fallback to English), active language, and setLanguage method
  return {
    t: translations[language] || translations[LANGUAGES.EN],
    language,
    setLanguage,
  };
};

export default useTranslation;
