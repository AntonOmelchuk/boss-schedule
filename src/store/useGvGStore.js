import { addEdge, applyEdgeChanges, applyNodeChanges } from "@xyflow/react";
import { get, ref, set } from "firebase/database";
import { create } from "zustand";
import { persist } from "zustand/middleware";

import { MEMBERS_MAP } from "../constants/members";
import { db } from "../services/firebase";

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

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
      const fetchRosterAndInit = async () => {
        try {
          const response = await fetch(`${BASE_URL}/api/gvg-setup/roster`);
          const result = await response.json();

          if (result.status === "success" && result.roster) {
            const rosterData = result.roster;
            const newNodes = [];
            const newEdges = [];

            rosterData.forEach((member, index) => {
              const matchedKey = Object.keys(MEMBERS_MAP).find(
                (k) => k.toLowerCase() === member.name.toLowerCase(),
              );
              const avatarImage = matchedKey
                ? MEMBERS_MAP[matchedKey].image
                : "";

              const isHealer =
                member.class.toLowerCase().includes("cardinal") ||
                member.class.toLowerCase().includes("bishop");
              const role = isHealer ? "Healer" : "Damager";

              const nodeId = `member-${index}-${member.name.toLowerCase()}`;

              newNodes.push({
                id: nodeId,
                type: "memberCard",
                position: { x: 0, y: index * 160 },
                data: {
                  id: nodeId,
                  name: member.name,
                  class: member.class,
                  role: role,
                  image: avatarImage,
                  assignments: member.info,
                  assigned_bishop: member.assigned_bishop,
                },
              });
            });

            newNodes.push({
              id: "enemy-1",
              type: "enemyCard",
              position: { x: 750, y: 50 },
              data: { label: "Target 1" },
            });

            newNodes.forEach((node) => {
              if (node.type === "memberCard" && node.data.assigned_bishop) {
                const bishopNode = newNodes.find(
                  (n) =>
                    n.type === "memberCard" &&
                    n.data.name.toLowerCase() ===
                      node.data.assigned_bishop.toLowerCase(),
                );
                if (bishopNode) {
                  const connectionData = {
                    id: `edge-${bishopNode.id}-${node.id}`,
                    source: bishopNode.id,
                    target: node.id,
                  };
                  const styledEdge = createStyledEdge(
                    bishopNode,
                    connectionData,
                  );
                  newEdges.push(styledEdge);
                }
              }
            });

            setStore({
              nodes: newNodes,
              edges: newEdges,
            });
          }
        } catch (error) {
          console.error("Failed to fetch GvG roster from backend:", error);
        }
      };

      if (typeof window !== "undefined") {
        const gvgRef = ref(db, "gvg_setup");
        get(gvgRef)
          .then((snapshot) => {
            if (snapshot.exists()) {
              const data = snapshot.val();
              if (data && data.nodes && data.nodes.length > 0) {
                setStore({
                  nodes: data.nodes,
                  edges: data.edges || [],
                });
              } else {
                fetchRosterAndInit();
              }
            } else {
              fetchRosterAndInit();
            }
          })
          .catch((error) => {
            console.error("Failed to load GvG setup from Firebase:", error);
            fetchRosterAndInit();
          });
      }

      return {
        nodes: [],
        edges: [],

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
          fetchRosterAndInit();
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
