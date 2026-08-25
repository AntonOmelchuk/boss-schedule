const InfoBlock = ({ label, value }) => (
  <div className="bg-slate-900/70 border border-slate-800 rounded-xl p-2.5 overflow-hidden">
    <span className="text-base text-slate-300 uppercase tracking-wider block">
      {label}
    </span>

    <div className="overflow-x-auto scrollbar-none [&::-webkit-scrollbar]:hidden">
      <p className="text-amber-400 font-bold text-xs lg:text-sm mt-0.5 whitespace-nowrap">
        {value}
      </p>
    </div>
  </div>
);

export default InfoBlock;
