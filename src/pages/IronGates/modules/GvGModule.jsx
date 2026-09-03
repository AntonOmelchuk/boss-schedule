import "@xyflow/react/dist/style.css";

import { Background, ReactFlow } from "@xyflow/react";
import { useEffect, useMemo } from "react";

import useGvGStore from "../../../store/useGvGStore";
import Header from "../components/GvG/Header";
import MemberCardNode from "../components/GvG/MemberCardNode";

const GvGModule = () => {
  const {
    nodes,
    edges,
    onNodesChange,
    onEdgesChange,
    onConnect,
    createNewSetup,
    savedSetups,
  } = useGvGStore();

  // Реєструємо тільки ноди учасників
  const nodeTypes = useMemo(
    () => ({
      memberCard: MemberCardNode,
    }),
    [],
  );

  useEffect(() => {
    if (nodes.length === 0) {
      const setupKeys = Object.keys(savedSetups);
      if (setupKeys.length > 0) {
        useGvGStore.getState().loadSetup(setupKeys[0]);
      } else {
        createNewSetup("Default Setup");
      }
    }
  }, [nodes.length, savedSetups, createNewSetup]);

  return (
    <div className="flex flex-col h-screen w-full bg-slate-950 overflow-hidden">
      <Header />

      <div className="flex-1 w-full relative">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          nodeTypes={nodeTypes}
          fitView
          minZoom={0.2}
          maxZoom={2}
          className="bg-slate-950"
        >
          <Background color="#1e293b" gap={24} size={1} />
        </ReactFlow>
      </div>
    </div>
  );
};

export default GvGModule;
