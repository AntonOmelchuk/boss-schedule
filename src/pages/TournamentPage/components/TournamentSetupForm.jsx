import Button from "../../../components/UI/Button";
import useTranslation from "../../../hooks/useTranslation";

const TournamentSetupForm = ({
  tournamentTitle,
  setTournamentTitle,
  tournamentType,
  setTournamentType,
  cpList,
  selectedCps,
  handleToggleCp,
  handleSelectAllCps,
  handleDeselectAllCps,
  handleStartTournament,
  isAllSelected,
}) => {
  const { t } = useTranslation();

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6 shadow-2xl max-w-7xl mx-auto">
      <h2 className="text-base font-bold text-white border-b border-slate-800 pb-3 flex items-center gap-2">
        <span>🚀</span> {t.tournament.setupTitle}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold text-slate-300 mb-1.5">
            {t.tournament?.tournamentTitleLabel}
          </label>
          <input
            type="text"
            value={tournamentTitle}
            onChange={(e) => setTournamentTitle(e.target.value)}
            placeholder={t.tournament?.tournamentTitlePlaceholder}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white
              focus:outline-none focus:border-amber-500"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-300 mb-1.5">
            {t.tournament?.typeLabel}
          </label>
          <select
            value={tournamentType}
            onChange={(e) => setTournamentType(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white
              focus:outline-none focus:border-amber-500 cursor-pointer"
          >
            <option value="ROUND_ROBIN">{t.tournament.typeRoundRobin}</option>
            <option value="SINGLE_ELIMINATION">
              {t.tournament.typeSingleElimination}
            </option>
          </select>
        </div>
      </div>

      {/* Bulk Select CPs */}
      <div className="space-y-2">
        <div className="flex items-center justify-between gap-2 flex-wrap">
          <label className="block text-xs font-bold text-slate-300">
            {t.tournament.selectCpsLabel} ({selectedCps.length} /{" "}
            {cpList.length})
          </label>

          <div className="flex items-center gap-2">
            <Button
              onClick={handleSelectAllCps}
              disabled={isAllSelected}
              className="py-1 px-2.5 text-[11px] text-amber-400 border-amber-500/20 hover:border-amber-500/50"
            >
              ✓ {t.loot.selectAll}
            </Button>
            <span className="text-slate-700 text-xs">•</span>
            <Button
              onClick={handleDeselectAllCps}
              disabled={selectedCps.length === 0}
              className="py-1 px-2.5 text-[11px] text-rose-400 border-rose-500/20 hover:border-rose-500/50
                hover:text-rose-300"
            >
              ✕ {t.loot.deselectAll}
            </Button>
          </div>
        </div>

        <div
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 max-h-80 overflow-y-auto p-2 bg-slate-950
            border border-slate-800 rounded-xl"
        >
          {cpList.map((cp) => (
            <label
              key={cp}
              className="flex items-center gap-2 p-2 rounded-lg bg-slate-900 border border-slate-800/80
                cursor-pointer hover:border-amber-500/50 transition"
            >
              <input
                type="checkbox"
                checked={selectedCps.includes(cp)}
                onChange={() => handleToggleCp(cp)}
                className="accent-amber-500 cursor-pointer"
              />
              <span className="text-xs font-bold text-slate-200 truncate">
                {cp}
              </span>
            </label>
          ))}
        </div>
      </div>

      <Button
        onClick={handleStartTournament}
        disabled={selectedCps.length < 2}
        className="w-full justify-center py-3 bg-amber-500 hover:bg-amber-600 border-amber-400 text-slate-950
          hover:text-slate-950 font-black disabled:bg-slate-800 disabled:text-slate-500 disabled:border-slate-700"
      >
        {t.tournament.startBtn}
      </Button>
    </div>
  );
};
export default TournamentSetupForm;
