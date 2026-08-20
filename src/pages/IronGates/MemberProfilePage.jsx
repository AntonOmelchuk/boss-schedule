import React, { useMemo, useState } from "react";

import fergiImage from "../../assets/ig-avatars/fergi.png";
import lapestoImage from "../../assets/ig-avatars/Lapesto.png";
import manolImage from "../../assets/ig-avatars/Manol.png";
import shrekImage from "../../assets/ig-avatars/shrek.png";
import spektraImage from "../../assets/ig-avatars/spektra.png";
import tobeImage from "../../assets/ig-avatars/tobe.png";
import tomImage from "../../assets/ig-avatars/Tom.png";
import vryoImage from "../../assets/ig-avatars/Vryo.png";
import winsonImage from "../../assets/ig-avatars/Winson.png";
import zukkaImage from "../../assets/ig-avatars/Zukka.png";

// 🟢 1. Ізольований компонент для стабільних іскрів
const MagicSparks = React.memo(() => {
  const sparks = useMemo(() => [...Array(25)], []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
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

// 🟢 2. Повна база даних учасників CP
const MEMBERS_DATA = [
  {
    id: "tobe",
    char_name: "TOBE",
    role: "ADMIN",
    cp_name: "IronGates CP",
    mainClass: "Bishop (Бішоп)",
    subClasses: ["Necromancer", "Treasure Hunter", "Shillien Knight"],
    server: "Reborn x10",
    status: "ONLINE",
    image: tobeImage,
    gear: [
      { name: "DC Robe Set +6", type: "Armor", icon: "🛡️" },
      { name: "TT Set +5", type: "Jewels", icon: "💍" },
      { name: "Zaken Earring +5", type: "Epic Jewel", icon: "💎" },
    ],
    stats: { pvp: "1,482", pk: "12" },
  },
  {
    id: "fergi",
    char_name: "Fergi",
    role: "MEMBER",
    cp_name: "IronGates CP",
    mainClass: "Spellsinger",
    subClasses: ["Elemental Summoner", "Prophet"],
    server: "Reborn x10",
    status: "ONLINE",
    image: fergiImage,
    gear: [
      { name: "DC Robe Set +6", type: "Armor", icon: "🛡️" },
      { name: "TT Set +4", type: "Jewels", icon: "💍" },
      { name: "Baium Ring +3", type: "Epic Jewel", icon: "💍" },
    ],
    stats: { pvp: "920", pk: "3" },
  },
  {
    id: "lapesto",
    char_name: "Lapesto",
    role: "MEMBER",
    cp_name: "IronGates CP",
    mainClass: "Ghost Hunter",
    subClasses: ["Dreadnought", "Duelist"],
    server: "Reborn x10",
    status: "AFK",
    image: lapestoImage,
    gear: [
      { name: "Draconic Leather +6", type: "Armor", icon: "🛡️" },
      { name: "TT Set +6", type: "Jewels", icon: "💍" },
      { name: "Antharas Earring", type: "Epic Jewel", icon: "💎" },
    ],
    stats: { pvp: "2,150", pk: "45" },
  },
  {
    id: "manol",
    char_name: "Manol",
    role: "MEMBER",
    cp_name: "IronGates CP",
    mainClass: "Spectral Dancer",
    subClasses: ["Abyss Walker", "Plain Walker"],
    server: "Reborn x10",
    status: "ONLINE",
    image: manolImage,
    gear: [
      { name: "Majestic Leather +6", type: "Armor", icon: "🛡️" },
      { name: "TT Set +5", type: "Jewels", icon: "💍" },
      { name: "Zaken Earring", type: "Epic Jewel", icon: "💎" },
    ],
    stats: { pvp: "810", pk: "5" },
  },
  {
    id: "shrek",
    char_name: "Shrek",
    role: "MEMBER",
    cp_name: "IronGates CP",
    mainClass: "Titan",
    subClasses: ["Destroyer", "Grand Khavatari"],
    server: "Reborn x10",
    status: "OFFLINE",
    image: shrekImage,
    gear: [
      { name: "Tallum Heavy +6", type: "Armor", icon: "🛡️" },
      { name: "Boss Set +5", type: "Jewels", icon: "💍" },
      { name: "Frintezza Necklace", type: "Epic Jewel", icon: "💎" },
    ],
    stats: { pvp: "3,400", pk: "120" },
  },
  {
    id: "spektra",
    char_name: "Spektra",
    role: "MEMBER",
    cp_name: "IronGates CP",
    mainClass: "Storm Screamer",
    subClasses: ["Spellhowler", "Overlord"],
    server: "Reborn x10",
    status: "ONLINE",
    image: spektraImage,
    gear: [
      { name: "Dark Crystal Robe", type: "Armor", icon: "🛡️" },
      { name: "Majestic Set", type: "Jewels", icon: "💍" },
      { name: "Core Ring", type: "Epic Jewel", icon: "💎" },
    ],
    stats: { pvp: "1,120", pk: "8" },
  },
  {
    id: "tom",
    char_name: "Tom",
    role: "MEMBER",
    cp_name: "IronGates CP",
    mainClass: "Adventurer",
    subClasses: ["Treasure Hunter", "Hawkeye"],
    server: "Reborn x10",
    status: "ONLINE",
    image: tomImage,
    gear: [
      { name: "Draconic Leather", type: "Armor", icon: "🛡️" },
      { name: "TT Set", type: "Jewels", icon: "💍" },
      { name: "Orfen Earring", type: "Epic Jewel", icon: "💎" },
    ],
    stats: { pvp: "1,650", pk: "22" },
  },
  {
    id: "vryo",
    char_name: "Vryo",
    role: "MEMBER",
    cp_name: "IronGates CP",
    mainClass: "Cardinal",
    subClasses: ["Hierophant", "Evas Saint"],
    server: "Reborn x10",
    status: "ONLINE",
    image: vryoImage,
    gear: [
      { name: "Major Arcana Robe", type: "Armor", icon: "🛡️" },
      { name: "TT Set", type: "Jewels", icon: "💍" },
      { name: "Valakas Necklace", type: "Epic Jewel", icon: "💎" },
    ],
    stats: { pvp: "450", pk: "1" },
  },
  {
    id: "winson",
    char_name: "Winson",
    role: "MEMBER",
    cp_name: "IronGates CP",
    mainClass: "Doombringer",
    subClasses: ["Trickster", "Judicator"],
    server: "Reborn x10",
    status: "OFFLINE",
    image: winsonImage,
    gear: [
      { name: "Moirai Heavy", type: "Armor", icon: "🛡️" },
      { name: "Vorpal Set", type: "Jewels", icon: "💍" },
      { name: "Beoria Ring", type: "Epic Jewel", icon: "💎" },
    ],
    stats: { pvp: "1,230", pk: "15" },
  },
  {
    id: "zukka",
    char_name: "Zukka",
    role: "MEMBER",
    cp_name: "IronGates CP",
    mainClass: "Shillien Elder",
    subClasses: ["Blade Dancer", "Warsmith"],
    server: "Reborn x10",
    status: "ONLINE",
    image: zukkaImage,
    gear: [
      { name: "Dark Crystal Robe", type: "Armor", icon: "🛡️" },
      { name: "TT Set", type: "Jewels", icon: "💍" },
      { name: "Blessed Ring", type: "Epic Jewel", icon: "💎" },
    ],
    stats: { pvp: "670", pk: "4" },
  },
];

// 🟢 3. Головна сторінка
const MemberProfilePage = () => {
  const [selectedId, setSelectedId] = useState("tobe");
  const member =
    MEMBERS_DATA.find((m) => m.id === selectedId) || MEMBERS_DATA[0];

  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [cursorTrail, setCursorTrail] = useState([]);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMousePos({ x, y });

    if (Math.random() > 0.7) {
      setCursorTrail((prev) => [
        ...prev.slice(-12),
        { id: Date.now() + Math.random(), x: e.clientX, y: e.clientY },
      ]);
    }
  };

  const handleMouseLeave = () => {
    setMousePos({ x: 0, y: 0 });
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="min-h-screen flex flex-col items-center justify-center p-4 overflow-x-hidden relative
        bg-slate-950 select-none"
    >
      {/* 🌌 Ефект туману на бекграунді */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0 opacity-40">
        <div
          className="absolute w-[800px] h-[800px] bg-gradient-to-tr from-purple-900/30 via-indigo-950/20
          to-transparent rounded-full blur-[160px] animate-[pulse_8s_ease-in-out_infinite]"
        />
        <div
          className="absolute -bottom-20 -left-20 w-[600px] h-[600px] bg-gradient-to-br from-amber-600/10
          via-purple-900/20 to-transparent rounded-full blur-[140px] animate-[pulse_10s_ease-in-out_infinite]"
        />
      </div>

      {/* ✨ Зоряне небо */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        {[...Array(40)].map((_, i) => (
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

      <MagicSparks />

      {/* ⭐ Шлейф за курсором */}
      {cursorTrail.map((dot) => (
        <div
          key={dot.id}
          className="absolute w-1.5 h-1.5 bg-cyan-300 rounded-full pointer-events-none z-50 animate-ping
            shadow-[0_0_8px_#22d3ee]"
          style={{ top: dot.y - 3, left: dot.x - 3 }}
        />
      ))}

      {/* 🎮 Список карток-аватарок (вибір учасника CP) */}
      <div
        className="relative z-20 mb-8 w-full max-w-4xl flex items-center justify-center gap-2 overflow-x-auto py-2
        px-4 bg-slate-900/60 border border-amber-500/20 rounded-2xl backdrop-blur-xl"
      >
        {MEMBERS_DATA.map((m) => (
          <button
            key={m.id}
            onClick={() => setSelectedId(m.id)}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-xl transition cursor-pointer shrink-0 ${
              selectedId === m.id
                ? "bg-amber-500 text-slate-950 font-bold shadow-[0_0_15px_rgba(245,158,11,0.5)] scale-105"
                : "bg-slate-800/80 text-slate-300 hover:bg-slate-700 hover:text-white"
            }`}
          >
            <img
              src={m.image}
              alt={m.char_name}
              className="w-6 h-6 rounded-md object-cover border border-amber-400/40"
            />
            <span className="text-xs uppercase tracking-wider">
              {m.char_name}
            </span>
          </button>
        ))}
      </div>

      {/* Головна детальна картка героя з 3D-паралаксом */}
      <div
        style={{
          transform: `perspective(1000px) rotateY(${mousePos.x * 12}deg) rotateX(${-mousePos.y * 12}deg)`,
          transition: "transform 0.1s ease-out",
        }}
        className="relative z-10 w-full max-w-4xl bg-slate-950/85 border border-amber-500/30 rounded-3xl
          p-8 shadow-[0_0_60px_rgba(245,158,11,0.15)] backdrop-blur-2xl grid grid-cols-1 md:grid-cols-12 gap-8
          items-center"
      >
        {/* Ліва колонка: Портрет персонажа */}
        <div className="md:col-span-5 relative flex justify-center group">
          <div
            className="absolute inset-0 rounded-full border border-dashed border-amber-500/40
            animate-[spin_25s_linear_infinite]"
          />

          <div
            className="relative w-72 h-72 rounded-2xl overflow-hidden border-2 border-amber-400/60
            shadow-[0_0_35px_rgba(251,191,36,0.3)] group-hover:scale-102 transition duration-500"
          >
            <img
              src={member.image}
              alt={member.char_name}
              className="w-full h-full object-cover filter contrast-110"
            />
            <div
              className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent
              to-transparent opacity-70"
            />

            <div className="absolute bottom-3 left-3 right-3 text-center">
              <span
                className="px-3 py-1 bg-amber-950/80 border border-amber-500/50 text-amber-300
                text-xs font-black uppercase tracking-widest rounded-full backdrop-blur-md"
              >
                {member.role}
              </span>
            </div>
          </div>
        </div>

        {/* Права колонка: Інформація */}
        <div className="md:col-span-7 space-y-5">
          <div>
            <div className="flex items-center space-x-2">
              <span
                className={`w-2 h-2 rounded-full ${
                  member.status === "ONLINE"
                    ? "bg-emerald-400"
                    : member.status === "AFK"
                      ? "bg-amber-400"
                      : "bg-rose-500"
                } animate-ping`}
              />
              <span className="text-xs uppercase tracking-widest text-emerald-400 font-semibold">
                {member.server} • {member.status}
              </span>
            </div>
            <h1
              className="text-4xl font-black text-white tracking-wider
              mt-1 drop-shadow-[0_2px_15px_rgba(251,191,36,0.3)]flex items-center gap-2"
            >
              {member.char_name}
              <span
                className="text-xs px-2 py-0.5 rounded bg-amber-500/20 border border-amber-500/40
                text-amber-300 font-normal"
              >
                ✨ Elite
              </span>
            </h1>
            <p className="text-slate-400 text-xs mt-1">
              Клан-група:{" "}
              <span className="text-amber-300 font-semibold">
                {member.cp_name}
              </span>
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="bg-slate-900/70 border border-slate-800 rounded-xl p-3">
              <span className="text-[10px] text-slate-500 uppercase tracking-wider">
                Основний клас
              </span>
              <p className="text-amber-400 font-bold text-sm mt-0.5">
                {member.mainClass}
              </p>
            </div>
            <div className="bg-slate-900/70 border border-slate-800 rounded-xl p-3">
              <span className="text-[10px] text-slate-500 uppercase tracking-wider">
                Сабкласи
              </span>
              <p className="text-slate-300 font-medium text-xs mt-1 truncate">
                {member.subClasses.join(", ")}
              </p>
            </div>
          </div>

          <div className="space-y-2">
            <span className="text-[10px] text-slate-500 uppercase tracking-wider">
              Екіпірування (Gear)
            </span>
            <div className="grid grid-cols-3 gap-2">
              {member.gear.map((item, index) => (
                <div
                  key={index}
                  className="bg-slate-900/50 border border-amber-500/20 rounded-lg p-2 text-center
                    hover:border-amber-500/50 transition"
                >
                  <span className="text-lg">{item.icon}</span>
                  <p className="text-[11px] font-bold text-white mt-1 truncate">
                    {item.name}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
            <span>
              PvP: <strong className="text-white">{member.stats.pvp}</strong>
            </span>
            <span>
              PK: <strong className="text-white">{member.stats.pk}</strong>
            </span>
            <button
              className="px-4 py-2 bg-gradient-to-r from-amber-600 to-yellow-600 hover:from-amber-500
              hover:to-yellow-500 text-slate-950 font-black text-xs uppercase tracking-wider rounded-xl
              shadow-[0_0_20px_rgba(245,158,11,0.3)] transition cursor-pointer active:scale-95"
            >
              Зброя / Стати
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MemberProfilePage;
