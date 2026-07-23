const FilterTab = ({
  onClickHandler,
  isActive,
  title,
  className = "",
  activeClassName = "bg-indigo-600 text-white shadow",
}) => {
  return (
    <button
      onClick={onClickHandler}
      className={`px-3 py-1 rounded-lg text-xs font-semibold cursor-pointer transition flex items-center gap-1 ${
        isActive ? activeClassName : "text-slate-400 hover:text-slate-200"
      } ${className}`}
    >
      <span className="capitalize">{title}</span>
    </button>
  );
};

export default FilterTab;
