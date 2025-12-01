// src/pages/loginpage/LoginPage.tsx

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import "./LoginPage.css";

const LoginPage: React.FC = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErro("");

    try {
      const response = await api.post("/api/auth/login", {
        login: email,
        senha,
      });

      // 🔥 Backend retorna: { token, user: { id, nome, email, tipo } }
      const { token, user } = response.data;

      if (!token || !user) {
        setErro("Erro inesperado: usuário ou token não enviados pelo servidor.");
        return;
      }

      // ============================
      // 🔥 Padronização de armazenamento
      // ============================
      localStorage.clear(); // limpa qualquer lixo anterior

      localStorage.setItem("token", token);
      localStorage.setItem("userId", user.id);
      localStorage.setItem("userNome", response.data.user.nome);
      localStorage.setItem("userTipo", user.tipo);

      console.log("LOGIN OK → Gravado no localStorage:", {
        token,
        id: user.id,
        nome: user.nome,
        tipo: user.tipo,
      });

      // ============================
      // 🔁 Redirecionamento por tipo
      // ============================
      if (user.tipo === "PROFISSIONAL") {
        navigate("/dashboard-profissional");
      } else if (user.tipo === "CLIENTE") {
        navigate("/dashboard-cliente");
      } else {
        navigate("/");
      }

    } catch (err: any) {
      console.error("Erro no login:", err);
      setErro(
        err.response?.data?.error || "Login ou senha inválidos. Tente novamente."
      );
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleLogin}>
        <h2>Login</h2>

        {erro && <p className="erro">{erro}</p>}

        <input
          type="email"
          placeholder="E-mail ou CPF"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
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
