const Card = ({ title, value }) => {
  return (
    <div className="bg-slate-800/40 border border-slate-800 rounded-xl p-4">
      <span className="text-xs text-slate-400 uppercase font-semibold">
        {title}
      </span>
      <div className="text-3xl font-extrabold text-sky-400 mt-1">{value}</div>
    </div>
  );
};

export default Card;
