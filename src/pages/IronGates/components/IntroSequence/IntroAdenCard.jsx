import { motion } from "framer-motion";

import squadImage from "../../../../assets/squad.png";

const IntroAdenCard = ({ squadRef }) => {
  return (
    <div
      ref={squadRef}
      className="h-screen w-full flex items-center justify-center px-4 sm:px-6 snap-start bg-black"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
        whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
        viewport={{ once: true }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="relative max-w-7xl w-full p-4 sm:p-6 rounded-3xl border-2 border-amber-500/60 bg-gradient-to-b
        from-amber-500/20 via-zinc-950 to-black shadow-[0_0_100px_rgba(245,158,11,0.4)] backdrop-blur-2xl
          text-center"
      >
        <div
          className="relative w-full h-[65vh] sm:h-[75vh] rounded-2xl overflow-hidden border border-amber-500/40
          bg-black/80 flex items-center justify-center shadow-inner"
        >
          <img
            src={squadImage}
            alt="Iron Gates CP in Aden"
            className="w-full h-full object-contain filter contrast-110"
          />
          <div
            className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent opacity-80
              pointer-events-none"
          />

          <div className="absolute bottom-6 left-0 right-0 px-6">
            <span
              className="px-4 py-1.5 rounded-full bg-amber-500/30 border border-amber-500/60 text-amber-300
                text-xs sm:text-sm tracking-[0.3em] uppercase backdrop-blur-md"
            >
              Legendary Squad
            </span>
            <h2
              className="text-4xl sm:text-6xl font-black text-white tracking-widest uppercase font-serif mt-3
                drop-shadow-[0_4px_10px_rgba(0,0,0,0.9)]"
            >
              Iron Gates CP • Aden
            </h2>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default IntroAdenCard;
