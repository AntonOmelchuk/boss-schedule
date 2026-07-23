import SummaryCard from "../../../../../../components/SummaryCard/SummaryCard";
import useAppStore from "../../../../../../store/useAppStore";

const SummaryCards = () => {
  const summaryData = useAppStore((state) => state.summaryData);

  if (!summaryData) return null;

  const {
    total_events,
    weekly_mvp_cp,
    peak_event_players,
    peak_event_label,
    weekly_avg_turnout,
  } = summaryData;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full mb-8">
      {/* 1. Total Epics Farmed */}
      <SummaryCard
        title="Total Events"
        icon="💎"
        value={total_events}
        subtext="Including Sieges"
        valueColor="text-sky-400"
      />

      {/* 2. Weekly MVP CP */}
      <SummaryCard
        title="Weekly MVP CP"
        icon="🔥"
        value={weekly_mvp_cp}
        subtext="Top contributor past 10 events"
        valueColor="text-emerald-400"
      />

      {/* 3. Peak Event Record */}
      <SummaryCard
        title="Peak Event Record"
        icon="🏆"
        value={peak_event_players}
        valueUnit="players"
        subtext={<span title={peak_event_label}>{peak_event_label}</span>}
        valueColor="text-purple-400"
      />

      {/* 4. Weekly Avg Turnout */}
      <SummaryCard
        title="Weekly Avg Turnout"
        icon="⚔️"
        value={weekly_avg_turnout}
        valueUnit="avg/event"
        subtext="Recent activity trend"
        valueColor="text-amber-400"
      />
    </div>
  );
};

export default SummaryCards;
