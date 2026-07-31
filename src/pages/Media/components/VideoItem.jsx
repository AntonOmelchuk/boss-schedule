const VideoItem = ({ firebaseKey, id, title, date, description, callback }) => {
  return (
    <div
      key={firebaseKey || id}
      onClick={callback}
      className="group relative rounded-2xl bg-slate-900/80 border border-slate-800/80 overflow-hidden
        cursor-pointer hover:border-slate-700 transition-all duration-300 hover:shadow-xl hover:-translate-y-1
        flex flex-col justify-between"
    >
      {/* Card Thumbnail */}
      <div className="relative aspect-video w-full overflow-hidden bg-slate-950">
        <img
          src={`https://img.youtube.com/vi/${id}/maxresdefault.jpg?v=${date || "1"}`}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500
            ease-out opacity-90 group-hover:opacity-100"
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = `https://img.youtube.com/vi/${id}/mqdefault.jpg`;
          }}
        />
        <div className="absolute inset-0 bg-slate-950/20 group-hover:bg-transparent transition-colors" />

        {/* Hover Play Button Overlay */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div
            className="w-12 h-12 rounded-full bg-red-600/90 text-white flex items-center justify-center
              pl-0.5 shadow-xl scale-90 opacity-0 group-hover:opacity-100 group-hover:scale-100 transition-all
              duration-300"
          >
            ▶
          </div>
        </div>

        {/* Date badge */}
        {date && (
          <span
            className="absolute bottom-2 right-2 px-2 py-0.5 text-[10px] font-bold rounded bg-slate-950/80
              backdrop-blur-md text-slate-300 border border-slate-800"
          >
            {date}
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
            {title}
          </h4>
          {description && (
            <p className="text-left mt-1 text-base text-slate-400 line-clamp-2 leading-relaxed">
              {description}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default VideoItem;
