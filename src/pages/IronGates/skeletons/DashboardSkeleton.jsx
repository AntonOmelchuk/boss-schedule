import useWindowSize from "../../../hooks/useWindowSize";

const DashboardSkeleton = ({ hideScrollLine }) => {
  const [windowWidth, windowHeight] = useWindowSize();

  return (
    <div className="px-8 relative pt-2 animate-pulse">
      <div className="flex justify-center mb-4">
        <div className="w-36 h-7 bg-slate-800 rounded-full" />
      </div>

      {/* Skeleton cards */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-5 h-36 flex flex-col justify-between"
          >
            <div className="flex justify-between items-start">
              <div className="space-y-2">
                <div className="w-24 h-4 bg-slate-800 rounded" />
                <div className="w-16 h-7 bg-slate-800 rounded" />
              </div>
              <div className="w-15 h-15 bg-slate-800 rounded-xl" />
            </div>
            <div className="w-full h-4 bg-slate-800 rounded" />
          </div>
        ))}
      </section>

      {/* Skeleton events infinite scroll */}
      {hideScrollLine || (
        <div className="w-full h-10 bg-slate-900/40 border border-slate-800/80 rounded-xl mb-8" />
      )}

      <div
        className="w-full bg-slate-900/40 border border-slate-800/80 rounded-2xl p-6 mb-8 flex flex-col justify-between"
        style={{ height: windowHeight / 1.8 }}
      >
        <div className="flex items-center justify-between mb-6">
          <div className="w-64 h-6 bg-slate-800 rounded" />
          <div className="w-32 h-4 bg-slate-800 rounded" />
        </div>

        <div className="w-full h-full flex items-end justify-around gap-4 pt-12 pb-2 px-4">
          {[...Array(10)].map((_, i) => {
            const heights = [
              "h-3/5",
              "h-4/5",
              "h-2/5",
              "h-full",
              "h-3/4",
              "h-1/2",
              "h-5/6",
              "h-3/5",
              "h-4/6",
              "h-2/3",
            ];

            return (
              <div
                key={i}
                className="flex-1 h-full flex flex-col items-center justify-end relative"
              >
                <div
                  className={`${heights[i]} bg-slate-800/80 rounded-t-lg`}
                  style={{ width: windowWidth / 25 }}
                />
              </div>
            );
          })}
        </div>

        <div className="flex justify-around pt-3 border-t border-slate-800/60">
          {[...Array(10)].map((_, i) => (
            <div key={i} className="w-21 h-4 bg-slate-800 rounded" />
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardSkeleton;
