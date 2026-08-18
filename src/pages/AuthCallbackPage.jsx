import { useEffect, useRef } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import Loader from "../components/UI/Loader";
import useTranslation from "../hooks/useTranslation";
import useAuthStore from "../store/useAuthStore";

const AuthCallbackPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const { loginWithDiscord, isAuthenticating, authError } = useAuthStore();
  const hasTriggered = useRef(false);

  useEffect(() => {
    const code = searchParams.get("code");

    if (!code) return;

    if (!hasTriggered.current) {
      hasTriggered.current = true;

      loginWithDiscord(code)
        .then((user) => {
          if (!user) return;

          if (!user.char_name || !user.cp_name || !user.is_setup_complete) {
            navigate("/onboarding", { replace: true });
          } else {
            navigate("/", { replace: true });
          }
        })
        .catch(() => {});
    }
  }, [searchParams, loginWithDiscord, navigate]);

  const codeMissing = !searchParams.get("code");

  if (isAuthenticating) {
    return <Loader title={t.authenticating} />;
  }

  if ((authError || codeMissing) && !isAuthenticating) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-4 text-center">
        <div className="bg-slate-900 border border-red-500/30 rounded-2xl p-6 max-w-sm w-full space-y-4 shadow-xl">
          <span className="text-3xl">⚠️</span>
          <h2 className="text-lg font-bold text-white">{t.authErrorTitle}</h2>
          <p className="text-xs text-red-400">
            {authError || t.authCodeMissing}
          </p>
          <button
            onClick={() => navigate("/")}
            className="w-full py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-bold
              transition cursor-pointer"
          >
            {t.backToHome}
          </button>
        </div>
      </div>
    );
  }
};

export default AuthCallbackPage;
