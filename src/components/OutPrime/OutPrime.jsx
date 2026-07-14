import useTranslation from "../../hooks/useTranslation";

const OutPrime = ({ withoutBorder }) => {
  const { t } = useTranslation();

  return (
    <div className="flex items-center">
      <span
        className={`shrink-0 text-[9px] font-black tracking-widest text-emerald-400 uppercase transition-all ${
          withoutBorder
            ? "px-0 py-0 pt-1 bg-transparent border-none text-[12px]"
            : "px-1.5 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20"
        }`}
      >
        {t.outPrime}
      </span>
    </div>
  );
};

export default OutPrime;
