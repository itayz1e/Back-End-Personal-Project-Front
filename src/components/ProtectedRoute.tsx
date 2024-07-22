import React from 'react';
import { Navigate } from 'react-router-dom';
import { isAuthenticated } from '../Service/authService';

interface ProtectedRouteProps {
  element: JSX.Element;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ element }) => {
  if (!isAuthenticated()) {
    return <Navigate to="/login" />;
  }

  return element;
};

export default ProtectedRoute;