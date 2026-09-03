import { addEdge, applyEdgeChanges, applyNodeChanges } from "@xyflow/react";
import { get, ref, set } from "firebase/database";
import { create } from "zustand";

import { GVG_ROLES, MEMBERS_MAP } from "../constants/members";
import { db } from "../services/firebase";

const createStyledEdge = (sourceNode, connectionData) => {
  const sourceClass = sourceNode?.data?.class || "";
  const isHealerSource =
    sourceClass.toLowerCase().includes("cardinal") ||
    sourceClass.toLowerCase().includes("bishop");
  const edgeColor = isHealerSource ? "#10B981" : "#EF4444";

  return {
    ...connectionData,
    animated: true,
    label: isHealerSource ? "Cleanse / Res" : "Assist",
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

const useGvGStore = create((setStore, getStore) => {
  // Завантаження початкових учасників з Firebase (iron_gates_members)
  const fetchRosterAndInit = async (setupName = "Default Setup") => {
    try {
      const membersRef = ref(db, "iron_gates_members");
      const snapshot = await get(membersRef);

      if (snapshot.exists()) {
        const data = snapshot.val();
        // Якщо у нас збережений об'єкт сетапів, беремо учасників з якогось дефолтного або першого ліпшого,
        // Або якщо в iron_gates_members лежить просто масив/список учасників:
        let rosterData = [];

        if (Array.isArray(data)) {
          rosterData = data;
        } else if (typeof data === "object") {
          // Шукаємо перший ліпший сетап або масив учасників всередині
          const firstKey = Object.keys(data)[0];
          if (data[firstKey]?.nodes) {
            // Якщо там збережені ноди попереднього сетапу, беремо їх дані
            rosterData = data[firstKey].nodes.map((n) => ({
              name: n.data.name,
              play_class: n.data.class,
              info: n.data.assignments,
            }));
          } else {
            rosterData = Object.values(data);
          }
        }

        const newNodes = [];

        rosterData.forEach((member, index) => {
          if (!member || !member.name) return;

          const matchedKey = Object.keys(MEMBERS_MAP).find(
            (k) => k.toLowerCase() === member.name.toLowerCase(),
          );
          const avatarImage = matchedKey ? MEMBERS_MAP[matchedKey].image : "";

          // Беремо клас із поля play_class (або class як запасний варіант)
          const memberClass = member.play_class || member.class || "";
          const initialClass = GVG_ROLES.includes(memberClass)
            ? memberClass
            : GVG_ROLES[0];

          const nodeId = `member-${index}-${member.name.toLowerCase()}`;

          newNodes.push({
            id: nodeId,
            type: "memberCard",
            position: { x: 0, y: index * 160 },
            data: {
              id: nodeId,
              name: member.name,
              class: initialClass,
              image: avatarImage,
              assignments: member.info || "",
            },
          });
        });

        setStore({
          nodes: newNodes,
          edges: [], // Зв'язки завжди чисті при ініціалізації
          currentSetupName: setupName,
        });
      }
    } catch (error) {
      console.error(
        "Failed to fetch roster from Firebase iron_gates_members:",
        error,
      );
    }
  };

  const fetchSavedSetups = async () => {
    try {
      const gvgRef = ref(db, "gvg_setup");
      const snapshot = await get(gvgRef);
      if (snapshot.exists()) {
        const data = snapshot.val();
        setStore({ savedSetups: data || {} });
      }
    } catch (error) {
      console.error("Failed to fetch saved setups from Firebase:", error);
    }
  };

  if (typeof window !== "undefined") {
    fetchSavedSetups();
  }

  return {
    nodes: [],
    edges: [],
    savedSetups: {},
    currentSetupName: "Default Setup",

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

    removeNode: (id) => {
      setStore({
        nodes: getStore().nodes.filter((n) => n.id !== id),
        edges: getStore().edges.filter(
          (e) => e.source !== id && e.target !== id,
        ),
      });
    },

    createNewSetup: async (setupName) => {
      const formattedName = setupName.trim() || `Setup ${Date.now()}`;
      await fetchRosterAndInit(formattedName);
    },

    loadSetup: (setupName) => {
      const setups = getStore().savedSetups;
      if (setups[setupName]) {
        setStore({
          nodes: setups[setupName].nodes || [],
          edges: setups[setupName].edges || [],
          currentSetupName: setupName,
        });
      } else if (setups.nodes) {
        setStore({
          nodes: setups.nodes || [],
          edges: setups.edges || [],
          currentSetupName: setupName,
        });
      }
    },

    resetPlanner: () => {
      const currentName = getStore().currentSetupName;
      fetchRosterAndInit(currentName);
    },

    savePlanner: async () => {
      try {
        const currentName = getStore().currentSetupName;
        const safeKey = currentName.replace(/[.#$/[\]]/g, "_");

        const setupData = {
          name: currentName,
          nodes: getStore().nodes,
          edges: getStore().edges,
          updatedAt: Date.now(),
        };

        const setupRef = ref(db, `gvg_setup/${safeKey}`);
        await set(setupRef, setupData);

        setStore((state) => ({
          savedSetups: {
            ...state.savedSetups,
            [safeKey]: setupData,
          },
        }));

        return true;
      } catch (error) {
        console.error("Failed to save GvG setup:", error);
        throw error;
      }
    },
  };
});

export default useGvGStore;
