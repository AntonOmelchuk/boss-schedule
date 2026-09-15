import { Handle, Position } from "@xyflow/react";
import { memo } from "react";

import Input from "../../../../components/UI/Input";
import { GVG_ROLES } from "../../../../constants/members";
import useGvGStore from "../../../../store/useGvGStore";
import { cn } from "../../../../utils/general";

const MemberCardNode = ({ data, id }) => {
  const { updateNodeData, removeNode } = useGvGStore();

  const handleClassChange = (e) => {
    updateNodeData(id, { class: e.target.value });
  };

  const handleAssignmentsChange = (e) => {
    updateNodeData(id, { assignments: e.target.value });
  };

  const handleDeleteNode = () => {
    removeNode(id);
  };

  const currentClass = data.class || "";
  const isHealer =
    currentClass.toLowerCase().includes("cardinal") ||
    currentClass.toLowerCase().includes("bishop");

  return (
    <div
      className={cn(
        "w-120 bg-slate-900/95 border rounded-xl p-3 shadow-2xl backdrop-blur-md text-white flex flex-col gap-2",
        "relative overflow-hidden transition-all duration-300 group",
        isHealer
          ? "border-emerald-500/80 shadow-[0_0_20px_rgba(16,185,129,0.25)]"
          : "border-amber-500/40 shadow-xl",
      )}
    >
      {/* Кнопка видалення картки */}
      <button
        onClick={handleDeleteNode}
        className="absolute top-2 right-2 z-20 w-7 h-7 bg-red-500/20 hover:bg-red-500 text-red-300 hover:text-white
          border border-red-500/40 rounded-lg flex items-center justify-center text-xs transition-all cursor-pointer"
        title="Remove member"
      >
        ✕
      </button>

      {isHealer && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-20">
          <div className="absolute -top-4 -left-4 w-32 h-32 bg-emerald-500 rounded-full blur-3xl animate-pulse" />
          <div className="absolute top-2 right-10 text-emerald-400 font-bold text-xl animate-bounce">
            +
          </div>
          <div className="absolute bottom-2 left-10 text-emerald-300 font-bold text-lg animate-pulse">
            +
          </div>
        </div>
      )}

      <div className="flex items-center justify-between gap-3 relative z-10 pr-8">
        <div className="flex items-center gap-3">
          <div
            className={cn(
              "w-20 h-20 rounded-lg border flex items-center justify-center font-bold shrink-0 overflow-hidden",
              isHealer
                ? "bg-emerald-500/20 border-emerald-500/60 text-emerald-300 shadow-[0_0_10px_rgba(16,185,129,0.3)]"
                : "bg-amber-500/20 border-amber-500/50 text-amber-300",
            )}
          >
            <img
              src={data.image}
              className="w-20 h-20 rounded-2xl object-cover"
              alt={data.name}
            />
          </div>

          <div>
            <span className="text-3xl font-bold text-amber-400">
              {data.name}
            </span>
          </div>
        </div>

        {/* Class selector */}
        <div>
          <select
            value={currentClass}
            onChange={handleClassChange}
            className={cn(
              "bg-black/80 border rounded-lg px-3 py-1.5 text-xl font-semibold focus:outline-none cursor-pointer",
              "transition-colors",
              isHealer
                ? "border-emerald-500/60 text-emerald-400 focus:border-emerald-400"
                : "border-slate-700 text-amber-400 focus:border-amber-500",
            )}
          >
            {GVG_ROLES.map((value) => (
              <option key={value} value={value}>
                {value}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="mt-1 relative z-10">
        <Input
          type="text"
          value={data.assignments || ""}
          placeholder="Role/Assist (e.g. 1st DoD)"
          onChange={handleAssignmentsChange}
          className="text-xl text-amber-200"
        />
      </div>

      <Handle
        type="target"
        position={Position.Top}
        id="top-target"
        className="w-6! h-6! bg-emerald-400!"
      />
      <Handle
        type="source"
        position={Position.Top}
        id="top-source"
        className="w-6! h-6! bg-emerald-400!"
      />

      <Handle
        type="target"
        position={Position.Right}
        id="right-target"
        className="w-6! h-6! bg-emerald-400!"
      />
      <Handle
        type="source"
        position={Position.Right}
        id="right-source"
        className="w-6! h-6! bg-emerald-400!"
      />

      <Handle
        type="target"
        position={Position.Bottom}
        id="bottom-target"
        className="w-6! h-6! bg-emerald-400!"
      />
      <Handle
        type="source"
        position={Position.Bottom}
        id="bottom-source"
        className="w-6! h-6! bg-emerald-400!"
      />

      <Handle
        type="target"
        position={Position.Left}
        id="left-target"
        className="w-6! h-6! bg-emerald-400!"
      />
      <Handle
        type="source"
        position={Position.Left}
        id="left-source"
        className="w-6! h-6! bg-emerald-400!"
      />
    </div>
  );
};

export default memo(MemberCardNode);
