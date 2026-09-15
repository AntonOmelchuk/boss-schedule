import { useEffect, useMemo } from "react";

import BaseBarChart from "../../../../components/IGBaseBarChart/BaseBarChart";
import useTranslation from "../../../../hooks/useTranslation";
import useIGMembers from "../../../../store/useIGMembers";

const CustomTooltip = ({ active, payload }) => {
  const { t } = useTranslation();
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-slate-950/90 border border-slate-800 p-3 rounded-xl shadow-xl backdrop-blur-md">
        <p className="text-sm font-bold text-white mb-1">{data.name}</p>
        <p className="text-xs text-indigo-400 font-semibold">
          {t.igAnalytics.pvpChartTooltipLabel}:{" "}
          <span className="font-extrabold">{data.pvp}</span>
        </p>
      </div>
    );
  }
  return null;
};

const IGMemberPvpChart = () => {
  const { t } = useTranslation();
  const { members, fetchMembers } = useIGMembers();

  useEffect(() => {
    fetchMembers();
  }, [fetchMembers]);

  const processedData = useMemo(() => {
    if (!members?.length) return [];

    return [...members]
      .filter((member) => member.pvp > 100)
      .map((member, index) => ({
        name: member.name,
        pvp: Number(member.pvp) || 0,
        rank: index + 1,
        score: Number(member.pvp) || 0,
      }));
  }, [members]);

  if (processedData.length === 0) return null;

  return (
    <BaseBarChart
      data={processedData}
      title={t.igAnalytics.pvpChartTitle}
      subtitle={t.igAnalytics.pvpChartSubtitle}
      customTooltip={<CustomTooltip />}
      yAxisDomain={[0, "auto"]}
    />
  );
};

export default IGMemberPvpChart;
