import { cn } from "../../utils/general";

const Button = ({
  children,
  onClick,
  className = "",
  type = "button",
  disabled = false,
}) => {
  const baseStyles =
    "flex items-center gap-2 py-1.5 px-3.5 text-xs md:text-sm font-black uppercase tracking-wider " +
    "bg-slate-800/80 hover:bg-slate-700/90 text-slate-200 hover:text-amber-500 rounded-xl border " +
    "border-slate-700 hover:border-amber-500/30 transition-all duration-200 shadow-md select-none focus:outline-none " +
    "focus-visible:ring-2 focus-visible:ring-amber-500/50 cursor-pointer " +
    "disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-slate-800/80 disabled:hover:text-slate-200 " +
    "disabled:hover:border-slate-700";

  return (
    <button
      type={type}
      className={cn(baseStyles, className)}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
