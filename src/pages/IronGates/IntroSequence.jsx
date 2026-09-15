import { get, ref } from "firebase/database";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

import Galaxy from "../../components/Backgrounds/GalaxyBackground";
import { STORAGE_URL } from "../../constants/members";
import useFullScreen from "../../hooks/useFullScreen";
import usePreventScroll from "../../hooks/usePreventScroll";
import useTranslation from "../../hooks/useTranslation";
import { db } from "../../services/firebase";
import { useDashboardStore } from "../../store/useDashboardStore";
import AnimatedTitleLine from "./components/IntroSequence/AnimatedTitleLine";
import BackgroundLogo from "./components/IntroSequence/BackgroundLogo";
import IntroAdenCard from "./components/IntroSequence/IntroAdenCard";
import IntroPlayerCard from "./components/IntroSequence/IntroPlayerCard";

// ==========================================
// ⏱️ TIME DELAY SETTIGNS IN MS
// ==========================================
const INTRO_TIMINGS = {
  START_LOGO_ASSEMBLY: 2550, // Delay before start showing logo
  SHOW_TEXT_ANIMATION: 11000, // When main title appear
  START_PRESENTING_MEMBERS: 16000, // Delay before auto scroll
  MEMBER_SCROLL_DELAY: 3500, // Time for showing each member card
  FINAL_SQUAD_VIEW_TIME: 4000, // Delay before fade out
  FADE_OUT_DURATION: 3000, // Fade out time
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
  const { members, setMembers } = useDashboardStore();
  const { enterFullscreen, exitFullscreen } = useFullScreen();

  const { t } = useTranslation();

  const [started, setStarted] = useState(false);
  const [stage, setStage] = useState(STAGES.START);

  const audioRef = useRef(null);
  const containerRef = useRef(null);
  const memberRefs = useRef([]);
  const squadRef = useRef(null);

  usePreventScroll(containerRef);

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const membersRef = ref(db, "iron_gates_members");
        const snapshot = await get(membersRef);
        if (snapshot.exists()) {
          const data = snapshot.val();

          const membersArray = Object.keys(data).map((key) => ({
            id: key,
            ...data[key],
          }));

          setMembers(membersArray);
        }
      } catch (error) {
        console.error("Error fetching iron_gates_members:", error);
      }
    };

    fetchMembers();
  }, []);

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
      const N = members.length;
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
  }, [stage, onFinish, members?.length]);

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
  const audioSrc = `${STORAGE_URL}/audio/intro.mp3`;

  const handleInstantSkip = () => {
    setStage(STAGES.FADING_OUT);
    exitFullscreen();
    setTimeout(() => {
      if (onFinish) onFinish();
    }, 900);
  };

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
          {t.intro.skip}
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
                {t.intro.clickToEnter}
              </p>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleInstantSkip();
              }}
              className="text-base text-slate-400 hover:text-amber-300 underline underline-offset-4
                tracking-wider transition-colors cursor-pointer mt-1"
            >
              {t.intro.skipLink}
            </button>
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
            {t.intro.brotherhood}
          </motion.p>
        </div>
      </div>

      {/* Section with members */}
      <div className="z-35">
        {members?.map((member, index) => {
          const { img, pvp, name, video, main_class, role, sub_classes } =
            member;

          return (
            <IntroPlayerCard
              pvp={pvp}
              img={img}
              key={name}
              name={name}
              role={role}
              index={index}
              video={video}
              main_class={main_class}
              memberRefs={memberRefs}
              sub_classes={sub_classes}
            />
          );
        })}

        {/* Section with full Squad (Aden) */}
        <IntroAdenCard squadRef={squadRef} />
      </div>
    </div>
  );
};

export default IntroSequence;
