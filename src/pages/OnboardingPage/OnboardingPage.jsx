import { ref, update } from "firebase/database";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import useTranslation from "../../hooks/useTranslation";
import { db } from "../../services/firebase";
import useAuthStore from "../../store/useAuthStore";

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

const OnboardingPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { user, updateProfile } = useAuthStore();

  const [cpList, setCpList] = useState([]);
  const [selectedCp, setSelectedCp] = useState("");

  const [playerList, setPlayerList] = useState([]);
  const [selectedChar, setSelectedChar] = useState("");

  const [loadingCps, setLoadingCps] = useState(true);
  const [loadingPlayers, setLoadingPlayers] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 1. Fetch CP list on mount
  useEffect(() => {
    const fetchCps = async () => {
      try {
        const res = await fetch(`${BASE_URL}/api/cp-list`);
        if (!res.ok) throw new Error("Failed to fetch CP list");
        const data = await res.json();
        setCpList(data || []);
      } catch (err) {
        console.error("Failed to load CP list:", err);
      } finally {
        setLoadingCps(false);
      }
    };
    fetchCps();
  }, []);

  // 2. Fetch Players when CP is selected from backend endpoint
  const handleCpChange = async (e) => {
    const cpName = e.target.value;
    setSelectedCp(cpName);
    setSelectedChar("");
    setPlayerList([]);

    if (!cpName) return;

    setLoadingPlayers(true);
    try {
      const res = await fetch(
        `${BASE_URL}/api/cp-players?cp=${encodeURIComponent(cpName)}`,
      );

      if (!res.ok) {
        throw new Error(`Server returned status ${res.status}`);
      }

      const players = await res.json();
      setPlayerList(Array.isArray(players) ? players : []);
    } catch (err) {
      console.error("Failed to load players for CP:", err);
      setPlayerList([]);
    } finally {
      setLoadingPlayers(false);
    }
  };

  // 3. Complete Registration / Setup
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedCp || !selectedChar || !user?.discord_id) return;

    setIsSubmitting(true);
    try {
      const userRef = ref(db, `users/${user.discord_id}`);
      const profileUpdates = {
        cp_name: selectedCp,
        char_name: selectedChar,
        is_setup_complete: true,
        updated_at: Date.now(),
      };

      // Save to Firebase directly
      await update(userRef, profileUpdates);

      // Update Zustand Local Store
      updateProfile(profileUpdates);

      // Redirect to main page
      navigate("/", { replace: true });
    } catch (err) {
      console.error("Failed to finish setup:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 max-w-md w-full shadow-2xl space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <div
            className="inline-flex p-3 bg-amber-500/10 rounded-full border
            border-amber-500/20 text-amber-400 text-2xl"
          >
            ⚔️
          </div>
          <h2 className="text-xl font-bold text-white">
            {t.onboarding?.welcomeTitle || "Вітаємо в Альянсі!"}
          </h2>
          <p className="text-xs text-slate-400">
            {t.onboarding?.welcomeSubtitle ||
              "Для доступу до АФК-чеків та статистики оберіть своє КП та ігровий нікнейм."}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Step 1: Select CP */}
          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1.5">
              {t.onboarding?.step1Label || "1. Оберіть ваше КП (Party)"}
            </label>
            <select
              value={selectedCp}
              onChange={handleCpChange}
              disabled={loadingCps}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white
                focus:outline-none focus:border-amber-500 transition cursor-pointer disabled:opacity-50"
              required
            >
              <option value="">
                {t.onboarding?.selectCpPlaceholder ||
                  "-- Оберіть КП зі списку --"}
              </option>
              {cpList.map((cp) => {
                const cpName = typeof cp === "string" ? cp : cp.name || cp.id;
                return (
                  <option key={cpName} value={cpName}>
                    {cpName}
                  </option>
                );
              })}
            </select>
          </div>

          {/* Step 2: Select Player Nickname */}
          {selectedCp && (
            <div className="animate-fadeIn">
              <label className="block text-xs font-bold text-slate-300 mb-1.5">
                {t.onboarding?.step2Label ||
                  "2. Оберіть ваш ігровий нік (Character)"}
              </label>

              {loadingPlayers ? (
                <div
                  className="flex items-center justify-center gap-2 py-3 bg-slate-950 border border-slate-800
                  rounded-xl text-xs text-amber-400 font-medium animate-pulse"
                >
                  <div className="w-4 h-4 border-2 border-amber-500 border-t-transparent rounded-full animate-spin" />
                  <span>
                    {t.onboarding?.loadingPlayers ||
                      "Завантаження списку гравців..."}
                  </span>
                </div>
              ) : (
                <select
                  value={selectedChar}
                  onChange={(e) => setSelectedChar(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white
                    focus:outline-none focus:border-amber-500 transition cursor-pointer"
                  required
                >
                  <option value="">
                    {t.onboarding?.selectCharPlaceholder ||
                      "-- Оберіть свій нікнейм --"}
                  </option>
                  {playerList.length > 0 ? (
                    playerList.map((player) => (
                      <option key={player} value={player}>
                        {player}
                      </option>
                    ))
                  ) : (
                    <option value="" disabled>
                      {t.onboarding?.noPlayersFound ||
                        "Гравців не знайдено в таблиці КП"}
                    </option>
                  )}
                </select>
              )}
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={!selectedCp || !selectedChar || isSubmitting}
            className="w-full mt-2 py-3 bg-amber-500 hover:bg-amber-600 disabled:bg-slate-800 text-slate-950
            disabled:text-slate-500 font-bold text-xs rounded-xl shadow-lg transition cursor-pointer
              disabled:cursor-not-allowed"
          >
            {isSubmitting
              ? t.onboarding?.saving || "Збереження..."
              : t.onboarding?.submitBtn || "Підтвердити та увійти"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default OnboardingPage;
