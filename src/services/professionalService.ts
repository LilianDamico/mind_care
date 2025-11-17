// src/services/professionalService.ts
import api from "./api";

export async function buscarProfissionaisPorNome(nome: string) {
  const response = await api.get(`/api/profissionais/buscar`, {
    params: { nome },
  });
  return response.data;
}
