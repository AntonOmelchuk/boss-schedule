import { motion } from "framer-motion";

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
  return (
    <div
      ref={(el) => (memberRefs.current[index] = el)}
      className="h-screen w-full flex items-center justify-center px-6 snap-start bg-gradient-to-b
        from-black via-zinc-950 to-black z-50"
    >
      <motion.div
        initial={{ opacity: 0, x: isLeft ? -150 : 150, scale: 0.8 }}
        whileInView={{ opacity: 1, x: 0, scale: 1 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 1.0, ease: [0.2, 0.65, 0.3, 0.9] }}
        className="relative max-w-6xl w-full p-10 sm:p-14 rounded-3xl border border-amber-500/40
          bg-gradient-to-b from-amber-500/10 via-zinc-900/90 to-black z-40
          shadow-[0_0_90px_rgba(245,158,11,0.25)] backdrop-blur-xl flex flex-col md:flex-row
          items-center gap-10 group hover:border-amber-400 transition-all"
      >
        {/* Avatar */}
        <div
          className="relative w-64 h-64 sm:w-80 sm:h-80 rounded-3xl bg-black/60 border-2
          border-amber-500/60 shrink-0 shadow-[0_0_50px_rgba(0,0,0,0.9)]
            group-hover:scale-105 transition-transform z-50"
        >
          <img
            src={img}
            alt={name}
            className="w-full h-full object-cover filter contrast-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

          {/* PvP Badge above avatar */}
          <div
            className="absolute -bottom-4 left-4 right-4 text-center py-1.5 px-3 bg-black/80 border
            border-amber-500/40 rounded-xl backdrop-blur-md z-50"
          >
            <span className="text-xs text-slate-400 uppercase tracking-widest mr-2">
              PvP:
            </span>
            <span className="text-lg font-black text-amber-400">{pvp}</span>
          </div>
        </div>

        {/* Info */}
        <div className="text-center md:text-left flex-1 flex flex-col justify-center">
          {/* Nickname */}
          <h2
            className="text-6xl sm:text-7xl font-black text-white tracking-wider font-serif
            drop-shadow-[0_4px_10px_rgba(0,0,0,0.8)]"
          >
            {name}
          </h2>

          {/* Main class */}
          <div className="mt-3">
            <span className="text-xs uppercase tracking-[0.3em] text-slate-400 block mb-1">
              Main Class
            </span>
            <span className="text-2xl sm:text-3xl font-extrabold text-amber-400 tracking-wide drop-shadow-md">
              {main_class}
            </span>
          </div>

          {/* Sub-classes */}
          {sub_classes.length > 0 && (
            <div className="mt-5">
              <span className="text-xs uppercase tracking-[0.3em] text-slate-400 block mb-1.5">
                Sub-classes
              </span>
              <div className="flex flex-wrap justify-center md:justify-start gap-2">
                {sub_classes.map((sub, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 bg-amber-500/10 border border-amber-500/30 rounded-xl
                      text-amber-200/90 text-sm font-medium tracking-wide"
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
            <InfoPlayerCardInfoItem title="CP:" value={cp_number} />
            <InfoPlayerCardInfoItem title="Clan:" value={clan} />
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default IntroPlayerCard;
