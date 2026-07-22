const Loader = ({ title }) => {
  return (
    <div className="flex justify-center items-center min-h-screen text-slate-400">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      <span className="ml-3 text-lg font-medium">{title}</span>
    </div>
  );
};

export default Loader;
