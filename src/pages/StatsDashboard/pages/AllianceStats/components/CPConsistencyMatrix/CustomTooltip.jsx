import useTranslation from "../../../../../../hooks/useTranslation";

const CustomTooltip = ({ active, payload }) => {
  const { t } = useTranslation();

  if (!active || !payload || !payload.length) return null;

  const data = payload[0].payload;

  return (
    <div
      className="bg-slate-900/95 border border-slate-700/80 p-3.5 rounded-xl shadow-2xl
      backdrop-blur-md text-slate-100 min-w-52"
    >
      <div className="font-bold text-sm text-sky-400 border-b border-slate-700/60 pb-1 mb-2">
        {data.cpName}
      </div>
      <div className="flex flex-col gap-1.5 text-xs">
        <div className="flex justify-between">
          <span className="text-slate-400">
            {t.cpConsistencyMatrix.attendanceRate}
          </span>
          <span className="font-bold text-emerald-400">
            {data.attendanceRate}%
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-slate-400">
            {t.cpConsistencyMatrix.eventsAttended}
          </span>
          <span className="font-semibold text-slate-200">
            {data.attendedEvents} / {data.totalEvents}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-slate-400">
            {t.cpConsistencyMatrix.avgPartyOnline}
          </span>
          <span className="font-semibold text-amber-400">
            ~{data.avgOnline} {t.cpConsistencyMatrix.playersSuffix}
          </span>
        </div>
      </div>
    </div>
  );
};

export default CustomTooltip;
