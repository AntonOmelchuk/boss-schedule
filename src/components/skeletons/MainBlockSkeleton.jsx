const MainBlockSkeleton = () => {
  return (
    <div className="relative my-4 md:mb-8 rounded-3xl p-0.5 overflow-hidden shadow-2xl border border-slate-800/80">
      <div
        className="bg-slate-900/95 backdrop-blur-xl rounded-3xl p-4 md:p-6 relative z-10 flex flex-col
        md:flex-row justify-between items-start md:items-center md:gap-6 text-left animate-pulse"
      >
        <div className="flex items-center gap-4 w-full md:w-auto">
          <div className="w-12 h-12 md:w-20 md:h-20 rounded-2xl bg-slate-800/80 border border-slate-700/50 shrink-0" />

          <div className="space-y-2.5 flex-1">
            <div className="w-28 h-5 bg-slate-800/70 rounded" />
            <div className="w-48 md:w-64 h-7 md:h-9 bg-slate-800 rounded-lg" />
            <div className="flex gap-2 pt-1">
              <div className="w-20 h-5 bg-slate-800/50 rounded-md" />
            </div>
          </div>
        </div>

        <div
          className="w-full md:w-auto text-left md:text-right border-t border-slate-800/85
          md:border-t-0 pt-4 md:pt-0 mt-4 md:mt-0"
        >
          <div className="w-24 h-3 bg-slate-800/60 rounded mb-2 md:ml-auto" />
          <div className="w-36 md:w-44 h-8 md:h-10 bg-slate-800 rounded-lg md:ml-auto" />
        </div>
      </div>
    </div>
  );
};

export default MainBlockSkeleton;
