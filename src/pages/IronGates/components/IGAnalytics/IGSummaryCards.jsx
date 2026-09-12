import { Award, Calendar, Crown, UserCheck } from "lucide-react";

import useTranslation from "../../../../hooks/useTranslation";
import StatCard from "../Dashboard/StatCard";

const IGSummaryCards = ({ data }) => {
  const { t } = useTranslation();

  if (!data) return null;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {/* Total Events Card */}
      <StatCard
        title={t.igAnalytics?.totalEventsLabel || "Total Events"}
        value={data.total_events}
        icon={Calendar}
        colorClass="indigo"
      />

      {/* Dominator Events Pct Card */}
      <StatCard
        title={t.igAnalytics.dominatorPctLabel}
        value={`${data.dominator_pct}%`}
        icon={Crown}
        colorClass="amber"
        footerValue={`${data.dominator_events_count} events`}
        footerHighlight={true}
      />

      {/* Average Event Points Card */}
      <StatCard
        title={t.igAnalytics.avgPointsLabel}
        value={data.average_event_points}
        unit="pts"
        icon={Award}
        colorClass="emerald"
      />

      {/* Full-party streak */}
      <StatCard
        title={t.igAnalytics.fullPartyStreakLabel}
        value={data.max_full_party_streak}
        icon={UserCheck}
        colorClass="purple"
      />
    </div>
  );
};

export default IGSummaryCards;
