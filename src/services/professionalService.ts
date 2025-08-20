import { apiUrl } from './api';

export interface Profissional {
  id: number;
  nome: string;
  especialidade: string;
  // Adicione outros campos se necessário
}

export const listarProfissionais = async (): Promise<Profissional[]> => {
  try {
    const response = await apiUrl.get<Profissional[]>('/profissionais');
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar profissionais:', error);
    throw error;
  }
};
