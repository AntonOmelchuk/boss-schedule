import { useEffect } from "react";

import useTranslation from "../../../hooks/useTranslation";

const VideoModal = ({ video, onClose }) => {
  const { t } = useTranslation();

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  if (!video) return null;

  const { id, title, description, date } = video;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/80
      backdrop-blur-xl animate-fadeIn"
    >
      {/* Backdrop click listener */}
      <div className="absolute inset-0" onClick={onClose} />

      <div
        className="relative z-10 w-full max-w-4xl bg-slate-900 border border-slate-800 rounded-2xl
        shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
      >
        {/* Header bar */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-slate-800/80 bg-slate-950/40">
          <span className="text-xs font-bold uppercase tracking-widest text-red-500 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            {t.media.cinemaMode}
          </span>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white
              transition-all flex items-center justify-center cursor-pointer"
          >
            ✕
          </button>
        </div>

        {/* Video Player Responsive Container */}
        <div className="relative w-full aspect-video bg-black">
          <iframe
            src={`https://www.youtube.com/embed/${id}?autoplay=1&rel=0`}
            title={title}
            className="w-full h-full border-0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>

        {/* Info Area */}
        <div className="p-5 overflow-y-auto space-y-3 bg-slate-900">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h2 className="text-lg sm:text-xl font-bold text-slate-100">
              {title}
            </h2>
            {date && (
              <span
                className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-800 text-slate-400
                  border border-slate-700/60"
              >
                {date}
              </span>
            )}
          </div>

          {description && (
            <p className="text-sm text-slate-400 leading-relaxed whitespace-pre-line">
              {description}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default VideoModal;
