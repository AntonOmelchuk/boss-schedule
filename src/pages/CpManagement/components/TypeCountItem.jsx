const TypeCountItem = ({ label, count, badgeBg, icon }) => {
  return (
    <div
      title={`${label}: ${count}`}
      className={`flex items-center gap-1 px-2 py-1 rounded-xl border text-xs font-bold ${badgeBg}`}
    >
      <img src={icon} className="w-5 h-5 mr-1" />
      <span className="font-mono text-base"> x{count}</span>
    </div>
  );
};

export default TypeCountItem;
