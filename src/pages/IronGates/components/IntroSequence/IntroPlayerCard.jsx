import { motion } from "framer-motion";
import { useRef } from "react";

import { getMemberTheme } from "../../../../utils/members";

const IntroPlayerCard = ({
  img,
  pvp,
  name,
  clan,
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
      className="h-screen w-full flex items-center justify-center px-4 sm:px-6 snap-start bg-gradient-to-b
        from-black via-zinc-950 to-black z-50 overflow-hidden"
    >
      <motion.div
        initial={{ opacity: 0, y: 50, scale: 0.9 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        onViewportEnter={handleViewportEnter}
        viewport={{ once: false, amount: 0.4 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="max-w-xl w-full transform-gpu [backface-visibility:hidden]"
      >
        <div
          style={{
            borderColor: `${theme.startColor}80`,
            boxShadow: `0 0 100px ${theme.startColor}40`,
          }}
          className="relative w-full rounded-3xl border-2 bg-slate-950 overflow-hidden group shadow-2xl"
        >
          {/* Контейнер у форматі 1:1 (Квадрат) під пропорції відео */}
          <div className="relative w-full aspect-square max-h-[75vh] bg-black">
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

            <div
              className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent
              to-transparent pointer-events-none"
            />
            <div
              className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent
              to-transparent pointer-events-none"
            />

            <div className="absolute top-5 left-5 right-5 flex items-center justify-between z-10">
              <span
                style={{
                  backgroundColor: `${theme.startColor}25`,
                  borderColor: `${theme.startColor}80`,
                  color: theme.startColor,
                }}
                className="px-4 py-1.5 border rounded-full text-xs font-black uppercase
                  tracking-widest backdrop-blur-md"
              >
                PvP: {pvp}
              </span>

              {clan && (
                <span
                  className="px-3 py-1 bg-black/60 border border-slate-700/80 rounded-full text-xs
                text-slate-300 font-medium backdrop-blur-md"
                >
                  {clan}
                </span>
              )}
            </div>

            {/* Нижня інформація: Класи та CP */}
            <div className="absolute bottom-5 left-5 right-5 z-10 space-y-2">
              <div className="flex flex-wrap items-center gap-3">
                <span
                  className="text-xl sm:text-2xl font-extrabold tracking-wide drop-shadow-md"
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
                      className="px-2.5 py-0.5 bg-black/50 border border-slate-700/60 rounded-md text-slate-300
                        text-xs font-medium backdrop-blur-sm"
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
