import { BarChart3 } from "lucide-react";

import useTranslation from "../../../../hooks/useTranslation";
import IGMetricBarMatrix from "./IGMetricBarMatrix";

const IGAttendanceRateMatrix = () => {
  const { t } = useTranslation();

  const getEventsLabel = (count) => {
    if (count === 1) return t.igAnalytics?.eventOne || "event";
    return t.igAnalytics?.eventsMany || "events";
  };

  return (
    <IGMetricBarMatrix
      icon={<BarChart3 className="w-4 h-4 text-amber-500" />}
      title={t.igAnalytics.attendanceRateTitle}
      subTitle={t.igAnalytics?.attendanceRateSubtitle}
      sortFn={(a, b) => {
        if (b.attendance_pct !== a.attendance_pct) {
          return b.attendance_pct - a.attendance_pct;
        }
        return b.attended_events - a.attended_events;
      }}
      getFillPercentage={(member) =>
        Math.min(Math.max(member.attendance_pct, 0), 100)
      }
      renderValue={(member) => (
        <div className="flex items-center gap-2">
          <span className="text-base text-slate-500">
            ({member.attended_events} / {member.total_events}{" "}
            {getEventsLabel(member.attended_events)})
          </span>
          <span className="font-mono font-bold text-sky-400 text-base">
            {member.attendance_pct}%
          </span>
        </div>
      )}
    />
  );
};

export default IGAttendanceRateMatrix;
