import { useEffect, useMemo, useRef, useState } from "react";

export default function SphereImageGrid({
  images = [],
  containerSize = 500,
  sphereRadius = 180,
  autoRotate = true,
  autoRotateSpeed = 2.1,
  baseImageScale = 0.21,
  perspective = 900,
  onImageClick,
}) {
  const containerRef = useRef(null);
  const [rotation, setRotation] = useState({ x: 25, y: 0, z: 15 });
  const [isDragging, setIsDragging] = useState(false);
  const velocityRef = useRef({ x: 0, y: 0 });
  const lastMousePos = useRef({ x: 0, y: 0 });
  const animationFrameId = useRef(null);
  const isHovered = useRef(false);

  // Обчислення стабільних координат точок на сфері за допомогою розподілу Фібоначчі
  const items = useMemo(() => {
    const count = images.length;
    const phi = (1 + Math.sqrt(5)) / 2; // Золотий перетин

    return images.map((img, i) => {
      const y = 1 - (i / (count - 1 || 1)) * 2; // від 1 до -1
      const radiusAtY = Math.sqrt(1 - y * y);
      const theta = (2 * Math.PI * i) / phi;

      const x = Math.cos(theta) * radiusAtY;
      const z = Math.sin(theta) * radiusAtY;

      return {
        ...img,
        x: x * sphereRadius,
        y: y * sphereRadius,
        z: z * sphereRadius,
      };
    });
  }, [images, sphereRadius]);

  // Анімація обертання та інерції
  useEffect(() => {
    const animate = () => {
      setRotation((prev) => {
        let newX = prev.x + velocityRef.current.x;
        let newY = prev.y + velocityRef.current.y;
        let newZ = prev.z;

        if (isDragging) {
          velocityRef.current.x *= 0.88;
          velocityRef.current.y *= 0.88;
        } else {
          velocityRef.current.x *= 0.85;
          velocityRef.current.y *= 0.85;

          // Автообертання
          if (
            autoRotate &&
            !isHovered.current &&
            Math.abs(velocityRef.current.y) < 0.001
          ) {
            newY += autoRotateSpeed * 0.1;
          }
        }

        return { x: newX, y: newY, z: newZ };
      });

      animationFrameId.current = requestAnimationFrame(animate);
    };

    animationFrameId.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrameId.current);
  }, [isDragging, autoRotate, autoRotateSpeed]);

  const handleMouseDown = (e) => {
    setIsDragging(true);
    lastMousePos.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    const deltaX = e.clientX - lastMousePos.current.x;
    const deltaY = e.clientY - lastMousePos.current.y;

    velocityRef.current = {
      x: -deltaY * 0.4,
      y: deltaX * 0.4,
    };

    setRotation((prev) => ({
      ...prev,
      x: prev.x - deltaY * 0.4,
      y: prev.y + deltaX * 0.4,
    }));

    lastMousePos.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  return (
    <div
      ref={containerRef}
      className="relative cursor-grab active:cursor-grabbing select-none flex items-center justify-center
        bg-transparent"
      style={{ width: containerSize, height: containerSize }}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={() => {
        handleMouseUp();
        isHovered.current = false;
      }}
      onMouseEnter={() => {
        isHovered.current = true;
      }}
    >
      {/* Магічне світіння на фоні */}
      <div
        className="absolute inset-0
        bg-[radial-gradient(circle_at_center,rgba(168,85,247,0.15)_0%,rgba(245,158,11,0.06)_40%,transparent_70%)]
        pointer-events-none rounded-full blur-xl"
      />

      {/* 3D Контейнер із перспективою */}
      <div
        className="absolute inset-0 flex items-center justify-center"
        style={{ perspective: `${perspective}px` }}
      >
        {/* Головний блок сфери, що обертається цілком */}
        <div
          className="absolute inset-0 flex items-center justify-center"
          style={{
            transformStyle: "preserve-3d",
            transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg) rotateZ(${rotation.z}deg)`,
          }}
        >
          {items.map((item) => {
            const size = containerSize * baseImageScale;

            // Розрахунок прозорості та z-index на основі координати Z для ефекту глибини
            const normalizedZ = (item.z + sphereRadius) / (sphereRadius * 2);
            const opacity = Math.max(0.3, normalizedZ);
            const zIndex = Math.round(item.z + sphereRadius);

            return (
              <div
                key={item.id}
                className="absolute group cursor-pointer"
                style={{
                  transformStyle: "preserve-3d",
                  transform: `translate3d(${item.x}px, ${item.y}px, ${item.z}px)`,
                  zIndex: zIndex,
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  if (onImageClick) onImageClick(item);
                }}
              >
                {/* Компенсація повороту, щоб аватарки завжди дивилися обличчям до користувача */}
                <div
                  className="transition-transform duration-75"
                  style={{
                    transformStyle: "preserve-3d",
                    transform: `rotateZ(${-rotation.z}deg) rotateY(${-rotation.y}deg) rotateX(${-rotation.x}deg)`,
                    opacity: opacity,
                  }}
                >
                  <div
                    className="relative rounded-full p-[2px] bg-gradient-to-tr from-amber-500 via-purple-500
                      to-indigo-500 shadow-[0_0_15px_rgba(245,158,11,0.3)]
                      group-hover:shadow-[0_0_25px_rgba(245,158,11,0.8)] group-hover:scale-110 transition-all"
                    style={{ width: size, height: size }}
                  >
                    <img
                      src={item.image}
                      alt={item.alt || "avatar"}
                      className="w-full h-full object-cover rounded-full border border-slate-950 bg-slate-900
                        pointer-events-none"
                    />

                    {/* Tooltip гравця */}
                    <div
                      className="absolute left-1/2 -translate-x-1/2 bottom-full mb-3 hidden group-hover:flex flex-col
                      items-center pointer-events-none z-50"
                    >
                      <div
                        className="bg-slate-950/95 text-xs text-amber-300 font-bold px-3.5 py-2 rounded-xl border
                        border-amber-500/40 shadow-[0_0_20px_rgba(0,0,0,0.8)] whitespace-nowrap backdrop-blur-md"
                      >
                        {item.title}
                        {item.description && (
                          <span className="block text-[10px] text-gray-300 font-medium mt-0.5">
                            {item.description}
                          </span>
                        )}
                      </div>
                      <div
                        className="w-2.5 h-2.5 bg-slate-950 rotate-45 -mt-1.5 border-r border-b
                        border-amber-500/40"
                      />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
