import { motion } from "framer-motion";
import { useRef, useState } from "react";

// Імпортуємо зображення та ресурси
import logoImage from "../../assets/logo-wide.jpg";
import introSound from "../../assets/sounds/dion.mp3";
import videoBG from "../../assets/video/fire.mp4";

const IntroSequence = ({ onFinish }) => {
  const [started, setStarted] = useState(false);
  const [stage, setStage] = useState("start"); // start -> assembling -> text_anim -> fading_out
  const audioRef = useRef(null);

  const handleStart = () => {
    setStarted(true);
    if (audioRef.current) {
      audioRef.current.volume = 0.6;
      audioRef.current.play().catch((e) => console.log("Audio play error:", e));
    }

    // Збільшені таймінги загальною тривалістю близько 30 секунд
    setTimeout(() => setStage("assembling"), 300); // Повільне збирання мозаїки фону
    setTimeout(() => setStage("text_anim"), 10000); // Поява епічного тексту після того, як фон повністю зібрався
    setTimeout(() => setStage("fading_out"), 28000); // Початок фінального зникнення інтро
    setTimeout(() => {
      if (onFinish) onFinish();
    }, 30000); // Повне завершення через 30 секунд
  };

  const rows = 8;
  const cols = 12;
  const totalPieces = rows * cols;

  // Розтягуємо затримки шматочків мозаїки на більший інтервал (до 8-9 секунд)
  const pieces = Array.from({ length: totalPieces }, (_, index) => {
    const randomDelay = ((Math.sin(index * 12.9898) * 43758.5453) % 1) * 8500;
    return { id: index, delay: Math.abs(randomDelay) };
  });

  const line1 = "IRON";
  const line2 = "GATES";

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
    <div
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black overflow-hidden
        transition-opacity duration-1500 ease-in-out ${stage === "fading_out" ? "opacity-0" : "opacity-100"}`}
    >
      {/* Кнопка для обходу блокування аудіо браузером */}
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

      {/* Тимчасова кнопка Skip (можеш стилізувати її як завгодно у кутку) */}
      {started && stage !== "fading_out" && (
        <button
          onClick={() => {
            setStage("fading_out");
            setTimeout(() => {
              if (onFinish) onFinish();
            }, 1000);
          }}
          className="absolute top-6 right-6 z-50 px-4 py-2 bg-black/40 hover:bg-amber-500/20 border
            border-amber-500/30 rounded-lg text-amber-300/80 hover:text-amber-300 text-xs tracking-widest
            uppercase transition-all backdrop-blur-sm"
        >
          Skip Intro ⏭
        </button>
      )}

      <audio ref={audioRef} src={introSound} preload="auto" />

      {/* 1. ФОНОВЕ ВІДЕО ВОГНЮ */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-40 filter contrast-125"
        >
          <source src={videoBG} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/60 backdrop-blur-[1px]" />
      </div>

      {/* 2. ЕТАП ПОВІЛЬНОГО ЗБИРАННЯ МОЗАЇКИ ФОНУ */}
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

      {/* 3. АНІМОВАНИЙ ТЕКСТ У СТИЛІ ФЕНТЕЗІ */}
      <div className="absolute inset-0 z-20 flex flex-col items-center justify-center pointer-events-none text-center">
        {/* Перший рядок: IRON */}
        <motion.h1
          className="text-5xl sm:text-7xl lg:text-9xl font-black tracking-wider uppercase font-serif flex
            justify-center mb-1 drop-shadow-[0_5px_5px_rgba(0,0,0,0.9)]"
          initial="hidden"
          animate={
            stage === "text_anim" || stage === "fading_out"
              ? "visible"
              : "hidden"
          }
          variants={{
            visible: {
              transition: { staggerChildren: 0.12, delayChildren: 0.2 },
            },
          }}
        >
          {line1.split("").map((char, index) => (
            <motion.span
              key={index}
              variants={letterVariants}
              className="inline-block bg-gradient-to-b from-white via-slate-200 to-amber-200 bg-clip-text
                text-transparent [-webkit-text-stroke:1px_rgba(120,53,15,0.8)] filter
                drop-shadow-[0_4px_8px_rgba(0,0,0,0.8)]"
            >
              {char}
            </motion.span>
          ))}
        </motion.h1>

        {/* Другий рядок: GATES */}
        <motion.h1
          className="text-5xl sm:text-7xl lg:text-9xl font-black tracking-wider uppercase font-serif flex
            justify-center drop-shadow-[0_5px_5px_rgba(0,0,0,0.9)]"
          initial="hidden"
          animate={
            stage === "text_anim" || stage === "fading_out"
              ? "visible"
              : "hidden"
          }
          variants={{
            visible: {
              transition: { staggerChildren: 0.12, delayChildren: 0.6 },
            },
          }}
        >
          {line2.split("").map((char, index) => (
            <motion.span
              key={index}
              variants={letterVariants}
              className="inline-block bg-gradient-to-b from-white via-slate-200 to-amber-300 bg-clip-text
                text-transparent [-webkit-text-stroke:1px_rgba(120,53,15,0.8)] filter
                drop-shadow-[0_4px_8px_rgba(0,0,0,0.8)]"
            >
              {char}
            </motion.span>
          ))}
        </motion.h1>

        {/* Підзаголовок під назвою */}
        <motion.p
          className="mt-6 text-sm sm:text-xl text-amber-200/90 tracking-[0.5em] uppercase font-light
            drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]"
          initial={{ opacity: 0, y: 20 }}
          animate={
            stage === "text_anim" || stage === "fading_out"
              ? { opacity: 1, y: 0 }
              : { opacity: 0, y: 20 }
          }
          transition={{ duration: 1.2, delay: 1.2 }}
        >
          Brotherhood established
        </motion.p>
      </div>

      {/* Мерехтіння плівки */}
      <div
        className="absolute inset-0 pointer-events-none opacity-10 z-30"
        style={{
          backgroundImage:
            "url(https://www.transparenttextures.com/patterns/diagmonds-light.png)",
        }}
      />
    </div>
  );
};

export default IntroSequence;
