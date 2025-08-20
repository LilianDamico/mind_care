import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import paymentService, { Plan, SubscriptionStatus } from '../../services/paymentService';
import './PlansPage.css';

interface PlansPageProps {
  onPlanSelect?: (planId: string) => void;
}

const PlansPage: React.FC<PlansPageProps> = ({ onPlanSelect }) => {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [subscriptionStatus, setSubscriptionStatus] = useState<SubscriptionStatus | null>(null);
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    loadPlansAndStatus();
  }, []);

  const loadPlansAndStatus = async () => {
    try {
      setLoading(true);
      const [plansResponse, statusResponse] = await Promise.all([
        paymentService.getAvailablePlans(),
        paymentService.getSubscriptionStatus()
      ]);
      
      setPlans(plansResponse.plans);
      setSubscriptionStatus(statusResponse);
    } catch (err) {
      setError('Erro ao carregar planos. Tente novamente.');
      console.error('Erro ao carregar planos:', err);
    } finally {
      setLoading(false);
    }
  };

  const handlePlanSelect = (planId: string) => {
    if (subscriptionStatus?.hasActiveSubscription && subscriptionStatus.planType === planId) {
      return; // Não permite selecionar o plano atual
    }
    
    setSelectedPlan(planId);
    if (onPlanSelect) {
      onPlanSelect(planId);
    } else {
      // Navegar para página de checkout
      navigate(`/checkout?plan=${planId}`);
    }
  };

  const getPlanButtonText = (plan: Plan) => {
    if (subscriptionStatus?.hasActiveSubscription) {
      if (subscriptionStatus.planType === plan.id) {
        return 'Plano Atual';
      } else {
        return 'Alterar Plano';
      }
    }
    return 'Assinar Agora';
  };

  const isPlanCurrent = (planId: string) => {
    return subscriptionStatus?.hasActiveSubscription && subscriptionStatus.planType === planId;
  };

  const isPlanDisabled = (planId: string) => {
    return isPlanCurrent(planId);
  };

  if (loading) {
    return (
      <div className="plans-page">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Carregando planos...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="plans-page">
        <div className="error-container">
          <h2>Erro ao carregar planos</h2>
          <p>{error}</p>
          <button onClick={loadPlansAndStatus} className="retry-button">
            Tentar Novamente
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="plans-page">
      <div className="plans-header">
        <h1>Escolha seu Plano</h1>
        <p>Selecione o plano que melhor atende às suas necessidades</p>
        
        {subscriptionStatus?.hasActiveSubscription && (
          <div className="current-subscription-info">
            <div className="subscription-badge">
              <span className="badge-icon">✓</span>
              <span>Plano {subscriptionStatus.planType} Ativo</span>
            </div>
            {subscriptionStatus.currentPeriodEnd && (
              <p className="subscription-expiry">
                Renovação em: {new Date(subscriptionStatus.currentPeriodEnd).toLocaleDateString('pt-BR')}
              </p>
            )}
          </div>
        )}
      </div>

      <div className="plans-container">
        {plans.map((plan) => (
          <div 
            key={plan.id} 
            className={`plan-card ${
              plan.popular ? 'popular' : ''
            } ${
              isPlanCurrent(plan.id) ? 'current' : ''
            } ${
              selectedPlan === plan.id ? 'selected' : ''
            }`}
          >
            {plan.popular && <div className="popular-badge">Mais Popular</div>}
            {isPlanCurrent(plan.id) && <div className="current-badge">Plano Atual</div>}
            
            <div className="plan-header">
              <h3 className="plan-name">{plan.name}</h3>
              <div className="plan-price">
                <span className="price-value">
                  {paymentService.formatPrice(plan.price)}
                </span>
                <span className="price-period">/{plan.interval === 'month' ? 'mês' : 'ano'}</span>
              </div>
            </div>

            <div className="plan-limits">
              <div className="limit-item">
                <span className="limit-icon">👥</span>
                <span>Até {plan.maxPatients} pacientes</span>
              </div>
              <div className="limit-item">
                <span className="limit-icon">👨‍⚕️</span>
                <span>Até {plan.maxProfessionals} profissionais</span>
              </div>
            </div>

            <ul className="plan-features">
              {plan.features.map((feature, index) => (
                <li key={index} className="feature-item">
                  <span className="feature-icon">✓</span>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>

            <button 
              className={`plan-button ${
                isPlanDisabled(plan.id) ? 'disabled' : 'primary'
              }`}
              onClick={() => handlePlanSelect(plan.id)}
              disabled={isPlanDisabled(plan.id)}
            >
              {getPlanButtonText(plan)}
            </button>
          </div>
        ))}
      </div>

      <div className="plans-footer">
        <div className="security-info">
          <h4>🔒 Pagamento Seguro</h4>
          <p>Seus dados estão protegidos com criptografia SSL e processamento seguro via Stripe.</p>
        </div>
        
        <div className="support-info">
          <h4>💬 Precisa de Ajuda?</h4>
          <p>Entre em contato conosco para esclarecer dúvidas sobre os planos.</p>
          <button className="contact-button">Falar com Suporte</button>
        </div>
      </div>
    </div>
  );
};

export default PlansPage;