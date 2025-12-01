// src/components/lgpdstatus/LgpdStatus.tsx
import React, { useEffect, useState } from "react";
import "./LgpdStatus.css";
import {
  getLgpdStatus,
  getLgpdHistorico,
  registrarConsentimentoAPI,
  revogarConsentimentoAPI
} from "../../services/lgpdService";

import LgpdModal from "../lgpd/LgpdModal";

export default function LgpdStatus() {
  const [status, setStatus] = useState<string>("...");
  const [versao, setVersao] = useState<string>("");
  const [historico, setHistorico] = useState<any[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const carregar = async () => {
    const info = await getLgpdStatus();
    setStatus(info.status);
    setVersao(info.versaoAtual);
    const hist = await getLgpdHistorico();
    setHistorico(hist);
  };

  useEffect(() => { carregar(); }, []);

  const handleAceitar = async () => {
    setLoading(true);
    await registrarConsentimentoAPI();
    setLoading(false);
    setModalOpen(false);
    await carregar();
  };

  const handleRevogar = async () => {
    if (!window.confirm("Tem certeza que deseja revogar o consentimento?")) return;
    setLoading(true);
    await revogarConsentimentoAPI();
    setLoading(false);
    await carregar();
  };

  return (
    <div className="lgpd-status-card">
      <h2>Privacidade & LGPD</h2>
      <p>
        Status atual: <strong>{status.toUpperCase()}</strong> (versão {versao})
      </p>

      <div className="lgpd-status-actions">
        {(status === "ausente" || status === "expirado" || status === "revogado") && (
          <button onClick={() => setModalOpen(true)} disabled={loading}>
            Ler e aceitar a Política de Privacidade
          </button>
        )}

        {status === "ativo" && (
          <button onClick={handleRevogar} disabled={loading}>
            Revogar consentimento
          </button>
        )}
      </div>

      <h3>Histórico de consentimentos</h3>
      {historico.length === 0 && <p>Nenhum registro encontrado.</p>}

      {historico.length > 0 && (
        <ul className="lgpd-historico-list">
          {historico.map((c, idx) => (
            <li key={c.id || idx}>
              <span>{new Date(c.criadoEm).toLocaleString()}</span>
              <span>{c.aceito ? "ACEITO" : "REVOGADO"}</span>
              <span>versão {c.versao}</span>
              <span>{c.metodo}</span>
            </li>
          ))}
        </ul>
      )}

      {modalOpen && (
        <LgpdModal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          onAccept={handleAceitar}
        />
      )}
    </div>
  );
}
