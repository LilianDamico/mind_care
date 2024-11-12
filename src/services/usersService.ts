// usersService.ts
import { apiUrl, apiUrlLocal } from './api';

const isLocal = window.location.hostname === 'localhost';

export const createUser = async (userData: any) => {
  try {
    const api = isLocal ? apiUrlLocal : apiUrl; // Usar a API local se estiver em localhost

    const response = await api.post('/users', userData); 
    return response.data;
  } catch (error) {
    console.error('Erro ao enviar dados para o backend:', error);
    throw error;
  }
};
