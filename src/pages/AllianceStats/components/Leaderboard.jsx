const Leaderboard = ({ data }) => {
  return (
    <>
      <h3 className="text-2xl mb-6 font-semibold">Leaderboard</h3>
      <div
        className="bg-slate-900 rounded-xl border border-slate-800
        max-h-screen overflow-y-auto pr-2 space-y-2 custom-scrollbar"
      >
        {data.map((item, index) => (
          <div
            key={index}
            className="flex justify-between items-center p-4 border-b
                    border-slate-800 hover:bg-slate-800 transition"
          >
            <span className="font-medium text-slate-300">
              {index + 1}. {item.cp_name}
            </span>
            <span className="bg-indigo-900/30 text-indigo-300 px-3 py-1 rounded-full font-bold text-sm">
              {item.points} pts
            </span>
          </div>
        ))}
      </div>
    </>
  );
};

export default Leaderboard;
