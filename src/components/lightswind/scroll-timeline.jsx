/* eslint-disable max-len */
/* eslint-disable indent */
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { Calendar } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";

import { Card, CardContent } from "./card";

export const ScrollTimeline = ({
  events = [],
  title = "Chronicles of Power",
  subtitle = "Scroll to explore the epic journey",
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
  console.log("events: ", events);
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
      fade: { opacity: 0, y: 20 },
      slide: {
        x:
          cardAlignment === "left"
            ? -100
            : cardAlignment === "right"
              ? 100
              : index % 2 === 0
                ? -100
                : 100,
        opacity: 0,
      },
      scale: { scale: 0.8, opacity: 0 },
      flip: { rotateY: 90, opacity: 0 },
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
          duration: 0.7,
          delay: baseDelay,
          ease: [0.25, 0.1, 0.25, 1.0],
        },
      },
      viewport: { once: false, margin: "-100px" },
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

  const getCardClasses = (index) => {
    const baseClasses =
      "relative z-30 rounded-2xl transition-all duration-300 bg-zinc-950/70 backdrop-blur-md border border-amber-500/20 shadow-xl text-zinc-100";
    const effectClasses = {
      none: "",
      glow: "hover:border-amber-500/60 hover:shadow-[0_0_25px_rgba(245,158,11,0.15)]",
      shadow: "hover:shadow-2xl hover:-translate-y-1",
      bounce: "hover:scale-[1.03] hover:shadow-lg active:scale-[0.97]",
    };
    const alignmentClassesDesktop =
      cardAlignment === "alternating"
        ? index % 2 === 0
          ? "lg:mr-[calc(50%+25px)]"
          : "lg:ml-[calc(50%+25px)]"
        : cardAlignment === "left"
          ? "lg:mr-auto lg:ml-0"
          : "lg:ml-auto lg:mr-0";

    return cn(
      baseClasses,
      effectClasses[cardEffect],
      alignmentClassesDesktop,
      "w-full lg:w-[calc(50%-45px)]",
    );
  };

  return (
    <div
      ref={scrollRef}
      className={cn(
        "relative min-h-screen w-full overflow-hidden bg-transparent text-zinc-100",
        className,
      )}
    >
      <div className="text-center py-16 px-4">
        <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-3 text-amber-400 drop-shadow-sm">
          {title}
        </h2>
        <p className="text-sm md:text-base text-zinc-400 max-w-2xl mx-auto">
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
                className="absolute top-0 z-10"
                style={{
                  height: progressHeight,
                  width: progressLineWidth,
                  left: "50%",
                  transform: "translateX(-50%)",
                  borderRadius: progressLineCap === "round" ? "9999px" : "0px",
                  background: `linear-gradient(to bottom, #f59e0b, #fbbf24, #d97706)`,
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
              console.log("event: ", event);
              const yOffset = useTransform(
                smoothProgress,
                [0, 1],
                [parallaxIntensity * 100, -parallaxIntensity * 100],
              );
              return (
                <div
                  key={event.id || index}
                  ref={(el) => {
                    timelineRefs.current[index] = el;
                  }}
                  className={cn(
                    "relative flex items-center mb-24 py-4",
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
                        "w-5 h-5 rounded-full border-2 bg-zinc-950 flex items-center justify-center transition-colors",
                        index <= activeIndex
                          ? "border-amber-400 bg-amber-500/20 shadow-[0_0_12px_rgba(245,158,11,0.8)]"
                          : "border-zinc-800 bg-zinc-900",
                      )}
                      animate={
                        index <= activeIndex
                          ? {
                              scale: [1, 1.25, 1],
                              boxShadow: [
                                "0 0 0px rgba(245,158,11,0)",
                                "0 0 15px rgba(245,158,11,0.8)",
                                "0 0 0px rgba(245,158,11,0)",
                              ],
                            }
                          : {}
                      }
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    />
                  </div>

                  <motion.div
                    className={cn(getCardClasses(index), "mt-12 lg:mt-0")}
                    variants={getCardVariants(index)}
                    initial="initial"
                    whileInView="whileInView"
                    viewport={{ once: false, margin: "-100px" }}
                    style={parallaxIntensity > 0 ? { y: yOffset } : undefined}
                  >
                    <Card className="bg-transparent border-0 shadow-none">
                      <CardContent className="p-6">
                        {dateFormat === "badge" ? (
                          <div className="flex items-center mb-3">
                            <Calendar className="h-4 w-4 mr-2 text-amber-400" />
                            <span
                              className={cn(
                                "text-xs font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/30",
                                event.color
                                  ? `text-${event.color}`
                                  : "text-amber-400",
                              )}
                            >
                              {event.year}
                            </span>
                          </div>
                        ) : (
                          <p className="text-sm font-extrabold text-amber-400 mb-2 uppercase tracking-wide">
                            {event.year}
                          </p>
                        )}
                        <h3 className="text-xl font-bold mb-1.5 text-zinc-100">
                          {event.title}
                        </h3>
                        {event.subtitle && (
                          <p className="text-sm text-amber-200/70 font-medium mb-3">
                            {event.subtitle}
                          </p>
                        )}
                        <p className="text-sm text-zinc-400 leading-relaxed">
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
