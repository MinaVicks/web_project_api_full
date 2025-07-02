import { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { getCurrentUser } from '../utils/auth';

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('userToken');

  useEffect(() => {
    
    const verifyToken = async () => {
      try {
        await getCurrentUser(token);
      } catch (err) {
        localStorage.removeItem('userToken');
      }
    };
    verifyToken();
  }, [token]);

  if (!token) {
    return <Navigate to="/signin" replace />;
  }

  return children;
};
export default ProtectedRoute;