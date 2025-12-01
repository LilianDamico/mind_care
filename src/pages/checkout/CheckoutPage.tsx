import { useSearchParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import paymentService from "../../services/paymentService";
import "./CheckoutPage.css";

export default function CheckoutPage() {
  const [params] = useSearchParams();
  const plan = params.get("plan");
  const [method, setMethod] = useState<string>("");
  const [processing, setProcessing] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handlePayment = async () => {
    if (!method || !plan) return alert("Selecione uma forma de pagamento");

    setProcessing(true);
    try {
      const res = await paymentService.createSubscription({
        planType: plan,
        currency: "BRL",
        paymentMethodId: method // cartão → stripe, pix → pagarme
      });

      if (res.status === "requires_payment") {
        setMessage("Processando pagamento...");
      } else if (res.status === "active") {
        alert("Assinatura ativada com sucesso!");
        navigate("/dashboard");
      } else {
        setMessage("Status desconhecido, mas estamos quase lá...");
      }

    } catch (error) {
      setMessage("Falha ao processar pagamento");
    }
    setProcessing(false);
  };

  return (
    <div className="checkout">
      <h1>Finalizar Assinatura</h1>
      <p>Plano selecionado: <b>{plan}</b></p>

      <label>Forma de Pagamento</label>
      <select onChange={e=>setMethod(e.target.value)}>
        <option value="">Selecione...</option>
        <option value="card">Cartão (Stripe)</option>
        <option value="pix">PIX Parcelado (Pagar.me)</option>
      </select>

      <button disabled={processing} onClick={handlePayment}>
        {processing ? "Processando..." : "Confirmar Pagamento"}
      </button>

      {message && <p>{message}</p>}
    </div>
  );
}
