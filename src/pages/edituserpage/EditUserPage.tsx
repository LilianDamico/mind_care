import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './EditUserPage.css';
import { Navbar } from '../../components/navbar/Navbar';

const EditUserPage = () => {
  const { id } = useParams(); // Obtém o ID do usuário a partir da URL
  const navigate = useNavigate(); // Para redirecionar após atualização

  const [formData, setFormData] = useState({
    id: '',
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

  // Função para buscar os dados do usuário por ID
  const fetchUserById = async (userId: string) => {
    try {
      setLoading(true);
      const response = await axios.get(`https://api-node-vjiq.onrender.com/users/${userId}`);
      setFormData(response.data.user);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setError('Erro ao carregar os dados do usuário.');
      setLoading(false);
    }
  };

  // Busca os dados do usuário ao carregar a página
  useEffect(() => {
    if (id) fetchUserById(id);
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
      await axios.put(`https://api-node-vjiq.onrender.com/users/${id}`, formData);
      alert('Usuário atualizado com sucesso!');
      navigate('/userslist'); // Redireciona para a lista de usuários
    } catch (err) {
      console.error(err);
      setError('Erro ao atualizar o usuário.');
    }
  };

  // Cancela a edição e redireciona
  const handleCancel = () => {
    navigate('/userslist');
  };

  if (loading) return <p>Carregando...</p>;
  if (error) return <p className="error">{error}</p>;

  return (
    <div className="edit-user-container">
      <Navbar />
      <h2>Atualizar Cadastro</h2>
      <div>
        <form className="update-user-form" onSubmit={handleSubmit}>
          <div>
            <label>ID:</label>
            <input type="text" value={formData.id} readOnly />
          </div>
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
            <label>Registro</label>
            <input type="text" value={formData.registro} readOnly />
          </div>          
        </form>
        <div className="form-buttons">
          <button 
          type="submit" 
          className="update-button"
          onClick={handleSubmit}
          >
            Salvar
          </button>
          <button 
          type="button" 
          className="cancel-button" 
          onClick={handleCancel}>
            Cancelar
          </button>
        </div>
      </div>      
    </div>
  );
};

export default EditUserPage;
