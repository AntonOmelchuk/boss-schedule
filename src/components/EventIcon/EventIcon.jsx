/* eslint-disable max-len */
import { Shield, Swords } from "lucide-react";

const EventIcon = ({
  size,
  icon,
  name,
  relation,
  bossColor,
  className = "w-14 h-14 md:w-20 md:h-20 text-3xl rounded-2xl border flex items-center justify-center shrink-0 shadow-inner bg-black/50",
}) => {
  const isDefense = relation === "alliance";
  const isAttack = relation === "enemy";

  const renderIconContent = () => {
    if (isDefense) {
      return (
        <Shield
          className="transition-transform duration-300 group-hover:scale-110"
          style={{ color: bossColor }}
          size="80%"
        />
      );
    }

    if (isAttack) {
      return (
        <Swords
          className="transition-transform duration-300 group-hover:scale-110"
          style={{ color: bossColor }}
          size="80%"
        />
      );
    }

    if (icon) {
      return icon.length <= 3 ? (
        icon
      ) : (
        <img
          src={icon}
          className="rounded-xl h-full w-full object-cover"
          alt={name || "event"}
        />
      );
    }
    return "⏳";
  };

  return (
    <div
      className={className}
      style={{
        border: `2px solid ${bossColor}`,
        backgroundColor: `${bossColor}22`,
        width: `${size}px`,
        height: `${size}px`,
      }}
    >
      {renderIconContent()}
    </div>
  );
};

export default EventIcon;
