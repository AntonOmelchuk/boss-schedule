import { motion } from "framer-motion";

const AnimatedTitleLine = ({ text, stage, delayChildren, gradientClass }) => {
  const letterVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.3, filter: "blur(12px)" },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      filter: "blur(0px)",
      transition: { duration: 0.8, ease: [0.2, 0.65, 0.3, 0.9] },
    },
  };

  return (
    <motion.h1
      className="text-6xl sm:text-7xl lg:text-[210px] font-black tracking-wider uppercase font-serif flex
        justify-center mb-1 drop-shadow-[0_5px_5px_rgba(0,0,0,0.9)]"
      initial="hidden"
      animate={
        stage === "text_anim" ||
        stage === "presenting_members" ||
        stage === "showing_squad" ||
        stage === "fading_out"
          ? "visible"
          : "hidden"
      }
      variants={{
        visible: {
          transition: { staggerChildren: 0.12, delayChildren },
        },
      }}
    >
      {text.split("").map((char, index) => (
        <motion.span
          key={index}
          variants={letterVariants}
          className={`inline-block bg-gradient-to-b ${gradientClass} bg-clip-text text-transparent
            [-webkit-text-stroke:1px_rgba(120,53,15,0.8)] filter drop-shadow-[0_4px_8px_rgba(0,0,0,0.8)]`}
        >
          {char}
        </motion.span>
      ))}
    </motion.h1>
  );
};

export default AnimatedTitleLine;
