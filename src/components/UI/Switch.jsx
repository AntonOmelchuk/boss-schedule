const Switch = ({ onClick, isActive, firstItem, secondItem }) => {
  return (
    <div
      className="bg-slate-800/80 backdrop-blur rounded-lg p-1 border
        border-slate-700 flex items-center cursor-pointer shadow-inner"
      onClick={onClick}
    >
      <div
        className={`flex-1 px-3 py-1 rounded-lg text-xs font-bold transition-all duration-300
          ${isActive ? "bg-zinc-600 text-white shadow-md" : "text-slate-400 hover:text-slate-200"}`}
      >
        {firstItem}
      </div>
      <div
        className={`flex-1 px-3 py-1 rounded-lg text-xs font-bold transition-all duration-300
          ${!isActive ? "bg-zinc-700 text-white shadow-md" : "text-slate-400 hover:text-slate-200"}`}
      >
        {secondItem}
      </div>
    </div>
  );
};

export default Switch;
