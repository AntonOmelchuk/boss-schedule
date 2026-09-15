const MemberCardSkeleton = () => {
  return (
    <div className="relative z-20 flex-1 flex items-center justify-center w-full h-250">
      <div
        className="w-full bg-slate-950/85 border-2 border-slate-800 rounded-3xl p-6 lg:p-8
          backdrop-blur-2xl grid grid-cols-1 md:grid-cols-12 gap-6 items-start animate-pulse"
      >
        <div
          className="md:col-span-5 relative flex justify-center items-center py-4 rounded-2xl border-2
        border-slate-800 p-2"
        >
          <div
            className="relative w-48 h-48 lg:w-64 lg:h-64 rounded-full bg-slate-900 border-2 border-dashed
          border-slate-800 flex items-center justify-center"
          >
            <div className="w-36 h-36 lg:w-48 lg:h-48 rounded-full bg-slate-800/60" />
          </div>
        </div>

        <div className="md:col-span-7 space-y-4 w-full">
          <div className="flex justify-between items-center">
            <div className="h-10 w-48 bg-slate-800/80 rounded-2xl" />
            <div className="h-8 w-20 bg-slate-800/60 rounded-full" />
          </div>

          <div className="grid grid-cols-2 gap-2.5">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="bg-slate-900/70 border border-slate-800 rounded-xl p-3 space-y-2"
              >
                <div className="h-3 w-16 bg-slate-800 rounded" />
                <div className="h-4 w-28 bg-slate-800/80 rounded" />
              </div>
            ))}
          </div>

          <div className="space-y-1.5">
            <div className="h-4 w-12 bg-slate-800 rounded" />
            <div className="flex gap-1.5">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="h-7 w-12 bg-slate-900/80 border border-slate-800 rounded-lg"
                />
              ))}
            </div>
          </div>

          <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between">
            <div className="h-5 w-16 bg-slate-800 rounded" />
            <div className="h-5 w-20 bg-slate-800 rounded" />
            <div className="h-5 w-24 bg-slate-800 rounded" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MemberCardSkeleton;
