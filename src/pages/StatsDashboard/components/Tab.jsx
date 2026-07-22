const Tab = ({ onClickHandler, isActive, title }) => {
  return (
    <button
      onClick={onClickHandler}
      className={`px-4 py-2 rounded-xl text-lg font-bold cursor-pointer transition ${
        isActive
          ? "bg-sky-500/40 text-sky-100 border border-sky-500/30"
          : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/50"
      }`}
    >
      {title}
    </button>
  );
};

export default Tab;
