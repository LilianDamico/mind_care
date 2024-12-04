import React, { useState } from 'react';
import './Signin.css'; // Certifique-se de ter o arquivo CSS
import axios from 'axios';
import { Navbar } from '../../components/navbar/Navbar';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [senha, setSenha] = useState<string>('');
  const [message, setMessage] = useState<string | null>(null); // Mensagem de erro ou sucesso
  const [loading, setLoading] = useState<boolean>(false); // Estado de carregamento

  // URL base configurada
  const baseUrl =
    process.env.NODE_ENV === 'production'
      ? 'https://api-node-lr3u.onrender.com'
      : 'http://localhost:8081';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);
    setLoading(true);

    try {
      const response = await axios.post(`${baseUrl}/login`, { email, senha });

      if (response.data.success) {
        setMessage(`Bem-vindo(a), ${response.data.user.nome}!`);
      } else {
        setMessage('Erro ao realizar login. Verifique suas credenciais.');
      }
    } catch (error: any) {
      console.error('Erro no login:', error);
      setMessage('Erro ao realizar login. Tente novamente mais tarde.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <Navbar />
      <div className="login-box">
        <form className="login-form" onSubmit={handleSubmit}>
          <h3>Login</h3>
          <div className="login-input">
            <span className="icon">📧</span>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Digite seu email"
              required
            />
          </div>
          <div className="login-input">
            <span className="icon">🔒</span>
            <input
              type="password"
              id="senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              placeholder="Digite sua senha"
              required
            />
          </div>
          <button type="submit" className="login-button" disabled={loading}>
            {loading ? 'Carregando...' : 'Entrar'}
          </button>
        </form>
        {message && (
          <p className={message.includes('Bem-vindo') ? 'success' : 'error-message'}>{message}</p>
        )}
      </div>
    </div>
  );
};

export default LoginPage;
