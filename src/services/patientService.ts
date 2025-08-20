import { apiUrl } from './api';

export const buscarPacienteLogado = async () => {
  const response = await apiUrl.get('/pacientes/me');
  return response.data;
};
