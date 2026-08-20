import { cn } from "../../../../utils/general";

const StatCard = ({
  title,
  value,
  unit,
  icon: Icon,
  colorClass = "purple",
  footerIcon: FooterIcon,
  footerLabel,
  footerValue,
  footerHighlight = false,
  highlight = false,
}) => {
  const colors = {
    purple: "text-purple-400 bg-purple-500/10 border-purple-500/20",
    amber: "text-amber-400 bg-amber-500/10 border-amber-500/20",
    indigo: "text-indigo-400 bg-indigo-500/10 border-indigo-500/20",
    emerald: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
  };

  return (
    <div
      className={cn(
        "bg-slate-900/60 border rounded-2xl p-5 backdrop-blur-md shadow-lg relative overflow-hidden",
        "transition-all group",
        highlight
          ? "border-amber-500/30 from-amber-500/10 bg-gradient-to-br"
          : "border-slate-800/80 hover:border-amber-500/40",
      )}
    >
      {/* Шапка картки */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs text-slate-400 uppercase font-semibold">
            {title}
          </p>
          <h3 className="text-2xl font-bold text-white mt-1">
            {value}{" "}
            <span className="text-xs text-slate-400 font-normal">{unit}</span>
          </h3>
        </div>
        <div
          className={cn(
            "w-10 h-10 rounded-xl border flex items-center justify-center",
            colors[colorClass] || colors.purple,
          )}
        >
          <Icon className="w-5 h-5" />
        </div>
      </div>

      {/* Футер картки */}
      {(footerLabel || footerValue) && (
        <div className="mt-3 text-xs text-slate-400 flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            {FooterIcon && (
              <FooterIcon className="w-3.5 h-3.5 text-amber-400" />
            )}
            <span>{footerLabel}</span>
          </div>
          {footerValue && (
            <span
              className={cn(
                footerHighlight ? "text-amber-400 font-bold" : "text-slate-500",
              )}
            >
              {footerValue}
            </span>
          )}
        </div>
      )}
    </div>
  );
};

export default StatCard;
