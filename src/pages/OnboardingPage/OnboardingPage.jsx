import { ref, update } from "firebase/database";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import useTranslation from "../../hooks/useTranslation";
import { db } from "../../services/firebase";
import useAuthStore from "../../store/useAuthStore";
import useCPStore from "../../store/useCPStore";
import Header from "./components/Header";
import SelectCP from "./components/SelectCP";
import SelectNickname from "./components/SelectNickname";

const OnboardingPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { user, updateProfile } = useAuthStore();

  const [selectedCp, setSelectedCp] = useState("");
  const [selectedChar, setSelectedChar] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    initCpData,
    cpList,
    isLoading,
    playerList,
    isLoadingPlayers,
    fetchPlayersForCp,
  } = useCPStore();

  useEffect(() => {
    const cleanup = initCpData();
    return () => cleanup && cleanup();
  }, [initCpData]);

  const handleCpChange = (e) => {
    const cpName = e.target.value;
    setSelectedCp(cpName);
    setSelectedChar("");
    fetchPlayersForCp(cpName);
  };

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

      await update(userRef, profileUpdates);
      updateProfile(profileUpdates);
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
        <Header />

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Step 1: Select CP */}
          <SelectCP
            cpList={cpList}
            selectedCp={selectedCp}
            loadingCps={isLoading}
            handleCpChange={handleCpChange}
          />

          {/* Step 2: Select Player Nickname */}
          {selectedCp && (
            <div className="animate-fadeIn">
              <label className="block text-xs font-bold text-slate-300 mb-1.5">
                {t.onboarding?.step2Label}
              </label>

              {isLoadingPlayers ? (
                <div
                  className="flex items-center justify-center gap-2 py-3 bg-slate-950 border border-slate-800
                  rounded-xl text-xs text-amber-400 font-medium animate-pulse"
                >
                  <div className="w-4 h-4 border-2 border-amber-500 border-t-transparent rounded-full animate-spin" />
                  <span>{t.onboarding?.loadingPlayers}</span>
                </div>
              ) : (
                <SelectNickname
                  playerList={playerList}
                  selectedChar={selectedChar}
                  setSelectedChar={setSelectedChar}
                />
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
            {isSubmitting ? t.onboarding?.saving : t.onboarding?.submitBtn}
          </button>
        </form>
      </div>
    </div>
  );
};

export default OnboardingPage;
