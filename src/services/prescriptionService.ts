import { apiUrl } from './api';

export const buscarPrescricoesPaciente = async () => {
  const response = await apiUrl.get('/prescricoes/paciente');
  return response.data;
};
