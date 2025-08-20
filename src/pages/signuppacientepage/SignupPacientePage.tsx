import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiUrl } from '../../services/api';
import './SignupPacientePage.css';

const SignupPacientePage: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    senha: '',
    tenantId: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await apiUrl.post('/users', { ...formData, tipo: 'PACIENTE' });
      navigate('/loginpage');
    } catch (error) {
      alert('Erro ao cadastrar paciente.');
    }
  };

  return (
    <div className="signuppaciente-container">
      <form onSubmit={handleSubmit}>
        <h2>Cadastrar Paciente</h2>
        <input name="nome" placeholder="Nome" onChange={handleChange} required />
        <input name="email" type="email" placeholder="Email" onChange={handleChange} required />
        <input name="senha" type="password" placeholder="Senha" onChange={handleChange} required />
        <input name="tenantId" placeholder="Tenant ID (opcional)" onChange={handleChange} />
        <button type="submit">Cadastrar</button>
      </form>
    </div>
  );
};

export default SignupPacientePage;
