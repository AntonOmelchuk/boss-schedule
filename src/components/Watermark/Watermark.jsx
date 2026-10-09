const WATERMARK_SIZES = {
  sm: {
    text: "text-[10px]",
    logo: "w-4 h-4",
    gap: "gap-1",
  },
  md: {
    text: "text-[11px]",
    logo: "w-5 h-5",
    gap: "gap-1.5",
  },
  lg: {
    text: "text-xs",
    logo: "w-6 h-6",
    gap: "gap-2",
  },
  xl: {
    text: "text-sm",
    logo: "w-8 h-8",
    gap: "gap-2.5",
  },
};

const Watermark = ({
  size = "md",
  className = "ml-4 pl-4 border-l border-slate-800",
}) => {
  const currentSize = WATERMARK_SIZES[size] || WATERMARK_SIZES.md;

  return (
    <div
      data-screenshot-watermark="true"
      className={`justify-center items-center
      text-slate-500 tracking-wider font-semibold ${currentSize.text} ${className}`}
    >
      <div className={`flex items-center opacity-80 ${currentSize.gap}`}>
        <span className="uppercase text-sm">Designed by</span>
        <span
          className="px-2 py-0.5 rounded bg-amber-500/10 border border-amber-500/20 text-amber-400
            font-black tracking-wide text-base"
        >
          toBe
        </span>
      </div>
    </div>
  );
};

export default Watermark;
