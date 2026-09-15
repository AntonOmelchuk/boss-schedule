import {
  Droplets,
  Flame,
  Plus,
  Shield,
  Skull,
  Sparkles,
  Star,
  Zap,
} from "lucide-react";
import { useEffect, useState } from "react";

const FloatingMagicalIcons = ({ playClass = "" }) => {
  const [iconsList, setIconsList] = useState([]);

  const getIconsByClass = () => {
    const cls = (playClass || "").toLowerCase();
    if (cls.includes("bishop") || cls.includes("cardinal"))
      return [
        {
          Icon: Plus,
          color: "text-green-400 drop-shadow-[0_0_8px_rgba(74,222,128,0.8)]",
        },
        {
          Icon: Sparkles,
          color: "text-emerald-300 drop-shadow-[0_0_8px_rgba(110,231,183,0.8)]",
        },
      ];
    if (cls.includes("archmage") || cls.includes("sorcerer"))
      return [
        {
          Icon: Flame,
          color: "text-orange-500 drop-shadow-[0_0_8px_rgba(249,115,22,0.8)]",
        },
      ];
    if (cls.includes("mystic muse") || cls.includes("spellsinger"))
      return [
        {
          Icon: Droplets,
          color: "text-cyan-400 drop-shadow-[0_0_8px_rgba(34,211,238,0.8)]",
        },
      ];
    if (cls.includes("soultaker") || cls.includes("necromancer"))
      return [
        {
          Icon: Skull,
          color: "text-purple-400 drop-shadow-[0_0_8px_rgba(192,132,252,0.8)]",
        },
      ];
    if (cls.includes("dominator") || cls.includes("overlord"))
      return [
        {
          Icon: Shield,
          color: "text-amber-400 drop-shadow-[0_0_8px_rgba(251,191,36,0.8)]",
        },
        {
          Icon: Zap,
          color: "text-yellow-300 drop-shadow-[0_0_8px_rgba(253,224,71,0.8)]",
        },
      ];
    return [
      {
        Icon: Star,
        color: "text-yellow-400 drop-shadow-[0_0_8px_rgba(250,204,21,0.8)]",
      },
    ];
  };

  const currentIcons = getIconsByClass();

  useEffect(() => {
    const interval = setInterval(() => {
      const count = Math.floor(Math.random() * 2) + 2;
      const newBatch = [];

      for (let i = 0; i < count; i++) {
        const id = Date.now() + Math.random() + i;
        const selected =
          currentIcons[Math.floor(Math.random() * currentIcons.length)];

        const startRight = Math.floor(Math.random() * 30) + 10;
        const waveDir = Math.random() > 0.5 ? 1 : -1;
        const scale = Number((Math.random() * 0.4 + 0.8).toFixed(2));
        const opacity = Number((Math.random() * 0.3 + 0.7).toFixed(2));
        const duration = Number((Math.random() * 0.8 + 2.0).toFixed(1));

        newBatch.push({
          id,
          IconComponent: selected.Icon,
          colorClass: selected.color,
          startRight,
          waveDir,
          scale,
          opacity,
          duration,
        });
      }

      setIconsList((prev) => [...prev, ...newBatch]);

      setTimeout(() => {
        setIconsList((prev) => prev.filter((item) => !newBatch.includes(item)));
      }, 3000);
    }, 900);

    return () => clearInterval(interval);
  }, [playClass]);

  return (
    <div className="absolute bottom-0 right-0 z-50 pointer-events-none w-24 h-40 overflow-visible">
      {iconsList.map((item) => {
        const IconComponent = item.IconComponent;
        return (
          <span
            key={item.id}
            className={`absolute bottom-2 select-none animate-tiktok-wave flex items-center
              justify-center ${item.colorClass}`}
            style={{
              right: `${item.startRight}px`,
              "--wave-dir": item.waveDir,
              "--item-opacity": item.opacity,
              animationDuration: `${item.duration}s`,
              transform: `scale(${item.scale})`,
            }}
          >
            <IconComponent size={24} strokeWidth={2.5} />
          </span>
        );
      })}
    </div>
  );
};

export default FloatingMagicalIcons;
