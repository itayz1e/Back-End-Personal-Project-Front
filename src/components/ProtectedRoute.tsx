import React from "react";
import { Navigate } from "react-router-dom";
import { isTokenValid } from "../Service/authService";

interface ProtectedRouteProps {
  element: JSX.Element;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ element }) => {
  if (!isTokenValid()) {
    return <Navigate to="/login" />;
  }

  return element;
};

export default ProtectedRoute;
