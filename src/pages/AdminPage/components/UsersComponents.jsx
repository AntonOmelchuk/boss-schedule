export const SearchInput = ({ value, onChange, onClear, placeholder }) => (
  <div className="relative">
    <input
      type="text"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white
        focus:outline-none focus:border-amber-500 transition placeholder-slate-500"
    />
    {value && (
      <button
        onClick={onClear}
        className="absolute right-3 top-2 text-slate-500 hover:text-white text-xs cursor-pointer"
      >
        ✕
      </button>
    )}
  </div>
);

export const SelectFilter = ({
  value,
  onChange,
  options = [],
  defaultOptionLabel = null,
  className = "",
  disabled,
}) => {
  const safeOptions = Array.isArray(options) ? options : [];

  return (
    <select
      value={value}
      onChange={onChange}
      disabled={disabled}
      className={`bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none
        focus:border-amber-500 cursor-pointer ${className}`}
    >
      {defaultOptionLabel !== null && defaultOptionLabel !== undefined && (
        <option value="ALL">{defaultOptionLabel}</option>
      )}

      {safeOptions.map((opt) => {
        const val = typeof opt === "string" ? opt : opt.value;
        const label = typeof opt === "string" ? opt : opt.label;
        return (
          <option key={val} value={val}>
            {label}
          </option>
        );
      })}
    </select>
  );
};

export const AnomalyBadge = ({ count, icon, isDanger, title }) => (
  <span
    className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
      isDanger
        ? "bg-red-500/20 text-red-400 border border-red-500/30"
        : "bg-slate-800 text-slate-400"
    }`}
    title={title}
  >
    {icon} {count}
  </span>
);

export const PaginationBar = ({
  currentPage,
  totalPages,
  onPrev,
  onNext,
  labels,
}) => (
  <div className="flex items-center justify-between p-3 border-t border-slate-800 bg-slate-950/50">
    <button
      disabled={currentPage === 1}
      onClick={onPrev}
      className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-slate-300 rounded-lg text-xs
        font-semibold transition cursor-pointer disabled:cursor-not-allowed"
    >
      ← {labels.prevPage}
    </button>
    <span className="text-xs text-slate-400 font-mono">
      {currentPage} / {totalPages}
    </span>
    <button
      disabled={currentPage === totalPages}
      onClick={onNext}
      className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-slate-300 rounded-lg text-xs
        font-semibold transition cursor-pointer disabled:cursor-not-allowed"
    >
      {labels.nextPage} →
    </button>
  </div>
);
