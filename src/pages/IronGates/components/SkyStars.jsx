const SkyStars = () => {
  return (
    <div className="absolute inset-0 pointer-events-none z-50">
      {[...Array(63)].map((_, i) => (
        <div
          key={i}
          className="absolute rounded-full bg-white animate-[ping_3s_cubic-bezier(0,0,0.2,1)_infinite]"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            width: `${Math.random() * 2 + 1}px`,
            height: `${Math.random() * 2 + 1}px`,
            opacity: Math.random() * 0.7 + 0.3,
            animationDelay: `${Math.random() * 5}s`,
            animationDuration: `${Math.random() * 4 + 2}s`,
          }}
        />
      ))}
    </div>
  );
};

export default SkyStars;
