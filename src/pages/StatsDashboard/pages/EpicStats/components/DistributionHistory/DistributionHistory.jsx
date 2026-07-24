import useMediaQuery from "../../../../../../hooks/useMediaQuery";
import useAppStore from "../../../../../../store/useAppStore";
import { BREAKPOINTS } from "../../../../../../utils/constants";
import DistributionItem from "./DistributionItem";
import TableHeaderItem from "./TableHeaderItem";

const DistributionHistory = () => {
  const epicData = useAppStore((state) => state.epicData);

  const isDesktop = useMediaQuery(BREAKPOINTS.IS_DESKTOP);

  return (
    <div
      className="bg-slate-900/30 backdrop-blur-md border border-slate-800
        rounded-2xl p-6 shadow-xl flex flex-col gap-4"
    >
      <h3 className="text-sm md:text-xl font-bold text-slate-100">
        CP Distribution Breakdown & History
      </h3>

      <div className="overflow-x-auto overflow-y-auto max-h-200 custom-scrollbar rounded-xl border border-slate-800/60">
        <table className="w-full text-left text-xs text-slate-300">
          <thead className="text-[11px] uppercase bg-slate-800/60 text-slate-400 border-b border-slate-800">
            <tr>
              <TableHeaderItem title="CP Name" />
              <TableHeaderItem title="Total Epics" />
              <TableHeaderItem title="Epic Breakdown" />
              {isDesktop && <TableHeaderItem title="Last Share Date" />}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-500/30 xl:divide-slate-800/60">
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
