const Button = ({ children, onClick, className = "" }) => {
  const baseStyles =
    "flex items-center gap-2 py-1.5 px-3.5 text-xs md:text-sm font-black uppercase tracking-wider " +
    "bg-slate-800/80 hover:bg-slate-700/90 text-slate-200 hover:text-amber-500 rounded-xl border " +
    "border-slate-700 hover:border-amber-500/30 transition-all duration-200 shadow-md select-none focus:outline-none";
  return (
    <button className={`${baseStyles} ${className}`} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
