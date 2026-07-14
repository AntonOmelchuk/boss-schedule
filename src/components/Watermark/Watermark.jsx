import IRLogo from "../../assets/logo.png";

const Watermark = () => {
  return (
    <div
      data-screenshot-watermark="true"
      className="justify-center items-center ml-4 pl-4 border-l border-slate-800
        text-slate-500 text-[11px] tracking-wider uppercase font-semibold"
    >
      <div className="flex items-center gap-1.5 opacity-80">
        <span>Designed by</span>
        <span className="text-amber-400 font-bold tracking-widest">
          Iron Gates
        </span>
        <img
          src={IRLogo}
          alt="Iron Gates Logo"
          className="w-6 h-6 object-contain rounded-full filter drop-shadow-[0_0_8px_rgba(99,102,241,0.5)] mr-4"
        />
      </div>
    </div>
  );
};

export default Watermark;
