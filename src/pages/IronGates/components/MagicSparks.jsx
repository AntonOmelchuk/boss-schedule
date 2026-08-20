import { memo, useMemo } from "react";

const MagicSparks = memo(() => {
  const sparks = useMemo(() => [...Array(25)], []);

  return (
    <div className="absolute inset-0 pointer-events-none z-50">
      {sparks.map((_, i) => (
        <div
          key={i}
          className="absolute rounded-full animate-particle"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            width: `${Math.random() * 3 + 2}px`,
            height: `${Math.random() * 3 + 2}px`,
            background: i % 2 === 0 ? "#fbbf24" : "#c084fc",
            boxShadow: i % 2 === 0 ? "0 0 10px #fbbf24" : "0 0 10px #c084fc",
            animationDuration: "6s",
            animationDelay: `${i * 0.3}s`,
          }}
        />
      ))}
      <style>{`
        @keyframes particleFloat {
          0% { transform: translateY(105vh) translateX(0) scale(0.5); opacity: 0; }
          20% { opacity: 0.8; }
          80% { opacity: 0.8; }
          100% { transform: translateY(-10vh) translateX(30px) scale(1.2); opacity: 0; }
        }
        .animate-particle {
          animation-name: particleFloat;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
        }
      `}</style>
    </div>
  );
});

export default MagicSparks;
