import React, { useEffect, useState } from 'react';
import { apiUrl } from '../../services/api';
import './ListaPrescricoes.css';

interface Patient {
  nome: string;
}

interface Prescription {
  id: number;
  data: string;
  descricao: string;
  indicacoes: string;
  contraIndicacoes: string;
  efeitosColaterais: string;
  patient: Patient;
}

const ListaPrescricoes: React.FC = () => {
  const [prescricoes, setPrescricoes] = useState<Prescription[]>([]);
  const [erro, setErro] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    apiUrl.get('/prescricoes/profissional', {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(res => setPrescricoes(res.data))
    .catch(() => setErro('Erro ao carregar prescrições.'));
  }, []);

  return (
    <div className="lista-prescricoes">
      <h1>Prescrições</h1>

      {erro && <p className="mensagem-erro">{erro}</p>}

      {prescricoes.length === 0 ? (
        <p>Nenhuma prescrição encontrada.</p>
      ) : (
        prescricoes.map(p => (
          <div key={p.id} className="prescricao">
            <p><strong>Paciente:</strong> {p.patient.nome}</p>
            <p><strong>Data:</strong> {new Date(p.data).toLocaleDateString()}</p>
            <p><strong>Descrição:</strong> {p.descricao}</p>
            <p><strong>Indicações:</strong> {p.indicacoes}</p>
            <p><strong>Contraindicações:</strong> {p.contraIndicacoes}</p>
            <p><strong>Efeitos Colaterais:</strong> {p.efeitosColaterais}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default ListaPrescricoes;
