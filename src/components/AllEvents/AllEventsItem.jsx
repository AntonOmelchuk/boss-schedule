const AllEventsItem = ({ icon, name, spawnDate }) => {
  return (
    <div
      className="bg-slate-800 rounded-lg p-4 border border-slate-700 flex items-center
      shadow-lg hover:border-slate-500 transition-colors"
    >
      <div className="text-4xl mr-4 bg-slate-900 p-2 rounded">{icon}</div>
      <div className="flex-1 overflow-hidden">
        <div className="font-bold text-lg text-slate-100 truncate capitalize">
          {name}
        </div>
        <div className="text-xs text-slate-400 mb-1">{spawnDate}</div>
      </div>
    </div>
  );
};

export default AllEventsItem;
