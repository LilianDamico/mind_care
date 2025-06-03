import { apiUrlLocal } from './api';

export interface Profissional {
  id: number;
  nome: string;
  email?: string;
  telefone?: string;
  // Adicione outros campos conforme o backend retornar
}

export interface Appointment {
  id: number;
  dataHora: string;
  status: string;
  observacoes?: string;
  profissional?: Profissional; // <- incluído para uso no dashboard do paciente
}

export const listarConsultasPaciente = async (): Promise<Appointment[]> => {
  const response = await apiUrlLocal.get('/consultas/paciente');
  return response.data;
};

export const listarConsultasProfissional = async (): Promise<Appointment[]> => {
  const response = await apiUrlLocal.get('/consultas/profissional');
  return response.data;
};

export const agendarConsulta = async (novaConsulta: {
  pacienteId: number;
  dataHora: string;
  observacoes?: string;
  profissionalId: number; // <--- Adicionado aqui
}): Promise<Appointment> => {
  const response = await apiUrlLocal.post('/consultas', novaConsulta);
  return response.data;
};

export const cancelarConsulta = async (consultaId: number): Promise<void> => {
  await apiUrlLocal.put(`/consultas/${consultaId}/cancelar`);
};