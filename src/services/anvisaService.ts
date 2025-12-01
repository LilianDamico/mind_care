// src/services/anvisaService.ts
import anvisaClient from "./anvisaClient";

/**
 * Consulta interações medicamentosas na API Python (FastAPI).
 */
export async function consultarInteracoes(nome: string): Promise<any> {
  if (!nome.trim()) return null;

  try {
    const response = await anvisaClient.get(`/interacoes/${nome}`);
    return response.data;   
  } catch (err) {
    console.error("Erro ao consultar interações:", err);
    throw err;
  }
}
