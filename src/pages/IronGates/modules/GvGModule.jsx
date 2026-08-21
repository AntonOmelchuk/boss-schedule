import "@xyflow/react/dist/style.css";

import { Background, Controls, ReactFlow } from "@xyflow/react";
import { useMemo } from "react";
import toast from "react-hot-toast";

import useTranslation from "../../../hooks/useTranslation";
import useGvGStore from "../../../store/useGvGStore";
import EnemyCardNode from "../components/GvG/EnemyCardNode";
import MemberCardNode from "../components/GvG/MemberCardNode";

const nodeTypes = {
  memberCard: MemberCardNode,
  enemyCard: EnemyCardNode,
};

const GvGModule = () => {
  const {
    nodes,
    edges,
    onNodesChange,
    onEdgesChange,
    onConnect,
    addEnemyTarget,
    removeNode,
  } = useGvGStore();
  const { t } = useTranslation();
  const { gvgPage } = t;

  const processedNodes = useMemo(() => {
    return nodes.map((node) => ({
      ...node,
      data: {
        ...node.data,
        onRemove: node.type === "enemyCard" ? removeNode : undefined,
      },
    }));
  }, [nodes, removeNode]);

  return (
    <div className="h-screen w-full bg-black text-white flex flex-col">
      {/* Верхня панель */}
      <header className="h-16 border-b border-amber-500/20 bg-slate-950/80 px-6 flex items-center justify-between z-10">
        <div>
          <h1 className="text-lg font-bold text-amber-400 tracking-wider uppercase">
            {gvgPage.title}
          </h1>
          <p className="text-xs text-slate-400">{gvgPage.subtitle}</p>
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={addEnemyTarget}
            className="px-4 py-2 bg-red-500/20 hover:bg-red-500/30 border border-red-500/40 rounded-lg
              text-red-300 text-xs uppercase tracking-widest transition-all"
          >
            {gvgPage.addEnemy}
          </button>
          <button
            onClick={() => toast("Save")}
            className="px-4 py-2 bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/40
              rounded-lg text-amber-300 text-xs uppercase tracking-widest transition-all"
          >
            {gvgPage.saveButton}
          </button>
        </div>
      </header>

      <div className="flex-1 w-full bg-gradient-to-b from-slate-950 to-black">
        <ReactFlow
          nodes={processedNodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          nodeTypes={nodeTypes}
          fitView
          colorMode="dark"
          minZoom={0.2}
          maxZoom={2}
          defaultViewport={{ x: 0, y: 0, zoom: 0.7 }}
        >
          <Background color="#332211" gap={32} size={1} />
          <Controls
            className="!bg-slate-900 !border-amber-500/30 !rounded-lg overflow-hidden
            [&>button]:!border-amber-500/20 [&>button]:!bg-slate-900 [&>button:hover]:!bg-amber-500/20"
          />
        </ReactFlow>
      </div>
    </div>
  );
};

export default GvGModule;
