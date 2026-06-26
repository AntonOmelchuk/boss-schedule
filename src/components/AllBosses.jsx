import { formatRemaining } from "../utils/general";

const AllBosses = ({ bosses, t, lang, now }) => {
  return (
    <>
      <div className="mb-4 flex justify-between items-end border-b border-slate-700 pb-2">
        <h3 className="text-xl font-bold text-slate-200">{t.allEvents}</h3>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {bosses.length === 0 ? (
          <div className="col-span-full text-center text-slate-500 py-8">
            {t.noBosses}
          </div>
        ) : (
          bosses.map((boss) => {
            const diff = boss.ts - now;
            const timeStr = formatRemaining(diff, true, t);
            const isSpawned = diff <= 0;
            const spawnDate = new Date(boss.ts).toLocaleString(
              lang === "uk" ? "uk-UA" : "en-US",
              {
                month: "short",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              },
            );

            return (
              <div
                key={boss.id}
                className="bg-slate-800 rounded-lg p-4 border border-slate-700 flex items-center shadow-lg hover:border-slate-500 transition-colors"
              >
                <div className="text-4xl mr-4 bg-slate-900 p-2 rounded">
                  {boss.icon}
                </div>
                <div className="flex-1 overflow-hidden">
                  <div className="font-bold text-lg text-slate-100 truncate">
                    {boss.name}
                  </div>
                  <div className="text-xs text-slate-400 mb-1">{spawnDate}</div>
                  <div
                    className={`font-mono font-bold ${isSpawned ? "text-green-500 animate-pulse" : "text-amber-400"}`}
                  >
                    {isSpawned ? t.spawned : timeStr}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </>
  );
};

export default AllBosses;
