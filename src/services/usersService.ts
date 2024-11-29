import { apiUrl, apiUrlLocal } from './api';

// Determina se a aplicação está rodando localmente
const isLocal = window.location.hostname === 'localhost';
const api = isLocal ? apiUrlLocal : apiUrl;

// Função para criar usuário
export const createUser = async (userData: FormData): Promise<any> => {
  try {
    const response = await api.post('/users', userData, {
      headers: {
        'Content-Type': 'multipart/form-data', // Tipo correto para envio de arquivos
      },
    });
    return response.data;
  } catch (error: any) {
    console.error('Erro ao enviar dados para o backend:', error.response || error.message);
    throw new Error(error.response?.data?.message || 'Erro ao criar o usuário.');
  }
};

// Função para buscar usuário por CPF
export const getUserByCpf = async (cpf: string): Promise<any> => {
  try {
    const response = await api.get(`/users/${cpf}`);
    return response.data;
  } catch (error: any) {
    console.error('Erro ao buscar dados do usuário:', error.response || error.message);
    throw new Error(error.response?.data?.message || 'Erro ao buscar o usuário.');
  }
};

// Função para atualizar usuário
export const updateUser = async (cpf: string, userData: FormData): Promise<any> => {
  try {
    const response = await api.put(`/users/${cpf}`, userData, {
      headers: {
        'Content-Type': 'multipart/form-data', // Tipo correto para envio de arquivos
      },
    });
    return response.data;
  } catch (error: any) {
    console.error('Erro ao atualizar dados do usuário:', error.response || error.message);
    throw new Error(error.response?.data?.message || 'Erro ao atualizar o usuário.');
  }
};

// Função para deletar usuário
export const deleteUser = async (cpf: string): Promise<any> => {
  try {
    const response = await api.delete(`/users/${cpf}`);
    return response.data;
  } catch (error: any) {
    console.error('Erro ao deletar usuário:', error.response || error.message);
    throw new Error(error.response?.data?.message || 'Erro ao deletar o usuário.');
  }
};
