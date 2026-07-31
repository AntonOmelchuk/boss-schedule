import { useState } from "react";

import useTranslation from "../../hooks/useTranslation";
import useYoutubeVideos from "../../hooks/useYoutubeVideos";
import FeaturedBanner from "./components/FeaturedBanner";
import VideoItem from "./components/VideoItem";
import VideoModal from "./components/VideoModal";

const MediaPage = () => {
  const { t } = useTranslation();
  const { videos, loading, error } = useYoutubeVideos();

  const [selectedVideo, setSelectedVideo] = useState(null);

  const featuredVideo = videos.find((item) => item?.isForPreview) || videos[0];

  return (
    <div className="min-h-screen pb-16 space-y-8">
      {/* PAGE HEADER */}
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2">
          <span
            className="px-2.5 py-0.5 rounded-md text-[10px] font-black uppercase tracking-wider bg-red-600
            text-white shadow-sm shadow-red-900/50"
          >
            {t.media.badge}
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-100 tracking-tight">
            {t.media.title}
          </h1>
        </div>
        <p className="max-md:mt-4 text-sm text-slate-400">{t.media.subtitle}</p>
      </div>

      {/* ERROR STATE */}
      {error && (
        <div className="p-4 rounded-xl bg-red-950/30 border border-red-800/60 text-red-300 text-sm">
          {t.media.errorLoading} {error}
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
          {t.media.noVideos}
        </div>
      )}

      {/* FEATURED HERO BANNER (NETFLIX STYLE) */}
      {!loading && featuredVideo && (
        <FeaturedBanner
          featuredVideo={featuredVideo}
          onSelect={setSelectedVideo}
        />
      )}

      {/* VIDEO GRID */}
      {!loading && videos.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-bold text-slate-200 tracking-tight">
            {t.media.allVideos} ({videos.length})
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {videos.map((video) => {
              const { id, title, description, date } = video;
              return (
                <VideoItem
                  key={video.firebaseKey || id}
                  id={id}
                  title={title}
                  description={description}
                  date={date}
                  callback={() => setSelectedVideo(video)}
                />
              );
            })}
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
