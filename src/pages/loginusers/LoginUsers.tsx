import React, { useState } from 'react';
import { apiUrl } from '../../services/api';
import './LoginUsers.css';
import { Navbar } from '../../components/navbar/Navbar';

const LoginUsers: React.FC = () => {
  const [cpf, setCpf] = useState('');
  const [senha, setSenha] = useState('');
  const [message, setMessage] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);

    try {
      const response = await apiUrl.post('/loginusers', { cpf, senha });
      setMessage(response.data.message);
      // Limpa os campos após sucesso
      setCpf('');
      setSenha('');
    } catch (error: any) {
      if (error.response) {
        setMessage(error.response.data.message);
      } else {
        setMessage('Erro ao conectar com o servidor.');
      }
    }
  };

  return (
    <div className="log-users-container">
      <Navbar />
      <div className="log-users-box">
        <h2>Login</h2>
        <form className="log-users-form" onSubmit={handleLogin}>
          <label htmlFor="cpf">CPF</label>
          <input
            type="text"
            id="cpf"
            value={cpf}
            onChange={(e) => setCpf(e.target.value)}
            placeholder="Digite seu CPF"
            required
          />

          <label htmlFor="senha">Senha</label>
          <input
            type="password"
            id="senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            placeholder="Digite sua senha"
            required
          />

          <button type="submit" className="log-users-button">
            Entrar
          </button>
        </form>

        {message && <p className="log-users-message">{message}</p>}
      </div>
    </div>
  );
};

export default LoginUsers;
