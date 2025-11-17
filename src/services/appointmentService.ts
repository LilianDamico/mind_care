// =======================================================
// src/services/appointmentService.ts — REESCRITO E CORRIGIDO
// =======================================================

import api from "./api";

// =======================================================
// 🔎 PROFISSIONAIS (busca por nome)
// =======================================================
export const buscarProfissionaisPorNome = async (nome: string) => {
  const { data } = await api.get(`/api/profissional`, {
    params: { nome },
  });

  return data.profissionais || [];
};

// =======================================================
// 🕒 HORÁRIOS — por nome do profissional (CLIENTE usa)
// =======================================================
export const listarHorariosPorNome = async (nome: string) => {
  const { data } = await api.get(`/api/horarios/nome/${encodeURIComponent(nome)}`);
  return data;
};

// =======================================================
// 📅 CONSULTAS DO CLIENTE — por nome
// =======================================================
export const listarConsultasPorCliente = async (nome: string) => {
  // 🔥 Rota correta: /api/consultas/cliente/nome/:userNome
  const { data } = await api.get(
    `/api/consultas/cliente/nome/${encodeURIComponent(nome)}`
  );
  return data;
};

export const cancelarConsulta = async (id: string | number) => {
  const { data } = await api.patch(`/api/consultas/${id}/cancelar`);
  return data;
};

export const agendarConsulta = async (dados: {
  clienteNome: string;
  profissionalNome: string;
  horarioId: string;
}) => {
  const { data } = await api.post(`/api/consultas`, dados);
  return data;
};

// =====================
//  PRESCRIÇÕES (por userNome)
// =====================
export const listarPrescricoesPorUserNome = async (userNome: string) => {
  const r = await api.get(`/api/prescricao/${encodeURIComponent(userNome)}`);
  return r.data;
};

export const criarPrescricao = async (payload: {
  pacienteNome: string;
  tipo: string;
  conteudo: string;
}) => {
  const r = await api.post(`/api/prescricao`, payload);
  return r.data;
};

export const atualizarPrescricao = async (
  id: string,
  payload: { tipo?: string; conteudo?: string }
) => {
  const r = await api.put(`/api/prescricao/${id}`, payload);
  return r.data;
};

export const excluirPrescricao = async (id: string) => {
  const r = await api.delete(`/api/prescricao/${id}`);
  return r.data;
};


// =======================================================
// 📚 PRONTUÁRIOS — CLIENTE (correto)
// =======================================================
export async function listarProntuariosPorUsuario(nome: string) {
  const { data } = await api.get(
    `/api/prontuarios/nome/${encodeURIComponent(nome)}`
  );
  return data;
}

// =======================================================
// 📆 CALENDÁRIO DO PROFISSIONAL
// =======================================================
export const calendarioMe = async () => {
  const { data } = await api.get(`/api/calendario/me`);
  return data;
};

export const calendarioCriarSlots = async (payload: {
  dataHora: string;
  observacao?: string;
}) => {
  const { data } = await api.post(`/api/calendario`, payload);
  return data;
};

export const calendarioGerarDia = async (payload: {
  data: string;
  inicio: string;
  fim: string;
  intervaloMinutos?: number;
}) => {
  const { data } = await api.post(`/api/calendario/gerar-dia`, payload);
  return data;
};

export const calendarioAtualizar = async (
  id: string,
  dados: { disponivel?: boolean; observacao?: string }
) => {
  const { data } = await api.put(`/api/calendario/${id}`, dados);
  return data;
};

export const calendarioExcluir = async (id: string) => {
  await api.delete(`/api/calendario/${id}`);
};
