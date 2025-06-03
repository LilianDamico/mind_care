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
  profissional: {
    id: number;
    nome: string;
  } | null;
}

export interface ConsultaDTO {
  pacienteId: number;
  profissionalId: number;
  dataHora: string;
  observacoes?: string;
}

export const agendarConsulta = async (consulta: ConsultaDTO) => {
  return await api.post('/consultas', consulta);
};

export const listarConsultasPaciente = async (pacienteId: number): Promise<Appointment[]> => {
  return await api.get(`/consultas/paciente/${pacienteId}`).then(res => res.data);
};
