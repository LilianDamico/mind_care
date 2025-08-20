import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import {
  Elements,
  CardElement,
  useStripe,
  useElements
} from '@stripe/react-stripe-js';
import paymentService, { Plan, CreateSubscriptionRequest } from '../../services/paymentService';
import './CheckoutPage.css';

// Configurar Stripe (substitua pela sua chave pública)
const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY || 'pk_test_...');

interface CheckoutFormProps {
  selectedPlan: Plan;
  onSuccess: () => void;
  onError: (error: string) => void;
}

const CheckoutForm: React.FC<CheckoutFormProps> = ({ selectedPlan, onSuccess, onError }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'pix'>('card');

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setLoading(true);

    try {
      if (paymentMethod === 'card') {
        const cardElement = elements.getElement(CardElement);
        if (!cardElement) {
          throw new Error('Elemento do cartão não encontrado');
        }

        // Criar método de pagamento
        const { error, paymentMethod: stripePaymentMethod } = await stripe.createPaymentMethod({
          type: 'card',
          card: cardElement,
        });

        if (error) {
          throw new Error(error.message || 'Erro ao processar cartão');
        }

        // Criar assinatura
        const subscriptionRequest: CreateSubscriptionRequest = {
          planType: selectedPlan.id,
          paymentMethodId: stripePaymentMethod.id,
          currency: 'BRL'
        };

        const response = await paymentService.createSubscription(subscriptionRequest);

        if (response.status === 'requires_action') {
          // Confirmar pagamento com 3D Secure
          const { error: confirmError } = await stripe.confirmCardPayment(response.clientSecret!);
          
          if (confirmError) {
            throw new Error(confirmError.message || 'Erro na confirmação do pagamento');
          }
        }

        if (response.status === 'succeeded' || response.status === 'active') {
          onSuccess();
        } else {
          throw new Error(response.message || 'Erro ao criar assinatura');
        }
      } else {
        // PIX - implementar lógica específica se necessário
        throw new Error('Pagamento via PIX ainda não implementado');
      }
    } catch (err: any) {
      onError(err.message || 'Erro ao processar pagamento');
    } finally {
      setLoading(false);
    }
  };

  const cardElementOptions = {
    style: {
      base: {
        fontSize: '16px',
        color: '#424770',
        '::placeholder': {
          color: '#aab7c4',
        },
      },
      invalid: {
        color: '#9e2146',
      },
    },
  };

  return (
    <form onSubmit={handleSubmit} className="checkout-form">
      <div className="payment-method-selector">
        <h3>Método de Pagamento</h3>
        <div className="payment-methods">
          <label className={`payment-method ${paymentMethod === 'card' ? 'selected' : ''}`}>
            <input
              type="radio"
              value="card"
              checked={paymentMethod === 'card'}
              onChange={(e) => setPaymentMethod(e.target.value as 'card')}
            />
            <span className="method-icon">💳</span>
            <span>Cartão de Crédito</span>
          </label>
          
          <label className={`payment-method ${paymentMethod === 'pix' ? 'selected' : ''}`}>
            <input
              type="radio"
              value="pix"
              checked={paymentMethod === 'pix'}
              onChange={(e) => setPaymentMethod(e.target.value as 'pix')}
              disabled
            />
            <span className="method-icon">🏦</span>
            <span>PIX (Em breve)</span>
          </label>
        </div>
      </div>

      {paymentMethod === 'card' && (
        <div className="card-element-container">
          <label htmlFor="card-element">Informações do Cartão</label>
          <div className="card-element">
            <CardElement id="card-element" options={cardElementOptions} />
          </div>
        </div>
      )}

      <div className="checkout-summary">
        <div className="summary-row">
          <span>Plano {selectedPlan.name}</span>
          <span>{paymentService.formatPrice(selectedPlan.price)}</span>
        </div>
        <div className="summary-row total">
          <span>Total</span>
          <span>{paymentService.formatPrice(selectedPlan.price)}</span>
        </div>
      </div>

      <button 
        type="submit" 
        disabled={!stripe || loading}
        className={`checkout-button ${loading ? 'loading' : ''}`}
      >
        {loading ? (
          <>
            <div className="spinner"></div>
            Processando...
          </>
        ) : (
          `Assinar por ${paymentService.formatPrice(selectedPlan.price)}`
        )}
      </button>

      <div className="security-notice">
        <span className="security-icon">🔒</span>
        <span>Seus dados estão protegidos com criptografia SSL</span>
      </div>
    </form>
  );
};

const CheckoutPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const planId = searchParams.get('plan');

  useEffect(() => {
    if (!planId) {
      navigate('/plans');
      return;
    }

    loadPlan();
  }, [planId, navigate]);

  const loadPlan = async () => {
    try {
      setLoading(true);
      const response = await paymentService.getAvailablePlans();
      const plan = response.plans.find(p => p.id === planId);
      
      if (!plan) {
        throw new Error('Plano não encontrado');
      }
      
      setSelectedPlan(plan);
    } catch (err: any) {
      setError(err.message || 'Erro ao carregar plano');
    } finally {
      setLoading(false);
    }
  };

  const handleSuccess = () => {
    setSuccess(true);
    setTimeout(() => {
      navigate('/dashboard');
    }, 3000);
  };

  const handleError = (errorMessage: string) => {
    setError(errorMessage);
  };

  if (loading) {
    return (
      <div className="checkout-page">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Carregando checkout...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="checkout-page">
        <div className="error-container">
          <h2>Erro no Checkout</h2>
          <p>{error}</p>
          <button onClick={() => navigate('/plans')} className="back-button">
            Voltar aos Planos
          </button>
        </div>
      </div>
    );
  }

  if (success) {
    return (
      <div className="checkout-page">
        <div className="success-container">
          <div className="success-icon">✅</div>
          <h2>Assinatura Criada com Sucesso!</h2>
          <p>Bem-vindo ao plano {selectedPlan?.name}!</p>
          <p>Você será redirecionado para o dashboard em alguns segundos...</p>
        </div>
      </div>
    );
  }

  if (!selectedPlan) {
    return null;
  }

  return (
    <div className="checkout-page">
      <div className="checkout-container">
        <div className="checkout-header">
          <button onClick={() => navigate('/plans')} className="back-link">
            ← Voltar aos Planos
          </button>
          <h1>Finalizar Assinatura</h1>
        </div>

        <div className="checkout-content">
          <div className="plan-summary">
            <h2>Resumo do Plano</h2>
            <div className="plan-info">
              <h3>{selectedPlan.name}</h3>
              <div className="plan-price">
                <span className="price">{paymentService.formatPrice(selectedPlan.price)}</span>
                <span className="period">/{selectedPlan.interval === 'month' ? 'mês' : 'ano'}</span>
              </div>
              
              <div className="plan-limits">
                <div className="limit">
                  <span className="icon">👥</span>
                  <span>Até {selectedPlan.maxPatients} pacientes</span>
                </div>
                <div className="limit">
                  <span className="icon">👨‍⚕️</span>
                  <span>Até {selectedPlan.maxProfessionals} profissionais</span>
                </div>
              </div>

              <ul className="features-list">
                {selectedPlan.features.map((feature, index) => (
                  <li key={index}>
                    <span className="check">✓</span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="checkout-form-container">
            <Elements stripe={stripePromise}>
              <CheckoutForm 
                selectedPlan={selectedPlan}
                onSuccess={handleSuccess}
                onError={handleError}
              />
            </Elements>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;