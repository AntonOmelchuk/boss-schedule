import { Navigate } from "react-router-dom";

import DesktopFallback from "../components/DesktopFallback/DesktopFallback";
import useMediaQuery from "../hooks/useMediaQuery";

/**
 * Guard component that restricts access to routes for viewports smaller than desktop (1280px).
 *
 * @param {Object} props
 * @param {React.ReactNode} props.children - The target page component
 * @param {string} [props.redirectTo="/"] - Fallback path if redirect mode is used
 * @param {boolean} [props.showFallbackUI=true] - Show custom UI instead of hard redirecting
 */
const DesktopOnlyGuard = ({
  children,
  redirectTo = "/",
  showFallbackUI = true,
}) => {
  const isBelowDesktop = useMediaQuery("(max-width: 1279px)");

  if (isBelowDesktop) {
    if (showFallbackUI) {
      return <DesktopFallback />;
    }

    return <Navigate to={redirectTo} replace />;
  }

  return children;
};

export default DesktopOnlyGuard;
