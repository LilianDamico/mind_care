import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:8080',
});

export const consultarInteracoes = async (medicamento: string) => {
  const token = localStorage.getItem('token');
  const response = await API.get(`/anvisa/interacoes/${medicamento}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return response.data;
};
