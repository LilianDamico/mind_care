import React from "react";
import { Navigate } from "react-router-dom";

interface Props {
  children: React.ReactNode;
  role?: "CLIENTE" | "PROFISSIONAL";
}

const PrivateRoute: React.FC<Props> = ({ children, role }) => {
  const token = localStorage.getItem("token");
  const userTipo = localStorage.getItem("userTipo");

  if (!token) {
    return <Navigate to="/loginpage" replace />;
  }

  if (role && role !== userTipo) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default PrivateRoute;
