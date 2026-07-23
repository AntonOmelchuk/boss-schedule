import { WINNER_ICONS } from "../../../../../../utils/constants";

const CPNameItem = ({ cpName, index }) => {
  const icon = WINNER_ICONS[index];

  const numberWidth = index > 8 ? "w-5" : "w-4";
  return (
    <div className="flex items-center gap-2">
      <span
        className={`text-xs md:text-sm min-[1820px]:text-lg font-mono font-bold text-slate-500 ${numberWidth}`}
      >
        {icon ? icon : `#${index + 1}`}
      </span>
      <span
        className="text-xs md:text-sm min-[1820px]:text-lg md:font-semibold text-slate-200
          group-hover:text-amber-400 transition"
      >
        {cpName}
      </span>
    </div>
  );
};

export default CPNameItem;
