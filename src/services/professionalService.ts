// src/services/professionalService.ts
import api from "./api";

export async function buscarProfissionaisPorNome(nome: string) {
  const res = await api.get(`/api/profissional/buscar`, {
    params: { nome }
  });
  return res.data;
}
