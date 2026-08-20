import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

// Avatars
import fergiImage from "../../assets/ig-avatars/fergi.png";
import lapestoImage from "../../assets/ig-avatars/Lapesto.png";
import manolImage from "../../assets/ig-avatars/Manol.png";
import mwImage from "../../assets/ig-avatars/mw.png";
import shrekImage from "../../assets/ig-avatars/shrek.png";
import spektraImage from "../../assets/ig-avatars/spektra.png";
import tobeImage from "../../assets/ig-avatars/tobe.png";
import tomImage from "../../assets/ig-avatars/Tom.png";
import vryoImage from "../../assets/ig-avatars/Vryo.png";
import winsonImage from "../../assets/ig-avatars/Winson.png";
import zukkaImage from "../../assets/ig-avatars/Zukka.png";
// Another resources
import logoImage from "../../assets/logo-wide.jpg";
import introSound from "../../assets/sounds/dion.mp3";
import videoBG from "../../assets/video/fire.mp4";
import Galaxy from "../../components/Backgrounds/GalaxyBackground";
import AnimatedTitleLine from "./components/IntroSequence/AnimatedTitleLine";
import IntroAdenCard from "./components/IntroSequence/IntroAdenCard";
import IntroPlayerCard from "./components/IntroSequence/IntroPlayerCard";

// Users Mock data Lineage 2
const partyMembers = [
  {
    id: 1,
    name: "toBe",
    role: "Healer",
    side: "left",
    desc: "Divine protection & leads the path",
    img: tobeImage,
    class: "Cardinal",
  },
  {
    id: 2,
    name: "ManiacShrek",
    role: "Dominator",
    side: "right",
    desc: "Crushing force & unstoppable rage",
    img: shrekImage,
    class: "Overlord",
  },
  {
    id: 3,
    name: "LapestoPasto",
    role: "DD",
    side: "left",
    desc: "Silent death from the shadows",
    img: lapestoImage,
    class: "Archmage",
  },
  {
    id: 4,
    name: "Vryo",
    role: "DD / CPL",
    side: "right",
    desc: "DoD & target calling",
    img: vryoImage,
    class: "Mystic Muse",
  },
  {
    id: 5,
    name: "Fergi",
    role: "Mage / Healer",
    side: "left",
    desc: "Elemental control & heavy burst",
    img: fergiImage,
    class: "Necromancer",
  },
  {
    id: 6,
    name: "Spektra",
    role: "Mage",
    side: "right",
    desc: "Storm caller & area dominance",
    img: spektraImage,
    class: "Necromancer",
  },
  {
    id: 7,
    name: "Manol",
    role: "Dominator",
    side: "left",
    desc: "Dance of fury & battlefield rhythm",
    img: manolImage,
    class: "Overlord",
  },
  {
    id: 8,
    name: "ZukaDaddy",
    role: "DD",
    side: "right",
    desc: "Song of wind & impenetrable shield",
    img: zukkaImage,
    class: "MM",
  },
  {
    id: 9,
    name: "ManiacTom",
    role: "DD",
    side: "left",
    desc: "Swift blade & tactical intelligence",
    img: tomImage,
    class: "MM",
  },
  {
    id: 10,
    name: "Winson",
    role: "Healer",
    side: "right",
    desc: "Soul breaker & crowd suppression",
    img: winsonImage,
    class: "Cardinal",
  },
  {
    id: 11,
    name: "MWQueen",
    role: "DD",
    side: "left",
    desc: "Soul breaker & crowd suppression",
    img: mwImage,
    class: "Necromancer",
  },
];

const IntroSequence = ({ onFinish }) => {
  const [started, setStarted] = useState(false);
  // start -> assembling -> text_anim -> presenting_members -> showing_squad -> fading_out
  const [stage, setStage] = useState("start");
  const audioRef = useRef(null);
  const containerRef = useRef(null);
  const memberRefs = useRef([]);
  const squadRef = useRef(null); // Final image

  // Audio Fade out
  const fadeOutAudio = () => {
    if (!audioRef.current) return;
    let vol = audioRef.current.volume;
    const fadeAudio = setInterval(() => {
      if (vol > 0.05) {
        vol -= 0.05;
        audioRef.current.volume = Math.max(0, vol);
      } else {
        clearInterval(fadeAudio);
        audioRef.current.pause();
      }
    }, 150);
  };

  useEffect(() => {
    if (stage === "presenting_members") {
      const N = partyMembers.length;
      let current = 0;

      const scrollToNext = () => {
        if (current < N && memberRefs.current[current]) {
          memberRefs.current[current].scrollIntoView({
            behavior: "smooth",
            block: "center",
          });
          current++;
          if (current < N) {
            setTimeout(scrollToNext, 3500);
          } else {
            // When all members are shown - show final image from Aden
            setTimeout(() => {
              if (squadRef.current) {
                squadRef.current.scrollIntoView({
                  behavior: "smooth",
                  block: "center",
                });
              }
              setStage("showing_squad");
            }, 3500);
          }
        }
      };

      setTimeout(scrollToNext, 800);
    } else if (stage === "showing_squad") {
      // Give 5 sec to watch final image and start fade-out
      const timer = setTimeout(() => {
        fadeOutAudio();
        setStage("fading_out");
        setTimeout(() => {
          if (onFinish) onFinish();
        }, 1500);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [stage, onFinish]);

  const handleStart = () => {
    setStarted(true);
    if (audioRef.current) {
      audioRef.current.volume = 0.6;
      audioRef.current.play().catch((e) => console.log("Audio play error:", e));
    }

    setTimeout(() => setStage("assembling"), 2500);
    setTimeout(() => setStage("text_anim"), 12000);
    setTimeout(() => {
      setStage("presenting_members");
    }, 25000);
  };

  const rows = 8;
  const cols = 12;
  const totalPieces = rows * cols;

  const pieces = Array.from({ length: totalPieces }, (_, index) => {
    const randomDelay = ((Math.sin(index * 12.9898) * 43758.5453) % 1) * 8500;
    return { id: index, delay: Math.abs(randomDelay) };
  });

  const line1 = "IRON";
  const line2 = "GATES";

  const isScrollingStage =
    stage === "presenting_members" || stage === "showing_squad";

  return (
    <div
      ref={containerRef}
      className="relative bg-black text-white overflow-x-hidden h-screen overflow-y-auto snap-y
        snap-mandatory scroll-smooth"
    >
      <div
        className={`fixed inset-0 pointer-events-none z-35 transition-opacity duration-1000 ${
          isScrollingStage ? "opacity-60" : "opacity-0"
        }`}
      >
        <Galaxy
          mouseRepulsion
          mouseInteraction
          density={1}
          glowIntensity={0.3}
          saturation={0}
          hueShift={140}
          twinkleIntensity={0.3}
          rotationSpeed={0.1}
          repulsionStrength={2}
          autoCenterRepulsion={0}
          starSpeed={0.5}
          speed={1}
        />
      </div>
      {/* Skip Button */}
      {started && stage !== "fading_out" && (
        <button
          onClick={() => {
            setStage("fading_out");
            setTimeout(() => {
              if (onFinish) onFinish();
            }, 1500);
          }}
          className="fixed top-6 right-6 z-50 px-4 py-2 bg-black/40 hover:bg-amber-500/20 border
            border-amber-500/30 rounded-lg text-amber-300/85 hover:text-amber-300 text-xs tracking-widest
            uppercase transition-all backdrop-blur-sm"
        >
          Skip Intro ⏭
        </button>
      )}

      {/* Main screen with entry button (100vh) */}
      <div
        className={`relative h-screen w-full flex flex-col items-center justify-center bg-black
          overflow-hidden transition-opacity duration-1500 ease-in-out snap-start
          ${stage === "fading_out" ? "opacity-0" : "opacity-100"}`}
      >
        {(stage === "presenting_members" || stage === "showing_squad") && (
          <div className="absolute inset-0 bg-black/90 z-20 transition-opacity duration-1000" />
        )}

        {!started && (
          <div
            className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-black/95
              backdrop-blur-md cursor-pointer"
            onClick={handleStart}
          >
            <div
              className="text-center px-8 py-5 border border-amber-500/50 rounded-2xl bg-gradient-to-b
              from-amber-500/20 to-black shadow-[0_0_40px_rgba(245,158,11,0.4)] animate-pulse"
            >
              <h2 className="text-3xl font-black text-amber-400 tracking-[0.3em] uppercase mb-2">
                Iron Gates CP
              </h2>
              <p className="text-sm text-slate-300 tracking-wider">
                Клікніть, щоб увійти в світ
              </p>
            </div>
          </div>
        )}

        <audio ref={audioRef} src={introSound} preload="auto" />

        {/* Background video */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover filter contrast-125"
          >
            <source src={videoBG} type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-black/60 backdrop-blur-[1px]" />
        </div>

        {/* Background logo */}
        <div
          className="absolute inset-0 grid pointer-events-none z-10"
          style={{
            gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
            gridTemplateRows: `repeat(${rows}, minmax(0, 1fr))`,
          }}
        >
          {pieces.map((piece) => {
            const x = (piece.id % cols) * (100 / (cols - 1));
            const y = Math.floor(piece.id / cols) * (100 / (rows - 1));

            return (
              <div
                key={piece.id}
                className={`w-full h-full bg-cover transition-all duration-1500 ease-out transform ${
                  stage === "start"
                    ? "opacity-0 scale-50 filter blur-md"
                    : "opacity-90 scale-100 filter blur-0"
                }`}
                style={{
                  backgroundImage: `url(${logoImage})`,
                  backgroundSize: `${cols * 100}% ${rows * 100}%`,
                  backgroundPosition: `${x}% ${y}%`,
                  transitionDelay: `${piece.delay}ms`,
                }}
              />
            );
          })}
        </div>

        {/* Title Iron Gates */}
        <div
          className="absolute inset-0 z-20 flex flex-col items-center justify-center pointer-events-none
          text-center"
        >
          <AnimatedTitleLine
            text={line1}
            stage={stage}
            delayChildren={0.2}
            gradientClass="from-white via-slate-200 to-amber-200"
          />

          <AnimatedTitleLine
            text={line2}
            stage={stage}
            delayChildren={0.6}
            gradientClass="from-white via-slate-200 to-amber-300"
          />

          <motion.p
            className="mt-6 text-sm sm:text-base lg:text-3xl text-amber-200/90 tracking-[0.5em] uppercase font-light
                drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]"
            initial={{ opacity: 0, y: 20 }}
            animate={
              stage === "text_anim" ||
              stage === "presenting_members" ||
              stage === "showing_squad" ||
              stage === "fading_out"
                ? { opacity: 1, y: 0 }
                : { opacity: 0, y: 20 }
            }
            transition={{ duration: 1.2, delay: 1.2 }}
          >
            Brotherhood established
          </motion.p>
        </div>
      </div>

      {/* Section with members */}
      <div className="z-35">
        {partyMembers.map((member, index) => {
          const { id, img, name, class: gameClass, role, desc } = member;
          const isLeft = member.side === "left";

          return (
            <IntroPlayerCard
              key={id}
              img={img}
              name={name}
              role={role}
              desc={desc}
              index={index}
              isLeft={isLeft}
              gameClass={gameClass}
              memberRefs={memberRefs}
            />
          );
        })}

        {/* Section with full Squad (Aden)) */}
        <IntroAdenCard squadRef={squadRef} />
      </div>
    </div>
  );
};

export default IntroSequence;
