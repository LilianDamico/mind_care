import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import paymentService, { Plan, SubscriptionStatus } from '../../services/paymentService';
import './PlansPage.css';

export default function PlansPage() {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [subscriptionStatus, setSubscriptionStatus] = useState<SubscriptionStatus | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        const [plansResponse, statusResponse] = await Promise.all([
          paymentService.getAvailablePlans(),
          paymentService.getSubscriptionStatus(),
        ]);
        setPlans(plansResponse.plans);
        setSubscriptionStatus(statusResponse);
      } catch (err) {
        setError('Não foi possível carregar os planos');
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const handleSelect = (planId: string) => {
    navigate(`/checkout?plan=${planId}`);
  };

  if (loading) return <p>Carregando...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="plans-page">
      <h1>Escolha seu Plano</h1>
      <p>Selecione o plano ideal para você</p>

      <div className="plans-container">
        {plans.map((plan) => {
          const isActive = subscriptionStatus?.planType === plan.id;

          return (
            <div key={plan.id} className={`plan-card ${plan.popular ? "popular" : ""}`}>
              {plan.popular && <span className="badge">MAIS POPULAR</span>}
              {isActive && <span className="badge-active">PLANO ATUAL</span>}

              <h3>{plan.name}</h3>
              <strong>{paymentService.formatPrice(plan.price)} / {plan.interval === "month" ? "mês" : "ano"}</strong>

              <ul>
                {plan.features.map((f,i)=><li key={i}>✓ {f}</li>)}
              </ul>

              <button
                disabled={isActive}
                onClick={() => handleSelect(plan.id)}
                className={isActive ? "disabled" : ""}
              >
                {isActive ? "Ativo" : "Assinar"}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
