import React, { useEffect, useState, useCallback } from 'react';
import './UsersList.css';
import axios from 'axios';

interface User {
  id: number;
  nome: string;
  cpf: string;
  email: string;
  telefone: string;
  profissao: string;
  especialidade: string;
}

interface UsersListProps {
  onUsersListLoad?: () => void;
}

const UsersList: React.FC<UsersListProps> = ({ onUsersListLoad }) => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Função para carregar a lista de usuários
  const fetchUsers = useCallback(async () => {
    try {
      const response = await axios.get('https://api-node-vjiq.onrender.com/users'); // Altere para sua URL de backend
      setUsers(response.data.users);
      setLoading(false);

      if (onUsersListLoad) {
        onUsersListLoad();
      }
    } catch (err) {
      setError('Erro ao carregar usuários.');
      setLoading(false);
    }
  }, [onUsersListLoad]); // O hook `useCallback` garante que a função seja memorizada

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]); // Agora `fetchUsers` está incluída como dependência

  // Função para deletar um usuário
  const deleteUser = async (id: number) => {
    if (window.confirm('Tem certeza que deseja deletar este usuário?')) {
      try {
        await axios.delete(`https://api-node-vjiq.onrender.com/users/${id}`); // Altere para sua URL de backend
        setUsers(users.filter(user => user.id !== id));
      } catch (err) {
        setError('Erro ao deletar usuário.');
      }
    }
  };

  // Função para atualizar um usuário
  const updateUser = (id: number) => {
    alert(`Redirecionando para atualizar o usuário com ID: ${id}`);
  };

  return (
    <div className='userslist-container'>
      <h1>Lista de Usuários</h1>

      {loading ? (
        <p>Carregando...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>CPF</th>
              <th>Email</th>
              <th>Telefone</th>
              <th>Profissão</th>
              <th>Especialidade</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.nome}</td>
                <td>{user.cpf}</td>
                <td>{user.email}</td>
                <td>{user.telefone}</td>
                <td>{user.profissao}</td>
                <td>{user.especialidade}</td>
                <td>
                  <button onClick={() => updateUser(user.id)}>Update</button>
                  <button onClick={() => deleteUser(user.id)}>Delete</button>
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
