/* eslint-disable indent */
import "./MemberCard.css";

import { useEffect, useState } from "react";
import Tilt from "react-parallax-tilt";

import { getCustomRingColors, getMemberTheme } from "../../../../utils/members";
import FloatingMagicalIcons from "./FloatingMagicalIcons";

const ParallaxAvatar = ({ image, video, playClass = "", name }) => {
  const theme = getMemberTheme(name);
  const ringColors = getCustomRingColors(name, theme);

  const [isVideoLoading, setIsVideoLoading] = useState(true);

  useEffect(() => {
    if (video) {
      setIsVideoLoading(true);
    }
  }, [video, name]);

  return (
    <div
      className="md:col-span-5 relative flex justify-center items-center group py-4 rounded-2xl
        border-2 p-2 z-10 cursor-pointer overflow-visible transition-all duration-500 min-h-75"
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
        <div className="relative w-full h-full flex justify-center items-center">
          {!isVideoLoading && (
            <>
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
            </>
          )}

          {video ? (
            <>
              {isVideoLoading && (
                <div
                  className="absolute z-40 inset-0 m-auto w-full h-full flex items-center justify-center"
                  style={{ transform: "translateZ(30px)" }}
                >
                  <div
                    className="w-10 h-10 border-4 border-t-transparent rounded-full animate-spin shadow-lg"
                    style={{
                      borderColor: `${theme.startColor}40`,
                      borderTopColor: theme.startColor,
                    }}
                  />
                </div>
              )}

              <video
                key={video}
                autoPlay
                muted
                loop
                playsInline
                onCanPlayThrough={() => setIsVideoLoading(false)}
                className={`absoulute w-full h-full object-cover rounded-xl drop-shadow-[0_20px_30px_rgba(0,0,0,0.9)]
                  transition-opacity duration-300 ${
                    isVideoLoading ? "opacity-0" : "opacity-100"
                  }`}
                style={{
                  transform: "translateZ(40px)",
                }}
              >
                <source src={video} type="video/mp4" />
              </video>
            </>
          ) : (
            <img
              src={image}
              alt={name}
              className="w-full h-full object-contain filter contrast-110 drop-shadow-[0_20px_30px_rgba(0,0,0,0.9)]
                rounded-full"
              style={{
                transform: "translateZ(40px)",
              }}
            />
          )}

          {!video && <FloatingMagicalIcons playClass={playClass} />}
        </div>
      </Tilt>
    </div>
  );
};

export default ParallaxAvatar;
