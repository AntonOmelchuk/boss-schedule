import { Navigate } from "react-router-dom";

import useAuthStore from "../store/useAuthStore";

const ADMIN_ROLES = ["ADMIN", "OFFICER", "SCOUT"];

const AdminRouteGuard = ({ children, redirectTo }) => {
  const { user, isAuthenticated } = useAuthStore();

  if (!isAuthenticated || !user) {
    return <Navigate to="/" replace />;
  }

  const hasAccess = ADMIN_ROLES.includes(user.role);

  if (!hasAccess) {
    return <Navigate to={redirectTo} replace />;
  }

  return children;
};

export default AdminRouteGuard;
