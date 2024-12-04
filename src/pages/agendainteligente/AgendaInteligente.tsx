import React, { useState, useEffect } from 'react';
import './AgendaInteligente.css';
import { Navbar } from '../../components/navbar/Navbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLightbulb, faTrash } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

interface AgendaItem {
  id: number;
  titulo: string;
  descricao: string;
  data: string;
  hora: string;
  status: string;
  user: {
    nome: string;
    email: string;
    cpf: string;
  };
}

const AgendaInteligente: React.FC = () => {
  const navigate = useNavigate();
  const [agenda, setAgenda] = useState<AgendaItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Função para buscar agendamentos
  useEffect(() => {
    const fetchAgenda = async () => {
      try {
        const response = await fetch('https://api-node-lr3u.onrender.com/agenda');
        if (!response.ok) {
          throw new Error('Erro ao carregar agendamentos');
        }
        const data = await response.json();

        if (data.success && data.compromissos) {
          setAgenda(data.compromissos); // Ajustado para 'compromissos' da resposta do backend
          setError(null);
        } else {
          setAgenda([]);
          setError('Nenhum agendamento encontrado.');
        }
      } catch (err) {
        console.error('Erro ao carregar a agenda:', err);
        setError('Não foi possível carregar os agendamentos.');
      } finally {
        setLoading(false);
      }
    };

    fetchAgenda();
  }, []);

  // Função para deletar um agendamento
  const handleDelete = async (id: number) => {
    if (window.confirm('Tem certeza que deseja deletar este agendamento?')) {
      try {
        const response = await fetch(`https://api-node-lr3u.onrender.com/agenda/${id}`, {
          method: 'DELETE',
        });

        if (!response.ok) {
          throw new Error('Erro ao deletar o agendamento');
        }

        // Remove o item deletado da lista local
        setAgenda((prevAgenda) => prevAgenda.filter((item) => item.id !== id));
        alert('Agendamento deletado com sucesso!');
      } catch (err) {
        console.error('Erro ao deletar agendamento:', err);
        alert('Erro ao deletar o agendamento.');
      }
    }
  };

  return (
    <div className="agenda-inteligente-container">
      <Navbar />
      <div className="agenda-content">
        <h2>
          <FontAwesomeIcon icon={faLightbulb} /> Agenda Inteligente
        </h2>
        {loading ? (
          <div className="loader">Carregando...</div>
        ) : error ? (
          <div className="error-message">{error}</div>
        ) : agenda.length === 0 ? (
          <div className="empty-message">Nenhum agendamento encontrado.</div>
        ) : (
          <div className="agenda-list">
            {agenda.map((item) => (
              <div key={item.id} className="agenda-item">
                <h3>{item.titulo}</h3>
                <p>{item.descricao || 'Sem descrição'}</p>
                <p>
                  <strong>Data:</strong>{' '}
                  {new Date(item.data).toLocaleDateString('pt-BR')}
                </p>
                <p>
                  <strong>Hora:</strong> {item.hora}
                </p>
                <p>
                  <strong>Status:</strong> {item.status}
                </p>
                <p>
                  <strong>Profissional:</strong> {item.user.nome} (
                  {item.user.email})
                </p>
                <button
                  className="delete-button"
                  onClick={() => handleDelete(item.id)}
                >
                  <FontAwesomeIcon icon={faTrash} /> Deletar
                </button>
              </div>
            ))}
          </div>
        )}
        <button
          className="add-event-button"
          onClick={() => navigate('/createagenda')}
        >
          + Adicionar Novo Evento
        </button>
      </div>
    </div>
  );
};

export default AgendaInteligente;

