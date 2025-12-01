// src/services/prescricaoService.ts
import api from "./api";

// tipos que vamos usar no app
export type TipoPrescricao = "RECEITA" | "LAUDO" | "RELATORIO";

export interface Prescricao {
  id: string;
  tipo: TipoPrescricao;
  conteudo: string;
  criadoEm: string;
  paciente?: { id: string; nome: string };
  profissional?: { id: string; nome: string };
}

export interface NovaPrescricaoDTO {
  pacienteNome: string;
  profissionalNome: string;
  tipo: TipoPrescricao;
  conteudo: string;
}

export interface AtualizarPrescricaoDTO {
  tipo?: TipoPrescricao;
  conteudo?: string;
}

/** ===================== CRIAR ===================== */
export async function criarPrescricao(
  data: NovaPrescricaoDTO
): Promise<Prescricao> {
  const resp = await api.post("/api/prescricoes", data);
  return resp.data as Prescricao;
}

/** ========== BUSCAR POR PACIENTE (NOME) ========== */
export async function buscarPrescricaoPorPaciente(
  nome: string
): Promise<Prescricao[]> {
  const resp = await api.get(
    `/api/prescricoes/paciente/${encodeURIComponent(nome)}`
  );
  return (resp.data as Prescricao[]) ?? [];
}

/** ======== BUSCAR POR PROFISSIONAL (NOME) ======== */
export async function buscarPrescricaoPorProfissional(
  nome: string
): Promise<Prescricao[]> {
  const resp = await api.get(
    `/api/prescricoes/pacienteProfissional/${encodeURIComponent(nome)}`
  );
  return (resp.data as Prescricao[]) ?? [];
}

/** ===================== ATUALIZAR ===================== */
export async function atualizarPrescricao(
  id: string,
  data: AtualizarPrescricaoDTO
): Promise<Prescricao> {
  const resp = await api.put(`/api/prescricoes/${id}`, data);
  return resp.data as Prescricao;
}

/** ===================== EXCLUIR ===================== */
export async function excluirPrescricao(id: string): Promise<void> {
  await api.delete(`/api/prescricoes/${id}`);
}

/**
 * ===================== UNIFICADO =====================
 * VOLTA A EXISTIR A FUNÇÃO:
 *   listarPrescricoesPorUserNome(nome: string)
 *
 * Ela busca:
 *  - prescrições onde o usuário é PACIENTE
 *  - prescrições onde o usuário é PROFISSIONAL
 * Junta tudo e remove duplicados por id.
 * =====================================================
 */
export async function listarPrescricoesPorUserNome(
  nome: string
): Promise<Prescricao[]> {
  const [comoPaciente, comoProfissional] = await Promise.all([
    buscarPrescricaoPorPaciente(nome),
    buscarPrescricaoPorProfissional(nome),
  ]);

  const todos = [...comoPaciente, ...comoProfissional];

  const vistos = new Set<string>();
  const unicos: Prescricao[] = [];

  for (const p of todos) {
    if (!vistos.has(p.id)) {
      vistos.add(p.id);
      unicos.push(p);
    }
  }

  return unicos;
}
