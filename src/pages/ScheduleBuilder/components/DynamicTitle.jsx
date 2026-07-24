import { useMemo } from "react";

import TitleWithWatermark from "../../../components/TitleWithWatermark/TitleWithWatermark";
import useTranslation from "../../../hooks/useTranslation";
import { formatDateForZone } from "../../../utils/general";

const DynamicTitle = ({ events, size = "md" }) => {
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

    // If all events are at the same date -> write just this day, different -> date range
    const dateRange =
      startDateStr === endDateStr
        ? startDateStr
        : `${startDateStr} — ${endDateStr}`;

    return `The 3rd Side | ${t.sbScheduleFor} ${t.sbOn} ${dateRange}`;
  }, [events, language, t]);

  return <TitleWithWatermark title={tableTitle} size={size} />;
};

export default DynamicTitle;
