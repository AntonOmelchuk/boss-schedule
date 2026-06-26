import logo from "../assets/logo.png";

const Header = ({ setLang, lang, t, lastSync }) => {
  return (
    <header className="text-center mb-8 relative">
      <img
        src={logo}
        alt="Iron Gates"
        className="absolute left-0 top-0 h-16 w-16 md:h-20 md:w-20 object-contain border border-slate-600/50 rounded-full shadow-xl"
      />
      <div
        className="absolute top-0 right-0 bg-slate-800/80 backdrop-blur rounded-lg p-1 border border-slate-700 flex items-center cursor-pointer shadow-inner"
        onClick={() => setLang(lang === "uk" ? "en" : "uk")}
      >
        <div
          className={`px-3 py-1 rounded-lg text-xs font-bold transition-all duration-300 ${lang === "uk" ? "bg-zinc-600 text-white shadow-md" : "text-slate-400 hover:text-slate-200"}`}
        >
          УКР
        </div>
        <div
          className={`px-3 py-1 rounded-lg text-xs font-bold transition-all duration-300 ${lang === "en" ? "bg-zinc-700 text-white shadow-md" : "text-slate-400 hover:text-slate-200"}`}
        >
          ENG
        </div>
      </div>

      <h1 className="text-3xl md:text-4xl font-black text-transparent bg-clip-text bg-linear-to-r from-amber-400 to-orange-600 tracking-wider">
        {t.title}
      </h1>
      <p className="text-slate-400 text-sm mt-2">
        {lastSync
          ? `${t.sync} ${new Date(lastSync).toLocaleTimeString(lang === "uk" ? "uk-UA" : "en-US")}`
          : t.waitSync}
      </p>
    </header>
  );
};

export default Header;
