const MemberCard = ({
  x,
  y,
  image,
  name,
  status,
  mainClass,
  subClasses,
  gear,
  pvp,
}) => {
  return (
    <div className="relative z-20 flex-1 flex items-center justify-center">
      <div
        style={{
          transform: `perspective(1000px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg)`,
          transition: "transform 0.1s ease-out",
        }}
        className="bg-slate-950/85 border border-amber-500/30 rounded-3xl p-6 lg:p-8
          shadow-[0_0_60px_rgba(245,158,11,0.15)] backdrop-blur-2xl grid grid-cols-1 md:grid-cols-12 gap-6 items-start"
      >
        <div className="md:col-span-5 relative flex justify-center items-center group py-4">
          {/* Two animated rings around avatar */}
          <div
            className="absolute z-50 inset-0 m-auto w-full h-full rounded-full border-2 border-dashed
            border-amber-500/40 animate-[spin_25s_linear_infinite] pointer-events-none"
          />
          <div
            className="absolute z-50 inset-0 m-auto w-full h-full rounded-full border-2 border-dotted
            border-purple-500/40 animate-[spin_20s_linear_infinite_reverse] pointer-events-none"
          />

          <div
            className="relative rounded-2xl overflow-hidden border-2 border-amber-400/60
            shadow-[0_0_35px_rgba(251,191,36,0.3)] bg-slate-900/80 flex items-center justify-center
            p-2 group-hover:scale-102 transition duration-500 z-10"
          >
            <img
              src={image}
              alt={name}
              className="w-full h-full object-contain filter contrast-110 drop-shadow-[0_10px_15px_rgba(0,0,0,0.8)]"
            />
          </div>
        </div>

        {/* Інформація про героя */}
        <div className="md:col-span-7 space-y-4">
          <div>
            <div className="flex items-center space-x-2">
              <span
                className={`w-2 h-2 rounded-full ${
                  status === "ONLINE"
                    ? "bg-emerald-400"
                    : status === "AFK"
                      ? "bg-amber-400"
                      : "bg-rose-500"
                } animate-ping`}
              />
              <span className="text-xs uppercase tracking-widest text-emerald-400 font-semibold">
                • {status}
              </span>
            </div>
            <h1
              className="text-3xl lg:text-4xl font-black text-white tracking-wider mt-1
              drop-shadow-[0_2px_15px_rgba(251,191,36,0.3)] flex items-center gap-2"
            >
              {name}
            </h1>
          </div>

          <div className="grid grid-cols-2 gap-2.5">
            <div className="bg-slate-900/70 border border-slate-800 rounded-xl p-2.5">
              <span className="text-[10px] text-slate-500 uppercase tracking-wider">
                Основний клас
              </span>
              <p className="text-amber-400 font-bold text-xs lg:text-sm mt-0.5">
                {mainClass}
              </p>
            </div>
            <div className="bg-slate-900/70 border border-slate-800 rounded-xl p-2.5">
              <span className="text-[10px] text-slate-500 uppercase tracking-wider">
                Сабкласи
              </span>
              <p className="text-slate-300 font-medium text-xs mt-0.5 truncate">
                {subClasses.join(", ")}
              </p>
            </div>
          </div>

          <div className="space-y-1.5">
            <span className="text-[10px] text-slate-500 uppercase tracking-wider">
              Екіпірування (Gear)
            </span>
            <div className="grid grid-cols-3 gap-2">
              {gear.map((item, index) => (
                <div
                  key={index}
                  className="bg-slate-900/50 border border-amber-500/20 rounded-lg p-2 text-center
                    hover:border-amber-500/50 transition"
                >
                  <span className="text-base">{item.icon}</span>
                  <p className="text-[10px] font-bold text-white mt-1 truncate">
                    {item.name}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
            <span>
              PvP: <strong className="text-white">{pvp}</strong>
            </span>
            <button
              className="px-3.5 py-2 bg-gradient-to-r from-amber-600 to-yellow-600 hover:from-amber-500
            hover:to-yellow-500 text-slate-950 font-black text-[11px] uppercase tracking-wider rounded-xl
              shadow-[0_0_20px_rgba(245,158,11,0.3)] transition cursor-pointer active:scale-95"
            >
              Зброя / Стати
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MemberCard;
