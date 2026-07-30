import { useNavigate } from "react-router-dom";

const BackButton = () => {
  const navigate = useNavigate();
  return (
    <button
      onClick={() => navigate("/")}
      className="xl:hidden p-2 rounded-xl bg-slate-900/80 border border-slate-800 text-slate-300
      hover:text-amber-400 hover:border-slate-700 active:scale-95 transition-all duration-200
        flex items-center justify-center cursor-pointer shadow-sm"
      aria-label="Back to home"
    >
      <span className="text-lg leading-none">←</span>
    </button>
  );
};

export default BackButton;
