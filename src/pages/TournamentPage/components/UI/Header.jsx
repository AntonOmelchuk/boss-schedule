import Button from "../../../../components/UI/Button";
import useTranslation from "../../../../hooks/useTranslation";

const Header = ({ tournament, canManage, handleResetTournament }) => {
  const { t } = useTranslation();

  return (
    <div
      className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex flex-wrap items-start
        justify-between gap-3 shadow-xl"
    >
      <div>
        <div className="flex items-start">
          <span
            className="text-[10px] font-black text-amber-400 uppercase tracking-widest bg-amber-500/10 border
            border-amber-500/20 px-2.5 py-0.5 rounded-full"
          >
            {tournament.type === "ROUND_ROBIN"
              ? t.tournament.typeRoundRobin
              : t.tournament.typeSingleElimination}
          </span>
        </div>
        <h2 className="text-xl font-black text-white mt-1">
          {tournament.title}
        </h2>
      </div>

      {canManage && (
        <Button
          onClick={handleResetTournament}
          className="bg-rose-500/10 border-rose-500/30 hover:bg-rose-500/20 text-rose-400 hover:text-rose-300"
        >
          {t.tournament.resetBtn}
        </Button>
      )}
    </div>
  );
};

export default Header;
