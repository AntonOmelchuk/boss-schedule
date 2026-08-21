import { Handle, Position } from "@xyflow/react";
import { memo } from "react";

import useGvGStore from "../../../../store/useGvGStore";
import { cn } from "../../../../utils/general";

const MemberCardNode = ({ data, id }) => {
  const { nodes, connectNodesExplicitly } = useGvGStore();

  // Filter other nodes to pick a quick target for connection
  const availableTargets = nodes.filter((n) => n.id !== id);

  return (
    <div
      className={cn(
        "w-120 bg-slate-900/90 border border-amber-500/40 rounded-xl p-3 shadow-xl",
        "backdrop-blur-md text-white flex flex-col gap-2",
      )}
    >
      <div className="flex items-center gap-3">
        <div
          className="w-20 h-20 rounded-lg bg-amber-500/20 border border-amber-500/50 flex
          items-center justify-center font-bold text-amber-300"
        >
          <img
            src={data.image}
            className="w-20 h-20 rounded-2xl"
            alt={data.name}
          />
        </div>
        <div>
          <span className="text-3xl font-bold text-amber-400">{data.name}</span>
          <span className="text-xl font-bold text-slate-400 uppercase tracking-wider block">
            {data.class} • {data.role}
          </span>
        </div>
      </div>

      <div className="mt-1">
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
      <div className="flex items-center gap-2">
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

      <Handle
        type="target"
        position={Position.Left}
        className="w-2 h-2 !bg-amber-400 !border-none"
      />
      <Handle
        type="source"
        position={Position.Right}
        className="w-2 h-2 !bg-emerald-400 !border-none"
      />
    </div>
  );
};

export default memo(MemberCardNode);
