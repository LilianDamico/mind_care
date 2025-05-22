import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiUrl } from '../../services/api';
import './SignupPage.css';

interface Clinica {
  id: number;
  nome: string;
}


const SignupPage: React.FC = () => {
  const navigate = useNavigate();

  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [tipo, setTipo] = useState<'PACIENTE' | 'PROFISSIONAL'>('PACIENTE');
  const [clinicaId, setClinicaId] = useState<number | null>(null);
  const [clinicas, setClinicas] = useState<Clinica[]>([]);

  useEffect(() => {
    if (tipo === 'PROFISSIONAL') {
      apiUrl.get('/clinicas')
        .then(res => setClinicas(res.data))
        .catch(err => console.error('Erro ao carregar clínicas:', err));
    }
  }, [tipo]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await apiUrl.post('/usuarios', {
        nome,
        email,
        senha,
        tipo,
        clinicaId: tipo === 'PROFISSIONAL' ? clinicaId : null
      });

      alert('Cadastro realizado com sucesso!');
      navigate('/loginpage');
    } catch (err) {
      alert('Erro ao cadastrar. Verifique os dados e tente novamente.');
    }
  };

  return (
    <div className="signup-container">
      <form className="signup-form" onSubmit={handleSubmit}>
        <h2>Criar Conta</h2>

        <label>Nome</label>
        <input value={nome} onChange={e => setNome(e.target.value)} required />

        <label>Email</label>
        <input type="email" value={email} onChange={e => setEmail(e.target.value)} required />

        <label>Senha</label>
        <input type="password" value={senha} onChange={e => setSenha(e.target.value)} required />

        <label>Tipo de Usuário</label>
        <select value={tipo} onChange={e => setTipo(e.target.value as 'PACIENTE' | 'PROFISSIONAL')}>
          <option value="PACIENTE">Paciente</option>
          <option value="PROFISSIONAL">Profissional</option>
        </select>

        {tipo === 'PROFISSIONAL' && (
          <div>
            <label htmlFor="clinica">Clínica (opcional)</label>
            <select
            id="clinica"
            value={clinicaId || ''}
            onChange={(e) => setClinicaId(e.target.value ? parseInt(e.target.value) : null)}
        >
          <option value="">Nenhuma</option>
          {clinicas.map((clinica) => (
            <option key={clinica.id} value={clinica.id}>
              {clinica.nome}
          </option>
          ))}
        </select>
      </div>
    )}


        <button type="submit">Cadastrar</button>
      </form>
    </div>
  );
};

export default SignupPage;
