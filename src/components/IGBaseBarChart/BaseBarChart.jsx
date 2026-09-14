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
} from "../../constants/members";
import useWindowSize from "../../hooks/useWindowSize";

const firstPlace = `${STORAGE_URL}/badges/gold_badge.png`;
const secondPlace = `${STORAGE_URL}/badges/silver_badge.png`;
const thirdPlace = `${STORAGE_URL}/badges/bronze_badge.png`;

// Перенесена і загальна кастомна колонка з аватаркою та бейджем
export const CustomizedBarWithAvatar = (props) => {
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
  const gradientId = `base-gradient-${name}`;

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

const BaseBarChart = ({
  data,
  title,
  subtitle,
  customTooltip,
  yAxisDomain = [0, "dataMax + 2"],
  xAxisAngle = 0,
  containerHeight,
  margin = { top: 125, right: 0, left: 0, bottom: 25 },
}) => {
  const [windowWidth, windowHeight] = useWindowSize();

  if (!data || data.length === 0) return null;

  const chartHeight = containerHeight || Math.max(windowHeight / 1.8, 400);

  return (
    <div className="bg-slate-900/40 border border-slate-800/80 rounded-2xl p-6 backdrop-blur-md mb-8 text-white">
      {(title || subtitle) && (
        <div className="flex items-center justify-between mb-6">
          {title && (
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              {title}
            </h2>
          )}
          {subtitle && (
            <span className="text-xs text-slate-400">{subtitle}</span>
          )}
        </div>
      )}

      <div className="w-full" style={{ height: chartHeight }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={margin}>
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
              angle={xAxisAngle}
              textAnchor={xAxisAngle !== 0 ? "end" : "middle"}
            />
            <YAxis
              stroke="#94a3b8"
              fontSize={18}
              domain={yAxisDomain}
              tickLine={false}
            />
            <Tooltip content={customTooltip} />
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

export default BaseBarChart;
