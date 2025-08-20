import React, { useEffect, useState } from 'react';
import { apiUrl } from '../../services/api';
import './MedicalRecordsList.css';

interface MedicalRecord {
  id: number;
  data: string;
  diagnostico: string;
  observacoes: string;
  // outros campos
}

interface MedicalRecordsListProps {
  patientId: number;
}

const MedicalRecordsList: React.FC<MedicalRecordsListProps> = ({ patientId }) => {
  const [registros, setRegistros] = useState<MedicalRecord[]>([]);
  const [mensagem, setMensagem] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!patientId) return;
    setLoading(true);
    setMensagem('');
    const token = localStorage.getItem('token');
    apiUrl.get(`/medicalrecords/patient/${patientId}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(res => {
      setRegistros(res.data);
      setLoading(false);
    })
    .catch(() => {
      setMensagem('Erro ao carregar registros médicos.');
      setLoading(false);
    });
  }, [patientId]);

  if (loading) return <p>Carregando registros...</p>;
  if (mensagem) return <p>{mensagem}</p>;
  if (registros.length === 0) return <p>Nenhum prontuário encontrado.</p>;

  return (
    <div className="medical-records-list">
      {registros.map((r) => (
        <div key={r.id} className="registro">
          <p><strong>Data:</strong> {new Date(r.data).toLocaleDateString()}</p>
          <p><strong>Diagnóstico:</strong> {r.diagnostico}</p>
          <p><strong>Observações:</strong> {r.observacoes}</p>
        </div>
      ))}
    </div>
  );
};

export default MedicalRecordsList;
