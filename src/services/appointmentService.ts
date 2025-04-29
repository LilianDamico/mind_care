// src/services/appointmentService.ts
import { apiUrlLocal } from './api';

export interface Appointment {
  id: number;
  dataHora: string;
  status: string;
  observacoes?: string;
}

export const listarConsultasPaciente = async () => {
  const response = await apiUrlLocal.get('/consultas/paciente');
  return response.data;
};

export const listarConsultasProfissional = async () => {
  const response = await apiUrlLocal.get('/consultas/profissional');
  return response.data;
};

export const agendarConsulta = async (novaConsulta: {
  pacienteId: number;
  dataHora: string;
  observacoes?: string;
}) => {
  const response = await apiUrlLocal.post('/consultas', novaConsulta);
  return response.data;
};

export const cancelarConsulta = async (consultaId: number) => {
  const response = await apiUrlLocal.put(`/consultas/${consultaId}/cancelar`);
  return response.data;
};
