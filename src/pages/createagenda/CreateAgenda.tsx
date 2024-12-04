import React, { useState, useEffect } from 'react';
import { Navbar } from '../../components/navbar/Navbar';
import './CreateAgenda.css';

// Interface para os itens da agenda
interface AgendaItem {
  id: number;
  titulo: string;
  descricao: string;
  data: string;
  hora: string;
}

const CreateAgenda: React.FC = () => {
  const [agenda, setAgenda] = useState<AgendaItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Estado para os campos do formulário
  const [formValues, setFormValues] = useState<AgendaItem>({
    id: 0,
    titulo: '',
    descricao: '',
    data: '',
    hora: '',
  });

  const userCPF = localStorage.getItem('userCPF'); // Obter CPF do usuário autenticado

  useEffect(() => {
    const fetchAgenda = async () => {
      if (!userCPF) {
        setError('Usuário não autenticado.');
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(
          `https://api-node-lr3u.onrender.com/agenda/user/${userCPF}`, 
          {
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('userToken')}`,
              'Content-Type': 'application/json',
            },
          }
        );

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Erro ao carregar os dados da agenda.');
        }

        const data = await response.json();
        setAgenda(data.agenda);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erro desconhecido.');
      } finally {
        setLoading(false);
      }
    };

    fetchAgenda();
  }, [userCPF]);

  // Função para criar agendamento
  const handleCreate = async () => {
    try {
      const response = await fetch('https://api-node-lr3u.onrender.com/agenda', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('userToken')}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...formValues, userCPF }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Erro ao criar o agendamento.');
      }

      const newAgenda = await response.json();
      setAgenda((prev) => [...prev, newAgenda]);
      setFormValues({ id: 0, titulo: '', descricao: '', data: '', hora: '' }); // Reset do formulário
      alert('Agendamento criado com sucesso!');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro desconhecido.');
    }
  };

  // Função para atualizar agendamento
  const handleUpdate = async () => {
    try {
      const response = await fetch(`https://api-node-lr3u.onrender.com/agenda/${formValues.id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('userToken')}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...formValues, userCPF }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Erro ao atualizar o agendamento.');
      }

      const updatedAgenda = await response.json();
      setAgenda((prev) =>
        prev.map((item) => (item.id === formValues.id ? updatedAgenda : item))
      );
      setFormValues({ id: 0, titulo: '', descricao: '', data: '', hora: '' }); // Reset do formulário
      alert('Agendamento atualizado com sucesso!');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro desconhecido.');
    }
  };

  // Função para deletar agendamento
  const handleDelete = async (id: number) => {
    try {
      const response = await fetch(`https://api-node-lr3u.onrender.com/agenda/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('userToken')}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Erro ao excluir o agendamento.');
      }

      setAgenda((prev) => prev.filter((item) => item.id !== id));
      alert('Agendamento excluído com sucesso!');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro desconhecido.');
    }
  };

  // Função para preencher o formulário com dados para edição
  const handleEdit = (item: AgendaItem) => {
    setFormValues(item);
  };

  return (
    <div className="createagenda-container">
      <Navbar />
      <div className="agenda-content">
        <h2>Agenda Inteligente</h2>

        <div className="form-section">
          <h3>{formValues.id ? 'Editar Agendamento' : 'Novo Agendamento'}</h3>
          <div className="form-group">
            <label htmlFor="titulo">Título</label>
            <input
              type="text"
              id="titulo"
              value={formValues.titulo}
              onChange={(e) => setFormValues({ ...formValues, titulo: e.target.value })}
            />
          </div>
          <div className="form-group">
            <label htmlFor="descricao">Descrição</label>
            <textarea
              id="descricao"
              value={formValues.descricao}
              onChange={(e) => setFormValues({ ...formValues, descricao: e.target.value })}
            />
          </div>
          <div className="form-group">
            <label htmlFor="data">Data</label>
            <input
              type="date"
              id="data"
              value={formValues.data}
              onChange={(e) => setFormValues({ ...formValues, data: e.target.value })}
            />
          </div>
          <div className="form-group">
            <label htmlFor="hora">Hora</label>
            <input
              type="time"
              id="hora"
              value={formValues.hora}
              onChange={(e) => setFormValues({ ...formValues, hora: e.target.value })}
            />
          </div>
          <button
            onClick={formValues.id ? handleUpdate : handleCreate}
            className="save-button"
          >
            {formValues.id ? 'Atualizar' : 'Criar'}
          </button>
        </div>

        {loading ? (
          <div className="loader">Carregando...</div>
        ) : error ? (
          <div className="error-message">Erro: {error}</div>
        ) : agenda.length === 0 ? (
          <div className="empty-message">Nenhum agendamento encontrado.</div>
        ) : (
          <ul className="agenda-list">
            {agenda.map((item) => (
              <li key={item.id} className="agenda-item">
                <h3>{item.titulo}</h3>
                <p>{item.descricao}</p>
                <p>
                  <strong>Data:</strong> {new Date(item.data).toLocaleDateString('pt-BR')}
                </p>
                <p>
                  <strong>Hora:</strong> {item.hora}
                </p>
                <button onClick={() => handleEdit(item)} className="edit-button">
                  Editar
                </button>
                <button onClick={() => handleDelete(item.id)} className="delete-button">
                  Deletar
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default CreateAgenda;
