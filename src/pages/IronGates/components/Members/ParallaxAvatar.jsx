import "./MemberCard.css";

import Tilt from "react-parallax-tilt";

const ParallaxAvatar = ({ image }) => {
  return (
    <div
      className="md:col-span-5 relative flex justify-center items-center group py-4 rounded-2xl
        border-2 border-amber-400/60 shadow-[0_0_40px_rgba(251,191,36,0.5)] p-2 z-10 cursor-pointer"
    >
      <Tilt
        tiltMaxAngleX={25}
        tiltMaxAngleY={25}
        perspective={1000}
        transitionSpeed={1500}
        scale={1.05}
        gyroscope={true}
      >
        <>
          <div
            className="absolute z-50 inset-0 m-auto w-[108%] h-[108%] rounded-full border-2 border-dashed
            border-amber-500/40 animate-[spin_45s_linear_infinite] pointer-events-none"
          />
          <div
            className="absolute z-50 inset-0 m-auto w-[105%] h-[105%] rounded-full border-2 border-dashed
              border-purple-500/40 animate-[spin_72s_linear_infinite_reverse] pointer-events-none"
          />
          <img
            src={image}
            alt={name}
            className="w-full h-full object-contain filter contrast-110 drop-shadow-[0_20px_30px_rgba(0,0,0,0.9)]
              rounded-full"
            style={{
              transform: "translateZ(40px)",
            }}
          />
        </>
      </Tilt>
    </div>
  );
};

export default ParallaxAvatar;
