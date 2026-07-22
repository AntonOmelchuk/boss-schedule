import { EPIC_COLORS } from "../../../../../../utils/constants";

const DistributionItem = ({ name, total, epicByType, lastShareDate }) => {
  return (
    <tr className="hover:bg-slate-800/30 transition">
      <td className="text-lg py-3 px-4 font-bold text-slate-100">{name}</td>
      <td className="text-lg  py-3 px-4 font-extrabold text-sky-400">
        {total}
      </td>
      <td className="py-3 px-4">
        <div className="flex flex-wrap gap-1.5">
          {Object.entries(epicByType).map(([epic, count]) => (
            <span
              key={epic}
              className="px-2 py-0.5 rounded text-lg font-semibold text-slate-100 border
              border-slate-700/80"
              style={{
                backgroundColor: `${EPIC_COLORS[epic] || "#334155"}33`,
                borderColor: EPIC_COLORS[epic] || "#475569",
              }}
            >
              {epic}: <strong className="text-white">{count}</strong>
            </span>
          ))}
        </div>
      </td>
      <td className="text-lg py-3 px-4 text-slate-400">
        {lastShareDate || "N/A"}
      </td>
    </tr>
  );
};

export default DistributionItem;
