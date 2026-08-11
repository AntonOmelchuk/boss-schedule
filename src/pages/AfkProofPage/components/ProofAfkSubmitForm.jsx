import { useActionState, useEffect, useState } from "react";

import UserIdentityForm from "../../../components/FormControls/UserIdentityForm";
import useTranslation from "../../../hooks/useTranslation";
import useAuthStore from "../../../store/useAuthStore";
import useCPStore from "../../../store/useCPStore";
import { formatTimeRemaining } from "../../../utils/general";

const LOCAL_STORAGE_KEY_PREFIX = "afk_proof_submitted_";
const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

const ProofAfkSubmitForm = ({ activeCheck, isExpired: initialExpired }) => {
  const { t } = useTranslation();
  const { user } = useAuthStore();

  const { id, event_name, expires_at, secret_code } = activeCheck || {};

  const [selectedCp, setSelectedCp] = useState(user?.cp_name || "");
  const [selectedChar, setSelectedChar] = useState(user?.char_name || "");
  const [inputCode, setInputCode] = useState("");
  const [hasAlreadyConfirmed, setHasAlreadyConfirmed] = useState(false);

  const [secondsLeft, setSecondsLeft] = useState(() => {
    if (!expires_at) return 0;
    return Math.max(0, Math.floor((expires_at - Date.now()) / 1000));
  });

  const {
    initCpData,
    cpList,
    isLoading: isLoadingCps,
    playerList,
    isLoadingPlayers,
    fetchPlayersForCp,
  } = useCPStore();

  // Countdown timer effect
  useEffect(() => {
    if (!expires_at) return;

    const interval = setInterval(() => {
      const remaining = Math.max(
        0,
        Math.floor((expires_at - Date.now()) / 1000),
      );
      setSecondsLeft(remaining);
      if (remaining <= 0) clearInterval(interval);
    }, 1000);

    return () => clearInterval(interval);
  }, [expires_at]);

  // Prevent duplicate submissions via localStorage
  useEffect(() => {
    const cleanup = initCpData();
    if (id) {
      const isConfirmed = localStorage.getItem(
        `${LOCAL_STORAGE_KEY_PREFIX}${id}`,
      );
      if (isConfirmed) setHasAlreadyConfirmed(true);
    }
    return () => cleanup && cleanup();
  }, [initCpData, id]);

  useEffect(() => {
    if (user?.cp_name) {
      fetchPlayersForCp(user.cp_name);
    }
  }, [user?.cp_name, fetchPlayersForCp]);

  const handleCpChange = (e) => {
    const cpName = e.target.value;
    setSelectedCp(cpName);
    setSelectedChar("");
    fetchPlayersForCp(cpName);
  };

  // React 19 Action invoking Python Backend
  const submitProofAction = async () => {
    if (secondsLeft <= 0 || initialExpired) {
      return { error: t.afkChecker?.expiredError, success: false };
    }

    if (!selectedCp || !selectedChar) {
      return { error: t.afkChecker?.fillAllFieldsError, success: false };
    }

    if (secret_code && inputCode.trim() !== secret_code) {
      return { error: t.afkChecker?.invalidSecretCode, success: false };
    }

    try {
      const response = await fetch(`${API_BASE_URL}/api/proof/submit`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          cp_name: selectedCp,
          char_name: selectedChar,
          discord_id: user?.discord_id || null,
          secret_code: secret_code ? inputCode.trim() : null,
          device_info: {
            userAgent: navigator.userAgent,
            language: navigator.language,
            platform: navigator.platform,
            screenResolution: `${window.screen.width}x${window.screen.height}`,
          },
        }),
      });

      const resData = await response.json();

      if (!response.ok) {
        return {
          error: resData.detail || t.afkChecker?.submitFailedError,
          success: false,
        };
      }

      localStorage.setItem(`${LOCAL_STORAGE_KEY_PREFIX}${id}`, "true");
      setHasAlreadyConfirmed(true);

      return { error: null, success: true };
    } catch (err) {
      console.error("Failed to submit AFK proof:", err);
      return { error: t.afkChecker?.submitFailedError, success: false };
    }
  };

  const [actionState, formAction, isPending] = useActionState(
    submitProofAction,
    {
      error: null,
      success: false,
    },
  );

  const isFormDisabled = isPending || secondsLeft <= 0 || initialExpired;

  if (hasAlreadyConfirmed) {
    return (
      <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-2xl p-6 text-center space-y-2 shadow-xl">
        <span className="text-3xl">✅</span>
        <h3 className="text-sm font-bold text-emerald-400">
          {t.afkChecker?.alreadyConfirmedTitle}
        </h3>
        <p className="text-xs text-slate-400">
          {t.afkChecker?.alreadyConfirmedSubtitle}
        </p>
      </div>
    );
  }

  return (
    <form
      action={formAction}
      className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-5 shadow-2xl"
    >
      {/* Event Header */}
      <div className="border-b border-slate-800 pb-3 flex items-center justify-between">
        <div>
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <span>📸</span> {event_name || t.afkChecker?.formTitle}
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            {t.afkChecker?.formSubtitle}
          </p>
        </div>

        {expires_at && (
          <div
            className={`px-3 py-1.5 rounded-xl border font-mono text-xs font-bold flex items-center gap-1.5 shrink-0 ${
              secondsLeft > 30
                ? "bg-amber-500/10 text-amber-400 border-amber-500/20"
                : "bg-rose-500/10 text-rose-400 border-rose-500/30 animate-pulse"
            }`}
          >
            <span>⏳</span>
            <span>{formatTimeRemaining(secondsLeft)}</span>
          </div>
        )}
      </div>

      {actionState.error && (
        <div className="p-3 bg-rose-500/10 border border-rose-500/30 rounded-xl text-xs text-rose-400 font-medium">
          {actionState.error}
        </div>
      )}

      {/* Secret Code Input */}
      {secret_code && (
        <div>
          <label className="block text-xs font-bold text-slate-300 mb-1.5">
            🔑 {t.afkChecker?.secretCodeLabel}
          </label>
          <input
            type="text"
            value={inputCode}
            onChange={(e) => setInputCode(e.target.value)}
            placeholder={t.afkChecker?.secretCodePlaceholder}
            disabled={isFormDisabled}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-amber-400
              font-mono font-bold focus:outline-none focus:border-amber-500 transition disabled:opacity-50"
            required
          />
        </div>
      )}

      {/* Identity Controls Form */}
      <UserIdentityForm
        cpList={cpList}
        selectedCp={selectedCp}
        handleCpChange={handleCpChange}
        loadingCps={isLoadingCps}
        playerList={playerList}
        selectedChar={selectedChar}
        setSelectedChar={setSelectedChar}
        isLoadingPlayers={isLoadingPlayers}
        isDisabled={isFormDisabled}
      />

      {/* Submit Button */}
      <button
        type="submit"
        disabled={!selectedCp || !selectedChar || isFormDisabled}
        className="w-full py-3 bg-amber-500 hover:bg-amber-600 disabled:bg-slate-800 text-slate-950
          disabled:text-slate-500 font-bold text-xs rounded-xl shadow-lg transition cursor-pointer
          disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {isPending && (
          <div className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
        )}
        <span>
          {secondsLeft <= 0 || initialExpired
            ? t.afkChecker?.expiredButtonText
            : isPending
              ? t.afkChecker?.submitting
              : t.afkChecker?.confirmPresenceBtn}
        </span>
      </button>
    </form>
  );
};

export default ProofAfkSubmitForm;
