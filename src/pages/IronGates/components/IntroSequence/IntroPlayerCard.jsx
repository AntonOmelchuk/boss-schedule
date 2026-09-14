import { motion } from "framer-motion";

import useTranslation from "../../../../hooks/useTranslation";
import { getMemberTheme } from "../../../../utils/members";
import InfoPlayerCardInfoItem from "./InfoPlayerCardInfoItem";

const IntroPlayerCard = ({
  index,
  memberRefs,
  isLeft,
  img,
  name,
  main_class,
  sub_classes = [],
  cp_number,
  clan,
  pvp,
}) => {
  const { t } = useTranslation();
  const {
    dashboard: { stats },
  } = t;

  const theme = getMemberTheme(name);

  return (
    <div
      ref={(el) => (memberRefs.current[index] = el)}
      // ДОДАНО: overflow-hidden - гарантує, що рух по X не ламає ширину сторінки і не викликає стрибків
      className="h-screen w-full flex items-center justify-center px-6 snap-start bg-gradient-to-b
        from-black via-zinc-950 to-black z-50 overflow-hidden"
    >
      <motion.div
        initial={{ opacity: 0, x: isLeft ? -100 : 100, scale: 0.85 }}
        whileInView={{ opacity: 1, x: 0, scale: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="max-w-6xl w-full transform-gpu [backface-visibility:hidden]"
      >
        <div
          style={{
            borderColor: `${theme.startColor}80`,
            boxShadow: `0 0 90px ${theme.startColor}33`,
          }}
          className="relative w-full p-10 sm:p-14 rounded-3xl border-2
            bg-gradient-to-b from-slate-900/90 via-zinc-900/90 to-black z-40
            backdrop-blur-xl flex flex-col md:flex-row items-center gap-10 group
            hover:border-amber-400 transition-[border-color,box-shadow]"
        >
          <div
            style={{
              borderColor: `${theme.startColor}`,
              boxShadow: `0 0 50px ${theme.startColor}4D`,
            }}
            className="relative w-64 h-64 sm:w-80 sm:h-80 rounded-3xl bg-black/60 border-2
            shrink-0 group-hover:scale-105 transition-transform"
          >
            <img
              src={img}
              alt={name}
              className="w-full h-full object-cover filter contrast-110 rounded-3xl"
            />
            <div
              className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent
              rounded-2xl"
            />

            <div
              style={{
                borderColor: `${theme.startColor}66`,
              }}
              className="absolute -bottom-6 left-4 right-4 text-center py-1.5 px-3 bg-black/90 border
            rounded-xl backdrop-blur-md shadow-lg"
            >
              <span className="text-xs text-slate-400 uppercase tracking-widest mr-2">
                PvP:
              </span>
              <span
                className="text-lg font-black"
                style={{ color: theme.startColor }}
              >
                {pvp}
              </span>
            </div>
          </div>

          {/* Info */}
          <div className="text-center md:text-left flex-1 flex flex-col justify-center">
            <h2
              className="text-5xl sm:text-7xl font-black tracking-wider font-serif
              inline-block px-4 py-1 rounded-2xl border transition-all"
              style={{
                textShadow: `0 2px 20px ${theme.startColor}66`,
                backgroundColor: `${theme.startColor}1A`,
                borderColor: `${theme.startColor}66`,
                color: theme.startColor,
              }}
            >
              {name}
            </h2>

            {/* Main class */}
            <div className="mt-5">
              <span className="text-xs uppercase tracking-[0.3em] text-slate-400 block mb-1">
                {stats.mainClass}
              </span>
              <span
                className="text-2xl sm:text-3xl font-extrabold tracking-wide drop-shadow-md"
                style={{ color: theme.startColor }}
              >
                {main_class}
              </span>
            </div>

            {/* Sub-classes */}
            {sub_classes.length > 0 && (
              <div className="mt-5">
                <span className="text-xs uppercase tracking-[0.3em] text-slate-400 block mb-1.5">
                  {stats.subClasses}
                </span>
                <div className="flex flex-wrap justify-center md:justify-start gap-2">
                  {sub_classes.map((sub, idx) => (
                    <span
                      key={idx}
                      style={{
                        borderColor: `${theme.startColor}40`,
                        backgroundColor: `${theme.startColor}15`,
                      }}
                      className="px-3 py-1 border rounded-xl text-slate-200 text-sm font-medium tracking-wide"
                    >
                      {sub}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Additional Info */}
            <div
              className="mt-6 pt-6 border-t border-slate-800/80 flex flex-wrap items-center justify-center
              md:justify-start gap-6 text-slate-300"
            >
              <InfoPlayerCardInfoItem title={stats.cp} value={cp_number} />
              <InfoPlayerCardInfoItem title={stats.clan} value={clan} />
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default IntroPlayerCard;
