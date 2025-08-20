// src/services/usersService.ts
import { apiUrl } from './api';

// Removido isLocal, pois apiUrl já gerencia o ambiente dinamicamente
// const isLocal = window.location.hostname === 'localhost'; // Não necessário

export const buscarUsuarioLogado = async () => {
  const response = await apiUrl.get('/usuarios/me');
  return response.data;
};

export interface UserFormInputs {
  nome: string;
  cpf: string;
  email: string;
  senha?: string;
  registro: string;
  endereco: string;
  telefone: string;
  profissao: string;
  especialidade: string;
  comentarios?: string;
}

// Função para criar usuário
export const createUser = async (userData: UserFormInputs): Promise<any> => {
  try {
    const response = await apiUrl.post('/users', userData, {
      headers: {
        'Content-Type': 'application/json', // Tipo correto para JSON
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
    const response = await apiUrl.get(`/users/${cpf}`);
    return response.data;
  } catch (error: any) {
    console.error('Erro ao buscar dados do usuário:', error.response || error.message);
    throw new Error(error.response?.data?.message || 'Erro ao buscar o usuário.');
  }
};

// Função para atualizar usuário
export const updateUser = async (cpf: string, userData: UserFormInputs): Promise<any> => {
  try {
    const response = await apiUrl.put(`/users/${cpf}`, userData, {
      headers: {
        'Content-Type': 'application/json', // Tipo correto para JSON
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
    const response = await apiUrl.delete(`/users/${cpf}`);
    return response.data;
  } catch (error: any) {
    console.error('Erro ao deletar usuário:', error.response || error.message);
    throw new Error(error.response?.data?.message || 'Erro ao deletar o usuário.');
  }
};