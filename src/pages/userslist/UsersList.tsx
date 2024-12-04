import React, { useCallback, useEffect, useState } from 'react';
import './UsersList.css';
import axios from 'axios';
import { Navbar } from '../../components/navbar/Navbar';

interface User {
  nome: string;
  cpf: string;
  email: string;
  telefone: string;
  profissao: string;
  especialidade: string;
  registro: string;
  endereco: string;
  comentarios: string;
  foto?: string | null;
}

const UsersList: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]); // Estado para armazenar os usuários
  const [searchTerm, setSearchTerm] = useState<string>(''); // Campo de busca
  const [loading, setLoading] = useState<boolean>(false); // Indicador de carregamento
  const [error, setError] = useState<string | null>(null); // Mensagem de erro

  // URL base configurada para a API
  const baseUrl = process.env.REACT_APP_API_URL || 'https://api-node-vjiq.onrender.com'; // URL para produção ou local

  // Função para buscar usuários
  const fetchUsers = useCallback(async (query?: string) => {
    setLoading(true);
    setError(null); // Reseta a mensagem de erro

    try {
      const response = await axios.get(`${baseUrl}/users`, {
        params: query ? { query } : undefined, // Passa o termo de busca, se houver
      });

      // Ajuste para o formato correto do retorno da API
      const data = response.data?.users?.rows || [];
      setUsers(data);
    } catch (err: unknown) {  // Definindo explicitamente o tipo do erro
      console.error('Erro ao buscar usuários:', err);

      // Verifica se o erro é uma instância de Error e trata a mensagem
      if (err instanceof Error) {
        setError(`Erro: ${err.message}`);
      } else {
        setError('Erro desconhecido ao carregar usuários.');
      }
    } finally {
      setLoading(false);
    }
  }, [baseUrl]);

  // Efeito para carregar os usuários na montagem do componente
  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  // Função para lidar com a busca
  const handleSearch = () => {
    if (searchTerm.trim()) {
      fetchUsers(searchTerm);
    } else {
      fetchUsers(); // Recarrega todos os usuários se o termo de busca estiver vazio
    }
  };

  return (
    <div className="userslist-container">
      <Navbar />
      <h1 className="userslist-h1">Consulta de Profissionais</h1>

      {/* Campo de busca */}
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

      {/* Mensagem de status */}
      {loading && <p>Carregando...</p>}
      {error && <p className="error">{error}</p>}

      {/* Tabela de usuários */}
      {!loading && !error && users.length > 0 && (
        <table className="userslist-table">
          <thead>
            <tr>
              <th>Nome</th>
              <th>CPF</th>
              <th>Email</th>
              <th>Telefone</th>
              <th>Profissão</th>
              <th>Especialidade</th>
              <th>Registro</th>
              <th>Endereço</th>
              <th>Foto</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={index}>
                <td>{user.nome || 'Não informado'}</td>
                <td>{user.cpf}</td>
                <td>{user.email || 'Não informado'}</td>
                <td>{user.telefone || 'Não informado'}</td>
                <td>{user.profissao || 'Não informado'}</td>
                <td>{user.especialidade || 'Não informado'}</td>
                <td>{user.registro || 'Não informado'}</td>
                <td>{user.endereco || 'Não informado'}</td>
                <td className="userslist-foto">
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

      {/* Mensagem caso não encontre usuários */}
      {!loading && !error && users.length === 0 && (
        <p className="no-results">Nenhum usuário encontrado.</p>
      )}
    </div>
  );
};

export default UsersList;
