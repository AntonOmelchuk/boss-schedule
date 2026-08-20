import { motion } from "framer-motion";

import GlowLine from "../../../../components/UI/GlowLine";

const Header = () => {
  const titleText = "Iron Gates";

  return (
    <header className="mb-12 text-center relative py-6">
      <div
        className="absolute inset-0
          bg-[radial-gradient(circle_at_center,rgba(251,191,36,0.15)_0%,rgba(153,27,27,0.1)_40%,transparent_70%)]
          pointer-events-none blur-3xl"
      />

      <h1
        className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter uppercase font-serif relative
          inline-block bg-gradient-to-r from-amber-200 via-orange-500 to-amber-200 animate-fire-flow
          bg-clip-text text-transparent [-webkit-text-stroke:1px_rgba(120,53,15,0.8)]
          drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)] drop-shadow-[0_0_15px_rgba(245,158,11,0.5)]
          transform scale-y-110"
      >
        {titleText}

        <motion.span
          animate={{ opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-0 bg-gradient-to-t from-transparent via-amber-500/20 to-transparent
            bg-clip-text blur-[2px] pointer-events-none"
        />
      </h1>

      <p
        className="text-base md:text-lg text-amber-300 font-bold tracking-[0.25em] uppercase mt-6 relative
        drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]"
      >
        CP Activity & Epic Distribution
      </p>

      <div className="relative mt-8">
        <GlowLine orientation="horizontal" position="0%" color="fire" />
      </div>
    </header>
  );
};

export default Header;
