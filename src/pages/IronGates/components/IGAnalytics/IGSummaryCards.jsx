import { Award, Crown, Swords, UserCheck } from "lucide-react";
import { useEffect, useMemo } from "react";

import useTranslation from "../../../../hooks/useTranslation";
import useIGMembers from "../../../../store/useIGMembers";
import StatCard from "../Dashboard/StatCard";

const IGSummaryCards = ({ data }) => {
  const { t } = useTranslation();
  const { members, fetchMembers } = useIGMembers();

  useEffect(() => {
    fetchMembers();
  }, [fetchMembers]);

  const topPvpMember = useMemo(() => {
    if (!members?.length) return null;

    return members.reduce((best, member) => {
      const pvp = Number(member.pvp) || 0;
      if (!best || pvp > best.pvp) {
        return { name: member.name, pvp };
      }
      return best;
    }, null);
  }, [members]);

  if (!data) return null;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {/* Killing Machine Card */}
      <StatCard
        title={t.igAnalytics.killingMachineLabel}
        value={topPvpMember?.name ?? "—"}
        icon={Swords}
        colorClass="indigo"
        footerValue={topPvpMember?.pvp}
        footerUnit={topPvpMember ? t.igAnalytics.topPvpUnit : undefined}
        footerHighlight
      />

      {/* Dominator Events Pct Card */}
      <StatCard
        title={t.igAnalytics.dominatorPctLabel}
        value={data.dominator_pct}
        unit="%"
        unitClassName="text-2xl font-bold text-white"
        icon={Crown}
        colorClass="amber"
        footerValue={data.dominator_events_count}
        footerUnit="events"
        footerHighlight={true}
        countUpDecimals={1}
        footerCountUpDecimals={0}
      />

      {/* Average Event Points Card */}
      <StatCard
        title={t.igAnalytics.avgPointsLabel}
        value={data.average_event_points}
        unit="pts"
        icon={Award}
        colorClass="emerald"
        countUpDecimals={1}
      />

      {/* Full-party streak */}
      <StatCard
        title={t.igAnalytics.fullPartyStreakLabel}
        value={data.max_full_party_streak}
        unit="events"
        icon={UserCheck}
        colorClass="purple"
      />
    </div>
  );
};

export default IGSummaryCards;
