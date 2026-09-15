import useTranslation from "../../../../hooks/useTranslation";
import { getMemberTheme } from "../../../../utils/members";
import EpicInfo from "./EpicInfo";
import InfoBlock from "./InfoBlock";
import ParallaxAvatar from "./ParallaxAvatar";

const MemberCard = ({
  x,
  y,
  name,
  role,
  image,
  video, // 👈 Додали проп
  playClass,
  mainClass,
  subClasses = [],
  epic,
  pvp,
  inClan,
  balance,
  allPoints,
}) => {
  const theme = getMemberTheme(name);
  const { t } = useTranslation();
  const { memberCard } = t;

  return (
    <div className="relative z-20 flex-1 flex items-center justify-center">
      <div
        style={{
          transform: `perspective(1500px) rotateY(${x * 5}deg) rotateX(${-y * 5}deg)`,
          transition: "transform 0.2s ease-out",
          borderColor: theme.startColor,
          boxShadow: `0 0 50px ${theme.startColor}40`,
        }}
        className="bg-slate-950/85 border-2 rounded-3xl p-6 lg:p-8
          backdrop-blur-2xl grid grid-cols-1 md:grid-cols-12 gap-6 items-start transition-all duration-500"
      >
        <ParallaxAvatar
          image={image}
          video={video} // 👈 Передаємо дальше
          playClass={playClass}
          name={name}
        />

        <div className="md:col-span-7 space-y-4">
          <div className="flex justify-between items-center">
            <h1
              className="text-3xl lg:text-4xl font-black text-white tracking-wider mt-1
                flex items-center gap-2 px-2 p-0.5 rounded-2xl"
              style={{
                textShadow: `0 2px 20px ${theme.startColor}66`,
                backgroundColor: `${theme.startColor}26`,
                borderColor: `${theme.startColor}80`,
                color: theme.startColor,
              }}
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
            <InfoBlock label={memberCard.mainClass} value={mainClass} />
            <InfoBlock label={memberCard.gvgClass} value={playClass || "-"} />
            <InfoBlock label={memberCard.role} value={role} />
            <InfoBlock
              label={memberCard.subClasses}
              value={subClasses.join(", ")}
            />
          </div>

          <EpicInfo epic={epic} />

          <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-base text-slate-400">
            <span>
              PvP: <strong className="text-white text-lg">{pvp}</strong>
            </span>
            <span>
              {memberCard.balance}:{" "}
              <strong
                className={`text-lg ${balance < 0 ? "text-rose-400" : "text-emerald-400"}`}
              >
                {balance}
              </strong>
            </span>
            <span>
              {memberCard.allPoints}:{" "}
              <strong className="text-amber-400 text-lg">{allPoints}</strong>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MemberCard;
