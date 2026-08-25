import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { MEMBER_COLORS, MEMBERS_MAP } from "../../../../constants/general";
import { STORAGE_URL } from "../../../../constants/general";
import useTranslation from "../../../../hooks/useTranslation";
import useWindowSize from "../../../../hooks/useWindowSize";

const firstPlace = `${STORAGE_URL}/badges/gold_badge.png`;
const secondPlace = `${STORAGE_URL}/badges/silver_badge.png`;
const thirdPlace = `${STORAGE_URL}/badges/bronze_badge.png`;

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

  const gradientId = `colorGradient-${name}`;

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

const CustomTooltip = ({ active, payload, label }) => {
  const { t } = useTranslation();

  const {
    dashboard: { chart },
  } = t;

  if (active && payload && payload.length) {
    return (
      <div className="bg-slate-950/90 border border-slate-800 p-3 rounded-xl shadow-xl backdrop-blur-md">
        <p className="text-sm font-bold text-white mb-1">{label}</p>
        <p className="text-xs text-amber-400 font-semibold">
          {chart.visitedEvents}{" "}
          <span className="font-extrabold">{payload[0].value}</span> / 30
        </p>
      </div>
    );
  }
  return null;
};

const ActivityChart = ({ data }) => {
  const [windowWidth, windowHeight] = useWindowSize();

  const { t } = useTranslation();

  const {
    dashboard: { chart },
  } = t;

  return (
    <div className="bg-slate-900/40 border border-slate-800/80 rounded-2xl p-6 backdrop-blur-md mb-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-bold text-white flex items-center gap-2">
          {chart.title}
        </h2>
        <span className="text-xs text-slate-400">{chart.subtitle}</span>
      </div>

      <div className="w-full" style={{ height: windowHeight / 1.8 }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 125, right: 10, left: -20, bottom: 25 }}
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
            />
            <YAxis
              stroke="#94a3b8"
              fontSize={18}
              domain={[0, 10]}
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

export default ActivityChart;
