import { useState } from "react";

import fergiImage from "../../../assets/ig-avatars/fergi.png";
import lapestoImage from "../../../assets/ig-avatars/Lapesto.png";
import manolImage from "../../../assets/ig-avatars/Manol.png";
import shrekImage from "../../../assets/ig-avatars/shrek.png";
import spektraImage from "../../../assets/ig-avatars/spektra.png";
import tobeImage from "../../../assets/ig-avatars/tobe.png";
import tomImage from "../../../assets/ig-avatars/Tom.png";
import vryoImage from "../../../assets/ig-avatars/Vryo.png";
import winsonImage from "../../../assets/ig-avatars/Winson.png";
import zukkaImage from "../../../assets/ig-avatars/Zukka.png";
import useWindowSize from "../../../hooks/useWindowSize";
import MemberCard from "../components/Members/MemberCard";
import SkyStars from "../components/SkyStars";
import SphereImageGrid from "../components/SphereImageGrid";

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

const MemberModule = () => {
  const [selectedId, setSelectedId] = useState("tobe");

  const [, height] = useWindowSize();
  const member =
    MEMBERS_DATA.find((m) => m.id === selectedId) || MEMBERS_DATA[0];

  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMousePos({ x, y });
  };

  const handleMouseLeave = () => {
    setMousePos({ x: 0, y: 0 });
  };

  const {
    image,
    char_name,
    status,
    mainClass,
    subClasses,
    gear,
    stats: { pvp },
  } = member || {};

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="min-h-[calc(100vh-100px)] w-full flex flex-col lg:flex-row items-center justify-center
        p-8 lg:p-12 gap-10 overflow-hidden relative bg-slate-950 select-none"
    >
      {/* <MagicSparks /> */}
      <SkyStars />

      {/* 🌍 ЗЛІВА: 3D Сфера на повну висоту */}
      <div className="relative z-20 flex-1 w-full flex items-center justify-center">
        <div className="h-full flex items-center justify-center p-4">
          <SphereImageGrid
            images={MEMBERS_DATA.map((m) => ({
              ...m,
              title: m.char_name,
              description: m.mainClass,
            }))}
            containerSize={height / 2.2}
            sphereRadius={height / 3.6}
            baseImageScale={0.21}
            onImageClick={(item) => setSelectedId(item.id)}
          />
        </div>
      </div>

      <MemberCard
        x={mousePos.x}
        y={mousePos.y}
        image={image}
        name={char_name}
        status={status}
        mainClass={mainClass}
        subClasses={subClasses}
        gear={gear}
        pvp={pvp}
      />
    </div>
  );
};

export default MemberModule;
