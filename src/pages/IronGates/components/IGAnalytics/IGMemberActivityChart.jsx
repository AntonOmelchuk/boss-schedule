import { useMemo } from "react";

import BaseBarChart from "../../../../components/IGBaseBarChart/BaseBarChart";
import useTranslation from "../../../../hooks/useTranslation";
import { shuffleArray } from "../../../../utils/general";

const CustomTooltip = ({ active, payload }) => {
  const { t } = useTranslation();
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-slate-950/90 border border-slate-800 p-3 rounded-xl shadow-xl backdrop-blur-md">
        <p className="text-sm font-bold text-white mb-1">{data.name}</p>
        <p className="text-xs text-sky-400 font-semibold">
          {t.igAnalytics.attendedEvents}:{" "}
          <span className="font-extrabold">
            {data.attended_events} / {data.total_events}
          </span>
        </p>
        <p className="text-xs text-amber-400 font-semibold">
          {t.igAnalytics.attendanceRate}:{" "}
          <span className="font-extrabold">{data.attendance_pct}%</span>
        </p>
        <p className="text-xs text-emerald-400 font-semibold">
          {t.igAnalytics.maxStreak}:{" "}
          <span className="font-extrabold">{data.max_streak}</span>
        </p>
      </div>
    );
  }
  return null;
};

const IGMemberActivityChart = ({ membersAnalytics }) => {
  const { t } = useTranslation();

  const processedData = useMemo(() => {
    if (!membersAnalytics || membersAnalytics.length === 0) return [];
    return shuffleArray(
      membersAnalytics.map((item, index) => ({
        ...item,
        rank: index + 1,
        score: item.attended_events,
      })),
    );
  }, [membersAnalytics]);

  return (
    <BaseBarChart
      data={processedData}
      title={t.igAnalytics?.activityChartTitle}
      customTooltip={<CustomTooltip />}
      yAxisDomain={[0, "dataMax + 2"]}
    />
  );
};

export default IGMemberActivityChart;
