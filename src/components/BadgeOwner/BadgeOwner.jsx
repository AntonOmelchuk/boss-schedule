const BadgeOwner = ({ badgeClass, badgeIcon, owner }) => {
  return (
    <span
      className={`inline-flex items-center gap-1 px-2 py-0.5
        rounded-md text-[10px] font-black uppercase tracking-wider
        border shadow-sm animate-pulse ${badgeClass}`}
    >
      {badgeIcon} {owner}
    </span>
  );
};

export default BadgeOwner;
