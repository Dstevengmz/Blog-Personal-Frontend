import { Navigate } from "react-router-dom";

 function ProtectedRoute({ roles = [], children }) {
  const token = localStorage.getItem("token");
  const userStr = localStorage.getItem("user");
  const user = userStr ? JSON.parse(userStr) : null;

  if (!token || !user) {
    return <Navigate to="/login" replace />;
  }

  if (roles.length && !roles.includes(user.rol)) {
    return <Navigate to="/" replace />;
  }

  return children;
}
export default ProtectedRoute;