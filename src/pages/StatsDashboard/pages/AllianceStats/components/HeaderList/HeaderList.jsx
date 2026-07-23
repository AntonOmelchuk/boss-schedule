const HeaderList = ({ icon, title, text }) => {
  return (
    <div className="flex items-center justify-between border-b border-slate-800 pb-3">
      <div>
        <h3 className="text-sm md:text-lg font-bold text-slate-100 flex items-center gap-2">
          <span>{icon}</span> {title}
        </h3>
        <p className="text-xs text-slate-400">{text}</p>
      </div>
    </div>
  );
};

export default HeaderList;
