const TypeCountItem = ({ label, count, badgeBg, icon }) => {
  return (
    <div
      title={`${label}: ${count}`}
      className={`flex items-center gap-1 px-2 py-1 rounded-xl border ${badgeBg}`}
    >
      <img
        src={icon}
        className="w-4 h-4 min-[1800px]:w-5 min-[1800px]:h-5 mr-1"
      />
      <span className="font-mono text-xs min-[1800px]:text-bse"> x{count}</span>
    </div>
  );
};

export default TypeCountItem;
