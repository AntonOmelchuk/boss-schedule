import { useEffect, useMemo, useState } from "react";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import useAppStore from "../../../../store/useAppStore";

const CP_COLORS = [
  "#38bdf8",
  "#f43f5e",
  "#a855f7",
  "#34d399",
  "#fbbf24",
  "#e879f9",
  "#f97316",
  "#22d3ee",
  "#a3e635",
  "#f472b6",
  "#818cf8",
  "#10b981",
  "#fb7185",
  "#c084fc",
  "#facc15",
];

const CPProgressLineChart = () => {
  const rawTimeline = useAppStore(
    (state) => state.timelineData?.timeline || [],
  );

  const [selectedCPs, setSelectedCPs] = useState({});

  // List of all CP (Turn off system fields)
  const allCPNames = useMemo(() => {
    if (!rawTimeline.length) return [];
    const firstRow = rawTimeline[0];
    const systemKeys = ["date", "action", "event_label", "total_players"];
    return Object.keys(firstRow).filter((key) => !systemKeys.includes(key));
  }, [rawTimeline]);

  // Init checkbox (Default top-5 CP)
  useEffect(() => {
    if (allCPNames.length > 0 && Object.keys(selectedCPs).length === 0) {
      const initialSelection = {};
      allCPNames.forEach((cp, index) => {
        initialSelection[cp] = index < 5; // Turn on only first 5 CP
      });
      setSelectedCPs(initialSelection);
    }
  }, [allCPNames]);

  // Cumulative Sum
  const cumulativeData = useMemo(() => {
    if (!rawTimeline.length) return [];

    const runningTotals = {};
    allCPNames.forEach((cp) => (runningTotals[cp] = 0));

    return rawTimeline.map((entry) => {
      const row = {
        event_label: entry.event_label,
        date: entry.date,
      };

      allCPNames.forEach((cp) => {
        const eventPoints = Number(entry[cp]) || 0;
        runningTotals[cp] += eventPoints;
        row[cp] = runningTotals[cp];
      });

      return row;
    });
  }, [rawTimeline, allCPNames]);

  // Checkbox handlers
  const toggleCP = (cpName) => {
    setSelectedCPs((prev) => ({ ...prev, [cpName]: !prev[cpName] }));
  };

  const selectAll = (status) => {
    const updated = {};
    allCPNames.forEach((cp) => (updated[cp] = status));
    setSelectedCPs(updated);
  };

  if (!rawTimeline.length) return null;

  return (
    <div
      className="w-full mt-8 bg-slate-900/10 backdrop-blur-md border border-slate-800
      rounded-2xl p-6 shadow-xl flex flex-col gap-6"
    >
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-100 tracking-wide">
            CP Points Progress Timeline
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Cumulative growth of CP points over events
          </p>
        </div>

        {/* Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => selectAll(true)}
            className="text-xs px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition"
          >
            Select All
          </button>
          <button
            onClick={() => selectAll(false)}
            className="text-xs px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition"
          >
            Deselect All
          </button>
        </div>
      </div>

      {/* Chart */}
      <div className="w-full h-150">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={cumulativeData}
            margin={{ top: 10, right: 30, left: 0, bottom: 20 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#334155"
              opacity={0.5}
            />
            <XAxis
              dataKey="event_label"
              stroke="#94a3b8"
              tick={{ fontSize: 11 }}
              interval="preserveStartEnd"
            />
            <YAxis stroke="#94a3b8" tick={{ fontSize: 12 }} />
            <Tooltip
              contentStyle={{
                backgroundColor: "#0f172a",
                borderColor: "#334155",
                borderRadius: "0.75rem",
                color: "#f8fafc",
              }}
            />
            <Legend wrapperStyle={{ paddingTop: "15px" }} />

            {/* Line for selected CP */}
            {allCPNames.map((cp, idx) => {
              if (!selectedCPs[cp]) return null;
              return (
                <Line
                  key={cp}
                  type="monotone"
                  dataKey={cp}
                  name={cp}
                  stroke={CP_COLORS[idx % CP_COLORS.length]}
                  strokeWidth={2}
                  dot={false}
                  activeDot={{ r: 6 }}
                />
              );
            })}
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Checkbox */}
      <div className="pt-4 border-t border-slate-800/80">
        <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-3">
          Filter Party Groups:
        </span>
        <div className="flex flex-wrap gap-2 max-h-36 overflow-y-auto pr-2 custom-scrollbar">
          {allCPNames.map((cp, idx) => {
            const isSelected = !!selectedCPs[cp];
            const color = CP_COLORS[idx % CP_COLORS.length];

            return (
              <button
                key={cp}
                onClick={() => toggleCP(cp)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
                  isSelected
                    ? "bg-slate-800/80 border-slate-600 text-slate-200"
                    : "bg-slate-950/40 border-slate-800/60 text-slate-500 hover:text-slate-400"
                }`}
              >
                <span
                  className="w-2.5 h-2.5 rounded-full"
                  style={{
                    backgroundColor: isSelected ? color : "#475569",
                  }}
                />
                {cp}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CPProgressLineChart;
