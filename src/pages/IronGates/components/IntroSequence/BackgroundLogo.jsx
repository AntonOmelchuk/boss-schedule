import { STORAGE_URL } from "../../../../constants/general";

const BackgroundLogo = ({ isStart }) => {
  const rows = 8;
  const cols = 12;
  const totalPieces = rows * cols;

  const pieces = Array.from({ length: totalPieces }, (_, index) => {
    const randomDelay = ((Math.sin(index * 12.9898) * 43758.5453) % 1) * 8500;
    return { id: index, delay: Math.abs(randomDelay) };
  });

  return (
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
              isStart
                ? "opacity-0 scale-50 filter blur-md"
                : "opacity-90 scale-100 filter blur-0"
            }`}
            style={{
              backgroundImage: `url(${STORAGE_URL}/logo-wide.jpg)`,
              backgroundSize: `${cols * 100}% ${rows * 100}%`,
              backgroundPosition: `${x}% ${y}%`,
              transitionDelay: `${piece.delay}ms`,
            }}
          />
        );
      })}
    </div>
  );
};

export default BackgroundLogo;
