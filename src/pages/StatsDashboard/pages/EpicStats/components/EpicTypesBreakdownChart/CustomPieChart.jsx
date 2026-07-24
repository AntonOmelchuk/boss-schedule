import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

import useMediaQuery from "../../../../../../hooks/useMediaQuery";
import { BREAKPOINTS } from "../../../../../../utils/constants";
import CustomLabel from "./CustomLabel";
import CustomPieTooltip from "./CustomTooltip";

const CustomPieChart = ({ chartData, totalFarmed }) => {
  const isDesktop = useMediaQuery(BREAKPOINTS.IS_DESKTOP);

  return (
    <div className="w-full lg:w-1/2 flex flex-1 xl:flex-none flex-col items-center">
      <h3 className="text-base font-bold text-slate-100 mb-2 self-start">
        Epic Bosses Share (%)
      </h3>
      <p className="text-xs text-slate-400 mb-4 self-start">
        Distribution ratio of all farmed epic items
      </p>

      <div className="w-full h-75 relative">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              innerRadius={isDesktop ? 90 : 60}
              outerRadius={isDesktop ? 140 : 90}
              paddingAngle={3}
              stroke="none"
              label={<CustomLabel />}
              labelLine={{
                stroke: "#475569",
                strokeWidth: isDesktop ? 1.5 : 0.5,
              }}
            >
              {chartData.map((entry) => (
                <Cell key={entry.name} fill={entry.fill} />
              ))}
            </Pie>
            <Tooltip
              wrapperStyle={{ zIndex: 100 }}
              content={<CustomPieTooltip />}
            />
          </PieChart>
        </ResponsiveContainer>

        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <span className="text-2xl xl:text-3xl font-extrabold text-slate-100">
            {totalFarmed}
          </span>
          <span className="text-[10px] xl:text-base text-slate-400 font-medium uppercase tracking-wider">
            Total Epics
          </span>
        </div>
      </div>
    </div>
  );
};

export default CustomPieChart;
