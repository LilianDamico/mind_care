// src/services/lgpdService.ts
import api from "./api";

export type LgpdStatusType = "ausente" | "ativo" | "revogado" | "expirado";

export interface LgpdStatusResponse {
  status: LgpdStatusType;
  versaoAtual: string;
  ultimo?: any;
}

export const getLgpdStatus = async () => {
  const res = await api.get<LgpdStatusResponse>("/api/lgpd/consentimento/status");
  return res.data;
};

export const getLgpdHistorico = async () => {
  const res = await api.get("/api/lgpd/consentimento/historico");
  return res.data.registros;
};

export const registrarConsentimentoAPI = async () => {
  const res = await api.post("/api/lgpd/consentimento");
  return res.data;
};

export const revogarConsentimentoAPI = async () => {
  const res = await api.delete("/api/lgpd/consentimento");
  return res.data;
};
