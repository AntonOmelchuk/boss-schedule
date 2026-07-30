import { useState } from "react";

import useTranslation from "../../../hooks/useTranslation";

const FeaturedBanner = ({ featuredVideo, onSelect }) => {
  const { t } = useTranslation();

  const [isIframeLoaded, setIsIframeLoaded] = useState(false);

  if (!featuredVideo) return null;

  const { id, title, description, date } = featuredVideo;

  return (
    <div
      className="relative group rounded-3xl overflow-hidden border border-slate-800/80 bg-slate-950
      shadow-2xl transition-all duration-500"
    >
      <div className="relative aspect-video sm:aspect-21/9 max-h-110 w-full overflow-hidden">
        <img
          src={`https://img.youtube.com/vi/${id}/maxresdefault.jpg?v=${date || "1"}`}
          alt={title}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-3000 ease-in-out ${
            isIframeLoaded ? "opacity-0" : "opacity-100"
          }`}
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = `https://img.youtube.com/vi/${id}/mqdefault.jpg`;
          }}
        />

        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <iframe
            src={`https://www.youtube.com/embed/${id}?autoplay=1&mute=1&controls=0&loop=1
              &playlist=${id}&showinfo=0&rel=0&iv_load_policy=3&modestbranding=1&enablejsapi=1`}
            title="Auto Preview"
            onLoad={() => setIsIframeLoaded(true)}
            className="w-[150%] h-[150%] absolute -top-[25%] -left-[25%] object-cover scale-125
              transition-opacity duration-1000"
            allow="autoplay; encrypted-media"
          />
        </div>

        <div
          className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent
          pointer-events-none z-10"
        />

        <div
          className="absolute inset-0 bg-gradient-to-r from-slate-950/50 via-transparent to-transparent
          pointer-events-none hidden sm:block z-10"
        />

        <div className="absolute bottom-0 left-0 p-5 sm:p-8 flex flex-col gap-3 max-w-2xl z-20">
          <div className="flex items-center gap-2">
            <span
              className="px-2.5 py-0.5 rounded-md text-[10px] font-extrabold uppercase tracking-widest
              bg-red-600 text-white shadow-md animate-pulse"
            >
              ● {t.media.livePreview}
            </span>
            {date && (
              <span className="text-xs font-semibold text-amber-400 drop-shadow">
                • {date}
              </span>
            )}
          </div>

          <h2 className="text-xl sm:text-3xl font-black text-white leading-tight text-left drop-shadow-md">
            {title}
          </h2>

          {description && (
            <p
              className="text-xs sm:text-sm text-slate-200 line-clamp-2 leading-relaxed hidden
                sm:block text-left drop-shadow"
            >
              {description}
            </p>
          )}

          <div className="flex items-center gap-3 mt-2">
            <button
              onClick={() => onSelect(featuredVideo)}
              className="px-6 py-3 rounded-xl bg-red-600 hover:bg-red-500 active:scale-95 text-white
                font-bold text-sm shadow-xl shadow-red-950/50 flex items-center gap-2 transition-all cursor-pointer"
            >
              <span>▶</span> {t.media.watchWithSound}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedBanner;
