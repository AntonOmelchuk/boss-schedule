const BadgeOwner = ({ badgeClass, badgeIcon, owner, withoutBorder }) => {
  const cleanBadgeClass = withoutBorder
    ? badgeClass?.replace(/\bbg-\S+/g, "").replace(/\bborder-\S+/g, "")
    : badgeClass;

  const withoutBorderClasses = withoutBorder
    ? "px-0 py-0 text-[12px] bg-transparent border-none shadow-none"
    : "px-2 py-0.5 rounded-md border shadow-sm";

  return (
    <span
      className={`inline-flex items-center gap-1 text-[10px] font-black uppercase tracking-wider
        animate-pulse transition-all
        ${withoutBorderClasses} ${cleanBadgeClass}`}
    >
      {badgeIcon} {owner}
    </span>
  );
};

export default BadgeOwner;
