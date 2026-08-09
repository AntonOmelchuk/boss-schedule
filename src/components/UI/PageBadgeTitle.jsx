const PageBadgeTitle = ({ badgeText, title, subTitle, bgColor }) => {
  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center gap-2">
        <span
          className={`px-2.5 py-0.5 rounded-md text-[10px] font-black uppercase tracking-wider
            text-white shadow-sm shadow-red-900/50 ${bgColor}`}
        >
          {badgeText}
        </span>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-100 tracking-tight">
          {title}
        </h1>
      </div>
      <p className="max-md:mt-4 text-sm md:text-base text-slate-400">
        {subTitle}
      </p>
    </div>
  );
};

export default PageBadgeTitle;
