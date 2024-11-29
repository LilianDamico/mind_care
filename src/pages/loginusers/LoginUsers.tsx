import React, { useState } from 'react';
import './LoginUsers.css';
import { useNavigate } from 'react-router-dom';
import { Navbar } from '../../components/navbar/Navbar';

const LoginUsers: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>('');
  const [cpf, setCpf] = useState<string>('');
  const [senha, setSenha] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setLoading(true);

    // Validação básica antes de enviar
    if (!email || !cpf || !senha) {
      setErrorMessage('Por favor, preencha todos os campos.');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('http://localhost:8081/loginusers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, cpf, senha }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Erro ao fazer login');
      }

      const data = await response.json();

      // Armazena o token e o CPF no localStorage
      localStorage.setItem('userToken', data.token);
      localStorage.setItem('userCPF', cpf); // Salva o CPF do usuário para verificar a sessão

      alert('Login realizado com sucesso!');
      navigate('/agendainteligente'); // Redireciona para a página da Agenda Inteligente
    } catch (err) {
      setErrorMessage(err instanceof Error ? err.message : 'Erro desconhecido');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="log-users-container">
      <Navbar />
      <div className="log-users-box">
        <h2>Login de Profissionais</h2>
        <form onSubmit={handleSubmit}>
          <div className="log-users-form">
            <label htmlFor="email">E-mail</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Digite seu e-mail"
              required
            />
          </div>
          <div className="log-users-form">
            <label htmlFor="cpf">CPF</label>
            <input
              type="text"
              id="cpf"
              value={cpf}
              onChange={(e) => setCpf(e.target.value)}
              placeholder="Digite seu CPF"
              required
            />
          </div>
          <div className="log-users-form">
            <label htmlFor="senha">Senha</label>
            <input
              type="password"
              id="senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              placeholder="Digite sua senha"
              required
            />
          </div>
          {errorMessage && <p className="error-message">{errorMessage}</p>}
          <div>
            <button type="submit" className="log-users-button" disabled={loading}>
              {loading ? 'Entrando...' : 'Entrar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginUsers;
