// src/services/consultaService.ts
import api from "./api";

// 🔥 CONSULTAS DO PROFISSIONAL (TOKEN)
export async function listarConsultasDoProfissional() {
  const response = await api.get("api/consultas/profissional");
  return response.data;
}

// 🔥 CONSULTAS POR NOME (extra – só se quiser usar)
export async function listarConsultasPorNomeDoProfissional(nome: string) {
  const response = await api.get(`/consultas/nome/${encodeURIComponent(nome)}`);
  return response.data;
}
