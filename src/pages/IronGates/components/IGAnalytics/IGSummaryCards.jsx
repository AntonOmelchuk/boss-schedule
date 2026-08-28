import { Award, Calendar, Crown, Users } from "lucide-react";

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
        title={t.igAnalytics?.dominatorPctLabel || "Dominator Pct"}
        value={`${data.dominator_pct}%`}
        icon={Crown}
        colorClass="amber"
        footerValue={`${data.dominator_events_count} events`}
        footerHighlight={true}
      />

      {/* Average Event Points Card */}
      <StatCard
        title={t.igAnalytics?.avgPointsLabel || "Avg Event Points"}
        value={data.average_event_points}
        unit="pts"
        icon={Award}
        colorClass="emerald"
      />

      {/* Active Members Count Card */}
      <StatCard
        title={t.igAnalytics?.activeMembersLabel || "Active Members"}
        value={data.members?.length || 0}
        icon={Users}
        colorClass="purple"
      />
    </div>
  );
};

export default IGSummaryCards;
