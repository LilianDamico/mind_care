import { apiUrl } from './api'; 


export const getUser = async (id: string) => {
  try {
    const response = await apiUrl.get(`/users/${id}`);
    return response.data;
  } catch (error) {
    console.error('Erro ao obter os dados do usuário:', error);
    throw error;
  }
};


export const createUser = async (userData: any) => {
  try {
    const response = await apiUrl.post('/users', userData);
    return response.data;
  } catch (error) {
    console.error('Erro ao cadastrar o usuário:', error);
    throw error;
  }
};
