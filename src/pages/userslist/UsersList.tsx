import React, { useEffect, useState } from 'react';
import './UsersList.css';
import axios from 'axios';
import { Navbar } from '../../components/navbar/Navbar';

interface User {
  id: number;
  nome: string;
  cpf: string;
  email: string;
  telefone: string;
  profissao: string;
  especialidade: string;
  registro: string;
  foto: string;
}

const UsersList: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>(''); // Estado para o campo de pesquisa
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Define a URL base com base no ambiente
  const baseUrl =
    process.env.NODE_ENV === 'production'
      ? 'https://api-node-vjiq.onrender.com'
      : 'http://localhost:8081';

  // Função para carregar a lista de usuários
  const fetchUsers = async (query?: string) => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(`${baseUrl}/users`, {
        params: query ? { query } : undefined, // Passa o termo de pesquisa se disponível
      });
      setUsers(response.data.users || []);
    } catch (err: any) {
      setError('Erro ao carregar usuários.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers(); // Carrega todos os usuários inicialmente
  }, []);

  // Função para realizar a busca
  const handleSearch = () => {
    if (searchTerm.trim()) {
      fetchUsers(searchTerm);
    } else {
      fetchUsers(); // Carrega todos os usuários se o termo de busca estiver vazio
    }
  };

  return (
    <div className="userslist-container">
      <Navbar />
      <h1 className="userslist-h1">Consulta de Profissionais</h1>

      <div className="userslist-search">
        <input
          type="text"
          placeholder="Pesquise por nome, profissão ou especialidade..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button onClick={handleSearch} className="search-button">
          Buscar
        </button>
      </div>

      {loading ? (
        <p>Carregando...</p>
      ) : error ? (
        <p className="error">{error}</p>
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
              <th>Foto</th>
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
                <td className='userslist-foto'>
                  {user.foto ? (
                    <img
                      src={user.foto}
                      alt={`Foto de ${user.nome}`}
                      style={{
                        width: '50px',
                        height: '50px',
                        borderRadius: '50%',
                        objectFit: 'cover',
                      }}
                    />
                  ) : (
                    'Sem foto'
                  )}
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
