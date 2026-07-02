const DropdownButton = ({ label, value, activeValue, onClick }) => {
  const isActive = value === activeValue;
  return (
    <button
      onClick={onClick}
      className={`w-full text-left px-4 py-2.5 text-xs font-bold transition-all
        duration-200 flex items-center justify-between uppercase tracking-wider
        ${isActive ? "text-amber-500 bg-slate-900/60" : "text-slate-400 hover:text-slate-200 hover:bg-slate-900/30"}`}
    >
      {label}
      {isActive && <span className="text-amber-500">●</span>}
    </button>
  );
};

export default DropdownButton;
