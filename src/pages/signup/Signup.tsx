import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Signup.css';
import { FaUser, FaEnvelope, FaLock } from 'react-icons/fa';
import { Navbar } from '../../components/navbar/Navbar';

const Signup: React.FC = () => {
  const [nome, setNome] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [senha, setSenha] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const baseUrl = process.env.REACT_APP_API_URL || 'http://localhost:8081';

  // Hook do React Router para navegação
  const navigate = useNavigate();

  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!nome || !email || !senha) {
      setError('Por favor, preencha todos os campos.');
      return;
    }

    try {
      const response = await axios.post(`${baseUrl}/clientes`, { nome, email, senha });
      if (response.data.error) {
        setError(response.data.message);
      } else {
        setSuccess('Cliente registrado com sucesso!');
        setNome('');
        setEmail('');
        setSenha('');
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Erro ao registrar o cliente.');
    }
  };

  return (
    <div className="signup-container">
      <Navbar />
      <h2>Cadastre-se!</h2>
      <form className="signup-form" onSubmit={handleSignup}>
        {error && <p className="error">{error}</p>}
        {success && <p className="success">{success}</p>}
        
        <div className="input-group">
          <FaUser className="icon" />
          <input
            type="text"
            placeholder="Nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
          />
        </div>

        <div className="input-group">
          <FaEnvelope className="icon" />
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
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            required
          />
        </div>

        <button className="signup-button" type="submit">
          Registrar
        </button>
      </form>

      <div className='recovery-box'>
        <h6>Esqueceu a senha?</h6>
        <button 
          className="recovery-button" 
          onClick={() => navigate('/password-recovery')}>
          Clique aqui para recuperar sua senha
        </button>
      </div>      
    </div>
  );
};

export default Signup;
