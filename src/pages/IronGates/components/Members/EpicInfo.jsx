const EpicInfo = ({ epic }) => {
  return (
    <div className="space-y-1.5">
      <span className="text-lg text-slate-400 font-bold tracking-wider">
        Epic:
      </span>
      <div className="flex gap-1.5 overflow-x-scroll">
        {epic?.all?.map((item, index) => {
          const isGot = epic?.got?.includes(item);
          return (
            <div
              key={index}
              className={`px-2.5 py-1 rounded-lg text-sm 2xl:text-base 3xl:text-xl font-bold border transition ${
                isGot
                  ? "bg-amber-500/20 border-amber-500/50 text-amber-300 shadow-[0_0_10px_rgba(245,158,11,0.2)]"
                  : "bg-slate-900/50 border-slate-800 text-slate-500"
              }`}
            >
              {item === "Queen Ant" ? "QA" : item}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default EpicInfo;
