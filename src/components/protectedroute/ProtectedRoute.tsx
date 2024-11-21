import React from 'react';
import { Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
  component: React.ComponentType;
  redirectTo?: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ component: Component, redirectTo = '/login' }) => {
  const token = localStorage.getItem('authToken');

  if (!token) {
    return <Navigate to={redirectTo} />;
  }

  return <Component />;
};

export default ProtectedRoute;
