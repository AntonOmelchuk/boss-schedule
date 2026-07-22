import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

import CustomLabel from "./CustomLabel";
import CustomPieTooltip from "./CustomTooltip";

const CustomPieChart = ({ chartData, totalFarmed }) => {
  return (
    <div className="w-full lg:w-1/2 flex flex-col items-center">
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
              innerRadius={90}
              outerRadius={140}
              paddingAngle={3}
              stroke="none"
              label={<CustomLabel />}
              labelLine={{ stroke: "#475569", strokeWidth: 1.5 }}
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
          <span className="text-3xl font-extrabold text-slate-100">
            {totalFarmed}
          </span>
          <span className="text-[10px] text-slate-400 font-medium uppercase tracking-wider">
            Total Epics
          </span>
        </div>
      </div>
    </div>
  );
};

export default CustomPieChart;
