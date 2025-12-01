import api from "./api";

export async function listarProntuariosPorUsuario(nome: string) {
  try {
    const res = await api.get(`/api/prontuarios/${encodeURIComponent(nome)}`);
    return res.data || [];
  } catch (e) {
    console.error("❌ Erro no prontuarioService", e);
    return [];
  }
}
