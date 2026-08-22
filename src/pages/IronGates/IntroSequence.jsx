import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

// Another resources
import Galaxy from "../../components/Backgrounds/GalaxyBackground";
import useFullScreen from "../../hooks/useFullScreen";
import usePreventScroll from "../../hooks/usePreventScroll";
import AnimatedTitleLine from "./components/IntroSequence/AnimatedTitleLine";
import BackgroundLogo from "./components/IntroSequence/BackgroundLogo";
import IntroAdenCard from "./components/IntroSequence/IntroAdenCard";
import IntroPlayerCard from "./components/IntroSequence/IntroPlayerCard";

const STORAGE_URL = import.meta.env.VITE_CLOUDFLARE_STORAGE;

// Users Mock data Lineage 2
const partyMembers = [
  {
    id: 1,
    name: "toBe",
    role: "Healer",
    side: "left",
    desc: "Divine protection & leads the path",
    img: `${STORAGE_URL}/avatars/tobe.png`,
    class: "Cardinal",
  },
  {
    id: 2,
    name: "ManiacShrek",
    role: "Dominator",
    side: "right",
    desc: "Crushing force & unstoppable rage",
    img: `${STORAGE_URL}/avatars/shrek.png`,
    class: "Overlord",
  },
  {
    id: 3,
    name: "LapestoPasto",
    role: "DD",
    side: "left",
    desc: "Silent death from the shadows",
    img: `${STORAGE_URL}/avatars/Lapesto.png`,
    class: "Archmage",
  },
  {
    id: 4,
    name: "Vryo",
    role: "DD / CPL",
    side: "right",
    desc: "DoD & target calling",
    img: `${STORAGE_URL}/avatars/Vryo.png`,
    class: "Mystic Muse",
  },
  {
    id: 5,
    name: "Fergi",
    role: "Mage / Healer",
    side: "left",
    desc: "Elemental control & heavy burst",
    img: `${STORAGE_URL}/avatars/fergi.png`,
    class: "Cardinal",
  },
  {
    id: 6,
    name: "Spektra",
    role: "Mage",
    side: "right",
    desc: "Storm caller & area dominance",
    img: `${STORAGE_URL}/avatars/spektra.png`,
    class: "Soultaker",
  },
  {
    id: 12,
    name: "Ansol",
    role: "Healer",
    side: "left",
    desc: "Soul breaker & crowd suppression",
    img: `${STORAGE_URL}/avatars/Ansol.png`,
    class: "Cardinal",
  },
  {
    id: 8,
    name: "ZukaDaddy",
    role: "DD",
    side: "right",
    desc: "Song of wind & impenetrable shield",
    img: `${STORAGE_URL}/avatars/Zukka.png`,
    class: "Mystic Muse",
  },
  {
    id: 9,
    name: "ManiacTom",
    role: "DD",
    side: "left",
    desc: "Swift blade & tactical intelligence",
    img: `${STORAGE_URL}/avatars/Tom.png`,
    class: "Mystic Muse",
  },
  {
    id: 10,
    name: "Winson",
    role: "Healer",
    side: "right",
    desc: "Soul breaker & crowd suppression",
    img: `${STORAGE_URL}/avatars/Winson.png`,
    class: "Cardinal",
  },
  {
    id: 7,
    name: "Manol",
    role: "Dominator",
    side: "left",
    desc: "Dance of fury & battlefield rhythm",
    img: `${STORAGE_URL}/avatars/Manol.png`,
    class: "Overlord",
  },
  {
    id: 11,
    name: "MWQueen",
    role: "DD",
    side: "left",
    desc: "Soul breaker & crowd suppression",
    img: `${STORAGE_URL}/avatars/mw.png`,
    class: "Soultaker",
  },
];

// ==========================================
// ⏱️ ТАЙМІНГИ ІНТРО (в мілісекундах)
// ==========================================
const INTRO_TIMINGS = {
  START_LOGO_ASSEMBLY: 4000, // Затримка на початку: скільки дивимось чорний екран перед появою лого
  SHOW_TEXT_ANIMATION: 13500, // Коли з'являється головний текст "Iron Gates"
  START_PRESENTING_MEMBERS: 20000, // Пауза перед тим, як починається скрол списку учасників
  MEMBER_SCROLL_DELAY: 3500, // Час показника кожного учасника перед скролом до наступного
  FINAL_SQUAD_VIEW_TIME: 5000, // Скільки часу дивимось загальну фінальну картку перед затуханням
  FADE_OUT_DURATION: 3000, // Тривалість фінального затухання звуку та екрану
};

const STAGES = {
  START: "start",
  PRESENTING_MEMBERS: "presenting_members",
  SHOWING_SQUAD: "showing_squad",
  FADING_OUT: "fading_out",
  ASSEMBLING: "assembling",
  TEXT_ANIMATION: "text_animation",
};

const IntroSequence = ({ onFinish }) => {
  const { enterFullscreen, exitFullscreen } = useFullScreen();

  const [started, setStarted] = useState(false);
  const [stage, setStage] = useState(STAGES.START);
  const audioRef = useRef(null);
  const containerRef = useRef(null);
  const memberRefs = useRef([]);
  const squadRef = useRef(null);

  usePreventScroll(containerRef);

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
    if (stage === STAGES.PRESENTING_MEMBERS) {
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
            setTimeout(scrollToNext, INTRO_TIMINGS.MEMBER_SCROLL_DELAY);
          } else {
            setTimeout(() => {
              if (squadRef.current) {
                squadRef.current.scrollIntoView({
                  behavior: "smooth",
                  block: "center",
                });
              }
              setStage(STAGES.SHOWING_SQUAD);
            }, INTRO_TIMINGS.MEMBER_SCROLL_DELAY);
          }
        }
      };

      setTimeout(scrollToNext, 800);
    } else if (stage === STAGES.SHOWING_SQUAD) {
      const timer = setTimeout(() => {
        fadeOutAudio();
        setStage(STAGES.FADING_OUT);
        setTimeout(() => {
          exitFullscreen();

          if (onFinish) onFinish();
        }, INTRO_TIMINGS.FADE_OUT_DURATION);
      }, INTRO_TIMINGS.FINAL_SQUAD_VIEW_TIME);

      return () => clearTimeout(timer);
    }
  }, [stage, onFinish]);

  const handleStart = () => {
    setStarted(true);

    enterFullscreen();

    if (audioRef.current) {
      audioRef.current.volume = 0.6;
      audioRef.current.play().catch((e) => console.log("Audio play error:", e));
    }

    setTimeout(
      () => setStage(STAGES.ASSEMBLING),
      INTRO_TIMINGS.START_LOGO_ASSEMBLY,
    );
    setTimeout(
      () => setStage(STAGES.TEXT_ANIMATION),
      INTRO_TIMINGS.SHOW_TEXT_ANIMATION,
    );
    setTimeout(() => {
      setStage(STAGES.PRESENTING_MEMBERS);
    }, INTRO_TIMINGS.START_PRESENTING_MEMBERS);
  };

  const line1 = "IRON";
  const line2 = "GATES";

  const isScrollingStage =
    stage === STAGES.PRESENTING_MEMBERS || stage === STAGES.SHOWING_SQUAD;

  const isAnimate =
    stage === STAGES.TEXT_ANIMATION ||
    stage === STAGES.PRESENTING_MEMBERS ||
    stage === STAGES.SHOWING_SQUAD ||
    stage === STAGES.FADING_OUT;

  const videoSrc = `${STORAGE_URL}/fire.mp4`;
  const audioSrc = `${STORAGE_URL}/audio/dion.mp3`;

  return (
    <div
      ref={containerRef}
      className="relative bg-black text-white overflow-x-hidden h-screen overflow-y-hidden snap-y
        snap-mandatory scroll-smooth overflow-hidden"
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
      {started && stage !== STAGES.FADING_OUT && (
        <button
          onClick={() => {
            setStage(STAGES.FADING_OUT);
            exitFullscreen();
            setTimeout(() => {
              if (onFinish) onFinish();
            }, 900);
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
          ${stage === STAGES.FADING_OUT ? "opacity-0" : "opacity-100"}`}
      >
        {(stage === STAGES.PRESENTING_MEMBERS ||
          stage === STAGES.SHOWING_SQUAD) && (
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

        <audio ref={audioRef} src={audioSrc} preload="auto" />

        {/* Background video */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover filter contrast-125"
          >
            <source src={videoSrc} type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-black/60 backdrop-blur-[1px]" />
        </div>

        {/* Background logo */}
        <BackgroundLogo isStart={stage === STAGES.START} />

        {/* Title Iron Gates */}
        <div
          className="absolute inset-0 z-20 flex flex-col items-center justify-center pointer-events-none
          text-center"
        >
          <AnimatedTitleLine
            text={line1}
            delayChildren={0.2}
            isAnimate={isAnimate}
            gradientClass="from-white via-slate-200 to-amber-200"
          />

          <AnimatedTitleLine
            text={line2}
            delayChildren={0.6}
            isAnimate={isAnimate}
            gradientClass="from-white via-slate-200 to-amber-300"
          />

          <motion.p
            className="mt-6 text-sm sm:text-base lg:text-3xl text-amber-200/90 tracking-[0.5em] uppercase font-light
              drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]"
            initial={{ opacity: 0, y: 20 }}
            animate={isAnimate ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
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
