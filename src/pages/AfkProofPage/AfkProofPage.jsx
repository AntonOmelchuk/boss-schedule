import { off, onValue, ref } from "firebase/database";
import { useEffect, useState } from "react";

import PageBadgeTitle from "../../components/UI/PageBadgeTitle";
import useTranslation from "../../hooks/useTranslation";
import { db } from "../../services/firebase";
import ProofAfkSubmitForm from "./components/ProofAfkSubmitForm";

/**
 * AFK Proof Checker Page for active presence confirmation.
 * Always listens to 'active_proof_check' node.
 */
const AfkProofPage = () => {
  const { t } = useTranslation();

  const [activeCheck, setActiveCheck] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isExpired, setIsExpired] = useState(false);

  useEffect(() => {
    // Always listen to active_proof_check
    const checkRef = ref(db, "active_proof_check");

    const unsubscribe = onValue(
      checkRef,
      (snapshot) => {
        const data = snapshot.val();

        if (data && data.is_active) {
          const now = Date.now();
          if (data.expires_at && now > data.expires_at) {
            setIsExpired(true);
            setActiveCheck(data);
          } else {
            setActiveCheck(data);
            setIsExpired(false);
          }
        } else {
          setActiveCheck(null);
        }

        setIsLoading(false);
      },
      (error) => {
        console.error("Failed to fetch AFK check state:", error);
        setIsLoading(false);
      },
    );

    return () => off(checkRef, "value", unsubscribe);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-3">
        <div className="w-8 h-8 border-4 border-amber-500 border-t-transparent rounded-full animate-spin" />
        <span className="text-xs text-slate-400 font-medium">
          {t.afkChecker?.loadingCheckStatus}
        </span>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto py-8 px-4 space-y-6">
      <PageBadgeTitle
        badgeText={t.afkChecker?.badgeText}
        title={t.afkChecker?.pageTitle}
        subTitle={t.afkChecker?.pageSubtitle}
        bgColor="bg-amber-500"
      />

      {!activeCheck || !activeCheck.is_active ? (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 text-center space-y-3 shadow-xl">
          <span className="text-4xl">⏳</span>
          <h3 className="text-base font-bold text-white">
            {t.afkChecker?.noActiveCheckTitle}
          </h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            {t.afkChecker?.noActiveCheckSubtitle}
          </p>
        </div>
      ) : (
        <ProofAfkSubmitForm activeCheck={activeCheck} isExpired={isExpired} />
      )}
    </div>
  );
};

export default AfkProofPage;
