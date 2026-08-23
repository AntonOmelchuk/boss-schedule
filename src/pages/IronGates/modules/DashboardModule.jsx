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
import { useDashboardStore } from "../../../store/useDashboardStore";
import ActivityChart from "../components/Dashboard/ActivityChart";
import EventsTicker from "../components/Dashboard/EventsTicker";
import StatCard from "../components/Dashboard/StatCard";
import DashboardSkeleton from "../skeletons/DashboardSkeleton";

const DashboardModule = ({ isHeaderVisible, setIsHeaderVisible }) => {
  const { data, error, isLoading, fetchDashboardData } = useDashboardStore();

  useEffect(() => {
    fetchDashboardData();
  }, [fetchDashboardData]);

  if (isLoading && !data) {
    return <DashboardSkeleton />;
  }

  if (error) {
    return (
      <div className="px-8 py-20 flex justify-center items-center">
        <Error
          title={
            typeof error === "string"
              ? error
              : "Не вдалося завантажити дані дашборду"
          }
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
    lastEvent: data?.last_played_event || {
      name: "N/A",
      date: "N/A",
      points: "0",
    },
  };

  const topActivePlayers = data?.top_players_last_15 || [];

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
            {isHeaderVisible ? "Hide Header & Nav" : "Show Header & Nav"}
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
          title="Склад CP"
          value={cpStats.totalMembers}
          unit="fighters"
          icon={Users}
          footerIcon={Calendar}
          footerLabel="Всього подій:"
          footerValue={cpStats.totalEvents}
        />

        <StatCard
          title="Сумарні очки CP"
          value={cpStats.totalPoints}
          unit="pts"
          icon={TrendingUp}
          colorClass="amber"
          footerLabel="Відвідуваність (сер.):"
          footerValue={cpStats.avgAttendance}
          footerHighlight
        />

        <StatCard
          title="Отримано Епіків"
          value={cpStats.acquiredEpics}
          unit="items"
          icon={Award}
          colorClass="indigo"
          footerLabel={`Останній: ${cpStats.lastEvent.name}`}
          footerValue={cpStats.lastEvent.date}
        />

        <StatCard
          title="Останній івент"
          value={cpStats.lastEvent.name}
          unit=""
          icon={Zap}
          colorClass="amber"
          highlight
          footerLabel={`Балів за івент: +${cpStats.lastEvent.points}`}
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
