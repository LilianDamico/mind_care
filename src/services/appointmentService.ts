import axios from 'axios';

const baseURL = process.env.REACT_APP_API_URL || 'http://localhost:8081';

const api = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

export interface Appointment {
  id: number;
  dataHora: string;
  status: 'AGENDADA' | 'REALIZADA' | 'CANCELADA';
  observacoes?: string;
  pacienteId: number;
  profissionalId: number;
  paciente?: { id: number; nome: string } | null;  // <-- novo
  profissional: { id: number; nome: string } | null;
}

export interface ConsultaDTO {
  pacienteId: number;
  profissionalId: number;
  dataHora: string;
  observacoes?: string;
}

export const agendarConsulta = async (consulta: ConsultaDTO) => {
  const token = localStorage.getItem('token');
  console.log("Token usado no agendamento:", token);
  return await api.post('/consultas', consulta, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const listarConsultasPaciente = async (pacienteId: number): Promise<Appointment[]> => {
  const token = localStorage.getItem('token');
  return await api.get(`/consultas/paciente/${pacienteId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then(res => res.data);
};

export const listarConsultasProfissional = async (profissionalId: number): Promise<Appointment[]> => {
  const token = localStorage.getItem('token');
  return await api.get(`/consultas/profissional/${profissionalId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then(res => res.data);
};
