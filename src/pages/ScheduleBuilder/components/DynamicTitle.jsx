import { useMemo } from "react";

import allyLogo from "../../../assets/ally-logo.png";
import useTranslation from "../../../hooks/useTranslation";
import { formatDateForZone } from "../../../utils/general";

const DynamicTitle = ({ events }) => {
  const { t, language } = useTranslation();

  const tableTitle = useMemo(() => {
    if (!events || events.length === 0) return "";

    const firstEventIso =
      events[0].ts || new Date(events[0].serverTime).getTime();
    const lastEventIso =
      events[events.length - 1].ts ||
      new Date(events[events.length - 1].serverTime).getTime();

    const startDateStr = formatDateForZone(firstEventIso, "UTC", language);
    const endDateStr = formatDateForZone(lastEventIso, "UTC", language);

    // Якщо всі івенти в один і той самий день, пишемо просто цей день. Якщо дні різні — показуємо діапазон.
    const dateRange =
      startDateStr === endDateStr
        ? startDateStr
        : `${startDateStr} — ${endDateStr}`;

    return `The 3rd Side | ${t.sbScheduleFor} ${t.sbOn} ${dateRange}`;
  }, [events, language, t]);

  return (
    <div className="px-5 py-4 border-b border-slate-800/60 bg-slate-950/40 flex items-center justify-center">
      <img
        src={allyLogo}
        alt="The 3rd Side Logo"
        className="w-6 h-6 object-contain rounded-full filter drop-shadow-[0_0_8px_rgba(99,102,241,0.5)] mr-4"
      />
      <h2 className="text-lg font-black tracking-widest text-indigo-100 uppercase font-mono">
        {tableTitle}
      </h2>
    </div>
  );
};

export default DynamicTitle;
