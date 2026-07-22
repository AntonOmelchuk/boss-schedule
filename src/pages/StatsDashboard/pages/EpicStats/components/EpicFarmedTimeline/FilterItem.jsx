const FilterItem = ({ onClickHandler, isActive, title }) => {
  return (
    <button
      onClick={onClickHandler}
      className={`px-3 py-1 rounded-lg text-xs font-semibold cursor-pointer transition flex items-center gap-1 ${
        isActive
          ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
          : "text-slate-400 hover:text-emerald-400"
      }`}
    >
      <span className="capitalize">{title}</span>
    </button>
  );
};

export default FilterItem;
