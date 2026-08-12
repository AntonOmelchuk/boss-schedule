const HeaderInfoItem = ({ title, value }) => {
  return (
    <div className="bg-slate-950/80 border border-slate-800 px-3 py-1.5 rounded-xl flex items-center gap-2">
      <span className="text-slate-400 text-sm min-[1800px]:text-base">
        {title}:
      </span>
      <strong className="text-amber-400 font-mono font-bold text-sm min-[1800px]:text-base">
        {value}
      </strong>
    </div>
  );
};

export default HeaderInfoItem;
