import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <span className="text-6xl mb-4">🔮</span>
      <h1 className="text-3xl font-black uppercase tracking-widest text-red-400">
        404 - Lost in Fog
      </h1>
      <p className="text-xs text-slate-500 uppercase tracking-wider mt-2 mb-6">
        The chronicle you requested is missing.
      </p>
      <Link
        to="/"
        className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-xs font-black uppercase
          tracking-widest text-slate-100 rounded-xl border border-indigo-500/40"
      >
        Return to Main Page
      </Link>
    </div>
  );
};

export default NotFound;
