
import { Navigate } from "react-router-dom";
import * as auth from "../utils/auth";

const ProtectedRoute = ({ children }) => {
  return auth.isAuthenticated() ? children : <Navigate to="/signin" replace />;
};

export default ProtectedRoute; 