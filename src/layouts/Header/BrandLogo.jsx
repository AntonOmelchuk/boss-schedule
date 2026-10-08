import logo from "../../assets/ally-logo.png";

const BrandLogo = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-3 cursor-pointer hover:opacity-80"
    >
      <img
        src={logo}
        alt="The 3rd Side logo"
        className="w-10 h-10 object-contain rounded-full filter drop-shadow-[0_0_10px_rgba(245,158,11,0.3)]"
      />
      <div className="flex flex-col">
        <h1 className="text-sm text-amber-500 font-semibold tracking-wider uppercase">
          The 3rd Side
        </h1>
      </div>
    </button>
  );
};

export default BrandLogo;
