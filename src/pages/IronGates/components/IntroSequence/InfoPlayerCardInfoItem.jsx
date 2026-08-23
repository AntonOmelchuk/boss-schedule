const InfoPlayerCardInfoItem = ({ title, value }) => {
  return (
    <div className="flex items-center gap-2">
      <span className="text-xs uppercase tracking-widest text-slate-400">
        {title}
      </span>
      <span
        className="text-lg font-bold text-white bg-slate-800/60 px-3 py-1 rounded-lg
          border border-slate-700"
      >
        {value}
      </span>
    </div>
  );
};

export default InfoPlayerCardInfoItem;
