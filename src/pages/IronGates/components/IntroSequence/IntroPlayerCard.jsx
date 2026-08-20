import { motion } from "framer-motion";

const IntroPlayerCard = ({
  index,
  memberRefs,
  isLeft,
  img,
  name,
  gameClass,
  role,
  desc,
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
        className="relative max-w-5xl w-full p-12 sm:p-16 rounded-3xl border border-amber-500/40
          bg-gradient-to-b from-amber-500/10 via-zinc-900/90 to-black z-40
          shadow-[0_0_80px_rgba(245,158,11,0.25)] backdrop-blur-xl flex flex-col sm:flex-row
          items-center space-y-8 sm:space-y-0 sm:space-x-12 group hover:border-amber-400 transition-all"
      >
        {/* Avatar */}
        <div
          className="relative w-56 h-56 sm:w-64 sm:h-64 rounded-3xl bg-black/60 border-2
          border-amber-500/60 overflow-hidden shrink-0 shadow-[0_0_40px_rgba(0,0,0,0.9)]
            group-hover:scale-105 transition-transform"
        >
          <img
            src={img}
            alt={name}
            className="w-full h-full object-cover filter contrast-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        </div>

        {/* Info */}
        <div className="text-center sm:text-left flex-1">
          <div
            className="inline-block px-4 py-2 rounded-full bg-amber-500/20 border border-amber-500/30
            text-amber-300 text-sm tracking-widest uppercase mb-4"
          >
            {gameClass}
          </div>
          <h3 className="text-5xl sm:text-6xl font-black text-amber-200 tracking-wider font-serif drop-shadow-md">
            {name}
          </h3>
          <p className="text-amber-400/95 text-base font-semibold tracking-widest uppercase mt-2">
            {role}
          </p>
          <p className="text-slate-300 text-lg mt-4 font-light leading-relaxed">
            {desc}
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default IntroPlayerCard;
