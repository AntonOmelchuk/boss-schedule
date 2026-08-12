import useTranslation from "../../hooks/useTranslation";

const SelectCP = ({ selectedCp, handleCpChange, loadingCps, cpList }) => {
  const { t } = useTranslation();
  return (
    <div>
      <label className="block text-xs font-bold text-slate-300 mb-1.5">
        {t.onboarding?.step1Label}
      </label>
      <select
        value={selectedCp}
        onChange={handleCpChange}
        disabled={loadingCps}
        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-white
          focus:outline-none focus:border-amber-500 transition cursor-pointer disabled:opacity-50"
        required
      >
        <option value="">{t.onboarding?.selectCpPlaceholder}</option>
        {cpList.map((cp) => {
          const cpName = typeof cp === "string" ? cp : cp.name || cp.id;
          return (
            <option key={cpName} value={cpName}>
              {cpName}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default SelectCP;
