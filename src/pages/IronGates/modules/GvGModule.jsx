import "@xyflow/react/dist/style.css";

import { Background, BackgroundVariant, ReactFlow } from "@xyflow/react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useMemo } from "react";

import useGvGStore from "../../../store/useGvGStore";
import EnemyCardNode from "../components/GvG/EnemyCardNode";
import Header from "../components/GvG/Header";
import MemberCardNode from "../components/GvG/MemberCardNode";

const nodeTypes = {
  memberCard: MemberCardNode,
  enemyCard: EnemyCardNode,
};

const GvGModule = ({ isGvGFullscreen, setIsGvGFullscreen }) => {
  const { nodes, edges, onNodesChange, onEdgesChange, onConnect, removeNode } =
    useGvGStore();

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
    <div className="h-full w-full text-white flex flex-col grow relative">
      <div className="absolute top-2 left-1/2 -translate-x-1/2 z-50">
        <button
          onClick={() => setIsGvGFullscreen(!isGvGFullscreen)}
          className="px-3.5 py-1.5 rounded-full bg-slate-900/90 backdrop-blur-md border border-slate-700/80
          text-slate-300 hover:text-amber-400 hover:border-amber-500/50 shadow-[0_4px_20px_rgba(0,0,0,0.8)]
            transition-all duration-300 flex items-center gap-1.5 text-xs font-semibold cursor-pointer"
        >
          <span>
            {isGvGFullscreen
              ? "Fullscreen Mode (Hide All)"
              : "Show Interface & Nav"}
          </span>
          {isGvGFullscreen ? (
            <ChevronUp size={14} />
          ) : (
            <ChevronDown size={14} />
          )}
        </button>
      </div>

      <div
        className={`transition-all duration-300 overflow-hidden ${
          !isGvGFullscreen
            ? "max-h-0 opacity-0 pointer-events-none"
            : "max-h-40 opacity-100"
        }`}
      >
        <Header />
      </div>

      <div className="grow w-full h-[calc(100vh-120px)]">
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
          snapToGrid={true}
          snapGrid={[20, 20]}
          defaultViewport={{ x: 0, y: 0, zoom: 0.7 }}
        >
          <Background
            id="2"
            gap={100}
            size={2}
            color="#fff"
            bgColor="#020618"
            variant={BackgroundVariant.Dots}
          />
        </ReactFlow>
      </div>
    </div>
  );
};

export default GvGModule;
