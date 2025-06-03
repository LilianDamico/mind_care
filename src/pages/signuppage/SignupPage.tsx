import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiUrl } from '../../services/api';
import './SignupPage.css';

const SignupPage: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    senha: '',
    tipo: 'PACIENTE',
    tenantId: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await apiUrl.post('/usuarios', formData);
      navigate('/loginpage');
    } catch (error) {
      console.error('Erro ao cadastrar usuário:', error);
    }
  };

  return (
    <div className="signup-container">
      <form onSubmit={handleSubmit}>
        <h2>Cadastrar-se</h2>
        <input name="nome" placeholder="Nome" onChange={handleChange} required />
        <input name="email" type="email" placeholder="Email" onChange={handleChange} required />
        <input name="senha" type="password" placeholder="Senha" onChange={handleChange} required />
        <select name="tipo" onChange={handleChange}>
          <option value="PACIENTE">Paciente</option>
          <option value="PROFISSIONAL">Profissional</option>
        </select>
        <input name="tenantId" placeholder="Tenant ID (opcional)" onChange={handleChange} />
        <button type="submit">Cadastrar</button>
      </form>
    </div>
  );
};

export default SignupPage;
