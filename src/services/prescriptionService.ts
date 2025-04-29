import { apiUrlLocal } from './api';

export const buscarPrescricoesPaciente = async () => {
  const response = await apiUrlLocal.get('/prescricoes/paciente');
  return response.data;
};
