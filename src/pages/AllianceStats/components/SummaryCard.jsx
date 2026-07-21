const SummaryCard = ({ title, subTitle }) => {
  return (
    <div className="border bg-slate-900/30 border-slate-700 p-5 rounded-xl">
      <p className="text-slate-400 text-sm font-medium">{title}</p>
      <p className="text-3xl font-bold text-emerald-400 mt-2 truncate">
        {subTitle}
      </p>
    </div>
  );
};

export default SummaryCard;
