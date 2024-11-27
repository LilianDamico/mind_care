import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaLock } from 'react-icons/fa';
import axios from 'axios';
import './Login.css';
import { Navbar } from '../../components/navbar/Navbar';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null); // Estado para mensagem de sucesso
  const [loading, setLoading] = useState(false); // Estado para indicar carregamento
  const navigate = useNavigate();

  const baseUrl = process.env.REACT_APP_API_URL || 'http://localhost:8081';

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setSuccess(null); // Reseta a mensagem de sucesso
    setLoading(true);

    if (!email || !password) {
      setError('Preencha todos os campos.');
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(`${baseUrl}/login`, {
        email,
        senha: password, // Backend espera o campo `senha`
      });

      const { token, cliente } = response.data;
      if (token) {
        localStorage.setItem('authToken', token); // Armazena o token no localStorage
        localStorage.setItem('cliente', JSON.stringify(cliente)); // Armazena informações do cliente no localStorage
        setSuccess('Login realizado com sucesso! Redirecionando...'); // Define a mensagem de sucesso
        setLoading(false);

        // Aguarda 5 segundos para exibir a mensagem antes de redirecionar
        setTimeout(() => {
          navigate('/'); // Redireciona para a LandingPage
        }, 5000);
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
          <h3>Login do Cliente</h3>
          {error && <p className="error">{error}</p>} {/* Exibe mensagem de erro */}
          {success && <p className="success">{success}</p>} {/* Exibe mensagem de sucesso */}
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
