import useTranslation from "../../../hooks/useTranslation";

const LiveStatus = ({ activeCheck, timeLeft, responses }) => {
  const { t } = useTranslation();

  const formattedMinutes = String(Math.floor(timeLeft / 60)).padStart(2, "0");
  const formattedSeconds = String(timeLeft % 60).padStart(2, "0");

  return (
    <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-5 flex flex-col gap-4">
      <h2 className="text-lg font-extrabold text-sky-400 flex items-center justify-between">
        <span>📊 {t.afkCheck.liveStatusTitle}</span>
        {activeCheck && (
          <span
            className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border
            border-emerald-500/20 font-bold animate-pulse"
          >
            {t.afkCheck.activeBadge}
          </span>
        )}
      </h2>

      {activeCheck ? (
        <div className="flex flex-col gap-4">
          <div className="bg-slate-950 rounded-xl p-4 border border-slate-800 grid grid-cols-2 gap-4 text-center">
            <div>
              <span className="text-[10px] text-slate-500 uppercase font-bold">
                {t.afkCheck.timeLeftLabel}
              </span>
              <div className="text-3xl font-black text-amber-400 font-mono mt-0.5">
                {formattedMinutes}:{formattedSeconds}
              </div>
            </div>
            <div>
              <span className="text-[10px] text-slate-500 uppercase font-bold">
                {t.afkCheck.confirmedPlayersLabel}
              </span>
              <div className="text-3xl font-black text-emerald-400 font-mono mt-0.5">
                {responses.length}
              </div>
            </div>
          </div>

          {activeCheck.secret_code && (
            <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-3 text-center">
              <span className="text-xs text-amber-300 font-semibold">
                {t.afkCheck.voiceCodeLabel}{" "}
              </span>
              <span className="text-lg font-black text-amber-400 font-mono ml-1">
                {activeCheck.secret_code}
              </span>
            </div>
          )}

          {/* Table of Confirmed Responses */}
          <div className="flex flex-col gap-1.5 max-h-56 overflow-y-auto custom-scrollbar pr-1">
            <span className="text-xs font-bold text-slate-400 uppercase">
              {t.afkCheck.confirmedMembersHeader}
            </span>
            {responses.length === 0 ? (
              <span className="text-xs text-slate-600 italic py-2">
                {t.afkCheck.waitingResponses}
              </span>
            ) : (
              responses.map((resp, idx) => (
                <div
                  key={resp.discord_id || idx}
                  className="flex items-center justify-between bg-slate-950 px-3 py-2 rounded-lg border
                    border-slate-800 text-xs"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-emerald-400 font-bold">✅</span>
                    <span className="font-bold text-slate-200">
                      {resp.char_name}
                    </span>
                    <span className="text-[10px] text-slate-500 bg-slate-900 px-1.5 py-0.5 rounded">
                      {resp.cp_name}
                    </span>
                  </div>
                  <span className="text-[10px] font-mono text-slate-500">
                    {new Date(resp.timestamp).toLocaleTimeString()}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center h-48 text-slate-600 gap-2">
          <span className="text-3xl">💤</span>
          <span className="text-xs font-semibold">
            {t.afkCheck.noActiveCheck}
          </span>
        </div>
      )}
    </div>
  );
};

export default LiveStatus;
