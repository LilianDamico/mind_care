import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './MedicalRecordsList.css';

interface Patient {
  nome: string;
}

interface MedicalRecord {
  id: number;
  data: string;
  diagnostico: string;
  observacoes: string;
  patient: Patient;
}

const MedicalRecordsList: React.FC = () => {
  const [registros, setRegistros] = useState<MedicalRecord[]>([]);
  const [mensagem, setMensagem] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    axios.get('http://localhost:8080/medicalrecords/professional', {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(res => setRegistros(res.data))
    .catch(() => setMensagem('Erro ao carregar registros médicos.'));
  }, []);

  return (
    <div className="medical-records-list">
      <h1>Prontuários Médicos</h1>

      {mensagem && <p className="mensagem">{mensagem}</p>}

      {registros.length === 0 ? (
        <p>Nenhum prontuário encontrado.</p>
      ) : (
        registros.map((r) => (
          <div key={r.id} className="registro">
            <p><strong>Paciente:</strong> {r.patient.nome}</p>
            <p><strong>Data:</strong> {new Date(r.data).toLocaleDateString()}</p>
            <p><strong>Diagnóstico:</strong> {r.diagnostico}</p>
            <p><strong>Observações:</strong> {r.observacoes}</p>
            <a
              className="relatorio-btn"
              href={`http://localhost:8080/relatorio/registro/${r.id}/pdf`}
              target="_blank"
              rel="noopener noreferrer"
            >
              📄 Ver PDF
            </a>
          </div>
        ))
      )}
    </div>
  );
};

export default MedicalRecordsList;
