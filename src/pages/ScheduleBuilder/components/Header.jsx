import { useState } from "react";

import useFilterEvents from "../../../hooks/useFilterEvents";
import useTranslation from "../../../hooks/useTranslation";
import {
  formatDateForZone,
  formatTimeForZone,
  getEventIsoTime,
} from "../../../utils/general";

const Header = ({
  showLocalTime,
  activeTimezones,
  language,
  localTimezone,
}) => {
  const { t } = useTranslation();
  const { filteredEvents } = useFilterEvents();

  const [copiedStatus, setCopiedStatus] = useState(false);

  const generateDiscordFormat = (events) => {
    let output = `${t.sbDiscordHeader}\n========================================\n\n`;

    events.forEach((evt) => {
      const isoTime = getEventIsoTime(evt);
      const serverTimeFormatted = formatTimeForZone(isoTime, "UTC");
      const eventDate = formatDateForZone(isoTime, "UTC", language);

      output += `${evt.icon} **${evt.name}** (${evt.category})\n`;
      output += `   • ${t.sbDiscordDate}: ${eventDate}\n`;
      output += `   • ${t.sbDiscordServer}: 🕐 ${serverTimeFormatted} UTC\n`;

      if (showLocalTime) {
        const localTimeFormatted = formatTimeForZone(isoTime, localTimezone);
        output += `   • ${t.sbDiscordLocal}: 🏠 ${localTimeFormatted}\n`;
      }

      activeTimezones.forEach((tz) => {
        const shortTzName = tz.split("/").pop().replace("_", " ");
        output += `   • ${shortTzName}: 🕒 ${formatTimeForZone(isoTime, tz)}\n`;
      });
      output += "\n";
    });

    output += t.sbDiscordFooter;

    navigator.clipboard.writeText(output).then(() => {
      setCopiedStatus(true);
      setTimeout(() => setCopiedStatus(false), 3000);
    });
  };

  return (
    <div
      className="mb-8 border-b border-slate-800 pb-6 flex flex-col
      md:flex-row justify-between items-start md:items-center gap-4 animate-in fade-in duration-300"
    >
      <div>
        <h1
          className="text-2xl md:text-3xl font-black tracking-widest
          text-transparent [-webkit-text-stroke:1px_#94a3b8] uppercase"
        >
          {t.sbTitle}
        </h1>
      </div>
      <button
        onClick={() => generateDiscordFormat(filteredEvents)}
        className="flex items-center gap-2 py-2.5 px-5 text-xs font-black uppercase tracking-wider
         bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl border
         border-indigo-500/40 transition-all duration-300 shadow-lg cursor-pointer"
      >
        {copiedStatus ? t.sbCopied : t.sbExportBtn}
      </button>
    </div>
  );
};

export default Header;
