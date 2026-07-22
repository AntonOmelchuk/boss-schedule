import useAppStore from "../../../../../../store/useAppStore";
import SummaryCard from "./SummaryCard";

const SummaryCards = () => {
  const summaryData = useAppStore((state) => state.summaryData);

  if (!summaryData) return null;

  const {
    total_epics_farmed,
    unassigned_epics,
    weekly_mvp_cp,
    peak_event_players,
    peak_event_label,
    weekly_avg_turnout,
  } = summaryData;

  // Sub-text for the first card
  const treasurySubtext =
    unassigned_epics > 0 ? (
      <span className="text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20 font-medium">
        ⚠️ {unassigned_epics} in Treasury
      </span>
    ) : (
      <span className="text-emerald-400 font-medium">All items shared</span>
    );

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full mb-8">
      {/* 1. Total Epics Farmed */}
      <SummaryCard
        title="Total Epics Farmed"
        icon="💎"
        value={total_epics_farmed}
        subtext={treasurySubtext}
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
