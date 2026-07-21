const SummaryCard = ({ title, subTitle }) => {
  return (
    <div className="bg-slate-900 border border-slate-800 p-5 rounded-xl">
      <p className="text-slate-400 text-sm font-medium">{title}</p>
      <p className="text-3xl font-bold text-emerald-400 mt-2 truncate">
        {subTitle}
      </p>
    </div>
  );
};

export default SummaryCard;
