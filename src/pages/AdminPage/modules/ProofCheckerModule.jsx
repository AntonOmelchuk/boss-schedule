import { onValue, ref, remove, set, update } from "firebase/database";
import { useEffect, useState } from "react";

import useTranslation from "../../../hooks/useTranslation";
import { db } from "../../../services/firebase";
import useAuthStore from "../../../store/useAuthStore";
import LiveStatus from "../components/LiveStatus";
import ProofForm from "../components/ProofForm";

const ALLOWED_LEADERSHIP_ROLES = [
  "ADMIN",
  "CO_ADMIN",
  "ALLY_HEAD",
  "ALLY_GENERAL",
  "RAID_CALLER",
];

// Helper to safely parse events list from Firebase snapshot
const parseEventsData = (data) => {
  if (!data) return [];
  if (Array.isArray(data)) return data;

  return Object.values(data).map((entry) =>
    typeof entry === "string" ? entry : entry.name,
  );
};

const ProofCheckerModule = () => {
  const { t } = useTranslation();
  const { user } = useAuthStore();

  const [eventsList, setEventsList] = useState([]);
  const [activeCheck, setActiveCheck] = useState(null);
  const [responses, setResponses] = useState([]);
  const [timeLeft, setTimeLeft] = useState(0);

  const isAllowedToManage = ALLOWED_LEADERSHIP_ROLES.includes(
    user?.role?.toUpperCase(),
  );

  // 1. Fetch events_list from Firebase Realtime DB
  useEffect(() => {
    const eventsRef = ref(db, "events_list");

    const unsubscribe = onValue(eventsRef, (snapshot) => {
      const data = snapshot.val();
      setEventsList(parseEventsData(data));
    });

    return () => unsubscribe();
  }, []);

  // 2. Subscribe to active proof check
  useEffect(() => {
    const checkRef = ref(db, "active_proof_check");

    const unsubscribe = onValue(checkRef, (snapshot) => {
      const data = snapshot.val();
      if (data && data.is_active) {
        setActiveCheck(data);
      } else {
        setActiveCheck(null);
        setResponses([]);
      }
    });

    return () => unsubscribe();
  }, []);

  // 3. Subscribe to live responses for the active check
  useEffect(() => {
    if (!activeCheck?.id) return;

    const responsesRef = ref(db, `proof_responses/${activeCheck.id}`);

    const unsubscribe = onValue(responsesRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setResponses(Object.values(data));
      } else {
        setResponses([]);
      }
    });

    return () => unsubscribe();
  }, [activeCheck?.id]);

  // 4. Timer countdown and auto-complete when timer expires
  useEffect(() => {
    if (!activeCheck) return;

    const interval = setInterval(() => {
      const remaining = Math.max(
        0,
        Math.floor((activeCheck.expires_at - Date.now()) / 1000),
      );
      setTimeLeft(remaining);

      if (remaining === 0) {
        clearInterval(interval);
        update(ref(db, "active_proof_check"), { is_active: false }).catch(
          (err) => console.error("Failed to auto-expire check:", err),
        );
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [activeCheck]);

  // Helper to gather device info
  const getDeviceInfo = () => {
    return {
      userAgent: navigator.userAgent,
      platform: navigator.platform,
      language: navigator.language,
      screenResolution: `${window.screen.width}x${window.screen.height}`,
    };
  };

  // Start new AFK check & save to history with initiator auto-confirmed
  const handleStartCheck = async ({
    eventName,
    durationMinutes,
    requireCode,
    secretCode,
  }) => {
    if (!eventName?.trim()) {
      alert(t.afkCheck.enterEventAlert);
      return;
    }

    const durationSec = durationMinutes * 60;
    const now = Date.now();
    const proofId = `proof_${now}`;
    const generatedCode = requireCode
      ? secretCode || String(Math.floor(1000 + Math.random() * 9000))
      : null;

    // Initiator response payload
    const initiatorResponse = {
      discord_id: user?.discord_id || user?.uid || "unknown_leader",
      char_name: user?.char_name || user?.displayName || "Leader",
      cp_name: user?.cp_name || "Leadership",
      timestamp: now,
      device_info: getDeviceInfo(),
      ip: user?.ip || "auto_recorded",
      is_initiator: true,
    };

    const checkData = {
      id: proofId,
      event_name: eventName.trim(),
      event_date: new Date().toISOString().split("T")[0],
      duration_seconds: durationSec,
      created_at: now,
      expires_at: now + durationSec * 1000,
      secret_code: generatedCode,
      is_active: true,
      created_by: {
        discord_id: user?.discord_id || user?.uid || null,
        char_name: user?.char_name || "Leader",
      },
    };

    try {
      // 1. Set active check
      await set(ref(db, "active_proof_check"), checkData);

      // 2. Initialize history record
      await set(
        ref(
          db,
          `proof_history/${checkData.event_date}_${checkData.event_name}`,
        ),
        {
          ...checkData,
          responses: {
            [initiatorResponse.discord_id]: initiatorResponse,
          },
        },
      );

      // 3. Auto-add initiator to live responses
      await set(
        ref(db, `proof_responses/${proofId}/${initiatorResponse.discord_id}`),
        initiatorResponse,
      );
    } catch (err) {
      console.error("Error starting proof check:", err);
    }
  };

  // Stop check manually
  const handleStopCheck = async () => {
    try {
      await update(ref(db, "active_proof_check"), { is_active: false });
    } catch (err) {
      console.error("Error stopping check:", err);
    }
  };

  // Clear active state completely
  const handleClearCheck = async () => {
    try {
      await remove(ref(db, "active_proof_check"));
    } catch (err) {
      console.error("Error clearing check:", err);
    }
  };

  // Restrict access if user does not have permission
  if (!isAllowedToManage) {
    return (
      <div
        className="p-8 max-w-7xl mx-auto text-center bg-slate-900 border border-slate-800 rounded-2xl
        shadow-xl mt-12 space-y-3"
      >
        <span className="text-4xl">🚫</span>
        <h2 className="text-lg font-bold text-red-400">
          {t.afkCheck.accessDeniedTitle}
        </h2>
        <p className="text-xs text-slate-400">
          {t.afkCheck.accessDeniedMessage}
        </p>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6 max-w-7xl mx-auto flex flex-col gap-6">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
        <div>
          <h1 className="text-2xl font-black text-white flex items-center gap-2">
            <span>📋</span> {t.afkCheck.panelTitle}
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            {t.afkCheck.panelSubtitle}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ProofForm
          eventsList={eventsList}
          activeCheck={activeCheck}
          onStartCheck={handleStartCheck}
          onStopCheck={handleStopCheck}
          onClearCheck={handleClearCheck}
        />

        <LiveStatus
          activeCheck={activeCheck}
          timeLeft={timeLeft}
          responses={responses}
        />
      </div>
    </div>
  );
};

export default ProofCheckerModule;
