import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ListaConsultas.css';

interface Consulta {
  id: number;
  dataHora: string;
  observacoes: string;
  patient: {
    nome: string;
  };
}

const ListaConsultas: React.FC = () => {
  const [consultas, setConsultas] = useState<Consulta[]>([]);
  const [erro, setErro] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    axios.get('http://localhost:8080/consultas/profissional', {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(res => setConsultas(res.data))
    .catch(() => setErro('Erro ao carregar as consultas.'));
  }, []);

  return (
    <div className="lista-consultas">
      <h2>Consultas Agendadas</h2>

      {erro && <p className="erro">{erro}</p>}

      {consultas.length === 0 ? (
        <p>Nenhuma consulta agendada.</p>
      ) : (
        consultas.map(c => (
          <div key={c.id} className="consulta">
            <p><strong>Paciente:</strong> {c.patient.nome}</p>
            <p><strong>Data:</strong> {new Date(c.dataHora).toLocaleString()}</p>
            <p><strong>Observações:</strong> {c.observacoes}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default ListaConsultas;
