import { useEffect, useMemo, useState } from "react";

import Loader from "../../components/UI/Loader";
import PageBadgeTitle from "../../components/UI/PageBadgeTitle";
import { PARTY_TYPES_LIST } from "../../constants/partyTypes";
import { ROLES } from "../../constants/roles";
import useTranslation from "../../hooks/useTranslation";
import useAuthStore from "../../store/useAuthStore";
import useCPStore from "../../store/useCPStore";
import AmountBadge from "./components/AmountBadge";
import ClanCrest from "./components/ClanCrest";
import CpCard from "./components/CPCard";
import Header from "./components/Header";
import TypeCountItem from "./components/TypeCountItem";

const UNASSIGNED_KEY = "unassigned";

const ALLOWED_EDIT_ROLES = [
  ROLES.ADMIN,
  ROLES.CO_ADMIN,
  ROLES.ALLY_HEAD,
  ROLES.ALLY_GENERAL,
];

const CpManagementPage = () => {
  const { t } = useTranslation();
  const { user } = useAuthStore();

  const canEdit = ALLOWED_EDIT_ROLES.includes(user?.role);

  const {
    cpList,
    clansMap,
    cpMetaMap,
    isLoading,
    initCpData,
    updateCpClan,
    updateCpMeta,
    addClan,
    deleteClan,
  } = useCPStore();

  const [draggedCp, setDraggedCp] = useState(null);

  useEffect(() => {
    const cleanup = initCpData();
    return () => cleanup && cleanup();
  }, [initCpData]);

  // Group CPs into Clan Columns + Calculate Breakdown Per Clan
  const clanColumns = useMemo(() => {
    const columns = {
      [UNASSIGNED_KEY]: {
        id: UNASSIGNED_KEY,
        name: t.cps.unassignedClan,
        crest: null,
        allyCrest: null,
        cps: [],
      },
    };

    Object.entries(clansMap).forEach(([id, clan]) => {
      columns[id] = {
        id,
        name: clan.name || id,
        crest: clan.crest || null,
        allyCrest: clan.allyCrest || null,
        cps: [],
      };
    });

    cpList.forEach((cpName) => {
      const meta = cpMetaMap[cpName] || {};
      const clanId =
        meta.clan_id && columns[meta.clan_id] ? meta.clan_id : UNASSIGNED_KEY;
      columns[clanId].cps.push(cpName);
    });

    // Calculate per-column stats (players count and party types breakdown)
    Object.values(columns).forEach((column) => {
      let playersCount = 0;
      const typesCount = {};

      column.cps.forEach((cpName) => {
        const meta = cpMetaMap[cpName] || {};
        playersCount += meta.members_count ?? 9;

        const type = meta.party_type || "SUPPORT";
        typesCount[type] = (typesCount[type] || 0) + 1;
      });

      column.playersCount = playersCount;
      column.partyTypesCount = typesCount;
    });

    return columns;
  }, [cpList, clansMap, cpMetaMap, t]);

  // Calculate Alliance Totals
  const totalAllianceStats = useMemo(() => {
    let totalPlayers = 0;

    const partyTypesCount = PARTY_TYPES_LIST.reduce((acc, pt) => {
      acc[pt.id] = 0;
      return acc;
    }, {});

    cpList.forEach((cp) => {
      totalPlayers += cpMetaMap[cp]?.members_count ?? 9;

      const type = cpMetaMap[cp]?.party_type || "SUPPORT";
      if (partyTypesCount[type] !== undefined) {
        partyTypesCount[type] += 1;
      } else {
        partyTypesCount["SUPPORT"] += 1;
      }
    });

    return {
      totalClans: Object.keys(clansMap).length,
      totalCps: cpList.length,
      totalPlayers,
      partyTypesCount,
    };
  }, [cpList, clansMap, cpMetaMap]);

  // Drag and Drop Event Handlers
  const handleDragStart = (e, cpName) => {
    if (!canEdit) return;
    setDraggedCp(cpName);
    e.dataTransfer.setData("text/plain", cpName);
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragOver = (e) => {
    if (!canEdit) return;
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };

  const handleDrop = async (e, targetClanId) => {
    if (!canEdit) return;
    e.preventDefault();
    const cpName = e.dataTransfer.getData("text/plain") || draggedCp;
    if (!cpName) return;

    await updateCpClan(cpName, targetClanId);
    setDraggedCp(null);
  };

  const handleAddClanPrompt = () => {
    if (!canEdit) return;
    const clanName = prompt(t.cps.addClanPrompt);
    if (clanName) addClan(clanName);
  };

  const handleDeleteClanConfirm = (clanId) => {
    if (!canEdit) return;
    if (confirm(t.cps.deleteClanConfirm)) deleteClan(clanId);
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="space-y-5 py-4">
      <PageBadgeTitle
        badgeText={t.cps.badge}
        title={t.cps.pageTitle}
        subTitle={t.cps.pageDescription}
        bgColor="bg-red-600"
      />
      {/* Top Bar: Stats & Controls */}
      <div
        className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex flex-col md:flex-row
        md:items-center justify-between gap-4 shadow-xl"
      >
        <Header
          totalAllianceStats={totalAllianceStats}
          handleAddClan={handleAddClanPrompt}
          canEdit={canEdit}
        />
      </div>

      {/* Kanban Board Layout */}
      <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-none min-h-[60vh] items-start">
        {Object.values(clanColumns).map((column) => {
          const {
            id,
            allyCrest,
            crest,
            name,
            cps,
            playersCount,
            partyTypesCount,
          } = column;

          const isUnassigned = id === UNASSIGNED_KEY;
          const hasCrests = Boolean(allyCrest || crest);

          return (
            <div
              key={id}
              onDragOver={canEdit ? handleDragOver : undefined}
              onDrop={canEdit ? (e) => handleDrop(e, id) : undefined}
              className={`shrink-0 bg-slate-900 border ${
                isUnassigned
                  ? "w-80 sm:w-135 md:w-180 border-slate-800/80 bg-slate-950/40"
                  : "w-72 min-[2300px]:w-135 border-slate-800"
              } rounded-2xl p-3.5 space-y-3 flex flex-col shadow-xl min-h-55 transition-all`}
            >
              {/* Column Header Main */}
              <div className="flex items-center justify-between border-b border-slate-800/80 pb-2 px-1">
                <div className="flex items-center gap-2 min-w-0">
                  {hasCrests ? (
                    <ClanCrest allyCrest={allyCrest} crest={crest} />
                  ) : (
                    <span className="text-sm shrink-0">
                      {isUnassigned ? "📦" : "🏰"}
                    </span>
                  )}
                  <h3 className="font-bold text-base text-white truncate">
                    {name}
                  </h3>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <AmountBadge
                    cpsCount={cps.length}
                    playersCount={playersCount}
                  />

                  {!isUnassigned && canEdit && (
                    <button
                      onClick={() => handleDeleteClanConfirm(id)}
                      className="text-slate-500 hover:text-red-400 text-xs transition cursor-pointer p-0.5"
                    >
                      ✕
                    </button>
                  )}
                </div>
              </div>

              {/* Column Party Types Breakdown Bar */}
              {cps.length > 0 && (
                <div className="flex flex-wrap items-center gap-1.5 px-1 pt-0.5 pb-1">
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
              )}

              {/* Cards Container */}
              <div
                className={`flex-1 items-start ${
                  isUnassigned
                    ? "grid grid-cols-1 sm:grid-cols-2 min-[1800px]:grid-cols-3 gap-2.5"
                    : "space-y-2.5 min-[2300px]:space-y-0 min-[2300px]:grid min-[2300px]:grid-cols-2 min-[2300px]:gap-2"
                }`}
              >
                {column.cps.length > 0 ? (
                  column.cps.map((cpName) => (
                    <CpCard
                      key={cpName}
                      cpName={cpName}
                      cpData={cpMetaMap[cpName] || {}}
                      onUpdateMeta={updateCpMeta}
                      onDragStart={handleDragStart}
                      canEdit={canEdit}
                    />
                  ))
                ) : (
                  <div
                    className="col-span-full h-28 border-2 border-dashed border-slate-800/60 rounded-xl flex
                      items-center justify-center text-xs text-slate-500"
                  >
                    {t.cps.noCpsInClan}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CpManagementPage;
