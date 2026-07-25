import { version } from "../../../package.json";

const Footer = () => {
  return (
    <footer
      className="w-full border-t border-slate-800/60 py-4 px-6 text-center text-xs
     text-slate-500 flex justify-between items-center mx-auto"
    >
      <span className="text-xs md:text-sm min-[1820px]:text-lg md:font-semibold">
        © 2026 Iron Gates
      </span>
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
