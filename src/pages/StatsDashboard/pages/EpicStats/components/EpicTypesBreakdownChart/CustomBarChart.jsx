import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import CustomPieTooltip from "./CustomTooltip";

const CustomBarChart = ({ chartData }) => {
  return (
    <div className="w-full lg:w-1/2 flex flex-col">
      <h3 className="text-base font-bold text-slate-100 mb-2">
        Total Farmed Count
      </h3>
      <p className="text-xs text-slate-400 mb-4">
        Exact breakdown of kills per Epic Boss
      </p>

      <div className="w-full h-90">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            layout="vertical"
            data={chartData}
            margin={{ top: 0, right: 30, left: 20, bottom: 0 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#334155"
              opacity={0.3}
              horizontal={false}
            />

            <XAxis
              type="number"
              stroke="#94a3b8"
              tick={{ fontSize: 16 }}
              allowDecimals={false}
            />

            <YAxis
              type="category"
              dataKey="name"
              stroke="#94a3b8"
              tick={{ fontSize: 16, fontWeight: 600 }}
              width={80}
            />

            <Tooltip
              wrapperStyle={{ outline: "none" }}
              content={<CustomPieTooltip />}
            />

            <Bar dataKey="value" radius={[0, 6, 6, 0]} barSize={30}>
              {chartData.map((entry) => (
                <Cell key={entry.name} fill={entry.fill} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default CustomBarChart;
