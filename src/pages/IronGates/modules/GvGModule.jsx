import "@xyflow/react/dist/style.css";

import { Background, BackgroundVariant, ReactFlow } from "@xyflow/react";
import { useMemo } from "react";

import useGvGStore from "../../../store/useGvGStore";
import EnemyCardNode from "../components/GvG/EnemyCardNode";
import Header from "../components/GvG/Header";
import MemberCardNode from "../components/GvG/MemberCardNode";

const nodeTypes = {
  memberCard: MemberCardNode,
  enemyCard: EnemyCardNode,
};

const GvGModule = () => {
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
    <div className="h-screen w-full text-white flex flex-col">
      <Header />

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
  );
};

export default GvGModule;
