import { cn } from "../../utils/general";

const Input = ({
  type = "text",
  value,
  onChange,
  placeholder = "",
  className = "",
  disabled = false,
  name,
  id,
}) => {
  const baseStyles =
    "w-full py-1.5 px-3 text-xs md:text-sm font-medium text-slate-100 placeholder-slate-500 " +
    "bg-slate-900/80 hover:bg-slate-900 focus:bg-black/90 rounded-xl border " +
    "border-slate-700/80 focus:border-amber-500/80 transition-all duration-200 shadow-inner " +
    "focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500/50 " +
    "disabled:opacity-50 disabled:cursor-not-allowed";

  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      disabled={disabled}
      name={name}
      id={id}
      className={cn(baseStyles, className)}
    />
  );
};

export default Input;
