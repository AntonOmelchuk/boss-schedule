const TabButton = ({ active, onClick, icon, label }) => {
  const activeClasses = active
    ? "bg-amber-500 text-slate-950 shadow-lg shadow-amber-500/10"
    : "bg-slate-900 text-slate-400 hover:text-white border border-slate-800";

  return (
    <button
      onClick={onClick}
      className={`px-4 py-2.5 rounded-xl text-xs font-bold transition flex items-center gap-2
        whitespace-nowrap cursor-pointer ${activeClasses}`}
    >
      <span>{icon}</span> {label}
    </button>
  );
};

export default TabButton;
