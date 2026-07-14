import { Navigate } from "react-router-dom";
import { getStoredToken, getStoredUser } from "../lib/authStorage";

 function ProtectedRoute({ roles = [], children }) {
  const token = getStoredToken();
  const user = getStoredUser();

  if (!token || !user) {
    return <Navigate to="/login" replace />;
  }

  if (roles.length && !roles.includes(user.rol)) {
    return <Navigate to="/" replace />;
  }

  return children;
}
export default ProtectedRoute;
