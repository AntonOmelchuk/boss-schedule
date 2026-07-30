// src/pages/MediaPage.jsx
import { useMemo, useState } from "react";

import useYoutubeVideos from "../../../hooks/useYoutubeVideos";
import VideoModal from "./VideoModal";

const MediaPage = () => {
  const { videos, loading, error } = useYoutubeVideos();
  const [selectedVideo, setSelectedVideo] = useState(null);

  // Обираємо перше (найновіше) відео для Головного Банера (Featured)
  const featuredVideo = useMemo(() => videos[0] || null, [videos]);

  return (
    <div className="min-h-screen pb-16 space-y-8">
      {/* PAGE HEADER */}
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2">
          <span
            className="px-2.5 py-0.5 rounded-md text-[10px] font-black uppercase tracking-wider bg-red-600
            text-white shadow-sm shadow-red-900/50"
          >
            YouTube
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-100 tracking-tight">
            Media Hub
          </h1>
        </div>
        <p className="text-sm text-slate-400">
          Епічні моменти з нашого YouTube-каналу
        </p>
      </div>

      {/* ERROR STATE */}
      {error && (
        <div className="p-4 rounded-xl bg-red-950/30 border border-red-800/60 text-red-300 text-sm">
          Помилка завантаження медіа: {error}
        </div>
      )}

      {/* SKELETON LOADING STATE */}
      {loading && (
        <div className="space-y-6 animate-pulse">
          <div className="w-full aspect-[21/9] max-h-[380px] bg-slate-800/60 rounded-3xl" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[1, 2, 3].map((n) => (
              <div key={n} className="h-64 bg-slate-800/40 rounded-2xl" />
            ))}
          </div>
        </div>
      )}

      {!loading && videos.length === 0 && !error && (
        <div className="p-12 text-center rounded-2xl border border-slate-800 bg-slate-900/40 text-slate-400">
          Наразі відео відсутні.
        </div>
      )}

      {/* FEATURED HERO BANNER (NETFLIX STYLE) */}
      {!loading && featuredVideo && (
        <div
          className="relative group rounded-3xl overflow-hidden border border-slate-800/80 bg-slate-900 shadow-2xl
          transition-all duration-300"
        >
          <div className="relative aspect-video sm:aspect-[21/9] max-h-[420px] w-full overflow-hidden">
            {/* Background Thumbnail with Dark Gradient Overlays */}
            <img
              src={`https://img.youtube.com/vi/${featuredVideo.id}/hqdefault.jpg`}
              alt={featuredVideo.title}
              className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700
                ease-out"
              onError={(e) => {
                // Якщо навіть hqdefault заблоковано, ставимо mqdefault
                e.currentTarget.onerror = null; // Запобігає нескінченній петлі
                e.currentTarget.src = `https://img.youtube.com/vi/${featuredVideo.id}/mqdefault.jpg`;
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-transparent" />
            <div
              className="absolute inset-0 bg-gradient-to-r from-slate-950/80 via-transparent to-transparent
              hidden sm:block"
            />

            {/* Content overlay */}
            <div className="absolute bottom-0 left-0 p-5 sm:p-8 flex flex-col gap-3 max-w-2xl">
              <span className="text-xs font-bold text-amber-400 tracking-wider uppercase flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-amber-400" />
                Останній реліз • {featuredVideo.date}
              </span>
              <h2 className="text-xl sm:text-3xl font-black text-white leading-tight drop-shadow-md">
                {featuredVideo.title}
              </h2>
              {featuredVideo.description && (
                <p
                  className="text-xs sm:text-sm text-slate-300 line-clamp-2 leading-relaxed opacity-90 hidden
                  sm:block"
                >
                  {featuredVideo.description}
                </p>
              )}

              <button
                onClick={() => setSelectedVideo(featuredVideo)}
                className="mt-2 self-start px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 active:scale-95
                text-white font-bold text-sm shadow-lg shadow-red-950/50 flex items-center gap-2 transition-all
                  cursor-pointer"
              >
                <span>▶</span> Дивитися зараз
              </button>
            </div>
          </div>
        </div>
      )}

      {/* VIDEO GRID */}
      {!loading && videos.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-bold text-slate-200 tracking-tight">
            Усі відео ({videos.length})
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {videos.map((video) => (
              <div
                key={video.firebaseKey || video.id}
                onClick={() => setSelectedVideo(video)}
                className="group relative rounded-2xl bg-slate-900/80 border border-slate-800/80 overflow-hidden
                  cursor-pointer hover:border-slate-700 transition-all duration-300 hover:shadow-xl hover:-translate-y-1
                  flex flex-col justify-between"
              >
                {/* Card Thumbnail */}
                <div className="relative aspect-video w-full overflow-hidden bg-slate-950">
                  <img
                    src={`https://img.youtube.com/vi/${video.id}/hqdefault.jpg`}
                    alt={video.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500
                      ease-out opacity-90 group-hover:opacity-100"
                  />
                  <div className="absolute inset-0 bg-slate-950/20 group-hover:bg-transparent transition-colors" />

                  {/* Hover Play Button Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div
                      className="w-12 h-12 rounded-full bg-red-600/90 text-white flex items-center justify-center
                        pl-0.5shadow-xl scale-90 opacity-0 group-hover:opacity-100 group-hover:scale-100 transition-all
                        duration-300"
                    >
                      ▶
                    </div>
                  </div>

                  {/* Date badge */}
                  {video.date && (
                    <span
                      className="absolute bottom-2 right-2 px-2 py-0.5 text-[10px] font-bold rounded bg-slate-950/80
                      backdrop-blur-md text-slate-300 border border-slate-800"
                    >
                      {video.date}
                    </span>
                  )}
                </div>

                {/* Card Info */}
                <div className="p-4 flex flex-col gap-1.5 flex-1 justify-between">
                  <div>
                    <h4
                      className="text-lg font-bold text-slate-100 group-hover:text-amber-400 transition-colors
                      line-clamp-2 text-left"
                    >
                      {video.title}
                    </h4>
                    {video.description && (
                      <p className="text-left mt-1 text-base text-slate-400 line-clamp-2 leading-relaxed">
                        {video.description}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* POPUP CINEMA MODAL */}
      <VideoModal
        video={selectedVideo}
        onClose={() => setSelectedVideo(null)}
      />
    </div>
  );
};

export default MediaPage;
