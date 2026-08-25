import {
  Award,
  Calendar,
  ChevronDown,
  ChevronUp,
  TrendingUp,
  Users,
  Zap,
} from "lucide-react";
import { useEffect } from "react";

import Error from "../../../components/Error/Error";
import useTranslation from "../../../hooks/useTranslation";
import { useDashboardStore } from "../../../store/useDashboardStore";
import { formatCustomDate } from "../../../utils/general";
import ActivityChart from "../components/Dashboard/ActivityChart";
import EventsTicker from "../components/Dashboard/EventsTicker";
import StatCard from "../components/Dashboard/StatCard";
import DashboardSkeleton from "../skeletons/DashboardSkeleton";

const DashboardModule = ({ isHeaderVisible, setIsHeaderVisible }) => {
  const { data, error, isLoading, fetchDashboardData } = useDashboardStore();

  const { t, language } = useTranslation();

  const { dashboard, errors } = t;

  useEffect(() => {
    fetchDashboardData();
  }, [fetchDashboardData]);

  if (isLoading) {
    return <DashboardSkeleton />;
  }

  if (error) {
    return (
      <div className="px-8 py-20 flex justify-center items-center">
        <Error
          title={typeof error === "string" ? error : errors.failedToLoad}
          onClickHandler={fetchDashboardData}
        />
      </div>
    );
  }

  const cpStats = {
    totalMembers: data?.members_count || 10,
    totalEvents: data?.total_events_count || 0,
    totalPoints: data?.total_cp_ap || 0,
    avgAttendance: data?.avg_attendance ? `${data.avg_attendance}` : "0",
    acquiredEpics: data?.received_epics_count || 0,
    lastEpic: data.last_epic || "",
    lastEvent: data?.last_played_event || {
      name: "N/A",
      date: "N/A",
      points: "0",
    },
  };

  const topActivePlayers = data?.top_players_last_30 || [];

  return (
    <div className="px-8 relative pt-2">
      <div className="flex justify-center mb-4">
        <button
          onClick={() => setIsHeaderVisible(!isHeaderVisible)}
          className="px-3.5 py-1.5 rounded-full bg-slate-900/90 backdrop-blur-md border border-slate-700/80
          text-slate-300 hover:text-amber-400 hover:border-amber-500/50 shadow-[0_4px_20px_rgba(0,0,0,0.8)]
            transition-all duration-300 flex items-center gap-1.5 text-xs font-semibold cursor-pointer z-30"
        >
          <span>
            {isHeaderVisible ? dashboard.hideHeader : dashboard.showHeader}
          </span>
          {isHeaderVisible ? (
            <ChevronUp size={14} />
          ) : (
            <ChevronDown size={14} />
          )}
        </button>
      </div>

      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        <StatCard
          title={dashboard.stats.membersTitle}
          value={cpStats.totalMembers}
          unit={dashboard.stats.membersUnit}
          icon={Users}
          footerIcon={Calendar}
          footerLabel={dashboard.stats.eventsLabel}
          footerValue={cpStats.totalEvents}
        />

        <StatCard
          title={dashboard.stats.pointsTitle}
          value={cpStats.totalPoints}
          unit={dashboard.stats.pointsUnit}
          icon={TrendingUp}
          colorClass="amber"
          footerLabel={dashboard.stats.attendanceLabel}
          footerValue={cpStats.avgAttendance}
          footerHighlight
        />

        <StatCard
          title={dashboard.stats.epicsTitle}
          value={cpStats.acquiredEpics}
          unit={dashboard.stats.epicsUnit}
          icon={Award}
          colorClass="indigo"
          footerLabel={`${dashboard.stats.lastEpicLabel} ${cpStats.lastEpic.epic_name}`}
          footerValue={formatCustomDate(cpStats.lastEpic.date, language)}
        />

        <StatCard
          title={dashboard.stats.lastEventTitle}
          value={cpStats.lastEvent.name}
          unit=""
          icon={Zap}
          colorClass="amber"
          highlight
          footerLabel={`${dashboard.stats.pointsPerEventLabel} +${cpStats.lastEvent.points}`}
          footerValue={cpStats.lastEvent.date}
          footerHighlight
        />
      </section>

      <EventsTicker events={data?.all_events} />

      <ActivityChart data={topActivePlayers} />
    </div>
  );
};

export default DashboardModule;
