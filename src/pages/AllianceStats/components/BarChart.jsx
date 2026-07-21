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

const COLORS = [
  "#8884d8",
  "#82ca9d",
  "#ffc658",
  "#ff8042",
  "#0088FE",
  "#00C49F",
];

const BarChartCustom = ({ data }) => {
  return (
    <div className="col-span-full h-125 p-6 rounded-xl border border-slate-800">
      <h3 className="text-xl mb-6">Performance</h3>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 20, bottom: 80 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
          <XAxis
            dataKey="cp_name"
            angle={-45}
            textAnchor="end"
            height={80}
            tick={{ fill: "#cbd5e1", fontSize: 12 }}
          />
          <YAxis tick={{ fill: "#cbd5e1" }} />
          <Tooltip
            contentStyle={{
              backgroundColor: "#1e293b",
              border: "none",
            }}
          />
          <Bar dataKey="points" radius={[4, 4, 0, 0]}>
            {data?.map((_, i) => (
              <Cell key={i} fill={COLORS[i % COLORS.length]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BarChartCustom;
