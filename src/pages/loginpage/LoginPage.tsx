import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { apiUrl } from '../../services/api';
import './LoginPage.css';

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErro('');

    try {
      const response = await apiUrl.post('/login', { email, senha });

      const token = response.data.token;
      login(token); // Armazena o token no contexto

      const userInfo = await apiUrl.get('/usuarios/me', {
        headers: { Authorization: `Bearer ${token}` },
      });

      const tipo = userInfo.data.tipo;

      if (tipo === 'PROFISSIONAL') {
        navigate('/dashboard-profissional');
      } else {
        navigate('/dashboard-paciente');
      }

    } catch (err) {
      setErro('Usuário ou senha inválidos.');
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleLogin}>
        <h2>Entrar no MindCare</h2>

        <label>Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label>Senha</label>
        <input
          type="password"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          required
        />

        {erro && <div className="erro">{erro}</div>}

        <button type="submit">Entrar</button>
      </form>
    </div>
  );
};

export default LoginPage;
