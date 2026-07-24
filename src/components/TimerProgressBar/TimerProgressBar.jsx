import { useEffect, useState } from "react";

const TimerProgressBar = ({
  maxTimeSeconds = 45,
  isLoading = true,
  onComplete,
  label,
}) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!isLoading) {
      // If loaded faser - set 100%
      setProgress(100);
      return;
    }

    const intervalTimeMs = 100; // update every 0.1s
    const totalSteps = (maxTimeSeconds * 1000) / intervalTimeMs;
    const incrementPerStep = 100 / totalSteps;

    const timer = setInterval(() => {
      setProgress((prev) => {
        const nextValue = prev + incrementPerStep;
        if (nextValue >= 100) {
          clearInterval(timer);
          if (onComplete) onComplete();
          return 100;
        }
        return nextValue;
      });
    }, intervalTimeMs);

    return () => clearInterval(timer);
  }, [isLoading, maxTimeSeconds, onComplete]);

  // Calculate how many sec left
  const secondsLeft = Math.max(
    0,
    Math.ceil(maxTimeSeconds - (progress / 100) * maxTimeSeconds),
  );

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/10 backdrop-blur-md flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div
          className="w-full bg-slate-900/40 border border-slate-800 rounded-2xl p-5
        backdrop-blur-md flex flex-col gap-3 shadow-xl"
        >
          {/* Top Details */}
          <div className="flex justify-between items-center text-xs font-semibold">
            <span className="text-slate-300 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse" />
              <span className="text-xs md:text-sm xl:text-base">{label}</span>
            </span>
            <div className="flex items-center gap-3 font-mono">
              <span className="text-slate-500 text-xs md:text-sm xl:text-base">
                {secondsLeft}s max
              </span>
              <span className="text-sky-400 font-bold text-xs md:text-sm xl:text-base">
                {Math.min(100, Math.round(progress))}%
              </span>
            </div>
          </div>

          {/* Progress Track */}
          <div className="w-full bg-slate-950/80 rounded-full h-3 p-0.5 border border-slate-800 overflow-hidden">
            <div
              className="bg-gradient-to-r from-sky-600 via-indigo-500 to-amber-400 h-full rounded-full
                transition-all duration-100 ease-linear"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimerProgressBar;
