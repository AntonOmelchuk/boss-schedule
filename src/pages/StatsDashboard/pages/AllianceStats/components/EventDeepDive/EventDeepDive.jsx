import { useEffect, useMemo, useState } from "react";
import {
  ResponsiveContainer,
  Tooltip as RechartsTooltip,
  Treemap,
} from "recharts";

import useAppStore from "../../../../../../store/useAppStore";
import CustomTreemapContent from "./CustomTreemapContent";

const COLOR_PALETTE = [
  "#38bdf8",
  "#34d399",
  "#fbbf24",
  "#f43f5e",
  "#a855f7",
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

const EventDeepDive = ({ selectedEventLabel, onSelectEvent }) => {
  const rawTimeline = useAppStore(
    (state) => state.timelineData?.timeline || [],
  );

  const [activeLabel, setActiveLabel] = useState("");

  // Update state after select event
  useEffect(() => {
    if (selectedEventLabel) {
      setActiveLabel(selectedEventLabel);
    } else if (rawTimeline.length > 0 && !activeLabel) {
      setActiveLabel(rawTimeline[rawTimeline.length - 1].event_label);
    }
  }, [selectedEventLabel, rawTimeline]);

  // Find data for selected event
  const currentEvent = useMemo(() => {
    return rawTimeline.find((e) => e.event_label === activeLabel);
  }, [rawTimeline, activeLabel]);

  // Format data for chart
  const cpBreakdown = useMemo(() => {
    if (!currentEvent) return [];
    const systemKeys = ["date", "action", "event_label", "total_players"];

    return Object.keys(currentEvent)
      .filter(
        (key) => !systemKeys.includes(key) && Number(currentEvent[key]) > 0,
      )
      .map((cpName) => ({
        name: cpName,
        value: Number(currentEvent[cpName]),
      }))
      .sort((a, b) => b.value - a.value);
  }, [currentEvent]);

  if (!rawTimeline.length || !currentEvent) return null;

  const totalPlayers = Number(currentEvent.total_players) || 0;
  const topCP = cpBreakdown[0];

  return (
    <div
      className="w-full mt-16 bg-slate-900/30 backdrop-blur-md border border-slate-800
      rounded-2xl p-6 shadow-xl flex flex-col gap-6"
    >
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800/80 pb-4">
        <div>
          <h2 className="text-xl font-bold text-slate-100 tracking-wide">
            Event Deep Dive
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Detailed attendance breakdown & MVP CP for a specific raid or siege
          </p>
        </div>

        {/* Dropdown */}
        <select
          value={activeLabel}
          onChange={(e) => {
            setActiveLabel(e.target.value);
            if (onSelectEvent) onSelectEvent(e.target.value);
          }}
          className="bg-slate-800 border border-slate-700 text-slate-200 text-sm rounded-xl px-4 py-2
            focus:outline-none focus:border-sky-500 transition cursor-pointer"
        >
          {rawTimeline.map((item) => (
            <option key={item.event_label} value={item.event_label}>
              {item.event_label} ({item.action})
            </option>
          ))}
        </select>
      </div>

      {/* Main grid — 12-cells */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
        {/* 1. Key Metrics */}
        <div className="flex flex-col gap-3 xl:col-span-3">
          <div className="bg-slate-800/40 border border-slate-800 rounded-xl p-4">
            <span className="text-xs text-slate-400 uppercase font-semibold">
              Total Event Attendance
            </span>
            <div className="text-3xl font-extrabold text-sky-400 mt-1">
              {totalPlayers}{" "}
              <span className="text-sm font-normal text-slate-400">
                players
              </span>
            </div>
          </div>

          {topCP && (
            <div className="bg-slate-800/40 border border-slate-800 rounded-xl p-4">
              <span className="text-xs text-slate-400 uppercase font-semibold">
                Top Contributor (MVP CP)
              </span>
              <div className="text-lg font-bold text-emerald-400 mt-1 flex items-center justify-between gap-2">
                <span className="truncate">{topCP.name}</span>
                <span
                  className="text-xs bg-emerald-500/10 text-emerald-400 border
                  border-emerald-500/20 px-2 py-1 rounded-lg shrink-0"
                >
                  {topCP.value} pl. (
                  {Math.round((topCP.value / totalPlayers) * 100)}%)
                </span>
              </div>
            </div>
          )}

          <div className="bg-slate-800/40 border border-slate-800 rounded-xl p-4">
            <span className="text-xs text-slate-400 uppercase font-semibold">
              Event Category / Target
            </span>
            <div className="text-base font-semibold text-amber-400 mt-1 capitalize">
              {currentEvent.action || "N/A"}
            </div>
          </div>
        </div>

        {/* 2. Treemap */}
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

        {/* 3. CP List */}
        <div className="flex flex-col gap-1.5 xl:col-span-2 max-h-80 overflow-y-auto pr-1 custom-scrollbar">
          <span
            className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1
          sticky top-0 bg-slate-900/90 py-1 z-10"
          >
            Party Breakdown ({cpBreakdown.length} CPs present):
          </span>
          {cpBreakdown.map((cp, idx) => (
            <div
              key={cp.name}
              className="flex items-center justify-between p-2 rounded-lg bg-slate-800/30 border
         border-slate-800/60 text-xs"
            >
              <div className="flex items-center gap-2 truncate pr-2">
                <span
                  className="w-2.5 h-2.5 rounded-full shrink-0"
                  style={{
                    backgroundColor: COLOR_PALETTE[idx % COLOR_PALETTE.length],
                  }}
                />
                <span className="font-medium text-slate-200 truncate">
                  {cp.name}
                </span>
              </div>
              <div className="font-bold text-slate-100 shrink-0">
                {cp.value}{" "}
                <span className="text-slate-500 font-normal">
                  ({Math.round((cp.value / totalPlayers) * 100)}%)
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EventDeepDive;
