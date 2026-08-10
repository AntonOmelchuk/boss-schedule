import { Navigate } from "react-router-dom";

import { ROLES } from "../constants/roles";
import useAuthStore from "../store/useAuthStore";

const ADMIN_ROLES = [
  ROLES.ADMIN,
  ROLES.CO_ADMIN,
  ROLES.ALLY_GENERAL,
  ROLES.RAID_CALLER,
];

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
