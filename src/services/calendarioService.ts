// ============================================================
//  SERVICE: calendarioService.ts
//  Funções de integração com o backend de calendário profissional
//  Todas as operações buscam o profissional pelo NOME
// ============================================================

import api from "./api";

// ------------------------------------------------------------
//  GET /api/calendario-profissional/:nome
// ------------------------------------------------------------
export async function listarCalendarioPorNome(nome: string) {
  const resp = await api.get(
    `/api/calendario-profissional/${encodeURIComponent(nome)}`
  );
  return resp.data;
}

// ------------------------------------------------------------
//  POST /api/calendario-profissional/:nome
// ------------------------------------------------------------
export async function criarHorarioCalendario(
  nome: string,
  payload: { dataHora: string; observacao?: string }
) {
  const resp = await api.post(
    `/api/calendario-profissional/${encodeURIComponent(nome)}`,
    payload
  );
  return resp.data;
}

// ------------------------------------------------------------
//  DELETE /api/calendario-profissional/:nome
// ------------------------------------------------------------
export async function deletarHorarioCalendario(
  nome: string,
  payload: { dataHora: string }
) {
  const resp = await api.delete(
    `/api/calendario-profissional/${encodeURIComponent(nome)}`,
    { data: payload }
  );
  return resp.data;
}
