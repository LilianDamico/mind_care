import React, { useEffect, useState, useCallback } from 'react';
import './UsersList.css';
import axios from 'axios';
import { Navbar } from '../../components/navbar/Navbar';
import { useNavigate } from 'react-router-dom';

interface User {
  id: number;
  nome: string;
  cpf: string;
  email: string;
  telefone: string;
  profissao: string;
  especialidade: string;
  registro: string;
}

const UsersList: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  // Função para carregar a lista de usuários
  const fetchUsers = useCallback(async () => {
    try {
      const token = localStorage.getItem('authToken');
      const response = await axios.get('https://api-node-vjiq.onrender.com/users', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(response.data.users);
      setLoading(false);
    } catch (err: any) {
      setError('Erro ao carregar usuários.');
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  // Função para redirecionar o usuário para a página de edição
  const updateUser = (id: number) => {
    navigate(`/edituserpage/${id}`);
  };

  // Função para deletar um usuário
  const deleteUser = async (id: number) => {
    if (window.confirm('Tem certeza que deseja deletar este usuário?')) {
      try {
        const token = localStorage.getItem('authToken');
        await axios.delete(`https://api-node-vjiq.onrender.com/users/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUsers(users.filter((user) => user.id !== id));
      } catch (err) {
        setError('Erro ao deletar usuário.');
      }
    }
  };

  return (
    <div className="userslist-container">
      <Navbar />
      <h1 className="userslist-h1">Lista de Usuários</h1>

      {loading ? (
        <p>Carregando...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <table className="userslist-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>CPF</th>
              <th>Email</th>
              <th>Telefone</th>
              <th>Profissão</th>
              <th>Especialidade</th>
              <th>Registro</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.nome}</td>
                <td>{user.cpf}</td>
                <td>{user.email}</td>
                <td>{user.telefone}</td>
                <td>{user.profissao}</td>
                <td>{user.especialidade}</td>
                <td>{user.registro}</td>
                <td>
                  <button
                    className="userslist-button"
                    onClick={() => updateUser(user.id)}
                  >
                    Update
                  </button>
                  <button
                    className="userslist-button"
                    onClick={() => deleteUser(user.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default UsersList;
