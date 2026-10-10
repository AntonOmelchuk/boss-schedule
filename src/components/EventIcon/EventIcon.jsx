/* eslint-disable max-len */
import { Shield, Sword } from "lucide-react";

import { EVENT_TYPES } from "../../constants/general";

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

  const bgColor = () => {
    if (
      name === EVENT_TYPES.MTB_FULL ||
      name === EVENT_TYPES.EBC_FULL ||
      name === EVENT_TYPES.CTB_FULL ||
      name === EVENT_TYPES.DM_FULL
    ) {
      return "";
    }

    return bossColor;
  };

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
        <Sword
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
        border: `2px solid ${bgColor()}`,
        backgroundColor: `${bgColor()}22`,
        width: `${size}px`,
        height: `${size}px`,
      }}
    >
      {renderIconContent()}
    </div>
  );
};

export default EventIcon;
