/* eslint-disable max-len */
/* eslint-disable indent */
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { Calendar } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import logo from "../../assets/logo.png";
import { BOSS_ICONS } from "../../constants/general";
import { MEMBER_COLORS, MEMBERS_MAP } from "../../constants/members";
import { cn } from "../../lib/utils";
import { Card, CardContent } from "./card";

export const ScrollTimeline = ({
  events = [],
  title,
  subtitle,
  animationOrder = "sequential",
  cardAlignment = "alternating",
  lineColor = "bg-zinc-800",
  progressIndicator = true,
  cardEffect = "glow",
  parallaxIntensity = 0.2,
  progressLineWidth = 2,
  progressLineCap = "round",
  dateFormat = "badge",
  revealAnimation = "fade",
  className = "",
  connectorStyle = "line",
}) => {
  const scrollRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(-1);
  const timelineRefs = useRef([]);

  const { scrollYProgress } = useScroll({
    target: scrollRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const progressHeight = useTransform(smoothProgress, [0, 1], ["0%", "100%"]);

  useEffect(() => {
    const unsubscribe = scrollYProgress.onChange((v) => {
      const newIndex = Math.floor(v * events.length);
      if (
        newIndex !== activeIndex &&
        newIndex >= 0 &&
        newIndex < events.length
      ) {
        setActiveIndex(newIndex);
      }
    });
    return () => unsubscribe();
  }, [scrollYProgress, events.length, activeIndex]);

  const getCardVariants = (index) => {
    const baseDelay =
      animationOrder === "simultaneous"
        ? 0
        : animationOrder === "staggered"
          ? index * 0.2
          : index * 0.3;

    const initialStates = {
      fade: { opacity: 0, y: 40 },
      slide: {
        x:
          cardAlignment === "left"
            ? -120
            : cardAlignment === "right"
              ? 120
              : index % 2 === 0
                ? -120
                : 120,
        opacity: 0,
      },
      scale: { scale: 0.8, opacity: 0 },
      flip: { rotateY: 90, opacity: 0 },
      slideScale: {
        x:
          cardAlignment === "left"
            ? -70
            : cardAlignment === "right"
              ? 70
              : index % 2 === 0
                ? -70
                : 70,
        opacity: 0,
        scale: 0.8,
      },
      none: { opacity: 1 },
    };

    return {
      initial: initialStates[revealAnimation],
      whileInView: {
        opacity: 1,
        y: 0,
        x: 0,
        scale: 1,
        rotateY: 0,
        transition: {
          duration: 0.45,
          delay: baseDelay,
          ease: [0.16, 1, 0.3, 1],
        },
      },
      viewport: { once: false, margin: "-80px" },
    };
  };

  const getConnectorClasses = () => {
    const baseClasses = cn(
      "absolute left-1/2 transform -translate-x-1/2",
      lineColor,
    );
    const widthStyle = `w-[${progressLineWidth}px]`;
    switch (connectorStyle) {
      case "dots":
        return cn(baseClasses, "w-1 rounded-full");
      case "dashed":
        return cn(
          baseClasses,
          widthStyle,
          `[mask-image:linear-gradient(to_bottom,black_33%,transparent_33%,transparent_66%,black_66%)] [mask-size:1px_12px]`,
        );
      case "line":
      default:
        return cn(baseClasses, widthStyle);
    }
  };

  const activeEvent =
    activeIndex >= 0 && activeIndex < events.length
      ? events[activeIndex]
      : null;
  const activeMemberColors = activeEvent
    ? MEMBER_COLORS[activeEvent.subtitle]
    : null;

  const progressGradient = activeMemberColors
    ? `linear-gradient(to bottom, ${activeMemberColors.start}, ${activeMemberColors.end})`
    : `linear-gradient(to bottom, #f59e0b, #fbbf24, #d97706)`;

  return (
    <div
      ref={scrollRef}
      className={cn(
        "relative min-h-screen w-full overflow-hidden bg-transparent text-zinc-100",
        className,
      )}
    >
      <div className="text-center py-16 px-4">
        <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-4 text-amber-400 drop-shadow-md">
          {title}
        </h2>
        <p className="text-base md:text-lg text-zinc-300 max-w-2xl mx-auto">
          {subtitle}
        </p>
      </div>

      <div className="relative max-w-6xl mx-auto px-4 pb-24">
        <div className="relative mx-auto">
          <div
            className={cn(getConnectorClasses(), "h-full absolute top-0 z-10")}
          ></div>

          {progressIndicator && (
            <>
              <motion.div
                className="absolute top-0 z-10 transition-colors duration-500"
                style={{
                  height: progressHeight,
                  width: progressLineWidth,
                  left: "50%",
                  transform: "translateX(-50%)",
                  borderRadius: progressLineCap === "round" ? "9999px" : "0px",
                  background: progressGradient,
                  boxShadow: `
                    0 0 15px rgba(245, 158, 11, 0.6),
                    0 0 25px rgba(251, 191, 36, 0.4)
                  `,
                }}
              />
              <motion.div
                className="absolute z-20"
                style={{
                  top: progressHeight,
                  left: "50%",
                  translateX: "-50%",
                  translateY: "-50%",
                }}
              >
                <motion.div
                  className="w-5 h-5 rounded-full"
                  style={{
                    background:
                      "radial-gradient(circle, rgba(251,191,36,0.9) 0%, rgba(245,158,11,0.6) 40%, rgba(217,119,6,0) 70%)",
                    boxShadow: `
                      0 0 15px 4px rgba(245, 158, 11, 0.7),
                      0 0 25px 8px rgba(251, 191, 36, 0.5),
                      0 0 40px 15px rgba(217, 119, 6, 0.3)
                    `,
                  }}
                  animate={{
                    scale: [1, 1.3, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              </motion.div>
            </>
          )}

          <div className="relative z-20">
            {events.map((event, index) => {
              const yOffset = useTransform(
                smoothProgress,
                [0, 1],
                [parallaxIntensity * 100, -parallaxIntensity * 100],
              );

              const memberConfig = MEMBERS_MAP[event.subtitle];
              const memberColors = MEMBER_COLORS[event.subtitle];

              const bossImg = BOSS_ICONS[event.title];

              const cardStyle = memberColors
                ? {
                    background: `linear-gradient(135deg, ${memberColors.end}dd, rgba(9, 9, 11, 0.85))`,
                    borderColor: memberColors.start,
                  }
                : {
                    background: `linear-gradient(135deg, rgba(217, 119, 6, 0.2), rgba(9, 9, 11, 0.85))`,
                    borderColor: "#f59e0b",
                  };

              const alignmentClassesDesktop =
                cardAlignment === "alternating"
                  ? index % 2 === 0
                    ? "lg:mr-[calc(50%+90px)]"
                    : "lg:ml-[calc(50%+90px)]"
                  : cardAlignment === "left"
                    ? "lg:mr-auto lg:ml-0"
                    : "lg:ml-auto lg:mr-0";

              return (
                <div
                  key={event.id || index}
                  ref={(el) => {
                    timelineRefs.current[index] = el;
                  }}
                  className={cn(
                    "relative flex items-center mb-28 py-4 -translate-y-4",
                    "flex-col lg:flex-row",
                    cardAlignment === "alternating"
                      ? index % 2 === 0
                        ? "lg:justify-start"
                        : "lg:flex-row-reverse lg:justify-start"
                      : cardAlignment === "left"
                        ? "lg:justify-start"
                        : "lg:flex-row-reverse lg:justify-start",
                  )}
                >
                  <div
                    className={cn(
                      "absolute top-1/2 transform -translate-y-1/2 z-30",
                      "left-1/2 -translate-x-1/2",
                    )}
                  >
                    <motion.div
                      className={cn(
                        "w-20 h-20 rounded-full border-2 bg-zinc-950 flex items-center justify-center overflow-hidden transition-colors shadow-lg",
                        index <= activeIndex
                          ? "border-amber-400 shadow-[0_0_15px_rgba(245,158,11,0.8)]"
                          : "border-zinc-800 bg-zinc-900",
                      )}
                      animate={
                        index <= activeIndex
                          ? {
                              scale: [1, 1.15, 1],
                            }
                          : {}
                      }
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    >
                      {memberConfig?.image ? (
                        <img
                          src={memberConfig.image}
                          alt={memberConfig.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <img
                          src={logo}
                          alt="Iron Gates"
                          className="w-full h-full object-cover"
                        />
                      )}
                    </motion.div>
                  </div>

                  <motion.div
                    className={cn(
                      "relative z-30 rounded-2xl transition-all duration-300 backdrop-blur-md border shadow-2xl text-zinc-100 w-full lg:w-[calc(50%-55px)] mt-12 lg:mt-0",
                      cardEffect === "glow" &&
                        "hover:shadow-[0_0_30px_rgba(245,158,11,0.25)]",
                      alignmentClassesDesktop,
                    )}
                    variants={getCardVariants(index)}
                    initial="initial"
                    whileInView="whileInView"
                    viewport={{ once: false, margin: "-100px" }}
                    style={{
                      ...(parallaxIntensity > 0 ? { y: yOffset } : {}),
                      ...cardStyle,
                      borderWidth: "1.5px",
                    }}
                  >
                    <Card className="bg-transparent border-0 shadow-none">
                      <CardContent className="p-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            {dateFormat === "badge" ? (
                              <div className="flex items-center">
                                <Calendar className="h-5 w-5 mr-2 text-amber-400" />
                                <span
                                  className={cn(
                                    "text-sm font-extrabold uppercase tracking-wider px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/40",
                                    event.color
                                      ? `text-${event.color}`
                                      : "text-amber-400",
                                  )}
                                >
                                  {event.year}
                                </span>
                              </div>
                            ) : (
                              <p className="text-base font-extrabold text-amber-400 uppercase tracking-wide">
                                {event.year}
                              </p>
                            )}
                          </div>

                          {bossImg && (
                            <div className="flex items-center bg-zinc-900/80 border border-amber-500/30 rounded-xl px-2.5 py-1.5 shadow-inner">
                              <img
                                src={bossImg}
                                alt="Boss Icon"
                                className="w-12 h-12 object-contain drop-shadow-[0_0_6px_rgba(245,158,11,0.5)]"
                              />
                            </div>
                          )}
                        </div>

                        <h3 className="text-2xl font-bold mb-2 text-zinc-100 tracking-tight">
                          {event.title}
                        </h3>

                        {event.subtitle && (
                          <div className="flex items-center space-x-3 mb-4">
                            {memberConfig && (
                              <span className="text-lg font-bold text-amber-300 bg-amber-500/10 px-2.5 py-0.5 rounded-md border border-amber-500/20">
                                {memberConfig.name}
                              </span>
                            )}
                          </div>
                        )}

                        <p className="text-base text-zinc-300 leading-relaxed font-normal">
                          {event.description}
                        </p>
                      </CardContent>
                    </Card>
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
