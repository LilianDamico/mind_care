import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import paymentService, { Subscription, Payment, SubscriptionStatus } from '../../services/paymentService';
import './SubscriptionPage.css';

const SubscriptionPage: React.FC = () => {
  const [subscriptionStatus, setSubscriptionStatus] = useState<SubscriptionStatus | null>(null);
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'subscription' | 'payments'>('subscription');
  const [cancelLoading, setCancelLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    loadSubscriptionData();
  }, []);

  const loadSubscriptionData = async () => {
    try {
      setLoading(true);
      const [statusResponse, subscriptionResponse, paymentsResponse] = await Promise.all([
        paymentService.getSubscriptionStatus(),
        paymentService.getUserSubscription(),
        paymentService.getPaymentHistory()
      ]);
      
      setSubscriptionStatus(statusResponse);
      setSubscriptions(subscriptionResponse ? [subscriptionResponse] : []);
      setPayments(paymentsResponse);
    } catch (err: any) {
      setError(err.message || 'Erro ao carregar dados da assinatura');
    } finally {
      setLoading(false);
    }
  };

  const handleCancelSubscription = async () => {
    const confirmed = window.confirm(
      'Tem certeza que deseja cancelar sua assinatura? Você ainda terá acesso até o final do período atual.'
    );
    
    if (!confirmed) return;

    try {
      setCancelLoading(true);
      await paymentService.cancelSubscription();
      await loadSubscriptionData(); // Recarregar dados
      alert('Assinatura cancelada com sucesso!');
    } catch (err: any) {
      alert(err.message || 'Erro ao cancelar assinatura');
    } finally {
      setCancelLoading(false);
    }
  };

  const getStatusBadge = (status: string) => {
    const statusMap: { [key: string]: { label: string; className: string } } = {
      active: { label: 'Ativa', className: 'status-active' },
      canceled: { label: 'Cancelada', className: 'status-canceled' },
      past_due: { label: 'Em Atraso', className: 'status-past-due' },
      unpaid: { label: 'Não Paga', className: 'status-unpaid' },
      incomplete: { label: 'Incompleta', className: 'status-incomplete' },
      trialing: { label: 'Período de Teste', className: 'status-trialing' }
    };

    const statusInfo = statusMap[status] || { label: status, className: 'status-default' };
    
    return (
      <span className={`status-badge ${statusInfo.className}`}>
        {statusInfo.label}
      </span>
    );
  };

  const getPaymentStatusBadge = (status: string) => {
    const statusMap: { [key: string]: { label: string; className: string } } = {
      succeeded: { label: 'Pago', className: 'payment-succeeded' },
      pending: { label: 'Pendente', className: 'payment-pending' },
      failed: { label: 'Falhou', className: 'payment-failed' },
      canceled: { label: 'Cancelado', className: 'payment-canceled' }
    };

    const statusInfo = statusMap[status] || { label: status, className: 'payment-default' };
    
    return (
      <span className={`payment-badge ${statusInfo.className}`}>
        {statusInfo.label}
      </span>
    );
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const formatDateTime = (dateString: string) => {
    return new Date(dateString).toLocaleString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="subscription-page">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Carregando dados da assinatura...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="subscription-page">
        <div className="error-container">
          <h2>Erro ao carregar dados</h2>
          <p>{error}</p>
          <button onClick={loadSubscriptionData} className="retry-button">
            Tentar Novamente
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="subscription-page">
      <div className="subscription-container">
        <div className="subscription-header">
          <h1>Minha Assinatura</h1>
          <p>Gerencie sua assinatura e histórico de pagamentos</p>
        </div>

        <div className="tabs-container">
          <div className="tabs">
            <button 
              className={`tab ${activeTab === 'subscription' ? 'active' : ''}`}
              onClick={() => setActiveTab('subscription')}
            >
              Assinatura Atual
            </button>
            <button 
              className={`tab ${activeTab === 'payments' ? 'active' : ''}`}
              onClick={() => setActiveTab('payments')}
            >
              Histórico de Pagamentos
            </button>
          </div>
        </div>

        {activeTab === 'subscription' && (
          <div className="subscription-content">
            {subscriptionStatus?.hasActiveSubscription ? (
              <div className="current-subscription">
                <div className="subscription-card">
                  <div className="subscription-info">
                    <div className="plan-details">
                      <h2>Plano {subscriptionStatus.planType}</h2>
                      {subscriptionStatus.status && getStatusBadge(subscriptionStatus.status)}
                    </div>
                    
                    <div className="subscription-dates">
                      {subscriptionStatus.currentPeriodStart && (
                        <div className="date-info">
                          <span className="date-label">Início do período:</span>
                          <span className="date-value">
                            {formatDate(subscriptionStatus.currentPeriodStart)}
                          </span>
                        </div>
                      )}
                      
                      {subscriptionStatus.currentPeriodEnd && (
                        <div className="date-info">
                          <span className="date-label">
                            {subscriptionStatus.status === 'canceled' ? 'Acesso até:' : 'Próxima cobrança:'}
                          </span>
                          <span className="date-value">
                            {formatDate(subscriptionStatus.currentPeriodEnd)}
                          </span>
                        </div>
                      )}
                    </div>

                    {subscriptionStatus.currentPeriodEnd && 
                     paymentService.isSubscriptionExpiringSoon(subscriptionStatus.currentPeriodEnd) && (
                      <div className="expiry-warning">
                        <span className="warning-icon">⚠️</span>
                        <span>Sua assinatura expira em breve!</span>
                      </div>
                    )}
                  </div>

                  <div className="subscription-actions">
                    <button 
                      onClick={() => navigate('/plans')}
                      className="change-plan-button"
                    >
                      Alterar Plano
                    </button>
                    
                    {subscriptionStatus.status === 'active' && (
                      <button 
                        onClick={handleCancelSubscription}
                        disabled={cancelLoading}
                        className="cancel-button"
                      >
                        {cancelLoading ? 'Cancelando...' : 'Cancelar Assinatura'}
                      </button>
                    )}
                  </div>
                </div>

                {/* Lista de todas as assinaturas */}
                {subscriptions.length > 0 && (
                  <div className="subscriptions-history">
                    <h3>Histórico de Assinaturas</h3>
                    <div className="subscriptions-list">
                      {subscriptions.map((subscription) => (
                        <div key={subscription.id} className="subscription-item">
                          <div className="subscription-item-info">
                            <div className="plan-name">Plano {subscription.planType}</div>
                            {getStatusBadge(subscription.status)}
                          </div>
                          <div className="subscription-item-dates">
                            <div>Criado: {formatDate(subscription.createdAt)}</div>
                            {subscription.currentPeriodEnd && (
                              <div>Término: {formatDate(subscription.currentPeriodEnd)}</div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="no-subscription">
                <div className="no-subscription-icon">📋</div>
                <h2>Nenhuma Assinatura Ativa</h2>
                <p>Você não possui uma assinatura ativa no momento.</p>
                <button 
                  onClick={() => navigate('/plans')}
                  className="subscribe-button"
                >
                  Ver Planos Disponíveis
                </button>
              </div>
            )}
          </div>
        )}

        {activeTab === 'payments' && (
          <div className="payments-content">
            {payments.length > 0 ? (
              <div className="payments-list">
                <div className="payments-header">
                  <h3>Histórico de Pagamentos</h3>
                  <p>{payments.length} pagamento{payments.length !== 1 ? 's' : ''} encontrado{payments.length !== 1 ? 's' : ''}</p>
                </div>
                
                <div className="payments-table">
                  <div className="table-header">
                    <div className="header-cell">Data</div>
                    <div className="header-cell">Plano</div>
                    <div className="header-cell">Valor</div>
                    <div className="header-cell">Status</div>
                    <div className="header-cell">Método</div>
                  </div>
                  
                  {payments.map((payment) => (
                    <div key={payment.id} className="table-row">
                      <div className="table-cell">
                        {formatDateTime(payment.createdAt)}
                      </div>
                      <div className="table-cell">
                        Plano {payment.planType || 'N/A'}
                      </div>
                      <div className="table-cell">
                        {paymentService.formatPrice(payment.amount)}
                      </div>
                      <div className="table-cell">
                        {getPaymentStatusBadge(payment.status)}
                      </div>
                      <div className="table-cell">
                        {payment.paymentMethod || 'N/A'}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="no-payments">
                <div className="no-payments-icon">💳</div>
                <h2>Nenhum Pagamento Encontrado</h2>
                <p>Você ainda não possui histórico de pagamentos.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SubscriptionPage;