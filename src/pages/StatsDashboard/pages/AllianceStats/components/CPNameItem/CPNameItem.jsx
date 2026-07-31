import { SORT, WINNER_ICONS } from "../../../../../../utils/constants";

const CPNameItem = ({ cpName, index, viewMode }) => {
  const icon = WINNER_ICONS[index];

  const numberWidth = index > 8 ? "w-5" : "w-4";

  const getItemStyles = (idx) => {
    const topStyles = [
      {
        font: "text-[16px] md:text-[18px] min-[1820px]:text-[21px] font-bold",
        color: "text-amber-400 drop-shadow-[0_0_8px_rgba(251,191,36,0.2)]",
      },
      {
        font: "text-[15px] md:text-[17px] min-[1820px]:text-[20px] font-bold",
        color: "text-slate-300",
      },
      {
        font: "text-[14px] md:text-[16px] min-[1820px]:text-[19px] font-bold",
        color: "text-amber-600/90",
      },
    ];

    return (
      topStyles[idx] || {
        font: "md:text-sm min-[1820px]:text-lg md:font-semibold",
        color: "text-white group-hover:text-amber-400",
      }
    );
  };

  const { font, color } = getItemStyles(index);

  return (
    <div className={`flex items-center gap-${index < 9 ? 2 : 4}`}>
      <span
        className={`text-base min-[1820px]:text-lg font-mono font-bold text-slate-500 ${numberWidth}`}
      >
        {icon && viewMode !== SORT.PRIORITY ? icon : `#${index + 1}`}
      </span>
      <span className={`transition ${font} ${color}`}>{cpName}</span>
    </div>
  );
};

export default CPNameItem;
