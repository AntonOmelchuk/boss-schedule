import "./MemberCard.css";

import Tilt from "react-parallax-tilt";

import { getMemberTheme } from "../../../../utils/members";
import { getCustomRingColors } from "../../../../utils/members";
import FloatingMagicalIcons from "./FloatingMagicalIcons";

const ParallaxAvatar = ({ image, playClass = "", name }) => {
  const theme = getMemberTheme(name);

  const ringColors = getCustomRingColors(name, theme);

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
              borderColor: ringColors.innerColor,
              boxShadow: `0 0 20px ${ringColors.innerColor}10`,
            }}
          />

          <div
            className="absolute z-50 inset-0 m-auto w-[105%] h-[105%] rounded-full border-2 border-dashed
              animate-[spin_72s_linear_infinite_reverse] pointer-events-none"
            style={{
              borderColor: ringColors.outerColor,
              boxShadow: `0 0 15px ${ringColors.outerColor}80`,
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
