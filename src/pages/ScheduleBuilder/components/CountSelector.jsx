import useTranslation from "../../../hooks/useTranslation";

const CountSelector = ({ limit, setLimit }) => {
  const { t } = useTranslation();

  return (
    <div
      className="flex items-center gap-2 bg-slate-950 border border-slate-800 rounded-xl px-3 py-2
      text-xs font-bold text-slate-400"
    >
      <span className="uppercase tracking-wider text-[12px] text-slate-300">
        {t.sbShowLimit}
      </span>
      <select
        value={limit}
        onChange={(e) => setLimit(Number(e.target.value))}
        className="bg-transparent text-slate-200 font-black outline-none cursor-pointer"
      >
        {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
          <option key={num} value={num} className="bg-slate-950 text-slate-200">
            {num}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CountSelector;
