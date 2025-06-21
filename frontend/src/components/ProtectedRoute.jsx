import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  // 1. Define the auth check function
  const checkAuth = () => {
    const token = localStorage.getItem('userToken');
    return !!token; // Returns true if token exists
  };

  // 2. Call the function to get the auth status
  const isAuthenticated = checkAuth();

  // 3. Debug log (optional)
  console.log('ProtectedRoute - isAuthenticated:', isAuthenticated);

  // 4. Return either children or redirect
  return isAuthenticated ? children : <Navigate to="/signin" replace />;
};

export default ProtectedRoute;