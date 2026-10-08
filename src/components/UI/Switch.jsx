/* eslint-disable indent */
const Switch = ({ onClick, isActive, firstItem, secondItem }) => {
  return (
    <div
      className="bg-slate-900/30 backdrop-blur-md rounded-xl p-1 border border-slate-800 flex items-center
        cursor-pointer shadow-inner select-none"
      onClick={onClick}
    >
      <div
        className={`flex-1 px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-bold transition-all duration-300
          flex items-center justify-center gap-2 ${
            isActive
              ? "bg-amber-500 text-slate-950 shadow-md"
              : "text-slate-400 hover:text-slate-200"
          }`}
      >
        {firstItem}
      </div>
      <div
        className={`flex-1 px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-bold transition-all
          duration-300 flex items-center justify-center gap-2 ${
            !isActive
              ? "bg-amber-500 text-slate-950 shadow-md"
              : "text-slate-400 hover:text-slate-200"
          }`}
      >
        {secondItem}
      </div>
    </div>
  );
};

export default Switch;
