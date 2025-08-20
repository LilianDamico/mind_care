import { apiUrl } from './api';

// Buscar histórico médico de um paciente específico (pelo ID)
export const buscarHistoricoMedicoPorPacienteId = async (pacienteId: number) => {
  const response = await apiUrl.get(`/prontuarios/paciente/${pacienteId}`);
  return response.data;
};


export const buscarProntuarioPorPaciente = async (pacienteId: number) => {
  const response = await apiUrl.get(`/prontuarios/paciente/${pacienteId}`);
  return response.data;
};