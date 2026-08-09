import useTranslation from "../../../hooks/useTranslation";

const AmountBadge = ({ cpsCount, playersCount }) => {
  const { t } = useTranslation();

  return (
    <span
      className="text-sm font-mono font-bold bg-amber-500/10 text-amber-400 border
      border-amber-500/20 px-2 py-0.5 rounded"
    >
      {cpsCount} {t.cps.cpsCount} | {playersCount} {t.cps.playersCount}
    </span>
  );
};

export default AmountBadge;
