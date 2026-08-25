import EpicInfo from "./EpicInfo";
import InfoBlock from "./InfoBlock";
import ParallaxAvatar from "./ParallaxAvatar";

const MemberCard = ({
  x,
  y,
  name,
  role,
  image,
  playClass,
  mainClass,
  subClasses = [],
  epic,
  pvp,
  inClan,
  balance,
  allPoints,
}) => {
  return (
    <div className="relative z-20 flex-1 flex items-center justify-center">
      <div
        style={{
          transform: `perspective(1500px) rotateY(${x * 5}deg) rotateX(${-y * 5}deg)`,
          transition: "transform 0.2s ease-out",
        }}
        className="bg-slate-950/85 border border-amber-500/30 rounded-3xl p-6 lg:p-8
          shadow-[0_0_60px_rgba(245,158,11,0.15)] backdrop-blur-2xl grid grid-cols-1 md:grid-cols-12 gap-6 items-start"
      >
        <ParallaxAvatar image={image} playClass={playClass} />

        <div className="md:col-span-7 space-y-4">
          <div className="flex justify-between">
            <h1
              className="text-3xl lg:text-4xl font-black text-white tracking-wider mt-1
              drop-shadow-[0_2px_15px_rgba(251,191,36,0.3)] flex items-center gap-2"
            >
              {name}
            </h1>
            <div className="flex items-center justify-between">
              {inClan && (
                <span
                  className="text-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 px-3 py-1.5
                  rounded-full font-medium"
                >
                  {inClan}
                </span>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2.5">
            <InfoBlock label="Основний клас" value={mainClass} />
            <InfoBlock label="GvG Class" value={playClass || "-"} />
            <InfoBlock label="Role" value={role} />
            <InfoBlock label="Sub-classes" value={subClasses.join(", ")} />
          </div>

          <EpicInfo epic={epic} />

          <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-base text-slate-400">
            <span>
              PvP: <strong className="text-white text-lg">{pvp}</strong>
            </span>
            <span>
              Баланс:{" "}
              <strong
                className={`text-lg ${balance < 0 ? "text-rose-400" : "text-emerald-400"}`}
              >
                {balance}
              </strong>
            </span>
            <span>
              Всі поінти:{" "}
              <strong className="text-amber-400 text-lg">{allPoints}</strong>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MemberCard;
