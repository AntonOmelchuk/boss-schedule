import { useEffect } from "react";
import { useShallow } from "zustand/react/shallow";

import Error from "../../../components/Error/Error";
import Button from "../../../components/UI/Button";
import useTranslation from "../../../hooks/useTranslation";
import { useIgAnalyticsStore } from "../../../store/useIgAnalyticsStore";
import { getErrorMessage } from "../../../utils/general";
import EpicShareScrollTimeLine from "../components/IGAnalytics/EpicShareScrollTimeLine";
import IGAllianceActivityComboChart from "../components/IGAnalytics/IGAllianceActivityComboChart";
import IGAttendanceRateMatrix from "../components/IGAnalytics/IGAttendanceRateMatrix";
import IGMemberActivityChart from "../components/IGAnalytics/IGMemberActivityChart";
import IGStreakMatrix from "../components/IGAnalytics/IGStreakMatrix";
import IGSummaryCards from "../components/IGAnalytics/IGSummaryCards";
import DashboardSkeleton from "../skeletons/DashboardSkeleton";

const IGAnalyticsModule = () => {
  const { t } = useTranslation();

  const { analyticsData, isLoading, error, selectedDays, fetchAnalytics } =
    useIgAnalyticsStore(
      useShallow((state) => ({
        analyticsData: state.analyticsData,
        isLoading: state.isLoading,
        error: state.error,
        selectedDays: state.selectedDays,
        fetchAnalytics: state.fetchAnalytics,
      })),
    );

  useEffect(() => {
    fetchAnalytics(null); // Load all-time by default
  }, [fetchAnalytics]);

  if (isLoading && !analyticsData) {
    return <DashboardSkeleton hideScrollLine />;
  }

  if (error && !isLoading) {
    return (
      <Error
        title={getErrorMessage(error)}
        onClickHandler={() => fetchAnalytics(selectedDays, true)}
      />
    );
  }

  const filterOptions = [
    { days: 7, label: t.igAnalytics.filter7Days },
    { days: 30, label: t.igAnalytics.filter30Days },
    { days: null, label: t.igAnalytics.filterAll },
  ];

  const buttonStyles = (active) =>
    active ? "bg-amber-600 text-white" : "bg-slate-800 text-slate-300";

  return (
    <div className="md:p-8 text-white min-h-screen">
      {/* Header and Period Filter Buttons */}
      <div className="flex flex-wrap justify-between items-center mb-6 gap-4">
        <h1 className="text-2xl font-bold tracking-wide">
          {t.igAnalytics.pageTitle}
        </h1>

        <div className="flex items-center gap-2">
          {filterOptions.map(({ days, label }) => (
            <Button
              key={String(days)}
              onClick={() => fetchAnalytics(days)}
              disabled={isLoading}
              className={`px-3 py-1.5 text-xs rounded-lg ${buttonStyles(selectedDays === days)}`}
            >
              {label}
            </Button>
          ))}
        </div>
      </div>

      {analyticsData && (
        <div className="flex flex-col gap-8">
          {/* Summary Cards */}
          <IGSummaryCards data={analyticsData} />

          {/* Main Bar Chart with Avatars */}
          <IGMemberActivityChart
            membersAnalytics={analyticsData.members_analytics}
          />

          {/* Grid Layout for Percentage & Streak Matrices */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <IGAttendanceRateMatrix />
            <IGStreakMatrix />
          </div>

          {/* Combo Chart (Activity & Moving Average) */}
          <IGAllianceActivityComboChart />

          <EpicShareScrollTimeLine events={analyticsData.epic_history} />
        </div>
      )}
    </div>
  );
};

export default IGAnalyticsModule;
