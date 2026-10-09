import BaseBarChart from "../../../../components/IGBaseBarChart/BaseBarChart";
import useTranslation from "../../../../hooks/useTranslation";

const CustomTooltip = ({ active, payload, label }) => {
  const { t } = useTranslation();
  const {
    dashboard: { chart },
  } = t;

  if (active && payload && payload.length) {
    return (
      <div className="bg-slate-950/90 border border-slate-800 p-3 rounded-xl shadow-xl backdrop-blur-md">
        <p className="text-sm font-bold text-white mb-1">{label}</p>
        <p className="text-xs text-amber-400 font-semibold">
          {chart.visitedEvents}{" "}
          <span className="font-extrabold">{payload[0].value}</span> / 30
        </p>
      </div>
    );
  }
  return null;
};

const ActivityChart = ({ data }) => {
  const { t } = useTranslation();
  const {
    dashboard: { chart },
  } = t;

  return (
    <BaseBarChart
      data={data}
      title={chart.title}
      subtitle={chart.subtitle}
      customTooltip={<CustomTooltip />}
      yAxisDomain={[0, 10]}
    />
  );
};

export default ActivityChart;
