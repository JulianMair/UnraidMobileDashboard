import { Navigate } from "react-router-dom";
import { useAuth } from "./authProvider";

function PrivateRoute({ children }) {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/" replace />;
}

export default PrivateRoute;
