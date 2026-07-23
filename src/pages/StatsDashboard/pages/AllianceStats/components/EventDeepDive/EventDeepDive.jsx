import { useEffect, useMemo, useState } from "react";

import { useMediaQuery } from "../../../../../../hooks/useMediaQuery";
import useAppStore from "../../../../../../store/useAppStore";
import { BREAKPOINTS } from "../../../../../../utils/constants";
import HeaderList from "../HeaderList/HeaderList";
import CPList from "./CPList";
import CustomTreemap from "./CustomTreemap";
import KeyMetrics from "./KeyMetrics";

const EventDeepDive = ({ selectedEventLabel, onSelectEvent }) => {
  const rawTimeline = useAppStore(
    (state) => state.timelineData?.timeline || [],
  );

  const [activeLabel, setActiveLabel] = useState("");
  const isDesktop = useMediaQuery(BREAKPOINTS.IS_DESKTOP);

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
        <HeaderList
          icon="🔬"
          title="Event Deep Dive"
          text="Detailed attendance breakdown & MVP CP for a specific raid or siege"
        />

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
        <KeyMetrics
          topCP={topCP}
          totalPlayers={totalPlayers}
          currentEvent={currentEvent}
        />

        {isDesktop && <CustomTreemap cpBreakdown={cpBreakdown} />}
        <CPList cpBreakdown={cpBreakdown} totalPlayers={totalPlayers} />
      </div>
    </div>
  );
};

export default EventDeepDive;
