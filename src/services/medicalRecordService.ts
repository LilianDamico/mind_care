import { apiUrlLocal } from './api';

export const buscarHistoricoMedico = async () => {
  const response = await apiUrlLocal.get('/prontuarios/me');
  return response.data;
};
