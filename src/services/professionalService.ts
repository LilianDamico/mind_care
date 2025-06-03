import { apiUrlLocal as apiUrl } from './api'; // Importação nomeada correta

export interface Profissional {
  id: number;
  nome: string;
  especialidade: string;
  // outras propriedades do profissional
}

export const listarProfissionais = async (): Promise<Profissional[]> => {
  try {
    const response = await apiUrl.get<Profissional[]>('/profissionais'); // Ajuste o endpoint conforme sua API
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar profissionais:', error);
    throw error;
  }
};
