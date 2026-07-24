import useMediaQuery from "../../../../../../hooks/useMediaQuery";
import { BREAKPOINTS } from "../../../../../../utils/constants";

const CustomLabel = ({ cx, cy, midAngle, outerRadius, name, value, fill }) => {
  const isMobile = useMediaQuery(BREAKPOINTS.IS_MOBILE);

  const RADIAN = Math.PI / 180;

  const radius = outerRadius + (isMobile ? 12 : 20);
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  const textAnchor = x > cx ? "start" : "end";

  return (
    <text
      x={x}
      y={y}
      fill="#f1f5f9"
      textAnchor={textAnchor}
      dominantBaseline="central"
      className="text-[10px] md:text-base font-bold"
    >
      <tspan x={x} fill={fill}>
        {name}
      </tspan>

      <tspan
        x={isMobile ? x : undefined}
        dy={isMobile ? "1.2em" : undefined}
        fill="#94a3b8"
      >
        {isMobile ? `(${value})` : ` (${value})`}
      </tspan>
    </text>
  );
};

export default CustomLabel;
