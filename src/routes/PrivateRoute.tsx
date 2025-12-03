// src/routes/PrivateRoute.tsx
import React from "react";
import { Navigate } from "react-router-dom";

interface Props {
  children: React.ReactNode;
  role?: "ADMIN" | "CLIENTE" | "PROFISSIONAL" | "CLINICA";
}

const PrivateRoute: React.FC<Props> = ({ children, role }) => {
  const token = localStorage.getItem("token");
  const userTipo = localStorage.getItem("userTipo"); // valor vindo do login (TipoUsuario do backend)

  // 🔒 1) Sem token = não logado
  if (!token) {
    return <Navigate to="/loginpage" replace />;
  }

  // 🔑 2) Se a rota exige um tipo específico e o usuário não bate, barra o acesso
  if (role && role !== userTipo) {
    return <Navigate to="/" replace />;
  }

  // ✅ 3) Libera acesso
  return <>{children}</>;
};

export default PrivateRoute;
