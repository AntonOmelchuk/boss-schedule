const WATERMARK_SIZES = {
  sm: {
    text: "text-[10px]",
    gap: "gap-1",
  },
  md: {
    text: "text-[11px]",
    gap: "gap-1.5",
  },
  lg: {
    text: "text-xs",
    gap: "gap-2",
  },
  xl: {
    text: "text-sm",
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
      <div
        className={`flex items-center text-base opacity-80 ${currentSize.gap}`}
      >
        <span>Designed by</span>
        <span
          className="px-2 py-0.5 rounded bg-amber-500/10 border border-amber-500/20 text-amber-400
            font-black tracking-wide"
        >
          toBe
        </span>
      </div>
    </div>
  );
};

export default Watermark;
