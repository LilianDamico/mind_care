import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaLock } from 'react-icons/fa';
import { apiUrl } from '../../services/api'; 
import './Login.css';
import { Navbar } from '../../components/navbar/Navbar';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null); // Novo estado para mensagem de sucesso
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setSuccess(null); // Limpar mensagens anteriores
  
    if (!email || !password) {
      setError('Preencha todos os campos.');
      return;
    }
  
    try {
      const response = await apiUrl.post('/login', { email, senha: password });
  
      if (response.data.error) {
        setError(response.data.message);
      } else {
        const { token } = response.data;
        localStorage.setItem('authToken', token);
        setSuccess('Login efetuado com sucesso!'); // Exibir mensagem de sucesso
        setTimeout(() => {
          navigate('/'); // Redirecionar após 2 segundos
        }, 2000);
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Erro ao realizar login.');
    }
  };
  
  return (
    <div className="login-container">
      <Navbar />
      <div className='login-box'>
        <form className='login-form' onSubmit={handleLogin}>
          <h3>Login</h3>
          {error && <p className="error">{error}</p>} {/* Exibir erros */}
          {success && <p className="success">{success}</p>} {/* Exibir sucesso */}
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
            <button className='login-button' type="submit">Entrar</button>
          </div>          
        </form>
      </div>      
    </div>
  );
};

export default Login;
