import { Navigate } from "react-router-dom";

import useMediaQuery from "../hooks/useMediaQuery";

/**
 * Guard component that restricts access to routes for viewports smaller than desktop (1280px).
 *
 * @param {Object} props
 * @param {React.ReactNode} props.children - The target page component
 * @param {string} [props.redirectTo="/"] - Fallback path for non-desktop users
 * @param {boolean} [props.showFallbackUI=false] - Show custom UI instead of redirecting
 */
const DesktopOnlyGuard = ({
  children,
  redirectTo = "/",
  showFallbackUI = false,
}) => {
  // Check if viewport is smaller than desktop (1280px)
  const isBelowDesktop = useMediaQuery("(max-width: 1279px)");

  if (isBelowDesktop) {
    // Option A: Custom Fallback UI for non-desktop screens
    if (showFallbackUI) {
      return (
        <div className="min-h-[60vh] flex flex-col items-center justify-center text-center p-6 gap-4">
          <span className="text-4xl">💻</span>
          <h2 className="text-xl font-bold text-slate-100">
            Desktop Version Only
          </h2>
          <p className="text-sm text-slate-400 max-w-xs">
            This page contains complex analytical tables and is optimized for
            desktop viewports (1280px+) only.
          </p>
        </div>
      );
    }

    // Option B: Instant redirect back to fallback route
    return <Navigate to={redirectTo} replace />;
  }

  return children;
};

export default DesktopOnlyGuard;
