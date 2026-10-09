const Header = ({ Icon, title, subTitle }) => {
  return (
    <div>
      <h2 className="text-xl font-bold text-slate-100 tracking-wide flex items-center gap-2">
        {Icon} {title}
      </h2>
      <p className="text-lg text-slate-400 mt-1">{subTitle}</p>
    </div>
  );
};

export default Header;
