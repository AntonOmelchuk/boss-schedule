import { Handle, Position } from "@xyflow/react";
import { memo } from "react";

import { cn } from "../../../../utils/general";

const EnemyCardNode = ({ data, id }) => {
  return (
    <div
      className={cn(
        "w-120 h-39 bg-red-950/40 border border-red-500/50 rounded-xl p-3 shadow-[0_0_15px_rgba(239,68,68,0.2)]",
        "backdrop-blur-md text-white flex flex-col gap-2",
      )}
    >
      <div className="flex items-center justify-between">
        <span className="text-2xl font-bold text-red-400 uppercase tracking-widest">
          Target Priority
        </span>
        {data.onRemove && (
          <button
            onClick={() => data.onRemove(id)}
            className="text-red-400 hover:text-red-200 text-xs"
          >
            ✕
          </button>
        )}
      </div>

      <input
        type="text"
        defaultValue={data.label}
        className="w-full bg-black/60 border border-red-900 rounded px-2 py-1 text-2xl text-red-200
          focus:outline-none focus:border-red-500"
      />

      <Handle
        type="target"
        position={Position.Left}
        className="w-2 h-2 !bg-red-500 !border-none"
      />
    </div>
  );
};

export default memo(EnemyCardNode);
