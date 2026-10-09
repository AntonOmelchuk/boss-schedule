import { useMemo } from "react";

import { WINNER_ICONS } from "../../../../constants/general";
import { MEMBER_COLORS } from "../../../../constants/members";
import { useIgAnalyticsStore } from "../../../../store/useIgAnalyticsStore";
import { getRankStyles } from "../../../../utils/members";
import Header from "./Header";

const IGMetricBarMatrix = ({
  icon,
  title,
  subTitle,
  sortFn,
  getFillPercentage,
  renderValue,
}) => {
  const analyticsData = useIgAnalyticsStore((state) => state.analyticsData);

  const sortedMembers = useMemo(() => {
    if (!analyticsData?.members_analytics) return [];
    return [...analyticsData.members_analytics].sort(sortFn);
  }, [analyticsData, sortFn]);

  if (!sortedMembers.length) return null;

  return (
    <div
      className="bg-slate-900/30 backdrop-blur-md border border-slate-800 rounded-2xl p-4
        shadow-xl flex flex-col gap-4"
    >
      <Header Icon={icon} title={title} subTitle={subTitle} />

      {/* List of Bars */}
      <div className="max-h-130 flex flex-col gap-3 overflow-y-auto pr-2 custom-scrollbar">
        {sortedMembers.map((member, index) => {
          const fillPercentage = getFillPercentage(member, sortedMembers);
          const iconSymbol = WINNER_ICONS[index];
          const { font, color } = getRankStyles(index);
          const numberWidth = index > 8 ? "w-7" : "w-4";

          const memberColorObj = MEMBER_COLORS[member.name];
          const startColor = memberColorObj?.start || "#38bdf8";
          const endColor = memberColorObj?.end || "#6366f1";

          return (
            <div key={member.name} className="flex flex-col gap-1 group">
              <div className="flex justify-between items-center text-xs">
                <div className="flex items-center gap-2">
                  <span
                    className={`text-sm font-mono font-bold text-slate-500 ${numberWidth}`}
                  >
                    {iconSymbol ? iconSymbol : `#${index + 1}`}
                  </span>
                  <span className={`transition ${font} ${color}`}>
                    {member.name}
                  </span>
                </div>
                {renderValue(member)}
              </div>

              {/* Progress Bar Container */}
              <div
                className="w-full rounded-full h-3 p-0.5 border border-slate-800/80
                  overflow-hidden"
              >
                <div
                  className="h-full rounded-full transition-all duration-500 ease-out group-hover:brightness-125"
                  style={{
                    width: `${fillPercentage}%`,
                    backgroundImage: `linear-gradient(to right, ${endColor}, ${startColor})`,
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default IGMetricBarMatrix;
