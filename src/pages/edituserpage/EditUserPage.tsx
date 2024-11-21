import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './EditUserPage.css';
import { Navbar } from '../../components/navbar/Navbar';

const EditUserPage: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // Obtém o ID do usuário a partir da URL
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    nome: '',
    cpf: '',
    email: '',
    telefone: '',
    profissao: '',
    especialidade: '',
    registro: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Busca os dados do usuário ao carregar a página
  useEffect(() => {
    const fetchUserById = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem('authToken');
        const response = await axios.get(`https://api-node-vjiq.onrender.com/users/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setFormData(response.data.user);
        setLoading(false);
      } catch (err: any) {
        setError(err.response?.data?.message || 'Erro ao carregar os dados do usuário.');
        setLoading(false);
      }
    };

    fetchUserById();
  }, [id]);

  // Manipula as mudanças no formulário
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Envia os dados atualizados para o backend
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('authToken');
      await axios.put(`https://api-node-vjiq.onrender.com/users/${id}`, formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert('Usuário atualizado com sucesso!');
      navigate('/userslist');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Erro ao atualizar o usuário.');
    }
  };

  if (loading) return <p>Carregando...</p>;
  if (error) return <p className="error">{error}</p>;

  return (
    <div className="edit-user-container">
      <Navbar />
      <h2>Atualizar Cadastro</h2>
      <form className="update-user-form" onSubmit={handleSubmit}>
        <div>
          <label>Nome:</label>
          <input
            type="text"
            name="nome"
            value={formData.nome}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>CPF:</label>
          <input
            type="text"
            name="cpf"
            value={formData.cpf}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Telefone:</label>
          <input
            type="tel"
            name="telefone"
            value={formData.telefone}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Profissão:</label>
          <input
            type="text"
            name="profissao"
            value={formData.profissao}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Especialidade:</label>
          <input
            type="text"
            name="especialidade"
            value={formData.especialidade}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Registro:</label>
          <input type="text" value={formData.registro} readOnly />
        </div>
        <div className="form-buttons">
          <button type="submit" className="update-button">
            Salvar
          </button>
          <button type="button" className="cancel-button" onClick={() => navigate('/userslist')}>
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditUserPage;
