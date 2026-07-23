const Tab = ({
  onClickHandler,
  isActive,
  title,
  icon,
  className = "",
  activeClassName = "bg-indigo-600 text-white shadow",
  inactiveClassName = "text-slate-400 hover:text-slate-200",
}) => {
  return (
    <button
      onClick={onClickHandler}
      className={`rounded-lg font-semibold cursor-pointer transition flex items-center justify-center gap-1.5 ${
        isActive ? activeClassName : inactiveClassName
      } ${className}`}
    >
      {icon && <span>{icon}</span>}
      {title && <span className="capitalize">{title}</span>}
    </button>
  );
};

export default Tab;
