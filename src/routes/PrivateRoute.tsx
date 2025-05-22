// src/routes/PrivateRoute.tsx
import React, { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

interface PrivateRouteProps {
  children: ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const { user, carregando } = useAuth();

  if (carregando) {
    return <p>Carregando...</p>; // Ou um spinner, se preferir
  }

  if (!user) {
    return <Navigate to="/loginpage" replace />;
  }

  return <>{children}</>;
};

export default PrivateRoute;
