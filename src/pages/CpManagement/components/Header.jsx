import Button from "../../../components/UI/Button";
import { PARTY_TYPES_LIST } from "../../../constants/partyTypes";
import useTranslation from "../../../hooks/useTranslation";
import HeaderInfoItem from "./HeaderInfoItem";
import TypeCountItem from "./TypeCountItem";

const Header = ({ totalAllianceStats, handleAddClan, canEdit }) => {
  const { t } = useTranslation();
  const { totalClans, totalCps, totalPlayers, partyTypesCount } =
    totalAllianceStats;

  return (
    <div className="flex flex-col gap-5 w-full">
      <div className="flex flex-wrap items-center gap-3 pt-3">
        {/* Core Stats Counters */}
        <div className="flex flex-wrap items-center gap-2.5">
          <HeaderInfoItem title={t.cps.totalClans} value={totalClans} />
          <HeaderInfoItem title={t.cps.totalCps} value={totalCps} />
          <HeaderInfoItem title={t.cps.totalPlayers} value={totalPlayers} />
        </div>

        {/* Party Types Archetype Badges */}
        <div className="flex flex-wrap items-center gap-1.5">
          {PARTY_TYPES_LIST.map(({ id, label, badgeBg, icon }) => {
            const count = partyTypesCount?.[id] || 0;
            if (count === 0) return null;

            return (
              <TypeCountItem
                key={id}
                label={label}
                count={count}
                badgeBg={badgeBg}
                icon={icon}
              />
            );
          })}
        </div>
        {canEdit && (
          <Button
            onClick={handleAddClan}
            className="bg-amber-500 text-slate-950 ml-auto"
          >
            <span className="text-sm">+ {t.cps?.addClanBtn}</span>
          </Button>
        )}
      </div>
    </div>
  );
};

export default Header;
