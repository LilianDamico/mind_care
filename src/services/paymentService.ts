import api from './api';

export interface Plan {
  id: string;
  name: string;
  price: number;
  currency: string;
  interval: string;
  features: string[];
  maxPatients: number;
  maxProfessionals: number;
  hasAiFeatures: boolean;
  hasReports: boolean;
  popular?: boolean;
}

export interface Subscription {
  id: number;
  userId: number;
  userEmail: string;
  userName: string;
  stripeCustomerId: string;
  stripeSubscriptionId: string;
  planType: string;
  status: string;
  currentPeriodStart: string;
  currentPeriodEnd: string;
  createdAt: string;
  updatedAt: string;
  priceMonthly: number;
  maxPatients: number;
  maxProfessionals: number;
  hasAiFeatures: boolean;
  hasReports: boolean;
  daysUntilExpiry?: number;
}

export interface Payment {
  id: number;
  userId: number;
  userEmail: string;
  userName: string;
  subscriptionId: number;
  planType: string;
  stripePaymentIntentId: string;
  stripeInvoiceId: string;
  amount: number;
  currency: string;
  status: string;
  paymentMethod: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  paidAt: string;
  failureReason?: string;
}

export interface CreateSubscriptionRequest {
  planType: string;
  paymentMethodId: string;
  currency: string;
}

export interface CreateSubscriptionResponse {
  status: string;
  clientSecret?: string;
  subscriptionId?: string;
  customerId?: string;
  message: string;
  subscription?: Subscription;
}

export interface SubscriptionStatus {
  hasActiveSubscription: boolean;
  planType?: string;
  status?: string;
  currentPeriodStart?: string;
  currentPeriodEnd?: string;
  maxPatients?: number;
  maxProfessionals?: number;
  hasAiFeatures?: boolean;
  hasReports?: boolean;
  message?: string;
}

class PaymentService {
  /**
   * Obter planos disponíveis
   */
  async getAvailablePlans(): Promise<{ plans: Plan[] }> {
    try {
      const response = await api.get('/payments/plans');
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar planos:', error);
      throw error;
    }
  }

  /**
   * Criar nova assinatura
   */
  async createSubscription(request: CreateSubscriptionRequest): Promise<CreateSubscriptionResponse> {
    try {
      const response = await api.post('/payments/subscription', request);
      return response.data;
    } catch (error) {
      console.error('Erro ao criar assinatura:', error);
      throw error;
    }
  }

  /**
   * Obter assinatura atual do usuário
   */
  async getUserSubscription(): Promise<Subscription | null> {
    try {
      const response = await api.get('/payments/subscription');
      return response.data.message ? null : response.data;
    } catch (error) {
      console.error('Erro ao buscar assinatura:', error);
      return null;
    }
  }

  /**
   * Cancelar assinatura
   */
  async cancelSubscription(): Promise<{ message: string }> {
    try {
      const response = await api.delete('/payments/subscription');
      return response.data;
    } catch (error) {
      console.error('Erro ao cancelar assinatura:', error);
      throw error;
    }
  }

  /**
   * Obter histórico de pagamentos
   */
  async getPaymentHistory(): Promise<Payment[]> {
    try {
      const response = await api.get('/payments/history');
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar histórico de pagamentos:', error);
      throw error;
    }
  }

  /**
   * Verificar status da assinatura
   */
  async getSubscriptionStatus(): Promise<SubscriptionStatus> {
    try {
      const response = await api.get('/payments/subscription/status');
      return response.data;
    } catch (error) {
      console.error('Erro ao verificar status da assinatura:', error);
      throw error;
    }
  }

  /**
   * Formatar preço para exibição
   */
  formatPrice(price: number, currency: string = 'BRL'): string {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: currency,
    }).format(price);
  }

  /**
   * Verificar se o usuário tem acesso a uma funcionalidade
   */
  async hasFeatureAccess(feature: 'ai' | 'reports' | 'patients' | 'professionals', count?: number): Promise<boolean> {
    try {
      const status = await this.getSubscriptionStatus();
      
      if (!status.hasActiveSubscription) {
        return false;
      }

      switch (feature) {
        case 'ai':
          return status.hasAiFeatures || false;
        case 'reports':
          return status.hasReports || false;
        case 'patients':
          return count ? count <= (status.maxPatients || 0) : true;
        case 'professionals':
          return count ? count <= (status.maxProfessionals || 0) : true;
        default:
          return false;
      }
    } catch (error) {
      console.error('Erro ao verificar acesso à funcionalidade:', error);
      return false;
    }
  }

  /**
   * Calcular dias até expiração
   */
  calculateDaysUntilExpiry(currentPeriodEnd: string): number {
    const endDate = new Date(currentPeriodEnd);
    const now = new Date();
    const diffTime = endDate.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return Math.max(0, diffDays);
  }

  /**
   * Verificar se a assinatura está próxima do vencimento
   */
  isSubscriptionExpiringSoon(currentPeriodEnd: string, daysThreshold: number = 7): boolean {
    const daysUntilExpiry = this.calculateDaysUntilExpiry(currentPeriodEnd);
    return daysUntilExpiry <= daysThreshold && daysUntilExpiry > 0;
  }
}

const paymentService = new PaymentService();
export default paymentService;