import api from "./api";

export interface NovaConsultaPayload {
  clienteNome: string;
  profissionalNome: string;
  horarioId: string; // ID do CalendarioProfissional
}

export const listarConsultasPorCliente = async (userNome: string) => {
  const resp = await api.get(
    `/api/consultas/cliente/nome/${encodeURIComponent(userNome)}`
  );
  return resp.data;
};

export const cancelarConsulta = async (consultaId: string) => {
  await api.delete(`/api/consultas/${consultaId}`);
};

export const agendarConsulta = async (payload: NovaConsultaPayload) => {
  const resp = await api.post("/api/consultas", payload);
  return resp.data;
};
