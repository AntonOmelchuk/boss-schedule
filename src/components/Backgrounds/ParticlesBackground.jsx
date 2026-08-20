import Particles, { ParticlesProvider } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import { useMemo } from "react";

const ParticlesBackground = () => {
  const init = async (engine) => {
    await loadSlim(engine);
  };

  const options = useMemo(
    () => ({
      fullScreen: { enable: false },
      fpsLimit: 120,
      interactivity: {
        events: {
          onHover: { enable: true, mode: "repulse" },
        },
        modes: {
          repulse: { distance: 80, duration: 0.4 },
        },
      },
      particles: {
        color: { value: ["#f59e0b", "#fbbf24", "#d97706"] },
        links: { enable: false },
        move: {
          direction: "top",
          enable: true,
          outModes: { default: "out" },
          speed: 0.6,
          straight: false,
        },
        number: {
          density: { enable: true, area: 800 },
          value: 60,
        },
        opacity: {
          value: { min: 0.2, max: 0.7 },
          animation: { enable: true, speed: 1, minimumValue: 0.2 },
        },
        size: {
          value: { min: 1.5, max: 3.5 },
        },
      },
      detectRetina: true,
    }),
    [],
  );

  return (
    <ParticlesProvider init={init}>
      <Particles
        id="tsparticles"
        options={options}
        className="absolute inset-0 pointer-events-none z-0 w-full h-full"
      />
    </ParticlesProvider>
  );
};

export default ParticlesBackground;
