import { useEffect } from "react";

import useTranslation from "../../../hooks/useTranslation";

export const TimezoneBlock = ({
  activeTimezones,
  timezoneToAdd,
  setTimezoneToAdd,
  addTimezone,
  errorMessage,
  removeTimezone,
}) => {
  const { t } = useTranslation();

  useEffect(() => {
    if (t.timezoneOptions?.length > 0) {
      setTimezoneToAdd(t.timezoneOptions[0].value);
    }
  }, [t]);

  return (
    <div className="bg-slate-900/60 border border-slate-800/80 p-5 rounded-2xl flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <h3 className="text-sm font-black tracking-widest text-slate-400 uppercase">
          {t.sbTzTitle}
        </h3>
        <span className="text-xs font-mono font-bold px-2 py-0.5 bg-slate-800 rounded-md text-slate-400">
          {activeTimezones.length} / 5
        </span>
      </div>
      <div className="flex gap-2">
        <select
          value={timezoneToAdd}
          onChange={(e) => {
            console.log("timezone: ", e.target.value);
            setTimezoneToAdd(e.target.value);
          }}
          className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs font-bold
          text-slate-200 outline-none"
        >
          {t.timezoneOptions?.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.name}
            </option>
          ))}
        </select>
        <button
          onClick={addTimezone}
          className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 rounded-xl text-xs font-black uppercase cursor-pointer"
        >
          {t.sbAddBtn}
        </button>
      </div>
      {errorMessage && (
        <p className="text-xs text-red-400 font-bold">{errorMessage}</p>
      )}
      <div className="flex flex-wrap gap-2">
        {activeTimezones.map((tz) => (
          <span
            key={tz}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-950 border border-slate-800 text-xs
              font-mono font-bold rounded-lg text-slate-300"
          >
            {tz.split("/").pop().replace("_", " ")}
            <button
              onClick={() => removeTimezone(tz)}
              className="text-red-400 hover:text-red-300 font-bold ml-1 cursor-pointer"
            >
              ✕
            </button>
          </span>
        ))}
      </div>
    </div>
  );
};

export default TimezoneBlock;
