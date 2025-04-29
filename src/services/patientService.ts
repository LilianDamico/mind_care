import { apiUrlLocal } from './api';

export const buscarPacienteLogado = async () => {
  const response = await apiUrlLocal.get('/pacientes/me');
  return response.data;
};
