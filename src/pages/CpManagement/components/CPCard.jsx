import { PARTY_TYPES, PARTY_TYPES_LIST } from "../../../constants/partyTypes";
import useTranslation from "../../../hooks/useTranslation";

const CpCard = ({
  cpName,
  cpData = {},
  onUpdateMeta,
  onDragStart,
  canEdit = false,
}) => {
  const { t } = useTranslation();

  const partyTypeKey = cpData.party_type || PARTY_TYPES.MAGES.id;
  const partyTypeConfig = PARTY_TYPES[partyTypeKey];
  const membersCount = cpData.members_count ?? 9;

  const handleTypeChange = (e) => {
    if (!canEdit) return;
    onUpdateMeta(cpName, { party_type: e.target.value });
  };

  const handleCountChange = (e) => {
    if (!canEdit) return;
    const val = parseInt(e.target.value, 10);
    onUpdateMeta(cpName, { members_count: isNaN(val) ? 0 : val });
  };

  return (
    <div
      draggable={canEdit}
      onDragStart={(e) => canEdit && onDragStart(e, cpName)}
      className={`p-3 rounded-xl border transition-all shadow-md space-y-2.5
        ${partyTypeConfig.cardBg}
        ${canEdit ? "cursor-grab active:cursor-grabbing" : "cursor-default"}`}
    >
      {/* Header: Name and Drag Indicator */}
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 min-w-0">
          <img
            src={partyTypeConfig.icon}
            alt={partyTypeKey}
            className="w-5 h-5"
          />
          <span className="font-bold text-base text-white truncate">
            {cpName}
          </span>
        </div>
        {canEdit && (
          <span className="text-slate-500 hover:text-slate-300 text-xs cursor-grab">
            ⣿
          </span>
        )}
      </div>

      {/* Controls: Type and Player Count */}
      <div className="grid grid-cols-2 gap-2 text-xs">
        {/* Party Type Select */}
        <div>
          <label className="block text-xs text-slate-400 uppercase font-semibold mb-0.5">
            {t.cps.partyType}
          </label>
          <select
            value={partyTypeKey}
            onChange={handleTypeChange}
            disabled={!canEdit}
            className="w-full bg-slate-950/80 border border-slate-800 rounded-lg px-2 py-1 text-xs text-slate-200
              focus:outline-none focus:border-amber-500 disabled:opacity-50 disabled:cursor-not-allowed
              enabled:cursor-pointer"
          >
            {PARTY_TYPES_LIST.map((pt) => (
              <option key={pt.id} value={pt.id}>
                {pt.label}
              </option>
            ))}
          </select>
        </div>

        {/* Members Count Input */}
        <div>
          <label className="block text-xs text-slate-400 uppercase font-semibold mb-0.5">
            {t.cps.members}
          </label>
          <input
            type="number"
            min="1"
            max="18"
            value={membersCount}
            onChange={handleCountChange}
            disabled={!canEdit}
            className="w-full bg-slate-950/80 border border-slate-800 rounded-lg px-2 py-1 text-xs text-amber-400
              font-bold font-mono focus:outline-none focus:border-amber-500 text-center
              disabled:opacity-50 disabled:cursor-not-allowed"
          />
        </div>
      </div>
    </div>
  );
};

export default CpCard;
