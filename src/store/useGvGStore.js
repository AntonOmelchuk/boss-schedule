import { addEdge, applyEdgeChanges, applyNodeChanges } from "@xyflow/react";
import { create } from "zustand";

import { STORAGE_URL } from "../constants/general";

const MEMBERS_DATA = [
  {
    id: "tobe",
    name: "toBe",
    role: "BP",
    image: `${STORAGE_URL}/avatars/tobe.png`,
  },
  {
    id: "fergi",
    name: "Fergi",
    role: "BP",
    image: `${STORAGE_URL}/avatars/fergi.png`,
  },
  {
    id: "ansol",
    name: "Ansol",
    role: "BP",
    image: `${STORAGE_URL}/avatars/Ansol.png`,
  },
  {
    id: "lapesto",
    name: "Lapesto",
    role: "DD",
    image: `${STORAGE_URL}/avatars/Lapesto.png`,
  },
  {
    id: "manol",
    name: "Manol",
    role: "DD",
    image: `${STORAGE_URL}/avatars/Manol.png`,
  },
  {
    id: "shrek",
    name: "Shrek",
    role: "DD",
    image: `${STORAGE_URL}/avatars/shrek.png`,
  },
  {
    id: "spektra",
    name: "Spektra",
    role: "DD",
    image: `${STORAGE_URL}/avatars/spektra.png`,
  },
  {
    id: "tom",
    name: "Tom",
    role: "DD",
    image: `${STORAGE_URL}/avatars/Tom.png`,
  },
  {
    id: "vryo",
    name: "Vryo",
    role: "DD",
    image: `${STORAGE_URL}/avatars/Vryo.png`,
  },
  {
    id: "winson",
    name: "Winson",
    role: "BP",
    image: `${STORAGE_URL}/avatars/Winson.png`,
  },
  {
    id: "zukka",
    name: "Zukka",
    role: "DD",
    image: `${STORAGE_URL}/avatars/Zukka.png`,
  },
];

const initialNodes = [
  ...MEMBERS_DATA.map((member, index) => ({
    id: member.id,
    type: "memberCard",
    position: { x: 100, y: index * 130 },
    data: { ...member, assignments: "" },
  })),
  {
    id: "enemy-1",
    type: "enemyCard",
    position: { x: 650, y: 50 },
    data: { label: "Target 1" },
  },
];

const initialEdges = [];

const useGvGStore = create((set, get) => ({
  nodes: initialNodes,
  edges: initialEdges,

  onNodesChange: (changes) => {
    set({ nodes: applyNodeChanges(changes, get().nodes) });
  },

  onEdgesChange: (changes) => {
    set({ edges: applyEdgeChanges(changes, get().edges) });
  },

  onConnect: (connection) => {
    const sourceNode = get().nodes.find((n) => n.id === connection.source);

    // Green line if connecting from Support (BP) to another member, Red if to enemy
    const isSupportLink =
      sourceNode?.data?.role === "BP" && !connection.target.startsWith("enemy");
    const edgeColor = isSupportLink ? "#10B981" : "#EF4444";

    const newEdge = {
      ...connection,
      animated: connection.target.startsWith("enemy"),
      style: { stroke: edgeColor, strokeWidth: 2 },
    };
    set({ edges: addEdge(newEdge, get().edges) });
  },

  // Quick programmatic connection (e.g. via dropdown select)
  connectNodesExplicitly: (sourceId, targetId) => {
    const sourceNode = get().nodes.find((n) => n.id === sourceId);
    const isSupportLink = sourceNode?.data?.role === "BP";
    const edgeColor = isSupportLink ? "#10B981" : "#EF4444";

    const newEdge = {
      id: `edge-${sourceId}-${targetId}`,
      source: sourceId,
      target: targetId,
      animated: !isSupportLink,
      style: { stroke: edgeColor, strokeWidth: 2 },
    };

    // Avoid duplicate edges
    const exists = get().edges.some(
      (e) => e.source === sourceId && e.target === targetId,
    );
    if (!exists) {
      set({ edges: [...get().edges, newEdge] });
    }
  },

  updateNodeData: (id, newData) => {
    set({
      nodes: get().nodes.map((node) =>
        node.id === id ? { ...node, data: { ...node.data, ...newData } } : node,
      ),
    });
  },

  addEnemyTarget: () => {
    const id = `enemy-${Date.now()}`;
    const newEnemy = {
      id,
      type: "enemyCard",
      position: {
        x: 650,
        y: 150 + get().nodes.filter((n) => n.type === "enemyCard").length * 100,
      },
      data: {
        label: `Target ${get().nodes.filter((n) => n.type === "enemyCard").length + 1}`,
      },
    };
    set({ nodes: [...get().nodes, newEnemy] });
  },

  removeNode: (id) => {
    set({
      nodes: get().nodes.filter((n) => n.id !== id),
      edges: get().edges.filter((e) => e.source !== id && e.target !== id),
    });
  },
}));

export default useGvGStore;
