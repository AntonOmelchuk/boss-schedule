import { EPIC_COLORS } from "../../../../../../constants/general";

const GroupedCard = ({ groupedLoot }) => {
  return (
    <div className="mt-3 flex flex-wrap gap-1.5 max-h-28 overflow-y-auto custom-scrollbar pr-1">
      {groupedLoot.map(({ name, count }) => {
        const epicColor = EPIC_COLORS[name] || "#f59e0b";

        return (
          <div
            key={name}
            style={{
              backgroundColor: `${epicColor}20`,
              borderColor: `${epicColor}`,
              color: "#fff",
            }}
            className="flex items-center gap-1.5 text-base font-bold px-2.5 py-1
              rounded-lg border transition-all select-none"
          >
            <span>{name}</span>
            <span
              style={{ backgroundColor: epicColor }}
              className="text-slate-950 px-1 py-0.5 rounded text-xs"
            >
              ×{count}
            </span>
          </div>
        );
      })}
    </div>
  );
};

export default GroupedCard;
