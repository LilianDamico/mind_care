import api from "./api";

export async function calendarioMe() {
  const res = await api.get("/api/calendario/me");
  return res.data;
}

export async function calendarioGerarDia(payload: {
  data: string;
  inicio: string;
  fim: string;
  intervalo: number;
}) {
  const res = await api.post("/api/calendario/gerar-dia", payload);
  return res.data;
}

export async function calendarioAtualizar(id: string, disponivel: boolean) {
  const res = await api.put(`/api/calendario/${id}`, { disponivel });
  return res.data;
}

export async function calendarioExcluir(id: string) {
  const res = await api.delete(`/api/calendario/${id}`);
  return res.data;
}
