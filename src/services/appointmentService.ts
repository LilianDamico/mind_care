import axios from 'axios';

const baseURL = process.env.REACT_APP_API_URL || 'http://localhost:8081';

const api = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

export interface ConsultaDTO {
  pacienteId: number;
  profissionalId: number;
  dataHora: string;
  observacoes?: string;
}

export const agendarConsulta = async (consulta: ConsultaDTO) => {
  return await api.post('/consultas', consulta);
};
