import "./MemberCard.css";

import Tilt from "react-parallax-tilt";

import FloatingMagicalIcons from "./FloatingMagicalIcons";

const ParallaxAvatar = ({ image, playClass = "" }) => {
  const getSecondRingColor = () => {
    const cls = (playClass || "").toLowerCase();
    if (cls.includes("bishop") || cls.includes("cardinal"))
      return "border-green-500/50 shadow-[0_0_15px_rgba(34,197,94,0.3)]";
    if (cls.includes("archmage") || cls.includes("sorcerer"))
      return "border-red-500/50 shadow-[0_0_15px_rgba(239,68,68,0.3)]";
    if (cls.includes("mystic muse") || cls.includes("spellsinger"))
      return "border-cyan-500/50 shadow-[0_0_15px_rgba(6,182,212,0.3)]";
    if (cls.includes("soultaker") || cls.includes("necromancer"))
      return "border-purple-500/50 shadow-[0_0_15px_rgba(168,85,247,0.3)]";
    if (cls.includes("dominator") || cls.includes("overlord"))
      return "border-yellow-500/50 shadow-[0_0_15px_rgba(234,179,8,0.3)]";

    return "border-purple-500/40";
  };

  return (
    <div
      className="md:col-span-5 relative flex justify-center items-center group py-4 rounded-2xl
        border-2 border-amber-400/60 shadow-[0_0_40px_rgba(251,191,36,0.5)] p-2 z-10 cursor-pointer overflow-visible"
    >
      <Tilt
        tiltMaxAngleX={25}
        tiltMaxAngleY={25}
        perspective={1000}
        transitionSpeed={1500}
        scale={1.05}
        gyroscope={true}
      >
        <div className="relative">
          <div
            className="absolute z-50 inset-0 m-auto w-[108%] h-[108%] rounded-full border-2 border-dashed
            border-amber-500/60 shadow-[0_0_20px_rgba(245,158,11,0.4)] animate-[spin_45s_linear_infinite]
              pointer-events-none"
          />

          <div
            className={`absolute z-50 inset-0 m-auto w-[105%] h-[105%] rounded-full border-2 border-dashed
              animate-[spin_72s_linear_infinite_reverse] pointer-events-none ${getSecondRingColor()}`}
          />

          <img
            src={image}
            alt="Avatar"
            className="w-full h-full object-contain filter contrast-110 drop-shadow-[0_20px_30px_rgba(0,0,0,0.9)]
              rounded-full"
            style={{
              transform: "translateZ(40px)",
            }}
          />

          <FloatingMagicalIcons playClass={playClass} />
        </div>
      </Tilt>
    </div>
  );
};

export default ParallaxAvatar;
