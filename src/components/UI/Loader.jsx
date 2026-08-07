const Loader = ({ title }) => {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center p-4 text-center">
      <div className="flex flex-col items-center gap-3">
        <div className="w-10 h-10 border-4 border-amber-500 border-t-transparent rounded-full animate-spin" />
        <span className="text-sm font-semibold text-slate-300 animate-pulse">
          {title}
        </span>
      </div>
    </div>
  );
};

export default Loader;
