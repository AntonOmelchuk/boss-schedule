import { version } from "../../../package.json";
import useTranslation from "../../hooks/useTranslation";

const DeveloperCredits = () => {
  const { t } = useTranslation();
  return (
    <div
      className="bg-slate-950/60 rounded-xl p-3 border border-slate-800/80 flex items-center justify-between
        ext-xs"
    >
      <div className="flex items-center gap-2">
        <span className="text-slate-400">{t.createdBy}</span>
        <span className="px-2 py-0.5 rounded bg-amber-500/10 border border-amber-500/20 text-amber-400 font-bold">
          toBe
        </span>
      </div>
      <span className="text-slate-500 font-mono">v{version}</span>
    </div>
  );
};

export default DeveloperCredits;
