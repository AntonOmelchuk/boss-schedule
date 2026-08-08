import useTranslation from "../../../hooks/useTranslation";

const SelectNickname = ({ selectedChar, setSelectedChar, playerList }) => {
  const { t } = useTranslation();
  return (
    <select
      value={selectedChar}
      onChange={(e) => setSelectedChar(e.target.value)}
      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white
        focus:outline-none focus:border-amber-500 transition cursor-pointer"
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
  );
};

export default SelectNickname;
