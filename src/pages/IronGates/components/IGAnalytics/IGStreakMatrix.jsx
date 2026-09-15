import { Flame } from "lucide-react";

import useTranslation from "../../../../hooks/useTranslation";
import IGMetricBarMatrix from "./IGMetricBarMatrix";

const IGStreakMatrix = () => {
  const { t } = useTranslation();

  return (
    <IGMetricBarMatrix
      icon={<Flame className="text-amber-400" />}
      title={t.igAnalytics?.streakTitle}
      subTitle={t.igAnalytics?.streakSubtitle}
      sortFn={(a, b) => b.max_streak - a.max_streak}
      getFillPercentage={(member, sortedList) => {
        const maxVal = Math.max(...sortedList.map((m) => m.max_streak), 1);
        return Math.min((member.max_streak / maxVal) * 100, 100);
      }}
      renderValue={(member) => (
        <span className="font-mono font-bold text-amber-400 text-base">
          {member.max_streak} {t.igAnalytics.streakEventsUnit}
        </span>
      )}
    />
  );
};

export default IGStreakMatrix;
