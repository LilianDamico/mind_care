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
      localStorage.setItem('token', token);

      const userInfo = await apiUrl.get('/usuarios/me', {
        headers: { Authorization: `Bearer ${token}` },
      });

      const user = {
        id: userInfo.data.id,
        nome: userInfo.data.nome,
        email: userInfo.data.email,
        tipo: userInfo.data.tipo,
      };

      login(user);

      if (user.tipo === 'PROFISSIONAL') {
        navigate('/dashboard-profissional');
      } else {
        navigate('/dashboard-paciente');
      }
    } catch (err) {
      console.error(err); // Ajuda a identificar o erro no console
      setErro('Usuário ou senha inválidos.');
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleLogin}>
        <h2>Login</h2>
        {erro && <p className="erro">{erro}</p>}
        <input
          type="email"
          placeholder="E-mail"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Senha"
          value={senha}
          onChange={e => setSenha(e.target.value)}
          required
        />
        <button type="submit">Entrar</button>
      </form>
    </div>
  );
};

export default LoginPage;