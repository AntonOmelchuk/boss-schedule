const Header = () => {
  return (
    <div>
      <div className="flex items-center gap-2">
        <h2 className="text-xl font-bold text-slate-100 tracking-wide">
          Clan Treasury & Epic Boss Loot Distribution
        </h2>
        <span
          className="text-[10px] uppercase font-semibold px-2 py-0.5 rounded-full bg-amber-500/10
         text-amber-400 border border-amber-500/20"
        >
          Weekly Share Sync 💎
        </span>
      </div>
      <p className="text-xs text-slate-400 mt-1">
        Tracking alliance epic boss kills, treasury stock, and CP distribution
        priority
      </p>
    </div>
  );
};

export default Header;
