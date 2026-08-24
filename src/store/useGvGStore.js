import { addEdge, applyEdgeChanges, applyNodeChanges } from "@xyflow/react";
import { get, ref, set } from "firebase/database";
import { create } from "zustand";
import { persist } from "zustand/middleware";

import { STORAGE_URL } from "../constants/general";
import { db } from "../services/firebase";

const MEMBERS_DATA = [
  {
    id: "tobe",
    name: "toBe",
    role: "Healer",
    image: `${STORAGE_URL}/avatars/tobe.png`,
  },
  {
    id: "fergi",
    name: "Fergi",
    role: "Healer",
    image: `${STORAGE_URL}/avatars/fergi.png`,
  },
  {
    id: "ansol",
    name: "Ansol",
    role: "Healer",
    image: `${STORAGE_URL}/avatars/Ansol.png`,
  },
  {
    id: "mw",
    name: "MWQueen",
    role: "Damager",
    image: `${STORAGE_URL}/avatars/mw.png`,
  },
  {
    id: "shrek",
    name: "ManiacShrek",
    role: "Damager",
    image: `${STORAGE_URL}/avatars/shrek.png`,
  },
  {
    id: "spektra",
    name: "Spektra",
    role: "Damager",
    image: `${STORAGE_URL}/avatars/spektra.png`,
  },
  {
    id: "tom",
    name: "ManiacTom",
    role: "Damager",
    image: `${STORAGE_URL}/avatars/Tom.png`,
  },
  {
    id: "vryo",
    name: "Vryo",
    role: "Damager",
    image: `${STORAGE_URL}/avatars/Vryo.png`,
  },
  {
    id: "zukka",
    name: "ZukaDaddy",
    role: "Damager",
    image: `${STORAGE_URL}/avatars/Zukka.png`,
  },
];

const initialNodes = [
  ...MEMBERS_DATA.map((member, index) => ({
    id: member.id,
    type: "memberCard",
    position: { x: 0, y: index * 160 },
    data: { ...member, assignments: "" },
  })),
  {
    id: "enemy-1",
    type: "enemyCard",
    position: { x: 750, y: 50 },
    data: { label: "Target 1" },
  },
];

const initialEdges = [];

const createStyledEdge = (sourceNode, connectionData) => {
  const isHealerSource = sourceNode?.data?.role === "Healer";
  const edgeColor = isHealerSource ? "#10B981" : "#EF4444";

  return {
    ...connectionData,
    animated: true,
    label: isHealerSource ? "Heal / Cleanse / Res" : "Assist",
    labelStyle: { fill: "#ffffff", fontWeight: 700, fontSize: 27 },
    labelBgStyle: { fill: "#0f172a", fillOpacity: 0.85 },
    labelBgPadding: [10, 6],
    labelBgBorderRadius: 8,
    markerEnd: {
      type: "arrowclosed",
      color: edgeColor,
      width: 21,
      height: 21,
    },
    style: { stroke: edgeColor, strokeWidth: 3 },
  };
};

const useGvGStore = create(
  persist(
    (setStore, getStore) => {
      if (typeof window !== "undefined") {
        const gvgRef = ref(db, "gvg_setup");
        get(gvgRef)
          .then((snapshot) => {
            if (snapshot.exists()) {
              const data = snapshot.val();
              if (data && data.nodes) {
                setStore({
                  nodes: data.nodes,
                  edges: data.edges || initialEdges,
                });
              }
            }
          })
          .catch((error) => {
            console.error("Failed to load GvG setup from Firebase:", error);
          });
      }

      return {
        nodes: initialNodes,
        edges: initialEdges,

        onNodesChange: (changes) => {
          setStore({ nodes: applyNodeChanges(changes, getStore().nodes) });
        },

        onEdgesChange: (changes) => {
          setStore({ edges: applyEdgeChanges(changes, getStore().edges) });
        },

        onConnect: (connection) => {
          const sourceNode = getStore().nodes.find(
            (n) => n.id === connection.source,
          );
          const newEdge = createStyledEdge(sourceNode, connection);
          setStore({ edges: addEdge(newEdge, getStore().edges) });
        },

        connectNodesExplicitly: (sourceId, targetId) => {
          const sourceNode = getStore().nodes.find((n) => n.id === sourceId);

          const connectionData = {
            id: `edge-${sourceId}-${targetId}`,
            source: sourceId,
            target: targetId,
          };

          const newEdge = createStyledEdge(sourceNode, connectionData);

          const exists = getStore().edges.some(
            (e) => e.source === sourceId && e.target === targetId,
          );
          if (!exists) {
            setStore({ edges: [...getStore().edges, newEdge] });
          }
        },

        updateNodeData: (id, newData) => {
          setStore({
            nodes: getStore().nodes.map((node) =>
              node.id === id
                ? { ...node, data: { ...node.data, ...newData } }
                : node,
            ),
          });
        },

        addEnemyTarget: () => {
          const id = `enemy-${Date.now()}`;
          const newEnemy = {
            id,
            type: "enemyCard",
            position: {
              x: 750,
              y:
                150 +
                getStore().nodes.filter((n) => n.type === "enemyCard").length *
                  120,
            },
            data: {
              label: `Target ${getStore().nodes.filter((n) => n.type === "enemyCard").length + 1}`,
            },
          };
          setStore({ nodes: [...getStore().nodes, newEnemy] });
        },

        removeNode: (id) => {
          setStore({
            nodes: getStore().nodes.filter((n) => n.id !== id),
            edges: getStore().edges.filter(
              (e) => e.source !== id && e.target !== id,
            ),
          });
        },

        resetPlanner: () => {
          setStore({ nodes: initialNodes, edges: initialEdges });
        },

        savePlanner: async () => {
          try {
            const gvgRef = ref(db, "gvg_setup");
            await set(gvgRef, {
              nodes: getStore().nodes,
              edges: getStore().edges,
              updatedAt: Date.now(),
            });
            return true;
          } catch (error) {
            console.error("Failed to save GvG setup:", error);
            throw error;
          }
        },
      };
    },
    {
      name: "gvg-planner-storage",
    },
  ),
);

export default useGvGStore;
