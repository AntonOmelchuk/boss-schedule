const Error = ({ title, onClickHandler }) => {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen text-red-400">
      <p className="text-xl font-bold mb-2">⚠️ Failed to load data</p>
      <p className="text-sm text-slate-400">{title}</p>
      <button
        onClick={onClickHandler}
        className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-500 transition"
      >
        Retry
      </button>
    </div>
  );
};

export default Error;
