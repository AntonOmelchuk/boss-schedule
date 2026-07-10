import useTranslation from "../../../hooks/useTranslation";
import DynamicTitle from "./DynamicTitle";
import TableList from "./TableList";

const MainTable = ({
  tableRef,
  showLocalTime,
  localTimezone,
  processedEvents,
  activeTimezones,
  removeTimezone,
  setDeletedEventIds,
}) => {
  const { t } = useTranslation();
  return (
    <div
      ref={tableRef}
      className="bg-slate-900 border border-slate-800/80 rounded-2xl overflow-hidden shadow-2xl"
    >
      <DynamicTitle events={processedEvents} />
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-left">
          <thead>
            <tr className="bg-slate-950 border-b border-slate-800">
              <th className="p-4 text-xs font-black tracking-widest text-slate-400 uppercase">
                {t.sbTableEvent}
              </th>
              <th className="p-4 text-xs font-black tracking-widest text-slate-400 uppercase">
                {t.sbTableCategory}
              </th>
              <th className="p-4 text-xs font-black tracking-widest text-slate-400 uppercase">
                {t.sbTableServerTime}
              </th>
              {showLocalTime && (
                <th className="p-4 text-xs font-black tracking-widest text-slate-100 uppercase">
                  {t.sbTableLocalTime}
                </th>
              )}
              {activeTimezones.map((tz) => (
                <th
                  key={tz}
                  className="p-4 text-xs font-black tracking-widest text-slate-100 uppercase"
                >
                  <div className="flex items-center justify-between">
                    <span>{tz.split("/").pop().replace("_", " ")}</span>
                    <button
                      onClick={() => removeTimezone(tz)}
                      className="hover:text-red-400 text-slate-500 text-[11px] font-bold px-1"
                    >
                      ✕
                    </button>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/50">
            {processedEvents?.length === 0 ? (
              <tr>
                <td
                  colSpan={4 + activeTimezones.length}
                  className="p-12 text-center text-slate-500 font-bold uppercase text-xs"
                >
                  {t.sbNoEvents}
                </td>
              </tr>
            ) : (
              <TableList
                events={processedEvents}
                showLocalTime={showLocalTime}
                localTimezone={localTimezone}
                activeTimezones={activeTimezones}
                setDeletedEventIds={setDeletedEventIds}
              />
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MainTable;
