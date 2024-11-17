import { apiUrl, apiUrlLocal } from './api';

const isLocal = window.location.hostname === 'localhost';
const api = isLocal ? apiUrlLocal : apiUrl;

// Função para criar usuário
export const createUser = async (userData: any) => {
  try {
    const response = await api.post('/users', userData);
    return response.data;
  } catch (error) {
    console.error('Erro ao enviar dados para o backend:', error);
    throw error;
  }
};


export const getUserById = async (id: string) => {
  try {
    const response = await api.get(`/users/${id}`);
    return response.data; // Retorna os dados do usuário
  } catch (error) {
    console.error('Erro ao buscar dados do usuário:', error);
    throw error;
  }
};

export const updateUser = async (id: string, userData: any) => {
  try {
    const response = await api.put(`/users/${id}`, userData);
    return response.data;
  } catch (error) {
    console.error('Erro ao atualizar dados do usuário:', error);
    throw error;
  }
};