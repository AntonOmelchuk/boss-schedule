import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

const DARK_COLORS = ["#4f46e5", "#0ea5e9", "#10b981", "#94a3b8", "#64748b"];

const PieChartCustom = ({ data }) => {
  return (
    <div className="flex-1 min-w-100 h-125 bg-slate-900 p-6 rounded-xl border border-slate-800">
      <h3 className="text-xl mb-6">Distribution</h3>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            dataKey="points"
            nameKey="cp_name"
            innerRadius={80}
            outerRadius={120}
            paddingAngle={5}
            cornerRadius={4}
          >
            {data.map((_, i) => (
              <Cell key={i} fill={DARK_COLORS[i % DARK_COLORS.length]} />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
              backgroundColor: "#0f172a",
              border: "none",
            }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PieChartCustom;
