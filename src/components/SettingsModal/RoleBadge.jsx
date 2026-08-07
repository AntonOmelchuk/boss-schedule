import { ROLE_BADGE_CONFIG, ROLES } from "../../constants/roles";

const RoleBadge = ({ role = ROLES.MEMBER, showIcon = true, size = "md" }) => {
  const config = ROLE_BADGE_CONFIG[role] || ROLE_BADGE_CONFIG[ROLES.MEMBER];

  const sizeClasses =
    size === "sm" ? "px-1.5 py-0.2 text-[9px]" : "px-2 py-0.5 text-[10px]";

  return (
    <span
      className={`inline-flex items-center gap-1 font-mono font-bold border rounded uppercase
        ${sizeClasses} ${config.className}`}
    >
      {showIcon && <span>{config.icon}</span>}
      <span>{config.label}</span>
    </span>
  );
};

export default RoleBadge;
