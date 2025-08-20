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
      // Requisição de login
      const response = await apiUrl.post('/login', { email, senha });
      const { token, user } = response.data;

      console.log('TOKEN:', token);
      console.log('USER:', user)


      // Armazenar token
      localStorage.setItem('token', token);

      // Atualizar contexto global de autenticação
      login(user);

      // Redirecionamento baseado no tipo de usuário
      if (user.tipo === 'PROFISSIONAL') {
        navigate('/dashboard-profissional');
      } else if (user.tipo === 'PACIENTE') {
        navigate('/dashboard-paciente');
      } else {
        navigate('/dashboard');
      }

    } catch (err: any) {
      console.error('Erro de login:', err.response?.status, err.response?.data || err.message);
      setErro(
        'Usuário ou senha inválidos. ' +
        (err.response?.data?.message ? `(${err.response.data.message})` : '')
      );
    }
  };

  return (
    <div className="login-container">
      <form className='login-form' onSubmit={handleLogin}>
        <h2>Login</h2>
        {erro && <p className="erro">{erro}</p>}
        <input
          type="email"
          name="email"
          placeholder="E-mail"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          name="senha"
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
