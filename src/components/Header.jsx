import logo from "../assets/logo.png";

const Header = ({ setLang, lang, t, lastSync }) => {
  return (
    <header className="text-center mb-8 relative">
      <img
        src={logo}
        alt="Iron Gates"
        className="absolute left-0 top-0 h-16 w-16 md:h-20 md:w-20 object-contain border border-slate-600/50 rounded-full shadow-xl"
      />
      <div className="absolute top-0 right-0 flex items-center justify-end">
        <label className="flex items-center cursor-pointer select-none">
          <span
            className={`mr-2 text-sm font-bold transition-colors ${lang === "uk" ? "text-amber-400" : "text-slate-500"}`}
          >
            УКР
          </span>
          <div className="relative">
            {/* Прихований чекбокс, який керує станом */}
            <input
              type="checkbox"
              className="sr-only peer"
              checked={lang === "en"}
              onChange={() => setLang(lang === "uk" ? "en" : "uk")}
            />
            {/* Тло світча (фон) */}
            <div className="block bg-slate-700 w-10 h-6 rounded-full peer-checked:bg-amber-500 transition-colors duration-300"></div>
            {/* Кружечок світча (тумблер) */}
            <div className="dot absolute left-1 top-1 bg-slate-200 w-4 h-4 rounded-full transition-transform duration-300 peer-checked:translate-x-4"></div>
          </div>
          <span
            className={`ml-2 text-sm font-bold transition-colors ${lang === "en" ? "text-amber-400" : "text-slate-500"}`}
          >
            EN
          </span>
        </label>
      </div>

      <h1 className="text-3xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-600 tracking-wider">
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
