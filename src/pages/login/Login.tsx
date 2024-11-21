import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaLock } from 'react-icons/fa';
import axios from 'axios'; // Substituído para maior flexibilidade em chamadas HTTP
import './Login.css';
import { Navbar } from '../../components/navbar/Navbar';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false); // Estado para indicar carregamento
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setLoading(true); // Ativa o estado de carregamento

    if (!email || !password) {
      setError('Preencha todos os campos.');
      setLoading(false); // Desativa o estado de carregamento
      return;
    }

    try {
      const response = await axios.post('https://api-node-vjiq.onrender.com/login', {
        email,
        senha: password, // Backend espera o campo `senha`
      });

      const { token } = response.data;
      if (token) {
        localStorage.setItem('authToken', token); // Armazena o token no localStorage
        setLoading(false);
        navigate('/userslist'); // Redireciona para a lista de usuários
      } else {
        throw new Error('Token não recebido. Verifique o backend.');
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Erro ao realizar login.');
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <Navbar />
      <div className="login-box">
        <form className="login-form" onSubmit={handleLogin}>
          <h3>Login</h3>
          {error && <p className="error">{error}</p>} {/* Exibe mensagem de erro */}
          <div className="input-group">
            <FaUser className="icon" />
            <input
              type="email"
              placeholder="E-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <FaLock className="icon" />
            <input
              type="password"
              placeholder="Senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div>
            <button className="login-button" type="submit" disabled={loading}>
              {loading ? 'Entrando...' : 'Entrar'} {/* Indica carregamento */}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;

