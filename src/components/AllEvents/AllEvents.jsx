import { LANGUAGES } from "../../utils/constants";
import AllEventsItem from "./AllEventsItem";

const AllEvents = ({ events, t, lang, showPvP, setShowPvP }) => {
  return (
    <>
      <div className="mb-4 flex justify-between items-end border-b border-slate-700 pb-2">
        <h3 className="text-xl font-bold text-slate-200">{t.allEvents}</h3>

        <div
          className="flex items-center gap-2 cursor-pointer text-lg"
          onClick={setShowPvP}
        >
          <span className={showPvP ? "text-amber-500" : "text-slate-500"}>
            {t.pvpEvents}
          </span>
          <div
            className={`w-8 h-4 rounded-full transition-colors ${showPvP ? "bg-amber-600" : "bg-slate-700"}`}
          >
            <div
              className={`w-4 h-4 bg-white rounded-full transition-transform
                ${showPvP ? "translate-x-4" : "translate-x-0"}`}
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {events.length === 0 ? (
          <div className="col-span-full text-center text-slate-500 py-8">
            {t.noBosses}
          </div>
        ) : (
          events.map((event) => {
            const spawnDate = new Date(event.ts).toLocaleString(
              lang === LANGUAGES.UA ? "uk-UA" : "en-US",
              {
                month: "short",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              },
            );

            const { id, icon, name, enemy, owner, relation, isSwat } = event;

            return (
              <AllEventsItem
                t={t}
                key={id}
                icon={icon}
                name={name}
                enemy={enemy}
                owner={owner}
                isSwat={isSwat}
                relation={relation}
                spawnDate={spawnDate}
              />
            );
          })
        )}
      </div>
    </>
  );
};

export default AllEvents;
