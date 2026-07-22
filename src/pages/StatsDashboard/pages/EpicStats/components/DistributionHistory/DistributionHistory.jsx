import useAppStore from "../../../../../../store/useAppStore";
import DistributionItem from "./DistributionItem";

const DistributionHistory = () => {
  const epicData = useAppStore((state) => state.epicData);

  return (
    <div
      className="bg-slate-900/30 backdrop-blur-md border border-slate-800
        rounded-2xl p-6 shadow-xl flex flex-col gap-4"
    >
      <h3 className="text-xl font-bold text-slate-100">
        CP Distribution Breakdown & History
      </h3>

      <div className="overflow-x-auto custom-scrollbar">
        <table className="w-full text-left text-xs text-slate-300">
          <thead className="text-[11px] uppercase bg-slate-800/60 text-slate-400 border-b border-slate-800">
            <tr>
              <th className="text-lg py-3 px-4">CP Name</th>
              <th className="text-lg py-3 px-4">Total Epics</th>
              <th className="text-lg py-3 px-4">Epic Breakdown</th>
              <th className="text-lg py-3 px-4">Last Share Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60">
            {epicData?.cp_distribution.map(
              ({
                cp_name,
                total_epics,
                epics_count_by_type,
                last_share_date,
              }) => (
                <DistributionItem
                  key={cp_name}
                  name={cp_name}
                  total={total_epics}
                  epicByType={epics_count_by_type}
                  lastShareDate={last_share_date}
                />
              ),
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DistributionHistory;
