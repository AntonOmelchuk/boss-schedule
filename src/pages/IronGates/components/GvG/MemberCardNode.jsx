import { Handle, Position } from "@xyflow/react";
import { memo } from "react";

import useGvGStore from "../../../../store/useGvGStore";
import { cn } from "../../../../utils/general";

const MemberCardNode = ({ data, id }) => {
  const { nodes, connectNodesExplicitly, updateNodeData } = useGvGStore();

  const availableTargets = nodes.filter((n) => n.id !== id);

  const handleRoleChange = (e) => {
    updateNodeData(id, { role: e.target.value });
  };

  const isHealer = data.role === "Healer";

  return (
    <div
      className={cn(
        "w-120 bg-slate-900/95 border rounded-xl p-3 shadow-2xl backdrop-blur-md text-white flex flex-col gap-2",
        "relative overflow-hidden transition-all duration-300",
        isHealer
          ? "border-emerald-500/80 shadow-[0_0_20px_rgba(16,185,129,0.25)]"
          : "border-amber-500/40 shadow-xl",
      )}
    >
      {isHealer && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-20">
          <div className="absolute -top-4 -left-4 w-32 h-32 bg-emerald-500 rounded-full blur-3xl animate-pulse" />
          <div className="absolute top-2 right-4 text-emerald-400 font-bold text-xl animate-bounce">
            {" "}
            +{" "}
          </div>
          <div className="absolute bottom-2 left-10 text-emerald-300 font-bold text-lg animate-pulse">
            {" "}
            +{" "}
          </div>
        </div>
      )}

      <div className="flex items-center justify-between gap-3 relative z-10">
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
            <span className="text-xl font-bold text-slate-400 uppercase tracking-wider block">
              {data.class}
            </span>
          </div>
        </div>

        {/* Role selector */}
        <div>
          <select
            value={data.role || "Damager"}
            onChange={handleRoleChange}
            className={cn(
              "bg-black/80 border rounded-lg px-3 py-1.5 text-lg font-semibold focus:outline-none cursor-pointer",
              "transition-colors",
              isHealer
                ? "border-emerald-500/60 text-emerald-400 focus:border-emerald-400"
                : "border-slate-700 text-amber-400 focus:border-amber-500",
            )}
          >
            <option value="Healer">Healer</option>
            <option value="Damager">Damager</option>
            <option value="Main Assist">Main Assist</option>
            <option value="Second Assist">Second Assist</option>
          </select>
        </div>
      </div>

      <div className="mt-1 relative z-10">
        <input
          type="text"
          defaultValue={data.assignments || ""}
          placeholder="Role/Assist (e.g. 1st DoD)"
          className="w-full bg-black/50 border border-slate-700 rounded px-2 py-1 text-2xl text-amber-200
            focus:outline-none focus:border-amber-500"
          onChange={(e) =>
            data.onChangeMeta && data.onChangeMeta(e.target.value)
          }
        />
      </div>

      {/* Quick connection dropdown */}
      <div className="flex items-center gap-2 relative z-10">
        <select
          onChange={(e) => {
            if (e.target.value) {
              connectNodesExplicitly(id, e.target.value);
              e.target.value = "";
            }
          }}
          defaultValue=""
          className="w-full bg-black/60 border border-slate-800 rounded px-2 py-1 text-2xl text-slate-300
            focus:outline-none focus:border-emerald-500 cursor-pointer"
        >
          <option value="" disabled>
            Link to target/support...
          </option>
          {availableTargets.map((target) => (
            <option key={target.id} value={target.id}>
              {target.data.name || target.data.label}
            </option>
          ))}
        </select>
      </div>

      {/* Handles on all 4 sides */}
      <Handle
        type="target"
        position={Position.Top}
        className="w-3 h-3 bg-amber-400!"
      />
      <Handle
        type="source"
        position={Position.Right}
        className="w-3 h-3 bg-emerald-400!"
      />
      <Handle
        type="target"
        position={Position.Bottom}
        className="w-3 h-3 bg-amber-400!"
      />
      <Handle
        type="target"
        position={Position.Left}
        className="w-3 h-3 bg-amber-400!"
      />
    </div>
  );
};

export default memo(MemberCardNode);
