const AllEventsItemSkeleton = () => {
  return (
    <div className="relative rounded-xl p-px overflow-hidden border border-slate-800/50 bg-slate-900/50 animate-pulse">
      <div
        className="bg-slate-900/95 backdrop-blur-xl rounded-xl p-2.5 relative z-10 flex items-center gap-3 w-full
        h-full text-left"
      >
        <div className="w-12 h-12 md:w-14 md:h-14 rounded-lg bg-slate-800/80 border border-slate-700/50 shrink-0" />
        <div className="flex-1 overflow-hidden min-w-0 space-y-2 py-0.5">
          <div className="w-4/5 h-4 bg-slate-800 rounded-md" />
          <div className="w-2/5 h-3 bg-slate-800/60 rounded" />
        </div>
      </div>
    </div>
  );
};

export default AllEventsItemSkeleton;
