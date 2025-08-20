import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiUrl } from '../../services/api';
import './SignupProfissionalPage.css';

const SignupProfissionalPage: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    senha: '',
    especialidade: '',
    cpf: '',
    registro: '',
    celular: '',
    endereco: '',
    telefone: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await apiUrl.post('/profissionais', formData);
      navigate('/loginpage');
    } catch (error) {
      alert('Erro ao cadastrar profissional.');
    }
  };

  return (
    <div className="signup-container">
      <form onSubmit={handleSubmit}>
        <h2>Cadastrar Profissional</h2>
        <input name="nome" placeholder="Nome" onChange={handleChange} required />
        <input name="email" type="email" placeholder="Email" onChange={handleChange} required />
        <input name="senha" type="password" placeholder="Senha" onChange={handleChange} required />
        <input name="especialidade" placeholder="Especialidade" onChange={handleChange} required />
        <input name="cpf" placeholder="CPF" onChange={handleChange} required />
        <input name="registro" placeholder="Registro" onChange={handleChange} required />
        <input name="celular" placeholder="Celular" onChange={handleChange} />
        <input name="endereco" placeholder="Endereço" onChange={handleChange} />
        <input name="telefone" placeholder="Telefone" onChange={handleChange} />
        <button type="submit">Cadastrar</button>
      </form>
    </div>
  );
};

export default SignupProfissionalPage;
