import CountUp from "../../../../components/lightswind/count-up";
import { cn } from "../../../../utils/general";

const StatCard = ({
  title,
  value,
  unit,
  unitClassName,
  icon: Icon,
  colorClass = "purple",
  footerIcon: FooterIcon,
  footerLabel,
  footerValue,
  footerUnit,
  footerHighlight = false,
  highlight = false,
  countUpDuration = 3,
  countUpDecimals = 0,
  footerCountUpDecimals = 0,
  preventCountUp = false,
}) => {
  const colors = {
    purple: "text-purple-400 bg-purple-500/10 border-purple-500/20",
    amber: "text-amber-400 bg-amber-500/10 border-amber-500/20",
    indigo: "text-indigo-400 bg-indigo-500/10 border-indigo-500/20",
    emerald: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
  };

  const numericValue =
    typeof value === "string" ? parseFloat(value.replace(/,/g, "")) : value;

  const isNumeric =
    typeof numericValue === "number" &&
    !isNaN(numericValue) &&
    value !== null &&
    value !== undefined &&
    typeof value !== "boolean";

  const numericFooterValue =
    typeof footerValue === "string"
      ? parseFloat(footerValue.replace(/,/g, ""))
      : footerValue;

  const isFooterNumeric =
    typeof numericFooterValue === "number" &&
    !isNaN(numericFooterValue) &&
    footerValue !== null &&
    footerValue !== undefined &&
    typeof footerValue !== "boolean";

  const footerTextStyle = footerHighlight
    ? "text-amber-400 font-bold"
    : "text-slate-500";

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
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xl text-slate-400 uppercase font-semibold">
            {title}
          </p>
          <h3 className="text-2xl font-bold text-white mt-1 flex items-baseline gap-1.5">
            {isNumeric ? (
              <CountUp
                value={numericValue}
                duration={countUpDuration}
                decimals={countUpDecimals}
                className="text-2xl font-bold text-white"
                numberClassName="text-2xl font-bold text-white"
                triggerOnView={true}
              />
            ) : (
              <span>{value}</span>
            )}
            {unit && (
              <span
                className={cn(
                  "text-xl text-slate-400 font-normal",
                  unitClassName,
                )}
              >
                {unit}
              </span>
            )}
          </h3>
        </div>
        <div
          className={cn(
            "w-15 h-15 rounded-xl border flex items-center justify-center",
            colors[colorClass] || colors.purple,
          )}
        >
          <Icon className="w-10 h-10" />
        </div>
      </div>

      {(footerLabel || footerValue !== undefined || footerUnit) && (
        <div className="mt-3 text-xl text-slate-400 flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            {FooterIcon && <FooterIcon className="w-9 h-9 text-amber-400" />}
            {footerLabel && <span>{footerLabel}</span>}
          </div>
          {(footerValue !== undefined && footerValue !== null) || footerUnit ? (
            <div className={cn("flex items-baseline gap-1", footerTextStyle)}>
              {isFooterNumeric && !preventCountUp ? (
                <CountUp
                  value={numericFooterValue}
                  duration={countUpDuration}
                  decimals={footerCountUpDecimals}
                  className={footerTextStyle}
                  numberClassName={footerTextStyle}
                  triggerOnView={true}
                />
              ) : (
                <span>{footerValue}</span>
              )}
              {footerUnit && <span>{footerUnit}</span>}
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
};

export default StatCard;
