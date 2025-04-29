import { apiUrl } from './api';

export const consultarInteracoes = async (medicamento: string) => {
  const token = localStorage.getItem('token');
  const response = await apiUrl.get(`/anvisa/interacoes/${medicamento}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
