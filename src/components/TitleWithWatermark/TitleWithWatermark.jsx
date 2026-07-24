import allyLogo from "../../assets/ally-logo.png";
import Watermark from "../Watermark/Watermark";

const TITLE_SIZES = {
  sm: {
    padding: "px-3 py-2",
    logo: "w-4 h-4 mr-2",
    title: "text-sm",
  },
  md: {
    padding: "px-5 py-4",
    logo: "w-6 h-6 mr-4",
    title: "text-lg",
  },
  lg: {
    padding: "px-6 py-5",
    logo: "w-8 h-8 mr-4",
    title: "text-2xl",
  },
  xl: {
    padding: "px-8 py-6",
    logo: "w-10 h-10 mr-5",
    title: "text-3xl",
  },
};

const TitleWithWatermark = ({
  title,
  className = "bg-slate-950/40",
  size = "md",
}) => {
  const currentSize = TITLE_SIZES[size] || TITLE_SIZES.md;

  return (
    <div
      className={`border-b border-slate-800/60 flex items-center justify-center ${currentSize.padding} ${className}`}
    >
      <img
        src={allyLogo}
        alt="The 3rd Side Logo"
        className={`${currentSize.logo} object-contain rounded-full filter drop-shadow-[0_0_8px_rgba(99,102,241,0.5)]`}
      />
      <h2
        className={`font-black tracking-widest text-indigo-100 uppercase font-mono ${currentSize.title}`}
      >
        {title}
      </h2>

      <Watermark size={size} />
    </div>
  );
};

export default TitleWithWatermark;
