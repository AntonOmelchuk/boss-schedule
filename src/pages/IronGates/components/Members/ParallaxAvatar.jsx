import "./MemberCard.css";

import Tilt from "react-parallax-tilt";

import { getMemberTheme } from "../../../../utils/general";
import FloatingMagicalIcons from "./FloatingMagicalIcons";

const ParallaxAvatar = ({ image, playClass = "", name }) => {
  const theme = getMemberTheme(name);

  // const getSecondRingStyle = () => {
  //   const cls = (playClass || "").toLowerCase();

  //   if (cls.includes("bishop") || cls.includes("cardinal"))
  //     return { color: "#22c55e", shadow: "rgba(34,197,94,0.3)" };
  //   if (cls.includes("archmage") || cls.includes("sorcerer"))
  //     return { color: "#ef4444", shadow: "rgba(239,68,68,0.3)" };
  //   if (cls.includes("mystic muse") || cls.includes("spellsinger"))
  //     return { color: "#06b6d4", shadow: "rgba(6,182,212,0.3)" };
  //   if (cls.includes("soultaker") || cls.includes("necromancer"))
  //     return { color: "#a855f7", shadow: "rgba(168,85,247,0.3)" };
  //   if (cls.includes("dominator") || cls.includes("overlord"))
  //     return { color: "#eab308", shadow: "rgba(234,179,8,0.3)" };

  //   return { color: "#a855f7", shadow: "rgba(168,85,247,0.3)" };
  // };

  // const classRing = getSecondRingStyle();

  return (
    <div
      className="md:col-span-5 relative flex justify-center items-center group py-4 rounded-2xl
        border-2 p-2 z-10 cursor-pointer overflow-visible transition-all duration-500"
      style={{
        borderColor: `${theme.startColor}99`,
        boxShadow: `0 0 40px ${theme.startColor}4D`,
      }}
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
            animate-[spin_45s_linear_infinite] pointer-events-none"
            style={{
              borderColor: `${theme.startColor}88`,
              boxShadow: `0 0 20px ${theme.startColor}4D`,
            }}
          />

          <div
            className="absolute z-50 inset-0 m-auto w-[105%] h-[105%] rounded-full border-2 border-dashed
              animate-[spin_72s_linear_infinite_reverse] pointer-events-none"
            style={{
              borderColor: `${theme.endColor}`,
              boxShadow: `0 0 15px ${theme.endColor}`,
            }}
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
