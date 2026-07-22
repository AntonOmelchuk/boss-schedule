const CustomLabel = ({ cx, cy, midAngle, outerRadius, name, value, fill }) => {
  const RADIAN = Math.PI / 180;

  const radius = outerRadius + 20;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="#f1f5f9"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
      className="text-4 font-bold"
    >
      <tspan fill={fill}>{name}</tspan> ({value})
    </text>
  );
};

export default CustomLabel;
