import "./LgpdModal.css";

interface Props {
  open: boolean;
  onClose: () => void;
  onAccept: () => void;
}

export default function LgpdModal({ open, onClose, onAccept }: Props) {
  if (!open) return null;

  return (
    <div className="lgpd-overlay">
      <div className="lgpd-modal">

        <h2>📜 Política de Privacidade — LGPD</h2>

        <div className="lgpd-scroll">
          <p><b>Dados coletados:</b> Nome, e-mail, CPF, telefone, histórico clínico e consultas.</p>
          <p><b>Direitos:</b> acessar, corrigir, excluir ou anonimizar dados.</p>
          <p><b>Revogação:</b> pode ser solicitada a qualquer momento.</p>
          <p><b>DPO:</b> suporte@mindcare.com.br</p>

          <p style={{fontSize:13,marginTop:10}}>
            Role até o final para habilitar o botão ⬇
          </p>
        </div>

        <div className="lgpd-actions">
          <button className="cancel" onClick={onClose}>Cancelar</button>
          <button className="accept" onClick={onAccept}>✓ Aceito os Termos</button>
        </div>

      </div>
    </div>
  );
}
