const SummaryCard = ({
  title,
  icon,
  value,
  valueUnit,
  subtext,
  valueColor = "text-sky-400",
}) => {
  return (
    <div
      className="bg-slate-900/30 backdrop-blur-md border border-slate-800
      rounded-2xl p-5 shadow-xl flex flex-col justify-between"
    >
      <div className="flex justify-between items-start">
        <span className="text-xl font-semibold text-slate-400 uppercase tracking-wider">
          {title}
        </span>
        <span className="text-base">{icon}</span>
      </div>
      <div className="mt-2">
        <div className={`text-4xl font-extrabold ${valueColor} truncate`}>
          {value}{" "}
          {valueUnit && (
            <span className="text-xl font-normal text-slate-400">
              {valueUnit}
            </span>
          )}
        </div>
        <div className="text-xs text-slate-400 mt-1 truncate">{subtext}</div>
      </div>
    </div>
  );
};

export default SummaryCard;
