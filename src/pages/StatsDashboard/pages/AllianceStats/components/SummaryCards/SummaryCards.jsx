import SummaryCard from "../../../../../../components/SummaryCard/SummaryCard";
import useTranslation from "../../../../../../hooks/useTranslation";
import useAppStore from "../../../../../../store/useAppStore";

const SummaryCards = () => {
  const { t } = useTranslation();
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
        title={t.summaryCards.totalEventsTitle}
        icon="💎"
        value={total_events}
        subtext={t.summaryCards.totalEventsSubtext}
        valueColor="text-sky-400"
      />

      {/* 2. Weekly MVP CP */}
      <SummaryCard
        title={t.summaryCards.mvpCpTitle}
        icon="🔥"
        value={weekly_mvp_cp}
        subtext={t.summaryCards?.mvpCpSubtext}
        valueColor="text-emerald-400"
      />

      {/* 3. Peak Event Record */}
      <SummaryCard
        title={t.summaryCards.peakRecordTitle}
        icon="🏆"
        value={peak_event_players}
        valueUnit={t.summaryCards.peakRecordUnit}
        subtext={<span title={peak_event_label}>{peak_event_label}</span>}
        valueColor="text-purple-400"
      />

      {/* 4. Weekly Avg Turnout */}
      <SummaryCard
        title={t.summaryCards.avgTurnoutTitle}
        icon="⚔️"
        value={weekly_avg_turnout}
        valueUnit={t.summaryCards.avgTurnoutUnit}
        subtext={t.summaryCards.avgTurnoutSubtext}
        valueColor="text-amber-400"
      />
    </div>
  );
};

export default SummaryCards;
