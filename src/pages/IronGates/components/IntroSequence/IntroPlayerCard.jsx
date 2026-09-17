import { motion } from "framer-motion";
import { useRef } from "react";

import { getMemberTheme } from "../../../../utils/members";

const IntroPlayerCard = ({
  img,
  pvp,
  name,
  video,
  index,
  memberRefs,
  main_class,
  sub_classes = [],
}) => {
  const theme = getMemberTheme(name);
  const videoRef = useRef(null);

  const handleViewportEnter = () => {
    if (videoRef.current) {
      setTimeout(() => {
        videoRef.current.play().catch(() => {});
      }, 200);
    }
  };

  return (
    <div
      ref={(el) => (memberRefs.current[index] = el)}
      className="h-screen w-full flex items-center justify-center snap-start
        bg-transparent z-50 overflow-hidden"
    >
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.9 }}
        whileInView={{ opacity: 1, y: 0, scale: 1.2 }}
        onViewportEnter={handleViewportEnter}
        viewport={{ once: false, amount: 0.4 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="h-full flex items-center justify-center transform-gpu [backface-visibility:hidden]"
      >
        <div className="relative w-full aspect-square max-h-[84vh] flex items-center justify-center">
          <div
            style={{
              background: `radial-gradient(circle, ${theme.startColor}30 0%, transparent 70%)`,
            }}
            className="absolute inset-0 scale-125 pointer-events-none blur-3xl opacity-70"
          />

          <div className="relative w-full h-full overflow-hidden rounded">
            {video ? (
              <video
                ref={videoRef}
                key={video}
                loop
                muted
                playsInline
                className="w-full h-full object-cover filter contrast-105"
              >
                <source src={video} type="video/mp4" />
              </video>
            ) : (
              <img
                src={img}
                alt={name}
                className="w-full h-full object-cover filter contrast-110"
              />
            )}

            <div className="absolute inset-0 shadow-[inset_0_0_30px_5px_#000000] pointer-events-none" />
            <div
              className="absolute inset-0 bg-gradient-to-t from-black/60
                via-transparent to-black/30 pointer-events-none"
            />
            <div className="absolute top-6 left-6 right-6 flex items-center justify-between z-10">
              <span
                style={{
                  backgroundColor: `${theme.startColor}25`,
                  color: theme.startColor,
                }}
                className="px-4 py-1.5 rounded-full text-xl font-black uppercase tracking-widest backdrop-blur-md"
              >
                PvP: {pvp}
              </span>
            </div>

            <div className="absolute bottom-6 left-6 right-6 z-10 space-y-2">
              <div className="flex flex-wrap items-center gap-3">
                <span
                  className="text-2xl font-extrabold tracking-wide drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)]"
                  style={{ color: theme.startColor }}
                >
                  {main_class}
                </span>
              </div>

              {sub_classes.length > 0 && (
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {sub_classes.map((sub, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 bg-black/50 rounded-md text-slate-300 text-xl font-medium backdrop-blur-sm"
                    >
                      {sub}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default IntroPlayerCard;
