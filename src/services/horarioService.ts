import api from "./api";

export async function listarHorariosPorNome(nome: string) {
  const res = await api.get(`/api/horarios/nome/${encodeURIComponent(nome)}`);
  return res.data || [];
}
