import BadgeOwner from "../../../components/BadgeOwner/BadgeOwner";
import OutPrime from "../../../components/OutPrime/OutPrime";
import useTranslation from "../../../hooks/useTranslation";
import { CATEGORIES_STYLE } from "../../../utils/constants";
import {
  formatDateForZone,
  formatTimeForZone,
  getDiplomacyConfig,
  getEventIsoTime,
} from "../../../utils/general";

const TableList = ({
  events,
  localTimezone,
  showLocalTime,
  activeTimezones,
  setDeletedEventIds,
}) => {
  const { language } = useTranslation();

  return (
    <>
      {events?.map(
        ({ id, ts, name, icon, category, owner, relation, isOutPrime }) => {
          const isoTime = getEventIsoTime(ts);
          const { badgeIcon, badgeClass } = getDiplomacyConfig(relation);

          return (
            <tr key={id} className="hover:bg-slate-800/30 transition-colors">
              <td className="p-4 font-bold text-slate-200">
                <div className="flex items-center justify-between group">
                  <div className="flex items-center">
                    <span className="text-xl mr-2.5">{icon}</span>
                    <span className="mr-4 min-w-52.5">{name}</span>
                    {owner && (
                      <BadgeOwner
                        badgeIcon={badgeIcon}
                        badgeClass={badgeClass}
                        owner={owner}
                      />
                    )}
                    {isOutPrime && <OutPrime />}
                  </div>
                  <button
                    onClick={() => setDeletedEventIds((p) => [...p, id])}
                    className="text-slate-600 hover:text-red-400 opacity-0 group-hover:opacity-100
                      ransition-all p-1 text-xs font-bold cursor-pointer"
                  >
                    ✕
                  </button>
                </div>
              </td>
              <td className="p-4">
                <span
                  className={`inline-block px-2.5 py-0.5 rounded-md text-[10px] font-black uppercase
                  tracking-wider border ${CATEGORIES_STYLE[category] || "border-slate-700"}`}
                >
                  {category}
                </span>
              </td>
              <td className="p-4 font-mono">
                <div className="text-slate-400 text-xs font-bold">
                  {formatDateForZone(isoTime, "UTC", language)}
                </div>
                <div className="text-base md:text-xl font-black text-slate-200 mt-1">
                  {formatTimeForZone(isoTime, "UTC")}
                </div>
              </td>
              {showLocalTime && (
                <td className="p-4 font-mono bg-slate-950/5">
                  <div className="text-slate-400/60 text-xs font-bold">
                    {formatDateForZone(isoTime, localTimezone, language)}
                  </div>
                  <div className="text-base md:text-xl font-black text-slate-400 mt-1">
                    {formatTimeForZone(isoTime, localTimezone)}
                  </div>
                </td>
              )}
              {activeTimezones.map((tz) => (
                <td key={tz} className="p-4 font-mono bg-slate-950/5">
                  <div className="text-slate-300/60 text-xs font-bold">
                    {formatDateForZone(isoTime, tz, language)}
                  </div>
                  <div className="text-base md:text-xl font-black text-slate-300 mt-1">
                    {formatTimeForZone(isoTime, tz)}
                  </div>
                </td>
              ))}
            </tr>
          );
        },
      )}
    </>
  );
};

export default TableList;
