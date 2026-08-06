import { version } from "../../../package.json";

const Footer = () => {
  return (
    <footer
      className="w-full border-t border-slate-300/20 py-4 px-6 text-xs
      text-slate-500 flex flex-col md:flex-row justify-between items-center gap-3 mx-auto"
    >
      <span className="text-xs md:text-sm min-[1820px]:text-lg md:font-semibold">
        © 2026 Iron Gates
      </span>

      <div className="text-xs md:text-sm text-slate-400 font-medium flex items-center gap-1.5">
        <span>Designed & Developed by</span>
        <span
          className="px-2 py-0.5 rounded bg-amber-500/10 border border-amber-500/20 text-amber-400
          font-black tracking-wide"
        >
          toBe
        </span>
      </div>

      <span
        className="text-xs md:text-sm min-[1820px]:text-lg md:font-semibold
        font-mono bg-slate-900 px-2 py-1 rounded-md border border-slate-800 text-slate-400"
      >
        v{version}
      </span>
    </footer>
  );
};

export default Footer;
