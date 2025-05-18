// src/components/ProtectedRoute.js
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../services/AuthContext'; // Your existing auth context

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return null; // Or your loading spinner
  }

  if (!user) {
    const redirectPath = encodeURIComponent(location.pathname + location.search);
    return <Navigate to={`/logon?redirect=${redirectPath}`} replace />;
  }

  // If authenticated, render the protected component
  return children;
};

export default ProtectedRoute;