import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { MEMBERS_MAP } from "../../../../constants/general";
import useWindowSize from "../../../../hooks/useWindowSize";

const CustomizedBarWithAvatar = (props) => {
  const { x, y, width, height, payload } = props;

  const member = MEMBERS_MAP[payload?.name];
  const avatarUrl = member ? member.image : null;
  const avatarSize = 90;
  const cx = x + width / 2;

  const cy = y - avatarSize - 10;

  return (
    <g>
      <path
        d={`M ${x},${y + height}
            L ${x},${y + 6}
            Q ${x},${y} ${x + 6},${y}
            L ${x + width - 6},${y}
            Q ${x + width},${y} ${x + width},${y + 6}
            L ${x + width},${y + height}
            Z`}
        fill="#334155"
      />

      {avatarUrl && (
        <image
          x={cx - avatarSize / 2}
          y={cy > 0 ? cy : 0}
          width={avatarSize}
          height={avatarSize}
          href={avatarUrl}
          clipPath="circle(50% at 50% 50%)"
          className="object-cover"
        />
      )}
    </g>
  );
};

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-slate-950/90 border border-slate-800 p-3 rounded-xl shadow-xl backdrop-blur-md">
        <p className="text-sm font-bold text-white mb-1">{label}</p>
        <p className="text-xs text-amber-400 font-semibold">
          Відвідано івентів:{" "}
          <span className="font-extrabold">{payload[0].value}</span> / 15
        </p>
      </div>
    );
  }
  return null;
};

const ActivityChart = ({ data }) => {
  const [windowWidth, windowHeight] = useWindowSize();

  return (
    <div className="bg-slate-900/40 border border-slate-800/80 rounded-2xl p-6 backdrop-blur-md mb-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-bold text-white flex items-center gap-2">
          Рейтинг активності гравців (Останні 15 подій)
        </h2>
        <span className="text-xs text-slate-400">Графік відвідуваності</span>
      </div>

      <div className="w-full pt-4" style={{ height: windowHeight / 1.8 }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 100, right: 10, left: -20, bottom: 25 }}
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
