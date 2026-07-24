import {
  ResponsiveContainer,
  Tooltip as RechartsTooltip,
  Treemap,
} from "recharts";

import CustomTreemapContent from "./CustomTreemapContent";

const CustomTreemap = ({ cpBreakdown }) => {
  return (
    <div
      className="h-80 w-full lg:col-span-7 flex items-center justify-center
      bg-slate-900/20 rounded-xl p-2 border border-slate-800/50"
    >
      <ResponsiveContainer width="100%" height="100%">
        <Treemap
          data={cpBreakdown}
          dataKey="value"
          aspectRatio={4 / 3}
          stroke="#0f172a"
          content={<CustomTreemapContent />}
        >
          <RechartsTooltip
            contentStyle={{
              backgroundColor: "#0f172a",
              borderColor: "#334155",
              borderRadius: "0.75rem",
            }}
            labelStyle={{
              color: "#f8fafc",
              fontWeight: "bold",
              marginBottom: "0.25rem",
            }}
            itemStyle={{
              color: "#fff",
              fontSize: "0.875rem",
              fontWeight: "600",
            }}
          />
        </Treemap>
      </ResponsiveContainer>
    </div>
  );
};

export default CustomTreemap;
