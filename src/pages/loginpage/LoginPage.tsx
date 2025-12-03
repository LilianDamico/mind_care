// src/pages/loginpage/LoginPage.tsx

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import "./LoginPage.css";

const LoginPage: React.FC = () => {
  const navigate = useNavigate();

  const [emailOuCpf, setEmailOuCpf] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErro("");

    try {
      const response = await api.post("/api/auth/login", {
        login: emailOuCpf,
        senha,
      });

      // Backend retorna: { token, user: { id, nome, email, tipo } }
      const { token, user } = response.data;

      if (!token || !user) {
        setErro("Erro inesperado: resposta inválida do servidor.");
        return;
      }

      // =======================================
      // 🔥 Armazenamento padronizado
      // =======================================
      localStorage.clear();

      localStorage.setItem("token", token);
      localStorage.setItem("userId", user.id);
      localStorage.setItem("userNome", user.nome);
      localStorage.setItem("userTipo", user.tipo);

      console.log("LOGIN OK:", {
        token,
        tipo: user.tipo,
        nome: user.nome,
      });

      // =======================================
      // 🔀 Redirecionamento por tipo de usuário
      // =======================================
      switch (user.tipo) {
        case "ADMIN":
          navigate("/admindashboard");
          break;

        case "PROFISSIONAL":
          navigate("/dashboard-profissional");
          break;

        case "CLIENTE":
          navigate("/dashboard-cliente");
          break;

        default:
          navigate("/");
          break;
      }

    } catch (err: any) {
      console.error("Erro no login:", err);
      setErro(err.response?.data?.error || "Credenciais inválidas.");
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleLogin}>
        <h2>Login</h2>

        {erro && <p className="erro">{erro}</p>}

        <input
          type="text"
          placeholder="E-mail ou CPF"
          value={emailOuCpf}
          onChange={(e) => setEmailOuCpf(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          required
        />

        <button type="submit">Entrar</button>
      </form>
    </div>
  );
};

export default LoginPage;
