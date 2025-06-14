
import { Navigate } from "react-router-dom";
import * as auth from "../utils/auth";


const ProtectedRoute = ({ children }) => {
 const isAuth = auth.isAuthenticated();
  
  // If not authenticated, redirect to signin
  if (!isAuth) {
    return <Navigate to="/signin" replace />;
  }
  
  // If authenticated, render the children
  return children;
};


export default ProtectedRoute; 