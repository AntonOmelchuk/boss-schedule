const TabItem = ({ setActiveTab, onClose, isActive, label }) => {
  const activeStyles = isActive
    ? "bg-sky-500/20 text-sky-400 border border-sky-500/30"
    : "bg-slate-950/50 text-slate-300 hover:bg-slate-800/60";

  return (
    <button
      onClick={() => {
        setActiveTab();
        onClose();
      }}
      className={`w-full text-left px-4 py-3 rounded-xl font-bold text-base transition
        flex items-center justify-between
        ${activeStyles}`}
    >
      <span>{label}</span>
      {isActive && <span className="text-sky-400 font-bold">✓</span>}
    </button>
  );
};

export default TabItem;
