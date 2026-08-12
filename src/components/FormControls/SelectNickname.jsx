// src/components/FormControls/SelectNickname.jsx
import { useState } from "react";

import useTranslation from "../../hooks/useTranslation";

/**
 * Reusable Nickname Selector component that allows choosing from a list
 * or manually entering a custom character name.
 */
const SelectNickname = ({
  selectedChar,
  setSelectedChar,
  playerList = [],
  isDisabled = false,
}) => {
  const { t } = useTranslation();
  const [isCustomMode, setIsCustomMode] = useState(false);

  const handleModeToggle = () => {
    setIsCustomMode((prev) => !prev);
    setSelectedChar(""); // Clear selected value on mode switch
  };

  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between">
        <label className="block text-xs font-bold text-slate-300">
          {t.afkChecker?.nicknameLabel || t.onboarding?.step2Label}
        </label>
        <button
          type="button"
          onClick={handleModeToggle}
          disabled={isDisabled}
          className="text-[11px] text-amber-400 hover:text-amber-300 transition cursor-pointer disabled:opacity-50"
        >
          {isCustomMode
            ? t.afkChecker?.selectFromListBtn
            : t.afkChecker?.typeManuallyBtn}
        </button>
      </div>

      {isCustomMode ? (
        <input
          type="text"
          value={selectedChar}
          onChange={(e) => setSelectedChar(e.target.value)}
          placeholder={t.afkChecker?.customNamePlaceholder}
          disabled={isDisabled}
          className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white
            focus:outline-none focus:border-amber-500 transition disabled:opacity-50 font-medium"
          required
        />
      ) : (
        <select
          value={selectedChar}
          onChange={(e) => setSelectedChar(e.target.value)}
          disabled={isDisabled}
          className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-white
            focus:outline-none focus:border-amber-500 transition cursor-pointer disabled:opacity-50"
          required
        >
          <option value="">{t.onboarding?.selectCharPlaceholder}</option>
          {playerList.length > 0 ? (
            playerList.map((player) => (
              <option key={player} value={player}>
                {player}
              </option>
            ))
          ) : (
            <option value="" disabled>
              {t.onboarding?.noPlayersFound}
            </option>
          )}
        </select>
      )}
    </div>
  );
};

export default SelectNickname;
