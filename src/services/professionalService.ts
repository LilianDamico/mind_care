import axios from 'axios';

export interface Profissional {
  id: number;
  nome: string;
  especialidade: string;
  // Adicione outros campos se necessário
}

// URL do backend local ou em produção
const baseURL = process.env.REACT_APP_API_URL || 'http://localhost:8081';

const api = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // importante para lidar com cookies se estiver usando JWT
});

export const listarProfissionais = async (): Promise<Profissional[]> => {
  try {
    const response = await api.get<Profissional[]>('/usuarios/profissionais');
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar profissionais:', error);
    throw error;
  }
};
