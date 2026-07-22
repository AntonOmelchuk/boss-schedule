const COLOR_PALETTE = [
  "#38bdf8",
  "#34d399",
  "#fbbf24",
  "#f43f5e",
  "#a855f7",
  "#e879f9",
  "#f97316",
  "#22d3ee",
  "#a3e635",
  "#f472b6",
  "#818cf8",
  "#10b981",
  "#fb7185",
  "#c084fc",
  "#facc15",
];

const CustomTreemapContent = ({ x, y, width, height, index, name, value }) => {
  // Skip rendet text in too small boxes
  const showText = width > 35 && height > 25;
  const showValue = width > 50 && height > 40;

  return (
    <g>
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        style={{
          fill: COLOR_PALETTE[index % COLOR_PALETTE.length],
          stroke: "#0f172a",
          strokeWidth: 2,
          rx: 6,
          ry: 6,
          opacity: 0.85,
        }}
      />
      {showText && (
        <text
          x={x + width / 2}
          y={y + height / 2 - (showValue ? 6 : 0)}
          textAnchor="middle"
          fill="#ffffff"
          fontSize={width < 70 ? 10 : 15}
          fontWeight="100"
          fontFamily="ui-sans-serif, system-ui, -apple-system, sans-serif"
          style={{ pointerEvents: "none", userSelect: "none" }}
        >
          {name}
        </text>
      )}
      {showValue && (
        <text
          x={x + width / 2}
          y={y + height / 2 + 10}
          textAnchor="middle"
          fill="#ffffff"
          opacity={0.8}
          fontWeight="100"
          fontSize={12}
          fontFamily="ui-sans-serif, system-ui, sans-serif"
          className="pointer-events-none select-none"
        >
          {value} pl.
        </text>
      )}
    </g>
  );
};

export default CustomTreemapContent;
