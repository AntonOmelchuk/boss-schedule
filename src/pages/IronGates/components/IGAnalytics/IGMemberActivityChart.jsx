import { useMemo } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import {
  MEMBER_COLORS,
  MEMBERS_MAP,
  STORAGE_URL,
} from "../../../../constants/members";
import useTranslation from "../../../../hooks/useTranslation";
import useWindowSize from "../../../../hooks/useWindowSize";
import { shuffleArray } from "../../../../utils/general";

const firstPlace = `${STORAGE_URL}/badges/gold_badge.png`;
const secondPlace = `${STORAGE_URL}/badges/silver_badge.png`;
const thirdPlace = `${STORAGE_URL}/badges/bronze_badge.png`;

// Reusable Customized Bar with Avatar & Badges
const CustomizedBarWithAvatar = (props) => {
  const { x, y, width, height, payload } = props;
  const { name, rank } = payload;

  const member = MEMBERS_MAP[name];
  const avatarUrl = member ? member.image : null;
  const avatarSize = 100;
  const cx = x + width / 2;
  const cy = y - avatarSize - 10;

  let badgeUrl = null;
  if (rank === 1) badgeUrl = firstPlace;
  else if (rank === 2) badgeUrl = secondPlace;
  else if (rank === 3) badgeUrl = thirdPlace;

  const badgeSize = avatarSize * 1.5;
  const gradientId = `ig-member-gradient-${name}`;

  return (
    <g>
      <defs>
        <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
          <stop
            offset="0%"
            stopColor={MEMBER_COLORS[name]?.start || "#334155"}
          />
          <stop
            offset="100%"
            stopColor={MEMBER_COLORS[name]?.end || "#1e293b"}
          />
        </linearGradient>
      </defs>
      <path
        d={`M ${x},${y + height}
            L ${x},${y + 6}
            Q ${x},${y} ${x + 6},${y}
            L ${x + width - 6},${y}
            Q ${x + width},${y} ${x + width},${y + 6}
            L ${x + width},${y + height}
            Z`}
        fill={`url(#${gradientId})`}
      />

      {badgeUrl && (
        <image
          x={cx - badgeSize / 2}
          y={(cy > 0 ? cy : 0) - (badgeSize - avatarSize) / 2}
          width={badgeSize}
          height={badgeSize}
          href={badgeUrl}
          style={{ pointerEvents: "none", zIndex: 1 }}
        />
      )}

      {avatarUrl && (
        <image
          x={cx - avatarSize / 2}
          y={cy > 0 ? cy : 0}
          width={avatarSize}
          height={avatarSize}
          href={avatarUrl}
          clipPath="circle(50% at 50% 50%)"
          className="object-cover z-10"
        />
      )}
    </g>
  );
};

// Custom Tooltip for member attendance & percentage
const CustomTooltip = ({ active, payload }) => {
  const { t } = useTranslation();

  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-slate-950/90 border border-slate-800 p-3 rounded-xl shadow-xl backdrop-blur-md">
        <p className="text-sm font-bold text-white mb-1">{data.name}</p>
        <p className="text-xs text-sky-400 font-semibold">
          {t.igAnalytics.attendedEvents}:{" "}
          <span className="font-extrabold">
            {data.attended_events} / {data.total_events}
          </span>
        </p>
        <p className="text-xs text-amber-400 font-semibold">
          {t.igAnalytics.attendanceRate}:{" "}
          <span className="font-extrabold">{data.attendance_pct}%</span>
        </p>
        <p className="text-xs text-emerald-400 font-semibold">
          {t.igAnalytics.maxStreak}:{" "}
          <span className="font-extrabold">{data.max_streak}</span>
        </p>
      </div>
    );
  }
  return null;
};

const IGMemberActivityChart = ({ membersAnalytics }) => {
  const [windowWidth, windowHeight] = useWindowSize();
  const { t } = useTranslation();

  // Assign ranks based on attended events & attendance percentage for medals
  const processedData = useMemo(() => {
    if (!membersAnalytics || membersAnalytics.length === 0) return [];

    return shuffleArray(
      membersAnalytics.map((item, index) => ({
        ...item,
        rank: index + 1,
        // Mapping name to 'score' for Recharts Bar dataKey usage
        score: item.attended_events,
      })),
    );
  }, [membersAnalytics]);

  if (!processedData.length) return null;

  return (
    <div className="bg-slate-900/40 border border-slate-800/80 rounded-2xl p-6 backdrop-blur-md mb-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-bold text-white flex items-center gap-2">
          {t.igAnalytics?.activityChartTitle}
        </h2>
      </div>

      <div className="w-full" style={{ height: windowHeight / 1.8 }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={processedData}
            margin={{ top: 125, right: 10, left: -20, bottom: 35 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#1e293b"
              vertical={false}
            />
            <XAxis
              dataKey="name"
              stroke="#fff"
              fontSize={18}
              fontWeight="600"
              interval={0}
              tickLine={false}
              angle={-25}
              textAnchor="end"
            />
            <YAxis
              stroke="#94a3b8"
              fontSize={18}
              domain={[0, "dataMax + 2"]}
              tickLine={false}
            />
            <Tooltip content={<CustomTooltip />} />

            <Bar
              dataKey="score"
              barSize={windowWidth / 25}
              shape={<CustomizedBarWithAvatar />}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default IGMemberActivityChart;
