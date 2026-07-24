import Tab from "../../../../../../components/UI/Tab";
import { SORT } from "../../../../../../utils/constants";

const SortTabs = ({ setSortBy, sortBy }) => {
  return (
    <div className="flex justify-between">
      <h3 className="text-xl font-bold text-slate-100">
        Epic Items Received per CP
      </h3>
      <div className="flex items-center gap-1 p-1 rounded-xl self-start sm:self-auto">
        <Tab
          onClickHandler={() => setSortBy(SORT.EPICS_COUNT)}
          isActive={sortBy === SORT.EPICS_COUNT}
          title="By Epic Amount"
          icon="🪎"
          className="px-2.5 py-1 text-xs font-semibold rounded-lg"
          activeClassName="bg-amber-500/20 text-amber-400 border border-amber-500/30"
          inactiveClassName="text-slate-400 hover:text-slate-200"
        />
        <Tab
          onClickHandler={() => setSortBy(SORT.VALUE_GB)}
          isActive={sortBy === SORT.VALUE_GB}
          title="By Value (GB)"
          icon="💎"
          className="px-2.5 py-1 text-xs font-semibold rounded-lg"
          activeClassName="bg-amber-500/20 text-amber-400 border border-amber-500/30"
          inactiveClassName="text-slate-400 hover:text-slate-200"
        />
        <Tab
          onClickHandler={() => setSortBy(SORT.RANDOM)}
          isActive={sortBy === SORT.RANDOM}
          title="Random"
          icon="🔀"
          className="px-2.5 py-1 text-xs font-semibold rounded-lg"
          activeClassName="bg-amber-500/20 text-amber-400 border border-amber-500/30"
          inactiveClassName="text-slate-400 hover:text-slate-200"
        />
      </div>
    </div>
  );
};

export default SortTabs;
